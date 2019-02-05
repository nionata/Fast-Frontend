import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Moment from 'react-moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
  root: {
    height: '75.5vh'
  },
  section: {
  },
  events: {
    height: '100%'
  },
  eventsHeader: {
    position: 'relative'
  },
  event: {

  },
  button: {
    marginTop: 10
  },
  list: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class Events extends Component {
  render() {
    const { classes, events, event } = this.props
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
              <List className={classes.list} subheader={<li />}>
                {[0, 1, 2, 3, 4].map(sectionId => (
                  <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                      <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                      {[0, 1, 2].map(item => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                          <ListItemText primary={`Item ${item}`} />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
              ))}
              </List>
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
  /*
  <Grid container spacing={0}>
    <Grid item xs={6} className={classes.vertSection}>
      <div className={classes.memberTable}>
        <MUIDataTable
          title={"Members"}
          data={members.table}
          columns={["First Name", "Last Name", "Points"]}
          options={{reponsive: 'stacked', filterType: 'multiselect', print: false, selectableRows: false}}
          onSearchChange={(text) => console.log(text)}
          />
      </div>
    </Grid>
    <Grid item xs={6} className={classes.vertSection}>
      <Card className={classes.eventsHeadingContainer}>
        <CardContent>
          <div className={classes.eventsHeading}>
            <h3>Events</h3>
            <Button className={classes.eventsButton} onClick={this.handleEventButton}>New Event</Button>
          </div>
          <Tabs value={events.value} centered indicatorColor="primary" onChange={this.handleTabs}>
            <Tab label="Upcoming"/>
            <Tab label="Past"/>
          </Tabs>
        </CardContent>
      </Card>
      {events.list.map(event => this.renderEvent(event))}
    </Grid>
  </Grid>
  <NewEvent open={events.open} onNewEvent={this.onNewEvent} handleEventButton={this.handleEventButton}/>
  */
}

export default withStyles(styles)(Events);
