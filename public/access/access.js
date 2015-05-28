function accessController(){
	_win.dualBoxActiveForm = 'formRoleProducts';
	$('#formSelRole').validate({
			submitHandler: function(form) {
				var myData = '_module=/roles';
				if($('#selRole').val()!='0'){
					myData = {query:{roleId:$('#selRole').val()},_module:'/roleProducts'};
				}
				ajax({
					url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
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
						$("#contAccess").find($("#box1View option")).remove();
						$("#contAccess").find($("#box2View option")).remove();
						$('#formSelRole').find($('#selRole')).chosen();
						$('.active-result,.result-selected').css('background-color','black');
					 } else {
							myData = '_module=/products';
							ajax({
								url:"/list", data:myData,callback:function(data, textStatus, jqXHR){

									//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
									//data = jQuery.parseJSON(data);
									$('#contAccess').find($('#box2View option')).remove();
									$('#contAccess').find($('#box2View')).append(optStr);	
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
									$('#contAccess').find($('#box1View option')).remove();
									$('#contAccess').find($('#box1View')).append(optStr);	
								}
							});
					 }
					}
				});
			}
	});

	$('#formRoleProducts').validate({
			submitHandler: function(form) {
				$('#box2View option').prop('selected', true);
				var myData = {query:{roleId:$('#selRole').val()},set:{productId:$('#box2View').val()},addIfNotExists:true,_module:'/roleProducts'};			
				ajax({
					url:"/update", data:myData,callback:function(data, textStatus, jqXHR){

					//$.ajax({url:"/update", data:myData}).always(function (data, textStatus, jqXHR) { 
					$('#box2View option').prop('selected', false);
					}
				});
			}
	});

	$('#formSelRole').submit();
}