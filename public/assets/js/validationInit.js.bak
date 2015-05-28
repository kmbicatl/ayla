function formValidation() {
    "use strict";
    /*----------- BEGIN validationEngine CODE -------------------------*/
    $('#popup-validation').validationEngine();
    /*----------- END validationEngine CODE -------------------------*/

    /*----------- BEGIN validate CODE -------------------------*/
    $('#inline-validate').validate({
        rules: {
            required: "required",
            email: {
                required: true,
                email: true
            },
            date: {
                required: true,
                date: true
            },
            url: {
                required: true,
                url: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            agree: "required",
            minsize: {
                required: true,
                minlength: 3
            },
            maxsize: {
                required: true,
                maxlength: 6
            },
            minNum: {
                required: true,
                min: 3
            },
            maxNum: {
                required: true,
                max: 16
            }
        },
        errorClass: 'help-block col-lg-6',
        errorElement: 'span',
        highlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
        }
    });



   


	$('#formSelRole').validate({
		submitHandler: function(form) {
			var myData = '_module=/roles';
			if($('#selRole').val()!='0'){
				myData = {query:{roleId:$('#selRole').val()},_module:'/roleProducts'};
			}
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				 var cnt = 0;
				 var dataLen = data.list.length;
				 if($('#selRole').val()!='0' && data.list[0]){
					 dataLen = data.list[0].productId.length;
				 }
				 var optStr = '';
				 var selRoleProductIds = new Array();
				 while(cnt < dataLen){
					 if($('#selRole').val()=='0'){
						optStr += '<option value="'+data.list[cnt].roleId+'">'+data.list[cnt].name+'</option>';
					 } else {						 
						 optStr += '<option id="opt'+data.list[0].productId[cnt]+'" value="'+data.list[0].productId[cnt]+'">'+data.list[0].productId[cnt]+'</option>';
						 selRoleProductIds[data.list[0].productId[cnt]] = data.list[0].productId[cnt];
					 }
 					 cnt++;
				 }
				 if($('#selRole').val()=='0'){
					$('#formSelRole').html('<select id="selRole" name="roleId" placeHolder="Choose Role" onchange="$(\'#formSelRole\').submit()"><option value="0">Select Role</option>'+optStr+'</select>');
					$("#formSelRole").closest("#box1View option").remove();
					$("#formSelRole").closest("#box2View option").remove();
				 } else {
						myData = '_module=/products';
						$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
							data = jQuery.parseJSON(data);
							$("#formSelRole").closest("#box2View option").remove();
							$('#formSelRole').closest('#box2View').append(optStr);	
							cnt = 0;
							dataLen = data.list.length;
							optStr = '';
							while(cnt < dataLen){
								if(!selRoleProductIds[data.list[cnt].productId]){
									optStr += '<option value="'+data.list[cnt].productId+'">'+data.list[cnt].name+'</option>';
								} else {
									$('#opt'+data.list[cnt].productId).text(data.list[cnt].name);
								}
								 cnt++;
							}	
							$("#formSelRole").closest("#box1View option").remove();
							$('#formSelRole').closest('#box1View').append(optStr);	
						});
				 }
			});
		}
    });

	

 

	/*----------- END validate CODE -------------------------*/
}




