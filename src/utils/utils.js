import moment from 'moment'
const alasql = window.alasql
let dateFormat = "MM-DD-YYYY"
let endPoint = "https://api.invupos.com/invuApiPos/index.php?r="

// const testApiKey = "bd_yogenmultiplazapos"
const testApiKey = "bd_lcaesarsvzaita"

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
    return JSON.parse(params)
  },

  initializeParams() {
    sessionStorage.setItem('reportsConfig', JSON.stringify({
        APIKEY : testApiKey,
        API    : 'https://api.invupos.com/invuApiPos/index.php?r=',
        NOMBREF: 'Little Caesars'
      })
    )
  },
}




export const api =
{
  getItemsSummary(jsonDates, apiKey) {
    // const fullPath = endPoint + 'citas/TotalesItemsVendidosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const fullPath = endPoint + 'citas/TotalesItemsVendidosHoras/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': testApiKey } }) //.then((data)=>{return data}).catch((error)=>{return error})
    return response
  },

  getDaySummary(fechas, apiKey) {
    // const response = fetch( endPoint + 'citas/ItemsVendidosFechas/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    const response = fetch( endPoint + 'citas/TotalesItemsVendidosHoras/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    // const response = fetch( endPoint + 'citas/TotalesItemsVendidosFechas/fini/' + fechas.startingDate + '/ffin/' + fechas.endingDate,
    { headers: { 'APIKEY': testApiKey } })
    return response
  },

  getItems(jsonDates, apiKey) {
    const fullPath = endPoint + 'citas/ItemsVendidosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': testApiKey } })
    return response
  },

  getPayments(jsonDates, apiKey) {
    const fullPath = endPoint + 'citas/TotalesPagosFechas/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': testApiKey } })
    return response
  },

  getHoursSummary(jsonDates, apiKey) {
    const fullPath = endPoint + 'citas/TotalesItemsVendidosHoras/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': testApiKey } }) //.then((data)=>{return data}).catch((error)=>{return error})
    return response
  },

  getDiscounts(jsonDates, apiKey) {
    const fullPath = endPoint + 'citas/Descuentos/fini/' + jsonDates.startingDate + '/ffin/' + jsonDates.endingDate
    const response = fetch( fullPath, { headers: { 'APIKEY': testApiKey } })
    return response
  },

  setEndPoint(uri) {
    endPoint = uri
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
