import 'react-dates/initialize'
import React, { Component } from 'react'
import { SingleDatePicker, DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {utils, api} from '../../utils/utils'
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions'
import _ from 'lodash'

const apiKey = "bd_yogenmultiplazapos"

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
      fetchingData: false,

      tempData: null,
      grouping: 'item'
    }
    this.onDateChange  = this.onDateChange.bind(this)
    this.onDatesChange = this.onDatesChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.handleCheck   = this.handleCheck.bind(this)
    this.toggleButtonSearch = this.toggleButtonSearch.bind(this)
    this.loadResults = this.loadResults.bind(this)

    this.changeGroup = this.changeGroup.bind(this)
    this.groupData = this.groupData.bind(this)
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

    const dates = {
      startingDate: epochStartingDate[0],
      endingDate: (this.state.activeRange) ? epochEndingDate[1] : epochStartingDate[1]
    }

    switch (this.props.AppInfo.activeModule){
      case 1:
      await this.loadSales(dates)
      break
      case 2:
      await this.loadDaySummary(dates)
      break
      default:
      break
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

  loadSales = async(dates) => {
    try{
      const response = await api.getItemsSummary( dates, apiKey )
      const jsonData = await response.json()
      console.log(jsonData);

      if ( jsonData.encontro===true ){
        await this.setState({tempData:jsonData.data})
        this.groupData()
        // let arrData = await jsonData.data.map( (item, index) => {

          // calcular el total en modificadores para el item actual
          // let totalMods =  item.item.modif.reduce( (total, mod) => {
          //   return parseFloat(total) + parseFloat(mod.total)
          // },0.0 ) || 0
          //
          // totalMods = ( totalMods>0 ) ? (parseFloat(item.item.total_vendido)+parseFloat(totalMods)).toFixed(2) : parseFloat(item.item.total_vendido).toFixed(2)
          //
          // return {
          //   'item':item.item.nombre,
          //   category:item.item.nombrecat,
          //   quantityItems: parseInt(item.item.cantidad_vendida, 10),
          //   quantityOrders: parseInt(item.item.cantidad_ordenes, 10),
          //   gross: parseFloat(totalMods),
          //   discount: parseFloat( parseFloat(item.item.descuento).toFixed(2) ),
          //   net: parseFloat( (parseFloat(totalMods) - parseFloat(item.item.descuento)).toFixed(2) ),
          //   orderTax: parseFloat( (parseFloat(item.item.tax).toFixed(2)) )
          // }

        // } )
        // await this.props.setSalesSummary(arrData)
      }else{
        alert(jsonData.error)
      }
    } catch (err) {
      alert(err)
    }
  }


  loadDaySummary = async(dates) => {
    try{
      const response = await api.getDaySummary( dates, apiKey )
      // console.log(response.status);
      const jsonData = await response.json()
      // if ( jsonData.encontro===true ){
      let arrData = await jsonData.data.map( (item, index) => {

        // calcular el total en modificadores para el item actual
        // let totalMods =  item.item.modif.reduce( (total, mod) => {
        //    return parseFloat(total) + parseFloat(mod.total)
        // },0.0 ) || 0

        // totalMods = ( totalMods>0 ) ? parseFloat(item.item.total_vendido)+parseFloat(totalMods) : parseFloat(item.item.total_vendido)

        return {
          orderId:item.id_cita,
          name:item.menu.nombre,
          price: parseFloat(item.precioSugerido).toFixed(2)
        }

      } )
      await this.props.setDaySummary(arrData)
      // }else{
      //    alert(jsonData.error)
      // }
    } catch (err) {
      alert(err)
    }
  }


  changeGroup = async(event) => {
    const groupName = event.target.value
    const data = this.props.AppInfo.salesSummaryData
    await this.setState({grouping: groupName})
    this.groupData(this.props.AppInfo.salesSummaryData)
  }

  groupData = async() => {
    // console.log(data);
    let groupName = 'nombre'

    if ( this.state.grouping === 'item' ) {
      groupName = 'nombre'
    }else if ( this.state.grouping === 'category' ) {
      groupName = 'nombrecat'
    }else {
      groupName = this.state.grouping
    }
    console.log(`agrupando por: ${groupName}`);

    // agrupar por el campo seleccionado (groupName)
    let grouped = _.groupBy(this.state.tempData, (row)=> {
      return row.item[groupName]
    })
    console.log(grouped)
    // const arrayItems = _.map( grouped, (row) => {
    //   let totalMods = 0
    //   // calcular el total en modificadores para el item actual
    //   if ( groupName==='nombre' ){
    //     totalMods = row[0].item.modif.reduce( (total, mod) => {
    //       return parseFloat(total) + parseFloat(mod.total)
    //     },0.0 )
    //   }
    //
    //   totalMods = ( totalMods>0 ) ? (parseFloat(row[0].item.total_vendido)+parseFloat(totalMods)).toFixed(2) : parseFloat(row[0].item.total_vendido).toFixed(2)
    //
    //   return {
    //     item:row[0].item.nombre,
    //     category:row[0].item.nombrecat,
    //     quantityItems: parseInt(row[0].item.cantidad_vendida, 10),
    //     quantityOrders: parseInt(row[0].item.cantidad_ordenes, 10),
    //     gross: parseFloat(totalMods),
    //     discount: parseFloat( parseFloat(row[0].item.descuento).toFixed(2) ),
    //     net: parseFloat( (parseFloat(totalMods) - parseFloat(row[0].item.descuento)).toFixed(2) ),
    //     orderTax: parseFloat( (parseFloat(row[0].item.tax).toFixed(2)) )
    //   }
    //
    // } )

    // await this.props.setSalesSummary(arrayItems)
    // console.log(arrayItems)

  }


  render(){
    return (
      <div className="container-fluid">
        <br />
        <div className='row'>

          <div className="col-sm-12">

            <form className="form-inline">

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
                {this.state.fetchingData ? <i className="fa fa-spinner fa-pulse"></i> : null}
              </button>

              <select value={this.state.grouping} onChange={this.changeGroup} className="form-control" >
                <option value="item">No Grouping</option>
                <option value="category">Categoy</option>
              </select>

            </form>

          </div>

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
    setSalesSummary: data => dispatch(appActions.setSalesSummary(data)),
    setDaySummary: data => dispatch(appActions.setDaySummary(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
