import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as appActions from '../../actions/appActions';
import Pagination from '../../utils/pagination'

class TableData2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.AppInfo.itemsSummaryData
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render(){
        const data = this.props.AppInfo.itemsSummaryData
        let headerTable = this.props.header.map( (columnName, index) => {
            return <th key={'col'+index}>{columnName}</th>
        } )


        let dataTable = data.map( (elem, index) => {
            return <tr key={'row'+index}><td>{elem.item}</td><td>{elem.quantityItems}</td><td>{elem.quantityOrders}</td><td>{elem.gross}</td></tr>
        } )

        // Object.keys(data).forEach(function (key) {
        //     console.log(data[key])
        //  });

        const quantities = data.reduce( (acum, current) => { return acum + current.quantityItems },0 )
        const quantOrders = data.reduce( (acum, current) => { return acum + current.quantityOrders },0 )
        const gross = data.reduce( (acum, current) => { return acum + parseFloat(current.gross) },0 )
        console.log(`${quantities}, ${quantOrders}, ${gross}`)


        // console.log(this.props.AppInfo.itemsSummaryData)

        return (
            <div>
                <table className="table table-striped table-hover table-sm table-responsive">
                <thead>
                    <tr>
                    {headerTable}
                    </tr>
                </thead>
                <tbody>
                    {dataTable}
                </tbody>
                </table>
                <Pagination items={this.props.AppInfo.itemsSummaryData} onChangePage={this.onChangePage} />
            </div>
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
  
  export default connect(mapStateToProps, null)(TableData2)