import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'

class HoursReport extends Component{

  componentDidUpdate

  render( { AppInfo } = this.props ) {
    const { hoursSummary, hoursVisibleColumns } = AppInfo

    let reportHeaders = columns.hoursSummary(hoursSummary)
    
    for ( var pos1 in reportHeaders ){
      for ( var pos2 in hoursVisibleColumns ){
        reportHeaders[pos1].show = false
        if (reportHeaders[pos1].Header.toLowerCase() === hoursVisibleColumns[pos2].toLowerCase()){
          reportHeaders[pos1].show = true
          break
        }
      }
    }

    return (
      <div>
        {
          hoursSummary.length>0?
          <div>

            <div className="row">
              <div className="col-sm-12">
                <br />
                <TableData dataSet={hoursSummary} headers={reportHeaders} pageSize={10} />
              </div>
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

export default connect(mapStateToProps, null)(HoursReport)
