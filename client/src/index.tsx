import React from 'react';
import ReactDOM from 'react-dom/client';
import {Store} from './store/store';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

interface StateProps {
    store: Store;
}

const store = new Store();
export const StoreContext = React.createContext<StateProps>({
    store,
});

root.render(
    <StoreContext.Provider value={{store}}>
        <App/>
    </StoreContext.Provider>,
);
