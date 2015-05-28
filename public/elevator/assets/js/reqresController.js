$(document).ajaxStart(function(){
	$('#spinner').modal('show');
 }).ajaxStop(function(data){
	$('#spinner').modal('hide');
 });
function ajax(oAjax){
	if(typeof oAjax.data == 'string'){
		oAjax.data += '&token='+_win.access_token;
	} else {
		oAjax.data.token = _win.access_token;
		oAjax.cache = false
        contentType = false;
        processData = false;
	}
	$.ajax(oAjax).always(function (data, textStatus, jqXHR) { 
		data = jQuery.parseJSON(data)
		if(data.error && data.error[0] && data.error[0].name=='InvalidToken'){
					var classType = 'btn-danger';
					var respMessg = '';
					for(var id in data.error[0].errors){
						respMessg += id+' : '+data.error[0].errors[id].message+'<br/>';
					}
					respMessg += 'This window will be redirected to login page in <span id="spanLogoutTimer"><u>10</u></span> seconds';
					$('form > .form-group').removeClass('has-success').addClass('has-error');

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#form > div')[0]);
								alert(data.message+'\n'+respMessg);

				var logoutTimer = 9;
				setInterval(function(){ 					
					$('#spanLogoutTimer').html('<u>'+logoutTimer+'</u>');
					logoutTimer--;
					if(logoutTimer < 0) {
						location.href = '../../cloud.html';
					}
				}, 1000);
				$('#divInfoBar').fadeOut(14000,function(){$(this).remove()})	
		} else {
			oAjax.callback(data, textStatus, jqXHR);
		}
	});
}