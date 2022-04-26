import { useEffect, useState } from "react"
import ApiKey from "../apiKey";
import * as React from 'react';
import './style.css';
import Divider from '@mui/material/Divider';
import CloudQueueTwoToneIcon from '@mui/icons-material/CloudQueueTwoTone';


const apiKey  = ApiKey;


export default function CardDiaActualInfo(props){
    
    const [ iconCode, upDateIconcode ] = useState('01d');

    const [ temperatura, upDateTemperatura ] = useState(0);

    const [ simboloCelcius, upDateSimboloCelcius ] = useState(false);

    const [ simboloFarenheit, upDateSimboloFarenheit ] = useState(false);

    const [ fechaYhora, upDateFechaYhora ] = useState('');

    const [ cieloDescripcion, upDateCieloDescripcion ] = useState('not defined');

  

    async function dataWeatherByLatLon(lat, lon){
        if ( (lat === '') || (lon === ''))
        {
            console.log('latitud y longitud vacios');

        }else{

            const d = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

            const date = await d.json();

            if ( date.cod === '400' ){
                console.log('ciudad no encontrada')
            }else{

                upDateIconcode(date.current?.weather[0].icon);

                upDateTemperatura(date.current?.temp); 

                upDateFechaYhora(date.current?.dt);
                
                upDateCieloDescripcion(date.current?.weather[0].description);
            }

        }
    } 


  
    function kelvin_To_celcius(temp){
        if ( temp === 0 ) {
            return 0;
        }else{
            const num = parseInt(temp)-273.15;
            return num.toFixed(0);
        }
    }



    function kelvin_To_Fahrenheit(temp){
        if ( temp === 0 ) {
            return 0;
        }else{
        const num = (parseInt(temp)-273.15)*(9/5)+32
        return num.toFixed(0);
        }
    }

  
   
    // Funcion que me ayudara a calcular el dia de la semana actual
    function diaDeLaSemana(dia){
        if ( dia ==='' ){
            return 'not defined';
        }else{
            const date = new Date(dia*1000);
            let numberDay = date.getDay();  
            const arrayDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
            dia = arrayDays[numberDay];
            return dia;
        }
    }



    // Funcion que me ayudara a calcular la hora y minutos actuales
    function horaActual(hora){
            if ( hora === ''){

                return '__ : __ ';

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



    
useEffect( () => {

    dataWeatherByLatLon(props.lat, props.lon);

    if ( props.temperaturaFormato === 'celcius' ){
        upDateSimboloCelcius(true);
        upDateSimboloFarenheit(false);
    }
    
    if ( props.temperaturaFormato === 'farenheit' ){
        upDateSimboloCelcius(false);
        upDateSimboloFarenheit(true);
    }

}, [props.lat, props.lon, props.temperaturaFormato]);




    return(
        <div className='cardDiaActual' >


                {/* ------ ICONO DE LA IMAGEN DEL CLIMA ------ */}
                <img className='icono_tiempo-actual' src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`} />


                {/* -------- VALOR DE LA TEMPERATURA EN CELCIUS O FARENHEIT -------- */}
                <div className="temperatura-number-simbolo-celcius-farenheit-container">


                                {/* -------- Numero en celcius o farentheit -------- */}
                                <div className='temperatura-numero'>

                                    { props.temperaturaFormato === 'celcius' ? kelvin_To_celcius(temperatura) : kelvin_To_Fahrenheit(temperatura) }
                                    
                                </div>


                                {/* -------- Simbolo de la temperatura celcius 'ºc' o farenheit 'ºF' -------- */}
                                <div className={ simboloCelcius ? 'mostrar-simbolo-grados' :'ocultar-celcius_o_farenheit' }>
                                    ºC
                                </div>

                                <div className={ simboloFarenheit ? 'mostrar-simbolo-grados' :'ocultar-celcius_o_farenheit' }>
                                    ºF
                                </div>
                </div>


                {/* -------- DIA ACTUAL Y HORA ACTUAL -------- */}
                <div className='dia_hora_actual-container'>

                                {/* -------- Dia Actual -------- */}
                                <div className='dia_actual' >
                                    {diaDeLaSemana(fechaYhora)},
                                </div>

                                {/* -------- Hora Actual -------- */}
                                <div className='hora_actual'>
                                    {horaActual(fechaYhora)}
                                </div>

                </div>

                            <Divider />

                 {/* -------- ICONO DE LA NUBE Y DESCRIPCION DEL CIELO -------- */}   
                <div className='iconoNube_descripcionCielo-container'>

                                {/* -------- Icono de la nuBe -------- */}
                                <CloudQueueTwoToneIcon sx={{ fontSize:'small' }} />

                                {/* -------- Descripcion del cielo -------- */}
                                <div className='cieloDescripcion'>
                                    {cieloDescripcion}
                                </div>
                </div>  

        </div>
    )
}