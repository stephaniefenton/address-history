import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserSearch from './components/UserSearch';
import AppContext from './context/appContext';
import { reducer, initialState } from './reducer';
import AddressList from './components/AddressList';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    position: 'fixed',
    overflow: 'auto',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(217deg, rgba(255,0,0,.1), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.1), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.1), rgba(0,0,255,0) 70.71%)`
  },
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  }
});

const App = () => {
  const classes = useStyles();
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{dispatch}}>
      <div className={classes.root}>
        <div className={classes.container}>
          {
            (!state.userId || state.addresses.length === 0) && (
              <UserSearch />
            )
          }
          {
            (state.userId) && (
              <AddressList
                userId={state.userId}
                addresses={state.addresses}
              />
            )
          }
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
