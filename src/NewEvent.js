import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const API_URL = 'http://localhost:5000'

class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      processing: false,
      message: '',
      name: '',
      end: ''
    }
  }

  handleCreate = () => {
    const { name, end, processing } = this.state
    const { onNewEvent } = this.props

    if(!processing) {
      if(name && end) {
        this.setState({'processing': true, 'message': 'Creating...'})

        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            var data = {
              "name": name,
              "type": 1,
              "end": (Date.now()/1000)+(end*60),
              "lat": position.coords.latitude,
              "long": position.coords.longitude
            }

            console.log(data);

            axios.post(API_URL + '/api/event', data)
              .then(response => onNewEvent(response.data.code))
              .catch(function (error) {
                console.log(error)
              })
          })
        } else {
          this.setState({'processing': false, 'message': 'Location services are not enabled'})
        }
      } else {
        this.setState({'message': 'Fill out all the fields'})
      }
    }
  }

  onChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { open, handleEventButton } = this.props
    console.log(this.state)
    return (
      <Dialog
          open={open}
          onClose={handleEventButton}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a New Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Event Name"
              type="text"
              fullWidth
              onChange={this.onChange('name')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="end"
              label="Sign In Time"
              type="number"
              fullWidth
              onChange={this.onChange('end')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEventButton} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default NewEvent;
