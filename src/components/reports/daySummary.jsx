import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'

class DaySummaryReport extends Component{
   render( { AppInfo } = this.props ) {
      const { daySummaryData } = AppInfo
      return (
         <div>
         {
            daySummaryData.length>0?
            <TableData dataSet={daySummaryData} headers={columns.daySummary(daySummaryData)} />
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
