import './App.css';
import Routing from './Routes/routing';
import { Provider } from 'react-redux';
import store from './store/index';
import NotFound from './Error_Pages';
import { BrowserRouter as Redirect,Route } from 'react-router-dom';
import { Login } from './LoginScreens/Login';



function App() {
  return (
    <>
      <Provider store={store}>
        <Routing />
      </Provider>
    </>
  );
}

export default App;
