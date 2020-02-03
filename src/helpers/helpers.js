import { useState,useEffect } from 'react';
import { actionWeatherInfo } from "../action/actionWeatherInfo";

export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const KEY = 'ede65ffbd83c6a8ee24a8872899eb3b6';
export const celsiusNumber = 273.15;

const fetchMainStructure = (fetchUrl)=>{
    return (fetch(fetchUrl)
            .then((response) => (
                    response.json()
                        .then(json => (
                            response.ok ? json : Promise.reject(json)
                        ))
                )
            )
    )
};

const changeWeatherDataStructure = (data)=>{
    let forecast = {};
    let lastChildKey = '';
    data.map(item=>{
        let getDateAndTime = item['dt_txt'].split(' ');
        let [ date,time ] = getDateAndTime;
        lastChildKey = date;
        forecast[`${date}`] = {...forecast[`${date}`]};
        forecast[`${date}`][`${time}`] = item
    });

    delete forecast[lastChildKey];
    return forecast
};
export const getCurrentHours = ()=>{
    let d = new Date();
    let hours = d.getHours();
    let currentHours = Math.floor(hours/3)*3;
    currentHours  = currentHours === 0 ? '21' : currentHours;
    currentHours = currentHours < 10 ?  `0${currentHours}` : currentHours;
    return `${currentHours}:00:00` ;
};
const weekDayMonths = ()=>{
    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return {
        weekDays,
        months
    }
};
export const modifiedDate = (date)=>{
    let newDate = new Date(date);
    const {weekDays, months  } = weekDayMonths();
    return  `${weekDays[newDate.getDay()]} - ${months[newDate.getMonth()]} - ${newDate.getDate()}`;
};

export const getCurrentDay = ()=>{
    let d = new Date();
    const {weekDays, months  } = weekDayMonths();
    const monthDay = `${months[d.getMonth()]} ${d.getDate()}`;
    return {
        weekDays:weekDays[d.getDay()],
        monthDay
    }
};

export const fetchQuery = async (cWeatherUrl,fWeatherUrl)=>{
    let data = [];
    let error = '';
   await Promise.all([
        fetchMainStructure(cWeatherUrl),
        fetchMainStructure(fWeatherUrl)
    ]).then( res => {
        let [currentW,forecastW] = res;
        let forecast = changeWeatherDataStructure(forecastW.list);
        forecastW = forecast;
        document.title = `${currentW.name}${currentW.sys.country}`;
        data = [currentW,forecastW]
    }).catch(err => {
       error = err.message
    });

   return {data,error}
};

export  const GetWeatherInfo =  (dispatch)=>{
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( async position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let cWeatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${KEY}`;
            let fWeatherUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${KEY}`;
            const { data } =  await fetchQuery(cWeatherUrl,fWeatherUrl);
            if(data.length){
                dispatch(actionWeatherInfo(data));
                setLoading(false)
            }

        });
    },[]);
    return [loading]
};