import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux'
import {columns} from '../../utils/tableColumns'

class SalesReport extends Component{
  render( { AppInfo } = this.props ) {
    const { salesSummaryData, salesVisibleColumns } = AppInfo

    let reportHeaders = columns.sales(salesSummaryData)
    
    for ( var pos1 in reportHeaders ){
      for ( var pos2 in salesVisibleColumns ){
        reportHeaders[pos1].show = false
        if (reportHeaders[pos1].Header.toLowerCase() === salesVisibleColumns[pos2].toLowerCase()){
          reportHeaders[pos1].show = true
          break
        }
      }
    }

    return (
      <div>
        {
          salesSummaryData.length>0?
          <div>
            <br />
            <TableData
              dataSet={salesSummaryData}
              headers={reportHeaders}
              pageSize={10}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    AppInfo: state.appInfo
  }
}

  // Maps actions to props
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       changeOptionMenu: opt => dispatch(appActions.changeMenuOption(opt))
//     }
//   };

export default connect(mapStateToProps, null)(SalesReport)
