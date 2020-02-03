import React,{ useEffect,useContext,useReducer} from 'react';
import { withRouter } from 'react-router-dom';
import GlobalContext from "../../context/context";
import humidity from '../../img/humidity.png';
import {celsiusNumber, getCurrentDay} from "../../helpers/helpers";
import './index.css'

const CurrentWeather = ({history,location})=> {
    const {state} = useContext(GlobalContext);
    const {currentWeatherData, forecast} = state;

    const currentDay = getCurrentDay();
    return (
        <div
            onClick={() => history.push('/')}
            className='current-weather-container'
        >
            <div className='current-date'>
                <div>{currentDay.weekDays} </div>
                <div> {currentDay.monthDay} </div>
            </div>
            <div className='current-weather-content'>
                <div className='city-name'>
                    <span>{currentWeatherData.name}</span>
                    <span>{currentWeatherData.sys.country}</span>
                </div>
                <div className='current-degree'>
                    {Math.floor(currentWeatherData.main.temp - celsiusNumber)}C
                </div>
                <div className='humidity-description'>
                    <div className='current-humidity'>
                        <span>
                            <span><img className='humidity-img' src={humidity}/></span>
                            {
                                currentWeatherData.main.humidity
                            }
                        </span>
                    </div>
                    <div className='current-description'>
                        <span>
                            {
                                currentWeatherData.weather[0].description
                            }
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default withRouter(CurrentWeather);
