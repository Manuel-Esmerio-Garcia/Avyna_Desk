$( document ).ready(function() {
    console.log("ready");

     // Cargar Libreria DatePicker //
    $('#txtDate').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
    });

    var date = new Date();
    document.querySelector("#txtActualDay").innerHTML = getDayText(date.getDay());

});

function changeWeek() {
    let semana = $('#selectWeek').val();
    let date = document.querySelector('#txtDate').value;
    let idCliente = document.querySelector('#selectDistribuidor option:checked').value;

    let formData = new FormData();
	formData.append("Semana", semana);
    formData.append("date", date);
    formData.append("idCliente", idCliente);

    $.ajax({
        url: dir + 'index.php/Controller_Reporte_Visitas_Salones/changeWeek',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        beforeSend : function (){
            $('#Cargando_Header').css('display','');
        },
        success: function(data){
            let parsed = JSON.parse(data);
            console.log(parsed);

            let TbodyWeek = document.getElementById("fetchWeek").tBodies[0];
            $('#fetchWeek').DataTable().destroy();
            TbodyWeek.innerHTML = "";

            if (parsed['weekCustomer'].length > 0) {
                for (let i = 0; i < parsed['weekCustomer'][0]['Contador']; i++) {

                    let row = TbodyWeek.insertRow(i);
                    let cel = row.insertCell(0);
                    let cel1 = row.insertCell(1);
                    let cel2 = row.insertCell(2);
                    let cel3 = row.insertCell(3);
                    let cel4 = row.insertCell(4);

                    if (i < parsed['mondayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['mondayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['mondayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['mondayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['mondayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";                        
                        
                        let span = document.createElement("span");

                        if (parseFloat(parsed['mondayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }
                        
                        span.innerHTML = ` $${parsed['mondayCustomer'][i]['Total']} `;

                        cel.innerHTML = `${parsed['mondayCustomer'][i]['Nombre']} ${parsed['mondayCustomer'][i]['Apellidos']} <br>`;
                        cel.appendChild(pp);
                        cel.appendChild(p);
                        cel.appendChild(span);
                    }
                    if (i < parsed['tuesdayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['tuesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['tuesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['tuesdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['tuesdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px"; 

                        let span = document.createElement("span");

                        if (parseFloat(parsed['tuesdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }
                        
                        span.innerHTML = ` $${parsed['tuesdayCustomer'][i]['Total']} `;

                        cel1.innerHTML = `${parsed['tuesdayCustomer'][i]['Nombre']} ${parsed['tuesdayCustomer'][i]['Apellidos']} <br>`;
                        cel1.appendChild(pp);
                        cel1.appendChild(p);
                        cel1.appendChild(span);   
                    }
                    if (i < parsed['wednesdayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['wednesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['wednesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['wednesdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['wednesdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['wednesdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['wednesdayCustomer'][i]['Total']} `;

                        cel2.innerHTML = `${parsed['wednesdayCustomer'][i]['Nombre']} ${parsed['wednesdayCustomer'][i]['Apellidos']} <br>`;
                        cel2.appendChild(pp);
                        cel2.appendChild(p);
                        cel2.appendChild(span); 
                    }
                    if (i < parsed['thursdayCustomer'].length) {
                        let p    = document.createElement("p");
                        
                        if (parsed['thursdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['thursdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['thursdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['thursdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['thursdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['thursdayCustomer'][i]['Total']} `;

                        cel3.innerHTML = `${parsed['thursdayCustomer'][i]['Nombre']} ${parsed['thursdayCustomer'][i]['Apellidos']} <br>`;
                        cel3.appendChild(pp);
                        cel3.appendChild(p);
                        cel3.appendChild(span); 
                    }
                    if (i < parsed['fridayCustomer'].length) {
                        let p    = document.createElement("p");
                        
                        if (parsed['fridayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['fridayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['fridayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['fridayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['fridayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['fridayCustomer'][i]['Total']} `;

                        cel4.innerHTML = `${parsed['fridayCustomer'][i]['Nombre']} ${parsed['fridayCustomer'][i]['Apellidos']} <br>`;
                        cel4.appendChild(pp);
                        cel4.appendChild(p);
                        cel4.appendChild(span);
                    }
                }
            }
        }
    })
    .done(function() {
        $('#Cargando_Header').css('display','none');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    })
    .always(function() {
        $('#Cargando_Header').css('display','none');
    });
}

function changeDistribuidor() {
    let date = document.querySelector('#txtDate').value;
    let idCliente = document.querySelector('#selectDistribuidor option:checked').value;
    if (idCliente != "" && idCliente != null) {
        if (date != "" && date != null) {
            CleanInfo();
            Initial(idCliente, date);
        }else{
            toastr.warning('Es necesario seleccionar una fecha.','Error');
        }
    }else{
        CleanInfo();
    }
}


function getDayText(number) {
    switch (number) {
        case 0:
            return "Domingo";
        break;
        case 1:
            return "Lunes";
        break;
        case 2:
            return "Martes";
        break;
        case 3:
            return "Miércoles";
        break;
        case 4:
            return "Jueves";
        break;
        case 5:
            return "Viernes";
        break;
        case 6:
            return "Sábado";
        break;
    
    }
}

function CleanInfo() {
    document.querySelector("#plusWeek").innerHTML = "";
    document.querySelector("#plusday").innerHTML = "";
    document.querySelector("#plusCount").innerHTML = "";

    document.querySelector("#lessWeek").innerHTML = "";
    document.querySelector("#lessday").innerHTML = "";
    document.querySelector("#lessCount").innerHTML = "";

    document.querySelector("#weekSalePlus").innerHTML = "";
    document.querySelector("#weekDayPlus").innerHTML = "";
    document.querySelector("#SalePlus").innerHTML = "";

    document.querySelector("#weekSaleLess").innerHTML = "";
    document.querySelector("#weekDayLess").innerHTML = "";
    document.querySelector("#SaleLess").innerHTML = "";

    let pieChartNon = document.getElementById('pieChartNon');
    pieChartNon.innerHTML = '&nbsp;';
    $('#pieChartNon').append('<canvas id="myChart" width="300" height="300"><canvas>');

    let pieChartPar = document.getElementById('pieChartPar');
    pieChartPar.innerHTML = '&nbsp;';
    $('#pieChartPar').append('<canvas id="myCant" width="300" height="300"><canvas>');

}

function Initial(idCliente,date) {
    let formData = new FormData();
    formData.append("idCliente", idCliente);
    formData.append("date", date);

    $.ajax({
        url: dir + 'index.php/Controller_Reporte_Visitas_Salones/initial',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        beforeSend : function (){
            $('#Cargando_Header').css('display','');
        },
        success: function(data){
            let parsed = JSON.parse(data);
            console.log(parsed);

            let fecha = new Date();

            let Non = [];
            let Day = [];
            let Cant = [];

            let Par = [];
            let Dia = [];
            let Count = [];

            const dias = [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado',
            ];

            let Tbody = document.getElementById("fetchCustomer").tBodies[0];
            Tbody.innerHTML = "";

            let TbodyWeek = document.getElementById("fetchWeek").tBodies[0];
            $('#fetchWeek').DataTable().destroy();
            TbodyWeek.innerHTML = "";

            if (parsed['Customer'].length > 0) {
                for (let i = 0; i < parsed['Customer'].length; i++) {
                    let row = Tbody.insertRow(i);
                    let cel1 = row.insertCell(0);
                    let cel2 = row.insertCell(1);

                    cel1.innerHTML = `${parsed['Customer'][i]['Nombre']} ${parsed['Customer'][i]['Apellidos']}`;

                    cel2.style.textAlign = "center";

                    if (parsed['Customer'][i]['Nivel'] != null && parsed['Customer'][i]['Nivel'] != "") {
                        
                        if (parsed['Customer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            cel2.innerHTML = `<p class="label label bg-black color-palette"> ${parsed['Customer'][i]['Nivel']} </p> <br> $${parsed['Customer'][i]['Total']}`;
                        }else if (parsed['Customer'][i]['Nivel'].trim().toUpperCase() == 'RED') {
                            cel2.innerHTML = `<p class="label label bg-red color-palette"> ${parsed['Customer'][i]['Nivel']} </p> <br> $${parsed['Customer'][i]['Total']}`;
                        }else{
                            cel2.innerHTML = `<p class="label bg-gray color-palette"> ${parsed['Customer'][i]['Nivel']} </p> <br> $${parsed['Customer'][i]['Total']}`;
                        }
                        
                    }else{
                        cel2.innerHTML = `<p class="label bg-gray color-palette">N/A</p> <br> $${parsed['Customer'][i]['Total']}`;
                    }
                }
            }
            
            if (parsed['weekCustomer'].length > 0) {
                for (let i = 0; i < parsed['weekCustomer'][0]['Contador']; i++) {

                    let row = TbodyWeek.insertRow(i);
                    let cel = row.insertCell(0);
                    let cel1 = row.insertCell(1);
                    let cel2 = row.insertCell(2);
                    let cel3 = row.insertCell(3);
                    let cel4 = row.insertCell(4);

                    if (i < parsed['mondayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['mondayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['mondayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['mondayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['mondayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";                        
                        
                        let span = document.createElement("span");

                        if (parseFloat(parsed['mondayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }
                        
                        span.innerHTML = ` $${parsed['mondayCustomer'][i]['Total']} `;

                        cel.innerHTML = `${parsed['mondayCustomer'][i]['Nombre']} ${parsed['mondayCustomer'][i]['Apellidos']} <br>`;
                        cel.appendChild(pp);
                        cel.appendChild(p);
                        cel.appendChild(span);
                    }
                    if (i < parsed['tuesdayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['tuesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['tuesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['tuesdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['tuesdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px"; 

                        let span = document.createElement("span");

                        if (parseFloat(parsed['tuesdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }
                        
                        span.innerHTML = ` $${parsed['tuesdayCustomer'][i]['Total']} `;

                        cel1.innerHTML = `${parsed['tuesdayCustomer'][i]['Nombre']} ${parsed['tuesdayCustomer'][i]['Apellidos']} <br>`;
                        cel1.appendChild(pp);
                        cel1.appendChild(p);
                        cel1.appendChild(span);   
                    }
                    if (i < parsed['wednesdayCustomer'].length) {
                        let p    = document.createElement("p");

                        if (parsed['wednesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['wednesdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['wednesdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['wednesdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['wednesdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['wednesdayCustomer'][i]['Total']} `;

                        cel2.innerHTML = `${parsed['wednesdayCustomer'][i]['Nombre']} ${parsed['wednesdayCustomer'][i]['Apellidos']} <br>`;
                        cel2.appendChild(pp);
                        cel2.appendChild(p);
                        cel2.appendChild(span); 
                    }
                    if (i < parsed['thursdayCustomer'].length) {
                        let p    = document.createElement("p");
                        
                        if (parsed['thursdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['thursdayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['thursdayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['thursdayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['thursdayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['thursdayCustomer'][i]['Total']} `;

                        cel3.innerHTML = `${parsed['thursdayCustomer'][i]['Nombre']} ${parsed['thursdayCustomer'][i]['Apellidos']} <br>`;
                        cel3.appendChild(pp);
                        cel3.appendChild(p);
                        cel3.appendChild(span); 
                    }
                    if (i < parsed['fridayCustomer'].length) {
                        let p    = document.createElement("p");
                        
                        if (parsed['fridayCustomer'][i]['Nivel'].trim().toUpperCase() == 'BLACK') {
                            p.classList.add('label', 'bg-black', 'color-palette');
                        }else if(parsed['fridayCustomer'][i]['Nivel'].trim().toUpperCase() == 'RED'){
                            p.classList.add('label', 'bg-red', 'color-palette');
                        }else{
                            p.classList.add('label', 'bg-gray', 'color-palette');
                        }

                        p.style.marginRight = "15px";
                        p.innerHTML = ` ${parsed['fridayCustomer'][i]['Nivel']} `;

                        let pp    = document.createElement("p");

                        if (parsed['fridayCustomer'][i]['Info'].trim() == 1) {
                            pp.classList.add('label', 'bg-primary', 'color-palette');
                            pp.innerHTML = `Con Ventas`;
                        }else{
                            pp.classList.add('label', 'bg-red', 'color-palette');
                            pp.innerHTML = `Sin Ventas`;
                        }

                        pp.style.marginRight = "15px";

                        let span = document.createElement("span");

                        if (parseFloat(parsed['fridayCustomer'][i]['Total']) > 0.00) {
                            span.classList.add('label', 'bg-navy', 'color-palette');
                        }else{
                            span.classList.add('label', 'bg-orange', 'color-palette');
                        }

                        span.innerHTML = ` $${parsed['fridayCustomer'][i]['Total']} `;

                        cel4.innerHTML = `${parsed['fridayCustomer'][i]['Nombre']} ${parsed['fridayCustomer'][i]['Apellidos']} <br>`;
                        cel4.appendChild(pp);
                        cel4.appendChild(p);
                        cel4.appendChild(span);
                    }
                }
            }

            if (parsed['getInfo'].length > 0) {
                $("#spanDay").text(`Dia: ${dias[fecha.getDay()]}`);
                $("#spanDate").text(`Semana: ${getParNon(parsed['getInfo'][0]['getWeek'])}`);

                $("#selectWeek").val(parseInt(parsed['getInfo'][0]['getWeek']));
            }
            

            if (parsed['dayPlus'].length > 0) {
                document.querySelector("#plusWeek").innerHTML = getParNon(parsed['dayPlus'][0]['Semana']);
                document.querySelector("#plusday").innerHTML = getDayWeek(parsed['dayPlus'][0]['Dia']);
                document.querySelector("#plusCount").innerHTML = parsed['dayPlus'][0]['info'];
            }

            if (parsed['dayLess'].length > 0) {
                document.querySelector("#lessWeek").innerHTML = getParNon(parsed['dayLess'][0]['Semana']);
                document.querySelector("#lessday").innerHTML = getDayWeek(parsed['dayLess'][0]['Dia']);
                document.querySelector("#lessCount").innerHTML = parsed['dayLess'][0]['info'];
            }

            if (parsed['plusSales'].length > 0) {
                document.querySelector("#weekSalePlus").innerHTML = getParNon(parsed['plusSales'][0]['Semana']);
                document.querySelector("#weekDayPlus").innerHTML = getDayWeek(parsed['plusSales'][0]['Dia']);
                document.querySelector("#SalePlus").innerHTML = `$ ${parsed['plusSales'][0]['TotalGlobal']}`;
            }

            if (parsed['lessSales'].length > 0) {
                document.querySelector("#weekSaleLess").innerHTML = getParNon(parsed['lessSales'][0]['Semana']);
                document.querySelector("#weekDayLess").innerHTML = getDayWeek(parsed['lessSales'][0]['Dia']);
                document.querySelector("#SaleLess").innerHTML = `$ ${parsed['lessSales'][0]['TotalGlobal']}`;
            }

            if (parsed['chartNonCant'].length > 0) {
                let lun = 0,mar = 0,mie = 0,jue = 0,vie = 0;
                for (let i = 0; i < parsed['chartNonCant'].length; i++) {
                    switch (parsed['chartNonCant'][i]['Dia']) {
                        case 'Monday':
                            lun++;
                        break;
                        case 'Tuesday':
                            mar++;
                        break;
                        case 'Wednesday':
                            mie++;
                        break;
                        case 'Thursday':
                            jue++;
                        break;
                        case 'Friday':
                            vie++;
                        break;
                    }
                }

                Cant.push(lun);
                Cant.push(mar);
                Cant.push(mie);
                Cant.push(jue);
                Cant.push(vie);
            }

            if (parsed['chartNon'].length > 0) {
                for (let i = 0; i < parsed['chartNon'].length; i++) {

                    Day.push(`${parsed['chartNon'][i]['Dia']}`);
                    Non.push(parsed['chartNon'][i]['TotalGlobal']);
                    //Cant.push(parsed['chartNon'][i]['Cantidad']);
                }
            }

            if (parsed['chartParCant'].length > 0) {
                let lun = 0,mar = 0,mie = 0,jue = 0,vie = 0;
                for (let i = 0; i < parsed['chartParCant'].length; i++) {
                    switch (parsed['chartParCant'][i]['Dia']) {
                        case 'Monday':
                            lun++;
                        break;
                        case 'Tuesday':
                            mar++;
                        break;
                        case 'Wednesday':
                            mie++;
                        break;
                        case 'Thursday':
                            jue++;
                        break;
                        case 'Friday':
                            vie++;
                        break;
                    
                    }
                }

                Count.push(lun);
                Count.push(mar);
                Count.push(mie);
                Count.push(jue);
                Count.push(vie);
            }

            if (parsed['chartPar'].length > 0) {
                for (let i = 0; i < parsed['chartPar'].length; i++) {
                    Dia.push(`${parsed['chartPar'][i]['Dia']}`);
                    Par.push(parsed['chartPar'][i]['TotalGlobal']);
                    //Count.push(parsed['chartPar'][i]['Cantidad']);
                }
            }

            let barChartCant = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: 'Par',
                    backgroundColor: ["#ff6384", "#ff9f40","#ffcd56","#4bc0c0","#36a2eb"],
                    data: Count,
                }, 
                {
                    label: 'Non',
                    backgroundColor: ["#E0BBE4", "#957DAD","#D291BC","#FEC8D8","#FFDFD3"],
                    data: Cant,
                }]
            };


            let barChartData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                datasets: [{
                    label: 'Par',
                    backgroundColor: ["#ff6384", "#ff9f40","#ffcd56","#4bc0c0","#36a2eb"],
                    data: Par
                }, {
                    label: 'Non',
                    backgroundColor: ["#B5EAD7", "#FF9AA2","#FFDAC1","#E0FEFE","#C7CEEA"],
                    data: Non
                }]
            };

            let ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Gráfica total ventas de la semana'
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'index',
                        intersect: true,
                        callbacks: {
                            label: function(tooltipItems, data) { 
                                return  `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tooltipItems.yLabel)}`;
                            }
                        }
                    },
                }
            });

            let ct = document.getElementById('myCant').getContext('2d');
            new Chart(ct, {
                type: 'bar',
                data: barChartCant,
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Gráfica cantidad de ventas de la semana'
                    },
                }
            });
        }
    })
    .done(function() {
        $('#Cargando_Header').css('display','none');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    })
    .always(function() {
        $('#Cargando_Header').css('display','none');
    });
}

function getParNon(week) {
    (parseInt(week)) ? week = 'Non' : week = 'Par';
    return week;
}

function getDayWeek(day) {
    switch (day) {
        case 'Friday':
            return 'Viernes';
        break;
        case 'Thursday':
            return 'Jueves';
        break;  
        case 'Wednesday':
            return 'Miércoles';
        break;  
        case 'Tuesday':
            return 'Martes';
        break;  
        case 'Monday':
            return 'Lunes';
        break;    
    }
}

function ToastConfig() {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}

function globalDataTable(name) {
    $(`#${name}`).dataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página.",
            "zeroRecords": "Lo sentimos. No se encontraron registros.",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros aún.",
            "infoFiltered": "(filtrados de un total de _MAX_ registros)",
            "search": "Búsqueda",
            "loadingRecords": "Cargando ...",
            "processing": "Procesando...",
            "searchPlaceholder": "Comience a teclear...",
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente",
            }
        },
        "select": true,
    });
}