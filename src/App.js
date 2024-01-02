import './App.css';
import React, { useEffect } from "react";
import Routing from './Routes/routing';
import { Provider } from 'react-redux';
import store from './store/index';
import NotFound from './Error_Pages';
import { BrowserRouter as Redirect,Route } from 'react-router-dom';
import { Login } from './LoginScreens/Login';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import {getToken} from "../src/Token/index";



function App() {
  const checkTokenValidity = async () => {
    try {
      const tokenValidationResult = await getToken();
      console.log("token here....", tokenValidationResult)
    } catch (error) {
      console.error("Error checking token validity:", error);
    }
  };
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <>
      <Provider store={store}>
        {/* <PrimeReactProvider> */}
            <Routing />
        {/* </PrimeReactProvider> */}
      </Provider>
    </>
  );
}

export default App;
