import React, { Component } from 'react'

class FooterCell extends Component {
   constructor(props) {
      super(props)
      this.state = {
        total: 0
      }
      this.calculateTotals = this.calculateTotals.bind(this)
   }

   componentDidMount() {
      this.calculateTotals(this.props)
   }

   componentWillReceiveProps(nextProps) {
      this.calculateTotals(nextProps)
   }

   calculateTotals = (info) => {
      let validKey = false
      let total = info.dataSet.reduce( (total, row) => {
         validKey = ( typeof row[info.options.groupKey] !== 'undefined' )
         if (validKey) {
            return parseFloat(total) + parseFloat(row[info.options.groupKey])
         }else {
            return 0
         }
      },0.0 )
      this.setState({total: (this.props.options.isInt) ? total : total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')})
   }

   render() {
      return (
         <span style={{fontWeight: 'bold'}}>
            {this.state.total}
         </span>
      )
   }
}

export default FooterCell
