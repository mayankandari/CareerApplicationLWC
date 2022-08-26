/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, api } from 'lwc';
import updateApplicationQuestions from '@salesforce/apex/CareerApplicationController.updateApplicationQuestions';
import getApplicationDetails from '@salesforce/apex/CareerApplicationController.getApplicationDetails';

export default class ApplicationsQuestions extends LightningElement {
    @api application;
    applicationId;

    prefGL=false;
    preunRTW=false;
    preWAO=false;
    prenationalResident=false;
    prefuturePos=false;

    label={
        header:'Application Questions',
        req:'Indicates a required field',
        label1:'What is your preferred geographic location?',
        label2:'Do you have the unrestricted right to work in the country to which you\'re applying? (You must answer “No” if you are on any visa or possess any government issued work authorization document that has an expiration date; you should answer “Yes” if you have DACA or TPS authorisation in the US)',
        label3:'Will you now or could you in the future require sponsorship to obtain work authorization or to transfer or extend your current visa? (You must answer “Yes” if your current visa is tied to your spouse or partner’s visa or if you are on a bridging visa or working holiday visa',
        label4:'Are you a citizen, national or resident of any of the following countries and/or regions: Iran, Cuba, North Korea, Syria, or Crimea? As a U.S. company that exports software and technology internationally, we must comply with U.S. export control laws in every country where we operate. The information provided will be used to determine whether we need to obtain an Export Control License for your employment if you are hired.',
        label5:'Regarding future positions at Salesforce, please select one of the following options'
    }
    
    preferredGeographicLocation='';

    rightToWork='';
    get rightToWorkOptions(){
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' }
        ];
    }
    handleChange(event) {
        this.rightToWork = event.detail.value;
        this.prefGL=true;
    }

    workAuthorization='';
    get workAuthorizationOptions(){
        return[
            {label:'Yes', value:'Yes'},
            {label:'No', value:'No'}
        ];
    }
    handleWAChange(event) {
        this.workAuthorization = event.detail.value;
        this.preunRTW=false;
    }

    nationalResident='';
    get nationalResidentOptions(){
        return[
            {label:'Yes', value:'Yes'},
            {label:'No', value:'No'}
        ];    
    }
    handleNRChange(event){
        this.nationalResident=event.detail.value;
        this.prenationalResident=false;
    }

    futureOptions='';
    get futureWorkOptions(){
        return[
            {label:'Yes, I would like to receive future communications about careers, etc.', value:'Yes, I would like to receive future communications about careers, etc.'},
            {label:'No, please do not connect me for future openings', value:'No, please do not connect me for future openings'}
        ];
    }
    handleFWOChange(event){
        this.futureOptions=event.detail.value;
        this.prefuturePos=false;
    }

    handleInput(){
        //console.log('In Application Questions the id is '+this.application);
        this.preferredGeographicLocation = this.template.querySelector('lightning-textarea').value;
        if(this.preferredGeographicLocation!='' || this.rightToWork!='' || this.workAuthorization!='' || this.nationalResident!='' || this.futureOptions!=''){    
                        updateApplicationQuestions({
                            appliId:this.application,
                            preferredGeographicLocation:this.preferredGeographicLocation,
                            rightToWork:this.rightToWork,
                            workAuthorization:this.workAuthorization,
                            nationalResident:this.nationalResident,
                            futureOptions:this.futureOptions
                        }).then(
                            (result)=>{
                           // console.log('In result'+result);
                            this.error=undefined;
                            this.applicationId=result;
                            this.dispatchEvent( new CustomEvent( 'pass', {
                                detail: {current:'4'}
                            } ) );
                        }).error(
                            (error)=>{
                           // console.log('Error in AQ');
                            this.error=error;
                            this.applicationId=undefined;
                        });
            }else{
                if(this.preferredGeographicLocation===''){
                    this.prefGL=true;
                } if(this.rightToWork===''){
                    this.preunRTW=true;
                } if(this.workAuthorization===''){
                    this.preWAO=true;
                } if(this.nationalResident===''){
                    this.prenationalResident=true;
                } if(this.futureOptions===''){    
                    this.prefuturePos=true;
                }
        
    }}

    handlePrevious(){
       // console.log('Inside My Handle Previous Application Questions');
        this.dispatchEvent( new CustomEvent( 'previous', {
            detail: {current:'2'}
        } ) );
    }

    
    connectedCallback(){
        //console.log('In Application Questions is ' +this.application);
        if(undefined!=this.application){
            getApplicationDetails({appliId:this.application})
                        .then((result)=>{
                            // console.log(result);
                            // console.log('PGL'+result.Preferred_Geographic_Location__c);
                            // console.log('RTW'+result.Right_to_Work__c);
                            this.preferredGeographicLocation=result.Preferred_Geographic_Location__c;
                            this.rightToWork=result.Right_to_Work__c;
                            this.workAuthorization=result.Work_Authorization__c;
                            this.nationalResident=result.National_Resident__c;
                            this.futureOptions=result.Future_Positions__c;
                        });
        }
    }
}