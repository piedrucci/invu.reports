import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'
import { utils } from '../../utils/utils'

class DaySummaryReport extends Component{
  render( { AppInfo } = this.props ) {
    const { daySummaryData, paymentsDaySummary } = AppInfo
    console.log(paymentsDaySummary)
    let payments = null
    if ( paymentsDaySummary.length > 0 ){
      payments = paymentsDaySummary.map( (pay, index) => {
        // return (<tr>
        //   <td>{pay.metodoPago}</td>
        //   <td>{pay.tipoPago}</td>
        //   <td>{pay.total}</td>
        // </tr>)
        console.log(pay)
      } )
    }

    return (
      <div>
        {
          daySummaryData.length>0?
          <div>

            <div className="row">
              <div className="col-sm-12">
                <br />
                <TableData dataSet={daySummaryData} headers={columns.daySummary(daySummaryData)} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Payment</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 text-center">
                <br />
                <button
                  className="btn btn-success"
                  onClick={()=>utils.exportData(daySummaryData)}>
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

  export default connect(mapStateToProps, null)(DaySummaryReport)
