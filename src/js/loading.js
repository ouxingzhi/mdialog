
var dialog = require('./dialog.js');
var Spinner = require('./spin.js');

function loading(timeout,callback){

	var d = new dialog({
		container:'body',
		useTitle:false,
		content:'',
		useClose:false,
		useButton:false,
		classs:'mdialog-loading',
		useMask:true,
		onPreShow:function(){
			_getSpin(this.elcontent[0]);
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
	d.show();
	return d;
}

module.exports = loading;