import moment from 'moment'
const alasql = window.alasql
let dateFormat = "MM-DD-YYYY"

// const testApiKey = "bd_yogenmultiplazapos"
// const testApiKey = "bd_lcaesarsvzaita"
let session = {
    APIKEY : '',
    API    : 'https://api.invupos.com/invuApiPos/index.php?r=',
    NOMBREF: ''
  }

export const utils = {


  // DEVUELVE ARRAY CON LAS FECHAS DE INICIO Y FIN EN FORMATO EPOCH(UNIX)... null si es fecha invalida
  getEpochDate: (strDate) => {
    let epochStartingDate = (moment(strDate + " 00:00:00 +0000", dateFormat + " HH:mm:ss Z").isValid()) ? moment(strDate + " 00:00:00 +0000", dateFormat + " HH:mm:ss Z").valueOf() : null;
    let epochEndingDate   = (moment(strDate + " 23:59:59 +0000", dateFormat + " HH:mm:ss Z").isValid()) ? moment(strDate + " 23:59:59 +0000", dateFormat + " HH:mm:ss Z").valueOf() : null;

    return [
      (epochStartingDate!==null)?(epochStartingDate / 1000):null,
      (epochEndingDate  !==null)?(epochEndingDate / 1000):null
    ]
  },

  getDateFormat: () => {
    return dateFormat
  },


  // metodo para exportar los datos...
  exportData(data) {
    try{
      // const data1 = [{Sucursal:1,Ventas:10},{Sucursal:2,Ventas:20}];
      let data1 = []
      data.map( (item, index) => data1.push(item) )
      const opts = [
        {
          sheetid:'Data',
          header:true
        }
      ];
      alasql('SELECT * INTO XLSX("export.xlsx",?) FROM ?', [opts,[data1]]);
    }catch(err) {
      alert(err)
      console.log(err)
    }
  },


// obtiene los parametros desde SESSION-STORAGE para hacer las peticiones a la API
  getSessionParams() {
    const params = sessionStorage.getItem('reportsConfig')
    if (params === null){
      return undefined
   }else{
      session = JSON.parse(params)
      return session
   }
  },

  initializeParams() {
    session.APIKEY = 'bd_lcaesarsvzaita'
    session.API    = 'https://api.invupos.com/invuApiPos/index.php?r='
    session.NOMBREF= 'Little Caesars'

    sessionStorage.setItem('reportsConfig', JSON.stringify(session)
    )
  },
}




export const api =
{
  getItemsSummary(jsonDates, apiKey) {
    // const fullPath = session.APIKEY + 'citas/TotalesItemsVendidosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const fullPath = session.API + 'citas/TotalesItemsVendidosHoras/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': session.APIKEY } }) //.then((data)=>{return data}).catch((error)=>{return error})
    return response
  },

  getDaySummary(fechas, apiKey) {
    // const response = fetch( session.APIKEY + 'citas/ItemsVendidosFechas/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    const response = fetch( session.API + 'citas/TotalesItemsVendidosHoras/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    // const response = fetch( session.APIKEY + 'citas/TotalesItemsVendidosFechas/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    { headers: { 'APIKEY': session.APIKEY } })
    return response
  },

  getItems(jsonDates, apiKey) {
    const fullPath = session.API + 'citas/ItemsVendidosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': session.APIKEY } })
    return response
  },

  getPayments(jsonDates, apiKey) {
    const fullPath = session.API + 'citas/TotalesPagosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': session.APIKEY } })
    return response
  },

  getHoursSummary(jsonDates, apiKey) {
    const fullPath = session.API + 'citas/TotalesItemsVendidosHoras/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': session.APIKEY } }) //.then((data)=>{return data}).catch((error)=>{return error})
    return response
  },

  getDiscounts(jsonDates, apiKey) {
    const fullPath = session.API + 'citas/Descuentos/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': session.APIKEY } })
    return response
  },

  setEndPoint(uri) {
    session.API = uri
  },

}





// var utils =
// {
//   generateRGBA() {
//     const color1 = Math.trunc( Math.random() * (255 - 0) + 0 )
//     const color2 = Math.trunc( Math.random() * (255 - 0) + 0 )
//     const color3 = Math.trunc( Math.random() * (255 - 0) + 0 )

//     return [color1, color2, color3]
//   },

//   getDateFormat() {
//     return dateFormat
//   },

// // DEVUELVE ARRAY CON LAS FECHAS DE INICIO Y FIN EN FORMATO EPOCH(UNIX)
//   getEpochDate(date) {
//     let epochStartingDate = moment(date + " 00:00:00 +0000", dateFormat + " HH:mm:ss Z").valueOf();
//     let epochEndingDate   = moment(date + " 23:59:59 +0000", dateFormat + " HH:mm:ss Z").valueOf();
//     return [
//       (epochStartingDate / 1000),
//       (epochEndingDate / 1000)
//     ]
//   },

// // obtiene los parametros desde SESSION-STORAGE para hacer las peticiones a la API
//   getSessionParams() {
//     const params = sessionStorage.getItem('json')
//     return JSON.parse(params)
//     // return params
//   },

//   initializeParams() {
//     sessionStorage.setItem('json', JSON.stringify({
//         APIKEY:'bd_lcaesarscentral',
//         API: 'https://api.invupos.com/invuApiPos/index.php?r=',
//         NOMBREF: 'Little Caesars'
//       })
//     )
//   },

//   formatNumber(value) {
//     return value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
//   },



//   // metodo para exportar los datos estadisticos de las graficas...
//     exportData(data) {
//       try{
//         // const data1 = [{Sucursal:1,Ventas:10},{Sucursal:2,Ventas:20}];
//         let data1 = []
//         data.map( (item, index) => data1.push(item) )
//         const opts = [
//           {
//             sheetid:'Data',
//             header:true
//           }
//         ];
//         alasql('SELECT * INTO XLSX("summary.xlsx",?) FROM ?', [opts,[data1]]);
//       }catch(err) {
//         alert(err)
//         console.log(err)
//       }
//     },
// }

// export default utils
