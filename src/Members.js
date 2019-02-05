import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

const styles = theme => ({
  memberTable: {

  }
})

class Members extends Component {
  render() {
    const { classes, data } = this.props
    return (
      <div className={classes.memberTable}>
        <MUIDataTable
          title={"Members"}
          data={data}
          columns={["First Name", "Last Name", "Points"]}
          options={{reponsive: 'stacked', filterType: 'multiselect', print: false, viewColumns: false, download: false, selectableRows: false}}
          />
      </div>
    )
  }
}

export default withStyles(styles)(Members);
