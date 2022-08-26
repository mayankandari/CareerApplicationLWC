/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, api } from 'lwc';
import insertOrUpdateWHE from '@salesforce/apex/MyExperienceController.insertOrUpdateWHE';
import fetchWorkHistory from '@salesforce/apex/CareerApplicationController.fetchWorkHistory';
import fetchEducation from '@salesforce/apex/CareerApplicationController.fetchEducation';
import fetchAppData from '@salesforce/apex/CareerApplicationController.fetchAppData';
import fetchFiles from '@salesforce/apex/MyExperienceController.fetchFiles';

export default class MyExperience extends LightningElement {
    @api application;

    get acceptedFormats() {
        return ['.pdf','.png','.jpg'];
    }
 
    
    label={
        header:'My Experience',
        label1:'Indicates a required field',
        label2:'Work History (Optional)',
        label3:'Tell us about your work history and/or other relevant experiences such as volunteerism, military service, or athletics.',
        label4:'Education (Optional)',
        label5:'If you’d like, this is where you can include information regarding your education, such as school name, level of degree, and/or field of study.',
        label6:'Skills and Strengths (Optional)',
        label7:'Add up to 10 hard and/or soft skills that highlight your professional abilities. This information will make it easier for our Talent Acquisition team to match you with current and future openings.',
        label8:'Type to add Skills',
        label9:'Resume/CV',
        label10:'If you haven’t already, please upload your resume/CV. If you’d like to include a cover letter, you can do so here as well. PDF or .docx file formats are preferred.',
        label11:'Upload a file (5MB Max)',
        label12:'Relevant Websites (Optional)',
        label13:'Add any relevant websites. Format should be: http://',
        label14:'Social Network URLs',
        label15:'Please provide the URL to your LinkedIn profile.',
        label16:'Job Title',
        label17:'Company',
        label18:'Location',
        label19:'I currently work here',
        label20:'From',
        label21:'To Date',
        label22:'Role Description',
        label23:'School or University',
        label24:'Degree',
        label25:'Field Of Study',
        label26:'Overall Result(GPA)'
    };

    whItem='';
    edItem='';
    lstAllFiles;
    error;

    connectedCallback(){
       // console.log('In My Experience, the application is' +this.application);
        fetchWorkHistory({appliId:this.application})
                            .then((result)=>{
                                this.whItem=result;
                                if(result!=null){
                                    this.lrform=true;
                                }
                                fetchEducation({appliId:this.application})
                                    .then((result)=>{
                                        this.edItem=result;
                                        if(result!=null){
                                            this.lrEdForm=true;
                                        }
                                        fetchAppData({appliId:this.application})
                                            .then((result)=>{
                                                this.skills=result.Skills_and_Strengths__c;
                                                this.website=result.Relevant_Websites__c;
                                                this.urls=result.Social_Network_URLs__c;
                                                fetchFiles({recordId:this.application})
                                                                    .then(result=>{
                                                                        this.lstAllFiles = result; 
                                                                     //   console.log(this.lstAllFiles);
                                                                        this.error = undefined;
                                                                    }).catch(error=>{
                                                                        this.lstAllFiles = undefined; 
                                                                        this.error = error;
                                                                    })
                                            });
                                    });
                            });
                        }

    /**
     * WORK HISTORY CREATION AND UPDATION
     */
     lrform=false;

     objectApiName='Work_History__c';
     fields=['Job_Title__c','Company__c','Location__c','Current_Job__c','From_Date__c','To_Date__c','Role_Description__c'];
     handleSuccess(){
 
     }

    newItem=false;

    items = [{ id: 0, job_title:'', company:'',location:'',checkboxe:false,from_date:'',to_date:'', role:''}];
    info=JSON.stringify(this.items);

    checking;
    update(event) {
     //   console.log('In update'+event);
        if(event.target.name!='checkboxe'){
            this.items[event.currentTarget.dataset.id][event.target.name] = event.target.value;
        }else{
            if(event.target.checked){
                    this.checking=true;  
                    this.items[event.currentTarget.dataset.id]['checkboxe']=true;          
            }else{
                this.checking=false;
                this.items[event.currentTarget.dataset.id]['checkboxe']=false;      
                this.items[event.currentTarget.dataset.id]['to_date']='';
            }
        }
        this.info=JSON.stringify(this.items);
      }

    addAnother(){
        //console.log('In add another'+this.items);
        this.newItem=true;
        this.items = [...this.items, { id: this.items.length,job_title:'', company:'',location:'',checkboxe:false,
                                    from_date:'',to_date:'', role:''}];
        this.checking=false;
    }

    addNew(){
        this.newItem=true;
    }
    
    /**
     * EDUCATION CREATION AND UPDATION
     */

     lrEdForm=false;
     newEdItem=false;

    addNewEd(){
        this.newEdItem=true;
    }
     objectEdApiName='Education__c';
     fieldsEd=['School_or_University__c','Degree__c','Field_Of_Study__c','From__c','To_Date__c'];
     handleEdSuccess(){
 
     }
    eduItems=[{id:0,school:'',degree:'',field_study:'',result:'',from_ed:'',to_date_ed:''}];
    eduInfo=JSON.stringify(this.eduItems);
    
    updateEducationBar(event){
       // console.log('In Update Education bar'+event);
        this.eduItems[event.currentTarget.dataset.id][event.target.name] = event.target.value;
        this.eduInfo=JSON.stringify(this.eduItems);
    }

    addAnotherEducationBar(){
       // console.log('In add Another '+this.eduItems);
        this.eduItems = [...this.eduItems, {id:this.eduItems.length,school:'',degree:'',field_study:'',result:'',from_ed:'',to_date_ed:''}];
    }

    /**
     * SKILLS AND RELAVENT WEBSITES
     */
    skills='';
    website='';
    urls='';

    genericChange(event){
        if(event.target.name===this.label.label8){
            this.skills=event.target.value;
           // console.log(event.target.value)
        }else if(event.target.name===this.label.label12){
            this.website=event.target.value;
        }else if(event.target.name===this.label.label14){
            this.urls=event.target.value;
        }
    }

    handleInput(){
        //console.log('Inside My Experience Handle Input');
        console.log('WhInfo'+this.info);
        insertOrUpdateWHE({appliId:this.application,ed:this.eduInfo,wh:this.info,skills:this.skills,snurl:this.urls,relWeb:this.website})
                        .then((result)=>{
                            //console.log('In result WH'+JSON.stringify(result));
                            this.dispatchEvent( new CustomEvent( 'pass', {
                                detail: {current:'3'}
                            } ) );
                        })
                        .error((error)=>{
                            //console.log(this.error)
                        });
    }

    handlePrevious(){
        //console.log('Inside My Handle Previous My Experience');
        this.dispatchEvent( new CustomEvent( 'previous', {
            detail: {current:'1',applicationid:this.application}
        } ) );
    }
}