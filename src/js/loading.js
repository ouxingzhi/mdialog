var base = require('./base.js');
var dialog = require('./dialog.js');
var Spinner = require('./spin.js');

var htmlfn = require('ejs!./loading.html');

var instances = {};

var defaultInstanceName = 'default';

function loading(name){

	name = name || defaultInstanceName;

	if(instances[name]){
		instances[name].close();
		instances[name] = null;
	}

	instances[name] = new dialog({
		container:'body',
		useTitle:false,
		content:htmlfn(),
		useClose:false,
		useButton:false,
		classs:'mdialog-loading',
		useMask:true,
		onPreShow:function(){
			var loader = this.elcontent.find('.loader')
			_getSpin(loader[0]);
		}
	});
	function _getSpin(target){
		var opts = {
		  lines: 13, // The number of lines to draw
		  length: 1, // The length of each line
		  width: 2, // The line thickness
		  radius: 10, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  color: '#fff', // #rgb or #rrggbb
		  speed: 1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: '50%', // Top position relative to parent in px
		  left: '50%' // Left position relative to parent in px
		};
		var spinner = new Spinner(opts).spin(target);
	}
	instances[name].show();
	
	return instances[name];
}

loading.close = function(name){
	name = name || defaultInstanceName;
	if(instances[name]){
		instances[name].close();
	}
}

loading.closeAll = function(){
	base.each(instances,function(instance){
		if(instance){
			instance.close();
		}
	});
}

module.exports = loading;