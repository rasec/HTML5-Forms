$(function(){
	$(".field-1").show();
	$(".field-2, .field-3").hide();
	var saved = new Array();
	$('.save').on('click', function(e){
		var field = $(this).parent("fieldset");
		var nextField = field.next("fieldset");
		var valid = true;
		var elems = field.find("input");
		
		elems.each(function(){
			if(this.checkValidity && !this.checkValidity()){
				valid = false;
				ownValidation(this);
			}
		});
		
		if(!valid){
			var form = $(this).closest("form");
			form.find("input[type=submit]").click();			
		} else {
			field.hide();
			nextField.show();
			setProgress(this);
		}
	});
	
	$('#ejemplo, #extended-ejemplo').on("submit", function(e){
		if(this.checkValidity && this.checkValidity()){
			e.preventDefault();
			setProgress($(this).find("input[type='submit']"));
			$(this).html("<p>Datos enviados correctamente</p>");
		}
	});
	
	$('#extended-ejemplo input').on("input", function(e){
		setOwnValidatity(this);
	});
	
	var setProgress = function(el) {
		var id = $(el).attr('id');
		if(!saved[id]) {
			var aside = $(el).closest("form").prev();
			var progress = aside.find("progress"),
				output = aside.find("output");
			progress.val(progress.val() +1);
			output.html(progress.val());
			saved[id] = 1;
		}
	}
	
	var ownValidation = function(el){
		var validity = el.validity;
		if($(el).parents("#extended-ejemplo").length > 0) {
			setOwnValidatity(el);
		}
	}
	
	var setOwnValidatity = function(el){
		if(el.validity.valueMissing) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " es obligatorio");
		} else if (el.validity.patternMismatch) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " no cumple el patron " + $(el).attr('title'));
		} else if (el.validity.rangeOverflow) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " es mayor de lo esperado: " + $(el).attr("max"));
		} else if (el.validity.rangeUnderflow) {
			el.setCustomValidity("El campo " + $(el).attr('name') +  " es menos de lo esperado: " + $(el).attr("min"));
		} else if (el.validity.stepMismatch) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " no es valido");
		} else if (el.validity.tooLong) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " es demasiado largo, la longitud máximo es " + $(el).attr('maxlength'));
		} else if (el.validity.typeMismatch) {
			el.setCustomValidity("El campo " + $(el).attr('name') + " no es un " + $(el).attr('type') + " valido");
		} else {
			el.setCustomValidity("");
		}
	}
	
});
