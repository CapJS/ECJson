/**%%banner-large%%*/
+function(){
	'use strict'

	var ecjson // Se declara la variable
	var $

	ecjson = function(options) {
		if (!options) options = {}
		this.url = options.url || ecjson.url
		this.method = options.method || ecjson.method
		var memory = {
			data: {}, 
			deals: [],
		}
		/**
		 * Esta funcion permite agregar las interacciones que manejara el objeto
		 * 
		 * @param  string   deal    Compone la ruta del objeto a buscar.
		 * @param  function handler Este es una función anónima que se ejecutara si la ruta es encontrada.
		 * @return object           Retornara el mismo objeto ECJson
		 */
		this.on = function(deal, handler){
			memory.deals.push({
				deal: deal,
				handler: handler
			})
			return this
		}
		/**
		 * Este método realiza una llamada al documento json y disparara todos las funciones que coincidan con la respuesta.
		 * 
		 * @param  object   data    Esta memoria sera enviada como parte de la consulta al documento json
		 * @param  function handler Esta funcion sera ejecutada al terminar de cargar la consulta
		 * @return object			retornara el mismo objeto ECJson
		 */
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

					// Contador de coincidencias con las interacciones
					var countHandlerAcives = 0

					// Recorre toda la memoria de interacciones almacenadas 
					for (var deal in memory.deals) {
						deal = memory.deals[deal] 

						var statusToLoad = false
						var conditions = deal.deal // Captura todas las coincidencias a buscar

						if (typeof conditions == "string") conditions = [conditions]

						for (var condition in conditions) {
							condition = conditions[condition]
							try {
								if (eval('(data.'+condition+' !== undefined)'))
									statusToLoad = true
							} catch (e) {}
						}

						if (statusToLoad) {
							deal.handler(data)
							countHandlerAcives++
						}
					
					}

					if (handler !== undefined) handler ({
						actives: countHandlerAcives
					})

				}
			})

			return this
		}
	}

	ecjson.url = ""
	ecjson.method = "get"
	ecjson.version = 'dev'

	window.ecjson = ecjson
	
	if ( typeof define === "function" && define.amd) {
		define( "ecjson", [], function() {
			if ( typeof jQuery === "function" && jQuery.fn.jquery) {
				$ = jQuery
			}
			return ecjson
		})
	}

}()
