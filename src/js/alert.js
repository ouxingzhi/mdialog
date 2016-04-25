
var base = require('./base.js');
var dialog = require('./dialog.js');

var instances = {};

var defaultInstanceName = 'default';

function alert(obj,name){

	name = name || defaultInstanceName;

	obj = obj || {};

	function btnClick(){
		this.close();
	}

	var title = obj.title || '提示';
	var content = obj.content || '';
	var okTitle = obj.okTitle || '确定';
	var okHandler = obj.okHandler || btnClick;
	var okCls = 'mdialog-ok';
	var useOkBtn = base.isNone(obj.useOkBtn) ? true : obj.useOkBtn;
	var cancelTitle = obj.cancelTitle || '取消';
	var cancelHandler = obj.cancelHandler || btnClick;
	var cancelCls = 'mdialog-cancel';
	var useCancelBtn = base.isNone(obj.useCancelBtn) ? true : obj.useCancelBtn;
	var useButton = true;

	if(!useOkBtn && !useCancelBtn){
		useButton = false;
	}

	var buttons = [];

	if(useOkBtn){
		buttons.push({
			title:okTitle,
			click:okHandler,
			cls:okCls
		});
	}

	if(useCancelBtn){
		buttons.push({
			title:cancelTitle,
			click:cancelHandler,
			cls:cancelCls
		});
	}

	if(instances[name]){
		instances[name].close();
		instances[name] = null;
	}

	instances[name] = new dialog({
		container:'body',
		title:title,
		content:content,
		useClose:false,
		buttons:buttons,
		useButton:useButton,
		classs:'mdialog-alert',
		useMask:true
	});
		
	instances[name].show();
	
	return instances[name];
}

alert.close = function(name){
	name = name || defaultInstanceName;
	if(instances[name]){
		instances[name].close();
	}
}

alert.closeAll = function(){
	base.each(instances,function(instance){
		if(instance){
			instance.close();
		}
	});
}

module.exports = alert;