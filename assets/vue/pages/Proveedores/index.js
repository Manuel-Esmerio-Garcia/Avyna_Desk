
Vue.use(Toasted)

const app = new Vue({
    el: '#app',
    data: {
        user:'',
        password:'',
        mensaje:'',
        show:false,
        color:'',
        active:false
    },
    components:{
        loading:VueLoading
    },
    methods: {
        // Acción Iniciar Sesión //
        singIn(){
            let scoped = this;

            if(this.user != "" && this.password != ""){

                let formData = new FormData();
                formData.append("User", this.user);
                formData.append("Password", this.password);

                let request = {
                    method : 'POST',
                    url : `${Vue.config.access.IntegrattoAccess.server}/loginController/singIn`,
                    data : formData
                }

                // Acción Loading //
                scoped.active = true;

                // Acción Axios SingIn //
                axios(request)
                .then(function (response) {

                    switch(parseInt(response.data)){
	            		case 1:
                            Vue.toasted.success('Usuario y Contraseña Correctos');
                            //toastr.success('Usuario y Contraseña Correctos','Bienvenido');
	            		break;

	            		case 2:
                            //toastr.warning('Las credenciales se encuentran como inactivas.', 'Advertencia');
                            Vue.toasted.info('Las credenciales se encuentran como inactivas.');
                            scoped.active = false;
	            		break;

	            		case 3:
                            //toastr.error('Usuario y/o contraseña incorrectos.', 'Error');
                            Vue.toasted.error('Usuario y/o contraseña incorrectos.');
                            scoped.active = false;
	            		break;

	            		default:
                            //toastr.error('Ocurrio un error inesperado. Por favor intente nuevamente. \n Código(#0006)', 'Error');
                            Vue.toasted.error('Ocurrio un error inesperado. Por favor intente nuevamente.');
                            scoped.active = false;
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
                Vue.toasted.info('El campo Usuario y/o Contraseña no pueden estar vacios.');
                //toastr.warning('El campo Usuario y/o Contraseña no pueden estar vacios', 'Advertencia');
            }
        }
    }
});
