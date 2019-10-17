import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';

import AddressText from './AddressText';

const useStyles = makeStyles({
    root: {
        flexBasis: 0,
        flexGrow: 1,
        minWidth: '250px',
        alignContent: 'space-between',
        flexDirection: 'column',
        margin: '10px'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    content: {
        minHeight: '200px',
    }
});

const AddressCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <AddressText address={props.address} />
            </CardContent>
            <CardActions>
                { props.children }
            </CardActions>
        </Card>
    );
};

export default AddressCard;
