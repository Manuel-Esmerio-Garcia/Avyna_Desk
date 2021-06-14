/********************************************************************/
/***   Nombre Archivo: Invoicing.js      					      ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 01/11/2019         					      ***/
/***   Proyecto: Avyna_Desk 					                  ***/
/********************************************************************/

Vue.use(Toasted)
const invoicing = new Vue({
    el: '#invoice',
    name : 'Facturación',
    data: function (){
        return this._initialState();
    },
    components:{
        loading : VueLoading,
    },
    computed:{
        // Función Computado que calcula el total de los importes //
        CalcularTotal(){
            if (this.objDetails != null) {
                let total = 0;
                for (detalle of this.objDetails) {
                    if (detalle.Importe != "") {
                        total += parseFloat(detalle.Importe);
                    }
                    else{
                        total += 0;
                    }
                }
                return parseFloat(total).toFixed(2);
            }else{
                return 0.00;
            }
        }
    },
    mounted(){
        let scoped = this
        // Inicializar Información //
        scoped.init();
        // Cargar DataTable _fetchGlobal //
        scoped._fetchGlobal("fetchSale",true,6,"","");
        scoped._fetchGlobal("fetchInvoice",true,6,"","",1);
        // Acción Click DataTable fetchInvoice //
        $("#fetchInvoice").on("click","tbody","tr",function(e){
            scoped.tableInvoice = e.target.parentNode;
            scoped.StatusSelect = e.target.parentNode.childNodes[6].childNodes[0].innerHTML;
        });
        // Acción Click DataTable fetchInvoice //
        $("#fetchSale").on("click","tbody","tr",function(e){
            scoped.tableSale = e.target.parentNode;
        });
        // Acción Click DataTable fetchInvoice //
        $("#fetchInvoiceDetails").on("click","tbody","tr",function(e){
            scoped.tableInvoiceDetails = e.target.parentNode;
            scoped.StatusSelect = e.target.parentNode.childNodes[9].childNodes[0].innerHTML;
        });
        // Sincronizar Fecha Modal Facturar Venta //
        setInterval(scoped._updateDate,1000);
        // Inicializar el ToolTip //
        $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
        validateUMT(item, fraccion){
            let scoped = this;

            let request = {
                method : 'POST',
                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/searchUMT`,
                data : {
                    fraccion:fraccion
                }
            }
            scoped.active = true;
            axios(request)
            .then(function (response) {
                console.log(response.data);
                if (response.data.length > 0) {
                    let { UMT } = response.data[0];
                    item.UMT = UMT;
                }else{
                    Vue.toasted.error('La fracción arancelaria capturada, no esta registrada en el catalogo del SAT.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            })
            .catch(function (error) {
                console.log(error);
                item.fraccion = "";
                Vue.toasted.error('Problema al conectarse con la base de datos, comprueba tu conexión a internet y prueba otra vez.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                scoped.active = false;
            })
            .finally(function () {
                scoped.active = false;
            });
        },
        /********************************************************************/
        /***   Función: _btnCancelarFactura() 	           				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Acción Cancelar Facturar Venta de Ingreso     ***/
        /********************************************************************/
        _btnCancelarFactura(){
            let scoped = this;
            if (scoped.tableInvoice != null) {
                console.log(scoped.tableInvoice.childNodes[6].childNodes[0].innerHTML);
                if (scoped.tableInvoice.childNodes[6].childNodes[0].innerHTML != "Cancelado") {
                    swal({
                        title: "¡Importante!",
                        text: "¿Esta segúro que desea cancelar la factura con el N° "+scoped.tableInvoice.childNodes[0].innerHTML+"?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            let request = {
                                method : 'POST',
                                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/btnCancelarFactura`,
                                data : {
                                    idFactura:scoped.tableInvoice.childNodes[0].innerHTML,
                                    Company:scoped.objCompany
                                }
                            }
                            scoped.active = true;
                            axios(request)
                            .then(function (response) {
                                console.log(response.data);
                                switch(parseInt(response.status)){
                                    case 200:
                                        switch(parseInt(response.data)){
                                            case 0:
                                                Vue.toasted.error('Ocurrió un error al cancelar la factura, por favor intente de nuevo',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped.active = false;
                                            break;
                        
                                            case 1:
                                                Vue.toasted.success('Factura cancelada con éxito.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped._clean();
                                            break;
            
                                            case 2:
                                                Vue.toasted.error('Ocurrió un error al cancelar la factura.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped.active = false;
                                            break;
                        
                                            default:
                                                Vue.toasted.error('Ocurrió un error inesperado. Por favor intente nuevamente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                scoped.active = false;
                                            break;
                                        }
                                    break;
                                    case 401:
                                        Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                    case 500:
                                        Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                    break;
                                }
                            })
                            .catch(function (error) {
                                scoped.active = false;
                            })
                            .finally(function () {
                                scoped.active = false;
                            });
                        }
                    });
                }else{
                    Vue.toasted.show('El comprobante fiscal que desea cancelar ya se encuentra cancelado.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('Seleccione una factura.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _btnFacturar() 	           				          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Acción Facturar Venta de Ingreso              ***/
        /********************************************************************/
        _btnFacturar(){
            let scoped = this;
            if (scoped.objClient.RFC != "") {
                if (scoped.objCompany.CP != "") {
                    if (scoped.invoice.typeChange != '') {
                        if (scoped.objDetails != null) {

                            let contador = 0;

                            // scoped.objDetails.forEach(element => {
                            //     if (element.Fraccion == "" || element.Fraccion == null) {
                            //         contador ++;
                            //     }
                            // });

                            if (contador == 0) {
                                scoped.objCurrency.forEach(element => {
                                    if (element.ClaveSAT == scoped.invoice.currency) {
                                        scoped.objCurrencySelect = element;
                                    }
                                });
            
                                scoped.objListRalete = [];
            
                                scoped.objCFDiRelate.forEach(element => {
                                    if (element.Relate == true) {
                                        scoped.objListRalete.push(element);
                                    }
                                });
            
                                if (scoped.objListRalete == null) {
                                    scoped.objListRalete = [];
                                }
            
                                swal({
                                    title: "¡Importante!",
                                    text: "¿Esta segúro que desea facturar la venta con el N° "+scoped.objSale.ID+"?",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        let request = {
                                            method : 'POST',
                                            url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/btnFacturar`,
                                            data : {
                                                idVenta:scoped.objSale.ID,
                                                Client:scoped.objClient,
                                                Company:scoped.objCompany,
                                                Sale: scoped.objSale,
                                                Details: scoped.objDetails,
                                                Relate: scoped.objListRalete,
                                                Invoice: scoped.invoice,
                                                Currency: scoped.objCurrencySelect
                                            }
                                        }
                                        scoped.activeModal = true;
                                        axios(request)
                                        .then(function (response) {
                                            console.log(response.data);
                                            switch(parseInt(response.status)){
                                                case 200:
                                                    switch(parseInt(response.data)){
                                                        case 0:
                                                            Vue.toasted.error('Ocurrio un error al generar la factura, por favor intente de nuevo',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                                    
                                                        case 1:
                                                            let idVenta = scoped.objSale.ID;
                                                            Vue.toasted.success('Factura timbrada con exito.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped._clean();
                                                            window.open(window.location.protocol+"//"+window.location.host+'/Avyna_Desk/invoice/Formato_Facturacion_33.php?ID='+idVenta+'', '_blank');
                                                        break;
                        
                                                        case 2:
                                                            Vue.toasted.error('Ocurrio un error al timbrar la factura.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                        
                                                        case 3:
                                                            Vue.toasted.error('Ocurrio un error al generar el XML.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                        
                                                        case 4:
                                                            Vue.toasted.error('Ocurrio un error dentro del catch.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                        
                                                        case 5:
                                                            Vue.toasted.error('La factura ya se encuentra timbrada.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                                    
                                                        default:
                                                            Vue.toasted.error('Ocurrio un error inesperado. Por favor intente nuevamente.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                            scoped.activeModal = false;
                                                        break;
                                                    }
                                                break;
                                                case 401:
                                                    Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                break;
                                                case 500:
                                                    Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                                break;
                                            }
                                        })
                                        .catch(function (error) {
                                            scoped.activeModal = false;
                                        })
                                        .finally(function () {
                                            scoped.activeModal = false;
                                        });
                                    }
                                });
                            }
                            else{
                                Vue.toasted.show('Algún movimiento de la venta no tiene fraccion arancelaria.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            }
                        }
                        else{
                            Vue.toasted.show('La venta no tiene asignadas nunguna venta menudeo y/o la venta no se encuentra extraida.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        }
                    }
                    else{
                        Vue.toasted.show('Es necesario capturar un tipo de cambio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    }
                    
                }else{
                    Vue.toasted.show('El campo CP (Lugar de Expedición) no puede estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo rfc del cliente no puede estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _changeWayPay() 	           				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Acción Validación Forma de Pago               ***/
        /********************************************************************/
        _changeWayPay(){
            let scoped = this;
            if (scoped.invoice.wayToPay == "99") {
                scoped.invoice.methodOfPayment = "PPD";
            }else{
                scoped.invoice.methodOfPayment = "PUE";
            }
        },
        /********************************************************************/
        /***   Función: _changeMethodPayment() 	           				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Acción Validación Metodo de Pago              ***/
        /********************************************************************/
        _changeMethodPayment(){
            let scoped = this;
            if (scoped.invoice.methodOfPayment == "PPD") {
                scoped.invoice.wayToPay = "99";
            }else{
                scoped.invoice.wayToPay = "01";
            }
        },
        /********************************************************************/
        /***   Función: _changeRelateCFDi() 	           				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Acción Mostrar CFDi's Relacionados            ***/
        /********************************************************************/
        _changeRelateCFDi(){
            let scoped = this;
            if (scoped.invoice.relateCFDi) {
                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/changeRelateCFDi`,
                    data : {
                        idCliente:scoped.objClient.ID
                    }
                }
                scoped.active = true;
                axios(request)
                .then(function (response) {
                    console.log(response.data);
                    switch(parseInt(response.status)){
                        case 200:
                            scoped.invoice.validateType = true;
                            response.data.forEach(element => {
                                element.Relate = false;
                            });
                            scoped.objCFDiRelate = response.data;
                        break;
                        case 401:
                            Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                        case 500:
                            Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                        break;
                    }
                })
                .catch(function (error) {
                    scoped.active = false;
                })
                .finally(function () {
                    scoped.active = false;
                    scoped._fetch("tableRelateCFDi");
                    $(".CFDi").attr("checked", false);
                });
            }else{
                scoped.invoice.validateType = false;
                scoped.objCFDiRelate = [];
            }
        },
        /********************************************************************/
        /***   Función: _updateDate() 	           				          ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Actualizar Fecha Modal Facturar Venta         ***/
        /********************************************************************/
        _updateDate(){
            let scoped = this;
            let fecha = new Date();
            let mesok = new Array(12);
            mesok[0]="Enero";
            mesok[1]="Febrero";
            mesok[2]="Marzo";
            mesok[3]="Abril";
            mesok[4]="Mayo";
            mesok[5]="Junio";
            mesok[6]="Julio";
            mesok[7]="Agosto";
            mesok[8]="Septiembre";
            mesok[9]="Octubre";
            mesok[10]="Noviembre";
            mesok[11]="Diciembre";
            
            scoped.invoice.date =  fecha.getDate() + " de " + mesok[fecha.getMonth()] + " del " + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
        },
        /********************************************************************/
        /***   Función: _btnInvoiceSale() 	           				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Abrir Modal Facturar Venta  y Obtener         ***/
        /***   Información para mostrar en la modal de la factura         ***/                 
        /********************************************************************/
        _btnInvoiceSale(){
            let scoped = this;
            if (scoped.tableSale != null) {  
                
                $('#fetchInfoDetailVenta').DataTable().destroy();

                //if (scoped.tableSale.childNodes[6].childNodes[0].innerHTML == 'Extraida') {
                    let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/btnInvoiceSale`,
                        data : {
                            idVenta:scoped.tableSale.childNodes[0].innerHTML
                        }
                    }
                    scoped.active = true;
                    axios(request)
                    .then(function (response) {
                        switch(parseInt(response.status)){
                            case 200:

                                scoped.objClient      = response.data.Client[0];
                                scoped.objSale        = response.data.Sale[0];
                                scoped.objDetails     = [...response.data.DetailSale];
                                scoped.objCurrency    = response.data.Currency;
                                scoped.invoice.tittle = "Venta N° " + scoped.objSale.ID + " " + scoped.objClient.Nombre + " " + scoped.objClient.Apellidos;
                                $("#modalInvoice").modal("show");
                            break;
                            case 401:
                                Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                            case 500:
                                Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                            break;
                        }
                    })
                    .catch(function (error) {
                        scoped.active = false;
                    })
                    .finally(function () {
                        scoped.active = false;
                        scoped._fetch('fetchInfoDetailVenta');
                                                
                    });
                /*}else{
                    Vue.toasted.show('Para facturar una venta es necesario extraer la venta.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }*/
            }else{
                Vue.toasted.show('Seleccione la venta que desea facturar.',{duration:800,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _getDetailsInvoice() 	           				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Obtener Información Facturas By idVenta       ***/
        /********************************************************************/
        _getDetailsInvoice(idVenta){
            let scoped  = this;
            let request = {
                method : 'POST',
                url : `${Vue.config.access.IntegrattoAccess.server}/Controller_Factura_Exportacion/getDetailsInvoice`,
                data : {
                    idVenta:idVenta
                }
            }
            scoped.active = true;
            axios(request)
            .then(function (response) {
                let tbody  = document.getElementById("fetchInvoiceDetails").tBodies[0];
                $('#fetchInvoiceDetails').DataTable().destroy();
                document.getElementById("fetchInvoiceDetails").tBodies[0].innerHTML = "";

                if (response.data != null && response.data != ""){
                    for (var i = 0; i < response.data.length; i++){
                        let row  = tbody.insertRow(i);
                        let cel1 = row.insertCell(0);
                        let cel2 = row.insertCell(1);
                        let cel3 = row.insertCell(2);
                        let cel4 = row.insertCell(3);
                        let cel5 = row.insertCell(4);
                        let cel6 = row.insertCell(5);
                        let cel7 = row.insertCell(6);
                        let cel8 = row.insertCell(7);
                        let cel9 = row.insertCell(8);
                        let cel10 = row.insertCell(9);

                        cel1.innerHTML = response.data[i]['ID'];
                        cel2.innerHTML = response.data[i]['Fecha_timbrado'];
                        cel3.innerHTML = response.data[i]['Cliente'];
                        cel4.innerHTML = response.data[i]['RFC'];
                        cel5.innerHTML = response.data[i]['Folio'];
                        cel6.innerHTML = parseFloat(response.data[i]['Subtotal']).toFixed(2);
                        cel7.innerHTML = parseFloat(response.data[i]['Impuesto']).toFixed(2);
                        cel8.innerHTML = parseFloat(response.data[i]['Total']).toFixed(2);
                        cel9.innerHTML = response.data[i]['UUID'];

                        if (response.data[i]['Status'] == 'Cancelado') {
                            cel10.innerHTML = "<label class='badge badge-danger'>" + response.data[i]['Status'] + "</label>";
                        }else{
                            cel10.innerHTML = "<label class='badge badge-success'>" + response.data[i]['Status'] + "</label>";
                        }
                        
                    }
                    scoped._fetch("fetchInvoiceDetails");
                }
            })
            .catch(function (error) {
                scoped.active = false;
            })
            .finally(function () {
                scoped.active = false;
            });
        },
        /********************************************************************/
        /***   Función: _RecuperarXML() 	                			  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/01/2020    					                  ***/
        /***   Descripción: Descargar XML                   		      ***/
        /********************************************************************/
        _RecuperarXML(){
            let idFactura = this.tableInvoice.childNodes[0].innerHTML;
            window.open(window.location.protocol+"//"+window.location.host+'/Avyna_Desk/invoice/RecuperarXML.php?ID='+idFactura+'', '_blank');
        },
        /********************************************************************/
        /***   Función: _RecuperarPDF() 	                			  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/01/2020    					                  ***/
        /***   Descripción: Descargar PDF                   		      ***/
        /********************************************************************/
        _RecuperarPDF(){
            let idFactura = this.tableInvoice.childNodes[0].innerHTML;
            window.open(window.location.protocol+"//"+window.location.host+'/Avyna_Desk/invoice/Formato_Facturacion_33_CCE.php?ID='+idFactura+'', '_blank');
        },
        /********************************************************************/
        /***   Función: _RecuperarAcuse() 	                			  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 10/01/2020    					                  ***/
        /***   Descripción: Recuperar Acuse                   		      ***/
        /********************************************************************/
        _RecuperarAcuse(){
            let idFactura = this.tableInvoice.childNodes[0].innerHTML;
            window.open(window.location.protocol+"//"+window.location.host+'/Avyna_Desk/invoice/Acuse.php?ID='+idFactura+'', '_blank');
            //window.open(window.location.protocol+"//"+window.location.host+'/Avyna_Desk/invoice/Formato_Facturacion_33.php?ID='+idVenta+'', '_blank');
        },
        /********************************************************************/
        /***   Función: _fetchSale() 	                				  ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Server Global		      ***/
        /********************************************************************/
        _fetchGlobal(name,info,column,dateInicio,dateFin,type = 0){

            let target = [];
            let actions = {};

            if (type == 0) {
                actions = {
                    "targets":column,
                    'render': function (data, type, full, meta){
                        label =  "";
                        if (full[column] == 'Adeudo'){
                            label += "<label class='badge badge-warning'>"+full[column]+"</label>"
                        }else if (full[column] == 'Pagado') {
                            label += "<label class='badge badge-success'>"+full[column]+"</label>"
                        }else if (full[column] == 'Facturada') {
                            label += "<label class='badge badge-success'>"+full[column]+"</label>"
                        }else{
                            label += "<label class='badge badge-danger'>"+full[column]+"</label>"
                        }
                        return label                                
                    }
                }
            }else{
                actions = {
                    "targets":column,
                    'render': function (data, type, full, meta){
                        label =  "";
                        if (full[column] == 'Cancelado'){
                            label += "<label class='badge badge-danger'>"+full[column]+"</label>"
                        }else if (full[column] == 'Timbrado') {
                            label += "<label class='badge badge-success'>"+full[column]+"</label>"
                        }else{
                            label += "<label class='badge badge-danger'>"+full[column]+"</label>"
                        }
                        return label                                
                    }
                }
            }
            

            target.push(actions);

            $('#'+name).DataTable({
                "processing" : true,
                "serverSide" : true,
                "language":{
                    "lengthMenu":"Mostrar _MENU_ registros por página.",
                    "zeroRecords": "Lo sentimos. No se encontraron registros.",
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "No hay registros aún.",
                    "infoFiltered": "(filtrados de un total de _MAX_ registros)",
                    "search" : "Búsqueda",
                    "loadingRecords": "Cargando ...",
                    "processing": "Cargando registros...",
                    "searchPlaceholder": "Comience a teclear...",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente", 
                    }
                },
                "select": true,
                "bDestroy": true, 
                "columnDefs": target,
                "order" : [],
                "ajax" : {
                    url: window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Factura_Exportacion/'+name,
                    type: "POST",
                    data:{
                        info:info,
                        column:column,
                        dateInicio:dateInicio,
                        dateFin:dateFin
                    }
                }
            });
        },
        /********************************************************************/
        /***   Función: _fetch() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Cargar DataTable Side Client Global		      ***/
        /********************************************************************/
        _fetch(table) {
            $('#'+table).dataTable({
                "language":{
                    "lengthMenu":"Mostrar _MENU_ registros por página.",
                    "zeroRecords": "Lo sentimos. No se encontraron registros.",
                    "info": "Mostrando página _PAGE_ de _PAGES_",
                    "infoEmpty": "No hay registros aún.",
                    "infoFiltered": "(filtrados de un total de _MAX_ registros)",
                    "search" : "Búsqueda",
                    "loadingRecords": "Cargando ...",
                    "processing": "Cargando registros...",
                    "searchPlaceholder": "Comience a teclear...",
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Siguiente", 
                    }
                },
                "select": true,
                "bDestroy": true,
            });
        },

        /********************************************************************/
        /***   Función: init() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        init(){
            let scoped = this;
            scoped.active = true;
            let request = {
                method : 'POST',
                url : window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php/Controller_Factura_Exportacion/init',
            }            
            axios(request)
            .then(function (response) {
                switch(parseInt(response.status)){
                    case 200:
                        scoped.objCompany = response.data[0];
                    break;
                    case 401:
                        Vue.toasted.show('Server Error 401',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    break;
                    case 500:
                        Vue.toasted.error('Server Error 500',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                    break;
                }
            })
            .catch(function (error) {
                scoped.active = false;
            })
            .finally(function () {
                scoped.active = false;
            });
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 04/11/2019    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            $("#modalInvoice").modal("hide");

            // Limpiar Tabla fetchInvoiceDetails //
            $('#fetchSale').DataTable().destroy();
            $('#fetchInvoice').DataTable().destroy();

            scoped._reset();

            scoped.init();
            // Cargar DataTable _fetchGlobal //
            scoped._fetchGlobal("fetchSale",true,6,"","");
            scoped._fetchGlobal("fetchInvoice",true,6,"","",1);
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 01/11/2019    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                activeModal:false,
                contador: 0,
                objCompany:[],
                objSale:[],
                objClient:[],
                objDetails:[],
                objCFDiRelate:[],
                objListRalete:[],
                objCurrency:[],
                objCurrencySelect:[],
                tableInvoice:null,
                tableSale:null,
                StatusSelect:'',
                invoice:{
                    tittle:"",
                    date:"",
                    serie:"",
                    useCFDi:"P01",
                    wayToPay:"01",
                    methodOfPayment:"PUE",
                    paymentCondition:"",
                    currency:"USD",
                    voucher:"I",
                    observations:"",
                    typeOfRelationship:"04",
                    typeChange:'',
                    relateCFDi:false,
                    validateType:false
                },
                relate:{
                    CFDi:""
                }
            }
        },
    }
});
