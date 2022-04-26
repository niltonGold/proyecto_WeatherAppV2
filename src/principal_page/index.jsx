import { useState } from 'react';
import './style.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import ApiKey from "../components/apiKey";
import * as React from 'react';
import CardDiaActualInfo from '../components/cardDiaActualInfo';
import TodaysHighlihts from '../components/todaysHighlights';
import WeekCards from '../components/weekCards';



const apiKey  = ApiKey;



export default function PrincipalPage(){

    const [ latitud, upDateLatitud ] = useState('');

    const [ longitud, upDateLongitud ] = useState('');
 
    const [ toggleState, upDateToggleState ] = useState('celcius');


    // Formulario que me extraerá la ciudad que escriba en el buscador
    const handleForm = (e) => {
        e.preventDefault();
        console.log('principal page: '+e.target.inputText.value);
        dataWeatherByCity(e.target.inputText.value, apiKey);
        e.target.inputText.value = '';
    }



    // Con esta funcion llamo a la api por el nombre de una ciudad
    async function dataWeatherByCity(ciudad, apiKey){
        const d = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&include=main&appid=${apiKey}`);
        const data = await d.json();

        if ( data.cod === '404' || data.cod === '400' ){
            console.log('ciudad no encontrada')
            alert(ciudad+' no es una ciudad');
        }else{
        upDateLongitud(data.coord?.lon);
        upDateLatitud(data.coord?.lat);
        }
    }

    

    function toggleTab(formatoTemperatura){
        upDateToggleState(formatoTemperatura);
        // console.log(toggleState);
    }

  


    return(

        <div className="card_container">

                <div className='serach_and_celciusFarenheit-container'>

                        <div className='serach_and_celciusFarenheit-interior'>

                                {/* Input Search */}
                                <Paper onSubmit={handleForm} component="form"  sx={{ ml: '10px', height:'35px', display: 'flex', alignItems: 'center', width: '200px'  }}    >

                                        <IconButton type="submit" sx={{ pl:'0.1rem' }} aria-label="search">
                                            <SearchIcon sx={{ fontSize: '20px' }}  />
                                        </IconButton>

                                        <InputBase required id='inputText' placeholder="Escribe tu ciudad" sx={{ fontSize:'15px', width:'100%'}}  inputProps={{ 'aria-label': 'search google maps' }}  />

                                        
                                        <button type='reset' className='button_iconCancel'>
                                            <CancelIcon sx={{ fontSize:'20px', mr: '3px' }}/>
                                        </button>
                                    
                                </Paper>

                            
                                {/* Celcius and Farentheit buttons */}
                                <div className='celcius-farenheit-btns'>

                                        <div className={ toggleState === 'celcius' ? 'tab-activate' : 'tab-desactivate' } onClick={ () => toggleTab('celcius') }>
                                            ºC
                                        </div>  

                                        <div className={ toggleState === 'farenheit' ? 'tab-activate' : 'tab-desactivate' } onClick={ () => toggleTab('farenheit') }>
                                            F
                                        </div>

                                </div>
                            
                        </div>

                </div>

                {/* ------------------------------------------------------------------------------ */}

                <div className='cardActualInfo_TodaysHighlights-container'>

                        <div className='cardActualInfo_TodaysHighlights-interior'>
                            
                                {/* Card dia Actual */}
                                <div className='cardDiaActual_principal_page'>
                                    <CardDiaActualInfo lat={latitud} lon={longitud} temperaturaFormato={toggleState} />
                                </div>


                                {/* Todays highlights */}
                                <div className='todaysHighlights_principal_page'>
                                    <TodaysHighlihts lat={latitud} lon={longitud}/>
                                </div>

                        </div>

                </div>

                {/* ------------------------------------------------------------------------------ */}

                <div className='week_container'>

                        <div className='week_container-interior'>

                            {/* Week title */}
                            <div className='week_container-interior-title-container'>
                                week
                            </div>


                            {/* week Cards */}     
                            <div className='week_container-interior-cards-container'>
                                <WeekCards temperaturaFormato={toggleState} lat={latitud} lon={longitud}></WeekCards>
                            </div>
                        </div>
                    
                </div>
            
        </div>

    )
}