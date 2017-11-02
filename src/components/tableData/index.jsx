import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux';
import _ from 'lodash'
import FooterCell from './footerCell'

// import * as appActions from '../../actions/appActions';


class TableData extends Component {
    render() {
        const data = [
            {
                name: 'Tanner Linsley',
                age: 26
            },
            {
                name: 'Jason Maurer',
                age: 23,
            }

        ]

    //     const columns = [{
    //       Header: 'Name',
    //       accessor: 'name' // String-based value accessors!
    //     }, {
    //       Header: 'Age',
    //       accessor: 'age',
    //     //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    //     },
    //     {
    //     //   id: 'friendName', // Required because our accessor is not a string
    //       Header: 'Friend Name',
    //     //   accessor: d => d.friend.name // Custom value accessors!
    //     }, {
    //     //   Header: props => <span>Friend Age</span>, // Custom header components!
    //       Header: 'Friend Age'
    //     //   accessor: 'friend.age'
    //     }
    // ]

        // const columns = this.props.AppInfo.itemsSummaryHeader
        // const dataInfo = this.props.AppInfo.itemsSummaryData

        const columns = [
          {Header:'Item', accessor:'item', width: 400},
          {Header:'Quantity',accessor:'quantityItems', Footer: (
            <span>
              <strong>Average:</strong>{" "}
              {_.round(_.mean(_.map(this.props.AppInfo.itemsSummaryData, d => d.quantityItems)))}
            </span>)},
          {Header:'Order Count',accessor:'quantityOrders'},
          {Header:'Gross', accessor:'gross', Footer: (

            <FooterCell dataSet={this.props.AppInfo.itemsSummaryData} options={isInt:false,groupKey:'gross'}/>
          )},
          {Header:'Discount', accessor:'discount'},
          {Header:'Net',accessor:'net'},
          {Header:'Order Tax',accessor:'orderTax'},
          {Header:'Hour',accessor:'hour'}]

        return (
          // <div>dskfbnsdkjfbgjdfs</div>
            <ReactTable
              // data={data}
              // columns={columns}
              data={this.props.AppInfo.itemsSummaryData}
              columns={columns}
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
