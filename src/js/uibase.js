var dom = require('./dom.js');

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