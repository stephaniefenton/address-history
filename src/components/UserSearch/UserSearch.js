import React from 'react';
import TextField from '@material-ui/core/TextField';
import AppContext from '../../context/appContext';
import { actionTypes } from '../../reducer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        margin: '10px',
        justifyContent: 'center',
        minWidth: '200px'
    }
});
const UserSearch = () => {
    const classes = useStyles();
    const { dispatch } = React.useContext(AppContext);
    const [ userId, setUserId ] = React.useState('');
    const updateUserId = (event) => {
        setUserId(event.target.value);
    };
    const onSubmitUserId = (event) => {
        if (event.charCode === 13) {
            dispatch({type: actionTypes.SET_USER_ID, payload: userId});
        }
    }
    return (
        <div className={classes.root}>
            <TextField
                id="user-search"
                placeholder="Enter an ID"
                value={userId}
                onChange={updateUserId}
                onKeyPress={onSubmitUserId}
            />
        </div>
    );
};

export default UserSearch;
