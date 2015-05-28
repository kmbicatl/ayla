function usersController(){
	_win.dualBoxActiveForm = 'formUserRoles';
	$('#contUsers').find($('#box11View option')).remove();
	$('#contUsers').find($('#box21View option')).remove();
    $('#formUsers').validate({
	    rules: {
			clientId:{
				required: true
			},
			firstName:{
				required: true,
				formatedNames: true
			},
			lastName:{
				required: true,
				formatedNames: true
			},
			emailId:{
				required: true,
				email: true
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

  $('#formUsersList').validate({
		submitHandler: function(form) {
			var myData = '_module=/userRoles';
			ajax({
				url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
			//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
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
				}
			});

		}
    });

	 $('#formSelUserRole').validate({
		submitHandler: function(form) {
			var myData = {query:{userId:$('#selUserId').val()},_module:'/'+_win.activeModule};
			ajax({
				url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
			//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					 var cnt = 0;
					 var dataLen = data.list.length;
					 dataLen = data.list[0].roleId.length;

					 var optStr = '';
					 var selUserRoleIds = new Array();
					 while(cnt < dataLen){
						 optStr += '<option id="opt'+data.list[0].roleId[cnt]+'" value="'+data.list[0].roleId[cnt]+'">'+data.list[0].roleId[cnt]+'</option>';
						 selUserRoleIds[data.list[0].roleId[cnt]] = data.list[0].roleId[cnt];
						 cnt++;
					 }

					myData = '_module=/roles';
					ajax({
						url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
						//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
							//data = jQuery.parseJSON(data);
							$('#contUsers').find($('#box21View option')).remove();
							$('#contUsers').find($('#box21View')).append(optStr);	
							cnt = 0;
							dataLen = data.list.length;
							optStr = '';
							while(cnt < dataLen){
								if(!selUserRoleIds[data.list[cnt].roleId]){
									optStr += '<option value="'+data.list[cnt].roleId+'">'+data.list[cnt].name+'</option>';
								} else {
									$('#opt'+data.list[cnt].roleId).text(data.list[cnt].name);
								}
								 cnt++;
							}	
							$('#contUsers').find($('#box11View option')).remove();
							$('#contUsers').find($('#box11View')).append(optStr);	
						}
					});

				}
				
			});
		}
	  });

	 $('#formUserRoles').validate({
			submitHandler: function(form) {
				$('#box21View option').prop('selected', true);
				var myData = {query:{userId:$('#selUserId').val()},set:{roleId:$('#box21View').val()},addIfNotExists:true,_module:'/userRoles'};			
				ajax({
						url:"/update", data:myData,callback:function(data, textStatus, jqXHR){
							//$.ajax({url:"/update", data:myData}).always(function (data, textStatus, jqXHR) { 
							$('#box21View option').prop('selected', false);
						}
				});
			}
	});


	
	loadClients();
}



function loadClients(){
	var myData = '_module=/clients';
	ajax({url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
		var cnt = 0;
		var dataLen = data.list.length;
		var optStr = '';
		while(cnt < dataLen){
			optStr += '<option value="'+data.list[cnt].clientId+'">'+data.list[cnt].name+'</option>';
			cnt++;
		}				 
		$('#divSelClientId').html('<select id="clientId" name="clientId" class="form-control" onchange="loadUsers()">'+optStr+'</select>');
		$('#clientId').chosen();
		loadUsers();			
	}});
	/*$.ajax().always(function (data, textStatus, jqXHR) { 

	});*/
}

function loadUsers(){
	var myData = {query:{clientId:$('#divSelClientId > #clientId').val()},_module:'/'+_win.activeModule};
	ajax({url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
	//	$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
			var cnt = 0;
			var dataLen = data.list.length;
			var optStr = '<option value="">Select User</option>';
			while(cnt < dataLen){
				optStr += '<option value="'+data.list[cnt].userId+'">Name : '+data.list[cnt].lastName+', '+data.list[cnt].firstName+' ; Email : '+data.list[cnt].emailId+' </option>';
				cnt++;
			}				 
			$('#divSelUserId').html('<select id="selUserId" name="userId" class="form-control" style="width:auto" onchange="$(\'#formSelUserRole\').submit()">'+optStr+'</select>');
			$('#selUserId').chosen();
		}
	});
}