import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class TableData extends Component {
   render() {
      return (
         <ReactTable
            data={this.props.dataSet}
            columns={this.props.headers}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={this.props.pageSize}
            className="-striped -highlight"
            noDataText="Empty dataSet!"
         />
      )
   }
}

TableData.defaultProps = {
  pageSize: 50,
  dataSet: [],
  headers: [],
};

TableData.propTypes = {
  pageSize: PropTypes.number,
  dataSet: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
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
