import './App.css';
import Routing from './Routes/routing';
import { Provider } from 'react-redux';
import store from './store/index';
import NotFound from './Error_Pages';
import { BrowserRouter as Redirect,Route } from 'react-router-dom';
import { Login } from './LoginScreens/Login';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';



function App() {
  return (
    <>
      <Provider store={store}>
        <PrimeReactProvider>
            <Routing />
        </PrimeReactProvider>
      </Provider>
    </>
  );
}

export default App;
