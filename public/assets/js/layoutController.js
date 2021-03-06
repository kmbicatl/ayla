var _win = {};

_win.formParams = {}

_win.setActivePanelParams = function(oActivePanelId){
	if(this.activePanelId == oActivePanelId)return false; 

	this.activePanelId	= oActivePanelId;
	this.activeMode		= this.activePanelId.replace('cont','');
	this.activeModule	= this.activeMode.toLowerCase();
	this.loadPage		= this.activeModule+'/'+_win.activeModule+'.html';
	this.getFormName	= function(oFormName){
		if($('#form'+oFormName).length > 0){
			return oFormName;
		} else {
			return _win.activeMode;
		}
	}
	return this;
}

$('.quick-btn').click(function(){
	if(_win.setActivePanelParams($(this).attr('href').replace('#',''))){
		$.ajax({url:_win.loadPage}).always(function(data){
			$('#'+_win.activePanelId).html(data);	
			initForm();
		});
	}

});

function initForm(){
	layoutSettings();
}

function layoutSettings(){
	$('#content').css({'min-width':'0px','right':'-20'});
	$.configureBoxes();
	quickButtonSettings();
	formSwitchSettings();
	cssOverrides();
	customScript();
	skin();

	function quickButtonSettings(){
			$('.quick-btn').css({color:'#fff'});
			//$('.quick-btn:active').addClass('btn-metis-3');
			$('.quick-btn').click(function () {
				$('.quick-btn').removeClass('btn-metis-3');
				$(this).addClass('btn-metis-3');				
				var activeForm = $(this).attr('href') + ' > div > div > form';
				if($(this).attr('href').substr(5) == 'Access'){
						$('#formSelRole').submit();
					//$('#formSelRole').find('SELECT[id="selRole"]').chosen();
				}
				//console.log(activeForm);
				$(activeForm).addClass('magictime swap');
				//set timer to 1 seconds, after that, unload the magic animation
				setTimeout(function () {
					$(activeForm).removeClass('magictime swap');
				}, 1000);
				
			});	
	}

	function formSwitchSettings(){
		$('.make-switch:not(.has-switch').each(function(){
			$(this)['bootstrapSwitch']();
			$(this).find('.switch-left').html('<i class="icon-th-list"></i>');
			$(this).find('.switch-right').html('<i class="icon-plus"></i>');
			$(this).find('.switch-animate > label').html('Create'); 
		//	$('#radioAPIsResponse').parent().find('.switch-left').html('<i class="icon-file-text-alt"></i>');
		//	$('#radioAPIsResponse').parent().find('.switch-right').html('<i class="icon-code"></i>');
		//	$('label[for="radioAPIsResponse"]').html('Page'); 
			/*$('form').each(function(){
				if($(this).attr('id').indexOf('List')>-1){
					$(this).toggle();
				}
			});*/
			var _actvRadio = $(this).find('input[type="radio"]');
			var _actvFormName = $(_actvRadio).attr('id').replace('radio','');
			$('#form'+_win.getFormName(_actvFormName)+'List').toggle();
			$(_actvRadio).change(function(){
				var radioName = $(this).attr('id').replace('radio','');
				$(this).parent().find('label').html((this.checked)?'Create':'List');
				/*if($(this).attr('id') == 'radioAPIsResponse'){
					$(this).parent().find('label').html((this.checked)?'Page':'JSON');
				}*/
				_win.formMode = (this.checked)?'Form':'List';
				 $('#form'+_win.getFormName(radioName)).toggle({direction:'left'});
				 $('#form'+_win.getFormName(radioName)+'List').toggle({direction:'right'});
				 if(!this.checked){
					  $('#form'+_win.getFormName(radioName)+'List').submit();
					// $('#form'+actvMode+'List').find('table').dataTable();
				 }
			});		
		});
	}

	function cssOverrides(){
		$('.inner').css('min-height','0px');
		$('.tab-content').css('padding','20px');
		
		if(_win.activeModule == 'users'){
			//$('#divSelUserId').css('text-align','center');
		}else if(_win.activeModule == 'access'){
			$('.chosen-results').css('background-color','gray');
		}else if(_win.activeModule == 'apis'){
			$('.col-lg-3,.col-lg-6').css('padding','0.5px');
			$('#divAttrList').css('max-height','150px');
			$('#divAttrList').css('overflow','auto');

			$('#formTestAPI > div').css('max-height','305px');
			$('#formTestAPI > div').css('overflow','auto');
			$('#formTestAPI > div').removeClass('col-lg-12').addClass('col-lg-12');

			//$('#divApiResponse').css('max-height','350px');
			//$('#divApiResponse').css('overflow','auto');
			$('#divApiResponse').removeClass('col-lg-12').addClass('col-lg-12');
			$('#formTestAPIList').find('.tab-content').css('padding','0px');
			$('#formTestAPIList').find('.tab-content').css('margin','0px');
			$('#formTestAPIList').find('.tab-content').css('height','300px');
			$('#formTestAPIList').find('.tab-content').css('max-height','300px');
			$('#formTestAPIList').find('.tab-content').css('overflow','auto');
			
		}
	}

	function customScript(){
		if(_win.activeModule == 'apis'){
			//$('.panel .panel-primary').css('height',$('.panel .panel-primary').innerHeight()+'px');
		} else if(_win.activeModule == 'users'){
				_win.dualBoxActiveForm = 'formUserRoles';
		} else if(_win.activeModule == 'access'){
			_win.dualBoxActiveForm = 'formRoleProducts';
		} else if(_win.activeModule == 'productbuilder'){
			 _win.dualBoxActiveForm = 'formProductAPIs';
		}
		console.log(_win.activeModule+' : _win.dualBoxActiveForm : '+_win.dualBoxActiveForm);
	}

	function skin(){
		//$('#top .navbar').css('background-color','red');//To Change Navigation Bar Color
	}

}