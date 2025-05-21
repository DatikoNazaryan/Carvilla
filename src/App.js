import { Provider } from 'react-redux';

import Navigation from "./components/features/Navigation/Navigation";

import store from "./store/configureStore";

function App() {
    return (
        <Provider store={store}>
           <Navigation />
        </Provider>
    );
}

export default App;
