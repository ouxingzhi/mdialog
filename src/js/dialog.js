
var base = require('./base.js');
var dom = require('./dom.js');
var uibase = require('./uibase.js');
var htmlfn = require('ejs!./dialog.html');

var STATUS_SHOW = 'show';
var STATUS_CLOSE = 'close';

var defaultOptions = {
	container:'body',
	title:'',
	useTitle:true,
	content:'',
	useClose:true,
	buttons:[],
	useButton:true,
	classs:'',
	useMask:true,
	timer:false
};

function buildButtons(btns){
	var self = this;
	var box = dom.$();
	base.each(btns,function(o,i){
		var btnbox = dom.$([
			'<span class="mdialog-btn-item">',
				'<button'+(o.cls ? (' class="'+o.cls+'"') : '')+'>'+o.title+'</button>',
			'</span>'
		].join(''));
		var btn = btnbox.find('button');
		if(o.click){
			btn.on('click',function(){
				o.click.apply(self,arguments);
			});
		}
		if(o.events){
			base.each(o.events,function(fn,type){
				btn.on(type,function(){
					fn.apply(self,arguments);
				});
			});
		}
		box.add(btnbox)
	});
	return box;
}

function dialog(ops){
	ops = base.mix({},defaultOptions,ops);

	this.status = STATUS_CLOSE;

	this.elroot;

	this.elcontent;

	this.elbutton;

	this.offset = function(left,top){
		return {
			left:left,
			top:top+60
		}
	}

	this.onPreShow = base.noop;

	this.onShow = base.noop;

	this.onClose = base.noop;

	this.elmask = dom.$('<div class="mdialog-mask"></div>');
	this.elmask.hide();
	this.elmask.on('touchmove',function(e){
		e.preventDefault();
		e.stopPropagation();
	});

	this.setOption(ops);
	this.init();
}


dialog.prototype = {
	constructor:dialog,
	setOption:function(ops){
		if(!base.isNone(ops.container)){
			this.container = dom.$(ops.container);
		}
		if(!base.isNone(ops.title)){
			this.title = ops.title;
		}
		if(!base.isNone(ops.useTitle)){
			this.useTitle = ops.useTitle;
		}
		if(!base.isNone(ops.content)){
			this.content = ops.content;
		}
		if(!base.isNone(ops.useClose)){
			this.useClose = ops.useClose;
		}
		if(!base.isNone(ops.buttons)){
			this.buttons = ops.buttons;
		}
		if(!base.isNone(ops.useButton)){
			this.useButton = ops.useButton;
		}
		if(!base.isNone(ops.classs)){
			this.classs = ops.classs;
		}
		if(!base.isNone(ops.useMask)){
			this.useMask = ops.useMask;
		}
		if(!base.isNone(ops.timer)){
			this.timer = ops.timer;
		}
		if(!base.isNone(ops.offset)){
			this.offset = ops.offset;
		}
		if(!base.isNone(ops.onPreShow)){
			this.onPreShow = ops.onPreShow;
		}
		if(!base.isNone(ops.onShow)){
			this.onShow = ops.onShow;
		}
		if(!base.isNone(ops.onClose)){
			this.onClose = ops.onClose;
		}
	},
	init:function(){

	},
	initDom:function(){

		if(this.useMask){
			this.elmask.hide();
			this.container.append(this.elmask);
			this.elmask.css('z-index',uibase.topIndex());
		}
		
		this.elroot = dom.$(htmlfn(this));
		this.elcontent = this.elroot.find('.mdialog-body');
		this.elbutton = this.elroot.find('.mdialog-buttons');
		if(this.useButton){
			var btns = buildButtons.call(this,this.buttons);
			this.elbutton.append(btns);
		}
		this.elroot.hide();
		this.container.append(this.elroot);
	},
	calcRoomPos:function(){
		var size = uibase.ES(this.elroot[0]);
		var left = size.width/2;
		var top = size.height/2;
		if(this.offset){
			pos = this.offset(left,top);
			left = pos.left;
			top = pos.top;
		}
		this.elroot.css('margin-left',-left+'px');
		this.elroot.css('margin-top',-top+'px');
	},
	show:function(ops){
		if(ops){
			this.setOption(ops);
		}
		
		this.initDom();
		if(this.useMask){
			uibase.setTopIndex(this.elmask);
		}
		uibase.setTopIndex(this.elroot);
		this.elroot.show();
		this.calcRoomPos();
		this.elroot.hide();
		this.onPreShow();
		this.showAction(function(){
			if(this.useMask){
				this.elmask.show();
			}
			this.elroot.show();
			this.calcRoomPos();
			this.onPreShow();
		},this.elroot,this.useMask?this.elmask:null);
		
	},
	showAction:function(callback,root,mask){
		callback.call(this);
	},
	close:function(){
		this.closeAction(function(){
			this.elroot.remove();
			if(this.useMask){
				this.elmask.remove();
			}
			this.onClose();
		},this.elroot,this.useMask?this.elmask:null);
		
	},
	closeAction:function(callback,root,mask){
		callback.call(this);
	}
}

module.exports = dialog;

