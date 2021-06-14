$("body").on("click", "#ListaCliente a", function(event){
 event.preventDefault();
 ID = $(this).attr("href");
 ID = $(this).parent().parent().children("td:eq(0)").text();

});