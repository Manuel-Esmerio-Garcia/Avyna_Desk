<!-- Page Content -->
<br>

<div id="page-wrapper">
	<div class="container-fluid">

<div class="row">
 <div class="col-lg-12">
  <br><br>
 </div>
</div>
<div id="page-wrapper">
 <div class="container-fluid">

  <div class="col-lg-6" style="margin: 0 auto;">
   <div class="panel panel-danger">
    <div class="panel-heading">
     <h4 class="panel-title">
      <span class="fa fa-edit" aria-hidden="true"></span>
      <a data-toggle="collapse" href="#collapse1"> Venta <span class="glyphicon glyphicon-chevron-up pull-right"></span></a>
     </h4>
    </div>
    <div id="collapse1" class="panel-collapse collapse in">
     <div class="panel-body">

       <div class="form-group">
        <label class="label label-default">Salon:</label>
        <select class="form-control" id="Select_Salon">
          <option value="">Seleccionar...</option>
          <option value="GOURMETERIA">GOURMETERIA</option>
        </select>
       </div>


       <div>
         <div class="form-group">
           <div class="col-lg-6 col-md-6">
             <label class="label label-default">Cliente:</label>
             <select class="form-control" id="Cliente_Venta">
              <option value="">Seleccionar...</option>
              <?php foreach ($Cliente as $key => $value) : ?>
               <option value="<?php echo $value->ID ?>"><?php echo $value->Nombre.' '.$value->Apellidos?></option>
               <?php endforeach; ?>
             </select>
           </div>

           <div class="col-lg-6 col-md-6">
             <div class="col-lg-6 col-md-6">
              <div class="form-group">
               <p><label>Subtotal:</label> </p>
               <p><label>Impuesto:</label> </p>
               <p><label>Descuento:</label> </p>
               <p><label><strong>Total:</strong></label> </p>
              </div>
             </div>
             <div class="col-lg-6 col-md-6">
              <div class="form-group">
               <input type="button" name="" class="btn btn-default" value="Realizar Venta">
              </div>
              <div class="form-group">
               <input type="button" name="" class="btn btn-danger" value="Cancelar">
              </div>
             </div>
           </div>
         </div>
       </div>
      

     </div>
     <div class="panel-footer">
      <div class="row">

       <div class="col-lg-12">
        <button class="btn btn-success btn-xs" style="float: right;" data-toggle="modal" data-target="#myModal" id="show_Productos" disabled="disabled"><i class="fa fa-plus" aria-hidden="true"></i></button>
       </div>
      </div>
     </div>
     
    </div>
   </div>
  </div>

  <div class="col-lg-6" style="margin: 0 auto;">

   <table class="table table-striped table-bordered table-hover table-responsive">
    <thead>
     <tr class="danger">
     <th>#</th>
      <th>Cantidad</th>
      <th>Precio Unitario</th>
      <th>Importe</th>
      <th>Descuento</th>
      <th>Total</th>
     </tr>
    </thead>
    <tbody>
     
    </tbody>
   </table>

  </div>
  <!-- /.col-lg-12 -->


  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Seleccionar Producto</h4>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover table-striped" id="Productos_Venta" style="width: 100%;">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Catalogo Item</td>
                  <td>Producto</td>
                  <td>Existencia</td>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($Producto as $key => $value) : ?>
                  <tr>
                    <td><input type="checkbox" name=""></td>
                    <td><?php echo $value->Codigo?></td>
                    <td><?php echo $value->Producto?></td>
                    <td><?php echo $value->Existencias?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

 </div>
 <!-- /.container-fluid -->
</div>
<!-- /#page-wrapper -->


 </div>
</div>