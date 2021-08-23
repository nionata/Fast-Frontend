import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import Snackbar from '@material-ui/core/Snackbar';
import { getMembers, getEvents, getMember, getEvent, addEvent } from './calls';

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
        member: '',
        attendance: [],
      },
      events: {
        data: [],
        list: [],
        event: [],
        attendance: [],
        code: '',
        open: false,
        name: '',
        ends: ''
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
        var table = response.data.map(member => [member.member_first_name, member.member_last_name])
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

  handleGetMember = (row, indexes) => {
    const member = this.state.members.data[indexes.dataIndex]
    getMember(member.member_id)
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

        var attendance = []

        for(var day in days) {
          attendance.push({
            value: day,
            times: days[day]
          })
        }

        this.setState(prevState => ({
          members: {
            ...prevState.members,
            attendance,
            member
          }
        }))
      })
  }

  handleNewEvent = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { name, end } = this.state.events
        const start = Date.now()/1000
        const data = {
          "name": name,
          "start": start,
          "end": start+(end*60),
          "lat": position.coords.latitude,
          "long": position.coords.longitude
        }
        console.log(data)
      
        addEvent(data)
          .then(response => {
            this.setState(prevState => ({
              events: {
                ...prevState.events,
                open: !prevState.events.open,
                code: response.data.code,
                name: '',
                ends: ''
              }
            }))
          })
          .then(() => {
            this.handleGetEvents()
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    } else {
      this.setState({'message': 'Location services are not enabled'})
    }
  }

  updateEvents = change => {
    const { name, data } = change
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [name]: data
      }
    }))
  }

  updateMembers = change => {
    const { name, data } = change
    this.setState(prevState => ({
      members: {
        ...prevState.members,
        [name]: data
      }
    }))
  }

  render() {
    const { classes } = this.props
    const { members, events } = this.state
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
          {this.state.view === 0 ? <Members members={members} handleGetMember={this.handleGetMember} updateMembers={this.updateMembers}/> : <Events events={events} handleGetEvent={this.handleGetEvent} updateEvents={this.updateEvents} handleNewEvent={this.handleNewEvent}/>}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={events.code !== ''}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Event Code: {events.code}</span>}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Exec);
