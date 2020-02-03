import React,{ useContext,Suspense, lazy} from 'react';
import { withRouter } from 'react-router-dom';
import Search from './components/Search';
import Main from './components/Main';
// import Detail from './components/Detail';
import Loading from './components/Loading'
import GlobalContext from "./context/context";
import { GetWeatherInfo } from './helpers/helpers';
import './app.css';
const Detail = React.lazy(() => import('./components/Detail'));


const App = ({location})=> {
    const { dispatch }  = useContext(GlobalContext);
    const [loading] = GetWeatherInfo(dispatch);
    if(loading) return <Loading/>;
    return (
        <div className='weather-container'>
            <div className='inner-container'>
                <Search/>
                <Main/>
                {
                    location.pathname === '/' ? '' :(
                        <Suspense fallback={<div>Loading...</div>}>
                            <Detail/>
                        </Suspense>
                    )
                }
            </div>

        </div>

  );
};

export default withRouter(App);
