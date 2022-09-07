/**
 * @description       : 
 * @author            : Mayank Singh Kandari
 * @group             : 
 * @last modified on  : 09-06-2022
 * @last modified by  : Mayank Singh Kandari
**/
import { LightningElement } from 'lwc';

export default class WeatherAPIDesign extends LightningElement {
    
    mapMarkers = [];
   
    connectedCallback(){
        this.getCitiesByCountry();
        }

        /**
         * Fetch cities for Country - India via countries now API
         */
        getCitiesByCountry(){
            fetch('https://countriesnow.space/api/v0.1/countries')
                .then(response=>{return response.json()})
                .then(data=>{
                    for(let i in data.data){
                        if(data.data[i].country==='India'){
                            
                            console.log('In country'+data.data[i]);
                            for(let j in data.data[i].cities){
                                if(j<16){
                                this.getCoordinates(data.data[i].cities[j], 'IN');
                                }
                            }
                        
                        }
                    }
                });       
        }
    
    /**
     * get coordinates on basis of city, state, country via Weather API
     * calls @getWeatherData() method
     */
    getCoordinates(city, country){
        let coordinates=[];
        fetch('https://api.openweathermap.org/geo/1.0/direct?q='+city+','+country+'&limit=5&appid=b1e4824a2b43691a3f2a6dc9cc677b6f')
                .then(response =>{
                    return response.json();
                }).then(data =>{
                    coordinates=[...coordinates,{lat:data[0].lat,lon:data[0].lon}];
                    this.getWeatherData(coordinates);
                });
    }

    /**
     * get Weather Data on basis of coordinates
     * makes the call to Weather API
     */
    getWeatherData(coordinates){
        console.log('In GWD'+JSON.stringify(coordinates));
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+coordinates[0].lat+'&lon='+coordinates[0].lon+'&appid=b1e4824a2b43691a3f2a6dc9cc677b6f')
                .then(response=>{
                    return response.json();
                }).then(data=>{
                //    alert('Weather Data '+JSON.stringify(data)); 
                   this.mapMarkers=[...this.mapMarkers,
                                        {
                                            location:{Latitude:data.coord.lat, Longitude:data.coord.lon}, 
                                            title:data.name+','+data.sys.country,
                                            description:'Current Temperature is '+Math.round(data.main.temp-273.15)
                                                        +'&#8451. <br/> Feels like '+Math.round(data.main.feels_like-273.15)
                                                        +'&#8451. <br/> Humidity : '+data.main.humidity+' <i class="fa fa-cloud" style="font-size:48px;color:red"></i>'
                                        }];
                });
    }  
}