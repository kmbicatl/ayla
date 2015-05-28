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


    $('#formClients').validate({
        rules: {
			name:{
				required: true,
				formatedNames: true
			},
			status:{
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
			var data = $('#formClients').serialize();
			if(data.length > 0){
				data += '&_module=/clients';
			}
			$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'Client Id : '+data.clientId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formClients > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formClients').find('INPUT[type="reset"]').click();
				}
				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formClients > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){
					$(this).remove();
				})

			});

		}
    });

    $('#formClientsList').validate({
		submitHandler: function(form) {
			var myData = '_module=/clients';
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					
				 var oTable = $('#formClientsList').find('table').dataTable();
				 oTable.fnClearTable();
				 var cnt = 0;
				 var dataLen = data.list.length;
				 while(cnt < dataLen){
					 oTable.fnAddData([data.list[cnt].clientId,data.list[cnt].name,(data.list[cnt].status==1)?'Active':'InActive',data.list[cnt].created],false);
 					 cnt++;
				 }				 
				 oTable.fnDraw();

			});

		}
    });

    $('#formUsers').validate({
		submitHandler: function(form) {
			var data = $('#formUsers').serialize();
			if(data.length > 0){
				data += '&_module=/users';
			}
			$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'User Id : '+data.userId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formClients > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formClients').find('INPUT[type="reset"]').click();
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formUsers > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()})

			});

		}
    });

  $('#formUsersList').validate({
		submitHandler: function(form) {
			var myData = '_module=/users';
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					
				 var oTable = $('#formUsersList').find('table').dataTable();
				 oTable.fnClearTable();
				 var cnt = 0;
				 var dataLen = data.list.length;
				 while(cnt < dataLen){
					 oTable.fnAddData([data.list[cnt].clientId,data.list[cnt].firstName,data.list[cnt].lastName,data.list[cnt].emailId,(data.list[cnt].status==1)?'Active':'InActive',data.list[cnt].created],false);
 					 cnt++;
				 }				 
				 oTable.fnDraw();

			});

		}
    });

  $('#formRoles').validate({
		rules: {
			name:{
				required: true,
				formatedNames: true
			},
			status:{
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
			var data = $('#formRoles').serialize();
			if(data.length > 0){
				data += '&_module=/roles';
			}
			$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'Role Id : '+data.roleId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formClients > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formClients').find('INPUT[type="reset"]').click();
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formRoles > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
			});			
		}
  });

  $('#formRolesList').validate({
		submitHandler: function(form) {
			var myData = '_module=/roles';
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					
				 var oTable = $('#formRolesList').find('table').dataTable();
				 oTable.fnClearTable();
				 var cnt = 0;
				 var dataLen = data.list.length;
				 while(cnt < dataLen){
					 oTable.fnAddData([data.list[cnt].roleId,data.list[cnt].name,(data.list[cnt].status==1)?'Active':'InActive',data.list[cnt].created],false);
 					 cnt++;
				 }				 
				 oTable.fnDraw();

			});
		}
		
  });

 $('#formFunctions').validate({
		rules: {
			name:{
				required: true,
				formatedNames: true
			},
			module:{
				required: true
			},
			requireFile:{
				required: true
			},
			status:{
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
			var myData = $('#formFunctions').serialize();		
			myData += '&_module=/functions';
			
			$.ajax({url:"/save", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'Function Id : '+data.functionId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formClients > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formClients').find('INPUT[type="reset"]').click();
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formFunctions > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
			});			
		}
 });
	

  $('#formFunctionsList').validate({
		submitHandler: function(form) {
			var myData = '_module=/functions';
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					
				 var oTable = $('#formFunctionsList').find('table').dataTable();
				 oTable.fnClearTable();
				 var cnt = 0;
				 var dataLen = data.list.length;
				 while(cnt < dataLen){
					 oTable.fnAddData([data.list[cnt].functionId,data.list[cnt].name,data.list[cnt].module,(data.list[cnt].status==1)?'Active':'InActive',data.list[cnt].created],false);
 					 cnt++;
				 }				 
				 oTable.fnDraw();

			});

		}
    });

	$('#formSelRole').validate({
		submitHandler: function(form) {
			var myData = '_module=/roles';
			if($('#selRole').val()!='0'){
				myData = {query:{roleId:$('#selRole').val()},_module:'/roleFunctions'};
			}
			$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				 var cnt = 0;
				 var dataLen = data.list.length;
				 if($('#selRole').val()!='0' && data.list[0]){
					 dataLen = data.list[0].functionId.length;
				 }
				 var optStr = '';
				 var selRoleFunctionIds = new Array();
				 while(cnt < dataLen){
					 if($('#selRole').val()=='0'){
						optStr += '<option value="'+data.list[cnt].roleId+'">'+data.list[cnt].name+'</option>';
					 } else {						 
						 optStr += '<option id="opt'+data.list[0].functionId[cnt]+'" value="'+data.list[0].functionId[cnt]+'">'+data.list[0].functionId[cnt]+'</option>';
						 selRoleFunctionIds[data.list[0].functionId[cnt]] = data.list[0].functionId[cnt];
					 }
 					 cnt++;
				 }
				 if($('#selRole').val()=='0'){
					$('#formSelRole').html('<select id="selRole" name="roleId" placeHolder="Choose Role" onchange="$(\'#formSelRole\').submit()"><option value="0">Select Role</option>'+optStr+'</select>');
					$("#box1View option").remove();
					$("#box2View option").remove();
				 } else {
						myData = '_module=/functions';
						$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
							data = jQuery.parseJSON(data);
							$("#box2View option").remove();
							$('#box2View').append(optStr);	
							cnt = 0;
							dataLen = data.list.length;
							optStr = '';
							while(cnt < dataLen){
								if(!selRoleFunctionIds[data.list[cnt].functionId]){
									optStr += '<option value="'+data.list[cnt].functionId+'">'+data.list[cnt].name+'</option>';
								} else {
									$('#opt'+data.list[cnt].functionId).text(data.list[cnt].name);
								}
								 cnt++;
							}	
							$("#box1View option").remove();
							$('#box1View').append(optStr);	
						});
				 }
			});
		}
    });

	$('#formRoleFunctions').validate({
		submitHandler: function(form) {
			$('#box2View option').prop('selected', true);
			var myData = {query:{roleId:$('#selRole').val()},set:{functionId:$('#box2View').val()},addIfNotExists:true,_module:'/roleFunctions'};			
			$.ajax({url:"/update", data:myData}).always(function (data, textStatus, jqXHR) { 
				$('#box2View option').prop('selected', false);
			});
		}
	});
    /*----------- END validate CODE -------------------------*/
}




