
var base = require('./base.js');
var dom = require('./dom.js');
var event = require('./event.js');

var slice = [].slice;
var splice = [].splice;

var domReg = /^<.+>$/mg;

function $(selector,root){
	
	var els,tmp;
	if(base.type(selector) === 'string'){
		selector = base.trim(selector);
		if(selector.match(domReg)){
			tmp = document.createElement('div');
			tmp.innerHTML = selector;
			els = slice.call(tmp.childNodes);
		}else{
			els = slice.call((root||document).querySelectorAll(selector));
		}
	}else if(base.type(selector) === 'array'){
		els = selector;
	}else if(base.type(selector).indexOf('element')>-1){
		els = [selector];
	}else{
		els = [];
	}
	els.__proto__ = domProto;
	return els;
}

var domProto = {
	__proto__:Array.prototype,
	each:function(fn){
		base.each(this,function(el,i){
			fn.call(el,i,el);
		});
		return this;
	},
	show:function(){
		this.each(function(i){
			this.style.display = '';
		});
		return this;
	},
	hide:function(){
		this.each(function(i){
			this.style.display = 'none';
		});
		return this;
	},
	append:function(node){
		this.each(function(i,el){
			if(base.type(node) === 'array'){
				base.each(node,function(ell,ii){
					el.appendChild(ell);
				});
			}
		});
		return this;
	},
	on:function(type,fn){
		this.each(function(){
			event.on(this,type,fn);
		});
		return this;
	},
	off:function(type,fn){
		this.each(function(){
			event.off(this,type,fn);
		});
		return this;
	},
	add:function(nodes){
		var self = this;
		if(base.type(nodes)==='array'){
			base.each(nodes,function(el,i){
				if(base.indexOf(self,el) === -1){
					self.push(el);
				}
			});
		}else{
			if(base.indexOf(this,nodes) === -1){
				this.push(nodes);
			}
		}
		return this;
	},
	find:function(selector){
		var l = dom.$();
		this.each(function(){
			l.add($(selector,this));
		});
		return l;
	},
	remove:function(){
		this.each(function(){
			if(this.parentNode){
				this.parentNode.removeChild(this);
			}
		})
	},
	css:function(name,value){
		this.each(function(){
			this.style[name] = value;
		});
	}
};



exports.$ = $;