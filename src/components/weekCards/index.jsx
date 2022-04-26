import { Fragment, useState, useEffect } from 'react';
import OneDayCardWeek from '../oneDayCardWeek';
import './style.css';
import ApiKey from "../apiKey";


const apiKey  = ApiKey

const arrayWeekDaysInit = [

                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} },
                { dt: 0, weather :[{icon: '01d'}], temp:{min: 0, max: 0} }

            ]

                    

export default function WeekCards(props){

    const [ arrayWeekDays, upDateArrayWeekDays ] = useState(arrayWeekDaysInit);
    



    async function dataWeatherByLatLon(lat, lon){
        if ( (lat === '') || (lon === ''))
        {
            console.log('latitud y longitud vacios')
        }else{

            const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            
            const date = await d.json();
            console.log(date);

            console.log(date?.daily.slice(1,date?.daily.lenght));

            upDateArrayWeekDays(date?.daily.slice(1,date?.daily.lenght));


        }
    }




useEffect( () => {
    dataWeatherByLatLon(props.lat, props.lon);

}, [props.lat, props.lon, props.temperatureFormat]);




    return(

        <Fragment>
            { 

            arrayWeekDays.map( (element, index) =>

                            <OneDayCardWeek  
                                key={index} 
                                fecha={element.dt} 
                                iconCode={element.weather[0]?.icon} 
                                temperatureMax={element.temp?.max} 
                                temperatureMin={element.temp?.min} 
                                temperaturaFormato={props.temperaturaFormato} />

                    )
            }
                
        </Fragment>
        
    )
}