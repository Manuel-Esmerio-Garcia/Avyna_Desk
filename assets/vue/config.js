let server = window.location.protocol+"//"+window.location.host+'/Avyna_Desk/index.php';
Vue.config.access = {
    URLComponents : window.location.protocol+"//"+window.location.host + '/Avyna_Desk/assets/vue/components/',
    IntegrattoAccess: {
        server: server,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            token: '',
            reference: '',
        }
    }
}

Vue.config.productionTip = false
Vue.config.devtools = true