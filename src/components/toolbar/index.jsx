import 'react-dates/initialize'
import React, { Component } from 'react'
import { SingleDatePicker, DateRangePicker, isInclusivelyBeforeDay } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {utils, api} from '../../utils/utils'
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions'
import {
  ProcessSales,
  // ProcessDaySummary,
  // ProcessHours
} from './calculateData'

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
      salesGrouping: 'item',
      hoursGrouping: 'item',
      grouping: 'item',
      epochDates: null
    }
    this.onDateChange  = this.onDateChange.bind(this)
    this.onDatesChange = this.onDatesChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.handleCheck   = this.handleCheck.bind(this)
    this.toggleButtonSearch = this.toggleButtonSearch.bind(this)
    this.loadResults = this.loadResults.bind(this)

    this.changeGroup = this.changeGroup.bind(this)
    // this.changeHoursGroup = this.changeHoursGroup.bind(this)
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
     if (typeof utils.getSessionParams() === 'undefined' ) {
         utils.initializeParams()
         // console.log(utils.getSessionParams())
     }else{
        // console.log('params loaded successfully...');
     }
    this.toggleFetchData(true)

    const epochStartingDate = utils.getEpochDate(moment(this.state.startDate).format(utils.getDateFormat()))
    const epochEndingDate = (this.state.activeRange) ? utils.getEpochDate(moment(this.state.endDate).format(utils.getDateFormat())) : null

    const dates = {
      startingDate: epochStartingDate[0],
      endingDate: (this.state.activeRange) ? epochEndingDate[1] : epochStartingDate[1]
    }
    await this.setState({epochDates: dates})

    switch (this.props.AppInfo.activeModule){
      case 1:
        await this.loadSales()
        break
      case 2:
        await this.loadDaySummary()
        break
      case 3:
        await this.loadHours()
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

  loadSales = async() => {
    try{
      await this.setState({grouping:this.state.salesGrouping})
      const response = await api.getItemsSummary( this.state.epochDates, "" )
      const jsonData = await response.json()

      if ( jsonData.encontro ){
        await this.setState({tempData:jsonData.data})
        this.groupData()
      }else {
        console.error(jsonData)
        const strMsg = (typeof jsonData.mensaje !== 'undefined')?jsonData.mensaje:jsonData.error
        if (jsonData.error){alert(strMsg)}
      }
    } catch (err) {
      alert(err)
    }
  }

  loadHours = async() => {
    try{
      await this.setState({grouping:'item'})
      const response = await api.getHoursSummary( this.state.epochDates, "" )
      const jsonData = await response.json()

      if ( jsonData.encontro===true ){
        await this.setState({tempData:jsonData.data})
        this.groupData()
      }else{
        console.error(jsonData)
        const strMsg = (typeof jsonData.mensaje !== 'undefined')?jsonData.mensaje:jsonData.error
        if (jsonData.error){alert(strMsg)}
      }
    } catch (err) {
      alert(err)
    }
  }


  loadDaySummary = async() => {
    try{
      await this.setState({grouping:'item'})
      const response = await api.getDaySummary( this.state.epochDates, "" )
      const jsonData = await response.json()

      if ( jsonData.encontro===true ){
        await this.setState({tempData:jsonData.data})
        await this.groupData()

      }else{
        console.error(jsonData)
        const strMsg = (typeof jsonData.mensaje !== 'undefined')?jsonData.mensaje:jsonData.error
        if (jsonData.error){alert(strMsg)}
      }
    } catch (err) {
      alert(err)
    }
  }


  // changeGroup = async(event) => {
  //   const groupName = event.target.value
  //   await this.setState({salesGrouping: groupName, grouping: groupName})
  //   this.groupData()
  // }

  changeGroup = async(strFilter) => {
    if (this.props.AppInfo.activeModule === 1)
      await this.setState({salesGrouping: strFilter, grouping: strFilter})
    if (this.props.AppInfo.activeModule === 3)
      await this.setState({hoursGrouping: strFilter, grouping: strFilter})

    this.groupData()
  }

  // changeHoursGroup = async(event) => {
  //   const groupName = event.target.value
  //   await this.setState({hoursGrouping: groupName, grouping: groupName})
  //   this.groupData()
  // }

  groupData = async() => {
    let groupName = 'nombre'

    if ( this.state.grouping === 'item' ) {
      groupName = 'nombre'
    }else if ( this.state.grouping === 'category' ) {
      groupName = 'nombrecat'
    }else {
      groupName = this.state.grouping
    }
    console.log(`agrupando por: ${groupName}`)

    // enviar al store los datos que muestra el reporte....
    if (this.props.AppInfo.activeModule === 1) {
      const salesColumns = ["category","item",'quantity', 'orders Count', 'gross', 
      'items discounts', 'orders discount', 'net', 'orders tax']
      
      // el primer parametro es la posicion donde va a empezar a borrar y el seg param la cantidad de pos que va a borrar
      if (groupName==='nombrecat'){salesColumns.splice(1, 1)}

      await this.props.setSalesColsVisible(salesColumns)
      await this.props.setSalesSummary( ProcessSales(groupName, this.state.tempData) )
    }

    if (this.props.AppInfo.activeModule === 2) {
      await this.props.setDaySummary( ProcessSales(groupName, this.state.tempData) )

      // obtener los metodos de pago (payments)
      const paymentsInfoRequest = await api.getPayments(this.state.epochDates, "")
      const paymentsInfo = await paymentsInfoRequest.json()
      await this.props.setPaymentsDaySummary(paymentsInfo.data)

      // desglose de descuentos (discounts)
      const discountsRequest = await api.getDiscounts(this.state.epochDates, "")
      const discountsInfo = await discountsRequest.json()
      await this.props.setDiscountsDaySummary(discountsInfo)


   }

    if (this.props.AppInfo.activeModule === 3) {
      const hoursColumns = ["category","item",'hour','quantity', 'orders Count', 'gross', 
      'items discounts', 'orders discount', 'net', 'orders tax']
      
      if (groupName==='hora'){hoursColumns.splice(0, 2)}
      if (groupName==='nombrecat'){hoursColumns.splice(1, 1)}

      await this.props.setHoursColsVisible(hoursColumns)
      const hoursSummary = await ProcessSales(groupName, this.state.tempData)
      await this.props.setHoursSummary( hoursSummary )
    }

  }


  render( { AppInfo } = this.props ){
    const { activeModule, salesSummaryData, daySummaryData,
      hoursSummary } = AppInfo

    let dataSet = []
    if ( activeModule === 1 ) dataSet = salesSummaryData
    if ( activeModule === 2 ) dataSet = daySummaryData
    if ( activeModule === 3 ) dataSet = hoursSummary


    return (
      <div className="container-fluid">
        <br />
        <div className='row'>

          <div className="col-sm-11">

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
                  // isOutsideRange={() => false}.
                  isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                />
                :
                <DateRangePicker
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onDatesChange={this.onDatesChange}
                  onFocusChange={this.onFocusChange}
                  focusedInput={this.state.focusedInput}
                  displayFormat={utils.getDateFormat()}
                  isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
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

              {
                activeModule === 1 ?
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary">Group By</button>
                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    disabled={this.state.disabledButtonSearch}>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" role="button" onClick={()=>this.changeGroup('item')}>{this.state.salesGrouping==='item'?<i className="fa fa-arrow-right" aria-hidden="true"></i>:null} No Grouping</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" role="button" onClick={()=>this.changeGroup('category')}>{this.state.salesGrouping==='category'?<i className="fa fa-arrow-right" aria-hidden="true"></i>:null}  Category</a>
                  </div>
                </div>
                : null
              }

              {
                activeModule === 3 ?
                // <select value={this.state.hoursGrouping} onChange={this.changeHoursGroup} className="form-control" >
                //   <option value="item">No Grouping</option>
                //   <option value="hora">Hours</option>
                // </select>
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary">Group By</button>
                  <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    disabled={this.state.disabledButtonSearch}>
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" role="button" onClick={()=>this.changeGroup('item')}>{this.state.hoursGrouping==='item'?<i className="fa fa-arrow-right" aria-hidden="true"></i>:null} No Grouping</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" role="button" onClick={()=>this.changeGroup('hora')}>{this.state.hoursGrouping==='hora'?<i className="fa fa-arrow-right" aria-hidden="true"></i>:null}  Hour</a>
                    <a className="dropdown-item" role="button" onClick={()=>this.changeGroup('nombrecat')}>{this.state.hoursGrouping==='nombrecat'?<i className="fa fa-arrow-right" aria-hidden="true"></i>:null}  Category</a>
                  </div>
                </div>
                : null
              }

            </form>

          </div>

          {dataSet.length>0?
          <div className="col-sm-1">
            <div className="btn-group">
              <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Export
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" role="button" onClick={()=>utils.exportData(dataSet)}><i className="fa fa-file-excel-o" aria-hidden="true"></i> Excel (.xlsx)</a>
                {/* <div className="dropdown-divider"></div>
                <a className="dropdown-item" role="button">Separated link</a> */}
              </div>
            </div>
          </div>
          : null}

        </div>


        {/* <div className="alert alert-error alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> */}

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
    setSalesColsVisible : data => dispatch(appActions.setSalesVisibleCols(data)),

    setDaySummary  : data => dispatch(appActions.setDaySummary(data)),
    setPaymentsDaySummary  : data => dispatch(appActions.setPaymentsDaySummary(data)),
    setDiscountsDaySummary  : data => dispatch(appActions.setDiscountsDaySummary(data)),

    setHoursSummary  : data => dispatch(appActions.setHoursData(data)),
    setHoursColsVisible : data => dispatch(appActions.setHoursVisibleCols(data)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
