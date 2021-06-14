<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Avyna Packing | Inicio de Sesión</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->  
  <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
<!--===============================================================================================-->  
  <link rel="icon" type="image/png" href="<?php echo base_url('assets/images/icons/favicon.ico');?>"/>
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/bootstrap.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/animate.css');?>">
<!--===============================================================================================-->  
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/hamburgers.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/animsition.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/select2.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/toastr.min.css');?>">
<!--===============================================================================================-->
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/class/util.css');?>">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/class/main.css');?>">
<!--===============================================================================================-->
</head>
<body>
  <div id="login">
    <loading :active="active" :loader="'bars'" :color="'#007bff'" :opacity="0.5" :height="100" :width="100" :background-color="' rgba(39, 46, 48, 0.3)'" :is-full-page="true"></loading>
    <div class="limiter">
        <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form class="login100-form validate-form flex-sb flex-w" id="form-login">
            <span class="login100-form-title p-b-32" style="text-align: center;">
                Avyna Packing
            </span>

            <span class="txt1 p-b-11">
                Usuario
            </span>
            <div class="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                <input class="input100" type="text" v-model="username" @keyup.enter="_login">
                <span class="focus-input100"></span>
            </div>
            
            <span class="txt1 p-b-11">
                Contraseña
            </span>
            <div class="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                <span class="btn-show-pass">
                <i class="fa fa-eye"></i>
                </span>
                <input class="input100" type="password" v-model="password" @keyup.enter="_login">
                <span class="focus-input100"></span>
            </div>

            <div class="container-login100-form-btn">
                <button class="login100-form-btn" type="button" @click="_login">
                Iniciar Sesión
                </button>
            </div>

            </form>
        </div>
        </div>
    </div>
  </div>
  

  <div id="dropDownSelect1"></div>

<!-- Modal Verifique Internet -->
<div class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" id="modal_verifica">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <h2><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ERROR</h2>
        <p>Por favor verifica tu conexión a internet y vuelva a intentarlo</p>
        <br>
      <button type="button" class="btn btn-danger" id="btn_OK">OK</button>
      </div>
    </div>
  </div>
</div>

<!-- VUE AND AXIOS -->
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/http-vue-loader"></script>
  <script src="https://unpkg.com/vuex@3.1.1/dist/vuex.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="<?php echo base_url('assets/vue/config.js');?>"></script>
<!---------------------->
<!-- COMPONENTS -->
  <script src="<?php echo base_url('assets/js/lib/vue-loading-overlay@3.js');?>"></script>
  <link href="<?php echo base_url('assets/css/lib/vue-loading.css');?>" rel="stylesheet">
  <script src="<?php echo base_url('assets/js/lib/vue-toasted.min.js');?>"></script>
  <script src="<?php echo base_url('assets/js/lib/vuejs-datepicker.min.js');?>"></script>
<!---------------------->

<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/jquery-3.2.1.min.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/animsition.min.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/popper.js');?>"></script>
  <script src="<?php echo base_url('assets/js/bootstrap.min.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/select2.min.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/moment.min.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/countdowntime.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/toastr.js');?>"></script>
<!--===============================================================================================-->
  <script src="<?php echo base_url('assets/js/class/main.js');?>"></script>
<!--===============================================================================================-->
  <script type="text/javascript" src="<?php echo base_url('assets/vue/pages/Login/LoginPacking.js') ?>"></script>

</body>
</html>