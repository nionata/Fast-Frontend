import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MUIDataTable from "mui-datatables";
import NewEvent from './NewEvent';

const API_URL = 'http://localhost:5000'

const styles = theme => ({
  root: {
    position: 'relative',
  },
  appbar: {
    flexGrow: 1,
    backgroundColor: "#ffc107"
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#4a148c'
  },
  appBarSpacer: theme.mixins.toolbar,
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  box: {
    width: '75vw',
    margin: 'auto',
    marginTop: '25vh',
    height: '50vh',
    position: 'relative'
  },
  container: {
    width: "100%"
  },
  searchBox: {
    width: '100%',
    margin: 5,
    marginTop: 20
  },
  button: {
    margin: 20,
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  logo: {
    height: 50,
    marginRight: 10
  },
  vertSection: {
    padding: '5vw',
    margin: 'auto',
    marginTop: '10vh',
    marginBottom: '10vh',
    width: '100%'
  },
  eventsHeadingContainer: {
    marginBottom: '5vh'
  },
  eventsButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  eventsHeading: {
    position: 'relative'
  }
})

class Exec extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      members: {
        data: [],
        table: [],
      },
      events: {
        data: [],
        list: [{
          event_id: 0,
          event_name: "Test",
          event_start: 2,
          event_end: 1,
          event_lat: 29.65308,
          event_long: -82.33996
        }],
        value: 0,
        open: false
      }
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + '/api/members')
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

    axios
      .get(API_URL + '/api/events')
      .then(response => {
        var list = response.data
        this.setState(prevState => ({
          events: {
            ...prevState.events,
            data: response.data,
            list
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
        <p>{event.event_name}</p>
      </Paper>
    )
  }

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
        <div className={classes.content}>
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
        </div>
        <NewEvent open={events.open} onNewEvent={this.onNewEvent} handleEventButton={this.handleEventButton}/>
      </div>
    )
  }
}

export default withStyles(styles)(Exec);
