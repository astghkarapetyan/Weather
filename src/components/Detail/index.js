import React, {useEffect, useContext, useReducer} from 'react';
import {withRouter} from 'react-router-dom';
import GlobalContext from "../../context/context";
import {celsiusNumber} from "../../helpers/helpers";
import humidity from '../../img/humidity.png';
import '../Main/index.css'
const Detail = ({match}) => {
    const {state} = useContext(GlobalContext);
    const {forecast} = state;
    const date = match.params.date;
    const detailData = forecast[date];
    return (
        <div className='detail-weather'>
            <div className='detail-weather-container'>
                <div className='detail-day'>{date}</div>
                <div className='detail-forecast-list'>
                    {
                        Object.keys(detailData).map(key => (
                            <div key={key} className='detail-container'>
                                <div className='detail-date'>
                                        { key}
                                 </div>
                                <div className='forecast-content'>
                                <div className='forecast-icon'>
                                    <img src={`http://openweathermap.org/img/wn/${detailData[key].weather[0]['icon']}@2x.png`}/>
                                </div>

                                <div className='forecast-degree'>
                                    <span className='temp_min'>
                                         {Math.floor(detailData[key]['main']['temp_min'] - celsiusNumber)}
                                    </span>
                                    <span className='temp_max'>
                                        {Math.floor(detailData[key]['main']['temp_max'] - celsiusNumber)}
                                     </span>
                                </div>

                                <div className='forecast-humidity'>
                                    <span>
                                            <img className='humidity-img' src={humidity}/>
                                    </span>
                                    <span>{detailData[key]['main']['humidity']}</span>
                                </div>

                                <div className='forecast-description'>
                                    <span>
                                        {detailData[key]['weather'][0]['description']}
                                    </span>
                                </div>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default withRouter(Detail);
