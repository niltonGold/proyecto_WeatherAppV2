import { useState, useEffect } from 'react';
import './style.css';
import ApiKey from "../apiKey";


const apiKey  = ApiKey;


export default function TodaysHighlihts(props){

    const [ uvIndex, setUviIndex ] = useState(0);

    const [ windStatus, setWindStatus ] = useState(0);

    const [ sunrise, setSunrise ] = useState(0);
    
    const [ sunset, setSunset ] = useState(0);

    const [ humidity, setHumidity ] = useState(0);

    const [ visibility, setVisibility ] = useState(0);

    const [ pressure, setPressure ] = useState(0);




    async function dataWeatherByLatLon(lat, lon){
        if ( (lat === '') || (lon === ''))
        {
            console.log('latitud y longitud vacios');

        }else{

            const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

            const date = await d.json();

           
            setUviIndex(date?.current.uvi);
        
            setWindStatus(date?.current.wind_speed);
    
            setSunrise(date?.current.sunrise);
    
            setSunset(date?.current.sunset);
    
            setHumidity(date?.current.humidity);
    
            setVisibility(date?.current.visibility);

            setPressure(date?.current.pressure);
            
        }
    } 




    function ms_To_Kmh(num){
        return num * 3.6;
    }




    function hora(hora){
        if ( hora === ''){
            return '__:__ ';
        }else{
                const date = new Date(hora*1000);
                let numberHora = date.getHours();
                let numberMinutos = date.getMinutes();  
                let formatoHora = '00';
                let formatoMinutos = '00';

                if ( numberHora<9 ){
                    formatoHora = `${0}${numberHora}`;
                }else{
                    formatoHora = `${numberHora}`
                }


                if(numberHora===24){
                    formatoHora = `${0}${0}`;
                }
                

                if ( (numberMinutos<9) ){
                    formatoMinutos = `${0}${numberMinutos}`;
                }else{
                    formatoMinutos = `${numberMinutos}`
                }


                if(numberMinutos===24){
                    formatoMinutos = `${0}${0}`;
                }

                hora = formatoHora+':'+formatoMinutos;

                return hora;

        }
    }



    function m_to_km(num){
        return num/1000;
    }



useEffect( () => {

    dataWeatherByLatLon(props.lat, props.lon);

}, [props.lat, props.lon, props.temperaturaFormato]);    




    return(
        <div className='todaysHighlights-cards-container'>

                <div className='todaysHighlights-cards-title'>
                    Today's Highlights
                </div>

                <div className='todaysHighlights-cards-fila'>
                
                        <div className='todaysHighlights-card'>
                                <div className='todaysHighlights-card-title title_text'>
                                        UV Index
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body number'>
                                    {uvIndex}
                                </div>

                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className='todaysHighlights-card'>
                                <div className='todaysHighlights-card-title title_text'>
                                        Wind Status
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body'>
                                    <div className='number'>
                                        {ms_To_Kmh(windStatus).toFixed(2)}
                                    </div>
                                    <div className='simbolo-metricoKmH_Km'>
                                        km/h
                                    </div>
                                </div>

                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className='todaysHighlights-card'>

                                <div className='todaysHighlights-card-title title_text'>
                                        Sunrise & Sunset
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body sunriseSunsetHour'>
                                    <div>
                                        <div>{hora(sunrise)} AM</div>
                                    </div>

                                    <div>
                                        <div>{hora(sunset)} PM</div>
                                    </div>
                                </div>

                        </div>

                </div>    

    {/* --------------------------------------------------------------------------------- */}

                <div className='todaysHighlights-cards-fila'>

                        <div className='todaysHighlights-card'>

                                <div className='todaysHighlights-card-title title_text'>
                                        Humidity
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body'>    
                                    <div className='number'>
                                        {humidity}
                                    </div>

                                    <div className='simbolo-metrico_porcentaje'>
                                        %
                                    </div>
                                </div>
                               
                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className='todaysHighlights-card'>
                                <div className='todaysHighlights-card-title title_text'>
                                        Visibility
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body'>
                                    <div className='number'>
                                        {m_to_km(visibility)}
                                    </div>
                                    <div className='simbolo-metricoKmH_Km'>
                                        km
                                    </div>
                                </div>
                        </div>
                        {/* ----------------------------------------------------- */}
                        <div className='todaysHighlights-card'>
                                <div className='todaysHighlights-card-title title_text'>
                                        Pressure
                                </div>
                                {/* ----------------------------- */}
                                <div className='todaysHighlights-card-body'>    
                                    <div className='number'>
                                        {pressure}
                                    </div>

                                    <div className='simbolo-metricoKmH_Km'>
                                        hPa
                                    </div>
                                </div>
                        </div>

                </div>
            
        </div>
    )
}