import React, { Component } from 'react'

class FooterCell extends Component {
   constructor(props) {
      super(props)
      this.state = {
        isIntegerValue : props.options.isInt || true,
        groupKey : props.options.groupKey || '',
        data : props.dataSet,
        total: 0
      }
  }

   componentWillReceiveProps(nextProps) {
      let validKey = false
      let total = nextProps.dataSet.reduce( (total, row) => {
         validKey = ( typeof row[nextProps.options.groupKey] !== 'undefined' )
         if (validKey) {
            return parseFloat(total) + parseFloat(row[nextProps.options.groupKey])
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
