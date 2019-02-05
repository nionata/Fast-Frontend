import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import EventsList from './EventsList';

const styles = theme => ({
  root: {
    height: '75vh'
  },
  section: {
  },
  events: {
    height: '75vh'
  },
  eventsHeader: {
  },
  event: {
  },
  button: {
    marginTop: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class Events extends Component {
  render() {
    const { classes, events, event, handleEventClick } = this.props
    return (
      <Grid container className={classes.root} spacing={40}>
        <Grid item xs={6} className={classes.section}>
          <Card className={classes.events}>
            <CardHeader
              action={
                <Button className={classes.button} onClick={null}>New Event</Button>
              }
              title="Events"
              className={classes.eventsHeader}
            />
            <CardContent>
              <EventsList data={events} className={classes.list} handleEventClick={handleEventClick} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} className={classes.section}>
          <div className={classes.event}>
            <MUIDataTable
              title={"Chapter - 1/22"}
              data={event}
              columns={["First Name", "Last Name", "When"]} //attendance_id, attendance_time_in, member_first_name, member_last_name
              options={{reponsive: 'stacked', print: false, viewColumns: false, filter: false, selectableRows: false}}
              />
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Events);
