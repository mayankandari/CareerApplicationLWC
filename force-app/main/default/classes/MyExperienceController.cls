/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
public with sharing class MyExperienceController {

    //method to call the other methods
    @AuraEnabled 
    public static String insertOrUpdateWHE(String appliId, String ed, String wh, String skills, String snurl, String relWeb){
       insertOrUpdateEducation(appliId, ed);
       updateOrInsertWorkHistory(appliId, wh);
       updateExperience(appliId, skills, snurl, relWeb);
        return wh;
    }

    //Education
    //for creating Education__c object
    public static Education__c createEducation(Map<String,Object> objMap, String appliId){
        Education__c tempEdu=new Education__c();
        tempEdu.MapId__c=String.valueOf(objMap.get('id'));
        tempEdu.School_or_University__c=(String)objMap.get('school');
        tempEdu.Degree__c=(String)objMap.get('degree');
        tempEdu.Field_Of_Study__c=(String)objMap.get('field_study');

        if(String.isNotBlank(((String)objMap.get('from_ed')))){
            Date d1=Date.valueOf((String)objMap.get('from_ed'));
            tempEdu.From__c=Date.newInstance(d1.year(),d1.month(),d1.day());
        }
        if(String.isNotBlank(((String)objMap.get('to_date_ed')))){    
            Date d2=Date.valueOf((String)objMap.get('to_date_ed'));
            tempEdu.To_Date__c=Date.newInstance(d2.year(),d2.month(),d2.day());
        }
        tempEdu.Application__c=appliId;
        return tempEdu;
    }

    //method to insert or update Education for an Application
    @AuraEnabled 
    public static String insertOrUpdateEducation(String appliId,String ed){
        List<Education__c> education=[SELECT Id,MapId__c, School_or_University__c, Degree__c, Field_Of_Study__c, From__c, To_Date__c, Application__c 
                                        FROM Education__c WHERE Application__c=:appliId WITH SECURITY_ENFORCED];
        List<Education__c> newEducation=new List<Education__c>();          
        List<Education__c> newEducation1=new List<Education__c>();          
        if(null!=education && education.size()>0){
          for(Education__c tempEdu: education){
            List<Object> edObject=(List<Object>)JSON.deserializeUntyped(ed);
                for(Object obj:edObject){
                        Map<String,Object> objMap=(Map<String,Object>)obj;
                        if(tempEdu.MapId__c==String.valueOf(objMap.get('id'))){

                                    tempEdu.School_or_University__c=(String)objMap.get('school');
                                    tempEdu.Degree__c=(String)objMap.get('degree');
                                    tempEdu.Field_Of_Study__c=(String)objMap.get('field_study');
                            
                                    if(String.isNotBlank(((String)objMap.get('from_ed')))){
                                        Date d1=Date.valueOf((String)objMap.get('from_ed'));
                                        tempEdu.From__c=Date.newInstance(d1.year(),d1.month(),d1.day());
                                    }
                                    if(String.isNotBlank(((String)objMap.get('to_date_ed')))){
                                        Date d2=Date.valueOf((String)objMap.get('to_date_ed'));
                                        tempEdu.To_Date__c=Date.newInstance(d2.year(),d2.month(),d2.day());
                                    }
                                    //tempEdu.Application__c=appliId;
                                    newEducation.add(tempEdu);
                             }else{
                                    Education__c tempEdu1=createEducation(objMap,appliId);
                                    newEducation1.add(tempEdu1); 
                             }
                }
            }if(newEducation.size()>0){
                update newEducation; }
            if(newEducation1.size()>0){
                    insert newEducation1;
                }
            
        }else{
            List<Object> edObject=(List<Object>)JSON.deserializeUntyped(ed);
                for(Object obj:edObject){
                        Map<String,Object> objMap=(Map<String,Object>)obj;
                        Education__c tempEdu=createEducation(objMap,appliId);
                        newEducation.add(tempEdu);
                }
            insert newEducation;
        }
        return null;
    }

    /**
     *WorkHistory
     //for creation of Work History Object 
     */
    @AuraEnabled 
     public static Work_History__c createWorkHistory(Map<String,Object> objMap, String appliId){
        Work_History__c tempWork=new Work_History__c();
        tempWork.MapId__c=String.valueOf(objMap.get('id'));
        tempWork.Job_Title__c=(String)objMap.get('job_title');
        tempWork.Company__c=(String)objMap.get('company');
        tempWork.Location__c=(String)objMap.get('location');
        tempWork.Current_Job__c=(Boolean)objMap.get('checkboxe');
       
        if(String.isNotBlank(((String)objMap.get('from_date')))){
            Date d1=Date.valueOf((String)objMap.get('from_date'));
            tempWork.From_Date__c=Date.newInstance(d1.year(),d1.month(),d1.day());
        }
        if(String.isNotBlank(((String)objMap.get('to_date')))){    
            Date d2=Date.valueOf((String)objMap.get('to_date'));
            tempWork.To_Date__c=Date.newInstance(d2.year(),d2.month(),d2.day());
        }
       
        tempWork.Role_Description__c=(String)objMap.get('role');
        tempWork.Application__c=appliId;
        return tempWork;
    }

    /**
     *     //method to insert or update Work History of an Application
     */
    @AuraEnabled 
    public static String updateOrInsertWorkHistory(String appliId,String wh){
         List<Work_History__c> workHistoy=[SELECT Id, Job_Title__c, Company__c, Location__c, Current_Job__c, 
                                             From_Date__c, To_Date__c, Role_Description__c, Application__c, MapId__c 
                                             FROM Work_History__c WHERE Application__c=:appliId WITH SECURITY_ENFORCED];
         List<Work_History__c> newWorkHistory= new List<Work_History__c>();
         List<Work_History__c> newWorkHistory1=new List<Work_History__c>();
        if(null!=workHistoy && workHistoy.size()>0){
            for(Work_History__c tempWork: workHistoy){
                 List<Object> whObject=(List<Object>)JSON.deserializeUntyped(wh);
                     for(Object obj:whObject){
                            Map<String,Object> objMap=(Map<String,Object>)obj;
                             if(tempWork.MapId__c==String.valueOf(objMap.get('id'))){
                                            tempWork.MapId__c=String.valueOf(objMap.get('id'));
                                            tempWork.Job_Title__c=(String)objMap.get('job_title');
                                            tempWork.Company__c=(String)objMap.get('company');
                                            tempWork.Location__c=(String)objMap.get('location');
                                            tempWork.Current_Job__c=(Boolean)objMap.get('checkboxe');
                                        
                                            if(String.isNotBlank(((String)objMap.get('from_date')))){
                                                Date d1=Date.valueOf((String)objMap.get('from_date'));
                                                tempWork.From_Date__c=Date.newInstance(d1.year(),d1.month(),d1.day());
                                            }
                                             if(String.isNotBlank(((String)objMap.get('to_date')))){    
                                                Date d2=Date.valueOf((String)objMap.get('to_date'));
                                                tempWork.To_Date__c=Date.newInstance(d2.year(),d2.month(),d2.day());
                                             }
                                        
                                            tempWork.Role_Description__c=(String)objMap.get('role');
                                            newWorkHistory.add(tempWork);
                                 }else{
                                    Work_History__c tempWh1=createWorkHistory(objMap,appliId);
                                    newWorkHistory1.add(tempWh1); 
                                 }
                            }}if(newWorkHistory.size()>0){
                                    update newWorkHistory; 
                                 }
                                 if(newWorkHistory1.size()>0){
                                     insert newWorkHistory1;
                                 }}
                            
                                 else{
                                List<Object> whObject=(List<Object>)JSON.deserializeUntyped(wh);
                                    for(Object obj:whObject){
                                            Map<String,Object> objMap=(Map<String,Object>)obj;
                                            Work_History__c tempWork=createWorkHistory(objMap,appliId);
                                            newWorkHistory.add(tempWork);
                                    }
                                insert newWorkHistory;
            }
        return wh;
    }

    //update Skills, Relavent Websites and Social Network URLs
    @AuraEnabled 
    public static String updateExperience(String appliId,String skills, String snurl, String relWeb){
        Application__c application=[Select Id,Skills_and_Strengths__c, Social_Network_URLs__c, Relevant_Websites__c from Application__c
                                        WHERE Id=:appliId WITH SECURITY_ENFORCED];
        if(null!=application){
            application.Skills_and_Strengths__c=skills;
            application.Social_Network_URLs__c=snurl;
            application.Relevant_Websites__c=relWeb;
        }
        if(Schema.SObjectType.Application__c.isUpdateable()){
            update application;
        }

        return application.Id;
    }

    @AuraEnabled(cacheable=false)
    public static List<ContentDocumentLink> fetchFiles(String recordId){
        return [SELECT LinkedEntityId, ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType 
                    FROM ContentDocumentLink  
                WHERE LinkedEntityId  =:recordId];
    }
}
