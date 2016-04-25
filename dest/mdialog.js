/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var dialog = __webpack_require__(1);

	exports.dialog = window.dialog = window.mdialog = dialog;

	dialog.alert = __webpack_require__(7);
	dialog.loading = __webpack_require__(8);
	dialog.toast = __webpack_require__(10);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var base = __webpack_require__(2);
	var dom = __webpack_require__(3);
	var uibase = __webpack_require__(5);
	var htmlfn = __webpack_require__(6);

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



/***/ },
/* 2 */
/***/ function(module, exports) {

	

	function isNone(o){
		var type = typeof o;
		return type === 'null' || type === 'undefined';
	}

	exports.isNone = isNone;

	var types = {};
	function typestr(o){
		var t = Object.prototype.toString.call(o);
		if(types[t]) return types[t];
		var st = t.replace(/\[object\s+(\w+)\]/i,'$1').toLocaleLowerCase();
		return types[t] = st;
	}

	exports.type = typestr;

	function noop(){}

	exports.noop = noop;

	function each(list,fn,space){
		var type = typestr(list),i;
		fn = fn || noop;
		if(type === 'object'){
			for(i in list){
				if(list.hasOwnProperty(i)){
					if(fn(list[i],i,list) === false) return false;
				}
			}
		}else if(type === 'array'){
			for(i=0;i<list.length;i++){
				if(fn(list[i],i,list) === false) return false;
			}
		}
		return true;
	}

	exports.each = each;

	function mix(target){
		var sources = [].slice.call(arguments,1);
		each(sources,function(source,i){
			each(source,function(val,key){
				target[key] = val;
			});
		});
		return target;
	}

	exports.mix = mix;

	function trim(str){
		return (str||'').replace(/^\s+|\s+$/mg,'');
	}

	exports.trim = trim;

	function indexOf(list,target){
		var index = -1;
		each(list,function(item,i){
			if(item === target){
				index = i;
				return false;
			}
		});
		return index;
	}

	exports.indexOf = indexOf;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var base = __webpack_require__(2);
	var dom = __webpack_require__(3);
	var event = __webpack_require__(4);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	

	exports.on = function(el,type,fn){
		el.addEventListener(type,fn,false);
	}

	exports.off = function(el,type,fn){
		el.removeEventListener(type,fn,false);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var dom = __webpack_require__(3);

	function getElementPosByPage(el){
		var left = 0;
		var top = 0;
		if(el){
			if(el.getBoundingClientRect){
				var obj = el.getBoundingClientRect();
				left = obj.left;
				top = obj.top;
			}else{
				do{
					top += el.offsetTop || 0;
					left += el.offsetLeft || 0;
				}while(el = el.offsetParent);
			}
		}
		return {
			left:left,
			top:top
		}
	}

	exports.EBPP = getElementPosByPage;

	function getElementSize(el){
		return {
			width:el.offsetWidth || 0,
			height:el.offsetHeight || 0
		}
	}

	exports.ES = getElementSize;

	var index = 100;
	function getTopIndex(){
		return index++;
	}

	exports.topIndex = getTopIndex;

	function setTopIndex(el){
		el.css('z-index',getTopIndex());
	}

	exports.setTopIndex = setTopIndex;

	function setCenter(el){
		el = dom.$(el);
		el.each(function(){
			var size = getElementSize(this);
			var e = dom.$(this);
			e.css('margin-left',-(size.width/2)+'px');
			e.css('margin-top',-(size.height/2)+'px');
		});
	}

	exports.setCenter = setCenter;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="mdialog-box ' +
	((__t = (classs)) == null ? '' : __t) +
	'">\n	<div class="mdialog-padding">\n		';
	if(useClose){;
	__p += '\n		<span class="mdialog-close">x</span>\n		';
	};
	__p += '\n		';
	if(useTitle){;
	__p += '\n		<div class="mdialog-head">\n			<h3>' +
	((__t = (title)) == null ? '' : __t) +
	'</h3>\n		</div>\n		';
	};
	__p += '\n		<div class="mdialog-body">\n			' +
	((__t = (content)) == null ? '' : __t) +
	'\n		</div>\n		';
	if(useButton){;
	__p += '\n		<div class="mdialog-buttons"></div>\n		';
	};
	__p += '\n	</div>\n</div>';

	}
	return __p
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var base = __webpack_require__(2);
	var dialog = __webpack_require__(1);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var dialog = __webpack_require__(1);
	var Spinner = __webpack_require__(9);

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

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 *
	 * Example:
	    var opts = {
	      lines: 12,            // The number of lines to draw
	      length: 7,            // The length of each line
	      width: 5,             // The line thickness
	      radius: 10,           // The radius of the inner circle
	      scale: 1.0,           // Scales overall size of the spinner
	      corners: 1,           // Roundness (0..1)
	      color: '#000',        // #rgb or #rrggbb
	      opacity: 1/4,         // Opacity of the lines
	      rotate: 0,            // Rotation offset
	      direction: 1,         // 1: clockwise, -1: counterclockwise
	      speed: 1,             // Rounds per second
	      trail: 100,           // Afterglow percentage
	      fps: 20,              // Frames per second when using setTimeout()
	      zIndex: 2e9,          // Use a high z-index by default
	      className: 'spinner', // CSS class to assign to the element
	      top: '50%',           // center vertically
	      left: '50%',          // center horizontally
	      shadow: false,        // Whether to render a shadow
	      hwaccel: false,       // Whether to use hardware acceleration (might be buggy)
	      position: 'absolute'  // Element positioning
	    };
	    var target = document.getElementById('foo');
	    var spinner = new Spinner(opts).spin(target);
	 */
	  'use strict';

	  var prefixes = ['webkit', 'Moz', 'ms', 'O']; // Vendor prefixes
	  var animations = {}; // Animation rules keyed by their name
	  var useCssAnimations; // Whether to use CSS animations or setTimeout
	  var sheet; // A stylesheet to hold the @keyframe or VML rules

	  /**
	   * Utility function to create elements. If no tag name is given,
	   * a DIV is created. Optionally properties can be passed.
	   */
	  function createEl(tag, prop) {
	    var el = document.createElement(tag || 'div');
	    var n;

	    for (n in prop) el[n] = prop[n];
	    return el;
	  }

	  /**
	   * Appends children and returns the parent.
	   */
	  function ins(parent /* child1, child2, ...*/) {
	    for (var i = 1, n = arguments.length; i < n; i++) {
	      parent.appendChild(arguments[i]);
	    }

	    return parent;
	  }

	  /**
	   * Creates an opacity keyframe animation rule and returns its name.
	   * Since most mobile Webkits have timing issues with animation-delay,
	   * we create separate rules for each line/segment.
	   */
	  function addAnimation(alpha, trail, i, lines) {
	    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-');
	    var start = 0.01 + i/lines * 100;
	    var z = Math.max(1 - (1-alpha) / trail * (100-start), alpha);
	    var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase();
	    var pre = prefix && '-' + prefix + '-' || '';

	    if (!animations[name]) {
	      sheet.insertRule(
	        '@' + pre + 'keyframes ' + name + '{' +
	        '0%{opacity:' + z + '}' +
	        start + '%{opacity:' + alpha + '}' +
	        (start+0.01) + '%{opacity:1}' +
	        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
	        '100%{opacity:' + z + '}' +
	        '}', sheet.cssRules.length);

	      animations[name] = 1;
	    }

	    return name;
	  }

	  /**
	   * Tries various vendor prefixes and returns the first supported property.
	   */
	  function vendor(el, prop) {
	    var s = el.style;
	    var pp;
	    var i;

	    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
	    if (s[prop] !== undefined) return prop;
	    for (i = 0; i < prefixes.length; i++) {
	      pp = prefixes[i]+prop;
	      if (s[pp] !== undefined) return pp;
	    }
	  }

	  /**
	   * Sets multiple style properties at once.
	   */
	  function css(el, prop) {
	    for (var n in prop) {
	      el.style[vendor(el, n) || n] = prop[n];
	    }

	    return el;
	  }

	  /**
	   * Fills in default values.
	   */
	  function merge(obj) {
	    for (var i = 1; i < arguments.length; i++) {
	      var def = arguments[i];
	      for (var n in def) {
	        if (obj[n] === undefined) obj[n] = def[n];
	      }
	    }
	    return obj;
	  }

	  /**
	   * Returns the line color from the given string or array.
	   */
	  function getColor(color, idx) {
	    return typeof color == 'string' ? color : color[idx % color.length];
	  }

	  // Built-in defaults

	  var defaults = {
	    lines: 12,            // The number of lines to draw
	    length: 7,            // The length of each line
	    width: 5,             // The line thickness
	    radius: 10,           // The radius of the inner circle
	    scale: 1.0,           // Scales overall size of the spinner
	    corners: 1,           // Roundness (0..1)
	    color: '#000',        // #rgb or #rrggbb
	    opacity: 1/4,         // Opacity of the lines
	    rotate: 0,            // Rotation offset
	    direction: 1,         // 1: clockwise, -1: counterclockwise
	    speed: 1,             // Rounds per second
	    trail: 100,           // Afterglow percentage
	    fps: 20,              // Frames per second when using setTimeout()
	    zIndex: 2e9,          // Use a high z-index by default
	    className: 'spinner', // CSS class to assign to the element
	    top: '50%',           // center vertically
	    left: '50%',          // center horizontally
	    shadow: false,        // Whether to render a shadow
	    hwaccel: false,       // Whether to use hardware acceleration
	    position: 'absolute'  // Element positioning
	  };

	  /** The constructor */
	  function Spinner(o) {
	    this.opts = merge(o || {}, Spinner.defaults, defaults);
	  }

	  // Global defaults that override the built-ins:
	  Spinner.defaults = {};

	  merge(Spinner.prototype, {
	    /**
	     * Adds the spinner to the given target element. If this instance is already
	     * spinning, it is automatically removed from its previous target b calling
	     * stop() internally.
	     */
	    spin: function(target) {
	      this.stop();

	      var self = this;
	      var o = self.opts;
	      var el = self.el = createEl(null, {className: o.className});

	      css(el, {
	        position: o.position,
	        width: 0,
	        zIndex: o.zIndex,
	        left: o.left,
	        top: o.top
	      });

	      if (target) {
	        target.insertBefore(el, target.firstChild || null);
	      }

	      el.setAttribute('role', 'progressbar');
	      self.lines(el, self.opts);

	      if (!useCssAnimations) {
	        // No CSS animation support, use setTimeout() instead
	        var i = 0;
	        var start = (o.lines - 1) * (1 - o.direction) / 2;
	        var alpha;
	        var fps = o.fps;
	        var f = fps / o.speed;
	        var ostep = (1 - o.opacity) / (f * o.trail / 100);
	        var astep = f / o.lines;

	        (function anim() {
	          i++;
	          for (var j = 0; j < o.lines; j++) {
	            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);

	            self.opacity(el, j * o.direction + start, alpha, o);
	          }
	          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
	        })();
	      }
	      return self;
	    },

	    /**
	     * Stops and removes the Spinner.
	     */
	    stop: function() {
	      var el = this.el;
	      if (el) {
	        clearTimeout(this.timeout);
	        if (el.parentNode) el.parentNode.removeChild(el);
	        this.el = undefined;
	      }
	      return this;
	    },

	    /**
	     * Internal method that draws the individual lines. Will be overwritten
	     * in VML fallback mode below.
	     */
	    lines: function(el, o) {
	      var i = 0;
	      var start = (o.lines - 1) * (1 - o.direction) / 2;
	      var seg;

	      function fill(color, shadow) {
	        return css(createEl(), {
	          position: 'absolute',
	          width: o.scale * (o.length + o.width) + 'px',
	          height: o.scale * o.width + 'px',
	          background: color,
	          boxShadow: shadow,
	          transformOrigin: 'left',
	          transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)',
	          borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	        });
	      }

	      for (; i < o.lines; i++) {
	        seg = css(createEl(), {
	          position: 'absolute',
	          top: 1 + ~(o.scale * o.width / 2) + 'px',
	          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
	          opacity: o.opacity,
	          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	        });

	        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}));
	        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')));
	      }
	      return el;
	    },

	    /**
	     * Internal method that adjusts the opacity of a single line.
	     * Will be overwritten in VML fallback mode below.
	     */
	    opacity: function(el, i, val) {
	      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
	    }

	  });


	  function initVML() {

	    /* Utility function to create a VML tag */
	    function vml(tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
	    }

	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

	    Spinner.prototype.lines = function(el, o) {
	      var r = o.scale * (o.length + o.width);
	      var s = o.scale * 2 * r;

	      function grp() {
	        return css(
	          vml('group', {
	            coordsize: s + ' ' + s,
	            coordorigin: -r + ' ' + -r
	          }),
	          { width: s, height: s }
	        );
	      }

	      var margin = -(o.width + o.length) * o.scale * 2 + 'px';
	      var g = css(grp(), {position: 'absolute', top: margin, left: margin});
	      var i;

	      function seg(i, dx, filter) {
	        ins(
	          g,
	          ins(
	            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
	            ins(
	              css(
	                vml('roundrect', {arcsize: o.corners}),
	                {
	                  width: r,
	                  height: o.scale * o.width,
	                  left: o.scale * o.radius,
	                  top: -o.scale * o.width >> 1,
	                  filter: filter
	                }
	              ),
	              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
	              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        );
	      }

	      if (o.shadow)
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
	        }

	      for (i = 1; i <= o.lines; i++) seg(i);
	      return ins(el, g);
	    };

	    Spinner.prototype.opacity = function(el, i, val, o) {
	      var c = el.firstChild;
	      o = o.shadow && o.lines || 0;
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild;
	        if (c) c.opacity = val;
	      }
	    };
	  }

	  if (typeof document !== 'undefined') {
	    sheet = (function() {
	      var el = createEl('style', {type : 'text/css'});
	      ins(document.getElementsByTagName('head')[0], el);
	      return el.sheet || el.styleSheet;
	    }());

	    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'});

	    if (!vendor(probe, 'transform') && probe.adj) initVML();
	    else useCssAnimations = vendor(probe, 'animation');
	  }

	module.exports = Spinner;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	var dialog = __webpack_require__(1);

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

/***/ }
/******/ ]);