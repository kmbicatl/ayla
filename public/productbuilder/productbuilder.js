function productsController(){
	_win.dualBoxActiveForm = 'formProductAPIs';
	$('#formSelProduct').validate({
			submitHandler: function(form) {
				var myData = '_module=/products';
				if($('#selProduct').val()!='0'){
					myData = {query:{productId:$('#selProduct').val()},_module:'/productAPIs'};
				}
				ajax({
					url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
					 var cnt = 0;
					 var dataLen = data.list.length;
					 if($('#selProduct').val()!='0' && data.list[0]){
						 dataLen = data.list[0].apiId.length;
					 }
					 var optStr = '';
					 var selProductAPIIds = new Array();
					 while(cnt < dataLen){
						 if($('#selProduct').val()=='0'){
							optStr += '<option value="'+data.list[cnt].productId+'">'+data.list[cnt].name+'</option>';
						 } else {						 
							 optStr += '<option id="opt'+data.list[0].apiId[cnt]+'" value="'+data.list[0].apiId[cnt]+'">'+data.list[0].apiId[cnt]+'</option>';
							 selProductAPIIds[data.list[0].apiId[cnt]] = data.list[0].apiId[cnt];
						 }
						 cnt++;
					 }
					 if($('#selProduct').val()=='0'){
						$('#formSelProduct').html('<select id="selProduct" name="productId" placeHolder="Choose Product" onchange="$(\'#formSelProduct\').submit()"><option value="0">Select Product</option>'+optStr+'</select>');
						$("#contProductBuilder").find($("#box31View option")).remove();
						$("#contProductBuilder").find($("#box32View option")).remove();
						$('#formSelProduct').find($('#selProduct')).chosen();
						$('.active-result,.result-selected').css('background-color','black');
					 } else {
							myData = '_module=/apis';
							ajax({
								url:"/list", data:myData,callback:function(data, textStatus, jqXHR){

									//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
									//data = jQuery.parseJSON(data);
									$('#contProductBuilder').find($('#box32View option')).remove();
									$('#contProductBuilder').find($('#box32View')).append(optStr);	
									cnt = 0;
									dataLen = data.list.length;
									optStr = '';
									 var oTable = $('#tblProductAPIList').dataTable();
									 oTable.fnClearTable();
									while(cnt < dataLen){
										if(!selProductAPIIds[data.list[cnt].apiId]){
											optStr += '<option value="'+data.list[cnt].apiId+'">'+data.list[cnt].name+'</option>';
										} else {
											$('#opt'+data.list[cnt].apiId).text(data.list[cnt].name);
											 oTable.fnAddData([data.list[cnt].name,'<button class="btn btn-primary" data-toggle="modal" data-target="#divProductAPIConf"><i class="icon icon-cog"></i></button>'],false);
										}
										 cnt++;
									}
									oTable.fnDraw();
									$('#contProductBuilder').find($('#box31View option')).remove();
									$('#contProductBuilder').find($('#box31View')).append(optStr);	
								}
							});
					 }
					}
				});
			}
	});

	$('#formProductAPIs').validate({
			submitHandler: function(form) {
				$('#box32View option').prop('selected', true);
				var myData = {query:{productId:$('#selProduct').val()},set:{apiId:$('#box32View').val()},addIfNotExists:true,_module:'/productAPIs'};			
				ajax({
					url:"/update", data:myData,callback:function(data, textStatus, jqXHR){

					//$.ajax({url:"/update", data:myData}).always(function (data, textStatus, jqXHR) { 
					$('#box32View option').prop('selected', false);
					}
				});
			}
	});
	

	$('#formProductAPIConf').validate({
			submitHandler: function(form) {
				$('#box32View option').prop('selected', true);
				var myData = {query:{productId:$('#selProduct').val()},set:{conf:{maxHits:$('#maxHits').val()}},addIfNotExists:true,_module:'/productAPIs'};			
				ajax({
					url:"/update", data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/update", data:myData}).always(function (data, textStatus, jqXHR) { 
					$('#box32View option').prop('selected', false);
					}
				});
			}
	});
	
	$('#formSelProduct').submit();
	$('#tblProductAPIList').dataTable();
}