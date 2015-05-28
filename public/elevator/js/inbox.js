function inboxController(){
    $('#formApp').validate({
	    rules: {
			name:{
				required: true,
				string: true
			},
			description:{
				string:true
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
			var myData = $('#formApp').serialize();
			if(myData.length > 0){
				myData += '&_module=/app';
			}
			ajax({
				url:"/save", method:'GET',data:myData,callback:function(data, textStatus, jqXHR){
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'User Id : '+data.userId;
				if(data.message.indexOf('Failure')>-1){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}
					$('#formApp > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					$('#formApp').find('INPUT[type="reset"]').click();
					
					getAppList();				
					
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formApp > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()})
				}
			});

		}
    });
}

function getAppList(){
	myData = '_module=/app';
	ajax({
		url:"/list", method:'GET',data:myData,callback:function(data, textStatus, jqXHR){
			console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
			var classType = 'btn-info';
			var respMessg = '';
			if(data.message.indexOf('Failure')>-1){
				classType = 'btn-warning';
				respMessg = 'Error : ';
				for(var id in data.error.errors){
					respMessg += id+' : '+data.error.errors[id].message+'<br/>';
				}
				$('#formApp > .form-group').removeClass('has-success').addClass('has-error');
			} else {
				//alert(JSON.stringify(data));
				 var oTable = $('#tblAppList').dataTable();
				 oTable.fnClearTable();
				 var cnt = 0;
				 var dataLen = data.list.length;
				 while(cnt < dataLen){
					 oTable.fnAddData(
					 	[
						 	data.list[cnt].appId,
						 	data.list[cnt].name,
						 	data.list[cnt].appToken,
						 	'<span class="sparkline txt-color-blue" data-sparkline-type="bar" data-sparkline-width="50px" data-sparkline-barwidth="5" data-sparkline-height="15px">1:3, 5:3, 2:7,9:1,5:6</span>'
					 	],false);
					//<a href="#" title="Token:'+data.list[cnt].appToken+'\nDaily Cnt:'+data.list[cnt].dailyCnt+'\nMonthly Cnt:'+data.list[cnt].monthlyCnt+'" class="btn btn-primary"><i class="fa fa-gears"></i></a>
 					 cnt++;
				 }				 
				 oTable.fnDraw();
				  
				 $('.sparkline').sparkline([3000,100], {
            type: 'bar',
            height: '35',
            barWidth: 30,
            barSpacing: 10,
            color:'green'
           }); 
            setAPIWindow();
			}
		}
	});	

}

	function setAPIWindow(){
		window.myData = {token:''};
		data = window.myData;
		str = '                <div class="close-modal" data-dismiss="modal" onclick="location.reload()">';
        str += '       			   <div class="lr">';
        str += '       			       <div class="rl">';
        str += '       			       </div>';
        str += '    		      </div>';
    	str += '          		</div>';
		k = 1,l=1;
		for(i=0;i<2;i++){
			str += 'Access Key for API: <h2>'+data.token+'</h2><div class="row pricing-section">';
					for(j=0;j<4;j++){
						if(k==1){
						str += '<div class="col-md-3">';
						str += '<div class="pricing-table">'+
                           '<div class="plan-name">'+
                           '     <h3>KH Patients</h3>'+
                           '</div>'+
                           ' <div class="plan-list">'+
                           '     <ul>'+
                           '         <li>KH App Patient Search <a href="#" onclick="getAPIDetails()"><i class="fa fa-code"></i></a></li>'+
                           '         <li>KH App Tumor Board <a href="#" onclick="getAPIDetails()"><i class="fa fa-code"></i></a></li>'+
                           '         <li>KH App Patient Reports <a href="#" onclick="getAPIDetails()"><i class="fa fa-code"></i></a></li>'+
                           '         <li>KH App Appointments <a href="#" onclick="getAPIDetails()"><i class="fa fa-code"></i></a></li>'+
                           '         <li>KH App Diagnosis History <a href="#" onclick="getAPIDetails()"><i class="fa fa-code"></i></a></li>'+
                           '     </ul>'+
                           ' </div>'+
                           '</div>'+
                          '</div>';										
						}else{
						str += '<div class="col-md-3">';
						str += '<div class="pricing-table">'+
                           '<div class="plan-name">'+
                           '     <h3>Category '+k+'</h3>'+
                           '</div>'+
                           ' <div class="plan-list">'+
                           '     <ul>'+
                           '         <li>API '+(l++)+'</li>'+
                           '         <li>API '+(l++)+'</li>'+
                           '         <li>API '+(l++)+'</li>'+
                           '         <li>API '+(l++)+'</li>'+
                           '         <li>API '+(l++)+'</li>'+
                           '     </ul>'+
                           ' </div>'+
                           '</div>'+
                          '</div>';
                         }
                          k++;
                    }
              str += '</div>';
         }
         $('#modelContent').html(str); 

	}
	
	function getAPIDetails(){
		str = '<div class="row pricing-section">';
		str += '<div class="col-md-4 col-md-offset-4">';
		str += '<div class="pricing-table">'+
           '<div class="plan-name">'+
           '     <h3>KH Patients</h3>'+
           '</div>'+
           ' <div class="plan-list">'+
           '     <ul>'+
     	   '     <h3>module : /khPatiens</h3>'+           
           '         <li>firstName - String - required</li>'+
           '         <li>lastName - String - required</li>'+
           '         <li>emailId - String - required</li>'+
           '     </ul>'+
           ' </div>'+
           '</div>'+
		   '<div class="plan-signup text-center">'+
             '<a href="#" class="btn-system btn-small" onclick="setAPIWindow()">Back <<</a>'+
           '</div>'+           
          '</div>'+
          '</div>';										
         $('#modelContent').html(str); 
	}


