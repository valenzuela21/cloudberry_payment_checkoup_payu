import React, {useState} from "react";
import Formpart1 from "./components/Formpart1";
import Formpart2 from "./components/Formpart2";
import Grid from '@material-ui/core/Grid';
import './App.css';

// Redux
import {Provider} from 'react-redux';
import store from './store';


const queryString = window.location.search;

//http://localhost:3000/?product=servicio%20Extra&price=2000
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('product');
const price = urlParams.get('price');


function App() {

    const [option, saveOption] = useState(true);

    const sendDataOption = () => {
        const _getstore = store.getState();
        saveOption(_getstore.formdata.forms.option);
    };

    return (
        <>
       <Grid container spacing={3}>
        <Grid item xs>
        <div class="img-logo"></div>
        </Grid>
        <Grid item xs>
       
        </Grid>
        <Grid item xs>
         
        </Grid>
       </Grid>
        <Grid item xs={12}>
        <div class="banner-paymen"></div>
        </Grid>
           
        <div className="App container-payment">
            {(() => {
                if (product != undefined && price != undefined) {
                    return (<Provider store={store}>
                        {(() => {
                            if (option !== false) {
                                return (<Formpart1 sendDataOption={sendDataOption}/>);
                            } else {
                                return (<Formpart2 product={product} price={price} />);
                            }
                        })()}
                    </Provider>)
                }else{
                    return (<div className="container-error">
                        Error! No hay producto o servicio seleccionado.
                    </div>)
                }
            })()}

        </div>
        </>
    );
}

export default App;
