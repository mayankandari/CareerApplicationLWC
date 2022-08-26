/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
public with sharing class CareerApplicationController {

    //method to create new application
    @AuraEnabled
    public static String createApplication(String Previous_Employer_Contractor,
                                           String Country,String Given_Name, 
                                        String Family_Name,
                                        String Local_Given_Name_s, 
                                        String Local_Family_Name,
                                        String Address_Line_1,
                                        String City,
                                        Integer Postal_Code,
                                        String Email_Address,
                                        String Phone_Device_Type,
                                        String Country_Phone_Code,
                                        String Phone_Number,
                                        String Phone_Extension,
                                        String employee_email_address,
                                        String employee_id,
                                        String work_location,
                                        String manager_name ){
        Application__c application=new Application__c();
                    application.Previous_Employer_Contractor__c=Previous_Employer_Contractor;
                    application.Country__c=Country;
                    application.Given_Name__c=Given_Name;
                    application.Family_Name__c=Family_Name;
                    application.Local_Given_Name_s__c=Local_Given_Name_s;
                    application.Local_Family_Name__c=Local_Family_Name;
                    application.Address_Line_1__c=Address_Line_1;
                    application.City__c=City;
                    application.Postal_Code__c=Postal_Code;
                    application.Email_Address__c=Email_Address;
                    application.Phone_Device_Type__c=Phone_Device_Type;
                    application.Country_Phone_Code__c=Country_Phone_Code;
                    application.Phone_Number__c=Phone_Number;
                    application.Phone_Extension__c=Phone_Extension;
                    application.Previous_Employee_Email_Address__c=employee_email_address;
                    application.Previous_Employee_ID__c=employee_id;
                    application.Previous_Work_Location__c=work_location;
                    application.Previous_Manager_Name__c=manager_name;
                    if(Schema.SObjectType.Application__c.isCreateable()){
                        insert application;
                    }
        
        return application.Id;
    }

    @AuraEnabled
    public static String updateApplication(String appliId,String Previous_Employer_Contractor,
                                           String Country,String Given_Name, 
                                        String Family_Name,
                                        String Local_Given_Name_s, 
                                        String Local_Family_Name,
                                        String Address_Line_1,
                                        String City,
                                        Integer Postal_Code,
                                        String Email_Address,
                                        String Phone_Device_Type,
                                        String Country_Phone_Code,
                                        String Phone_Number,
                                        String Phone_Extension,
                                        String employee_email_address,
                                        String employee_id,
                                        String work_location,
                                        String manager_name ){
        Application__c application=[Select Id,Previous_Employer_Contractor__c,Country__c,
        Given_Name__c, Family_Name__c, Local_Given_Name_s__c, Local_Family_Name__c, Address_Line_1__c, City__c,
        Postal_Code__c, Email_Address__c, Phone_Device_Type__c, Country_Phone_Code__c, Phone_Number__c, Phone_Extension__c,
        Previous_Employee_Email_Address__c, Previous_Employee_ID__c, Previous_Work_Location__c, Previous_Manager_Name__c
                                     from Application__c where Id=:appliId WITH SECURITY_ENFORCED];
                    application.Previous_Employer_Contractor__c=Previous_Employer_Contractor;
                    application.Country__c=Country;
                    application.Given_Name__c=Given_Name;
                    application.Family_Name__c=Family_Name;
                    application.Local_Given_Name_s__c=Local_Given_Name_s;
                    application.Local_Family_Name__c=Local_Family_Name;
                    application.Address_Line_1__c=Address_Line_1;
                    application.City__c=City;
                    application.Postal_Code__c=Postal_Code;
                    application.Email_Address__c=Email_Address;
                    application.Phone_Device_Type__c=Phone_Device_Type;
                    application.Country_Phone_Code__c=Country_Phone_Code;
                    application.Phone_Number__c=Phone_Number;
                    application.Phone_Extension__c=Phone_Extension;
                    application.Previous_Employee_Email_Address__c=employee_email_address;
                    application.Previous_Employee_ID__c=employee_id;
                    application.Previous_Work_Location__c=work_location;
                    application.Previous_Manager_Name__c=manager_name;
                    if(Schema.SObjectType.Application__c.isUpdateable()){
                        update application;
                    }
        return application.Id;
    }

    //method to update Application with ApplicationQuestions
    @AuraEnabled
    public static String updateApplicationQuestions(String appliId,
                                                    String preferredGeographicLocation,
                                                    String rightToWork,
                                                    String workAuthorization,
                                                    String nationalResident,
                                                    String futureOptions){
        Application__c application;
        if(null!=appliId){
            application=[Select Id,Preferred_Geographic_Location__c,Right_to_Work__c,Work_Authorization__c,National_Resident__c,Future_Positions__c
                             from Application__c where Id=:appliId WITH SECURITY_ENFORCED];
                             
                                application.Preferred_Geographic_Location__c=preferredGeographicLocation;
                                application.Right_to_Work__c=rightToWork;
                                application.Work_Authorization__c=workAuthorization;
                                application.National_Resident__c=nationalResident;
                                application.Future_Positions__c=futureOptions;
        }
        if(Schema.sObjectType.Application__c.isUpdateable()){
            update application;
        }
        return application.Id;
    }

    //method to insert Voluntary Disclousre details
    @AuraEnabled
    public static String updateVoluntaryDisclosures(String appliId, String gender){
        Application__c application=[Select Id, Gender__c from Application__c where Id=:appliId WITH SECURITY_ENFORCED];
        application.Gender__c=gender;
        if(Schema.SObjectType.Application__c.isUpdateable()){
            update application;
        }
        return application.Id;
    }

    //method to fetch Application Details
    @AuraEnabled
    public static Application__c getApplicationDetails(String appliId){
        Application__c application=
                            [Select Id, Address_Line_1__c, Name, City__c, Country__c, Country_Phone_Code__c, Email_Address__c, Family_Name__c,
                            Future_Positions__c, Gender__c, Given_Name__c, Local_Family_Name__c, Local_Given_Name_s__c, National_Resident__c,
                            Phone_Device_Type__c, Phone_Extension__c, Phone_Number__c, Postal_Code__c, Preferred_Geographic_Location__c,
                            Previous_Employee_Email_Address__c, Previous_Employer_Contractor__c, Previous_Manager_Name__c,
                            Previous_Work_Location__c, Previous_Employee_ID__c, Right_to_Work__c, Work_Authorization__c
                            from Application__c where Id=:appliId WITH SECURITY_ENFORCED];
        if(null!=application){
            return application;
        }else{
            return null;
        }
    }

    //fetching required values from Application
    @AuraEnabled 
    public static Application__c fetchAppData(String appliId){
        Application__c application=[Select Id,Skills_and_Strengths__c, Social_Network_URLs__c, Relevant_Websites__c 
                                            FROM Application__c WHERE Id=:appliId WITH SECURITY_ENFORCED];        
        return application;                                        
    }

    //fetching workHistory
    @AuraEnabled 
    public static List<Work_History__c> fetchWorkHistory(String appliId){
        List<Work_History__c> workHistory=[SELECT Id, Job_Title__c, Location__c, Company__c, Current_Job__c, From_Date__c, To_Date__c, Application__c, Role_Description__c, MapId__c 
        FROM Work_History__c WHERE Application__c=:appliId WITH SECURITY_ENFORCED ];
        return workHistory;
    }

    //fetching education
    @AuraEnabled
    public static List<Education__c> fetchEducation(String appliId){
        List<Education__c> education=[SELECT Id, Name, School_or_University__c, Degree__c, Field_Of_Study__c, From__c, To_Date__c, Application__c, MapId__c 
        FROM Education__c WHERE Application__c=:appliId WITH SECURITY_ENFORCED ];
        return education;
    }
}
