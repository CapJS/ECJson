/**%%banner-large%%*/
+function($){
	'use strict'

	var ecjson//Se declara la variable

	ecjson = function(url) {
		this.url = url||ecjson.url
		this.method = "get"
		var memory = {// compone todas las memorias del objeto
			data:{},
			deals: [], // almacena todas las funciones anonimas asignadas al objeto
		}
		this.on = function(deal, handler){
			memory.deals.push({
				deal: deal,
				handler: handler
			})
		}
		this.call = function(data, handler){
			var preData = memory.data
			for (var key in data) {
				preData[key] = data[key]
			}
			data = preData
			$.ajax({
				url: this.url,
				dataType: 'json',
				type: this.method.toUpperCase(),
				data: data,
				success: function(data){

					var countHandlerAcives = 0

					memory.deals.forEach(function(deal){
						var statusToLoad = true
						var conditions = deal.deal.replace(' ','').split(',')

						for (
							var i = 0 ;
							i < conditions.length ;
							i++
						) {
							try {
								if (!eval('(data.'+conditions[i]+' !== undefined)')) statusToLoad = false
							} catch (ex) {
								statusToLoad = false
							}
						}

						if (statusToLoad) {
							deal.handler(data)
							countHandlerAcives++
						}
					})

					if (handler !== undefined) handler({
						actives: countHandlerAcives
					})

				}
			})
		}
	}

	ecjson.url = ""

	ecjson.version = 'dev'

	window.ecjson = ecjson

	// var test = new ecjson("test/request.json")
	// test.on('simple',function(data){
	// 	console.log("El mensaje es : "+data.simple)
	// })

	// test.call()
	// console.log(test)

	

	// var __mJson = {}
	// __mJson.memory = {}
	// __mJson.memory.deals = []

	// window.mJson = {
	// 	/**
	// 	 * Contiene un string con la url a la cual se realizaran las consultas
	// 	 * json
	// 	 * 
	// 	 * @type {String}
	// 	 */
	// 	url: '',
	// 	/**
	// 	 * Contiene un Objeto Plano con todas las variables que se enviaran al
	// 	 * servidor al momento de cargar la consulta json
	// 	 * 
	// 	 * @type {Object}
	// 	 */
	// 	data: {},
	// 	/**
	// 	 * Define el método con el cual se realizara la consulta json
	// 	 *
	// 	 * default 'get'
	// 	 * 
	// 	 * @type {String}
	// 	 */
	// 	method: 'get',
	// 	/**
	// 	 * Captura en procedimiento 'handler' para que sea ejecutado en caso de
	// 	 * que se el 'deal' coincida con la respuesta 'json' obtenida.
	// 	 *
	// 	 * EXAMPLE
	// 	 *
	// 	 * mJson.on('token.access',function(data){
	// 	 *   console.log("The Toekn is : " + data.token.access)
	// 	 * })
	// 	 * 
	// 	 * @param  {string}   deal    Servirá como ruta para la variable que
	// 	 *                            posea la respuesta json.
	// 	 * @param  {function} handler Ejecutara este evento en cuanto se cumpla
	// 	 *                            la condición predefinida en la variable
	// 	 *                            deal
	// 	 */
	// 	on: function (deal, handler) {
	// 		__mJson.memory.deals.push({
	// 			deal: deal,
	// 			handler: handler
	// 		})
	// 	},
	// 	*
	// 	 * Realiza la llamada la servidor, procesa la data combinando la con la
	// 	 * data del mJson previamente creada.
	// 	 * 
	// 	 * @param  {PlainObject} data     Contiene la data que sera enviada en
	// 	 *                                conjunto con la consulta al servidor
	// 	 * @param  {function}    handler  Ejecutara esta función al finalizar
	// 	 *                                la comprovacion de todos los deal
	// 	 *                                asociados
		 
	// 	call: function (data,handler) {

	// 		var preData = mJson.data
	// 		for (var key in data) {
	// 			preData[key] = data[key]
	// 		}

	// 		data = preData

	// 		$.ajax({
	// 			url: window.mJson.url,
	// 			dataType: 'json',
	// 			type: window.mJson.method.toUpperCase(),
	// 			data: data,
	// 			success: function(data){

	// 				var countHandlerAcives = 0

	// 				__mJson.memory.deals.forEach(function(deal){
	// 					var statusToLoad = true
	// 					var conditions = deal.deal.replace(' ','').split(',')

	// 					for (var i = 0 i < conditions.length i++) {
	// 						try {
	// 							if (!eval('(data.'+conditions[i]+' !== undefined)')) statusToLoad = false
	// 						} catch (ex) {
	// 							statusToLoad = false
	// 						}
	// 					}


	// 					if (statusToLoad) {
	// 						deal.handler(data)
	// 						countHandlerAcives++
	// 					}
	// 				})

	// 				if (handler !== undefined) handler({
	// 					actives: countHandlerAcives
	// 				})

	// 			}
	// 		})

	// 	}
	// }

}(jQuery)
