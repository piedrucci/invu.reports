import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux';
import FooterCell from './footerCell'
// import * as appActions from '../../actions/appActions';


class TableData extends Component {
   render() {


      const columns = [
         {Header:'Item', accessor:'item', width: 300},
         {Header:'Quantity',accessor:'quantityItems', Footer: (
            // <span>
            //   <strong>Average:</strong>{" "}
            //   {_.round(_.mean(_.map(this.props.AppInfo.itemsSummaryData, d => d.quantityItems)))}
            // </span>
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:true,groupKey:'quantityItems'}}/>
         )},
         {Header:'Order Count',accessor:'quantityOrders', Footer: (
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:true,groupKey:'quantityOrders'}}/>
         )},
         {Header:'Gross', accessor:'gross', Footer: (
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:false,groupKey:'gross'}}/>
         )},
         {Header:'Discount', accessor:'discount', Footer: (
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:true,groupKey:'discount'}}/>
         )},
         {Header:'Net',accessor:'net', Footer: (
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:true,groupKey:'net'}}/>
         )},
         {Header:'Order Tax',accessor:'orderTax', Footer: (
            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={{isInt:true,groupKey:'orderTax'}}/>
         )},
         {Header:'Hour',accessor:'hour'}
      ]

      return (
         <ReactTable
            data={this.props.AppInfo.itemsSummaryData}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 25, 50, 100]}
            defaultPageSize={10}
            className="-striped -highlight"
         />
      )
   }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
      AppInfo: state.appInfo
    }
  };

  // Maps actions to props
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       setItemsSummary: data => dispatch(appActions.setItemsSummary(data))
//     }
//   };

export default connect(mapStateToProps, null)(TableData)
