import React, { Component } from 'react'
import {utils} from '../../utils/utils'

class ItemsReport extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        console.log(utils.showApiPath())
    }

    render() {
    return (
        <div>ITEMS REPORT</div>
    )
  }
}

export default ItemsReport;