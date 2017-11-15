import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'
import { utils } from '../../utils/utils'

class DaySummaryReport extends Component{
  render( { AppInfo } = this.props ) {
    const { daySummaryData } = AppInfo
    return (
      <div>
        {
          daySummaryData.length>0?
          <div>
            <br />
            <TableData dataSet={daySummaryData} headers={columns.daySummary(daySummaryData)} />

            <br />
            <div className="col-sm-12 text-center">
              <button
                className="btn btn-success"
                onClick={()=>utils.exportData(daySummaryData)}>
                <i className="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>
              </button>
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

  export default connect(mapStateToProps, null)(DaySummaryReport)
