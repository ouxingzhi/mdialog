

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