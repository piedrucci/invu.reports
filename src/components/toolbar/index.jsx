import 'react-dates/initialize'
import React, { Component } from 'react'
import { SingleDatePicker, DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {utils, api} from '../../utils/utils'
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';

class ToolBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            focused: false,
            activeRange: false,
            focusedInput: null,
            disabledButtonSearch: true,
            fetchingData: false
        }
        this.onDateChange  = this.onDateChange.bind(this)
        this.onDatesChange = this.onDatesChange.bind(this)
        this.onFocusChange = this.onFocusChange.bind(this)
        this.handleCheck   = this.handleCheck.bind(this)
        this.toggleButtonSearch = this.toggleButtonSearch.bind(this)
        this.loadResults = this.loadResults.bind(this)
    }

    componentDidMount(){

    }

    onDateChange = async(momentDate) => {
        await this.setState({
            startDate: moment(momentDate),
            focused: false
        })
        this.toggleButtonSearch()
    }

    onDatesChange = async ({ startDate, endDate }) => {
        await this.setState({
            startDate: (startDate === null) ? this.state.startDate : moment(startDate),
            endDate: (endDate === null) ? this.state.endDate : moment(endDate)
        })
        this.toggleButtonSearch()
    }


    onFocusChange(statusFocus) {
        if ( !this.state.activeRange ) {
            const isFocused = (statusFocus.focused === null) ? false : statusFocus.focused
            this.setState({ focused: isFocused })
        }else if (this.state.activeRange) {
            this.setState({focusedInput: statusFocus})
        }
    }

   handleCheck = async()=>{
      await this.setState({activeRange: !this.state.activeRange})
      this.toggleButtonSearch()
   }

   toggleButtonSearch = async()=> {
      let disabledButton = true
      if ( this.state.activeRange ){
         disabledButton = (this.state.startDate!==null && this.state.endDate!==null) ?false:true
      }else if ( !this.state.activeRange ){
         disabledButton = (this.state.startDate === null)
      }
      await this.setState({disabledButtonSearch: disabledButton})
   }

   loadResults = async() => {
      this.toggleFetchData(true)

      const epochStartingDate = utils.getEpochDate(moment(this.state.startDate).format(utils.getDateFormat()))
      const epochEndingDate = (this.state.activeRange) ? utils.getEpochDate(moment(this.state.endDate).format(utils.getDateFormat())) : null

      const response = await api.getItemsSummary(
         {
            startingDate: epochStartingDate[0],
            endingDate: (this.state.activeRange) ? epochEndingDate[1] : epochStartingDate[1]
         }
         , "bd_lcaesarsvzaita"
      )
      const jsonData = await response.json()

      if ( jsonData.encontro===true ){
         let arrData = await jsonData.data.map( (item, index) => {

            // calcular el total en modificadores para el item actual
            let totalMods =  item.item.modif.reduce( (total, mod) => {
               return parseFloat(total) + parseFloat(mod.total)
            },0.0 ) || 0

            totalMods = ( totalMods>0 ) ? parseFloat(item.item.total_vendido)+parseFloat(totalMods) : parseFloat(item.item.total_vendido)

            return {
               'item':item.item.nombre,
               quantityItems: parseInt(item.item.cantidad_vendida, 10),
               quantityOrders: parseInt(item.item.cantidad_ordenes, 10),
               gross: parseFloat(totalMods).toFixed(2),
               discount: parseFloat(item.item.descuento).toFixed(2),
               net: (parseFloat(totalMods) - parseFloat(item.item.descuento)).toFixed(2),
               orderTax: parseFloat(item.item.tax).toFixed(2)
            }

         } )
         // arrData.push({item:'decuentos generales en ordenes', quantityItems:0, quantityOrders:0, gross:0,discount:0,net:-65.14,orderTax:0})
         await this.props.setSalesSummary(arrData)
      }else{
         alert(jsonData.error)
      }

      this.toggleFetchData(false)
   }

    toggleFetchData = async(sw) => {
        await this.setState(
            {
                fetchingData: sw,
                disabledButtonSearch: sw
            }
        )
    }

    render(){
        return (
            <div className="container">
                <div className='row'>
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" checked={this.state.activeRange} onChange={this.handleCheck}/> Range
                    </label>

                    {
                        this.state.activeRange === false ?

                    <SingleDatePicker
                        date={this.state.startDate} //this.state.startDate
                        focused={this.state.focused}
                        onDateChange={this.onDateChange}
                        onFocusChange={this.onFocusChange}
                        displayFormat={utils.getDateFormat()}
                        // isOutsideRange={date => date.year() !== moment()}
                        isOutsideRange={() => false}
                    />
                    :
                    <DateRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={this.onDatesChange}
                        onFocusChange={this.onFocusChange}
                        focusedInput={this.state.focusedInput}
                        displayFormat={utils.getDateFormat()}
                        isOutsideRange={() => false}
                        // isOutsideRange={date => date.year() !== moment()}
                    />
                    }

                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={this.state.disabledButtonSearch}
                        onClick={this.loadResults}
                    >Filter Data &nbsp;
                        {this.state.fetchingData ? <i className="fa fa-spinner fa-spin"></i> : null}
                    </button>

                </div>

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
  const mapDispatchToProps = (dispatch) => {
    return {
      setItemsSummary: data => dispatch(appActions.setItemsSummary(data)),
      setSalesSummary: data => dispatch(appActions.setSalesSummary(data))
    }
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
