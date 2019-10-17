import React from 'react';

const INITIAL_STATE = {
    userId: '',
}
const AppContext = React.createContext(INITIAL_STATE);

export default AppContext;
