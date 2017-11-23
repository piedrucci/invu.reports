import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux'
import {columns} from '../../utils/tableColumns'
// import PDF from '../../utils/pdf'
// import Modal from '../../utils/modal'

class SalesReport extends Component{
  render( { AppInfo } = this.props ) {
    const { salesSummaryData } = AppInfo
    return (
      <div>
        {
          salesSummaryData.length>0?
          <div>
            <br />
            <TableData
              dataSet={salesSummaryData}
              headers={columns.sales(salesSummaryData)}
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
