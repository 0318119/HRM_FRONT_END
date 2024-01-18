import './App.css';
import React, { useEffect } from "react";
import Routing from './Routes/routing';
import { Provider } from 'react-redux';
import store from './store/index';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import {getToken} from "../src/Token/index";



function App() {
  
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Your code to run every one minute
      const checkTokenValidity = async () => {
        try {
          const tokenValidationResult = await getToken();
          // console.log("token here....", tokenValidationResult)
        } catch (error) {
          console.error("Error checking token validity:", error);
        }
      };
      checkTokenValidity();
    }, 2000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <Provider store={store}>
            <Routing />
      </Provider>
    </>
  );
}

export default App;
