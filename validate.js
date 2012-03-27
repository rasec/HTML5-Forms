$(function(){
	$("form").not("#ejemplo").on("submit", function(e){
		if(!this.checkValidity || this.checkValidity()) {
			e.preventDefault();
		}
	});
});
