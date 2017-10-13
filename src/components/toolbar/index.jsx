import 'react-dates/initialize'
import React, { Component } from 'react'
import { SingleDatePicker, DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {utils} from '../../utils/utils'

class ToolBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            focused: false,
            activeRange: true,
            focusedInput: null,
            disabledButtonSearch: true
        }
        this.onDateChange  = this.onDateChange.bind(this)
        this.onDatesChange = this.onDatesChange.bind(this)
        this.onFocusChange = this.onFocusChange.bind(this)
        this.handleCheck   = this.handleCheck.bind(this)
        this.toggleButtonSearch = this.toggleButtonSearch.bind(this)
    }

    componentDidMount(){

    }

    onDateChange(momentDate) {
        this.setState({ 
            startDate: moment(momentDate),
            focused: false 
        })
        this.toggleButtonSearch()
    }
    
    onDatesChange({ startDate, endDate }) {
        this.setState({ 
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

    handleCheck = ()=>{
        this.setState({activeRange: !this.state.activeRange})
        this.toggleButtonSearch()
    }

    toggleButtonSearch = ()=> {
        let disabledButton = true
        if ( this.activeRange ){
            disabledButton = (this.state.startDate === null && this.state.endDate === null)
        }else if ( !this.activeRange ){
            disabledButton = (this.state.startDate === null)
        }
        this.setState({disabledButtonSearch: disabledButton})
        console.log(!disabledButton)
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
                    />
                    :
                    <DateRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={this.onDatesChange}
                        onFocusChange={this.onFocusChange}
                        focusedInput={this.state.focusedInput}
                        displayFormat={utils.getDateFormat()}
                    /> 
                    }

                    <button type="button" className="btn btn-primary" disabled={this.state.disabledButtonSearch}>Search</button>

                </div>
                
            </div>
        )
    }
}

export default ToolBar