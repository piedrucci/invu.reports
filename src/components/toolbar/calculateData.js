import _ from 'lodash'

export const ProcessSales = (groupName, data) => {

  // agrupar por el campo seleccionado (groupName)
  let grouped = _.groupBy(data, (row)=> {
    return row.item[groupName]
  })
  // console.log(grouped)

  const arrayItems = _.map( grouped, (row) => {
    let rowInfo = null
    if ( groupName === 'nombre' ) { rowInfo = row[0] }
    if ( groupName === 'nombrecat' ) { rowInfo = row[0] }

    // console.log(rowInfo)

    let totalMods = 0
    // calcular el total en modificadores para el item actual
    if ( groupName === 'nombre' ){
      totalMods = rowInfo.item.modif.reduce( (total, mod) => {
        return parseFloat(total) + parseFloat(mod.total)
      },0.0 )
    }

    totalMods = ( totalMods!==0 ) ? (parseFloat(rowInfo.item.total_vendido)+parseFloat(totalMods)).toFixed(2) : parseFloat(rowInfo.item.total_vendido).toFixed(2)

    const discount =  parseFloat( (rowInfo.item.descuento).toFixed(2) )
    const net = parseFloat( parseFloat(totalMods) - discount )

    let itemInfo = {
      item:rowInfo.item.nombre,
      category:rowInfo.item.nombrecat,
      quantityItems: parseInt(rowInfo.item.cantidad_vendida, 10),
      quantityOrders: parseInt(rowInfo.item.cantidad_ordenes, 10),
      gross: parseFloat(totalMods),
      discount: discount,
      net: net,
      orderTax: parseFloat( (rowInfo.item.tax).toFixed(2) )
    }

    // agrupar por categoria
    if ( row.length>1 ) {
      itemInfo.item = "------"
      row.map( (item, index) => {
        if (index>0){
          itemInfo.quantityItems = parseInt(itemInfo.quantityItems, 10) + parseInt(item.item.cantidad_vendida, 10)
          itemInfo.quantityOrders = parseInt(itemInfo.quantityOrders, 10) + parseInt(item.item.cantidad_ordenes, 10)

          const itemGross = ( parseFloat(itemInfo.gross) + parseFloat(item.item.total_vendido) ).toFixed(2)
          itemInfo.gross = parseFloat(itemGross)

          itemInfo.discount = parseFloat( itemInfo.discount ) + parseFloat( parseFloat(item.item.descuento).toFixed(2) )

          const itemNet = ( parseFloat(itemInfo.net) + parseFloat( (parseFloat(item.item.total_vendido) - parseFloat(item.item.descuento)).toFixed(2) ) ).toFixed(2)
          itemInfo.net = parseFloat( itemNet )
          itemInfo.orderTax = parseFloat(itemInfo.orderTax) + parseFloat( (item.item.tax).toFixed(2) )
        }
      } )
    }

    return itemInfo

  } )

  return arrayItems
}



export const ProcessDaySummary = (groupName, data) => {
  let arrData =  data.map( (item, index) => {
    // calcular el total en modificadores para el item actual
    let totalMods =  item.item.modif.reduce( (total, mod) => {
      // console.log(`tiene modificador... `)
      // console.log(mod)
      return parseFloat(total) + parseFloat(mod.total)
    },0.0 ) || 0

    totalMods = ( totalMods!==0 ) ? parseFloat(item.item.total_vendido)+parseFloat(totalMods) : parseFloat(item.item.total_vendido)

    const rowInfo = {
      item:item.item.nombre,
      quantityItems:parseInt(item.item.cantidad_vendida, 10),
      price: parseFloat((totalMods).toFixed(2))
    }

    return rowInfo
  } )

  return arrData
}
