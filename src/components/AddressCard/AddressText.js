import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    bolded: {
        fontWeight: 'bold',
        color: 'red',
    }
});
const AddressText = (props) => {
    const classes = useStyles();
    const nonUniqueWords = props.nonUniqueWords || [];
    const words = Object.keys(props.address).reduce((accum, addressItemKey) => {
        const isBold = nonUniqueWords.length > 0 && !nonUniqueWords.includes(props.address[addressItemKey]);
        return {
            ...accum,
            [addressItemKey]: <span className={isBold ? classes.bolded : ''}>{ props.address[addressItemKey] }</span>,
        };
    }, {});
    return (
        <>
            <Typography variant="body1">
                {words.street_one}
            </Typography>
            <Typography variant="body2">
                {words.street_two}
            </Typography>
            <Typography variant="body2">
                {words.city}, {words.state_id} {words.zip_code}
            </Typography>
            <Typography variant="body2">
                {words.country_id}
            </Typography>
        </>
    )
}

export default AddressText;
