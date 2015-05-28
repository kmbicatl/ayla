function masterDataController(){
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
			var myData = $('#formRoles').serialize();
			if(myData.length > 0){
				myData += '&_module=/roles';
			}
			ajax({
				url:"/save", data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					var classType = 'btn-info';
					var respMessg = 'Role Id : '+data.roleId;
					if(data.message.indexOf('Failure')>-1){
						classType = 'btn-warning';
						respMessg = 'Error : ';
						for(var id in data.error.errors){
							respMessg += id+' : '+data.error.errors[id].message+'<br/>';
						}
						$('#formRoles > .form-group').removeClass('has-success').addClass('has-error');
					} else {				
						$('#formRoles').find('INPUT[type="reset"]').click();
					}

					$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
					.insertBefore($('#formRoles > div')[0]);
					$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
				}
			});			
		}
 });

 $('#formRolesList').validate({
		submitHandler: function(form) {
			var myData = '_module=/roles';
			ajax({
				url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
				//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
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
				}
			});
		}
		
});

 $('#formProducts').validate({
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
			var myData = $('#formProducts').serialize();		
			myData += '&_module=/products';
			ajax({
				url:"/save", data:myData,callback:function(data, textStatus, jqXHR){
			
					//$.ajax({url:"/save", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					var classType = 'btn-info';
					var respMessg = 'Product Id : '+data.productId;
					if(data.message.indexOf('Failure')>-1){
						classType = 'btn-warning';
						respMessg = 'Error : ';
						for(var id in data.error.errors){
							respMessg += id+' : '+data.error.errors[id].message+'<br/>';
						}
						$('#formProducts > .form-group').removeClass('has-success').addClass('has-error');
					} else {				
						$('#formProducts').find('INPUT[type="reset"]').click();
					}

					$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
					.insertBefore($('#formProducts > div')[0]);
					$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
				}
			});			
		}
 });
	

 $('#formProductsList').validate({
		submitHandler: function(form) {
			var myData = '_module=/products';
			ajax({
				url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
						
					 var oTable = $('#formProductsList').find('table').dataTable();
					 oTable.fnClearTable();
					 var cnt = 0;
					 var dataLen = data.list.length;
					 while(cnt < dataLen){
						 oTable.fnAddData([data.list[cnt].productId,data.list[cnt].name,(data.list[cnt].status==1)?'Active':'InActive','<button class="btn btn-primary" title="Manage Configurations" data-toggle="modal" data-target="#divProductsConf" onclick="_win.lastVal='+data.list[cnt].productId+'"><i class="icon icon-cog"></i></button>',data.list[cnt].created],false);
						 cnt++;
					 }				 
					 oTable.fnDraw();
				}
			});
		}
 });
 
 $('#formProductsConf').validate({
		submitHandler: function(form) {
			var myData = {query:{productId:_win.lastVal},set:{conf:{startDate:$('#startDate').val(),endDate:$('#endDate').val(),maxHits:$('#maxHits').val()}},addIfNotExists:true,_module:'/products'};
			ajax({
				url:"/update", data:myData,callback:function(data, textStatus, jqXHR){
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
						var classType = 'btn-info';
					var respMessg = 'Product Id : '+data.productId;
					if(data.message.indexOf('Failure')>-1){
						classType = 'btn-warning';
						respMessg = 'Error : ';
						for(var id in data.error.errors){
							respMessg += id+' : '+data.error.errors[id].message+'<br/>';
						}
						$('#formProductsConf > .form-group').removeClass('has-success').addClass('has-error');
					} else {				
						$('#formProductsConf').find('INPUT[type="reset"]').click();
					}
					$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
					.insertBefore($('#formProductsConf > div')[0]);
					$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
				}
			});
		}
 });
 
}