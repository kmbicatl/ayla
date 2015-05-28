function clientsController(){
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
			var myData = $('#formClients').serialize();
			if(myData.length > 0){
				myData += '&_module=/'+_win.activeModule;
			}
			ajax({
				url:"/save", data:myData,callback:function(data, textStatus, jqXHR){
				//$.ajax({url:"/save", data:data}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'Customer Id : '+data.clientId;
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
				});
				}
			});

		}
    });

    $('#formClientsList').validate({
		submitHandler: function(form) {
			var myData = '_module=/'+_win.activeModule;
			ajax({
				url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
				//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
				//data = jQuery.parseJSON(data);
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
				}
			});

		}
    });
}