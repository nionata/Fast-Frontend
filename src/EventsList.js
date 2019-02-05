import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import moment from 'moment';

const styles = theme => ({
  list: {
    maxHeight: 500,
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  listHeader: {
    backgroundColor: 'lightgray'
  },
})

class EventsList extends Component {
  render() {
    const { classes, data, handleEventClick } = this.props
    return (
      <List className={classes.list} subheader={<li />}>
        {data.map(day => (
          <li key={day.value} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader className={classes.listHeader}>{day.value}</ListSubheader>
              {day.times.map(event => (
                <ListItem button onClick={() => handleEventClick(event.event_id)} key={event.event_id}>
                  <ListItemText primary={moment(event.event_start).format("h mm A")} secondary={moment(event.event_end).format("h mm A")}/>
                  <ListItemText primary={event.event_name} />
                </ListItem>
              ))}
            </ul>
          </li>
      ))}
      </List>
    )
  }

}

export default withStyles(styles)(EventsList);
