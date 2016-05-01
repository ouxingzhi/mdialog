
var base = require('./base.js');
var dialog = require('./dialog.js');

var instances = {};

var defaultInstanceName = 'default';

function toast(content,timeout,callback,name){

	name = name || defaultInstanceName;

	if(instances[name]){
		instances[name].close();
		instances[name] = null;
	}

	instances[name] = new dialog({
		container:'body',
		useTitle:false,
		content:content,
		useClose:false,
		useButton:false,
		classs:'mdialog-toast',
		useMask:true,
		look:true,
		onPreShow:function(){
			this.elroot.on('click',closefn);
			this.elmask.on('click',closefn);
		}
	});
	if(timeout){
		setTimeout(function(){
			instances[name] && instances[name].close();
			if(callback){
				callback();
			}
		},timeout*1000);
	}

	var closefn = function(){
		instances[name] && instances[name].close();
	}
	
	
	instances[name].show();
	return instances[name];
}

toast.close = function(name){
	name = name || defaultInstanceName;
	if(instances[name]){
		instances[name].close();
	}
}

toast.closeAll = function(){
	base.each(instances,function(instance){
		if(instance){
			instance.close();
		}
	});
}

module.exports = toast;