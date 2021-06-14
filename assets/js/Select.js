$(document).ready(function() {
	
	//set up the 'Add New Question' button
	$('#addQuestion').click(function(e){
		//prevent the button from submitting the form
		e.preventDefault();
		
		//get the new question number
		var questionNumber = $('.question').length + 1;
		
		//clone the master questionChanger and 'type1' question (we need to remove the ID from the questionType - we don't need it)
		var questionChanger = $('#masterQuestion .questionChanger').clone(true);
		var questionType = $('#type1').clone().removeAttr('id');
		
		//create a new wrapper for the new question, set the question number (used later), add a class, and add the new content to it
		var newQuestion = $('<div>').data('qNum', questionNumber).addClass('question').append(questionChanger, questionType);
		
		//now loop through the '.dynamic' elements so we can change the name
		$('.dynamic', newQuestion).each(function() {
			//get the old dummy name
			var oldName = $(this).attr('name');
			
			//replace the dummy text (*) with the question number
			$(this).attr('name', oldName.replace('*', questionNumber));
		})
		
		//add the new question to the #questions DIV
		newQuestion.appendTo('#questions');
	});


	//set up the 'Question Type' changer
	$('.questionChanger select').change(function() {
		//what type of question are we cloning (match the values of the dropdown to the IDs of the master question types)
		var newQuestionType = $('#' + $(this).val()).clone().removeAttr('id');
		
		//get the question number (this time from the data-qNum attribute)
		var questionNumber = $(this).parents('.question').data('qNum');
		
		//loop through the new question and change the name of all the '.dynamic' elements
		$(newQuestionType).find('.dynamic').each(function(){
			//get the old dummy name
			var oldName = $(this).attr('name');
			
			//replace the dummy text (*) with the question number (this time from the data-qNum attribute)
			$(this).attr('name', oldName.replace('*', questionNumber));
		})
		
		//now add the new question type
		$(this).parents('.question').find('.questionSet').html(newQuestionType);
	});
	
});