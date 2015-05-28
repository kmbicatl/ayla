function loginController(){
	$('#msg').hide();
	 $('.list-inline li > a').click(function () {
        var activeForm = $(this).attr('href') + ' > form';
        
			//console.log(activeForm);
       
		$(activeForm).addClass('magictime swap');
        //set timer to 1 seconds, after that, unload the magic animation
       
		setTimeout(function () {
            $(activeForm).removeClass('magictime swap');
        }, 1000);
    });
	$('#aLogin').click();
    $('#formLogin').validate({
        rules: {
			emailId:{
				required: true,
				email: true
			},
			password:{
				required:true	
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
			$.ajax({url:'/oauth',data:$('#formLogin').serialize()+'&clientId=0'})
			.always(function(data){
					data = JSON.parse(data);
					if(data.message=='Success'){
						$('#token').val(data.token);
						$('#formLoginSuccess').submit();
					} else {
						$('#msg').html('<strong><center>Invalid Credentials...</center></strong>');
						$('#msg').show();
							$('#msg').fadeOut(3000,function(){
								$(this).hide();
							});
					}
			});
		}
    });
}