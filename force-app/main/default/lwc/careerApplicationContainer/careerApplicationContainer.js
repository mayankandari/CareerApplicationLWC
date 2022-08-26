/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 08-26-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement, track } from 'lwc';

export default class CareerApplicationContainer extends LightningElement {
    
    @track currentVal=1;
    myinfo=true;
    myexp=false;
    appque=false;
    volunt=false;
    rev=false;
    final=false;
    @track application;

    fetchValue( event ) {
        //console.log( 'Value from Child LWC is ' + event.detail.current);
        this.currentVal=event.detail.current;
        //console.log('Value from child'+event.detail);
        if(null!=event.detail.applicationid){            
            this.application=event.detail.applicationid;
        }
        //console.log('Id is'+this.application);
        if(this.currentVal==='2'){
            this.myinfo=false;
            this.myexp=true;
            this.appque=false;
            this.volunt=false;
            this.rev=false;
            this.final=false;
        }else if(this.currentVal==='3'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=true;
            this.volunt=false;
            this.rev=false;
            this.final=false;
        }else if(this.currentVal==='4'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=false;
            this.volunt=true;
            this.rev=false;
            this.final=false;
        }else if(this.currentVal==='5'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=false;
            this.volunt=false;
            this.rev=true;
            this.final=false;
        }
    }

    previousComp( event ){
        //console.log( 'Value from Child LWC in back is ' + event.detail.current);
        this.currentVal=event.detail.current;
        if(null!=event.detail.applicationid){            
            this.application=event.detail.applicationid;
        }
        console.log('Id in Career Application Container is'+this.application);
        if(this.currentVal==='1'){
            this.myinfo=true;
            this.myexp=false;
            this.appque=false;
            this.volunt=false;
            this.rev=false;
        }else if(this.currentVal==='2'){
            this.myinfo=false;
            this.myexp=true;
            this.appque=false;
            this.volunt=false;
            this.rev=false;
        }else if(this.currentVal==='3'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=true;
            this.volunt=false;
            this.rev=false;
        }else if(this.currentVal==='4'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=false;
            this.volunt=true;
            this.rev=false;
        }else if(this.currentVal==='6'){
            this.myinfo=false;
            this.myexp=false;
            this.appque=false;
            this.volunt=false;
            this.rev=false;
            this.final=true;
        }
    }
}