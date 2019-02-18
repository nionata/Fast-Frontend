import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EventsList from './EventsList';

const styles = theme => ({
  memberTable: {

  }
})

class Members extends Component {
  render() {
    const { classes, members, handleGetMember, updateMembers } = this.props
    const options = {
      reponsive: 'stacked',
      filterType: 'multiselect',
      print: false,
      viewColumns: false,
      download: false,
      selectableRows: false,
      onRowClick: handleGetMember
    }
    return (
      <div className={classes.memberTable}>
        <MUIDataTable
          title={"Members"}
          data={members.table}
          columns={["First Name", "Last Name", "Points"]}
          options={options}
          />
        <Dialog
          open={members.member !== ''}
          onClose={() => updateMembers({name: 'member', data: ''})}
          aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{members.member.member_first_name} {members.member.member_last_name}</DialogTitle>
        <DialogContent>
          <EventsList data={members.attendance} handleGetEvent={null} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateMembers({name: 'member', data: ''})} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Members);
