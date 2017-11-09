import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'

class TableData extends Component {
   render() {
      return (
         <ReactTable
            data={this.props.dataSet}
            columns={this.props.headers}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={20}
            className="-striped -highlight"
         />
      )
   }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
      AppInfo: state.appInfo
    }
  };

  // Maps actions to props
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       setItemsSummary: data => dispatch(appActions.setItemsSummary(data))
//     }
//   };

export default connect(mapStateToProps, null)(TableData)
