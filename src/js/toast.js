
var dialog = require('./dialog.js');

function toast(content,timeout,callback){

	var d = new dialog({
		container:'body',
		useTitle:false,
		content:content,
		useClose:false,
		useButton:false,
		classs:'mdialog-toast',
		useMask:true,
		onPreShow:function(){
			this.elroot.on('click',closefn);
			this.elmask.on('click',closefn);
		}
	});
	if(timeout){
		setTimeout(function(){
			d.close();
			if(callback){
				callback();
			}
		},timeout*1000);
	}

	var closefn = function(){
		d.close();
	}
	
	
	d.show();
	return d;
}

module.exports = toast;