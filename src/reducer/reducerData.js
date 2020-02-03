import { initialState } from "../context/initialstate";
import { WEATHER } from "../action/actionType";

export const reducerData = (state=initialState,action)=>{
    switch(action.type) {
        case WEATHER:
        let data = action.payload;
        if(data.length){
            state.currentWeatherData = data[0];
            state.forecast = data[1];
        }else{
            state.currentWeatherData = [];
            state.forecast = [];
        }
        return state;
        default:
            return state;
    }
};