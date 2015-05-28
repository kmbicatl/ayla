function signupController(){
	$('#formLogin').validate({
	    rules: {
			clientId:{
				required: true
			},
			emailId:{
				required: true,
				string: true
			},
			password:{
				required: true,
				string: true
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
			var myData = $('#formLogin').serialize();
			ajax({
				url:"/oauth", method:'GET',data:myData,callback:function(data, textStatus, jqXHR){
				console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
				var classType = 'btn-info';
				var respMessg = 'Token : '+data.token;
				if(data.message.indexOf('Success')<0){
					classType = 'btn-warning';
					respMessg = 'Error : ';
					/*for(var id in data.error.errors){
						respMessg += id+' : '+data.error.errors[id].message+'<br/>';
					}*/
					$('#formLogin > .form-group').removeClass('has-success').addClass('has-error');
				} else {				
					//$('#formLogin').find('INPUT[type="reset"]').click();
					$('#token').val(data.token);
					$('#formLoginSuccess').submit();
					//location.href='inbox.html';
					//window.myData = data;
					//setAPIWindow();
				}

				$('<div id="divInfoBar" class="row" style="padding:30px"><div class="'+classType+' col-md-8 col-md-offset-2"><h5>Message : '+data.message+'!<br/>'+respMessg+'</h5></div></div>')
				.insertBefore($('#formLogin > div')[0]);
				$('#divInfoBar').fadeOut(3000,function(){$(this).remove()})
				}
			});

		}
    });
	
	
    $('#formUsers').validate({
	    rules: {
			clientId:{
				required: true
			},
			firstName:{
				required: true,
				string: true
			},
			lastName:{
				required: true,
				string: true
			},
			phoneNbr:{
				required: true,
				string: true
			},
			title:{
				required: true,
				string: true
			},
			emailId:{
				required: true,
				email: true
			},
			password:{
				required: true,
				string: true
			},
			companyName:{
				required: true,
				string: true
			},
			companyURL:{
				required: true,
				string: true
			},
			address:{
				required: true,
				string: true
			},
			city:{
				required: true,
				string: true
			},
			state:{
				required: true,
				string: true
			},
			zipCode:{
				required: true,
				number: true
			},
			country:{
				required: true,
				string: true
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
				myData += '&_module=/users';
			}
			_win.access_token = '0ftwtc+t2oVmQuAb9Tpxu3s6iuXfO15hkcb5PiQ+UYw=';
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
}

	function setAPIWindow(){
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


