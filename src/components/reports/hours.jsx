import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'
import { utils } from '../../utils/utils'

class HoursReport extends Component{

  render( { AppInfo } = this.props ) {
    const { HoursSummary } = AppInfo

    return (
      <div>
        {
          HoursSummary.length>0?
          <div>

            <div className="row">
              <div className="col-sm-12">
                <br />
                <TableData dataSet={HoursSummary} headers={columns.hoursSummary(HoursSummary)} />
              </div>
            </div>


            <br /><br />


            <div className="row">
              <div className="col-sm-12 text-center">
                <br />
                <button
                  className="btn btn-success"
                  onClick={()=>utils.exportData(HoursSummary)}>
                  <i className="fa fa-file-excel-o fa-2x" aria-hidden="true"></i>
                </button>
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
