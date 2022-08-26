/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, api, wire } from 'lwc';
import createApplication from '@salesforce/apex/CareerApplicationController.createApplication';
import getApplicationDetails from '@salesforce/apex/CareerApplicationController.getApplicationDetails';
import updateApplication from '@salesforce/apex/CareerApplicationController.updateApplication';

export default class MyInformation extends LightningElement {
    @api application;
    //labels and fields for the input to be taken from user
    givenName='';
    familyName='';
    localGivenName='';
    localFamilyName='';
    addressLine1='';
    city='';
    postalCode='';
    emailAddress='';
    phoneNumber='';
    phoneExtension='';
    employee_email_address='';
    work_location='';
    manager_name='';
    employee_id='';
    label={
        header:'My Information',
        req:'Indicates a required field',
        message:'Have you previously worked for our company as an employee or contractor, or are you a current contractor? If "Yes" please provide at least one piece of information below, as accurately as possible. CURRENT EMPLOYEES: Please apply internally.*',
        label1:'Country',
        label2:'Name',
        label3:'Given Name(s)',
        label4:'Family Name',
        label5:'Local Given Name(s)',
        label6:'Local Family Name',
        label7:'Address',
        label8:'Address Line 1',
        label9:'City',
        label10:'Postal Code',
        label11:'Email Address',
        label12:'Phone',
        label13:'Phone Device Type',
        label14:'Country Phone Code',
        label15:'Phone Number',
        label16:'Phone Extension',
        label17:'Your previous Salesforce employee email address',
        label18:'Your previous Salesforce work location',
        label19:'Your most recent Salesforce manager name',
        label20:'Your previous Salesforce employee ID'
    }
    //method to handle previous employee combobox values
    previousemployeevalue='';
    middleware=false;
    get previousemployeeoptions() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }
    handlePreviousemployee(event){
        this.previousemployeevalue=event.detail.value;
        this.preReq=false;
        if(this.previousemployeevalue==='Yes'){
             this.middleware=true;
        }else if(this.previousemployeevalue==='No'){
            this.middleware=false;
        }
    }  
    //method to handle country combo box value changes
    countryvalue='';
    get countryoptions() {
        return [
            { label: 'India', value: 'India' },
            { label: 'Japan', value: 'Japan' },
            { label: 'England', value: 'England' },
        ];
    }
    handleChange(event) {
        this.countryvalue = event.detail.value;
        this.preC=false;
    }
    //method to handle phone device type combobox value changes
    phonedevicetypevalue='';
    get phonedevicetypeoptions(){
        return [
            {label:'eFax1', value:'eFax1'},
            {label:'eFax2', value:'eFax2'}
        ]
    }
    handlePhoneChange(event){
        this.phonedevicetypevalue=event.detail.value;
        this.prePD=false;
    }
    //method to handle country phone combo box changes
    countryphonecodevalue='';
    get countryphoneoptions(){
        return [
            {label:'India (+91)', value:'India (+91)'}
        ]
    }
    handleCPCChange(event){
        this.countryphonecodevalue=event.detail.value;
        this.preCP=false;
    }
    //Method to handle lightning-input on multiple fields
    handleGenericChange(event){
        if(event.target.name===this.label.label3){
                this.givenName=event.target.value;
                this.preGN=false;
        }else if(event.target.name===this.label.label4){
                this.familyName=event.target.value;
                this.preFN=false;
        }else if(event.target.name===this.label.label5){
                this.localGivenName=event.target.value;
        }else if(event.target.name===this.label.label6){
                this.localFamilyName=event.target.value;
        }else if(event.target.name===this.label.label8){
                this.addressLine1=event.target.value;
        }else if(event.target.name===this.label.label9){
                this.city=event.target.value;
        }else if(event.target.name===this.label.label10){
                this.postalCode=event.target.value;
                this.preCP=false;
        }else if(event.target.name===this.label.label11){
                this.emailAddress=event.target.value;
                this.preEA=false;
        }else if(event.target.name===this.label.label15){
                this.phoneNumber=event.target.value;
                this.prePN=false;
        }else if(event.target.name===this.label.label16){
                this.phoneExtension=event.target.value;
        }
        else if(event.target.name===this.label.label17){
                    this.employee_email_address=event.target.value;
            }else if(event.target.name===this.label.label18){
                    this.work_location=event.target.value;
            }else if(event.target.name===this.label.label19){
                    this.manager_name=event.target.value;
            }else if(event.target.name===this.label.label20){
                    this.employee_id=event.target.value;
            }
       
    }
    @api applicationId;
    requ=false;
    preReq=false;
    preC=false;
    preGN=false;
    preCP=false;
    preEA=false;
    preFN=false;
    prePD=false;
    prePN=false;
    //operations to be performed on click of the button
    handleInput(){
        //console.log('Inside Handle Input');
        if(this.previousemployeevalue==='No'){
            this.employee_email_address='';
            this.employee_id='';
            this.work_location='';
            this.manager_name='';
        }  
        if(this.previousemployeevalue!='' && this.countryvalue!='' && this.givenName!='' && this.familyName!='' 
                && this.emailAddress!='' && this.phonedevicetypevalue!='' && this.countryphonecodevalue!='' && this.phoneNumber!=''){ 
                    console.log('Inside'+' '+this.application);  
                    if(undefined===this.application || ''===this.application){
                                        createApplication({Previous_Employer_Contractor: this.previousemployeevalue,
                                            Country: this.countryvalue, 
                                            Given_Name: this.givenName,
                                            Family_Name: this.familyName,
                                            Local_Given_Name_s: this.localGivenName,
                                            Local_Family_Name: this.localFamilyName,
                                            Address_Line_1: this.addressLine1,
                                            City: this.city,
                                            Postal_Code: this.postalCode,
                                            Email_Address: this.emailAddress,
                                            Phone_Device_Type: this.phonedevicetypevalue,
                                            Country_Phone_Code: this.countryphonecodevalue,
                                            Phone_Number: this.phoneNumber,
                                            Phone_Extension: this.phoneExtension,
                                            employee_email_address: this.employee_email_address,
                                            employee_id: this.employee_id,
                                            work_location: this.work_location,
                                            manager_name: this.manager_name
                        })
                                .then((result)=>
                                        {
                                           // console.log('inserted in myinfo');
                                            this.applicationId=result;
                                           // console.log(this.applicationId);
                                            this.error=undefined; 
                                            //console.log(result);
                                            this.dispatchEvent( new CustomEvent( 'pass', {
                                                detail: {current:'2',applicationid:this.applicationId}
                                            } ) );
                                        })
                                .error((error)=>
                                        {
                                            //console.log('in error');
                                            this.error=error; 
                                            this.applicationId=undefined; 
                                            //console.log(this.error)
                                        });
                                }
                            else {
                                updateApplication({appliId:this.application,Previous_Employer_Contractor: this.previousemployeevalue,
                                    Country: this.countryvalue, 
                                    Given_Name: this.givenName,
                                    Family_Name: this.familyName,
                                    Local_Given_Name_s: this.localGivenName,
                                    Local_Family_Name: this.localFamilyName,
                                    Address_Line_1: this.addressLine1,
                                    City: this.city,
                                    Postal_Code: this.postalCode,
                                    Email_Address: this.emailAddress,
                                    Phone_Device_Type: this.phonedevicetypevalue,
                                    Country_Phone_Code: this.countryphonecodevalue,
                                    Phone_Number: this.phoneNumber,
                                    Phone_Extension: this.phoneExtension,
                                    employee_email_address: this.employee_email_address,
                                    employee_id: this.employee_id,
                                    work_location: this.work_location,
                                    manager_name: this.manager_name
                })
                        .then((result)=>
                                {
                                   // console.log('updated in myinfo');
                                    this.applicationId=result;
                                  //  console.log(this.applicationId);
                                    this.error=undefined; 
                                    //console.log(result);
                                    this.dispatchEvent( new CustomEvent( 'pass', {
                                        detail: {current:'2',applicationid:this.applicationId}
                                    } ) );
                                })
                        .error((error)=>
                                {
                                    //console.log('in error');
                                    this.error=error; 
                                    this.applicationId=undefined; 
                                    //console.log(this.error)
                                });
                            }
                    }else{
                        this.requ=true;
                        if(this.previousemployeevalue===''){
                            this.preReq=true;
                        } if(this.countryvalue===''){
                            this.preC=true;
                        } if(this.givenName===''){
                            this.preGN=true;
                        } if(this.familyName===''){
                            this.preFN=true;
                        } if(this.emailAddress===''){
                            this.preEA=true;
                        } if(this.phonedevicetypevalue===''){
                            this.prePD=true;
                        } if(this.countryphonecodevalue===''){
                            this.preCP=true;
                        } if(this.phoneNumber===''){ 
                            this.prePN=true;
                        }
                    }
        }  
        connectedCallback(){
           // console.log('My Information, the application id is '+this.application);
            if(undefined!=this.application){
                getApplicationDetails({appliId:this.application})
                                        .then(
                                            (result)=>
                                                {
                                                    console.log(result);
                                                    this.previousemployeevalue=result.Previous_Employer_Contractor__c;
                                                    this.countryvalue=result.Country__c;
                                                    this.givenName=result.Given_Name__c;
                                                    this.familyName=result.Family_Name__c;
                                                    this.localGivenName=result.Local_Given_Name_s__c;
                                                    this.localFamilyName=result.Local_Family_Name__c;
                                                    this.addressLine1=result.Address_Line_1__c;
                                                    this.city=result.City__c;
                                                    this.postalCode=result.Postal_Code__c;
                                                    this.emailAddress=result.Email_Address__c;
                                                    this.phonedevicetypevalue=result.Phone_Device_Type__c;
                                                    this.countryphonecodevalue=result.Country_Phone_Code__c;
                                                    this.phoneNumber=result.Phone_Number__c;
                                                    this.phoneExtension=result.Phone_Extension__c;
                                                    this.localGivenName=result.Local_Given_Name_s__c;
                                                    this.localFamilyName=result.Local_Family_Name__c;
                                                });
            }
           // console.log('My Information, the new application id is '+this.application);
        }
}