import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import {columns} from './tableColumns'

class TableData extends Component {
   render( { AppInfo } = this.props ) {
      const { activeModule, itemsSummaryData } = AppInfo

      // let columnHeaders, dataSet = []
      //
      // // setear las variables (datos y cabeceras) segun el tipo de reporte ....
      // if ( activeModule === 1 ) {
      //    columnHeaders = columns.sales(itemsSummaryData)
      //    dataSet = itemsSummaryData
      // }else if ( activeModule === 2 ) {
      //    columnHeaders = columns.sales(itemsSummaryData)
      //    dataSet = itemsSummaryData
      // }

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
