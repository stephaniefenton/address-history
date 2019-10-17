import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import AddressText from '../AddressCard/AddressText';
import intersection from 'lodash.intersection';
import { makeStyles } from '@material-ui/styles';
import { getAddressVersion } from '../../api';

const useStyles = makeStyles({
    card: {
        margin: '10px',
    },
    root: {
        position: 'relative',
        bottom: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'row',
    }
});

/*
 * returns an array of strings shared between two addresses
 */
function getNonUniqueWords(addressesToCompare) {
    if (addressesToCompare.length !== 2) return []; // need both to compare
    const [ addressA, addressB ] = addressesToCompare;
    return intersection(Object.values(addressA), Object.values(addressB));
}

const ComparisonSection = (props) => {
    const classes = useStyles();
    const [ currentAddresses, setCurrentAddresses ] = React.useState([]);

    React.useEffect(() => {
        const urls = props.addressesToCompare.map(event => event.url);
        if (urls.length === 0) {
            return setCurrentAddresses([]);
        }
        // for every event compared, need to fetch the address data from url in the event payload
        Promise.all(urls.map(url => getAddressVersion(url)))
            .then(responses => {
                setCurrentAddresses(responses.map(res => res.data));
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.addressesToCompare]);
    return (
        <div className={classes.root}>
            {
                currentAddresses.map((address, index) => {
                    return (
                        <Card className={classes.card} key={`${address.id}-${index}`}>
                            <CardContent>
                                <AddressText
                                    address={address}
                                    nonUniqueWords={getNonUniqueWords(currentAddresses)}
                                />
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}

export default ComparisonSection;
