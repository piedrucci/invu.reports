import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
import {columns} from '../../utils/tableColumns'

class DaySummaryReport extends Component{

  render( { AppInfo } = this.props ) {
    const { daySummaryData, paymentsDaySummary, discountsDaySummary } = AppInfo

    let payments = null
    let grandNet = 0
    let totalOtherPays = 0

    if (daySummaryData.length>0){
      grandNet = daySummaryData.reduce( (total, row) => {
          return row.net + total
        },0.0 )
    }

    if ( paymentsDaySummary.length > 0 ){
      // let totalCash = 0
      payments = paymentsDaySummary.map( (pay, index) => {

        let _pay = null
        if ( pay.metodoPago.toLowerCase() !== 'efectivo' ){
          totalOtherPays += pay.total
          // totalCash -= pay.total
          _pay = (
          <tr key={index}>
          <td>{pay.metodoPago}</td>
          <td>{pay.tipoPago}</td>
          <td className="text-right">{pay.total}</td>
          </tr>
          )
        }
        return _pay
      } )


    }

    const discounts = discountsDaySummary || null

    let orderDiscounts = null
    if ( typeof discounts.ordenes !== 'undefined' ) {

      orderDiscounts = discounts.ordenes.map( (disc, index) => {
        return (<tr key={index}>
          <td>{disc.descuento} (Order)</td>
          <td>{disc.cantidad}</td>
          <td className="text-right">{disc.total}</td>
        </tr>)
      } )

      orderDiscounts.push(<tr key={98}>
        <td className="text-right" colSpan="2">Total Orders</td>
        <td className="text-right">{discounts.total.ordenes}</td>
      </tr>)

    }

    let itemDiscounts = null
    if ( typeof discounts.items !== 'undefined' ) {

      itemDiscounts = discounts.items.map( (disc, index) => {
         const totalDisc = parseFloat()
        return (<tr key={index}>
          <td>{disc.descuento} (Item)</td>
          <td>{disc.cantidad}</td>
          <td className="text-right">{disc.total}</td>
        </tr>)
      } )

      itemDiscounts.push(<tr key={99}>
        <td className="text-right" colSpan="2">Total Items</td>
        <td className="text-right">{discounts.total.items}</td>
      </tr>)

    }

    return (
      <div>
        {
          daySummaryData.length>0?
          <div>

            <div className="row">
              <div className="col-sm-12">
                <br />
                <TableData dataSet={daySummaryData} headers={columns.daySummary(daySummaryData)} pageSize={10} />
              </div>
            </div>


            <br /><br /><br />
            <div className="row">
              {/* tabla de pagos */}
              <div className="col-sm-4">
                <table className="table table-striped">
                  <thead className="thead-dark">
                     <tr><th colSpan="3">Payments</th></tr>
                    <tr>
                      <th scope="col">Payment</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  {/* <tfoot>
                    <tr>
                      <td>&nbsp;</td>
                      <td>Total</td>
                      <td>{totalPayments}</td>
                    </tr>
                  </tfoot> */}
                  <tbody>
                    {payments}
                    <tr key={89}>
                      <td>Efectivo</td>
                      <td>Efectivo</td>
                      <td className="text-right">{parseFloat( (grandNet - totalOtherPays).toFixed(2) )}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


              {/* tabla de descuentos */}
              <div className="col-sm-4">
                <table className="table table-striped">
                  <thead className="thead-light">
                    <tr><th colSpan="3">Discounts</th></tr>
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Cant</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemDiscounts}
                    {orderDiscounts}
                  </tbody>
                </table>
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
