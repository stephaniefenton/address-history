import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { getEvents } from '../../api';
import ComparisonSection from './ComparisonSection';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    drawer: {
        width: '400px',
        alignItems: 'center',
        padding: '10px',
        height: '100%',
        overflow: 'auto',
    },
    paper: {
        alignItems: 'center',
        height: '100%',
        overflow: 'auto',
        width: '400px',
    },
    card: {
        margin: '10px',
        cursor: 'pointer',
    },
    wrapper: {
        height: '100%',
        padding: '20px',
        overflow: 'auto',
    },
    selected: {
        backgroundColor: '#efefef',
    },
    disabled: {
        cursor: 'not-allowed'
    }
});

const ComparisonDrawer = (props) => {
    const classes = useStyles();
    const [ eventData, setEventData ] = React.useState([]);
    const [ comparedAddresses, setComparedAddresses ] = React.useState([]);

    React.useEffect(() => {
        if (props.id) {
            // when the address id changes, we clear out the old compared addresses
            setComparedAddresses([]);
            getEvents(props.id)
                .then((res) => setEventData(res.data))
                .catch(() => setEventData([]));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    // if an address that is already selected is clicked, it will be unselected
    const updateComparedAddresses = (event) => {
        if (comparedAddresses.map(ev => ev.url).includes(event.url)) {
            return setComparedAddresses(comparedAddresses.filter(ev => ev.url !== event.url));
        }
        if(comparedAddresses.length < 2) {
            return setComparedAddresses([
                ...comparedAddresses,
                event,
            ]);
        }
    }
    return (
        <Drawer
           className={classes.drawer}
           variant="persistent"
           anchor="left"
           open={!!props.id}
        >
            <Paper className={classes.wrapper}>
                <Typography variant="h4">
                    Compare Versions
                </Typography>
                { eventData.map((event) => {
                    const isChecked = comparedAddresses.map(ev => ev.id).includes(event.id);
                    return (
                        <Card
                            key={event.id}
                            className={`${classes.card} ${isChecked ? classes.selected : comparedAddresses.length === 2 ? classes.disabled: ''}`}
                            onClick={() => updateComparedAddresses(event)}
                        >
                            <CardContent>
                                <Typography variant="h6" component="span">Event Type: {event.type}</Typography>
                                { Object.keys(event.payload).map(eventKey => {
                                    return (
                                        <Typography variant="body2" key={`${event.id}-${event.payload[eventKey]}`}>
                                            {eventKey}: {event.payload[eventKey]}
                                        </Typography>
                                    );
                                })}
                                <Typography variant="body2">
                                    created_at: {event.created_at}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }) }
            </Paper>
            <ComparisonSection addressesToCompare={comparedAddresses}/>
        </Drawer>
    )
}

export default ComparisonDrawer;
