import './style.css';

export default function OneDayCardWeek(props){


    function diaDeLaSemana(dia){
        if ( dia === 0 ){
            return 'not defined';
        }else{
            const date = new Date(dia*1000);
            let numberDay = date.getDay();  
            const arrayDays = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat' ];
            dia = arrayDays[numberDay];
            return dia;
        }
    }



    function kelvinAcelcius(temp){
        if ( temp === 0 ) {
            return 0;
        }else{
            const num = parseInt(temp)-273.15;
            return num.toFixed(0);
        }
    }



    function kelvinAFahrenheit(temp){
        if ( temp === 0 ) {
            return 0;
        }else{
        const num = (parseInt(temp)-273.15)*(9/5)+32
        return num.toFixed(0);
        }
    }


    

    return(
        <div className='oneCardWeek-Container'>

            <div className='oneCardWeek-day'>
                {diaDeLaSemana(props.fecha)}
            </div>

            {/* ----------------------------- */}

            <div>
                {<img className='iconWeather' src={`https://openweathermap.org/img/wn/${props.iconCode}@2x.png`} />}
            </div>

            {/* ----------------------------- */}
            
            <div className='temperature-container'>

                <div>{ props.temperaturaFormato ===  'celcius' ? kelvinAcelcius(props.temperatureMax) : kelvinAFahrenheit(props.temperatureMax) }º</div> 

                <div className='temperaturaMin'>{ props.temperaturaFormato ===  'farenheit' ? kelvinAFahrenheit(props.temperatureMin) : kelvinAcelcius(props.temperatureMin)}º</div>
                
            </div>

        </div>
    )
}