import _ from 'lodash'

export const ProcessSales = (groupName, data) => {
  // agrupar por el campo seleccionado (groupName)
  let grouped = _.groupBy(data, (row)=> {
    return row.item[groupName]
  })

  const arrayItems = _.map( grouped, (row) => {
    let rowInfo = row[0]

    let itemInfo = {
      item: (groupName==='nombre') ? rowInfo.item.nombre : '' ,
      category:rowInfo.item.nombrecat,
      quantityItems: 0,
      quantityOrders: 0,
      gross: 0,
      itemDisc: 0,
      orderDisc: 0,
      net: 0,
      orderTax: 0,
      hour: rowInfo.item.hora
    }

    if (groupName==='nombrecat') delete itemInfo.item
    if (groupName==='hora') delete itemInfo.category
    // if ( itemInfo.item==='' ) {delete itemInfo.item}

    row.map( (item, index) => {

      let totalMods = 0

      item.item.modif.forEach(function(mod, indice, array) {
        totalMods+= ( mod.hora === item.item.hora ) ? parseFloat(mod.total) : 0
      })
      /*totalMods = item.item.modif.reduce( (total, mod) => {
        if(mod.hora === item.item.hora){
          //console.log(`${mod.hora} === ${item.item.hora}`);

        }
        const totalMod = ( mod.hora === item.item.hora ) ? parseFloat(total) + parseFloat(mod.total) : 0
        return totalMod
      },0.0 )*/
      // console.log(totalMods);

      itemInfo.quantityItems = parseInt(itemInfo.quantityItems, 10) + parseInt(item.item.cantidad_vendida, 10)
      itemInfo.quantityOrders = parseInt(itemInfo.quantityOrders, 10) + parseInt(item.item.cantidad_ordenes, 10)
      const grossRow =  parseFloat(item.item.total_vendido) + totalMods
      itemInfo.gross =  parseFloat( ( parseFloat(itemInfo.gross) + grossRow).toFixed(2) )

      const itmDisc = (parseFloat( itemInfo.itemDisc ) + parseFloat( item.item.descuento )).toFixed(2)
      const ordDisc = (parseFloat( itemInfo.orderDisc ) + parseFloat( item.item.descuentoOrden )).toFixed(2)
      itemInfo.itemDisc = parseFloat(itmDisc)
      itemInfo.orderDisc = parseFloat(ordDisc)

      const itemNet = ( parseFloat(itemInfo.net) + ( grossRow - (parseFloat(item.item.descuento)+parseFloat(item.item.descuentoOrden)) ) ).toFixed(2)
      itemInfo.net = parseFloat( itemNet )
      itemInfo.orderTax = parseFloat(itemInfo.orderTax) + parseFloat( (item.item.tax).toFixed(2) )

      return null

    } )

    return itemInfo

  } )

  return arrayItems
}






