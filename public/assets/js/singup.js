function signupController(){
    $('#formUsers').validate({
	    rules: {
			clientId:{
				required: true
			},
			firstName:{
				required: true,
				string: true
			},
			lastName:{
				required: true,
				string: true
			},
			phoneNbr:{
				required: true,
				string: true
			},
			title:{
				required: true,
				string: true
			},
			emailId:{
				required: true,
				email: true
			},
			password:{
				required: true,
				string: true
			},
			companyName:{
				required: true,
				string: true
			},
			companyURL:{
				required: true,
				string: true
			},
			address:{
				required: true,
				string: true
			},
			city:{
				required: true,
				string: true
			},
			state:{
				required: true,
				string: true
			},
			zipCode:{
				required: true,
				number: true
			},
			country:{
				required: true,
				string: true
			}
        },
        errorClass: 'help-block',
        errorElement: 'span',
        highlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
        },
		submitHandler: function(form) {
			var myData = $('#formUsers').serialize();
			if(myData.length > 0){
				myData += '&_module=/'+_win.activeModule;
			}
			ajax({
				url:"/save", data:myData,callback:function(data, textStatus, jqXHR){
			//$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'User Id : '+data.userId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formUsers > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formUsers').find('INPUT[type="reset"]').click();
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formUsers > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()})
				}
			});

		}
    });
}