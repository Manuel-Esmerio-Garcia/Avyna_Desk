/********************************************************************/
/***   Nombre Archivo: LoginPacking.js   		                  ***/
/***   Autor: Manuel Esmerio Garcia					      	      ***/
/***   Fecha Inicio: 11/11/2019         					      ***/
/***   Proyecto: Avyna_Desk             		                  ***/
/********************************************************************/

Vue.use(Toasted)

const dealer = new Vue({
    el: '#login',
    name : 'LoginPacking',
    data:function (){
        return this._initialState();
    },
    components:{
        loading:VueLoading,
        datetime:vuejsDatepicker
    },
    computed:{
    },
    methods: {
        /********************************************************************/
        /***   Función: _login() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 07/02/2020    					                  ***/
        /***   Descripción: Login Packing                    		      ***/
        /********************************************************************/
        _login(){
            console.log("Testing");
            let scoped = this;
            if (scoped.username != "") {
                if (scoped.password != "") {
                    let request = {
                        method : 'POST',
                        url : `${Vue.config.access.IntegrattoAccess.server}/Controller_LoginPacking/signIn`,
                        data:{
                            username: scoped.username,
                            pass : scoped.password
                        }
                    }
        
                    scoped.active = true;

                    axios(request)
                    .then(function (response) {
                        console.log(response.data);
                        switch(parseInt(response.status)){
                            case 200:
                                switch(response.data){
                                    case 1:
                                        Vue.toasted.success('Usuario y Contraseña Correctos', {duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                        console.log("Replace");
                                        window.location.replace( `${Vue.config.access.IntegrattoAccess.server}/Controller_index/indexPacking`);
                                    break;
            
                                    case 2:
                                        Vue.toasted.error('Usuario y/o contraseña incorrectos. \n Código(#0002)',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                    break;
            
                                    case 3:
                                        Vue.toasted.show('No se pudo procesar la solicitud. Por favor intente nuevamente. \n Código(#0003)', {duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                    break;
            
                                    case 4:
                                        Vue.toasted.show('Las credenciales se encuentran como inactivas. \n Código(#0004)', {duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                    break;
            
                                    case 5:
                                        Vue.toasted.show('La sucursal a la cual esta asignado el usuario se encuentra como inactiva. \n Código(#0005)', {duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                                        scoped.active = false;
                                    break;
            
                                    default:
                                        Vue.toasted.show('Ocurrio un error inesperado. Por favor intente nuevamente. \n Código(#0006)', {duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
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
                }else{
                    Vue.toasted.show('El campo contraseña no puede estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
                }
            }else{
                Vue.toasted.show('El campo usuario no puede estar vacio.',{duration:3000,keepOnHover:true,theme:'bubble',position:'bottom-right'});
            }
        },
        /********************************************************************/
        /***   Función: _init() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Obtener Información de la Empresa 		      ***/
        /********************************************************************/
        _initial(){
        },
        /********************************************************************/
        /***   Función: _clean() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Limpiar Objeto Vue              		      ***/
        /********************************************************************/
        _clean(){
            let scoped = this;
            scoped._reset();
        },
        /********************************************************************/
        /***   Función: _reset() 	                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Inicializa Nuevamente las Variables		      ***/
        /********************************************************************/
        _reset () {
            let scoped = this
            Object.assign(scoped.$data, scoped._initialState());
        },
        /********************************************************************/
        /***   Función: _initialState()                				      ***/
        /***   Autor: Manuel Esmerio Gacria					      	      ***/
        /***   Fecha: 11/11/2019    					                  ***/
        /***   Descripción: Declaración de Variables        		      ***/
        /********************************************************************/
        _initialState (){
            return {
                active:false,
                username:'',
                password:'',
            }
        }
    }
});