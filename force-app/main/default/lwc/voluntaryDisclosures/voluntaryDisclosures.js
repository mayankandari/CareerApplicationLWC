/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, api } from 'lwc';
import updateVoluntaryDisclosures from '@salesforce/apex/CareerApplicationController.updateVoluntaryDisclosures';
import getApplicationDetails from '@salesforce/apex/CareerApplicationController.getApplicationDetails';

export default class VoluntaryDisclosures extends LightningElement {
    @api application;
    @api applicationId;
    label={
        header:'Voluntary Disclosures',
        req:'Indicates a required field',
        label1:'Equal Opportunity Employment',
        label2:'Individuals seeking employment with Our Org are considered without regards to race, color, religion, national origin, age, sex, marital status, ancestry, physical or mental disability, veteran status, or sexual orientation. You are being given the opportunity to provide the following information in order to help us produce statistical analyses and reports of our applicant records based on government reporting requirements.',
        label3:'Completion of the form is entirely voluntary. Whatever your decision, it will not be considered in the hiring process or thereafter. Any information that you do provide will be recorded and maintained in a confidential file.',
        label4:'Our Org.com is proud to be an inclusive employer and welcomes applications from a diverse range of backgrounds. Please indicate your gender below',
        label5:'Terms and Conditions',
        label6:'At Our Org we believe that the business of business is to improve the state of our world. Each of us has a responsibility to drive Equality in our communities and workplaces. We are committed to creating a workforce that reflects society through inclusive programs and initiatives such as equal pay, employee resource groups, inclusive benefits, and more. Learn more about Equality at Our Org and explore our benefits.',
        label7:'Our Org.com and Our Org.org are Equal Employment Opportunity and Affirmative Action Employers. Qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender perception or identity, national origin, age, marital status, protected veteran status, or disability status. Our Org.com and Our Org.org do not accept unsolicited headhunter and agency resumes. Our Org.com and Our Org.org will not pay any third-party agency or company that does not have a signed agreement with Salesfore.com or Our Org.org.',
        label8:'Our Org welcomes all.',
        label9:'Accommodations - If you require assistance due to a disability applying for open positions please submit a request via this Accommodations Request Form.',
        label10:'Pay Transparency Policy Statement – The contractor will not discharge or in any other manner discriminate against employees or applicants because they have inquired about, discussed, or disclosed their own pay or the pay of another employee or applicant. However, employees who have access to the compensation information of other employees or applicants as a part of their essential job functions cannot disclose the pay of other employees or applicants to individuals who do not otherwise have access to compensation information, unless the disclosure is (a) in response to a formal complaint or charge, (b) in furtherance of an investigation, proceeding, hearing, or action, including an investigation conducted by the employer, or (c) consistent with the contractor’s legal duty to furnish information.',
        label11:'For applicants in Japan, please review the Agreement on the Handling of Personal Information.',
        label12:'By submitting my information I confirm that I have read and agree to the Privacy Statement.',
        label13:'Yes, I have read and consent to the terms and conditions'
    }

    connectedCallback(){
       // console.log('In Voluntary Discussion, the application Id is '+this.application);
        if(undefined!=this.application){
            getApplicationDetails({appliId:this.application})
                                    .then(
                                        (result)=>{
                                            this.gendervalue=result.Gender__c;
                                        });}
    }

    preGReq=false;
    gendervalue='';
    get genderoptions() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Intersex', value: 'Intersex' },
            { label: 'I prefer not to disclose', value: 'I prefer not to disclose' },
        ];
    }
    handleChange(event) {
        this.gendervalue = event.detail.value;
        this.preGReq=false;
    }
  
    checkValue=false;
    handleToChange(event){
        this.checkValue=event.target.checked;
        this.checkValue=true;
    }
    handleInput(){
        //console.log('Inside My Voluntart Disclosures Input'+this.application);
        if(this.gendervalue!='' && this.checkValue!=false){
            
                        updateVoluntaryDisclosures({appliId:this.application,gender:this.gendervalue})
                        .then(
                                (result)=>
                                        {
                                            //console.log(result);
                                            this.applicationId=result;
                                            this.dispatchEvent( new CustomEvent( 'pass', {
                                                detail: {current:'5'}
                                            } ) );
                                            this.error=undefined;
                                        })
                        .error(
                                (error)=>
                                        {  
                                           // console.log(error);
                                            this.error=error;
                                        });
                this.dispatchEvent( new CustomEvent( 'pass', {
                detail: {current:'5'}
                } ) );
        }else{
            if(this.gendervalue===''){
                this.preGReq=true;
            }
        }
    }
    
    handlePrevious(){
        //console.log('Inside My Handle Previous Voluntary Disclosures');
        this.dispatchEvent( new CustomEvent( 'previous', {
            detail: {current:'3'}
        } ) );
    }
}