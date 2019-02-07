import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import People from '@material-ui/icons/People';
import Event from '@material-ui/icons/Event';
import Members from './Members';
import Events from './Events';
import moment from 'moment';
import { getMembers, getEvents, getEvent } from './calls';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appbar: {
    flexGrow: 1,
    backgroundColor: "#ffc107",
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    marginTop: '20vh',
  },
  content: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#4a148c',
    padding: '15vh',
    margin: 'auto',
  },
  logo: {
    height: 50,
    marginRight: 10
  },
  drawer: {
    width: '15vw'
  },
  drawerPaper: {
    width: '15vw'
  },
})

class Exec extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 1,
      members: {
        data: [],
        table: [],
      },
      events: {
        data: [],
        list: [],
        event: [],
        attendance: []
      }
    }
  }

  componentDidMount() {
    this.handleGetMembers()
    this.handleGetEvents()
  }

  handleGetMembers = () => {
    getMembers()
      .then(response => {
        var table = response.data.map(member => [member.member_first_name, member.member_last_name, member.member_points])
        this.setState(prevState => ({
          members: {
            ...prevState.members,
            data: response.data,
            table
          }
        }))
      })
  }

  handleGetEvents = () => {
    getEvents()
      .then(response => {
        var days = {}

        response.data.forEach(event => {
          var date = moment(event.event_start*1000).format("ddd MMM D")

          if(days[date]) {
            days[date].push(event)
          } else {
            days[date] = [event]
          }
        })

        var list = []

        for(var day in days) {
          list.push({
            value: day,
            times: days[day]
          })
        }

        this.setState(prevState => ({
          events: {
            ...prevState.events,
            data: response.data,
            list
          }
        }))
      })
  }

  handleGetEvent = id => {
    getEvent(id)
      .then(response => {
        var attendance = response.data.map(record => [record.member_first_name, record.member_last_name, moment(record.attendance_time_in * 1000).fromNow()])
        this.setState(prevState => ({
          events: {
            ...prevState.events,
            event: prevState.events.data.find(event => event.event_id === id),
            attendance
          }
        }))
      })
  }

  handleTabs = (events, value) => {
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        value
      }
    }))
  }

  handleEventButton = () => {
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        open: !prevState.events.open
      }
    }))
  }

  onNewEvent = (code) => {
    this.handleEventButton()
    alert(code)
  }

  renderEvent = (event) => {
    return (
      <Paper key={event.event_id}>
        <Moment date={event.event_start}/>
        <p>{event.event_name}</p>
      </Paper>
    )
  }

  /*startEvent = name => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var data = {
          "name": name,
    	    "type": 1,
          "end": (Date.now())+1800,
    	    "lat": position.coords.latitude,
    	    "long": position.coords.longitude
        }

        console.log(data);

        axios.post(API_URL + '/api/event', data)
          .then(response => console.log(response.data))
          .catch(function (error) {
            console.log(error)
          })
      })
    } else {
      this.setState({'message': 'Location services are not enabled'})
    }
  }*/

  render() {
    const { classes } = this.props
    const { members, events } = this.state
    console.log(this.state)
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <img src="https://pngimage.net/wp-content/uploads/2018/05/fast-png-3.png" alt="logo" className={classes.logo} />
            <h1>Fast</h1>
          </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}>
          <div className={classes.toolbar}>
            <List>
              <ListItem button onClick={() => this.setState({view: 0})}>
                <ListItemIcon><People/></ListItemIcon>
                <ListItemText primary="Members" />
              </ListItem>
              <ListItem button onClick={() => this.setState({view: 1})}>
                <ListItemIcon><Event/></ListItemIcon>
                <ListItemText primary="Events" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className={classes.content}>
          {this.state.view === 0 ? <Members data={members.table} /> : <Events events={events} handleGetEvent={this.handleGetEvent}/>}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Exec);
