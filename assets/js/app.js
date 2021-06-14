$(document).ready(function () {
	initDatePicker();
});
// Inicia el caledario : bootstrap.
function initDatePicker() {
	$('.date-picker').datetimepicker({
		language: 'es',
		todayBtn: 1,
		autoclose: true,
		todayHighlight: true,
		startView: 2,
		minView: 2,
		forceParse: 0,
		daysOfWeekDisabled: "0,6",
		daysOfWeekHighlighted: "0,6",
		clearBtn: true,
		weekStart: 0
	});

	$('.form_time').datetimepicker({
		language: 'es',
		todayBtn: 1,
		autoclose: true,
		todayHighlight: true,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0,
		daysOfWeekDisabled: "0,6",
		daysOfWeekHighlighted: "0,6",
		clearBtn: true
	});

	$('#datetimepicker3').datetimepicker({
		format: 'LT'
	});
	
			
}

function initDatePicker() {
	
	$('.date-Cumple').datetimepicker({
		viewMode: 'years'
		
	});
}
