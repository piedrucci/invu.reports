import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux';
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
        const columns = this.props.AppInfo.itemsSummaryHeader
      
        return (
            <ReactTable
              data={this.props.AppInfo.itemsSummaryData}
              columns={columns}
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