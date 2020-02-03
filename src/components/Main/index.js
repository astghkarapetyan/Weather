import React from 'react';
import Forecast from './forecast';
import CurrentWeather from './current';
import './index.css'

const Main = () => {
    return (
        <div className='main-container'>
            <CurrentWeather/>
            <Forecast/>
        </div>

    );
};

export default Main;



