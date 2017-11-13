import React, { Component } from 'react'
// import * as pdf from 'jspdf'



var columns = ["ID", "Name", "Country"];
var rows = [
    [1, "Shaw", "Tanzania"],
    [2, "Nelson", "Kazakhstan"],
    [3, "Garcia", "Madagascar"]
];

class PDF extends Component {
   generatePdf = () => {
      // var doc = new pdf()
      //
      // doc.text('Hello world!', 10, 10)
      // doc.autoTable(columns, rows);
      // doc.save('a4.pdf')
      console.log('ssss')
   }
   render() {
      return (
         <button className="btn btn-danger" onClick={()=>this.generatePdf()}>
            <i class="fa fa-file-pdf-o fa-2x" aria-hidden="true"></i>
         </button>
      )
   }
}

export default PDF
