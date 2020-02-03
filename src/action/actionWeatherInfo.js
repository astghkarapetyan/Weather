import { WEATHER } from "./actionType";

export const actionWeatherInfo = (data)=>({
    type:WEATHER,
    payload:data
});