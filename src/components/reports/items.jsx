import React, { Component } from 'react'
import TableData from '../tableData'
import { connect } from 'react-redux';
// import * as appActions from '../../actions/appActions';

class ItemsReport extends Component{
    constructor(props){
        super(props)
        this.state = {
            header: props.AppData.itemsSummaryHeader
        }
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>ITEMS REPORT
            {
                this.props.AppData.itemsSummaryData.length>0?
                <TableData header={this.state.header} />
                : null
            }
            </div>
        )
  }

}
// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
    return {
      AppData: state.appInfo
    }
  };
  
  // Maps actions to props
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       changeOptionMenu: opt => dispatch(appActions.changeMenuOption(opt))
//     }
//   };
  
  export default connect(mapStateToProps, null)(ItemsReport)