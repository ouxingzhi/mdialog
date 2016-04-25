
var base = require('./base.js');
var dialog = require('./dialog.js');

function alert(obj){

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

	var d = new dialog({
		container:'body',
		title:title,
		content:content,
		useClose:false,
		buttons:buttons,
		useButton:useButton,
		classs:'mdialog-alert',
		useMask:true
	});
		
	d.show();
	
	return d;
}

module.exports = alert;