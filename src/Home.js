import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

const API_URL = 'http://localhost:5000'

const styles = theme => ({
  root: {
    position: 'relative',
  },
  appbar: {
    flexGrow: 1,
    backgroundColor: "#4a148c"
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
  }
})

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'code': '',
      'member': '',
      'members': [],
      'processing': false
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + '/api/members')
      .then(response => {
        var suggestions = response.data.map((member, index) => ({
          value: index,
          label: member.member_first_name + " " + member.member_last_name
        }))
        console.log(response.data);
        this.setState({'members': response.data, suggestions})
      })
    window.map = this;
  }

  handleChange = name => event => {
    event.preventDefault()

    this.setState({
      [name]: event.target.value,
      "message": ""
    });
  };

  handleSignIn = () => event => {
    event.preventDefault()

    if(!this.state.processing) {
      this.setState({'processing': true, 'message': 'Signing in...'})
      
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var data = {
            "event code": parseInt(this.state.code),
      	     "member id": this.state.member.member_id,
      	     "lat": position.coords.latitude,
      	     "long": position.coords.longitude
          }

          axios.post(API_URL + '/api/signin', data)
            .then(response => this.setState({'message': response.data, 'processing': false}))
            .catch(function (error) {
              console.log(error)
            })
        })
      } else {
        this.setState({'message': 'Location services are not enabled'})
      }
    }
  }

  startEvent = name => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var data = {
          "name": name,
    	    "type": 1,
          "end": (Date.now()/1000)+1800,
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
  }

  render() {
    const { classes } = this.props
    console.log(this.state);
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Card className={classes.box}>
            <CardContent>
              <span>{this.state.message}</span>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                id="event-code"
                label="Event Code"
                className={classes.textField}
                value={this.state.code}
                onChange={this.handleChange('code')}
                margin="normal"
                fullWidth={true}
                list=""
                />
              </form>
              <Select
                className={classes.searchBox}
                options={this.state.suggestions}
                isClearable={true}
                placeholder="Your name..."
                onChange={member => this.setState({'member': member ? this.state.members[member.value] : ''})}
                maxMenuHeight="20vh"
              />
              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSignIn()}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
