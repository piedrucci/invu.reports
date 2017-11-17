import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux'
import {columns} from '../../utils/tableColumns'
import { utils } from '../../utils/utils'
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
              // pageSize={100}
            />

            <br />
            <div className="col-sm-12 text-center">
              <button
                className="btn btn-success"
                onClick={()=>utils.exportData(salesSummaryData)}>
                <i className="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>
              </button>
              {/* <PDF /> */}
            </div>
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
