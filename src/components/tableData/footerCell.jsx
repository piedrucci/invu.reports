import React, { Component } from 'react'

class FooterCell extends Component {
  constructor(props) {
      this.state = {
        isIntegerValue : props.options.isInt || true,
        groupKey : props.options.groupKey || '',
        data : props.dataSet
      }
  }

  render() {
    const results = 0

    results = this.state.data.reduce( (total, row) => {


      for (var key in row){
        console.log( key, dict[key] );
      }


      const factor =




        return ( this.state.isIntegerValue ) ? parseInt(total, 10) + parseInt(row.gross, 10) : parseFloat(total) + parseFloat(row.gross)
      },0.0 )

    return (
      <span style={{fontWeight: 'bold'}}>
        {
          this.state.data.reduce( (total, row) => {
            return parseFloat(total) + parseFloat(row.gross)
          },0.0 )
        }
      </span>
    )
  }
}

export default FooterCell
