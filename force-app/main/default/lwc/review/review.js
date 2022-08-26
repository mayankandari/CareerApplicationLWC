/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, api } from 'lwc';
import getApplicationDetails from '@salesforce/apex/CareerApplicationController.getApplicationDetails';
import fetchAppData from '@salesforce/apex/CareerApplicationController.fetchAppData';
import fetchWorkHistory from '@salesforce/apex/CareerApplicationController.fetchWorkHistory';
import fetchEducation from '@salesforce/apex/CareerApplicationController.fetchEducation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Review extends LightningElement {
    @api application;
    applicationData;
    whItem='';
    objectApiName='Work_History__c';

    edItem='';
    objectEdApiName='Education__c';

    label={
        header:'Review',
        sub_header:'My Information',
        message:'Have you previously worked for our company as an employee or contractor, or are you a current contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.',
        label1:'Name',
        label2:'Address',
        label3:'Emaill',
        label4:'Phone',
        sub_sub_header:'My Experience',
        label5:'Work History (Optional)',
        sub1_header:'My Education',
        label6:'Educational (Optional)',
        label7:'Skills and Strengths (Optional)',
        label8:'Resume/CV',
        label9:'Relevant Websites (Optional)',
        label10:'Social Network URLs',
        label1l:'Please provide the URL to your LinkedIn profile.',
        subs_header:'Application Questions',
        label11:'What is your preferred geographic location?',
        label12:'Do you have the unrestricted right to work in the country to which you\'re applying? (You must answer “No” if you are on any visa or possess any government issued work authorization document that has an expiration date; you should answer “Yes” if you have DACA or TPS authorisation in the US)',
        label13:'Will you now or could you in the future require sponsorship to obtain work authorization or to transfer or extend your current visa? (You must answer “Yes” if your current visa is tied to your spouse or partner’s visa or if you are on a bridging visa or working holiday visa',
        label14:'Are you a citizen, national or resident of any of the following countries and/or regions: Iran, Cuba, North Korea, Syria, or Crimea? As a U.S. company that exports software and technology internationally, we must comply with U.S. export control laws in every country where we operate. The information provided will be used to determine whether we need to obtain an Export Control License for your employment if you are hired.',
        label15:'Regarding future positions at Salesforce, please select one of the following options',
        subset_header:'Voluntary Disclosures',
        label16:'Equal Opportunity Employment',
        label17:'Salesforce.com is proud to be an inclusive employer and welcomes applications from a diverse range of backgrounds. Please indicate your gender below.',
        label18:'Terms and Conditions',
        label19:'Yes, I have read and consent to the terms and conditions'
    }

    givenName='';
    familyName='';
    localGivenName='';
    localFamilyName='';
    address='';
    emailAdd='';
    phone='';

    previousEC='';
    preferredGL='';
    unrestrictedRW='';
    workAuth='';
    resident='';
    futurePS='';

    gender='';

    skills='';
    website='';
    urls='';

    connectedCallback(){
    //console.log('In review, the value of Application Id is '+this.application);
    getApplicationDetails({appliId:this.application})
                    .then((result)=>{

                        /**
                         * Application values
                         */
                        if(undefined!=result.Given_Name__c){
                            this.givenName=result.Given_Name__c;
                        }else{
                            this.givenName='Not Disclosed';
                        }
                        if(undefined!=result.Family_Name__c){
                            this.familyName=result.Family_Name__c;
                        }else{
                            this.familyName='Not Disclosed';
                        }
                        if(undefined!=result.Local_Given_Name_s__c){
                            this.localGivenName=result.Local_Given_Name_s__c;
                        }else{
                            this.localGivenName='Not Disclosed';
                        }
                        if(undefined!=result.Local_Family_Name__c){
                            this.localFamilyName=result.Local_Family_Name__c;
                        }else{
                            this.localFamilyName='Not Disclosed';
                        }
                        if(undefined!=result.Address_Line_1__c){
                            this.address=result.Address_Line_1__c;
                        }else{
                            this.address='';
                        }if(undefined!=result.City__c){
                            this.address=this.address+' '+result.City__c;
                        }else{
                            this.address=this.address+' ';
                        }if(undefined!=result.Country__c){
                            this.address=this.address+' '+result.Country__c;
                        }else{
                            this.address=this.address+' ';
                        }if(undefined!=result.Postal_Code__c){
                            this.address=this.address+' '+result.Postal_Code__c;
                        }else{
                            this.address=this.address+' ';
                        }
                       // this.address=result.Address_Line_1__c+', '+result.City__c+', '+result.Country__c+', '+result.Postal_Code__c;
                        if(undefined!=result.Email_Address__c){
                            this.emailAdd=result.Email_Address__c;
                        }else{
                            this.emailAdd='Not Disclosed';
                        }

                        if(undefined!=result.Country_Phone_Code__c){
                            this.phone=result.Country_Phone_Code__c;
                        }else{
                            this.phone=this.phone+' ';
                        }if(undefined!=result.Phone_Number__c){
                            this.phone=this.phone+' '+result.Phone_Number__c;
                        }else{
                            this.phone=this.phone+' ';
                        }if(undefined!=result.Phone_Device_Type__c){
                            this.phone=this.phone+' '+result.Phone_Device_Type__c;
                        }else{
                            this.phone=this.phone+' ';
                        }if(undefined!=result.Phone_Extension__c){
                            this.phone=this.phone+' '+result.Phone_Extension__c;
                        }else{
                            this.phone=this.phone+' ';
                        }
                        // this.phone=result.Country_Phone_Code__c+result.Phone_Number__c+'  '+result.Phone_Device_Type__c+'  '+
                        // result.Phone_Extension__c;
                        
                        if(undefined!=result.Previous_Employer_Contractor__c){
                            this.previousEC=result.Previous_Employer_Contractor__c;
                        }else{
                            this.previousEC='Not Disclosed';
                        }
                        if(undefined!=result.Preferred_Geographic_Location__c){
                            this.preferredGL=result.Preferred_Geographic_Location__c;
                        }else{
                            this.preferredGL='Not Disclosed';
                        }

                        //console.log(result.Right_to_Work__c);

                        if(undefined!=result.Right_to_Work__c){
                            this.unrestrictedRW=result.Right_to_Work__c;
                        }else{
                            this.unrestrictedRW='Not Disclosed';
                        }
                        if(undefined!=result.Work_Authorization__c){
                            this.workAuth=result.Work_Authorization__c;
                        }else{
                            this.workAuth='Not Disclosed';
                        }
                        if(undefined!=result.Future_Positions__c){
                            this.futurePS=result.Future_Positions__c;
                        }else{
                            this.futurePS='Not Disclosed';
                        }
                        if(undefined!=result.Gender__c){
                            this.gender=result.Gender__c;
                        }else{
                            this.gender='Not Disclosed';
                        }
                        if(undefined!=result.National_Resident__c){
                            this.resident=result.National_Resident__c;
                        }else{
                            this.resident='Not Disclosed';
                        }

                        /**
                         * Fetching Work Experience Details
                         */
                         fetchWorkHistory({appliId:this.application})
                                .then((result)=>{
                                        this.whItem=result;
                                       // console.log('whItem is'+this.whItem);
                                        fetchEducation({appliId:this.application}).then((result)=>{
                                            this.edItem=result;
                                            fetchAppData({appliId:this.application})
                                                .then((result)=>{
                                                    if(null!=result.Skills_and_Strengths__c){
                                                        this.skills=result.Skills_and_Strengths__c;
                                                    }
                                                    if(null!=result.Relevant_Websites__c){                                                        
                                                        this.website=result.Relevant_Websites__c;
                                                    }
                                                    if(null!=this.urls){
                                                        this.urls=result.Social_Network_URLs__c;
                                                    }
                                                });
                                        });
                                });
                    });
    }

    handleInput(){ 
       // console.log('Handled');
        this.dispatchEvent( new CustomEvent( 'previous', {
            detail: {current:'6'}
        } ) );
    }
    handlePrevious(){
       // console.log('Inside My Handle Previous Review');
        this.dispatchEvent( new CustomEvent( 'previous', {
            detail: {current:'4'}
        } ) );
    }
}