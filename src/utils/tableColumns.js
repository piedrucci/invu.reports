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
         {Header:'Orders Count',accessor:'quantityOrders', Footer: (
            <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityOrders'}}/>
         )},
         {Header:'Gross', accessor:'gross', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'gross'}}/>
         )},
         {Header:'Items Discounts', accessor:'itemDisc', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'itemDisc'}}/>
         )},
         {Header:'Orders Discount', accessor:'orderDisc', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderDisc'}}/>
         )},
         {Header:'Discounts', accessor:'discounts', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'discounts'}}/>
         )},
         {Header:'Net',accessor:'net', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'net'}}/>
         )},
         {Header:'Orders Tax',accessor:'orderTax', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderTax'}}/>
         )},
      ]
   },




  daySummary: (data) => {
    return [
      {Header:'Item', accessor:'item'},
      {Header:'Orders', accessor:'quantityItems', Footer: (
         <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityItems'}}/>
      )},
      {Header:'Amount',accessor:'gross', Footer: (
         <FooterCell dataSet={data} options={{isInt:false,groupKey:'gross'}}/>
      )},
      // {Header:'Items Discounts',accessor:'itemDisc', Footer: (
      //    <FooterCell dataSet={data} options={{isInt:false,groupKey:'itemDisc'}}/>
      // )},
      // {Header:'Orders Discounts',accessor:'orderDisc', Footer: (
      //    <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderDisc'}}/>
      // )},
      {Header:'Discounts', accessor:'discounts', Footer: (
         <FooterCell dataSet={data} options={{isInt:false,groupKey:'discounts'}}/>
      )},
    ]
},


  hoursSummary: (data, headers) => {
     return  [
      {Header:'Category', accessor:'category', width: 200},
      {Header:'Item', accessor:'item', width: 300, show: false},
      {Header:'Hour', accessor:'hour'},

      {Header:'Quantity',accessor:'quantityItems', Footer: (
          <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityItems'}}/>
      )},
      {Header:'Orders Count',accessor:'quantityOrders', Footer: (
          <FooterCell dataSet={data} options={{isInt:true,groupKey:'quantityOrders'}}/>
      )},
      {Header:'Gross', accessor:'gross', Footer: (
          <FooterCell dataSet={data} options={{isInt:false,groupKey:'gross'}}/>
      )},
      {Header:'Items Discounts', accessor:'itemDisc', Footer: (
          <FooterCell dataSet={data} options={{isInt:false,groupKey:'itemDisc'}}/>
      )},
      {Header:'Orders Discount', accessor:'orderDisc', Footer: (
            <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderDisc'}}/>
         )},
      {Header:'Discounts', accessor:'discounts', Footer: (
         <FooterCell dataSet={data} options={{isInt:false,groupKey:'discounts'}}/>
      )},
      {Header:'Net',accessor:'net', Footer: (
          <FooterCell dataSet={data} options={{isInt:false,groupKey:'net'}}/>
      )},
      {Header:'Orders Tax',accessor:'orderTax', Footer: (
          <FooterCell dataSet={data} options={{isInt:false,groupKey:'orderTax'}}/>
      )},
    ]
  }
}
