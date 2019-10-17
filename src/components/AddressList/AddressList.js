import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ComparisonDrawer from '../ComparisonDrawer';
import IconButton from '@material-ui/core/IconButton';
import EyeIcon from '@material-ui/icons/RemoveRedEye';

import { getAddresses } from '../../api';
import AddressCard from '../AddressCard';
import AppContext from '../../context/appContext';
import { actionTypes } from '../../reducer';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        maxWidth: '75%',
    },
    selected: {
        color: '#2196f3'
    }
});

const AddressList = (props) => {
    const classes = useStyles();
    const { dispatch } = React.useContext(AppContext);
    const [ selectedId, setSelectedId ] = React.useState('');

    React.useEffect(() => {
        if (props.userId) {
            getAddresses(props.userId)
                .then(res => dispatch({type: actionTypes.SET_ADDRESSES, payload: res.data}))
                .catch(() => dispatch({type: actionTypes.SET_ADDRESSES, payload: []}));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userId]);

    if (!props.addresses) {
        return null;
    }
    if (props.addresses.length === 0) {
        return <span>No addresses found for this user!</span>
    }

    return(
        <>
            <div style={{position: 'fixed', top: '20px', left: '20px',}}>
                <Typography variant="body1">
                    User ID: { props.userId }
                </Typography>
                <Typography variant="body1">
                    Click the eye to see the event history!
                </Typography>
            </div>
            <ComparisonDrawer id={selectedId}/>
            <div className={classes.root}>
                { props.addresses.filter(address => !address.deleted_at).map(address => {
                    return (
                        <AddressCard
                            key={address.id}
                            address={address}
                        >
                            <IconButton
                                className={`${selectedId === address.id ? classes.selected : ''}`}
                                onClick={() => setSelectedId(selectedId === address.id ? '' : address.id)}
                            >
                                <EyeIcon />
                            </IconButton>
                        </AddressCard>
                    );
                })}
            </div>
        </>
    );
};

export default AddressList;
