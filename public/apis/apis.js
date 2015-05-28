function apisController(){
	$('#formAPIs').validate({
		rules: {
			name:{
				required: true,
				formatedNames: true
			},
			apiSource:{
				required: true
//				formatedNames: true
			},
			apiType:{
				required: true
//				formatedNames: true
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
			var myData = $('#formAPIs').serialize();		

			var apiAttrName = '';
				$('#tblAPI > tbody > tr').each(function() {
				//alert(jQuery.parseJSON($(this).find('a').text()));
					apiAttrName += '&apiAttrName='+$(this).find('a').text();
				});	
			myData += apiAttrName;
			myData += '&_module=/apis';
				ajax({
					url:"/save", data:myData,callback:function(data, textStatus, jqXHR){
						var classType = 'btn-info';
						var respMessg = 'API Id : '+data.apiId;
						if(data.message.indexOf('Failure')>-1){
							classType = 'btn-warning';
							respMessg = 'Error : ';
							for(var id in data.error.errors){
								respMessg += id+' : '+data.error.errors[id].message+'<br/>';
							}
							$('#formAPIs > .form-group').removeClass('has-success').addClass('has-error');
						} else {				
							$('#formAPIs').find('INPUT[type="reset"]').click();
						}

						$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
						.insertBefore($('#formAPIs > div')[0]);
						$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
					}
			});			
		}
 });
	

  $('#formAPIsList').validate({
		submitHandler: function(form) {
			var myData = '_module=/apis';
				ajax({
					url:"/list", data:myData,callback:function(data, textStatus, jqXHR){

					//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					//console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
						
					 var oTable = $('#formAPIsList').find('table').dataTable();
					 oTable.fnClearTable();
					 var cnt = 0;
					 var dataLen = data.list.length;
					 while(cnt < dataLen){
						 oTable.fnAddData([data.list[cnt].name,(data.list[cnt].status==1)?'Active':'InActive','<button class="btn btn-primary"><i class="icon icon-download-alt"></i></button>'],false);
						 cnt++;
					 }				 
					 oTable.fnDraw();
					}
			});

		}
    });

	$('#formTestAPI').validate({
		submitHandler: function(form) {
			var myData = {query:{collectionName:$('#apiSource').val()},set:{collectionRec:'{"'+$('#formTestAPI').serialize().replace(/&/g,'","').replace(/=/g,'":"')+'"}'},addIfNotExists:true,_module:'/apiTest'};
			var myUrl = '/save';
			
			if($('#apiSourceType').val() == '2'){
				myUrl = '/external';
				myData._module = $('#apiPath').val(); 
			}
			
			console.log('myUrl : '+myUrl);			
			ajax({
				url:myUrl, data:myData,callback:function(data, textStatus, jqXHR){
					//$.ajax({url:"/save", data:myData}).always(function (data, textStatus, jqXHR) { 
					//data = jQuery.parseJSON(data);
					//console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
					if($('#apiSourceType').val() == '2'){
							myUrl = '/external';
							buildTestAPIResponse('tabRaw','<pre>'+data+'</pre>');
							$('#radioAPIs').click();
							$('#aRaw').click();							
							return;
					}

					var classType = 'btn-info';
					var respMessg = 'API Id : '+data.apiId;
					if(data.message.indexOf('Failure')>-1){
						classType = 'btn-warning';
						respMessg = 'Error : ';
						for(var id in data.error.errors){
							respMessg += id+' : '+data.error.errors[id].message+'<br/>';
						}
						$('#formTestAPI > .form-group').removeClass('has-success').addClass('has-error');
					} /*else {				
						$('#formTestAPI').find('INPUT[type="reset"]').click();
					}*/

					$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
					.insertBefore($('#formTestAPI > div')[0]);
					$('#divInfoBar').fadeOut(3000,function(){$(this).remove()});
				}
			});							
			//$('#divApiResponse').html('<p>I beg your pardon?</p>');
		}
    });
	
	 $('#formTestAPIList').validate({
			submitHandler: function(form) {
				var myData = {query:{collectionName:$('#apiSource').val()},_module:'/apiTest'};
				ajax({
					url:"/list", data:myData,callback:function(data, textStatus, jqXHR){
						//$.ajax({url:"/list", data:myData}).always(function (data, textStatus, jqXHR) { 
						//data = jQuery.parseJSON(data);
						if(data.list.length > 0){
							data = buildTestAPIResponse('tabGrid',data);
							buildTestAPIResponse('tabJSON',data);
							buildTestAPIResponse('tabFacets',data);
							buildTestAPIResponse('tabXML',data);
						}
					}
				});

			}
	});


	 $('#formLucidTest').validate({
		rules: {
			q:{
				required: true
			},
			rows:{
				required: true,
				number: true
			},
			collection:{
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
			var myData = $('#formLucidTest').serialize();		
				ajax({
					url:"/lucid", data:myData,callback:function(data, textStatus, jqXHR){
						//$.ajax({url:"/lucid", data:myData}).always(function (data, textStatus, jqXHR) { 
						//data = jQuery.parseJSON(data);
						//alert(data.response);
						//$('#taApiRes').html(data);	
		//				alert(JSON.stringify(data));
						console.log('Recieved Response from Lucid '+data);
						console.log('>>> '+JSON.stringify(data.response));

		//				$('#divApiResponse').html(data);
						var myStr = {};
						var ids = [];
						for(var i=0;i<data.response.docs.length;i++){
							for(id in data.response.docs[i]){
								if(myStr[id]){
									myStr[id][myStr[id].length]  = data.response.docs[i][id];
								} else {
									ids[ids.length] = id;
									myStr[id] = new Array();
									myStr[id][myStr[id].length]  = data.response.docs[i][id];
								}
							}
						}
						tblList = document.getElementById('tblList');
						optStr = '';
						for(var i=0;i<ids.length;i++){
							optStr += '<br/><select id="sel'+ids[i]+'" onchange="setData('+i+')" style="width:200px">'
							optStr += '<option value="" selected>'+ids[i]+'</option>';
							for(var j=0;j<myStr[ids[i]].length;j++){
								optStr += '<option value="'+j+'">'+myStr[ids[i]][j]+'</option>';
							}
							optStr += '</select><br/>';
						}
						$('#divApiResponse').html(optStr);	
					}
			});			
		}
	});

}



	function bindAPIAttribute(){
			if($('#apiAttrName').val().length == ''){
				return false;
			}
			var apiName = $('#apiAttrName').val();
			var myArr = {};
			myArr[apiName] = {};
			if($('#attRequired').is(':checked')){
				myArr[apiName].required = true;
			}
			if($('#attUnique').is(':checked')){
				myArr[apiName].unique = true;
			}
			myArr[apiName].type = $('#attrType').val();
			$('#divAttrJSONFormat').html(JSON.stringify(myArr,null,'\t'));
			return JSON.stringify(myArr);
	}

	function fnAddAttr(){				
			if(bindAPIAttribute()){
				$('#tblAPI > tbody').append($('<tr><td><a href="#" onclick="setModal(this)" data-toggle="modal" data-target="#attributeDetails">'+bindAPIAttribute()+'</a><input type="button" class="btn btn-primary pull-right" value="-" onclick="$(this).parent().parent().remove();buildFormJSON()"></td></tr>'));
				$('#apiAttrName').val('');
				$('#apiAttrName').focus();
				buildFormJSON();
			}
			
	}
	
	_win.apiSchemaArr = '';
	function buildFormJSON(){
			var schemaArr = {};
			var attrChild = '';
			$('#tblAPI > tbody > tr').each(function() {
				//alert(jQuery.parseJSON($(this).find('a').text()));
				attrChild = jQuery.parseJSON($(this).find('a').text());
				for(id in attrChild){
					schemaArr[id] = attrChild[id];
					if(!schemaArr[id].title){
						schemaArr[id].title = id;
					}
					if(!schemaArr[id].type){
						schemaArr[id].type = 'String';
					}
					schemaArr[id].type = schemaArr[id].type.toLowerCase();
				}
			});
			$('#formTestAPI').html('');
			$('#divApiResponse').html('<< Test API Form Response >>');
			if(JSON.stringify(schemaArr) == '{}'){
				$('#formTestAPI').html('<< Test API Form >>');
				return;
			}
			_win.apiSchemaArr = schemaArr;
			$('#formTestAPI').jsonForm({
			schema: schemaArr//,
			/*onSubmit: function (errors, values) {
			}*/
		  });
		  layoutSettings();
		  $('<div class="form-actions">'+$('#formTestAPI').find('.form-actions').html()+'</div>').insertAfter($('#formTestAPI > div'));
		  $('#formTestAPI > div').find('.form-actions').remove();
		  $('#formTestAPI').find('.form-actions').html('<input type="reset" class="btn btn-warning" value="Reset" /> <input type="submit" value="Submit" class="btn btn-primary">');
		  $('#formTestAPI').find('.form-actions').css('text-align','center');
		  $('#formTestAPI').find('.form-actions').css('padding','3px');
		  $('#formTestAPI').find('INPUT:not(INPUT[type="submit"],INPUT[type="reset"])').addClass('form-control');
	}

	window.lastAttrRec = '';
	
	function setModal(othis){
		window.lastAttrRec = othis;
		var attJSON = jQuery.parseJSON($(othis).text());
		for(id in attJSON){
			$('#apiAttrName').val(id);
		}

	}

	function buildTestAPIResponse(oTab,data){
		switch(oTab){
			case 'tabGrid':
				var tblStr = '<table class="table table-striped table-bordered table-hover"><thead><tr>';
				for(var _id in _win.apiSchemaArr){
					tblStr += '<th>'+_id+'</th>';
				}
				tblStr += '</tr></thead><tbody></tbody></table>';
				$('#tabGrid').html(tblStr);

				var oTable = $('#tabGrid').find('table').dataTable();
				oTable.fnClearTable();
				var cnt = 0;
				var dataLen = data['list'][0].collectionRec.length;
				
				var testAPIRec = '';
				var testAPIParseRec = new Array();
				for(talI=0;talI<dataLen;talI++){
					data['list'][0].collectionRec[talI] = jQuery.parseJSON(data['list'][0].collectionRec[talI]);
					testAPIRec = data['list'][0].collectionRec[talI];
					testAPIParseRec = new Array();
					for (_id in testAPIRec)
					{
						testAPIParseRec[testAPIParseRec.length] = testAPIRec[_id];
					}
					oTable.fnAddData(testAPIParseRec,false);
				}
				testAPIRec = '';
				testAPIParseRec = '';
				tblStr = '';
				oTable.fnDraw();
				return data;
			break;
			case 'tabJSON':
					$('#tabJSON').html('<pre>'+JSON.stringify(data['list'][0].collectionRec,null,'\n\t').replace(/\"/g,'"')+'</pre>');
			break;
			case 'tabFacets':
				var myStr = {};
				var ids = [];
				_win.lastData = data.list[0].collectionRec;
				var testAPIRec = '';
				for(talI=0;talI<data.list[0].collectionRec.length;talI++){
					//data['list'][0].collectionRec[talI] = jQuery.parseJSON(data['list'][0].collectionRec[talI]);
					testAPIRec = data.list[0].collectionRec[talI];
					for(_id in testAPIRec){
						if(myStr[_id]){
							myStr[_id][myStr[_id].length]  = testAPIRec[_id];
						} else {
							ids[ids.length] = _id;
							myStr[_id] = new Array();
							myStr[_id][myStr[_id].length]  = testAPIRec[_id];
						}
					}
				}			
				
				var optStr = '';
				for(talI=0;talI<ids.length;talI++){
					optStr += '<div class="row"><select id="sel'+ids[talI]+'" onchange="setFacetFilter()" style="width:200px" class="form-control">'
					optStr += '<option value="" selected>'+ids[talI]+'</option>';
					for(talJ=0;talJ<myStr[ids[talI]].length;talJ++){
						optStr += '<option value="'+myStr[ids[talI]][talJ]+'">'+myStr[ids[talI]][talJ]+'</option>';
					}
					optStr += '</select></div>';
				}
				$('#tabFacets').html('<div class="row"><div class="col-lg-3" style="margin-left:20px">'+optStr+'</div><div class="col-lg-8"><pre id="preFacetFilterResult"></pre></div></div>');
				optStr = '';
				testAPIRec = '';
				myStr = {};
				ids = [];
				//$('#tabFacets').find($('SELECT')).chosen();
			break;
			case 'tabXML':
			break;
			case 'tabRaw':
				$('#'+oTab).text(data);
			break;
		}
	}

	function setFacetFilter(){
		var facetFilterRec = {};
		$('#preFacetFilterResult').html('');
		$('#tabFacets').find($('SELECT')).each(function(){
			if($(this).val() != ''){
				facetFilterRec[$(this).attr('id').replace('sel','')] = $(this).val();
			}
		});
		var isRecMatch = false;
		for (ffI=0,ffJ=1;ffI<_win.lastData.length;ffI++ ){
				for(_id in facetFilterRec){
					isRecMatch = true;
					if(facetFilterRec[_id] != _win.lastData[ffI][_id]){
						isRecMatch = false;
						break;
					}
				}
				if(isRecMatch){
					$('#preFacetFilterResult').append('<strong><u>Rec '+ffJ+' :</strong></u><br/>');
					ffJ++;
					$('#preFacetFilterResult').append(JSON.stringify(_win.lastData[ffI],null,'\n\t').replace(/\"/g,'"')+'<br/>');
				}
		}
		facetFilterRec = '';
	}