export const ProcessHours = (groupName, data) => {
  // console.log(data);

  // agrupar por el campo seleccionado (groupName)
  let grouped = _.groupBy(data, (row)=> {
    return row.item[groupName]
  })

  const arrayItems = _.map( grouped, (row) => {
    let rowInfo = row[0]
    // console.log(rowInfo)

    let totalMods = 0
    // calcular el total en modificadores para el item actual
    // if ( groupName === 'nombre' ){
      totalMods = rowInfo.item.modif.reduce( (total, mod) => {
        return parseFloat(total) + parseFloat(mod.total)
      },0.0 )
    // }

    totalMods = ( totalMods!==0 ) ? (parseFloat(rowInfo.item.total_vendido)+parseFloat(totalMods)).toFixed(2) : (rowInfo.item.total_vendido).toFixed(2)

    const itemDiscount =  (rowInfo.item.descuento).toFixed(2)
    const orderDiscount =  (rowInfo.item.descuentoOrden).toFixed(2)
    const net = ( parseFloat(totalMods) - (itemDiscount+orderDiscount) ).toFixed(2)

    let itemInfo = {
      hour:rowInfo.item.hora,
      quantityItems: parseInt(rowInfo.item.cantidad_vendida, 10),
      quantityOrders: parseInt(rowInfo.item.cantidad_ordenes, 10),
      gross: parseFloat(totalMods),
      itemDisc: parseFloat(itemDiscount),
      orderDisc: parseFloat(orderDiscount),
      net: parseFloat(net),
      orderTax: parseFloat( (rowInfo.item.tax).toFixed(2) )
    }

    // agrupar por categoria
    if ( row.length>1 ) {
      row.map( (item, index) => {

        if (index>0){
          if (item.item.modif.length>0) console.log()
          totalMods = 0
          totalMods = item.item.modif.reduce( (total, mod) => {
            return parseFloat(total) + parseFloat(mod.total)
          },0.0 )

          itemInfo.quantityItems = parseInt(itemInfo.quantityItems, 10) + parseInt(item.item.cantidad_vendida, 10)
          itemInfo.quantityOrders = parseInt(itemInfo.quantityOrders, 10) + parseInt(item.item.cantidad_ordenes, 10)

          const itemGross = ( parseFloat(itemInfo.gross) + parseFloat(item.item.total_vendido) ).toFixed(2)
          itemInfo.gross = parseFloat(itemGross) + totalMods

          itemInfo.itemDisc = parseFloat( itemInfo.itemDisc ) + parseFloat( (item.item.descuento).toFixed(2) )
          itemInfo.orderDisc = parseFloat( itemInfo.orderDisc ) + parseFloat( (item.item.descuentoOrden).toFixed(2) )

          const itemNet = ( parseFloat(itemInfo.net) + 
            parseFloat( (parseFloat(item.item.total_vendido) - (parseFloat(item.item.descuento)+parseFloat(item.item.descuentoOrden)) ).toFixed(2) ) ).toFixed(2)
          itemInfo.net = parseFloat( itemNet )
          itemInfo.orderTax = parseFloat(itemInfo.orderTax) + parseFloat( (item.item.tax).toFixed(2) )

        }

        return null

      } )
    }

    return itemInfo

  } )

  return arrayItems
}



export const ProcessDaySummary = (groupName, data) => {
  // agrupar por el campo seleccionado (groupName)
  let grouped = _.groupBy(data, (row)=> {
    return row.item[groupName]
  })

  // let arrData =  data.map( (item, index) => {
  let arrData =  _.map( grouped, (item) => {
    let rowInfo = {
      item: '',
      quantityItems:0,
      discount: 0,
      price: 0
    }

    item.map( (elem, index) => {
      const modifiers = elem.item.modif

      // calcular el total en modificadores para el item actual
      let totalMods = 0
      if (modifiers.length>0){
        console.log(elem.item.modif);
        // let ss = 1
        totalMods = elem.item.modif.reduce( (total, mod) => {
          // console.log(`vuelta #${ss}, total:${total}`);
          // ss += 1
          const totalMod = ( mod.hora === elem.item.hora ) ? parseFloat(total) + parseFloat(mod.total) : 0
          return totalMod
        },0.0 )
      }

      // if ( totalMods !==0 ) {
      //   console.log(totalMods)
      // }
      // const finalPrice = ( totalMods!==0 ) ? parseFloat(elem.item.total_vendido)+parseFloat(totalMods) : parseFloat(elem.item.total_vendido)
      const grossRow =  parseFloat(elem.item.total_vendido) + totalMods
      rowInfo.price =  parseFloat( ( parseFloat(rowInfo.price) + grossRow) )

      rowInfo.quantityItems += parseInt(elem.item.cantidad_ordenes, 10)
      rowInfo.discount += parseFloat(elem.item.descuento)
      // rowInfo.price += parseFloat(finalPrice)

      return null

    } )


    return rowInfo

  } )

  return arrData

}
