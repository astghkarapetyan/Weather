import React,{ useContext,useReducer} from 'react';
import ReactDOM  from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route } from 'react-router';
import GlobalContext from './context/context'
import App from './App'
import { reducerData } from "./reducer/reducerData";
const  Root = ()=> {
    let initialState = useContext(GlobalContext);
    const [state,dispatch] = useReducer(reducerData,initialState);
    return (
        <BrowserRouter>
            <GlobalContext.Provider value={{state,dispatch}}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/:date" component={App} />
                </Switch>
            </GlobalContext.Provider>
        </BrowserRouter>

    );
};

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

