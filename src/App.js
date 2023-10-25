import './App.css';
import Routing from './Routes/routing';
import { Provider } from 'react-redux';
import store from './store/index';


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
