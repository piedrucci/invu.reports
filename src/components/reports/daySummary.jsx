import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'
import { utils } from '../../utils/utils'

class DaySummaryReport extends Component{

  render( { AppInfo } = this.props ) {
    const { daySummaryData, paymentsDaySummary, discountsDaySummary } = AppInfo

    let payments = null
    let totalPayments = 0
    if ( paymentsDaySummary.length > 0 ){

      payments = paymentsDaySummary.map( (pay, index) => {
        totalPayments = (pay.tipoPago.toLowerCase() !== 'efectivo') ? (totalPayments+pay.total) : (totalPayments+0)
        return (<tr key={index}>
          <td>{pay.metodoPago}</td>
          <td>{pay.tipoPago}</td>
          <td className="text-right">{pay.total}</td>
          </tr>)
         //   console.log(pay)
      } )

    }

    const discounts = discountsDaySummary || {idcat:'', ordenes:0, items:0}

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


            <br /><br /><br />
            <div className="row">
              {/* tabla de pagos */}
              <div className="col-sm-4">
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <th colSpan="3">Payments</th>
                    <tr>
                      <th scope="col">Payment</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td>&nbsp;</td>
                      <td>Total</td>
                      <td>{totalPayments}</td>
                    </tr>
                  </tfoot>
                  <tbody>
                    {payments}
                  </tbody>
                </table>
              </div>


              {/* tabla de descuentos */}
              <div className="col-sm-4">
                <table className="table table-striped">
                  <thead className="thead-light">
                    <th colSpan="2">Discounts</th>
                    <tr>
                      <th scope="col">Orders</th>
                      <th scope="col">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td className="text-right">{discounts.ordenes}</td>
                      <td className="text-right">{discounts.items}</td>
                    </tr>
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
