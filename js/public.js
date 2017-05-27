function hasClass(obj, cls) {
    return !!obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if(!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if(hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}else{
		ele["on"+type] = handler;
	}
}