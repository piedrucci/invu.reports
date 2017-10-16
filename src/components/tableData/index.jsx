import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';

class TableData extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let headerTable = this.props.header.map( (columnName, index) => {
            return <th key={'col'+index}>{columnName}</th>
        } )
        let dataTable = this.props.AppInfo.itemsSummaryData.map( (elem, index) => {
            return <tr key={'row'+index}><td>{elem.item}</td><td>{elem.quantityItems}</td><td>{elem.quantityOrders}</td><td>{elem.gross}</td></tr>
        } )
        // console.log(this.props.AppInfo)
        console.log(dataTable)
        return (
            <table className="table table-striped">
            <thead>
              <tr>
                {headerTable}
              </tr>
            </thead>
            <tbody>
            {dataTable}
            </tbody>
            </table>
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