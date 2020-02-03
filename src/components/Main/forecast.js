import React,{ useEffect,useContext,useReducer} from 'react';
import { withRouter } from 'react-router-dom';
import GlobalContext from "../../context/context";
import humidity from '../../img/humidity.png';
import {celsiusNumber, getCurrentHours, modifiedDate} from "../../helpers/helpers";
import './index.css'

const Forecast = ({history,location})=> {
    const {state} = useContext(GlobalContext);
    const { forecast} = state;
    console.log(forecast,'forecast')
    const currentDate = getCurrentHours();
    const getCurrentRoute = (key)=>{
        let route = location.pathname;
        return `/${key}` === route
    };
    return (

        <div className='forecast-weather-container'>
            {
                Object.keys(forecast).map((key, index) => (
                    <div
                        onClick={() => history.push(key)}
                        key={index}
                        className = {`bg-color forecast-item ${getCurrentRoute(key) ? 'active' : null}`}

                    >
                        <div className='forecast-date'>
                            {modifiedDate(key)}
                        </div>
                        <div className='forecast-content'>
                            <div className='forecast-icon'>
                                <img src={`http://openweathermap.org/img/wn/${forecast[key][currentDate].weather[0]['icon']}@2x.png`}/>
                            </div>
                            <div className='forecast-degree'>
                                    <span className='temp_min'>
                                        {Math.floor(forecast[key][currentDate]['main']['temp_min'] - celsiusNumber)}
                                    </span>
                                <span className='temp_max'>
                                        {Math.floor(forecast[key][currentDate]['main']['temp_max'] - celsiusNumber)}
                                    </span>
                            </div>
                            <div className='forecast-humidity'>
                                    <span>
                                        <img className='humidity-img' src={humidity}/>
                                    </span>
                                <span>{forecast[key][currentDate]['main']['humidity']}</span>
                            </div>
                            <div className='forecast-description'>
                                    <span>
                                        {forecast[key][currentDate]['weather'][0]['description']}
                                    </span>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>


    );
};

export default withRouter(Forecast);
