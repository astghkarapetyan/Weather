import React,{ useState,useContext} from 'react';

import { withRouter } from 'react-router-dom';
import GlobalContext from "../../context/context";
import { actionWeatherInfo } from "../../action/actionWeatherInfo";
import {BASE_URL, fetchQuery, KEY} from "../../helpers/helpers";
import './index.css'
const Search = ({history,location})=> {
    const { dispatch }  = useContext(GlobalContext);
    const [ searchValue,setSearchValue] = useState('');
    const [ errorMessage,setErrorMessage] = useState('');
    const  handleInputValue = (event)=>{
        const value = event.target.value;
        setSearchValue(value)
    };
    const handleKeyCode = async (event)=>{
        if(event.keyCode === 13 && searchValue){
            let lowerCaseValue = searchValue.toLowerCase();
            let cWeatherUrl = `${BASE_URL}/weather?q=${lowerCaseValue}&appid=${KEY}`;
            let fWeatherUrl = `${BASE_URL}/forecast?q=${lowerCaseValue}&appid=${KEY}`;
            const { data,error } = await fetchQuery(cWeatherUrl,fWeatherUrl);
            if(data.length){
                dispatch(actionWeatherInfo(data));
                setErrorMessage('')
            }else {
                setErrorMessage(error)
            }
            history.push('/')
        }
    };
    return (
        <div className='search-container'>
            <input
                onChange={handleInputValue}
                onKeyDown={handleKeyCode}
            />
            <div className='error-message'>
                {errorMessage}
            </div>
        </div>

    );
};

export default withRouter(Search);
