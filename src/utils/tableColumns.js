import React from 'react'
import FooterCell from '../components/tableData/footerCell'

export const columns = {
   sales: (data) => {
      return [
         {Header:'Category', accessor:'category', width: 200},
         {Header:'Item', accessor:'item', width: 300},
         {Header:'Quantity',accessor:'quantityItems', Footer: (
            // <span>
            //   <strong>Average:</strong>{" "}
            //   {_.round(_.mean(_.map(this.props.AppInfo.itemsSummaryData, d => d.quantityItems)))}
            // </span>
            <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityItems'}}/>
         )},
         {Header:'Order Count',accessor:'quantityOrders', Footer: (
            <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityOrders'}}/>
         )},
         {Header:'Gross', accessor:'gross', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'gross'}}/>
         )},
         {Header:'Discount', accessor:'discount', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'discount'}}/>
         )},
         {Header:'Net',accessor:'net', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'net'}}/>
         )},
         {Header:'Order Tax',accessor:'orderTax', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderTax'}}/>
         )},
      ]
   },




   daySummary: (data) => {
      return [
         {Header:'Categoy', accessor:'orderId'},
         {Header:'Item', accessor:'item'},
         {Header:'amount',accessor:'price', Footer: (
            // <span>
            //   <strong>Average:</strong>{" "}
            //   {_.round(_.mean(_.map(this.props.AppInfo.itemsSummaryData, d => d.quantityItems)))}
            // </span>
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'price'}}/>
         )},
      ]
   }
}
