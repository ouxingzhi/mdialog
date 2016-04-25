

exports.on = function(el,type,fn){
	el.addEventListener(type,fn,false);
}

exports.off = function(el,type,fn){
	el.removeEventListener(type,fn,false);
}
