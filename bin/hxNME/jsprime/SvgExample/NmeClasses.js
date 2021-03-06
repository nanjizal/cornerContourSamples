(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
if (typeof($global['hxClasses'])=='undefined')  { $global['hxClasses']=$hxClasses; }  else { $hxClasses=$global['hxClasses']; }
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.escape = function(s) {
	return s.replace(EReg.escapeRe,"\\$&");
};
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe.Exception.thrown("EReg::matched");
		}
	}
	,matchedLeft: function() {
		if(this.r.m == null) {
			throw haxe.Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe.Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe.Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var EnumValue = {};
EnumValue.match = function(this1,pattern) {
	return false;
};
var Export = function() { };
$hxClasses["Export"] = Export;
Export.__name__ = "Export";
Export.main = function() {
	{ };
	{ };
	var global = $global;
	global.nmeClassesLoaded = true;
	global.__map_reserved = __map_reserved;
	var d = global.nmeOnClasses;
	if(typeof(d) == "function") {
		global.nmeOnClasses();
	}
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe.Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) {
			i = 0;
		}
	}
	while(i < len) {
		if(((a[i]) === obj)) {
			return i;
		}
		++i;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) {
		i = len - 1;
	} else if(i < 0) {
		i += len;
	}
	while(i >= 0) {
		if(((a[i]) === obj)) {
			return i;
		}
		--i;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.keyValueIter = function(a) {
	return new haxe.iterators.ArrayKeyValueIterator(a);
};
HxOverrides.now = function() {
	return Date.now();
};
var ImportAll = function() { };
$hxClasses["ImportAll"] = ImportAll;
ImportAll.__name__ = "ImportAll";
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		haxe.NativeStackTrace.lastError = _g;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.is = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.isOfType = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.downcast = function(value,c) {
	if(js.Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.instance = function(value,c) {
	if(js.Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCodePoint(c);
	}
	,addSub: function(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var haxe = {};
haxe.SysTools = function() { };
$hxClasses["haxe.SysTools"] = haxe.SysTools;
haxe.SysTools.__name__ = "haxe.SysTools";
haxe.SysTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	}
	if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	}
	return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
};
haxe.SysTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
		var result_b = "";
		var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += bs == null ? "null" : "" + bs;
					result_b += bs == null ? "null" : "" + bs;
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument,i);
			if(haxe.SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument;
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.contains = function(s,value) {
	return s.indexOf(value) != -1;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	buf_b += s == null ? "null" : "" + s;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.unsafeCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.iterator = function(s) {
	return new haxe.iterators.StringIterator(s);
};
StringTools.keyValueIterator = function(s) {
	return new haxe.iterators.StringKeyValueIterator(s);
};
StringTools.isEof = function(c) {
	return c != c;
};
StringTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	} else {
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
};
StringTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	var argument1 = argument;
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
		var result_b = "";
		var needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var _g2 = HxOverrides.cca(argument1,i);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += Std.string(bs);
					result_b += Std.string(bs);
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument1 = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var i = _g++;
			var c = HxOverrides.cca(argument1,i);
			if(haxe.SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument1;
	}
};
StringTools.utf16CodePointAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(c >= 55296 && c <= 56319) {
		c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
	}
	return c;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.getClass = function(o) {
	return js.Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	return c.__name__;
};
Type.getEnumName = function(e) {
	return e.__ename__;
};
Type.resolveClass = function(name) {
	return $hxClasses[name];
};
Type.resolveEnum = function(name) {
	return $hxEnums[name];
};
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
Type.createEmptyInstance = function(cl) {
	return Object.create(cl.prototype);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe.Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe.Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe.Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe.Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var _this = e.__constructs__;
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = _this[i]._hx_name;
	}
	return result;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js.Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		haxe.NativeStackTrace.lastError = _g;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
Type.enumIndex = function(e) {
	return e._hx_index;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__.slice();
};
var UInt = {};
UInt.add = function(a,b) {
	return a + b;
};
UInt.div = function(a,b) {
	return UInt.toFloat(a) / UInt.toFloat(b);
};
UInt.mul = function(a,b) {
	return a * b;
};
UInt.sub = function(a,b) {
	return a - b;
};
UInt.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a > b;
	}
};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a >= b;
	}
};
UInt.lt = function(a,b) {
	return UInt.gt(b,a);
};
UInt.lte = function(a,b) {
	return UInt.gte(b,a);
};
UInt.and = function(a,b) {
	return a & b;
};
UInt.or = function(a,b) {
	return a | b;
};
UInt.xor = function(a,b) {
	return a ^ b;
};
UInt.shl = function(a,b) {
	return a << b;
};
UInt.shr = function(a,b) {
	return a >>> b;
};
UInt.ushr = function(a,b) {
	return a >>> b;
};
UInt.mod = function(a,b) {
	return UInt.toFloat(a) % UInt.toFloat(b) | 0;
};
UInt.addWithFloat = function(a,b) {
	return UInt.toFloat(a) + b;
};
UInt.mulWithFloat = function(a,b) {
	return UInt.toFloat(a) * b;
};
UInt.divFloat = function(a,b) {
	return UInt.toFloat(a) / b;
};
UInt.floatDiv = function(a,b) {
	return a / UInt.toFloat(b);
};
UInt.subFloat = function(a,b) {
	return UInt.toFloat(a) - b;
};
UInt.floatSub = function(a,b) {
	return a - UInt.toFloat(b);
};
UInt.gtFloat = function(a,b) {
	return UInt.toFloat(a) > b;
};
UInt.equalsInt = function(a,b) {
	return a == b;
};
UInt.notEqualsInt = function(a,b) {
	return a != b;
};
UInt.equalsFloat = function(a,b) {
	return UInt.toFloat(a) == b;
};
UInt.notEqualsFloat = function(a,b) {
	return UInt.toFloat(a) != b;
};
UInt.gteFloat = function(a,b) {
	return UInt.toFloat(a) >= b;
};
UInt.floatGt = function(a,b) {
	return a > UInt.toFloat(b);
};
UInt.floatGte = function(a,b) {
	return a >= UInt.toFloat(b);
};
UInt.ltFloat = function(a,b) {
	return UInt.toFloat(a) < b;
};
UInt.lteFloat = function(a,b) {
	return UInt.toFloat(a) <= b;
};
UInt.floatLt = function(a,b) {
	return a < UInt.toFloat(b);
};
UInt.floatLte = function(a,b) {
	return a <= UInt.toFloat(b);
};
UInt.modFloat = function(a,b) {
	return UInt.toFloat(a) % b;
};
UInt.floatMod = function(a,b) {
	return a % UInt.toFloat(b);
};
UInt.negBits = function(this1) {
	return ~this1;
};
UInt.prefixIncrement = function(this1) {
	return ++this1;
};
UInt.postfixIncrement = function(this1) {
	return this1++;
};
UInt.prefixDecrement = function(this1) {
	return --this1;
};
UInt.postfixDecrement = function(this1) {
	return this1--;
};
UInt.toString = function(this1,radix) {
	return Std.string(UInt.toFloat(this1));
};
UInt.toInt = function(this1) {
	return this1;
};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var XmlType = {};
XmlType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "Element";
	case 1:
		return "PCData";
	case 2:
		return "CData";
	case 3:
		return "Comment";
	case 4:
		return "DocType";
	case 5:
		return "ProcessingInstruction";
	case 6:
		return "Document";
	}
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe.ds.StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = "Xml";
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe.Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,children: null
	,attributeMap: null
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.nodeName;
	}
	,set_nodeName: function(v) {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.nodeName = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, unexpected " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, unexpected " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _this = this.attributeMap;
		if(Object.prototype.hasOwnProperty.call(_this.h,att)) {
			delete(_this.h[att]);
		}
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h,att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe.ds._StringMap.StringMapKeyIterator(this.attributeMap.h);
	}
	,iterator: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe.iterators.ArrayIterator(this.children);
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe.iterators.ArrayIterator(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			var tmp;
			if(child.nodeType == Xml.Element) {
				if(child.nodeType != Xml.Element) {
					throw haxe.Exception.thrown("Bad node type, expected Element but found " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				tmp = child.nodeName == name;
			} else {
				tmp = false;
			}
			if(tmp) {
				_g.push(child);
			}
		}
		var ret = _g;
		return new haxe.iterators.ArrayIterator(ret);
	}
	,firstChild: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.children[0];
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) {
				return child;
			}
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,insertChild: function(x,pos) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			HxOverrides.remove(x.parent.children,x);
		}
		this.children.splice(pos,0,x);
		x.parent = this;
	}
	,toString: function() {
		return haxe.xml.Printer.print(this);
	}
	,ensureElementType: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
	}
	,__class__: Xml
	,__properties__: {set_nodeValue:"set_nodeValue",get_nodeValue:"get_nodeValue",set_nodeName:"set_nodeName",get_nodeName:"get_nodeName"}
};
var cpp = {};
cpp.Callable = {};
cpp.Callable.__properties__ = {get_call:"get_call"};
cpp.Callable._new = function(inValue) {
	var this1 = inValue;
	return this1;
};
cpp.Callable.get_call = function(this1) {
	return this1;
};
haxe.StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe.StackItem.__constructs__ = [haxe.StackItem.CFunction,haxe.StackItem.Module,haxe.StackItem.FilePos,haxe.StackItem.Method,haxe.StackItem.LocalFunction];
haxe.StackItem.__empty_constructs__ = [haxe.StackItem.CFunction];
haxe.CallStack = {};
haxe.CallStack.__properties__ = {get_length:"get_length"};
haxe.CallStack.get_length = function(this1) {
	return this1.length;
};
haxe.CallStack.callStack = function() {
	return haxe.NativeStackTrace.toHaxe(haxe.NativeStackTrace.callStack());
};
haxe.CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe.NativeStackTrace.toHaxe(haxe.NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe.CallStack.subtract(eStack,haxe.CallStack.callStack());
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var j = _g++;
			if(haxe.CallStack.equalItems(this1[i],stack[j])) {
				if(startIndex < 0) {
					startIndex = i;
				}
				++i;
				if(i >= this1.length) {
					break;
				}
			} else {
				startIndex = -1;
			}
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe.CallStack.copy = function(this1) {
	return this1.slice();
};
haxe.CallStack.get = function(this1,index) {
	return this1[index];
};
haxe.CallStack.asArray = function(this1) {
	return this1;
};
haxe.CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				var m2 = item2.m;
				var m1 = item1.m;
				return m1 == m2;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				var item21 = item2.s;
				var file2 = item2.file;
				var line2 = item2.line;
				var col2 = item2.column;
				var col1 = item1.column;
				var line1 = item1.line;
				var file1 = item1.file;
				var item11 = item1.s;
				if(file1 == file2 && line1 == line2 && col1 == col2) {
					return haxe.CallStack.equalItems(item11,item21);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				var class2 = item2.classname;
				var method2 = item2.method;
				var method1 = item1.method;
				var class1 = item1.classname;
				if(class1 == class2) {
					return method1 == method2;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				var v2 = item2.v;
				var v1 = item1.v;
				return v1 == v2;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe.CallStack.exceptionToString = function(e) {
	if(e.get_previous() == null) {
		var tmp = "Exception: " + e.toString();
		var tmp1 = e.get_stack();
		return tmp + (tmp1 == null ? "null" : haxe.CallStack.toString(tmp1));
	}
	var result = "";
	var e1 = e;
	var prev = null;
	while(e1 != null) {
		if(prev == null) {
			var result1 = "Exception: " + e1.get_message();
			var tmp = e1.get_stack();
			result = result1 + (tmp == null ? "null" : haxe.CallStack.toString(tmp)) + result;
		} else {
			var prevStack = haxe.CallStack.subtract(e1.get_stack(),prev.get_stack());
			result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe.CallStack.toString(prevStack)) + "\n\nNext " + result;
		}
		prev = e1;
		e1 = e1.get_previous();
	}
	return result;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s.m;
		b.b += "module ";
		b.b += m == null ? "null" : "" + m;
		break;
	case 2:
		var s1 = s.s;
		var file = s.file;
		var line = s.line;
		var col = s.column;
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += file == null ? "null" : "" + file;
		b.b += " line ";
		b.b += line == null ? "null" : "" + line;
		if(col != null) {
			b.b += " column ";
			b.b += col == null ? "null" : "" + col;
		}
		if(s1 != null) {
			b.b += ")";
		}
		break;
	case 3:
		var cname = s.classname;
		var meth = s.method;
		b.b += Std.string(cname == null ? "<unknown>" : cname);
		b.b += ".";
		b.b += meth == null ? "null" : "" + meth;
		break;
	case 4:
		var n = s.v;
		b.b += "local function #";
		b.b += n == null ? "null" : "" + n;
		break;
	}
};
haxe.IMap = function() { };
$hxClasses["haxe.IMap"] = haxe.IMap;
haxe.IMap.__name__ = "haxe.IMap";
haxe.IMap.__isInterface__ = true;
haxe.IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
	,__class__: haxe.IMap
};
haxe.DynamicAccess = {};
haxe.DynamicAccess._new = function() {
	var this1 = { };
	return this1;
};
haxe.DynamicAccess.get = function(this1,key) {
	return this1[key];
};
haxe.DynamicAccess.set = function(this1,key,value) {
	return this1[key] = value;
};
haxe.DynamicAccess.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
haxe.DynamicAccess.remove = function(this1,key) {
	return Reflect.deleteField(this1,key);
};
haxe.DynamicAccess.keys = function(this1) {
	return Reflect.fields(this1);
};
haxe.DynamicAccess.copy = function(this1) {
	return Reflect.copy(this1);
};
haxe.DynamicAccess.iterator = function(this1) {
	return new haxe.iterators.DynamicAccessIterator(this1);
};
haxe.DynamicAccess.keyValueIterator = function(this1) {
	return new haxe.iterators.DynamicAccessKeyValueIterator(this1);
};
haxe.Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe.Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe.Exception;
haxe.Exception.__name__ = "haxe.Exception";
haxe.Exception.caught = function(value) {
	if(((value) instanceof haxe.Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe.Exception(value.message,null,value);
	} else {
		return new haxe.ValueException(value,null,value);
	}
};
haxe.Exception.thrown = function(value) {
	if(((value) instanceof haxe.Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe.ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe.Exception.__super__ = Error;
haxe.Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe.CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe.CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe.CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe.CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe.NativeStackTrace.toHaxe(haxe.NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			var s = _g;
			return s;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,get___exceptionStack: function() {
		return this.__exceptionStack;
	}
	,set___exceptionStack: function(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	,get___skipStack: function() {
		return this.__skipStack;
	}
	,set___skipStack: function(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	,get___nativeException: function() {
		return this.__nativeException;
	}
	,set___nativeException: function(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	,get___previousException: function() {
		return this.__previousException;
	}
	,set___previousException: function(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	,__class__: haxe.Exception
	,__properties__: {set___exceptionStack:"set___exceptionStack",get___exceptionStack:"get___exceptionStack",get_native:"get_native",get_previous:"get_previous",get_stack:"get_stack",get_message:"get_message"}
});
haxe.Int32 = {};
haxe.Int32.negate = function(this1) {
	return ~this1 + 1 | 0;
};
haxe.Int32.preIncrement = function(this1) {
	this1 = ++this1 | 0;
	return this1;
};
haxe.Int32.postIncrement = function(this1) {
	var ret = this1++;
	this1 |= 0;
	return ret;
};
haxe.Int32.preDecrement = function(this1) {
	this1 = --this1 | 0;
	return this1;
};
haxe.Int32.postDecrement = function(this1) {
	var ret = this1--;
	this1 |= 0;
	return ret;
};
haxe.Int32.add = function(a,b) {
	return a + b | 0;
};
haxe.Int32.addInt = function(a,b) {
	return a + b | 0;
};
haxe.Int32.sub = function(a,b) {
	return a - b | 0;
};
haxe.Int32.subInt = function(a,b) {
	return a - b | 0;
};
haxe.Int32.intSub = function(a,b) {
	return a - b | 0;
};
haxe.Int32.mul = function(a,b) {
	return haxe.Int32._mul(a,b);
};
haxe.Int32.mulInt = function(a,b) {
	return haxe.Int32._mul(a,b);
};
haxe.Int32.toFloat = function(this1) {
	return this1;
};
haxe.Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
haxe.Int32.clamp = function(x) {
	return x | 0;
};
haxe.Int64 = {};
haxe.Int64.__properties__ = {get_low:"get_low",get_high:"get_high"};
haxe.Int64._new = function(x) {
	var this1 = x;
	return this1;
};
haxe.Int64.copy = function(this1) {
	var this2 = new haxe._Int64.___Int64(this1.high,this1.low);
	return this2;
};
haxe.Int64.make = function(high,low) {
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.ofInt = function(x) {
	var this1 = new haxe._Int64.___Int64(x >> 31,x);
	return this1;
};
haxe.Int64.toInt = function(x) {
	if(x.high != x.low >> 31) {
		throw haxe.Exception.thrown("Overflow");
	}
	return x.low;
};
haxe.Int64.is = function(val) {
	return ((val) instanceof haxe._Int64.___Int64);
};
haxe.Int64.isInt64 = function(val) {
	return ((val) instanceof haxe._Int64.___Int64);
};
haxe.Int64.getHigh = function(x) {
	return x.high;
};
haxe.Int64.getLow = function(x) {
	return x.low;
};
haxe.Int64.isNeg = function(x) {
	return x.high < 0;
};
haxe.Int64.isZero = function(x) {
	var b_high = 0;
	var b_low = 0;
	if(x.high == b_high) {
		return x.low == b_low;
	} else {
		return false;
	}
};
haxe.Int64.compare = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b.low);
	}
	if(a.high < 0) {
		if(b.high < 0) {
			return v;
		} else {
			return -1;
		}
	} else if(b.high >= 0) {
		return v;
	} else {
		return 1;
	}
};
haxe.Int64.ucompare = function(a,b) {
	var v = haxe.Int32.ucompare(a.high,b.high);
	if(v != 0) {
		return v;
	} else {
		return haxe.Int32.ucompare(a.low,b.low);
	}
};
haxe.Int64.toStr = function(x) {
	return haxe.Int64.toString(x);
};
haxe.Int64.toString = function(this1) {
	var i = this1;
	var b_high = 0;
	var b_low = 0;
	if(i.high == b_high && i.low == b_low) {
		return "0";
	}
	var str = "";
	var neg = false;
	if(i.high < 0) {
		neg = true;
	}
	var this1 = new haxe._Int64.___Int64(0,10);
	var ten = this1;
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(i.high != b_high || i.low != b_low)) {
			break;
		}
		var r = haxe.Int64.divMod(i,ten);
		if(r.modulus.high < 0) {
			var x = r.modulus;
			var high = ~x.high;
			var low = ~x.low + 1 | 0;
			if(low == 0) {
				var ret = high++;
				high = high | 0;
			}
			var this_high = high;
			var this_low = low;
			str = this_low + str;
			var x1 = r.quotient;
			var high1 = ~x1.high;
			var low1 = ~x1.low + 1 | 0;
			if(low1 == 0) {
				var ret1 = high1++;
				high1 = high1 | 0;
			}
			var this1 = new haxe._Int64.___Int64(high1,low1);
			i = this1;
		} else {
			str = r.modulus.low + str;
			i = r.quotient;
		}
	}
	if(neg) {
		str = "-" + str;
	}
	return str;
};
haxe.Int64.parseString = function(sParam) {
	return haxe.Int64Helper.parseString(sParam);
};
haxe.Int64.fromFloat = function(f) {
	return haxe.Int64Helper.fromFloat(f);
};
haxe.Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe.Exception.thrown("divide by zero");
		case 1:
			var this1 = new haxe._Int64.___Int64(dividend.high,dividend.low);
			var this2 = new haxe._Int64.___Int64(0,0);
			return { quotient : this1, modulus : this2};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe._Int64.___Int64(high,low);
		modulus = this1;
	} else {
		var this1 = new haxe._Int64.___Int64(dividend.high,dividend.low);
		modulus = this1;
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe._Int64.___Int64(high,low);
		divisor = this1;
	}
	var this1 = new haxe._Int64.___Int64(0,0);
	var quotient = this1;
	var this1 = new haxe._Int64.___Int64(0,1);
	var mask = this1;
	while(!(divisor.high < 0)) {
		var v = haxe.Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe.Int32.ucompare(divisor.low,modulus.low);
		var b = 1;
		b &= 63;
		if(b == 0) {
			var this1 = new haxe._Int64.___Int64(divisor.high,divisor.low);
			divisor = this1;
		} else if(b < 32) {
			var this2 = new haxe._Int64.___Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
			divisor = this2;
		} else {
			var this3 = new haxe._Int64.___Int64(divisor.low << b - 32,0);
			divisor = this3;
		}
		var b1 = 1;
		b1 &= 63;
		if(b1 == 0) {
			var this4 = new haxe._Int64.___Int64(mask.high,mask.low);
			mask = this4;
		} else if(b1 < 32) {
			var this5 = new haxe._Int64.___Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
			mask = this5;
		} else {
			var this6 = new haxe._Int64.___Int64(mask.low << b1 - 32,0);
			mask = this6;
		}
		if(cmp >= 0) {
			break;
		}
	}
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(mask.high != b_high || mask.low != b_low)) {
			break;
		}
		var v = haxe.Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe.Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			var this1 = new haxe._Int64.___Int64(quotient.high | mask.high,quotient.low | mask.low);
			quotient = this1;
			var high = modulus.high - divisor.high | 0;
			var low = modulus.low - divisor.low | 0;
			if(haxe.Int32.ucompare(modulus.low,divisor.low) < 0) {
				var ret = high--;
				high = high | 0;
			}
			var this2 = new haxe._Int64.___Int64(high,low);
			modulus = this2;
		}
		var b = 1;
		b &= 63;
		if(b == 0) {
			var this3 = new haxe._Int64.___Int64(mask.high,mask.low);
			mask = this3;
		} else if(b < 32) {
			var this4 = new haxe._Int64.___Int64(mask.high >>> b,mask.high << 32 - b | mask.low >>> b);
			mask = this4;
		} else {
			var this5 = new haxe._Int64.___Int64(0,mask.high >>> b - 32);
			mask = this5;
		}
		var b1 = 1;
		b1 &= 63;
		if(b1 == 0) {
			var this6 = new haxe._Int64.___Int64(divisor.high,divisor.low);
			divisor = this6;
		} else if(b1 < 32) {
			var this7 = new haxe._Int64.___Int64(divisor.high >>> b1,divisor.high << 32 - b1 | divisor.low >>> b1);
			divisor = this7;
		} else {
			var this8 = new haxe._Int64.___Int64(0,divisor.high >>> b1 - 32);
			divisor = this8;
		}
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe._Int64.___Int64(high,low);
		quotient = this1;
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe._Int64.___Int64(high,low);
		modulus = this1;
	}
	return { quotient : quotient, modulus : modulus};
};
haxe.Int64.neg = function(x) {
	var high = ~x.high;
	var low = ~x.low + 1 | 0;
	if(low == 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.preIncrement = function(this1) {
	var this2 = new haxe._Int64.___Int64(this1.high,this1.low);
	this1 = this2;
	var ret = this1.low++;
	this1.low = this1.low | 0;
	if(this1.low == 0) {
		var ret = this1.high++;
		this1.high = this1.high | 0;
	}
	return this1;
};
haxe.Int64.postIncrement = function(this1) {
	var ret = this1;
	var this2 = new haxe._Int64.___Int64(this1.high,this1.low);
	this1 = this2;
	var ret1 = this1.low++;
	this1.low = this1.low | 0;
	if(this1.low == 0) {
		var ret1 = this1.high++;
		this1.high = this1.high | 0;
	}
	return ret;
};
haxe.Int64.preDecrement = function(this1) {
	var this2 = new haxe._Int64.___Int64(this1.high,this1.low);
	this1 = this2;
	if(this1.low == 0) {
		var ret = this1.high--;
		this1.high = this1.high | 0;
	}
	var ret = this1.low--;
	this1.low = this1.low | 0;
	return this1;
};
haxe.Int64.postDecrement = function(this1) {
	var ret = this1;
	var this2 = new haxe._Int64.___Int64(this1.high,this1.low);
	this1 = this2;
	if(this1.low == 0) {
		var ret1 = this1.high--;
		this1.high = this1.high | 0;
	}
	var ret1 = this1.low--;
	this1.low = this1.low | 0;
	return ret;
};
haxe.Int64.add = function(a,b) {
	var high = a.high + b.high | 0;
	var low = a.low + b.low | 0;
	if(haxe.Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.addInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var high = a.high + b_high | 0;
	var low = a.low + b_low | 0;
	if(haxe.Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.sub = function(a,b) {
	var high = a.high - b.high | 0;
	var low = a.low - b.low | 0;
	if(haxe.Int32.ucompare(a.low,b.low) < 0) {
		var ret = high--;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.subInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var high = a.high - b_high | 0;
	var low = a.low - b_low | 0;
	if(haxe.Int32.ucompare(a.low,b_low) < 0) {
		var ret = high--;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.intSub = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var high = a_high - b.high | 0;
	var low = a_low - b.low | 0;
	if(haxe.Int32.ucompare(a_low,b.low) < 0) {
		var ret = high--;
		high = high | 0;
	}
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.mul = function(a,b) {
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b.low & mask;
	var bh = b.low >>> 16;
	var p00 = haxe.Int32._mul(al,bl);
	var p10 = haxe.Int32._mul(ah,bl);
	var p01 = haxe.Int32._mul(al,bh);
	var p11 = haxe.Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe.Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe.Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe.Int32._mul(a.low,b.high) + haxe.Int32._mul(a.high,b.low) | 0) | 0;
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.mulInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe.Int32._mul(al,bl);
	var p10 = haxe.Int32._mul(ah,bl);
	var p01 = haxe.Int32._mul(al,bh);
	var p11 = haxe.Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe.Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe.Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe.Int32._mul(a.low,b_high) + haxe.Int32._mul(a.high,b_low) | 0) | 0;
	var this1 = new haxe._Int64.___Int64(high,low);
	return this1;
};
haxe.Int64.div = function(a,b) {
	return haxe.Int64.divMod(a,b).quotient;
};
haxe.Int64.divInt = function(a,b) {
	var this1 = new haxe._Int64.___Int64(b >> 31,b);
	return haxe.Int64.divMod(a,this1).quotient;
};
haxe.Int64.intDiv = function(a,b) {
	var this1 = new haxe._Int64.___Int64(a >> 31,a);
	var x = haxe.Int64.divMod(this1,b).quotient;
	if(x.high != x.low >> 31) {
		throw haxe.Exception.thrown("Overflow");
	}
	var x1 = x.low;
	var this1 = new haxe._Int64.___Int64(x1 >> 31,x1);
	return this1;
};
haxe.Int64.mod = function(a,b) {
	return haxe.Int64.divMod(a,b).modulus;
};
haxe.Int64.modInt = function(a,b) {
	var this1 = new haxe._Int64.___Int64(b >> 31,b);
	var x = haxe.Int64.divMod(a,this1).modulus;
	if(x.high != x.low >> 31) {
		throw haxe.Exception.thrown("Overflow");
	}
	var x1 = x.low;
	var this1 = new haxe._Int64.___Int64(x1 >> 31,x1);
	return this1;
};
haxe.Int64.intMod = function(a,b) {
	var this1 = new haxe._Int64.___Int64(a >> 31,a);
	var x = haxe.Int64.divMod(this1,b).modulus;
	if(x.high != x.low >> 31) {
		throw haxe.Exception.thrown("Overflow");
	}
	var x1 = x.low;
	var this1 = new haxe._Int64.___Int64(x1 >> 31,x1);
	return this1;
};
haxe.Int64.eq = function(a,b) {
	if(a.high == b.high) {
		return a.low == b.low;
	} else {
		return false;
	}
};
haxe.Int64.eqInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	if(a.high == b_high) {
		return a.low == b_low;
	} else {
		return false;
	}
};
haxe.Int64.neq = function(a,b) {
	if(a.high == b.high) {
		return a.low != b.low;
	} else {
		return true;
	}
};
haxe.Int64.neqInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	if(a.high == b_high) {
		return a.low != b_low;
	} else {
		return true;
	}
};
haxe.Int64.lt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe.Int64.ltInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) < 0;
};
haxe.Int64.intLt = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe.Int64.lte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe.Int64.lteInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) <= 0;
};
haxe.Int64.intLte = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe.Int64.gt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe.Int64.gtInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) > 0;
};
haxe.Int64.intGt = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe.Int64.gte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe.Int64.gteInt = function(a,b) {
	var b_high = b >> 31;
	var b_low = b;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a.low,b_low);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) >= 0;
};
haxe.Int64.intGte = function(a,b) {
	var a_high = a >> 31;
	var a_low = a;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe.Int32.ucompare(a_low,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe.Int64.complement = function(a) {
	var this1 = new haxe._Int64.___Int64(~a.high,~a.low);
	return this1;
};
haxe.Int64.and = function(a,b) {
	var this1 = new haxe._Int64.___Int64(a.high & b.high,a.low & b.low);
	return this1;
};
haxe.Int64.or = function(a,b) {
	var this1 = new haxe._Int64.___Int64(a.high | b.high,a.low | b.low);
	return this1;
};
haxe.Int64.xor = function(a,b) {
	var this1 = new haxe._Int64.___Int64(a.high ^ b.high,a.low ^ b.low);
	return this1;
};
haxe.Int64.shl = function(a,b) {
	b &= 63;
	if(b == 0) {
		var this1 = new haxe._Int64.___Int64(a.high,a.low);
		return this1;
	} else if(b < 32) {
		var this1 = new haxe._Int64.___Int64(a.high << b | a.low >>> 32 - b,a.low << b);
		return this1;
	} else {
		var this1 = new haxe._Int64.___Int64(a.low << b - 32,0);
		return this1;
	}
};
haxe.Int64.shr = function(a,b) {
	b &= 63;
	if(b == 0) {
		var this1 = new haxe._Int64.___Int64(a.high,a.low);
		return this1;
	} else if(b < 32) {
		var this1 = new haxe._Int64.___Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
		return this1;
	} else {
		var this1 = new haxe._Int64.___Int64(a.high >> 31,a.high >> b - 32);
		return this1;
	}
};
haxe.Int64.ushr = function(a,b) {
	b &= 63;
	if(b == 0) {
		var this1 = new haxe._Int64.___Int64(a.high,a.low);
		return this1;
	} else if(b < 32) {
		var this1 = new haxe._Int64.___Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
		return this1;
	} else {
		var this1 = new haxe._Int64.___Int64(0,a.high >>> b - 32);
		return this1;
	}
};
haxe.Int64.get_high = function(this1) {
	return this1.high;
};
haxe.Int64.set_high = function(this1,x) {
	return this1.high = x;
};
haxe.Int64.get_low = function(this1) {
	return this1.low;
};
haxe.Int64.set_low = function(this1,x) {
	return this1.low = x;
};
haxe._Int64 = {};
haxe._Int64.___Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe._Int64.___Int64;
haxe._Int64.___Int64.__name__ = "haxe._Int64.___Int64";
haxe._Int64.___Int64.prototype = {
	high: null
	,low: null
	,toString: function() {
		return haxe.Int64.toString(this);
	}
	,__class__: haxe._Int64.___Int64
};
haxe.Int64Helper = function() { };
$hxClasses["haxe.Int64Helper"] = haxe.Int64Helper;
haxe.Int64Helper.__name__ = "haxe.Int64Helper";
haxe.Int64Helper.parseString = function(sParam) {
	var base_high = 0;
	var base_low = 10;
	var this1 = new haxe._Int64.___Int64(0,0);
	var current = this1;
	var this1 = new haxe._Int64.___Int64(0,1);
	var multiplier = this1;
	var sIsNegative = false;
	var s = StringTools.trim(sParam);
	if(s.charAt(0) == "-") {
		sIsNegative = true;
		s = s.substring(1,s.length);
	}
	var len = s.length;
	var _g = 0;
	var _g1 = len;
	while(_g < _g1) {
		var i = _g++;
		var digitInt = HxOverrides.cca(s,len - 1 - i) - 48;
		if(digitInt < 0 || digitInt > 9) {
			throw haxe.Exception.thrown("NumberFormatError");
		}
		if(digitInt != 0) {
			var digit_high = digitInt >> 31;
			var digit_low = digitInt;
			if(sIsNegative) {
				var mask = 65535;
				var al = multiplier.low & mask;
				var ah = multiplier.low >>> 16;
				var bl = digit_low & mask;
				var bh = digit_low >>> 16;
				var p00 = haxe.Int32._mul(al,bl);
				var p10 = haxe.Int32._mul(ah,bl);
				var p01 = haxe.Int32._mul(al,bh);
				var p11 = haxe.Int32._mul(ah,bh);
				var low = p00;
				var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
				p01 <<= 16;
				low = low + p01 | 0;
				if(haxe.Int32.ucompare(low,p01) < 0) {
					var ret = high++;
					high = high | 0;
				}
				p10 <<= 16;
				low = low + p10 | 0;
				if(haxe.Int32.ucompare(low,p10) < 0) {
					var ret1 = high++;
					high = high | 0;
				}
				high = high + (haxe.Int32._mul(multiplier.low,digit_high) + haxe.Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_high = high;
				var b_low = low;
				var high1 = current.high - b_high | 0;
				var low1 = current.low - b_low | 0;
				if(haxe.Int32.ucompare(current.low,b_low) < 0) {
					var ret2 = high1--;
					high1 = high1 | 0;
				}
				var this1 = new haxe._Int64.___Int64(high1,low1);
				current = this1;
				if(!(current.high < 0)) {
					throw haxe.Exception.thrown("NumberFormatError: Underflow");
				}
			} else {
				var mask1 = 65535;
				var al1 = multiplier.low & mask1;
				var ah1 = multiplier.low >>> 16;
				var bl1 = digit_low & mask1;
				var bh1 = digit_low >>> 16;
				var p001 = haxe.Int32._mul(al1,bl1);
				var p101 = haxe.Int32._mul(ah1,bl1);
				var p011 = haxe.Int32._mul(al1,bh1);
				var p111 = haxe.Int32._mul(ah1,bh1);
				var low2 = p001;
				var high2 = (p111 + (p011 >>> 16) | 0) + (p101 >>> 16) | 0;
				p011 <<= 16;
				low2 = low2 + p011 | 0;
				if(haxe.Int32.ucompare(low2,p011) < 0) {
					var ret3 = high2++;
					high2 = high2 | 0;
				}
				p101 <<= 16;
				low2 = low2 + p101 | 0;
				if(haxe.Int32.ucompare(low2,p101) < 0) {
					var ret4 = high2++;
					high2 = high2 | 0;
				}
				high2 = high2 + (haxe.Int32._mul(multiplier.low,digit_high) + haxe.Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_high1 = high2;
				var b_low1 = low2;
				var high3 = current.high + b_high1 | 0;
				var low3 = current.low + b_low1 | 0;
				if(haxe.Int32.ucompare(low3,current.low) < 0) {
					var ret5 = high3++;
					high3 = high3 | 0;
				}
				var this2 = new haxe._Int64.___Int64(high3,low3);
				current = this2;
				if(current.high < 0) {
					throw haxe.Exception.thrown("NumberFormatError: Overflow");
				}
			}
		}
		var mask2 = 65535;
		var al2 = multiplier.low & mask2;
		var ah2 = multiplier.low >>> 16;
		var bl2 = base_low & mask2;
		var bh2 = base_low >>> 16;
		var p002 = haxe.Int32._mul(al2,bl2);
		var p102 = haxe.Int32._mul(ah2,bl2);
		var p012 = haxe.Int32._mul(al2,bh2);
		var p112 = haxe.Int32._mul(ah2,bh2);
		var low4 = p002;
		var high4 = (p112 + (p012 >>> 16) | 0) + (p102 >>> 16) | 0;
		p012 <<= 16;
		low4 = low4 + p012 | 0;
		if(haxe.Int32.ucompare(low4,p012) < 0) {
			var ret6 = high4++;
			high4 = high4 | 0;
		}
		p102 <<= 16;
		low4 = low4 + p102 | 0;
		if(haxe.Int32.ucompare(low4,p102) < 0) {
			var ret7 = high4++;
			high4 = high4 | 0;
		}
		high4 = high4 + (haxe.Int32._mul(multiplier.low,base_high) + haxe.Int32._mul(multiplier.high,base_low) | 0) | 0;
		var this3 = new haxe._Int64.___Int64(high4,low4);
		multiplier = this3;
	}
	return current;
};
haxe.Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe.Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe.Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe.Exception.thrown("Conversion underflow");
	}
	var this1 = new haxe._Int64.___Int64(0,0);
	var result = this1;
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1;
			if(b == 0) {
				var this1 = new haxe._Int64.___Int64(a_high,a_low);
				b1 = this1;
			} else if(b < 32) {
				var this2 = new haxe._Int64.___Int64(a_high << b | a_low >>> 32 - b,a_low << b);
				b1 = this2;
			} else {
				var this3 = new haxe._Int64.___Int64(a_low << b - 32,0);
				b1 = this3;
			}
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe.Int32.ucompare(low,result.low) < 0) {
				var ret = high++;
				high = high | 0;
			}
			var this4 = new haxe._Int64.___Int64(high,low);
			result = this4;
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe._Int64.___Int64(high,low);
		result = this1;
	}
	return result;
};
haxe.Log = function() { };
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = "haxe.Log";
haxe.Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			str += ", " + Std.string(v);
		}
	}
	return pstr + ": " + str;
};
haxe.Log.trace = function(v,infos) {
	var str = haxe.Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
haxe.NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe.NativeStackTrace;
haxe.NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe.NativeStackTrace.lastError = null;
haxe.NativeStackTrace.wrapCallSite = null;
haxe.NativeStackTrace.saveStack = function(e) {
	haxe.NativeStackTrace.lastError = e;
};
haxe.NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe.NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe.NativeStackTrace.normalize(stack,2);
};
haxe.NativeStackTrace.exceptionStack = function() {
	return haxe.NativeStackTrace.normalize(haxe.NativeStackTrace.tryHaxeStack(haxe.NativeStackTrace.lastError));
};
haxe.NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe.StackItem.FilePos(meth == "Anonymous function" ? haxe.StackItem.LocalFunction() : meth == "Global code" ? null : haxe.StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe.StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe.NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe.NativeStackTrace.prepareHxStackTrace;
	var stack = e.stack;
	Error.prepareStackTrace = oldValue;
	return stack;
};
haxe.NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe.NativeStackTrace.wrapCallSite != null) {
			site = haxe.NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				var className = fullName.substring(0,idx);
				var methodName = fullName.substring(idx + 1);
				method = haxe.StackItem.Method(className,methodName);
			} else {
				method = haxe.StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe.NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe.StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe.NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe.NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe.NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			return haxe.NativeStackTrace.skipLines(stack,--skip,pos + 1);
		}
	} else {
		return stack.substring(pos);
	}
};
haxe.Resource = function() { };
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = "haxe.Resource";
haxe.Resource.content = null;
haxe.Resource.listNames = function() {
	var _g = [];
	var _g1 = 0;
	var _g2 = haxe.Resource.content;
	while(_g1 < _g2.length) {
		var x = _g2[_g1];
		++_g1;
		_g.push(x.name);
	}
	return _g;
};
haxe.Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return x.str;
			}
			var b = haxe.crypto.Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
haxe.Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) {
				return haxe.io.Bytes.ofString(x.str);
			}
			return haxe.crypto.Base64.decode(x.data);
		}
	}
	return null;
};
haxe.Rest = {};
haxe.Rest.__properties__ = {get_length:"get_length"};
haxe.Rest.get_length = function(this1) {
	return this1.length;
};
haxe.Rest.of = function(array) {
	var this1 = array;
	return this1;
};
haxe.Rest._new = function(array) {
	var this1 = array;
	return this1;
};
haxe.Rest.get = function(this1,index) {
	return this1[index];
};
haxe.Rest.toArray = function(this1) {
	return this1.slice();
};
haxe.Rest.iterator = function(this1) {
	return new haxe.iterators.RestIterator(this1);
};
haxe.Rest.keyValueIterator = function(this1) {
	return new haxe.iterators.RestKeyValueIterator(this1);
};
haxe.Rest.append = function(this1,item) {
	var result = this1.slice();
	result.push(item);
	var this1 = result;
	return this1;
};
haxe.Rest.prepend = function(this1,item) {
	var result = this1.slice();
	result.unshift(item);
	var this1 = result;
	return this1;
};
haxe.Rest.toString = function(this1) {
	return "[" + this1.toString() + "]";
};
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = "haxe.Serializer";
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
};
haxe.Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.h[s];
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += x == null ? "null" : "" + x;
			return;
		}
		this.shash.h[s] = this.scount++;
		this.buf.b += "y";
		s = encodeURIComponent(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += s == null ? "null" : "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g = 0;
		var _g1 = this.cache.length;
		while(_g < _g1) {
			var i = _g++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += i == null ? "null" : "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		var _g = Type.typeof(v);
		switch(_g._hx_index) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			var v1 = v;
			if(v1 == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += v1 == null ? "null" : "" + v1;
			break;
		case 2:
			var v1 = v;
			if(isNaN(v1)) {
				this.buf.b += "k";
			} else if(!isFinite(v1)) {
				this.buf.b += v1 < 0 ? "m" : "p";
			} else {
				this.buf.b += "d";
				this.buf.b += v1 == null ? "null" : "" + v1;
			}
			break;
		case 3:
			this.buf.b += v ? "t" : "f";
			break;
		case 4:
			if(js.Boot.__instanceof(v,Class)) {
				var className = v.__name__;
				this.buf.b += "A";
				this.serializeString(className);
			} else if(js.Boot.__instanceof(v,Enum)) {
				this.buf.b += "B";
				this.serializeString(v.__ename__);
			} else {
				if(this.useCache && this.serializeRef(v)) {
					return;
				}
				this.buf.b += "o";
				this.serializeFields(v);
			}
			break;
		case 5:
			throw haxe.Exception.thrown("Cannot serialize function");
		case 6:
			var c = _g.c;
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) {
				return;
			}
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v["length"];
				var _g1 = 0;
				var _g2 = l;
				while(_g1 < _g2) {
					var i = _g1++;
					if(v[i] == null) {
						++ucount;
					} else {
						if(ucount > 0) {
							if(ucount == 1) {
								this.buf.b += "n";
							} else {
								this.buf.b += "u";
								this.buf.b += ucount == null ? "null" : "" + ucount;
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) {
						this.buf.b += "n";
					} else {
						this.buf.b += "u";
						this.buf.b += ucount == null ? "null" : "" + ucount;
					}
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(d.getTime());
				break;
			case haxe.ds.IntMap:
				this.buf.b += "q";
				var v1 = v;
				var k = v1.keys();
				while(k.hasNext()) {
					var k1 = k.next();
					this.buf.b += ":";
					this.buf.b += k1 == null ? "null" : "" + k1;
					this.serialize(v1.h[k1]);
				}
				this.buf.b += "h";
				break;
			case haxe.ds.List:
				this.buf.b += "l";
				var v1 = v;
				var _g_head = v1.h;
				while(_g_head != null) {
					var val = _g_head.item;
					_g_head = _g_head.next;
					var i = val;
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case haxe.ds.ObjectMap:
				this.buf.b += "M";
				var v1 = v;
				var k = v1.keys();
				while(k.hasNext()) {
					var k1 = k.next();
					var id = Reflect.field(k1,"__id__");
					Reflect.deleteField(k1,"__id__");
					this.serialize(k1);
					k1["__id__"] = id;
					this.serialize(v1.h[k1.__id__]);
				}
				this.buf.b += "h";
				break;
			case haxe.ds.StringMap:
				this.buf.b += "b";
				var v1 = v;
				var h = v1.h;
				var _g_h = h;
				var _g_keys = Object.keys(h);
				var _g_length = _g_keys.length;
				var _g_current = 0;
				while(_g_current < _g_length) {
					var k = _g_keys[_g_current++];
					this.serializeString(k);
					this.serialize(v1.h[k]);
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				this.buf.b += "s";
				this.buf.b += Std.string(Math.ceil(v1.length * 8 / 6));
				this.buf.b += ":";
				var i = 0;
				var max = v1.length - 2;
				var b64 = haxe.Serializer.BASE64_CODES;
				if(b64 == null) {
					var this1 = new Array(haxe.Serializer.BASE64.length);
					b64 = this1;
					var _g1 = 0;
					var _g2 = haxe.Serializer.BASE64.length;
					while(_g1 < _g2) {
						var i1 = _g1++;
						b64[i1] = HxOverrides.cca(haxe.Serializer.BASE64,i1);
					}
					haxe.Serializer.BASE64_CODES = b64;
				}
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					this.buf.b += String.fromCodePoint(b64[b1 >> 2]);
					this.buf.b += String.fromCodePoint(b64[(b1 << 4 | b2 >> 4) & 63]);
					this.buf.b += String.fromCodePoint(b64[(b2 << 2 | b3 >> 6) & 63]);
					this.buf.b += String.fromCodePoint(b64[b3 & 63]);
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					this.buf.b += String.fromCodePoint(b64[b1 >> 2]);
					this.buf.b += String.fromCodePoint(b64[(b1 << 4 | b2 >> 4) & 63]);
					this.buf.b += String.fromCodePoint(b64[b2 << 2 & 63]);
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					this.buf.b += String.fromCodePoint(b64[b1 >> 2]);
					this.buf.b += String.fromCodePoint(b64[b1 << 4 & 63]);
				}
				break;
			default:
				if(this.useCache) {
					this.cache.pop();
				}
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(c.__name__);
					if(this.useCache) {
						this.cache.push(v);
					}
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(c.__name__);
					if(this.useCache) {
						this.cache.push(v);
					}
					this.serializeFields(v);
				}
			}
			break;
		case 7:
			var e = _g.e;
			if(this.useCache) {
				if(this.serializeRef(v)) {
					return;
				}
				this.cache.pop();
			}
			this.buf.b += Std.string(this.useEnumIndex ? "j" : "w");
			this.serializeString(e.__ename__);
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v._hx_index);
			} else {
				var e = v;
				this.serializeString($hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name);
			}
			this.buf.b += ":";
			var params = Type.enumParameters(v);
			this.buf.b += Std.string(params.length);
			var _g = 0;
			while(_g < params.length) {
				var p = params[_g];
				++_g;
				this.serialize(p);
			}
			if(this.useCache) {
				this.cache.push(v);
			}
			break;
		default:
			throw haxe.Exception.thrown("Cannot serialize " + Std.string(v));
		}
	}
	,serializeException: function(e) {
		this.buf.b += "x";
		this.serialize(e);
	}
	,__class__: haxe.Serializer
};
var nme = {};
nme.app = {};
nme.app.IPollClient = function() { };
$hxClasses["nme.app.IPollClient"] = nme.app.IPollClient;
nme.app.IPollClient.__name__ = "nme.app.IPollClient";
nme.app.IPollClient.__isInterface__ = true;
nme.app.IPollClient.prototype = {
	onPoll: null
	,getNextWake: null
	,__class__: nme.app.IPollClient
};
haxe.TimerPollClient = function() {
};
$hxClasses["haxe.TimerPollClient"] = haxe.TimerPollClient;
haxe.TimerPollClient.__name__ = "haxe.TimerPollClient";
haxe.TimerPollClient.__interfaces__ = [nme.app.IPollClient];
haxe.TimerPollClient.prototype = {
	onPoll: function(timestamp) {
		haxe.Timer.nmeCheckTimers(timestamp);
	}
	,getNextWake: function(defaultWake,timestamp) {
		return haxe.Timer.nmeGetNextWake(defaultWake,timestamp);
	}
	,__class__: haxe.TimerPollClient
};
nme.Loader = function() { };
$hxClasses["nme.Loader"] = nme.Loader;
nme.Loader.__name__ = "nme.Loader";
nme.Loader.load = function(func,args) {
	return Module[func];
};
haxe.Timer = function(inTimeMs) {
	if(haxe.Timer.sRunningTimers == null) {
		haxe.Timer.sRunningTimers = [];
		haxe.Timer.sPollClient = new haxe.TimerPollClient();
		nme.app.Application.addPollClient(haxe.Timer.sPollClient);
	}
	this.mTime = inTimeMs * 0.001;
	haxe.Timer.sRunningTimers.push(this);
	this.mFireAt = haxe.Timer.stamp() + this.mTime;
	this.mRunning = true;
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = "haxe.Timer";
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
};
haxe.Timer.nmeGetNextWake = function(inDefaultWake,inStamp) {
	var wake = inDefaultWake;
	var _g = 0;
	var _g1 = haxe.Timer.sRunningTimers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		if(!timer.mRunning) {
			continue;
		}
		var sleep = timer.mFireAt - inStamp;
		if(sleep < wake) {
			wake = sleep;
			if(wake < 0) {
				return 0;
			}
		}
	}
	return wake;
};
haxe.Timer.nmeCheckTimers = function(inStamp) {
	if(haxe.Timer.sRunningTimers != null) {
		var i = 0;
		while(i < haxe.Timer.sRunningTimers.length) {
			var timer = haxe.Timer.sRunningTimers[i];
			if(timer.mRunning) {
				timer.nmeCheck(inStamp);
			}
			if(!timer.mRunning) {
				haxe.Timer.sRunningTimers.splice(i,1);
			} else {
				++i;
			}
		}
	}
};
haxe.Timer.delay = function(f,time) {
	var t = new haxe.Timer(time);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return haxe.Timer.nme_time_stamp();
};
haxe.Timer.prototype = {
	mTime: null
	,mFireAt: null
	,mRunning: null
	,run: function() {
	}
	,stop: function() {
		this.mRunning = false;
	}
	,nmeCheck: function(inTime) {
		if(inTime >= this.mFireAt) {
			this.mFireAt += this.mTime;
			this.run();
		}
	}
	,__class__: haxe.Timer
};
haxe._Unserializer = {};
haxe._Unserializer.DefaultResolver = function() {
};
$hxClasses["haxe._Unserializer.DefaultResolver"] = haxe._Unserializer.DefaultResolver;
haxe._Unserializer.DefaultResolver.__name__ = "haxe._Unserializer.DefaultResolver";
haxe._Unserializer.DefaultResolver.prototype = {
	resolveClass: function(name) {
		return $hxClasses[name];
	}
	,resolveEnum: function(name) {
		return $hxEnums[name];
	}
	,__class__: haxe._Unserializer.DefaultResolver
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = this.buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = new haxe._Unserializer.DefaultResolver();
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.resolver = r;
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = "haxe.Unserializer";
haxe.Unserializer.initCodes = function() {
	var codes = [];
	var _g = 0;
	var _g1 = haxe.Unserializer.BASE64.length;
	while(_g < _g1) {
		var i = _g++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.fastLength = function(s) {
	return s.length;
};
haxe.Unserializer.fastCharCodeAt = function(s,pos) {
	return HxOverrides.cca(s,pos);
};
haxe.Unserializer.fastCharAt = function(s,pos) {
	return s.charAt(pos);
};
haxe.Unserializer.fastSubstr = function(s,pos,length) {
	return HxOverrides.substr(s,pos,length);
};
haxe.Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) {
			if(haxe._Unserializer.NullResolver.instance == null) {
				haxe._Unserializer.NullResolver.instance = new haxe._Unserializer.NullResolver();
			}
			this.resolver = haxe._Unserializer.NullResolver.instance;
		} else {
			this.resolver = r;
		}
	}
	,getResolver: function() {
		return this.resolver;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c == 45) {
				if(this.pos != fpos) {
					break;
				}
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) {
				break;
			}
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) {
			k *= -1;
		}
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) {
				break;
			}
			if(c >= 43 && c < 58 || c == 101 || c == 69) {
				this.pos++;
			} else {
				break;
			}
		}
		return parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) {
				throw haxe.Exception.thrown("Invalid object");
			}
			if(this.buf.charCodeAt(this.pos) == 103) {
				break;
			}
			var k = this.unserialize();
			if(typeof(k) != "string") {
				throw haxe.Exception.thrown("Invalid object key");
			}
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) {
			throw haxe.Exception.thrown("Invalid enum format");
		}
		var nargs = this.readDigits();
		if(nargs == 0) {
			return Type.createEnum(edecl,tag);
		}
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
		case 65:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe.Exception.thrown("Class not found " + name);
			}
			return cl;
		case 66:
			var name = this.unserialize();
			var e = this.resolver.resolveEnum(name);
			if(e == null) {
				throw haxe.Exception.thrown("Enum not found " + name);
			}
			return e;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe.Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) {
				throw haxe.Exception.thrown("Invalid custom data");
			}
			return o;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) {
				throw haxe.Exception.thrown("Invalid string reference");
			}
			return this.scache[n];
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else {
					a.push(this.unserialize());
				}
			}
			return a;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				var value = this.unserialize();
				h.h[s] = value;
			}
			this.pos++;
			return h;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) {
				throw haxe.Exception.thrown("Class not found " + name);
			}
			var o = Object.create(cl.prototype);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 100:
			return this.readFloat();
		case 102:
			return false;
		case 105:
			return this.readDigits();
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe.Exception.thrown("Enum not found " + name);
			}
			this.pos++;
			var index = this.readDigits();
			var _this = edecl.__constructs__;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = _this[i]._hx_name;
			}
			var tag = result[index];
			if(tag == null) {
				throw haxe.Exception.thrown("Unknown enum index " + name + "@" + index);
			}
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 107:
			return NaN;
		case 108:
			var l = new haxe.ds.List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 109:
			return -Infinity;
		case 110:
			return null;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 112:
			return Infinity;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				var value = this.unserialize();
				h.h[i] = value;
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) {
				throw haxe.Exception.thrown("Invalid IntMap format");
			}
			return h;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) {
				throw haxe.Exception.thrown("Invalid reference");
			}
			return this.cache[n];
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe.Exception.thrown("Invalid bytes length");
			}
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2 ? rest - 1 : 0);
			var max = i + (len - rest);
			var bytes = new haxe.io.Bytes(new ArrayBuffer(size));
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c3 << 6 | c4;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = c1 << 2 | c2 >> 4;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = c2 << 4 | c3 >> 2;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 116:
			return true;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
				this.pos += 19;
			} else {
				d = new Date(this.readFloat());
			}
			this.cache.push(d);
			return d;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) {
				throw haxe.Exception.thrown("Enum not found " + name);
			}
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 120:
			throw haxe.Exception.thrown(this.unserialize());
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) {
				throw haxe.Exception.thrown("Invalid string length");
			}
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 122:
			return 0;
		default:
		}
		this.pos--;
		throw haxe.Exception.thrown("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe.Unserializer
};
haxe._Unserializer.NullResolver = function() {
};
$hxClasses["haxe._Unserializer.NullResolver"] = haxe._Unserializer.NullResolver;
haxe._Unserializer.NullResolver.__name__ = "haxe._Unserializer.NullResolver";
haxe._Unserializer.NullResolver.__properties__ = {get_instance:"get_instance"};
haxe._Unserializer.NullResolver.instance = null;
haxe._Unserializer.NullResolver.get_instance = function() {
	if(haxe._Unserializer.NullResolver.instance == null) {
		haxe._Unserializer.NullResolver.instance = new haxe._Unserializer.NullResolver();
	}
	return haxe._Unserializer.NullResolver.instance;
};
haxe._Unserializer.NullResolver.prototype = {
	resolveClass: function(name) {
		return null;
	}
	,resolveEnum: function(name) {
		return null;
	}
	,__class__: haxe._Unserializer.NullResolver
};
haxe.ValueException = function(value,previous,native) {
	haxe.Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe.ValueException;
haxe.ValueException.__name__ = "haxe.ValueException";
haxe.ValueException.__super__ = haxe.Exception;
haxe.ValueException.prototype = $extend(haxe.Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe.ValueException
});
haxe.io = {};
haxe.io.Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = "haxe.io.Bytes";
haxe.io.Bytes.alloc = function(length) {
	return new haxe.io.Bytes(new ArrayBuffer(length));
};
haxe.io.Bytes.ofString = function(s,encoding) {
	if(encoding == haxe.io.Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe.io.Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(new Uint8Array(a).buffer);
};
haxe.io.Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe.io.Bytes(b);
};
haxe.io.Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe.Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe.io.Bytes(new Uint8Array(a).buffer);
};
haxe.io.Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			this.b[pos++] = value;
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		return new haxe.io.Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length ? this.length : other.length;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			if(b1[i] != b2[i]) {
				return b1[i] - b2[i];
			}
		}
		return this.length - other.length;
	}
	,initData: function() {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setUint16(pos,v,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		var this1 = new haxe._Int64.___Int64(this.getInt32(pos + 4),this.getInt32(pos));
		return this1;
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe.io.Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b.bufferValue;
	}
	,__class__: haxe.io.Bytes
};
haxe.io.Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:"haxe.io.Encoding",__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe.io.Encoding.__constructs__ = [haxe.io.Encoding.UTF8,haxe.io.Encoding.RawNative];
haxe.io.Encoding.__empty_constructs__ = [haxe.io.Encoding.UTF8,haxe.io.Encoding.RawNative];
haxe.crypto = {};
haxe.crypto.Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe.crypto.Base64;
haxe.crypto.Base64.__name__ = "haxe.crypto.Base64";
haxe.crypto.Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.Base64.urlEncode = function(bytes,complement) {
	if(complement == null) {
		complement = false;
	}
	var str = new haxe.crypto.BaseCode(haxe.crypto.Base64.URL_BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe.crypto.Base64.urlDecode = function(str,complement) {
	if(complement == null) {
		complement = false;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.URL_BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe.Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = "haxe.crypto.BaseCode";
haxe.crypto.BaseCode.encode = function(s,base) {
	var b = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString(base));
	return b.encodeString(s);
};
haxe.crypto.BaseCode.decode = function(s,base) {
	var b = new haxe.crypto.BaseCode(haxe.io.Bytes.ofString(base));
	return b.decodeString(s);
};
haxe.crypto.BaseCode.prototype = {
	base: null
	,nbits: null
	,tbl: null
	,encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe.io.Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe.io.Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe.Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
	,encodeString: function(s) {
		return this.encodeBytes(haxe.io.Bytes.ofString(s)).toString();
	}
	,decodeString: function(s) {
		return this.decodeBytes(haxe.io.Bytes.ofString(s)).toString();
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.ds = {};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = "haxe.ds.BalancedTree";
haxe.ds.BalancedTree.__interfaces__ = [haxe.IMap];
haxe.ds.BalancedTree.iteratorLoop = function(node,acc) {
	if(node != null) {
		haxe.ds.BalancedTree.iteratorLoop(node.left,acc);
		acc.push(node.value);
		haxe.ds.BalancedTree.iteratorLoop(node.right,acc);
	}
};
haxe.ds.BalancedTree.prototype = {
	root: null
	,set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return node.value;
			}
			if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			if(typeof(haxe.Exception.caught(_g).unwrap()) == "string") {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) {
				return true;
			} else if(c < 0) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		haxe.ds.BalancedTree.iteratorLoop(this.root,ret);
		return new haxe.iterators.ArrayIterator(ret);
	}
	,keyValueIterator: function() {
		return new haxe.iterators.MapKeyValueIterator(this);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return new haxe.iterators.ArrayIterator(ret);
	}
	,copy: function() {
		var copied = new haxe.ds.BalancedTree();
		copied.root = this.root;
		return copied;
	}
	,setLoop: function(k,v,node) {
		if(node == null) {
			return new haxe.ds.TreeNode(null,k,v,null);
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null ? 0 : node._height);
		} else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,removeLoop: function(k,node) {
		if(node == null) {
			throw haxe.Exception.thrown("Not_found");
		}
		var c = this.compare(k,node.key);
		if(c == 0) {
			return this.merge(node.left,node.right);
		} else if(c < 0) {
			return this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right);
		} else {
			return this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) {
			return t2;
		}
		if(t2 == null) {
			return t1;
		}
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		if(t == null) {
			throw haxe.Exception.thrown("Not_found");
		} else if(t.left == null) {
			return t;
		} else {
			return this.minBinding(t.left);
		}
	}
	,removeMinBinding: function(t) {
		if(t.left == null) {
			return t.right;
		} else {
			return this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
		}
	}
	,balance: function(l,k,v,r) {
		var hl = l == null ? 0 : l._height;
		var hr = r == null ? 0 : r._height;
		if(hl > hr + 2) {
			var _this = l.left;
			var _this1 = l.right;
			if((_this == null ? 0 : _this._height) >= (_this1 == null ? 0 : _this1._height)) {
				return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r));
			} else {
				return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
			}
		} else if(hr > hl + 2) {
			var _this = r.right;
			var _this1 = r.left;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right);
			} else {
				return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
			}
		} else {
			return new haxe.ds.TreeNode(l,k,v,r,(hl > hr ? hl : hr) + 1);
		}
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,toString: function() {
		if(this.root == null) {
			return "{}";
		} else {
			return "{" + this.root.toString() + "}";
		}
	}
	,clear: function() {
		this.root = null;
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) {
		h = -1;
	}
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		var _this1 = this.right;
		if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
			var _this = this.left;
			tmp = _this == null ? 0 : _this._height;
		} else {
			var _this = this.right;
			tmp = _this == null ? 0 : _this._height;
		}
		this._height = tmp + 1;
	} else {
		this._height = h;
	}
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = "haxe.ds.TreeNode";
haxe.ds.TreeNode.prototype = {
	left: null
	,right: null
	,key: null
	,value: null
	,_height: null
	,toString: function() {
		return (this.left == null ? "" : this.left.toString() + ", ") + ("" + Std.string(this.key) + "=" + Std.string(this.value)) + (this.right == null ? "" : ", " + this.right.toString());
	}
	,__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = "haxe.ds.EnumValueMap";
haxe.ds.EnumValueMap.__interfaces__ = [haxe.IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1._hx_index - k2._hx_index;
		if(d != 0) {
			return d;
		}
		var p1 = Type.enumParameters(k1);
		var p2 = Type.enumParameters(k2);
		if(p1.length == 0 && p2.length == 0) {
			return 0;
		}
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) {
			return ld;
		}
		var _g = 0;
		var _g1 = a1.length;
		while(_g < _g1) {
			var i = _g++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) {
				return d;
			}
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) {
			return this.compare(v1,v2);
		} else if(((v1) instanceof Array) && ((v2) instanceof Array)) {
			return this.compareArgs(v1,v2);
		} else {
			return Reflect.compare(v1,v2);
		}
	}
	,copy: function() {
		var copied = new haxe.ds.EnumValueMap();
		copied.root = this.root;
		return copied;
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.HashMap = {};
haxe.ds.HashMap._new = function() {
	var this1 = new haxe.ds._HashMap.HashMapData();
	return this1;
};
haxe.ds.HashMap.set = function(this1,k,v) {
	var _this = this1.keys;
	var key = k.hashCode();
	_this.h[key] = k;
	var _this = this1.values;
	var key = k.hashCode();
	_this.h[key] = v;
};
haxe.ds.HashMap.get = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h[key];
};
haxe.ds.HashMap.exists = function(this1,k) {
	var _this = this1.values;
	var key = k.hashCode();
	return _this.h.hasOwnProperty(key);
};
haxe.ds.HashMap.remove = function(this1,k) {
	this1.values.remove(k.hashCode());
	return this1.keys.remove(k.hashCode());
};
haxe.ds.HashMap.keys = function(this1) {
	return this1.keys.iterator();
};
haxe.ds.HashMap.copy = function(this1) {
	var copied = new haxe.ds._HashMap.HashMapData();
	copied.keys = this1.keys.copy();
	copied.values = this1.values.copy();
	return copied;
};
haxe.ds.HashMap.iterator = function(this1) {
	return this1.values.iterator();
};
haxe.ds.HashMap.keyValueIterator = function(this1) {
	return new haxe.iterators.HashMapKeyValueIterator(this1);
};
haxe.ds.HashMap.clear = function(this1) {
	this1.keys.h = { };
	this1.values.h = { };
};
haxe.ds._HashMap = {};
haxe.ds._HashMap.HashMapData = function() {
	this.keys = new haxe.ds.IntMap();
	this.values = new haxe.ds.IntMap();
};
$hxClasses["haxe.ds._HashMap.HashMapData"] = haxe.ds._HashMap.HashMapData;
haxe.ds._HashMap.HashMapData.__name__ = "haxe.ds._HashMap.HashMapData";
haxe.ds._HashMap.HashMapData.prototype = {
	keys: null
	,values: null
	,__class__: haxe.ds._HashMap.HashMapData
};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = "haxe.ds.IntMap";
haxe.ds.IntMap.__interfaces__ = [haxe.IMap];
haxe.ds.IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe.iterators.ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keyValueIterator: function() {
		return new haxe.iterators.MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe.ds.IntMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.h[key1] = this.h[key1];
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += i1 == null ? "null" : "" + i1;
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { };
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.List = function() {
	this.length = 0;
};
$hxClasses["haxe.ds.List"] = haxe.ds.List;
haxe.ds.List.__name__ = "haxe.ds.List";
haxe.ds.List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe.ds._List.ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = new haxe.ds._List.ListNode(item,this.h);
		this.h = x;
		if(this.q == null) {
			this.q = x;
		}
		this.length++;
	}
	,first: function() {
		if(this.h == null) {
			return null;
		} else {
			return this.h.item;
		}
	}
	,last: function() {
		if(this.q == null) {
			return null;
		} else {
			return this.q.item;
		}
	}
	,pop: function() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,iterator: function() {
		return new haxe.ds._List.ListIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe.ds._List.ListKeyValueIterator(this.h);
	}
	,toString: function() {
		var s_b = "";
		var first = true;
		var l = this.h;
		s_b += "{";
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += ", ";
			}
			s_b += Std.string(Std.string(l.item));
			l = l.next;
		}
		s_b += "}";
		return s_b;
	}
	,join: function(sep) {
		var s_b = "";
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) {
				first = false;
			} else {
				s_b += sep == null ? "null" : "" + sep;
			}
			s_b += Std.string(l.item);
			l = l.next;
		}
		return s_b;
	}
	,filter: function(f) {
		var l2 = new haxe.ds.List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			if(f(v)) {
				l2.add(v);
			}
		}
		return l2;
	}
	,map: function(f) {
		var b = new haxe.ds.List();
		var l = this.h;
		while(l != null) {
			var v = l.item;
			l = l.next;
			b.add(f(v));
		}
		return b;
	}
	,__class__: haxe.ds.List
};
haxe.ds._List = {};
haxe.ds._List.ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["haxe.ds._List.ListNode"] = haxe.ds._List.ListNode;
haxe.ds._List.ListNode.__name__ = "haxe.ds._List.ListNode";
haxe.ds._List.ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe.ds._List.ListNode
};
haxe.ds._List.ListIterator = function(head) {
	this.head = head;
};
$hxClasses["haxe.ds._List.ListIterator"] = haxe.ds._List.ListIterator;
haxe.ds._List.ListIterator.__name__ = "haxe.ds._List.ListIterator";
haxe.ds._List.ListIterator.prototype = {
	head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: haxe.ds._List.ListIterator
};
haxe.ds._List.ListKeyValueIterator = function(head) {
	this.head = head;
	this.idx = 0;
};
$hxClasses["haxe.ds._List.ListKeyValueIterator"] = haxe.ds._List.ListKeyValueIterator;
haxe.ds._List.ListKeyValueIterator.__name__ = "haxe.ds._List.ListKeyValueIterator";
haxe.ds._List.ListKeyValueIterator.prototype = {
	idx: null
	,head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return { value : val, key : this.idx++};
	}
	,__class__: haxe.ds._List.ListKeyValueIterator
};
haxe.ds.Map = {};
haxe.ds.Map.set = function(this1,key,value) {
	this1.set(key,value);
};
haxe.ds.Map.get = function(this1,key) {
	return this1.get(key);
};
haxe.ds.Map.exists = function(this1,key) {
	return this1.exists(key);
};
haxe.ds.Map.remove = function(this1,key) {
	return this1.remove(key);
};
haxe.ds.Map.keys = function(this1) {
	return this1.keys();
};
haxe.ds.Map.iterator = function(this1) {
	return this1.iterator();
};
haxe.ds.Map.keyValueIterator = function(this1) {
	return this1.keyValueIterator();
};
haxe.ds.Map.copy = function(this1) {
	return this1.copy();
};
haxe.ds.Map.toString = function(this1) {
	return this1.toString();
};
haxe.ds.Map.clear = function(this1) {
	this1.clear();
};
haxe.ds.Map.arrayWrite = function(this1,k,v) {
	this1.set(k,v);
	return v;
};
haxe.ds.Map.toStringMap = function(t) {
	return new haxe.ds.StringMap();
};
haxe.ds.Map.toIntMap = function(t) {
	return new haxe.ds.IntMap();
};
haxe.ds.Map.toEnumValueMapMap = function(t) {
	return new haxe.ds.EnumValueMap();
};
haxe.ds.Map.toObjectMap = function(t) {
	return new haxe.ds.ObjectMap();
};
haxe.ds.Map.fromStringMap = function(map) {
	return map;
};
haxe.ds.Map.fromIntMap = function(map) {
	return map;
};
haxe.ds.Map.fromObjectMap = function(map) {
	return map;
};
haxe.ds.ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = "haxe.ds.ObjectMap";
haxe.ds.ObjectMap.__interfaces__ = [haxe.IMap];
haxe.ds.ObjectMap.count = null;
haxe.ds.ObjectMap.assignId = function(obj) {
	return (obj.__id__ = $global.$haxeUID++);
};
haxe.ds.ObjectMap.getId = function(obj) {
	return obj.__id__;
};
haxe.ds.ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__;
		if(id == null) {
			id = (key.__id__ = $global.$haxeUID++);
		}
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return new haxe.iterators.ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keyValueIterator: function() {
		return new haxe.iterators.MapKeyValueIterator(this);
	}
	,copy: function() {
		var copied = new haxe.ds.ObjectMap();
		var key = this.keys();
		while(key.hasNext()) {
			var key1 = key.next();
			copied.set(key1,this.h[key1.__id__]);
		}
		return copied;
	}
	,toString: function() {
		var s_b = "";
		s_b += "{";
		var it = this.keys();
		var i = it;
		while(i.hasNext()) {
			var i1 = i.next();
			s_b += Std.string(Std.string(i1));
			s_b += " => ";
			s_b += Std.string(Std.string(this.h[i1.__id__]));
			if(it.hasNext()) {
				s_b += ", ";
			}
		}
		s_b += "}";
		return s_b;
	}
	,clear: function() {
		this.h = { __keys__ : { }};
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.Option = $hxEnums["haxe.ds.Option"] = { __ename__:"haxe.ds.Option",__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"haxe.ds.Option",toString:$estr}
};
haxe.ds.Option.__constructs__ = [haxe.ds.Option.Some,haxe.ds.Option.None];
haxe.ds.Option.__empty_constructs__ = [haxe.ds.Option.None];
haxe.ds.ReadOnlyArray = {};
haxe.ds.ReadOnlyArray.__properties__ = {get_length:"get_length"};
haxe.ds.ReadOnlyArray.get_length = function(this1) {
	return this1.length;
};
haxe.ds.ReadOnlyArray.get = function(this1,i) {
	return this1[i];
};
haxe.ds.ReadOnlyArray.concat = function(this1,a) {
	return this1.concat(a);
};
haxe.ds.StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = "haxe.ds.StringMap";
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.createCopy = function(h) {
	var copy = new haxe.ds.StringMap();
	for (var key in h) copy.h[key] = h[key];
	return copy;
};
haxe.ds.StringMap.stringify = function(h) {
	var s = "{";
	var first = true;
	for (var key in h) {
		if (first) first = false; else s += ',';
		s += key + ' => ' + Std.string(h[key]);
	}
	return s + "}";
};
haxe.ds.StringMap.prototype = {
	h: null
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.h,key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(Object.prototype.hasOwnProperty.call(this.h,key)) {
			delete(this.h[key]);
			return true;
		} else {
			return false;
		}
	}
	,keys: function() {
		return new haxe.ds._StringMap.StringMapKeyIterator(this.h);
	}
	,iterator: function() {
		return new haxe.ds._StringMap.StringMapValueIterator(this.h);
	}
	,keyValueIterator: function() {
		return new haxe.ds._StringMap.StringMapKeyValueIterator(this.h);
	}
	,copy: function() {
		return haxe.ds.StringMap.createCopy(this.h);
	}
	,clear: function() {
		this.h = Object.create(null);
	}
	,toString: function() {
		return haxe.ds.StringMap.stringify(this.h);
	}
	,__class__: haxe.ds.StringMap
};
haxe.ds._StringMap = {};
haxe.ds._StringMap.StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe.ds._StringMap.StringMapKeyIterator;
haxe.ds._StringMap.StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe.ds._StringMap.StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe.ds._StringMap.StringMapKeyIterator
};
haxe.ds._StringMap.StringMapValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapValueIterator"] = haxe.ds._StringMap.StringMapValueIterator;
haxe.ds._StringMap.StringMapValueIterator.__name__ = "haxe.ds._StringMap.StringMapValueIterator";
haxe.ds._StringMap.StringMapValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.h[this.keys[this.current++]];
	}
	,__class__: haxe.ds._StringMap.StringMapValueIterator
};
haxe.ds._StringMap.StringMapKeyValueIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyValueIterator"] = haxe.ds._StringMap.StringMapKeyValueIterator;
haxe.ds._StringMap.StringMapKeyValueIterator.__name__ = "haxe.ds._StringMap.StringMapKeyValueIterator";
haxe.ds._StringMap.StringMapKeyValueIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		var key = this.keys[this.current++];
		return { key : key, value : this.h[key]};
	}
	,__class__: haxe.ds._StringMap.StringMapKeyValueIterator
};
haxe.ds.Vector = {};
haxe.ds.Vector.__properties__ = {get_length:"get_length"};
haxe.ds.Vector._new = function(length) {
	var this1 = new Array(length);
	return this1;
};
haxe.ds.Vector.get = function(this1,index) {
	return this1[index];
};
haxe.ds.Vector.set = function(this1,index,val) {
	return this1[index] = val;
};
haxe.ds.Vector.get_length = function(this1) {
	return this1.length;
};
haxe.ds.Vector.blit = function(src,srcPos,dest,destPos,len) {
	if(src == dest) {
		if(srcPos < destPos) {
			var i = srcPos + len;
			var j = destPos + len;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var k = _g++;
				--i;
				--j;
				src[j] = src[i];
			}
		} else if(srcPos > destPos) {
			var i = srcPos;
			var j = destPos;
			var _g = 0;
			var _g1 = len;
			while(_g < _g1) {
				var k = _g++;
				src[j] = src[i];
				++i;
				++j;
			}
		}
	} else {
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			dest[destPos + i] = src[srcPos + i];
		}
	}
};
haxe.ds.Vector.toArray = function(this1) {
	return this1.slice(0);
};
haxe.ds.Vector.toData = function(this1) {
	return this1;
};
haxe.ds.Vector.fromData = function(data) {
	return data;
};
haxe.ds.Vector.fromArrayCopy = function(array) {
	return array.slice(0);
};
haxe.ds.Vector.copy = function(this1) {
	var this2 = new Array(this1.length);
	var r = this2;
	haxe.ds.Vector.blit(this1,0,r,0,this1.length);
	return r;
};
haxe.ds.Vector.join = function(this1,sep) {
	var b_b = "";
	var len = this1.length;
	var _g = 0;
	var _g1 = len;
	while(_g < _g1) {
		var i = _g++;
		b_b += Std.string(Std.string(this1[i]));
		if(i < len - 1) {
			b_b += sep == null ? "null" : "" + sep;
		}
	}
	return b_b;
};
haxe.ds.Vector.map = function(this1,f) {
	var length = this1.length;
	var this2 = new Array(length);
	var r = this2;
	var len = length;
	var _g = 0;
	var _g1 = len;
	while(_g < _g1) {
		var i = _g++;
		var v = f(this1[i]);
		r[i] = v;
	}
	return r;
};
haxe.ds.Vector.sort = function(this1,f) {
	this1.sort(f);
};
haxe.ds.WeakMap = function() {
	throw new haxe.exceptions.NotImplementedException("Not implemented for this platform",null,{ fileName : "haxe/ds/WeakMap.hx", lineNumber : 39, className : "haxe.ds.WeakMap", methodName : "new"});
};
$hxClasses["haxe.ds.WeakMap"] = haxe.ds.WeakMap;
haxe.ds.WeakMap.__name__ = "haxe.ds.WeakMap";
haxe.ds.WeakMap.__interfaces__ = [haxe.IMap];
haxe.ds.WeakMap.prototype = {
	set: function(key,value) {
	}
	,get: function(key) {
		return null;
	}
	,exists: function(key) {
		return false;
	}
	,remove: function(key) {
		return false;
	}
	,keys: function() {
		return null;
	}
	,iterator: function() {
		return null;
	}
	,keyValueIterator: function() {
		return null;
	}
	,copy: function() {
		return null;
	}
	,toString: function() {
		return null;
	}
	,clear: function() {
	}
	,__class__: haxe.ds.WeakMap
};
haxe.exceptions = {};
haxe.exceptions.PosException = function(message,previous,pos) {
	haxe.Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe.exceptions.PosException;
haxe.exceptions.PosException.__name__ = "haxe.exceptions.PosException";
haxe.exceptions.PosException.__super__ = haxe.Exception;
haxe.exceptions.PosException.prototype = $extend(haxe.Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe.Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe.exceptions.PosException
});
haxe.exceptions.NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe.exceptions.PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe.exceptions.NotImplementedException;
haxe.exceptions.NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe.exceptions.NotImplementedException.__super__ = haxe.exceptions.PosException;
haxe.exceptions.NotImplementedException.prototype = $extend(haxe.exceptions.PosException.prototype,{
	__class__: haxe.exceptions.NotImplementedException
});
haxe.io.BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = "haxe.io.BytesBuffer";
haxe.io.BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,get_length: function() {
		return this.pos;
	}
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset,src.length);
		this.u8.set(sub,this.pos);
		this.pos += src.length;
	}
	,addString: function(v,encoding) {
		this.add(haxe.io.Bytes.ofString(v,encoding));
	}
	,addInt32: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setInt32(this.pos,v,true);
		this.pos += 4;
	}
	,addInt64: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setInt32(this.pos,v.low,true);
		this.view.setInt32(this.pos + 4,v.high,true);
		this.pos += 8;
	}
	,addFloat: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setFloat32(this.pos,v,true);
		this.pos += 4;
	}
	,addDouble: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setFloat64(this.pos,v,true);
		this.pos += 8;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len);
		this.u8.set(sub,this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe.io.Bytes(new ArrayBuffer(0));
		}
		var b = new haxe.io.Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe.io.BytesBuffer
	,__properties__: {get_length:"get_length"}
};
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = "haxe.io.Eof";
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxEnums["haxe.io.Error"] = { __ename__:"haxe.io.Error",__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe.io.Error.__constructs__ = [haxe.io.Error.Blocked,haxe.io.Error.Overflow,haxe.io.Error.OutsideBounds,haxe.io.Error.Custom];
haxe.io.Error.__empty_constructs__ = [haxe.io.Error.Blocked,haxe.io.Error.Overflow,haxe.io.Error.OutsideBounds];
haxe.io.FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe.io.FPHelper;
haxe.io.FPHelper.__name__ = "haxe.io.FPHelper";
haxe.io.FPHelper._i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var e = i >> 23 & 255;
	if(e == 255) {
		if((i & 8388607) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = e == 0 ? (i & 8388607) << 1 : i & 8388607 | 8388608;
	return sign * m * Math.pow(2,e - 150);
};
haxe.io.FPHelper._i64ToDouble = function(lo,hi) {
	var sign = 1 - (hi >>> 31 << 1);
	var e = hi >> 20 & 2047;
	if(e == 2047) {
		if(lo == 0 && (hi & 1048575) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = 2.220446049250313e-16 * ((hi & 1048575) * 4294967296. + (lo >>> 31) * 2147483648. + (lo & 2147483647));
	if(e == 0) {
		m *= 2.0;
	} else {
		m += 1.0;
	}
	return sign * m * Math.pow(2,e - 1023);
};
haxe.io.FPHelper._floatToI32 = function(f) {
	if(f == 0) {
		return 0;
	}
	var af = f < 0 ? -f : f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp > 127) {
		return 2139095040;
	} else {
		if(exp <= -127) {
			exp = -127;
			af *= 7.1362384635298e+44;
		} else {
			af = (af / Math.pow(2,exp) - 1.0) * 8388608;
		}
		return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | Math.round(af);
	}
};
haxe.io.FPHelper._doubleToI64 = function(v) {
	var i64 = haxe.io.FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else if(!isFinite(v)) {
		i64.low = 0;
		i64.high = v > 0 ? 2146435072 : -1048576;
	} else {
		var av = v < 0 ? -v : v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		if(exp > 1023) {
			i64.low = -1;
			i64.high = 2146435071;
		} else {
			if(exp <= -1023) {
				exp = -1023;
				av /= 2.2250738585072014e-308;
			} else {
				av = av / Math.pow(2,exp) - 1.0;
			}
			var sig = Math.round(av * 4503599627370496.);
			var sig_l = sig | 0;
			var sig_h = sig / 4294967296.0 | 0;
			i64.low = sig_l;
			i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | sig_h;
		}
	}
	return i64;
};
haxe.io.FPHelper.i32ToFloat = function(i) {
	haxe.io.FPHelper.helper.setInt32(0,i,true);
	return haxe.io.FPHelper.helper.getFloat32(0,true);
};
haxe.io.FPHelper.floatToI32 = function(f) {
	haxe.io.FPHelper.helper.setFloat32(0,f,true);
	return haxe.io.FPHelper.helper.getInt32(0,true);
};
haxe.io.FPHelper.i64ToDouble = function(low,high) {
	haxe.io.FPHelper.helper.setInt32(0,low,true);
	haxe.io.FPHelper.helper.setInt32(4,high,true);
	return haxe.io.FPHelper.helper.getFloat64(0,true);
};
haxe.io.FPHelper.doubleToI64 = function(v) {
	var i64 = haxe.io.FPHelper.i64tmp;
	haxe.io.FPHelper.helper.setFloat64(0,v,true);
	i64.low = haxe.io.FPHelper.helper.getInt32(0,true);
	i64.high = haxe.io.FPHelper.helper.getInt32(4,true);
	return i64;
};
haxe.io.Input = function() { };
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = "haxe.io.Input";
haxe.io.Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe.exceptions.NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			if(!((haxe.Exception.caught(_g).unwrap()) instanceof haxe.io.Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) {
			bufsize = 16384;
		}
		var buf = new haxe.io.Bytes(new ArrayBuffer(bufsize));
		var total = new haxe.io.BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe.Exception.thrown(haxe.io.Error.Blocked);
				}
				total.addBytes(buf,0,len);
			}
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			if(!((haxe.Exception.caught(_g).unwrap()) instanceof haxe.io.Eof)) {
				throw _g;
			}
		}
		return total.getBytes();
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe.Exception.thrown(haxe.io.Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe.io.Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe.Exception.thrown(haxe.io.Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new haxe.io.BytesBuffer();
		var last;
		while(true) {
			last = this.readByte();
			if(!(last != end)) {
				break;
			}
			buf.addByte(last);
		}
		return buf.getBytes().toString();
	}
	,readLine: function() {
		var buf = new haxe.io.BytesBuffer();
		var last;
		var s;
		try {
			while(true) {
				last = this.readByte();
				if(!(last != 10)) {
					break;
				}
				buf.addByte(last);
			}
			s = buf.getBytes().toString();
			if(HxOverrides.cca(s,s.length - 1) == 13) {
				s = HxOverrides.substr(s,0,-1);
			}
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			var _g1 = haxe.Exception.caught(_g).unwrap();
			if(((_g1) instanceof haxe.io.Eof)) {
				var e = _g1;
				s = buf.getBytes().toString();
				if(s.length == 0) {
					throw haxe.Exception.thrown(e);
				}
			} else {
				throw _g;
			}
		}
		return s;
	}
	,readFloat: function() {
		return haxe.io.FPHelper.i32ToFloat(this.readInt32());
	}
	,readDouble: function() {
		var i1 = this.readInt32();
		var i2 = this.readInt32();
		if(this.bigEndian) {
			return haxe.io.FPHelper.i64ToDouble(i2,i1);
		} else {
			return haxe.io.FPHelper.i64ToDouble(i1,i2);
		}
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) {
			return n - 256;
		}
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian ? ch2 | ch1 << 8 : ch1 | ch2 << 8;
		if((n & 32768) != 0) {
			return n - 65536;
		}
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian ? ch3 | ch2 << 8 | ch1 << 16 : ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) {
			return n - 16777216;
		}
		return n;
	}
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		if(this.bigEndian) {
			return ch3 | ch2 << 8 | ch1 << 16;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16;
		}
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe.io.Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,getDoubleSig: function(bytes) {
		return ((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * 4294967296. + (bytes[4] >> 7) * 2147483648 + ((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]);
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
haxe.io.Output = function() { };
$hxClasses["haxe.io.Output"] = haxe.io.Output;
haxe.io.Output.__name__ = "haxe.io.Output";
haxe.io.Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe.exceptions.NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe.Exception.thrown(haxe.io.Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,flush: function() {
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe.Exception.thrown(haxe.io.Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe.io.FPHelper.floatToI32(x));
	}
	,writeDouble: function(x) {
		var i64 = haxe.io.FPHelper.doubleToI64(x);
		if(this.bigEndian) {
			this.writeInt32(i64.high);
			this.writeInt32(i64.low);
		} else {
			this.writeInt32(i64.low);
			this.writeInt32(i64.high);
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) {
			throw haxe.Exception.thrown(haxe.io.Error.Overflow);
		}
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) {
			throw haxe.Exception.thrown(haxe.io.Error.Overflow);
		}
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) {
			throw haxe.Exception.thrown(haxe.io.Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) {
			throw haxe.Exception.thrown(haxe.io.Error.Overflow);
		}
		this.writeUInt24(x & 16777215);
	}
	,writeUInt24: function(x) {
		if(x < 0 || x >= 16777216) {
			throw haxe.Exception.thrown(haxe.io.Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 16);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,prepare: function(nbytes) {
	}
	,writeInput: function(i,bufsize) {
		if(bufsize == null) {
			bufsize = 4096;
		}
		var buf = new haxe.io.Bytes(new ArrayBuffer(bufsize));
		try {
			while(true) {
				var len = i.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe.Exception.thrown(haxe.io.Error.Blocked);
				}
				var p = 0;
				while(len > 0) {
					var k = this.writeBytes(buf,p,len);
					if(k == 0) {
						throw haxe.Exception.thrown(haxe.io.Error.Blocked);
					}
					p += k;
					len -= k;
				}
			}
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			if(!((haxe.Exception.caught(_g).unwrap()) instanceof haxe.io.Eof)) {
				throw _g;
			}
		}
	}
	,writeString: function(s,encoding) {
		var b = haxe.io.Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe.io.Output
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
haxe.io.Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe.io.Path;
haxe.io.Path.__name__ = "haxe.io.Path";
haxe.io.Path.withoutExtension = function(path) {
	var s = new haxe.io.Path(path);
	s.ext = null;
	return s.toString();
};
haxe.io.Path.withoutDirectory = function(path) {
	var s = new haxe.io.Path(path);
	s.dir = null;
	return s.toString();
};
haxe.io.Path.directory = function(path) {
	var s = new haxe.io.Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe.io.Path.extension = function(path) {
	var s = new haxe.io.Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
haxe.io.Path.withExtension = function(path,ext) {
	var s = new haxe.io.Path(path);
	s.ext = ext;
	return s.toString();
};
haxe.io.Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	var _g2 = paths;
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	var paths = _g;
	if(paths.length == 0) {
		return "";
	}
	var path = paths[0];
	var _g = 1;
	var _g1 = paths.length;
	while(_g < _g1) {
		var i = _g++;
		path = haxe.io.Path.addTrailingSlash(path);
		path += paths[i];
	}
	return haxe.io.Path.normalize(path);
};
haxe.io.Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var tmp = target.join(slash);
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = tmp;
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe.io.Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
haxe.io.Path.removeTrailingSlashes = function(path) {
	_hx_loop1: while(true) {
		var _g = HxOverrides.cca(path,path.length - 1);
		if(_g == null) {
			break;
		} else {
			switch(_g) {
			case 47:case 92:
				path = HxOverrides.substr(path,0,-1);
				break;
			default:
				break _hx_loop1;
			}
		}
	}
	return path;
};
haxe.io.Path.isAbsolute = function(path) {
	if(StringTools.startsWith(path,"/")) {
		return true;
	}
	if(path.charAt(1) == ":") {
		return true;
	}
	if(StringTools.startsWith(path,"\\\\")) {
		return true;
	}
	return false;
};
haxe.io.Path.unescape = function(path) {
	var regex = new EReg("-x([0-9][0-9])","g");
	return regex.map(path,function(regex) {
		var code = Std.parseInt(regex.matched(1));
		return String.fromCodePoint(code);
	});
};
haxe.io.Path.escape = function(path,allowSlashes) {
	if(allowSlashes == null) {
		allowSlashes = false;
	}
	var regex = allowSlashes ? new EReg("[^A-Za-z0-9_/\\\\\\.]","g") : new EReg("[^A-Za-z0-9_\\.]","g");
	return regex.map(path,function(v) {
		return "-x" + HxOverrides.cca(v.matched(0),0);
	});
};
haxe.io.Path.prototype = {
	dir: null
	,file: null
	,ext: null
	,backslash: null
	,toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
	,__class__: haxe.io.Path
};
haxe.iterators = {};
haxe.iterators.ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe.iterators.ArrayIterator;
haxe.iterators.ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe.iterators.ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe.iterators.ArrayIterator
};
haxe.iterators.ArrayKeyValueIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe.iterators.ArrayKeyValueIterator;
haxe.iterators.ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
haxe.iterators.ArrayKeyValueIterator.prototype = {
	current: null
	,array: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return { value : this.array[this.current], key : this.current++};
	}
	,__class__: haxe.iterators.ArrayKeyValueIterator
};
haxe.iterators.DynamicAccessIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe.iterators.DynamicAccessIterator;
haxe.iterators.DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
haxe.iterators.DynamicAccessIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		return this.access[this.keys[this.index++]];
	}
	,__class__: haxe.iterators.DynamicAccessIterator
};
haxe.iterators.DynamicAccessKeyValueIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe.iterators.DynamicAccessKeyValueIterator;
haxe.iterators.DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
haxe.iterators.DynamicAccessKeyValueIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		var key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
	,__class__: haxe.iterators.DynamicAccessKeyValueIterator
};
haxe.iterators.HashMapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys.iterator();
};
$hxClasses["haxe.iterators.HashMapKeyValueIterator"] = haxe.iterators.HashMapKeyValueIterator;
haxe.iterators.HashMapKeyValueIterator.__name__ = "haxe.iterators.HashMapKeyValueIterator";
haxe.iterators.HashMapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		var _this = this.map.values;
		var key1 = key.hashCode();
		return { value : _this.h[key1], key : key};
	}
	,__class__: haxe.iterators.HashMapKeyValueIterator
};
haxe.iterators.MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
$hxClasses["haxe.iterators.MapKeyValueIterator"] = haxe.iterators.MapKeyValueIterator;
haxe.iterators.MapKeyValueIterator.__name__ = "haxe.iterators.MapKeyValueIterator";
haxe.iterators.MapKeyValueIterator.prototype = {
	map: null
	,keys: null
	,hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
	,__class__: haxe.iterators.MapKeyValueIterator
};
haxe.iterators.RestIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestIterator"] = haxe.iterators.RestIterator;
haxe.iterators.RestIterator.__name__ = "haxe.iterators.RestIterator";
haxe.iterators.RestIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return this.args[this.current++];
	}
	,__class__: haxe.iterators.RestIterator
};
haxe.iterators.RestKeyValueIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe.iterators.RestKeyValueIterator;
haxe.iterators.RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
haxe.iterators.RestKeyValueIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return { key : this.current, value : this.args[this.current++]};
	}
	,__class__: haxe.iterators.RestKeyValueIterator
};
haxe.iterators.StringIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIterator"] = haxe.iterators.StringIterator;
haxe.iterators.StringIterator.__name__ = "haxe.iterators.StringIterator";
haxe.iterators.StringIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return this.s.charCodeAt(this.offset++);
	}
	,__class__: haxe.iterators.StringIterator
};
haxe.iterators.StringIteratorUnicode = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe.iterators.StringIteratorUnicode;
haxe.iterators.StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
haxe.iterators.StringIteratorUnicode.unicodeIterator = function(s) {
	return new haxe.iterators.StringIteratorUnicode(s);
};
haxe.iterators.StringIteratorUnicode.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		var s = this.s;
		var index = this.offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	,__class__: haxe.iterators.StringIteratorUnicode
};
haxe.iterators.StringKeyValueIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe.iterators.StringKeyValueIterator;
haxe.iterators.StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
haxe.iterators.StringKeyValueIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
	,__class__: haxe.iterators.StringKeyValueIterator
};
haxe.macro = {};
haxe.macro.StringLiteralKind = $hxEnums["haxe.macro.StringLiteralKind"] = { __ename__:"haxe.macro.StringLiteralKind",__constructs__:null
	,DoubleQuotes: {_hx_name:"DoubleQuotes",_hx_index:0,__enum__:"haxe.macro.StringLiteralKind",toString:$estr}
	,SingleQuotes: {_hx_name:"SingleQuotes",_hx_index:1,__enum__:"haxe.macro.StringLiteralKind",toString:$estr}
};
haxe.macro.StringLiteralKind.__constructs__ = [haxe.macro.StringLiteralKind.DoubleQuotes,haxe.macro.StringLiteralKind.SingleQuotes];
haxe.macro.StringLiteralKind.__empty_constructs__ = [haxe.macro.StringLiteralKind.DoubleQuotes,haxe.macro.StringLiteralKind.SingleQuotes];
haxe.macro.Constant = $hxEnums["haxe.macro.Constant"] = { __ename__:"haxe.macro.Constant",__constructs__:null
	,CInt: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.macro.Constant",toString:$estr}; },$_._hx_name="CInt",$_.__params__ = ["v"],$_)
	,CFloat: ($_=function(f) { return {_hx_index:1,f:f,__enum__:"haxe.macro.Constant",toString:$estr}; },$_._hx_name="CFloat",$_.__params__ = ["f"],$_)
	,CString: ($_=function(s,kind) { return {_hx_index:2,s:s,kind:kind,__enum__:"haxe.macro.Constant",toString:$estr}; },$_._hx_name="CString",$_.__params__ = ["s","kind"],$_)
	,CIdent: ($_=function(s) { return {_hx_index:3,s:s,__enum__:"haxe.macro.Constant",toString:$estr}; },$_._hx_name="CIdent",$_.__params__ = ["s"],$_)
	,CRegexp: ($_=function(r,opt) { return {_hx_index:4,r:r,opt:opt,__enum__:"haxe.macro.Constant",toString:$estr}; },$_._hx_name="CRegexp",$_.__params__ = ["r","opt"],$_)
};
haxe.macro.Constant.__constructs__ = [haxe.macro.Constant.CInt,haxe.macro.Constant.CFloat,haxe.macro.Constant.CString,haxe.macro.Constant.CIdent,haxe.macro.Constant.CRegexp];
haxe.macro.Constant.__empty_constructs__ = [];
haxe.macro.Binop = $hxEnums["haxe.macro.Binop"] = { __ename__:"haxe.macro.Binop",__constructs__:null
	,OpAdd: {_hx_name:"OpAdd",_hx_index:0,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpMult: {_hx_name:"OpMult",_hx_index:1,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpDiv: {_hx_name:"OpDiv",_hx_index:2,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpSub: {_hx_name:"OpSub",_hx_index:3,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAssign: {_hx_name:"OpAssign",_hx_index:4,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpEq: {_hx_name:"OpEq",_hx_index:5,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpNotEq: {_hx_name:"OpNotEq",_hx_index:6,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpGt: {_hx_name:"OpGt",_hx_index:7,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpGte: {_hx_name:"OpGte",_hx_index:8,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpLt: {_hx_name:"OpLt",_hx_index:9,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpLte: {_hx_name:"OpLte",_hx_index:10,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAnd: {_hx_name:"OpAnd",_hx_index:11,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpOr: {_hx_name:"OpOr",_hx_index:12,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpXor: {_hx_name:"OpXor",_hx_index:13,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpBoolAnd: {_hx_name:"OpBoolAnd",_hx_index:14,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpBoolOr: {_hx_name:"OpBoolOr",_hx_index:15,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpShl: {_hx_name:"OpShl",_hx_index:16,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpShr: {_hx_name:"OpShr",_hx_index:17,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpUShr: {_hx_name:"OpUShr",_hx_index:18,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpMod: {_hx_name:"OpMod",_hx_index:19,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpAssignOp: ($_=function(op) { return {_hx_index:20,op:op,__enum__:"haxe.macro.Binop",toString:$estr}; },$_._hx_name="OpAssignOp",$_.__params__ = ["op"],$_)
	,OpInterval: {_hx_name:"OpInterval",_hx_index:21,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpArrow: {_hx_name:"OpArrow",_hx_index:22,__enum__:"haxe.macro.Binop",toString:$estr}
	,OpIn: {_hx_name:"OpIn",_hx_index:23,__enum__:"haxe.macro.Binop",toString:$estr}
};
haxe.macro.Binop.__constructs__ = [haxe.macro.Binop.OpAdd,haxe.macro.Binop.OpMult,haxe.macro.Binop.OpDiv,haxe.macro.Binop.OpSub,haxe.macro.Binop.OpAssign,haxe.macro.Binop.OpEq,haxe.macro.Binop.OpNotEq,haxe.macro.Binop.OpGt,haxe.macro.Binop.OpGte,haxe.macro.Binop.OpLt,haxe.macro.Binop.OpLte,haxe.macro.Binop.OpAnd,haxe.macro.Binop.OpOr,haxe.macro.Binop.OpXor,haxe.macro.Binop.OpBoolAnd,haxe.macro.Binop.OpBoolOr,haxe.macro.Binop.OpShl,haxe.macro.Binop.OpShr,haxe.macro.Binop.OpUShr,haxe.macro.Binop.OpMod,haxe.macro.Binop.OpAssignOp,haxe.macro.Binop.OpInterval,haxe.macro.Binop.OpArrow,haxe.macro.Binop.OpIn];
haxe.macro.Binop.__empty_constructs__ = [haxe.macro.Binop.OpAdd,haxe.macro.Binop.OpMult,haxe.macro.Binop.OpDiv,haxe.macro.Binop.OpSub,haxe.macro.Binop.OpAssign,haxe.macro.Binop.OpEq,haxe.macro.Binop.OpNotEq,haxe.macro.Binop.OpGt,haxe.macro.Binop.OpGte,haxe.macro.Binop.OpLt,haxe.macro.Binop.OpLte,haxe.macro.Binop.OpAnd,haxe.macro.Binop.OpOr,haxe.macro.Binop.OpXor,haxe.macro.Binop.OpBoolAnd,haxe.macro.Binop.OpBoolOr,haxe.macro.Binop.OpShl,haxe.macro.Binop.OpShr,haxe.macro.Binop.OpUShr,haxe.macro.Binop.OpMod,haxe.macro.Binop.OpInterval,haxe.macro.Binop.OpArrow,haxe.macro.Binop.OpIn];
haxe.macro.Unop = $hxEnums["haxe.macro.Unop"] = { __ename__:"haxe.macro.Unop",__constructs__:null
	,OpIncrement: {_hx_name:"OpIncrement",_hx_index:0,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpDecrement: {_hx_name:"OpDecrement",_hx_index:1,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNot: {_hx_name:"OpNot",_hx_index:2,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNeg: {_hx_name:"OpNeg",_hx_index:3,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpNegBits: {_hx_name:"OpNegBits",_hx_index:4,__enum__:"haxe.macro.Unop",toString:$estr}
	,OpSpread: {_hx_name:"OpSpread",_hx_index:5,__enum__:"haxe.macro.Unop",toString:$estr}
};
haxe.macro.Unop.__constructs__ = [haxe.macro.Unop.OpIncrement,haxe.macro.Unop.OpDecrement,haxe.macro.Unop.OpNot,haxe.macro.Unop.OpNeg,haxe.macro.Unop.OpNegBits,haxe.macro.Unop.OpSpread];
haxe.macro.Unop.__empty_constructs__ = [haxe.macro.Unop.OpIncrement,haxe.macro.Unop.OpDecrement,haxe.macro.Unop.OpNot,haxe.macro.Unop.OpNeg,haxe.macro.Unop.OpNegBits,haxe.macro.Unop.OpSpread];
haxe.macro.QuoteStatus = $hxEnums["haxe.macro.QuoteStatus"] = { __ename__:"haxe.macro.QuoteStatus",__constructs__:null
	,Unquoted: {_hx_name:"Unquoted",_hx_index:0,__enum__:"haxe.macro.QuoteStatus",toString:$estr}
	,Quoted: {_hx_name:"Quoted",_hx_index:1,__enum__:"haxe.macro.QuoteStatus",toString:$estr}
};
haxe.macro.QuoteStatus.__constructs__ = [haxe.macro.QuoteStatus.Unquoted,haxe.macro.QuoteStatus.Quoted];
haxe.macro.QuoteStatus.__empty_constructs__ = [haxe.macro.QuoteStatus.Unquoted,haxe.macro.QuoteStatus.Quoted];
haxe.macro.FunctionKind = $hxEnums["haxe.macro.FunctionKind"] = { __ename__:"haxe.macro.FunctionKind",__constructs__:null
	,FAnonymous: {_hx_name:"FAnonymous",_hx_index:0,__enum__:"haxe.macro.FunctionKind",toString:$estr}
	,FNamed: ($_=function(name,inlined) { return {_hx_index:1,name:name,inlined:inlined,__enum__:"haxe.macro.FunctionKind",toString:$estr}; },$_._hx_name="FNamed",$_.__params__ = ["name","inlined"],$_)
	,FArrow: {_hx_name:"FArrow",_hx_index:2,__enum__:"haxe.macro.FunctionKind",toString:$estr}
};
haxe.macro.FunctionKind.__constructs__ = [haxe.macro.FunctionKind.FAnonymous,haxe.macro.FunctionKind.FNamed,haxe.macro.FunctionKind.FArrow];
haxe.macro.FunctionKind.__empty_constructs__ = [haxe.macro.FunctionKind.FAnonymous,haxe.macro.FunctionKind.FArrow];
haxe.macro.ExprDef = $hxEnums["haxe.macro.ExprDef"] = { __ename__:"haxe.macro.ExprDef",__constructs__:null
	,EConst: ($_=function(c) { return {_hx_index:0,c:c,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EConst",$_.__params__ = ["c"],$_)
	,EArray: ($_=function(e1,e2) { return {_hx_index:1,e1:e1,e2:e2,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EArray",$_.__params__ = ["e1","e2"],$_)
	,EBinop: ($_=function(op,e1,e2) { return {_hx_index:2,op:op,e1:e1,e2:e2,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EBinop",$_.__params__ = ["op","e1","e2"],$_)
	,EField: ($_=function(e,field) { return {_hx_index:3,e:e,field:field,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EField",$_.__params__ = ["e","field"],$_)
	,EParenthesis: ($_=function(e) { return {_hx_index:4,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EParenthesis",$_.__params__ = ["e"],$_)
	,EObjectDecl: ($_=function(fields) { return {_hx_index:5,fields:fields,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EObjectDecl",$_.__params__ = ["fields"],$_)
	,EArrayDecl: ($_=function(values) { return {_hx_index:6,values:values,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EArrayDecl",$_.__params__ = ["values"],$_)
	,ECall: ($_=function(e,params) { return {_hx_index:7,e:e,params:params,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ECall",$_.__params__ = ["e","params"],$_)
	,ENew: ($_=function(t,params) { return {_hx_index:8,t:t,params:params,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ENew",$_.__params__ = ["t","params"],$_)
	,EUnop: ($_=function(op,postFix,e) { return {_hx_index:9,op:op,postFix:postFix,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EUnop",$_.__params__ = ["op","postFix","e"],$_)
	,EVars: ($_=function(vars) { return {_hx_index:10,vars:vars,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EVars",$_.__params__ = ["vars"],$_)
	,EFunction: ($_=function(kind,f) { return {_hx_index:11,kind:kind,f:f,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EFunction",$_.__params__ = ["kind","f"],$_)
	,EBlock: ($_=function(exprs) { return {_hx_index:12,exprs:exprs,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EBlock",$_.__params__ = ["exprs"],$_)
	,EFor: ($_=function(it,expr) { return {_hx_index:13,it:it,expr:expr,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EFor",$_.__params__ = ["it","expr"],$_)
	,EIf: ($_=function(econd,eif,eelse) { return {_hx_index:14,econd:econd,eif:eif,eelse:eelse,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EIf",$_.__params__ = ["econd","eif","eelse"],$_)
	,EWhile: ($_=function(econd,e,normalWhile) { return {_hx_index:15,econd:econd,e:e,normalWhile:normalWhile,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EWhile",$_.__params__ = ["econd","e","normalWhile"],$_)
	,ESwitch: ($_=function(e,cases,edef) { return {_hx_index:16,e:e,cases:cases,edef:edef,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ESwitch",$_.__params__ = ["e","cases","edef"],$_)
	,ETry: ($_=function(e,catches) { return {_hx_index:17,e:e,catches:catches,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ETry",$_.__params__ = ["e","catches"],$_)
	,EReturn: ($_=function(e) { return {_hx_index:18,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EReturn",$_.__params__ = ["e"],$_)
	,EBreak: {_hx_name:"EBreak",_hx_index:19,__enum__:"haxe.macro.ExprDef",toString:$estr}
	,EContinue: {_hx_name:"EContinue",_hx_index:20,__enum__:"haxe.macro.ExprDef",toString:$estr}
	,EUntyped: ($_=function(e) { return {_hx_index:21,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EUntyped",$_.__params__ = ["e"],$_)
	,EThrow: ($_=function(e) { return {_hx_index:22,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EThrow",$_.__params__ = ["e"],$_)
	,ECast: ($_=function(e,t) { return {_hx_index:23,e:e,t:t,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ECast",$_.__params__ = ["e","t"],$_)
	,EDisplay: ($_=function(e,displayKind) { return {_hx_index:24,e:e,displayKind:displayKind,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EDisplay",$_.__params__ = ["e","displayKind"],$_)
	,EDisplayNew: ($_=function(t) { return {_hx_index:25,t:t,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EDisplayNew",$_.__params__ = ["t"],$_)
	,ETernary: ($_=function(econd,eif,eelse) { return {_hx_index:26,econd:econd,eif:eif,eelse:eelse,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ETernary",$_.__params__ = ["econd","eif","eelse"],$_)
	,ECheckType: ($_=function(e,t) { return {_hx_index:27,e:e,t:t,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="ECheckType",$_.__params__ = ["e","t"],$_)
	,EMeta: ($_=function(s,e) { return {_hx_index:28,s:s,e:e,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EMeta",$_.__params__ = ["s","e"],$_)
	,EIs: ($_=function(e,t) { return {_hx_index:29,e:e,t:t,__enum__:"haxe.macro.ExprDef",toString:$estr}; },$_._hx_name="EIs",$_.__params__ = ["e","t"],$_)
};
haxe.macro.ExprDef.__constructs__ = [haxe.macro.ExprDef.EConst,haxe.macro.ExprDef.EArray,haxe.macro.ExprDef.EBinop,haxe.macro.ExprDef.EField,haxe.macro.ExprDef.EParenthesis,haxe.macro.ExprDef.EObjectDecl,haxe.macro.ExprDef.EArrayDecl,haxe.macro.ExprDef.ECall,haxe.macro.ExprDef.ENew,haxe.macro.ExprDef.EUnop,haxe.macro.ExprDef.EVars,haxe.macro.ExprDef.EFunction,haxe.macro.ExprDef.EBlock,haxe.macro.ExprDef.EFor,haxe.macro.ExprDef.EIf,haxe.macro.ExprDef.EWhile,haxe.macro.ExprDef.ESwitch,haxe.macro.ExprDef.ETry,haxe.macro.ExprDef.EReturn,haxe.macro.ExprDef.EBreak,haxe.macro.ExprDef.EContinue,haxe.macro.ExprDef.EUntyped,haxe.macro.ExprDef.EThrow,haxe.macro.ExprDef.ECast,haxe.macro.ExprDef.EDisplay,haxe.macro.ExprDef.EDisplayNew,haxe.macro.ExprDef.ETernary,haxe.macro.ExprDef.ECheckType,haxe.macro.ExprDef.EMeta,haxe.macro.ExprDef.EIs];
haxe.macro.ExprDef.__empty_constructs__ = [haxe.macro.ExprDef.EBreak,haxe.macro.ExprDef.EContinue];
haxe.macro.DisplayKind = $hxEnums["haxe.macro.DisplayKind"] = { __ename__:"haxe.macro.DisplayKind",__constructs__:null
	,DKCall: {_hx_name:"DKCall",_hx_index:0,__enum__:"haxe.macro.DisplayKind",toString:$estr}
	,DKDot: {_hx_name:"DKDot",_hx_index:1,__enum__:"haxe.macro.DisplayKind",toString:$estr}
	,DKStructure: {_hx_name:"DKStructure",_hx_index:2,__enum__:"haxe.macro.DisplayKind",toString:$estr}
	,DKMarked: {_hx_name:"DKMarked",_hx_index:3,__enum__:"haxe.macro.DisplayKind",toString:$estr}
	,DKPattern: ($_=function(outermost) { return {_hx_index:4,outermost:outermost,__enum__:"haxe.macro.DisplayKind",toString:$estr}; },$_._hx_name="DKPattern",$_.__params__ = ["outermost"],$_)
};
haxe.macro.DisplayKind.__constructs__ = [haxe.macro.DisplayKind.DKCall,haxe.macro.DisplayKind.DKDot,haxe.macro.DisplayKind.DKStructure,haxe.macro.DisplayKind.DKMarked,haxe.macro.DisplayKind.DKPattern];
haxe.macro.DisplayKind.__empty_constructs__ = [haxe.macro.DisplayKind.DKCall,haxe.macro.DisplayKind.DKDot,haxe.macro.DisplayKind.DKStructure,haxe.macro.DisplayKind.DKMarked];
haxe.macro.ComplexType = $hxEnums["haxe.macro.ComplexType"] = { __ename__:"haxe.macro.ComplexType",__constructs__:null
	,TPath: ($_=function(p) { return {_hx_index:0,p:p,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TPath",$_.__params__ = ["p"],$_)
	,TFunction: ($_=function(args,ret) { return {_hx_index:1,args:args,ret:ret,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TFunction",$_.__params__ = ["args","ret"],$_)
	,TAnonymous: ($_=function(fields) { return {_hx_index:2,fields:fields,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TAnonymous",$_.__params__ = ["fields"],$_)
	,TParent: ($_=function(t) { return {_hx_index:3,t:t,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TParent",$_.__params__ = ["t"],$_)
	,TExtend: ($_=function(p,fields) { return {_hx_index:4,p:p,fields:fields,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TExtend",$_.__params__ = ["p","fields"],$_)
	,TOptional: ($_=function(t) { return {_hx_index:5,t:t,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TOptional",$_.__params__ = ["t"],$_)
	,TNamed: ($_=function(n,t) { return {_hx_index:6,n:n,t:t,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TNamed",$_.__params__ = ["n","t"],$_)
	,TIntersection: ($_=function(tl) { return {_hx_index:7,tl:tl,__enum__:"haxe.macro.ComplexType",toString:$estr}; },$_._hx_name="TIntersection",$_.__params__ = ["tl"],$_)
};
haxe.macro.ComplexType.__constructs__ = [haxe.macro.ComplexType.TPath,haxe.macro.ComplexType.TFunction,haxe.macro.ComplexType.TAnonymous,haxe.macro.ComplexType.TParent,haxe.macro.ComplexType.TExtend,haxe.macro.ComplexType.TOptional,haxe.macro.ComplexType.TNamed,haxe.macro.ComplexType.TIntersection];
haxe.macro.ComplexType.__empty_constructs__ = [];
haxe.macro.TypeParam = $hxEnums["haxe.macro.TypeParam"] = { __ename__:"haxe.macro.TypeParam",__constructs__:null
	,TPType: ($_=function(t) { return {_hx_index:0,t:t,__enum__:"haxe.macro.TypeParam",toString:$estr}; },$_._hx_name="TPType",$_.__params__ = ["t"],$_)
	,TPExpr: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"haxe.macro.TypeParam",toString:$estr}; },$_._hx_name="TPExpr",$_.__params__ = ["e"],$_)
};
haxe.macro.TypeParam.__constructs__ = [haxe.macro.TypeParam.TPType,haxe.macro.TypeParam.TPExpr];
haxe.macro.TypeParam.__empty_constructs__ = [];
haxe.macro.Access = $hxEnums["haxe.macro.Access"] = { __ename__:"haxe.macro.Access",__constructs__:null
	,APublic: {_hx_name:"APublic",_hx_index:0,__enum__:"haxe.macro.Access",toString:$estr}
	,APrivate: {_hx_name:"APrivate",_hx_index:1,__enum__:"haxe.macro.Access",toString:$estr}
	,AStatic: {_hx_name:"AStatic",_hx_index:2,__enum__:"haxe.macro.Access",toString:$estr}
	,AOverride: {_hx_name:"AOverride",_hx_index:3,__enum__:"haxe.macro.Access",toString:$estr}
	,ADynamic: {_hx_name:"ADynamic",_hx_index:4,__enum__:"haxe.macro.Access",toString:$estr}
	,AInline: {_hx_name:"AInline",_hx_index:5,__enum__:"haxe.macro.Access",toString:$estr}
	,AMacro: {_hx_name:"AMacro",_hx_index:6,__enum__:"haxe.macro.Access",toString:$estr}
	,AFinal: {_hx_name:"AFinal",_hx_index:7,__enum__:"haxe.macro.Access",toString:$estr}
	,AExtern: {_hx_name:"AExtern",_hx_index:8,__enum__:"haxe.macro.Access",toString:$estr}
	,AAbstract: {_hx_name:"AAbstract",_hx_index:9,__enum__:"haxe.macro.Access",toString:$estr}
	,AOverload: {_hx_name:"AOverload",_hx_index:10,__enum__:"haxe.macro.Access",toString:$estr}
};
haxe.macro.Access.__constructs__ = [haxe.macro.Access.APublic,haxe.macro.Access.APrivate,haxe.macro.Access.AStatic,haxe.macro.Access.AOverride,haxe.macro.Access.ADynamic,haxe.macro.Access.AInline,haxe.macro.Access.AMacro,haxe.macro.Access.AFinal,haxe.macro.Access.AExtern,haxe.macro.Access.AAbstract,haxe.macro.Access.AOverload];
haxe.macro.Access.__empty_constructs__ = [haxe.macro.Access.APublic,haxe.macro.Access.APrivate,haxe.macro.Access.AStatic,haxe.macro.Access.AOverride,haxe.macro.Access.ADynamic,haxe.macro.Access.AInline,haxe.macro.Access.AMacro,haxe.macro.Access.AFinal,haxe.macro.Access.AExtern,haxe.macro.Access.AAbstract,haxe.macro.Access.AOverload];
haxe.macro.FieldType = $hxEnums["haxe.macro.FieldType"] = { __ename__:"haxe.macro.FieldType",__constructs__:null
	,FVar: ($_=function(t,e) { return {_hx_index:0,t:t,e:e,__enum__:"haxe.macro.FieldType",toString:$estr}; },$_._hx_name="FVar",$_.__params__ = ["t","e"],$_)
	,FFun: ($_=function(f) { return {_hx_index:1,f:f,__enum__:"haxe.macro.FieldType",toString:$estr}; },$_._hx_name="FFun",$_.__params__ = ["f"],$_)
	,FProp: ($_=function(get,set,t,e) { return {_hx_index:2,get:get,set:set,t:t,e:e,__enum__:"haxe.macro.FieldType",toString:$estr}; },$_._hx_name="FProp",$_.__params__ = ["get","set","t","e"],$_)
};
haxe.macro.FieldType.__constructs__ = [haxe.macro.FieldType.FVar,haxe.macro.FieldType.FFun,haxe.macro.FieldType.FProp];
haxe.macro.FieldType.__empty_constructs__ = [];
haxe.macro.TypeDefKind = $hxEnums["haxe.macro.TypeDefKind"] = { __ename__:"haxe.macro.TypeDefKind",__constructs__:null
	,TDEnum: {_hx_name:"TDEnum",_hx_index:0,__enum__:"haxe.macro.TypeDefKind",toString:$estr}
	,TDStructure: {_hx_name:"TDStructure",_hx_index:1,__enum__:"haxe.macro.TypeDefKind",toString:$estr}
	,TDClass: ($_=function(superClass,interfaces,isInterface,isFinal,isAbstract) { return {_hx_index:2,superClass:superClass,interfaces:interfaces,isInterface:isInterface,isFinal:isFinal,isAbstract:isAbstract,__enum__:"haxe.macro.TypeDefKind",toString:$estr}; },$_._hx_name="TDClass",$_.__params__ = ["superClass","interfaces","isInterface","isFinal","isAbstract"],$_)
	,TDAlias: ($_=function(t) { return {_hx_index:3,t:t,__enum__:"haxe.macro.TypeDefKind",toString:$estr}; },$_._hx_name="TDAlias",$_.__params__ = ["t"],$_)
	,TDAbstract: ($_=function(tthis,from,to) { return {_hx_index:4,tthis:tthis,from:from,to:to,__enum__:"haxe.macro.TypeDefKind",toString:$estr}; },$_._hx_name="TDAbstract",$_.__params__ = ["tthis","from","to"],$_)
	,TDField: ($_=function(kind,access) { return {_hx_index:5,kind:kind,access:access,__enum__:"haxe.macro.TypeDefKind",toString:$estr}; },$_._hx_name="TDField",$_.__params__ = ["kind","access"],$_)
};
haxe.macro.TypeDefKind.__constructs__ = [haxe.macro.TypeDefKind.TDEnum,haxe.macro.TypeDefKind.TDStructure,haxe.macro.TypeDefKind.TDClass,haxe.macro.TypeDefKind.TDAlias,haxe.macro.TypeDefKind.TDAbstract,haxe.macro.TypeDefKind.TDField];
haxe.macro.TypeDefKind.__empty_constructs__ = [haxe.macro.TypeDefKind.TDEnum,haxe.macro.TypeDefKind.TDStructure];
haxe.macro.Error = function(message,pos,previous) {
	haxe.Exception.call(this,message,previous);
	this.pos = pos;
	this.__skipStack++;
};
$hxClasses["haxe.macro.Error"] = haxe.macro.Error;
haxe.macro.Error.__name__ = "haxe.macro.Error";
haxe.macro.Error.__super__ = haxe.Exception;
haxe.macro.Error.prototype = $extend(haxe.Exception.prototype,{
	pos: null
	,__class__: haxe.macro.Error
});
haxe.macro.ImportMode = $hxEnums["haxe.macro.ImportMode"] = { __ename__:"haxe.macro.ImportMode",__constructs__:null
	,INormal: {_hx_name:"INormal",_hx_index:0,__enum__:"haxe.macro.ImportMode",toString:$estr}
	,IAsName: ($_=function(alias) { return {_hx_index:1,alias:alias,__enum__:"haxe.macro.ImportMode",toString:$estr}; },$_._hx_name="IAsName",$_.__params__ = ["alias"],$_)
	,IAll: {_hx_name:"IAll",_hx_index:2,__enum__:"haxe.macro.ImportMode",toString:$estr}
};
haxe.macro.ImportMode.__constructs__ = [haxe.macro.ImportMode.INormal,haxe.macro.ImportMode.IAsName,haxe.macro.ImportMode.IAll];
haxe.macro.ImportMode.__empty_constructs__ = [haxe.macro.ImportMode.INormal,haxe.macro.ImportMode.IAll];
haxe.xml = {};
haxe.xml.XmlParserException = function(message,xml,position) {
	this.xml = xml;
	this.message = message;
	this.position = position;
	this.lineNumber = 1;
	this.positionAtLine = 0;
	var _g = 0;
	var _g1 = position;
	while(_g < _g1) {
		var i = _g++;
		var c = xml.charCodeAt(i);
		if(c == 10) {
			this.lineNumber++;
			this.positionAtLine = 0;
		} else if(c != 13) {
			this.positionAtLine++;
		}
	}
};
$hxClasses["haxe.xml.XmlParserException"] = haxe.xml.XmlParserException;
haxe.xml.XmlParserException.__name__ = "haxe.xml.XmlParserException";
haxe.xml.XmlParserException.prototype = {
	message: null
	,lineNumber: null
	,positionAtLine: null
	,position: null
	,xml: null
	,toString: function() {
		var c = js.Boot.getClass(this);
		return c.__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine;
	}
	,__class__: haxe.xml.XmlParserException
};
haxe.xml.Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = "haxe.xml.Parser";
haxe.xml.Parser.parse = function(str,strict) {
	if(strict == null) {
		strict = false;
	}
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe.xml.Parser.doParse = function(str,strict,p,parent) {
	if(p == null) {
		p = 0;
	}
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(p < str.length) {
		var c = str.charCodeAt(p);
		switch(state) {
		case 0:
			switch(c) {
			case 9:case 10:case 13:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			if(c == 60) {
				state = 0;
				next = 2;
			} else {
				start = p;
				state = 13;
				continue;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") {
						throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected <![CDATA[",str,p));
					}
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") {
						throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected <!DOCTYPE",str,p));
					}
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected <!--",str,p));
				} else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 47:
				if(parent == null) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected node name",str,p));
				}
				start = p + 1;
				state = 0;
				next = 10;
				break;
			case 63:
				state = 14;
				start = p;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected node name",str,p));
				}
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				++nsubs;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected attribute name",str,p));
				}
				var tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Duplicate attribute [" + aname + "]",str,p));
				}
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			if(c == 61) {
				state = 0;
				next = 7;
			} else {
				throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected =",str,p));
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected \"",str,p));
			}
			break;
		case 8:
			switch(c) {
			case 38:
				var len = p - start;
				buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 60:case 62:
				if(strict) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Invalid unescaped " + String.fromCodePoint(c) + " in attribute value",str,p));
				} else if(c == attrValQuote) {
					var len1 = p - start;
					buf.b += len1 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len1);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					var len2 = p - start;
					buf.b += len2 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len2);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected node name",str,p));
				}
				var v = HxOverrides.substr(str,start,p - start);
				if(parent == null || parent.nodeType != 0) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Unexpected </" + v + ">, tag is not open",str,p));
				}
				if(parent.nodeType != Xml.Element) {
					throw haxe.Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
				}
				if(v != parent.nodeName) {
					if(parent.nodeType != Xml.Element) {
						throw haxe.Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
					}
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected </" + parent.nodeName + ">",str,p));
				}
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 11:
			if(c == 62) {
				state = 1;
			} else {
				throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected >",str,p));
			}
			break;
		case 12:
			if(c == 62) {
				if(nsubs == 0) {
					parent.addChild(Xml.createPCData(""));
				}
				return p;
			} else {
				throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Expected >",str,p));
			}
			break;
		case 13:
			if(c == 60) {
				var len3 = p - start;
				buf.b += len3 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len3);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				++nsubs;
				state = 0;
				next = 2;
			} else if(c == 38) {
				var len4 = p - start;
				buf.b += len4 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len4);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				++p;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				++nsubs;
				state = 1;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) {
				++nbrackets;
			} else if(c == 93) {
				--nbrackets;
			} else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				state = 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1 = s.charCodeAt(1) == 120 ? Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)) : Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCodePoint(c1);
				} else if(!Object.prototype.hasOwnProperty.call(haxe.xml.Parser.escapes.h,s)) {
					if(strict) {
						throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Undefined entity: " + s,str,p));
					}
					buf.b += Std.string("&" + s + ";");
				} else {
					buf.b += Std.string(haxe.xml.Parser.escapes.h[s]);
				}
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) {
					throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Invalid character in entity: " + String.fromCodePoint(c),str,p));
				}
				buf.b += String.fromCodePoint(38);
				var len5 = p - start;
				buf.b += len5 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len5);
				--p;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		++p;
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(parent.nodeType == 0) {
			if(parent.nodeType != Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
			}
			throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Unclosed node <" + parent.nodeName + ">",str,p));
		}
		if(p != start || nsubs == 0) {
			var len = p - start;
			buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
			parent.addChild(Xml.createPCData(buf.b));
			++nsubs;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += String.fromCodePoint(38);
		var len = p - start;
		buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
		parent.addChild(Xml.createPCData(buf.b));
		++nsubs;
		return p;
	}
	throw haxe.Exception.thrown(new haxe.xml.XmlParserException("Unexpected end",str,p));
};
haxe.xml.Parser.isValidChar = function(c) {
	if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95)) {
		return c == 45;
	} else {
		return true;
	}
};
haxe.xml.Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe.xml.Printer;
haxe.xml.Printer.__name__ = "haxe.xml.Printer";
haxe.xml.Printer.print = function(xml,pretty) {
	if(pretty == null) {
		pretty = false;
	}
	var printer = new haxe.xml.Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe.xml.Printer.prototype = {
	output: null
	,pretty: null
	,writeNode: function(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			var attribute = value.attributes();
			while(attribute.hasNext()) {
				var attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				var input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				var _g_current = 0;
				var _g_array = value.children;
				while(_g_current < _g_array.length) {
					var child = _g_array[_g_current++];
					this.writeNode(child,this.pretty ? tabs + "\t" : tabs);
				}
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe.Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				var input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var commentContent = value.nodeValue;
			var _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			var input = StringTools.trim(commentContent);
			this.output.b += Std.string(input);
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var _g_current = 0;
			var _g_array = value.children;
			while(_g_current < _g_array.length) {
				var child = _g_array[_g_current++];
				this.writeNode(child,tabs);
			}
			break;
		}
	}
	,write: function(input) {
		this.output.b += input == null ? "null" : "" + input;
	}
	,newline: function() {
		if(this.pretty) {
			this.output.b += "\n";
		}
	}
	,hasChildren: function(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe.Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		var _g_current = 0;
		var _g_array = value.children;
		while(_g_current < _g_array.length) {
			var child = _g_array[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe.Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe.xml.Printer
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = "js.Boot";
js.Boot.isClass = function(o) {
	return o.__name__;
};
js.Boot.isInterface = function(o) {
	return o.__isInterface__;
};
js.Boot.isEnum = function(e) {
	return e.__ename__;
};
js.Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js.Boot.__nativeClassName(o);
		if(name != null) {
			return js.Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js.Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js.Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js.Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js.Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js.Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js.Boot.__interfLoop(js.Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js.Boot.__implements = function(o,iface) {
	return js.Boot.__interfLoop(js.Boot.getClass(o),iface);
};
js.Boot.__cast = function(o,t) {
	if(o == null || js.Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe.Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js.Boot.__toStr = null;
js.Boot.__nativeClassName = function(o) {
	var name = js.Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js.Boot.__isNativeObj = function(o) {
	return js.Boot.__nativeClassName(o) != null;
};
js.Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
js.Browser = function() { };
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = "js.Browser";
js.Browser.__properties__ = {get_supported:"get_supported",get_self:"get_self"};
js.Browser.get_self = function() {
	return $global;
};
js.Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js.Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe.NativeStackTrace.lastError = _g;
		return null;
	}
};
js.Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		if(s.length == 0) {
			var key = "_hx_" + Math.random();
			s.setItem(key,key);
			s.removeItem(key);
		}
		return s;
	} catch( _g ) {
		haxe.NativeStackTrace.lastError = _g;
		return null;
	}
};
js.Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe.Exception.thrown("Unable to create XMLHttpRequest object.");
};
js.Browser.alert = function(v) {
	window.alert(Std.string(v));
};
js.Lib = function() { };
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = "js.Lib";
js.Lib.__properties__ = {get_undefined:"get_undefined"};
js.Lib.debug = function() {
	debugger;
};
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.Lib.eval = function(code) {
	return eval(code);
};
js.Lib.get_undefined = function() {
	return undefined;
};
js.Lib.rethrow = function() {
};
js.Lib.getOriginalException = function() {
	return null;
};
js.Lib.getNextHaxeUID = function() {
	return $global.$haxeUID++;
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = "js.html._CanvasElement.CanvasUtil";
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var name = "webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	var name = "experimental-webgl";
	var ctx = canvas.getContext(name,attribs);
	if(ctx != null) {
		return ctx;
	}
	return null;
};
js.lib = {};
js.lib._ArrayBuffer = {};
js.lib._ArrayBuffer.ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js.lib._ArrayBuffer.ArrayBufferCompat;
js.lib._ArrayBuffer.ArrayBufferCompat.__name__ = "js.lib._ArrayBuffer.ArrayBufferCompat";
js.lib._ArrayBuffer.ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
js.lib.KeyValue = {};
js.lib.KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js.lib.KeyValue.get_key = function(this1) {
	return this1[0];
};
js.lib.KeyValue.get_value = function(this1) {
	return this1[1];
};
js.lib.ObjectEntry = {};
js.lib.ObjectEntry.__properties__ = {get_value:"get_value",get_key:"get_key"};
js.lib.ObjectEntry.get_key = function(this1) {
	return this1[0];
};
js.lib.ObjectEntry.get_value = function(this1) {
	return this1[1];
};
nme.AlphaMode = $hxEnums["nme.AlphaMode"] = { __ename__:"nme.AlphaMode",__constructs__:null
	,AlphaDefault: {_hx_name:"AlphaDefault",_hx_index:0,__enum__:"nme.AlphaMode",toString:$estr}
	,AlphaUnmultiplied: {_hx_name:"AlphaUnmultiplied",_hx_index:1,__enum__:"nme.AlphaMode",toString:$estr}
	,AlphaIsPremultiplied: {_hx_name:"AlphaIsPremultiplied",_hx_index:2,__enum__:"nme.AlphaMode",toString:$estr}
	,AlphaPreprocess: {_hx_name:"AlphaPreprocess",_hx_index:3,__enum__:"nme.AlphaMode",toString:$estr}
	,AlphaPostprocess: {_hx_name:"AlphaPostprocess",_hx_index:4,__enum__:"nme.AlphaMode",toString:$estr}
};
nme.AlphaMode.__constructs__ = [nme.AlphaMode.AlphaDefault,nme.AlphaMode.AlphaUnmultiplied,nme.AlphaMode.AlphaIsPremultiplied,nme.AlphaMode.AlphaPreprocess,nme.AlphaMode.AlphaPostprocess];
nme.AlphaMode.__empty_constructs__ = [nme.AlphaMode.AlphaDefault,nme.AlphaMode.AlphaUnmultiplied,nme.AlphaMode.AlphaIsPremultiplied,nme.AlphaMode.AlphaPreprocess,nme.AlphaMode.AlphaPostprocess];
nme.AssetInfo = function(inPath,inType,inIsResource,inClassName,id,inAlphaMode) {
	this.path = inPath;
	this.type = inType;
	this.className = inClassName;
	this.isResource = inIsResource;
	this.alphaMode = inAlphaMode == null ? nme.AlphaMode.AlphaDefault : inAlphaMode;
	if(this.type == nme.AssetType.FONT && (this.isResource || nme.Assets.isEmbedded(id))) {
		new nme.text.Font("",null,null,this.path,id);
	}
};
$hxClasses["nme.AssetInfo"] = nme.AssetInfo;
nme.AssetInfo.__name__ = "nme.AssetInfo";
nme.AssetInfo.prototype = {
	path: null
	,className: null
	,type: null
	,cache: null
	,isResource: null
	,alphaMode: null
	,toString: function() {
		return "{path:" + this.path + " className:" + this.className + " type:" + Std.string(this.type) + " isResource:" + Std.string(this.isResource) + " cached:" + Std.string(this.cache != null) + "}";
	}
	,uncache: function() {
		this.cache = null;
	}
	,getCache: function() {
		if(this.cache == null) {
			return null;
		}
		var val = this.cache.get();
		if(val == null) {
			this.cache = null;
		}
		return val;
	}
	,setCache: function(inVal,inWeak) {
		this.cache = new nme.utils.WeakRef(inVal,inWeak);
	}
	,__class__: nme.AssetInfo
};
nme.AssetLib = function() {
};
$hxClasses["nme.AssetLib"] = nme.AssetLib;
nme.AssetLib.__name__ = "nme.AssetLib";
nme.AssetLib.prototype = {
	eventCallback: null
	,exists: function(id,type) {
		return false;
	}
	,getBitmapData: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getMovieClip: function(id) {
		return null;
	}
	,getMusic: function(id) {
		return null;
	}
	,getPath: function(id) {
		return null;
	}
	,getSound: function(id) {
		return null;
	}
	,getText: function(id) {
		var bytes = this.getBytes(id);
		if(bytes == null) {
			return null;
		}
		return bytes.readUTFBytes(bytes.length);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,list: function(type) {
		return null;
	}
	,load: function(handler) {
		handler(this);
	}
	,loadBitmapData: function(id,handler) {
		handler(this.getBitmapData(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadMovieClip: function(id,handler) {
		handler(this.getMovieClip(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,loadText: function(id,handler) {
		this.loadBytes(id,function(bytes) {
			if(bytes == null) {
				handler(null);
			} else {
				handler(bytes.readUTFBytes(bytes.length));
			}
		});
	}
	,unload: function() {
	}
	,__class__: nme.AssetLib
};
nme.AssetType = $hxEnums["nme.AssetType"] = { __ename__:"nme.AssetType",__constructs__:null
	,BINARY: {_hx_name:"BINARY",_hx_index:0,__enum__:"nme.AssetType",toString:$estr}
	,FONT: {_hx_name:"FONT",_hx_index:1,__enum__:"nme.AssetType",toString:$estr}
	,IMAGE: {_hx_name:"IMAGE",_hx_index:2,__enum__:"nme.AssetType",toString:$estr}
	,MUSIC: {_hx_name:"MUSIC",_hx_index:3,__enum__:"nme.AssetType",toString:$estr}
	,SOUND: {_hx_name:"SOUND",_hx_index:4,__enum__:"nme.AssetType",toString:$estr}
	,TEXT: {_hx_name:"TEXT",_hx_index:5,__enum__:"nme.AssetType",toString:$estr}
	,SWF: {_hx_name:"SWF",_hx_index:6,__enum__:"nme.AssetType",toString:$estr}
	,MOVIE_CLIP: {_hx_name:"MOVIE_CLIP",_hx_index:7,__enum__:"nme.AssetType",toString:$estr}
};
nme.AssetType.__constructs__ = [nme.AssetType.BINARY,nme.AssetType.FONT,nme.AssetType.IMAGE,nme.AssetType.MUSIC,nme.AssetType.SOUND,nme.AssetType.TEXT,nme.AssetType.SWF,nme.AssetType.MOVIE_CLIP];
nme.AssetType.__empty_constructs__ = [nme.AssetType.BINARY,nme.AssetType.FONT,nme.AssetType.IMAGE,nme.AssetType.MUSIC,nme.AssetType.SOUND,nme.AssetType.TEXT,nme.AssetType.SWF,nme.AssetType.MOVIE_CLIP];
nme.Cache = function() {
};
$hxClasses["nme.Cache"] = nme.Cache;
nme.Cache.__name__ = "nme.Cache";
nme.Cache.prototype = {
	removeBitmapData: function(inId) {
		nme.Assets.removeBitmapData(inId);
	}
	,__class__: nme.Cache
};
nme.Assets = function() { };
$hxClasses["nme.Assets"] = nme.Assets;
nme.Assets.__name__ = "nme.Assets";
nme.Assets.fromAssetList = function(assetList,inAddScriptBase,inAlphaToo) {
	var lines = null;
	if(assetList.indexOf("\r") >= 0) {
		lines = assetList.split("\r\n");
	} else {
		lines = assetList.split("\n");
	}
	var i = 1;
	while(i < lines.length - 1) {
		var id = lines[i];
		var resourceName = lines[i + 1];
		var type = Type.createEnum(nme.AssetType,lines[i + 2]);
		var isResource = lines[i + 3] != "false";
		var className = lines[i + 4];
		if(className == "null") {
			className = null;
		}
		if(inAddScriptBase && !isResource) {
			resourceName = nme.Assets.scriptBase + resourceName;
		}
		var alphaMode = inAlphaToo ? Type.createEnum(nme.AlphaMode,lines[i + 5]) : nme.AlphaMode.AlphaDefault;
		var _this = nme.Assets.info;
		var value = new nme.AssetInfo(resourceName,type,isResource,className,id,alphaMode);
		_this.h[id] = value;
		i += inAlphaToo ? 6 : 5;
	}
};
nme.Assets.loadAssetList = function() {
	var module = window.Module;
	var items = module.nmeAppItems;
	var className = null;
	var isResource = false;
	if(items != null) {
		var _g = 0;
		var _g1 = Reflect.fields(items);
		while(_g < _g1.length) {
			var id = _g1[_g];
			++_g;
			var item = [Reflect.field(items,id)];
			var alphaMode = nme.AlphaMode.AlphaDefault;
			if(item[0].alphaMode != null) {
				alphaMode = Type.createEnum(nme.AlphaMode,item[0].alphaMode);
			}
			var type = Type.createEnum(nme.AssetType,item[0].type);
			nme.Assets.byteFactory.h[id] = (function(item) {
				return function() {
					return nme.utils.ByteArray.fromBytes(item[0].value);
				};
			})(item);
			var _this = nme.Assets.info;
			var value = new nme.AssetInfo(id,type,isResource,className,id,alphaMode);
			_this.h[id] = value;
		}
	}
};
nme.Assets.loadScriptAssetList = function() {
	var assetList = haxe.Resource.getString("haxe/nme/scriptassets.txt");
	if(assetList != null) {
		nme.Assets.fromAssetList(assetList,true,false);
	}
};
nme.Assets.loadScriptAssetList2 = function() {
	var assetList = haxe.Resource.getString("haxe/nme/scriptassets.txt");
	if(assetList != null) {
		nme.Assets.fromAssetList(assetList,true,true);
	}
};
nme.Assets.addLibraryFactory = function(inType,inFactory) {
	nme.Assets.libraryFactories.h[Std.string(inType)] = inFactory;
};
nme.Assets.getAssetPath = function(inName) {
	var i = nme.Assets.getInfo(inName);
	if(i == null) {
		return null;
	} else {
		return i.path;
	}
};
nme.Assets.getPath = function(inName) {
	return nme.Assets.getAssetPath(inName);
};
nme.Assets.addEventListener = function(type,listener,useCapture,priority,useWeakReference) {
	if(useWeakReference == null) {
		useWeakReference = false;
	}
	if(priority == null) {
		priority = 0;
	}
	if(useCapture == null) {
		useCapture = false;
	}
};
nme.Assets.isEmbedded = function(inName) {
	if(nme.Assets.byteFactory.h[inName] != null) {
		return true;
	}
	return haxe.Resource.listNames().indexOf(inName) >= 0;
};
nme.Assets.getResource = function(inName) {
	var bytes = haxe.Resource.getBytes(inName);
	if(bytes == null) {
		var factory = nme.Assets.byteFactory.h[inName];
		if(factory != null) {
			return factory();
		}
	}
	if(bytes == null) {
		haxe.Log.trace("[nme.Assets] missing binary resource '" + inName + "'",{ fileName : "../../src/nme/Assets.hx", lineNumber : 177, className : "nme.Assets", methodName : "getResource"});
		var h = nme.Assets.info.h;
		var key_h = h;
		var key_keys = Object.keys(h);
		var key_length = key_keys.length;
		var key_current = 0;
		while(key_current < key_length) {
			var key = key_keys[key_current++];
			haxe.Log.trace(" " + key + " -> " + nme.Assets.info.h[key].path + " " + Std.string(nme.Assets.info.h[key].isResource),{ fileName : "../../src/nme/Assets.hx", lineNumber : 179, className : "nme.Assets", methodName : "getResource"});
		}
		haxe.Log.trace("---",{ fileName : "../../src/nme/Assets.hx", lineNumber : 180, className : "nme.Assets", methodName : "getResource"});
		haxe.Log.trace("All resources: " + Std.string(haxe.Resource.listNames()),{ fileName : "../../src/nme/Assets.hx", lineNumber : 181, className : "nme.Assets", methodName : "getResource"});
	}
	if(bytes == null) {
		return null;
	}
	return nme.utils.ByteArray.fromBytes(bytes);
};
nme.Assets.isLocal = function(inId,inType) {
	var i = nme.Assets.getInfo(inId);
	if(i == null) {
		return false;
	}
	return true;
};
nme.Assets.list = function(inFilter) {
	if(inFilter == null) {
		return new haxe.ds._StringMap.StringMapKeyIterator(nme.Assets.info.h);
	}
	var result = [];
	var h = nme.Assets.info.h;
	var id_h = h;
	var id_keys = Object.keys(h);
	var id_length = id_keys.length;
	var id_current = 0;
	while(id_current < id_length) {
		var id = id_keys[id_current++];
		var asset = nme.Assets.info.h[id];
		if(asset.type == inFilter) {
			result.push(id);
		}
	}
	return new haxe.iterators.ArrayIterator(result);
};
nme.Assets.removeBitmapData = function(inId) {
	var i = nme.Assets.getInfo(inId);
	if(i != null) {
		i.uncache();
	}
};
nme.Assets.trySetCache = function(info,useCache,data) {
	if(useCache != false && (useCache == true || nme.Assets.cacheMode != 0)) {
		info.setCache(data,nme.Assets.cacheMode != 2);
	}
};
nme.Assets.noId = function(id,type) {
	haxe.Log.trace("[nme.Assets] missing asset '" + id + "' of type " + type,{ fileName : "../../src/nme/Assets.hx", lineNumber : 235, className : "nme.Assets", methodName : "noId"});
};
nme.Assets.badType = function(id,type) {
	var i = nme.Assets.getInfo(id);
	haxe.Log.trace("[nme.Assets] asset '" + id + "' is not of type " + type + " it is " + Std.string(i.type),{ fileName : "../../src/nme/Assets.hx", lineNumber : 242, className : "nme.Assets", methodName : "badType"});
};
nme.Assets.hasBitmapData = function(id) {
	var i = nme.Assets.getInfo(id);
	if(i != null) {
		return i.type == nme.AssetType.IMAGE;
	} else {
		return false;
	}
};
nme.Assets.getInfo = function(inName) {
	var result = nme.Assets.info.h[inName];
	if(result != null) {
		return result;
	}
	var parts = inName.split("/");
	var first = 0;
	while(first < parts.length) if(parts[first] == "..") {
		++first;
	} else {
		var changed = false;
		var test = first + 1;
		while(test < parts.length) {
			if(parts[test] == ".." && parts[test - 1] != "..") {
				parts.splice(test - 1,2);
				changed = true;
				break;
			}
			++test;
		}
		if(!changed) {
			break;
		}
	}
	var path = parts.join("/");
	if(path != inName) {
		result = nme.Assets.info.h[path];
	}
	return result;
};
nme.Assets.makeBitmapData = function(inClassName) {
	var cls = $hxClasses[inClassName];
	if(cls == null) {
		throw haxe.Exception.thrown("Invalid class : " + inClassName);
	}
	return Type.createInstance(cls,[]);
};
nme.Assets.getBitmapData = function(id,useCache) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"BitmapData");
		return null;
	}
	if(i.type != nme.AssetType.IMAGE) {
		nme.Assets.badType(id,"BitmapData");
		return null;
	}
	if(useCache != false) {
		var val = i.getCache();
		if(val != null && ((val) instanceof nme.display.BitmapData)) {
			return val;
		}
	}
	var data = null;
	if(i.isResource) {
		data = nme.display.BitmapData.loadFromBytes(nme.Assets.getResource(i.path));
	} else {
		var filename = i.path;
		if(Object.prototype.hasOwnProperty.call(nme.Assets.pathMapper.h,filename)) {
			filename = nme.Assets.pathMapper.h[filename];
		}
		if(Object.prototype.hasOwnProperty.call(nme.Assets.byteFactory.h,filename)) {
			data = nme.display.BitmapData.loadFromBytes(nme.Assets.byteFactory.h[filename]());
		} else {
			data = nme.display.BitmapData.load(filename);
		}
	}
	if(data != null && data.get_transparent()) {
		switch(i.alphaMode._hx_index) {
		case 2:case 3:
			data.setFormat(2,false);
			break;
		case 4:
			data.set_premultipliedAlpha(true);
			break;
		default:
		}
	}
	nme.Assets.trySetCache(i,useCache,data);
	return data;
};
nme.Assets.getImage = function(id,useCache) {
	return nme.Assets.getBitmapData(id,useCache);
};
nme.Assets.hasBytes = function(id) {
	var i = nme.Assets.getInfo(id);
	return i != null;
};
nme.Assets.exists = function(id,type) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		return false;
	}
	if(type == null) {
		return true;
	}
	return i.type == type;
};
nme.Assets.getBytes = function(id,useCache) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"Bytes");
		return null;
	}
	return nme.Assets.getBytesInfo(i,useCache);
};
nme.Assets.getBytesInfo = function(i,useCache) {
	if(useCache != false) {
		var cached = i.getCache();
		var val = ((cached) instanceof nme.utils.ByteArray) ? cached : null;
		if(val != null) {
			val.position = 0;
			return val;
		}
	}
	var data = null;
	if(i.isResource) {
		data = nme.Assets.getResource(i.path);
	} else {
		var filename = i.path;
		if(Object.prototype.hasOwnProperty.call(nme.Assets.pathMapper.h,filename)) {
			filename = nme.Assets.pathMapper.h[filename];
		}
		if(Object.prototype.hasOwnProperty.call(nme.Assets.byteFactory.h,filename)) {
			data = nme.Assets.byteFactory.h[filename]();
		} else {
			data = nme.utils.ByteArray.readFile(filename);
		}
	}
	if(data != null) {
		data.position = 0;
	}
	nme.Assets.trySetCache(i,useCache,data);
	return data;
};
nme.Assets.hasFont = function(id) {
	var i = nme.Assets.getInfo(id);
	if(i != null) {
		return i.type == nme.AssetType.FONT;
	} else {
		return false;
	}
};
nme.Assets.getFont = function(id,useCache) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"Font");
		return null;
	}
	if(i.type != nme.AssetType.FONT) {
		nme.Assets.badType(id,"Font");
		return null;
	}
	if(useCache != false) {
		var val = i.getCache();
		if(val != null && ((val) instanceof nme.text.Font)) {
			return val;
		}
	}
	var font = i.isResource ? new nme.text.Font("",null,null,i.path,id) : new nme.text.Font(i.path,null,null,null,id);
	nme.Assets.trySetCache(i,useCache,font);
	return font;
};
nme.Assets.hasSound = function(id) {
	var i = nme.Assets.getInfo(id);
	if(i != null) {
		if(i.type != nme.AssetType.SOUND) {
			return i.type == nme.AssetType.MUSIC;
		} else {
			return true;
		}
	} else {
		return false;
	}
};
nme.Assets.getSound = function(id,useCache,forceMusic,inEngine) {
	if(forceMusic == null) {
		forceMusic = false;
	}
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"Sound");
		return null;
	}
	if(i.type != nme.AssetType.SOUND && i.type != nme.AssetType.MUSIC) {
		nme.Assets.badType(id,"Sound");
		return null;
	}
	if(useCache != false) {
		var val = i.getCache();
		if(val != null && ((val) instanceof nme.media.Sound)) {
			return val;
		}
	}
	var sound = null;
	if(i.isResource) {
		sound = new nme.media.Sound();
		var bytes = nme.Assets.getBytes(id);
		sound.loadCompressedDataFromByteArray(bytes,bytes.length,i.type == nme.AssetType.MUSIC || forceMusic,inEngine);
	} else if(Object.prototype.hasOwnProperty.call(nme.Assets.byteFactory.h,i.path)) {
		var bytes = nme.Assets.byteFactory.h[i.path]();
		sound = new nme.media.Sound();
		sound.loadCompressedDataFromByteArray(bytes,bytes.length,i.type == nme.AssetType.MUSIC || forceMusic,inEngine);
	} else {
		var sound1 = i.type == nme.AssetType.MUSIC || forceMusic;
		sound = new nme.media.Sound(new nme.net.URLRequest(i.path),null,sound1,inEngine);
	}
	nme.Assets.trySetCache(i,useCache,sound);
	return sound;
};
nme.Assets.getMusic = function(id,useCache) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"Music");
		return null;
	}
	if(i.type != nme.AssetType.MUSIC && i.type != nme.AssetType.SOUND) {
		nme.Assets.badType(id,"Music");
		return null;
	}
	return nme.Assets.getSound(id,useCache,true);
};
nme.Assets.hasText = function(id) {
	return nme.Assets.hasBytes(id);
};
nme.Assets.hasString = function(id) {
	return nme.Assets.hasBytes(id);
};
nme.Assets.getText = function(id,useCache) {
	var i = nme.Assets.getInfo(id);
	if(i == null) {
		nme.Assets.noId(id,"String");
		return null;
	}
	if(i.isResource) {
		return haxe.Resource.getString(i.path);
	}
	var bytes = nme.Assets.getBytes(id,useCache);
	if(bytes == null) {
		return null;
	}
	var result = bytes.readUTFBytes(bytes.length);
	return result;
};
nme.Assets.getString = function(id,useCache) {
	return nme.Assets.getText(id,useCache);
};
nme.Assets.parseLibId = function(id) {
	var split = id.indexOf(":");
	if(split < 0) {
		return null;
	}
	return [HxOverrides.substr(id,0,split),HxOverrides.substr(id,split + 1,null)];
};
nme.Assets.loadLibrary = function(inLibName,onLoad) {
	if(Object.prototype.hasOwnProperty.call(nme.Assets.loadedLibraries.h,inLibName)) {
		onLoad(nme.Assets.loadedLibraries.h[inLibName]);
		return;
	}
	var libInfo = nme.Assets.info.h[inLibName];
	if(libInfo == null) {
		throw haxe.Exception.thrown("[nme.Assets] Unnkown library " + inLibName);
	}
	var type = Std.string(libInfo.type);
	var factory = nme.Assets.libraryFactories.h[type];
	if(factory == null) {
		throw haxe.Exception.thrown("[nme.Assets] missing library handler for '" + inLibName + "' of type " + type);
	}
	factory(inLibName).load(function(lib) {
		nme.Assets.loadedLibraries.h[inLibName] = lib;
		onLoad(lib);
	});
};
nme.Assets.getLoadedLibrary = function(inLibName) {
	if(!Object.prototype.hasOwnProperty.call(nme.Assets.loadedLibraries.h,inLibName)) {
		var libInfo = nme.Assets.info.h[inLibName];
		if(libInfo == null) {
			nme.Assets.noId(inLibName,"Library");
			return null;
		}
		var type = Std.string(libInfo.type);
		var factory = nme.Assets.libraryFactories.h[type];
		if(factory == null) {
			haxe.Log.trace("[nme.Assets] missing library handler for '" + inLibName + "' of type " + type,{ fileName : "../../src/nme/Assets.hx", lineNumber : 663, className : "nme.Assets", methodName : "getLoadedLibrary"});
			return null;
		}
		factory(inLibName).load(function(lib) {
			nme.Assets.loadedLibraries.h[inLibName] = lib;
		});
	}
	return nme.Assets.loadedLibraries.h[inLibName];
};
nme.Assets.getMovieClip = function(id) {
	var libId = nme.Assets.parseLibId(id);
	if(libId != null) {
		var lib = nme.Assets.getLoadedLibrary(libId[0]);
		if(lib == null) {
			return null;
		}
		return lib.getMovieClip(libId[1]);
	}
	return null;
};
nme.Assets.initialize = function() {
};
nme.Glue = function() { };
$hxClasses["nme.Glue"] = nme.Glue;
nme.Glue.__name__ = "nme.Glue";
nme.Glue.toByteArray = function(bytes) {
	return nme.utils.ByteArray.fromBytes(bytes);
};
nme.Glue.toBytes = function(array) {
	return array;
};
nme.app.Application = function() { };
$hxClasses["nme.app.Application"] = nme.app.Application;
nme.app.Application.__name__ = "nme.app.Application";
nme.app.Application.__properties__ = {get_bits:"get_bits",get_nmeStateVersion:"get_nmeStateVersion",get_ndllVersion:"get_ndllVersion",get_build:"get_build"};
nme.app.Application.initHeight = null;
nme.app.Application.initWidth = null;
nme.app.Application.initFrameRate = null;
nme.app.Application.company = null;
nme.app.Application.version = null;
nme.app.Application.packageName = null;
nme.app.Application.file = null;
nme.app.Application.build = null;
nme.app.Application.ndllVersion = null;
nme.app.Application.nmeStateVersion = null;
nme.app.Application.bits = null;
nme.app.Application.pollClientList = null;
nme.app.Application.createWindow = function(inOnLoaded,inParams,isSecondary) {
	if(isSecondary == null) {
		isSecondary = false;
	}
	if(isSecondary) {
		if(!nme.app.Application.sIsInit) {
			throw haxe.Exception.thrown("Secondary window created before main window.");
		}
	} else if(nme.app.Application.sIsInit) {
		if(nme.app.Application.silentRecreate) {
			inOnLoaded(nme.app.Application.nmeWindow);
			return;
		}
		throw haxe.Exception.thrown("nme.app.Application.createWindow called multiple times. This function is automatically called by the project code.");
	}
	nme.app.Application.sIsInit = true;
	nme.app.Application.initWidth = inParams.width == null ? 640 : inParams.width;
	nme.app.Application.initHeight = inParams.height == null ? 480 : inParams.height;
	nme.app.Application.initFrameRate = inParams.fps == null ? 60 : inParams.fps;
	var flags = inParams.flags == null ? 15 : inParams.flags;
	var title = inParams.title == null ? "NME" : inParams.title;
	var icon = inParams.icon == null ? null : inParams.icon.nmeHandle;
	var this1 = nme.Loader.load("nme_create_main_frame",-1);
	var create_main_frame = this1;
	create_main_frame(function(inFrameHandle) {
		nme.app.Application.onQuit = nme.app.Application.close;
		nme.app.Application.nmeFrameHandle = inFrameHandle;
		nme.app.Application.nmeWindow = new nme.app.Window(nme.app.Application.nmeFrameHandle,nme.app.Application.initWidth,nme.app.Application.initHeight);
		nme.app.Application.nmeWindow.setBackground(inParams.color);
		inOnLoaded(nme.app.Application.nmeWindow);
	},nme.app.Application.initWidth,nme.app.Application.initHeight,flags,title,icon);
};
nme.app.Application.close = function() {
	nme.app.Application.nmeQuitting = true;
	var this1 = nme.Loader.load("nme_close",0);
	var close = this1;
	close();
};
nme.app.Application.addPollClient = function(client,inAtEnd) {
	if(inAtEnd == null) {
		inAtEnd = false;
	}
	if(nme.app.Application.pollClientList == null) {
		nme.app.Application.pollClientList = [];
	}
	if(inAtEnd) {
		nme.app.Application.pollClientList.push(client);
	} else {
		nme.app.Application.pollClientList.splice(0,0,client);
	}
};
nme.app.Application.removePollClient = function(client) {
	if(nme.app.Application.pollClientList != null) {
		HxOverrides.remove(nme.app.Application.pollClientList,client);
	}
};
nme.app.Application.pollThreadJobs = function() {
	while(!nme.app.Application.nmeQuitting && nme.app.Application.mainThreadJobs.length > 0) {
		var job = null;
		job = nme.app.Application.mainThreadJobs.shift();
		if(job != null) {
			job();
		}
	}
};
nme.app.Application.pollClients = function(timestamp) {
	if(nme.app.Application.mainThreadJobs.length > 0) {
		nme.app.Application.pollThreadJobs();
	}
	if(nme.app.Application.pollClientList != null && !nme.app.Application.nmeQuitting) {
		var _g = 0;
		var _g1 = nme.app.Application.pollClientList;
		while(_g < _g1.length) {
			var client = _g1[_g];
			++_g;
			client.onPoll(timestamp);
		}
	}
	if(nme.app.Application.mainThreadJobs.length > 0) {
		nme.app.Application.pollThreadJobs();
	}
};
nme.app.Application.getNextWake = function(timestamp) {
	var nextWake = 1e30;
	if(nme.app.Application.pollClientList != null && !nme.app.Application.nmeQuitting) {
		var _g = 0;
		var _g1 = nme.app.Application.pollClientList;
		while(_g < _g1.length) {
			var client = _g1[_g];
			++_g;
			var wake = client.getNextWake(nextWake,timestamp);
			if(wake <= 0) {
				return 0;
			}
			if(wake < nextWake) {
				nextWake = wake;
			}
		}
	}
	return nextWake;
};
nme.app.Application.setFixedOrientation = function(inOrientation) {
	nme.app.Application.nme_stage_set_fixed_orientation(inOrientation);
};
nme.app.Application.exit = function() {
	if(nme.app.Application.onQuit != null) {
		nme.app.Application.onQuit();
	}
};
nme.app.Application.forceClose = function() {
	var this1 = nme.Loader.load("nme_terminate",0);
	var terminate = this1;
	terminate();
};
nme.app.Application.pause = function() {
	nme.app.Application.nme_pause_animation();
};
nme.app.Application.setNativeWindow = function($window) {
	nme.app.Application.nme_set_native_window($window);
};
nme.app.Application.runOnMainThread = function(inCallback) {
	nme.app.Application.mainThreadJobs.push(inCallback);
	if(nme.app.Application.asyncPing != null) {
		nme.app.Application.asyncPing();
	}
};
nme.app.Application.postUICallback = function(inCallback) {
	nme.app.Application.runOnMainThread(inCallback);
};
nme.app.Application.resume = function() {
	nme.app.Application.nme_resume_animation();
};
nme.app.Application.setIcon = function(path) {
	var set_icon = nme.Loader.load("nme_set_icon",1);
	set_icon(path);
};
nme.app.Application.setPackage = function(inCompany,inFile,inPack,inVersion) {
	nme.app.Application.company = inCompany;
	nme.app.Application.file = inFile;
	nme.app.Application.packageName = inPack;
	nme.app.Application.version = inVersion;
	nme.app.Application.nme_set_package(inCompany,inFile,inPack,inVersion);
};
nme.app.Application.get_build = function() {
	return "6.0.0";
};
nme.app.Application.get_ndllVersion = function() {
	return nme.app.Application.nme_get_ndll_version();
};
nme.app.Application.get_nmeStateVersion = function() {
	return nme.app.Application.nme_get_nme_state_version();
};
nme.app.Application.get_bits = function() {
	return nme.app.Application.nme_get_bits();
};
nme.Lib = function() { };
$hxClasses["nme.Lib"] = nme.Lib;
nme.Lib.__name__ = "nme.Lib";
nme.Lib.__properties__ = {set_silentRecreate:"set_silentRecreate",get_silentRecreate:"get_silentRecreate",get_bits:"get_bits",get_nmeStateVersion:"get_nmeStateVersion",get_ndllVersion:"get_ndllVersion",get_build:"get_build",get_file:"get_file",get_packageName:"get_packageName",get_version:"get_version",get_company:"get_company",get_initWidth:"get_initWidth",get_initHeight:"get_initHeight",get_current:"get_current",get_stage:"get_stage"};
nme.Lib.title = null;
nme.Lib.stageFactory = null;
nme.Lib.create = function(inOnLoaded,inWidth,inHeight,inFrameRate,inColour,inFlags,inTitle,inIcon,inDummy) {
	if(inTitle == null) {
		inTitle = "NME";
	}
	if(inFlags == null) {
		inFlags = 15;
	}
	if(inColour == null) {
		inColour = -1;
	}
	if(inFrameRate == null) {
		inFrameRate = 60.0;
	}
	nme.Lib.title = inTitle;
	var params = { width : inWidth, height : inHeight, flags : inFlags, title : inTitle, color : inColour, icon : inIcon};
	nme.app.Application.createWindow(function(inWindow) {
		try {
			if(nme.Lib.stageFactory != null) {
				nme.Lib.nmeStage = nme.Lib.stageFactory(inWindow);
			} else {
				nme.Lib.nmeStage = new nme.display.Stage(inWindow);
			}
			nme.Lib.nmeStage.set_frameRate(inFrameRate);
			nme.Lib.nmeStage.set_opaqueBackground(inColour);
			if(nme.Lib.nmeCurrent != null) {
				nme.Lib.nmeStage.nmeCurrent = nme.Lib.nmeCurrent;
				nme.Lib.nmeStage.addChild(nme.Lib.nmeCurrent);
				nme.Lib.nmeCurrent = null;
			}
			inOnLoaded();
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			var e = haxe.Exception.caught(_g).unwrap();
			var stack = haxe.CallStack.toString(haxe.CallStack.exceptionStack());
			haxe.Log.trace("Error creating window: (" + Std.string(params) + ")\n" + Std.string(e) + stack,{ fileName : "../../src/nme/Lib.hx", lineNumber : 102, className : "nme.Lib", methodName : "create"});
		}
	},params);
};
nme.Lib.createSecondaryWindow = function(inWidth,inHeight,inTitle,inFlags,inColour,inFrameRate,inIcon) {
	if(inFrameRate == null) {
		inFrameRate = 0.0;
	}
	if(inColour == null) {
		inColour = 16777215;
	}
	if(inFlags == null) {
		inFlags = 15;
	}
	nme.Lib.title = inTitle;
	var params = { width : inWidth, height : inHeight, flags : inFlags, title : inTitle, color : inColour, icon : inIcon};
	var $window = null;
	var err = null;
	nme.app.Application.createWindow(function(inWindow) {
		try {
			var stage = nme.Lib.stageFactory != null ? nme.Lib.stageFactory(inWindow) : new nme.display.Stage(inWindow);
			stage.set_frameRate(inFrameRate);
			stage.set_opaqueBackground(inColour);
			$window = inWindow;
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			var e = haxe.Exception.caught(_g).unwrap();
			var stack = haxe.CallStack.toString(haxe.CallStack.exceptionStack());
			err = "Error creating window: (" + Std.string(params) + ")\n" + Std.string(e) + stack;
		}
	},params,true);
	if(err != null) {
		throw haxe.Exception.thrown(err);
	}
	if($window == null) {
		throw haxe.Exception.thrown("multiple windows not supported on this target");
	}
	return $window;
};
nme.Lib.load = function(library,method,args) {
	if(args == null) {
		args = 0;
	}
	return null;
};
nme.Lib.crash = function() {
	nme.Lib.nme_crash();
};
nme.Lib.log = function(str) {
	nme.Lib.nme_log(str);
};
nme.Lib.redirectTrace = function() {
	haxe.Log.trace = function(v,infos) {
		if(infos == null) {
			nme.Lib.log(Std.string(v));
		} else {
			nme.Lib.log(infos.fileName + ":" + infos.lineNumber + ": " + Std.string(v));
		}
	};
};
nme.Lib.createManagedStage = function(inWidth,inHeight,inFlags) {
	if(inFlags == null) {
		inFlags = 0;
	}
	nme.app.Application.initWidth = inWidth;
	nme.app.Application.initHeight = inHeight;
	var result = new nme.display.ManagedStage(inWidth,inHeight,inFlags);
	nme.Lib.nmeStage = result;
	return result;
};
nme.Lib.getURL = function(url,target) {
	url.launchBrowser();
};
nme.Lib.getTimer = function() {
	return haxe.Timer.stamp() * 1000.0 | 0;
};
nme.Lib.get_current = function() {
	if(nme.Lib.nmeStage != null) {
		return nme.Lib.nmeStage.get_current();
	}
	if(nme.Lib.nmeCurrent == null) {
		nme.Lib.nmeCurrent = new nme.display.MovieClip();
	}
	return nme.Lib.nmeCurrent;
};
nme.Lib.get_stage = function() {
	if(nme.Lib.nmeStage == null) {
		throw haxe.Exception.thrown("Error : stage can't be accessed until init is called");
	}
	return nme.Lib.nmeStage;
};
nme.Lib.nmeSetCurrentStage = function(inStage) {
	nme.Lib.nmeStage = inStage;
};
nme.Lib.get_initWidth = function() {
	return nme.app.Application.initWidth;
};
nme.Lib.get_initHeight = function() {
	return nme.app.Application.initHeight;
};
nme.Lib.get_company = function() {
	return nme.app.Application.company;
};
nme.Lib.get_version = function() {
	return nme.app.Application.version;
};
nme.Lib.get_packageName = function() {
	return nme.app.Application.packageName;
};
nme.Lib.get_file = function() {
	return nme.app.Application.file;
};
nme.Lib.get_build = function() {
	return nme.app.Application.get_build();
};
nme.Lib.get_ndllVersion = function() {
	return nme.app.Application.get_ndllVersion();
};
nme.Lib.get_nmeStateVersion = function() {
	return nme.app.Application.get_nmeStateVersion();
};
nme.Lib.get_bits = function() {
	return nme.app.Application.get_bits();
};
nme.Lib.get_silentRecreate = function() {
	return nme.app.Application.silentRecreate;
};
nme.Lib.set_silentRecreate = function(inVal) {
	nme.app.Application.silentRecreate = inVal;
	return inVal;
};
nme.Memory = function() { };
$hxClasses["nme.Memory"] = nme.Memory;
nme.Memory.__name__ = "nme.Memory";
nme.Memory.b = null;
nme.Memory.len = null;
nme.Memory.select = function(inBytes) {
	nme.Memory.b = inBytes;
	if(inBytes == null) {
		nme.Memory.len = 0;
	} else {
		nme.Memory.len = inBytes.length;
	}
};
nme.Memory.getByte = function(addr) {
	return nme.Memory.b.b[addr];
};
nme.Memory.getDouble = function(addr) {
	return nme.Memory.b.getDouble(addr);
};
nme.Memory.getFloat = function(addr) {
	return nme.Memory.b.getFloat(addr);
};
nme.Memory.setByte = function(addr,v) {
	nme.Memory.b.b[addr] = v;
};
nme.Memory.setDouble = function(addr,v) {
	nme.Memory.b.setDouble(addr,v);
};
nme.Memory.setFloat = function(addr,v) {
	nme.Memory.b.setFloat(addr,v);
};
nme.Memory.getI32 = function(addr) {
	var b = nme.Memory.b.b;
	return b[addr++] | b[addr++] << 8 | b[addr++] << 16 | b[addr] << 24;
};
nme.Memory.getUI16 = function(addr) {
	var b = nme.Memory.b.b;
	return b[addr++] | b[addr++] << 8;
};
nme.Memory.setI16 = function(addr,v) {
	var b = nme.Memory.b.b;
	b[addr++] = v & 255;
	b[addr++] = v >> 8 & 255;
};
nme.Memory.setI32 = function(addr,v) {
	var b = nme.Memory.b.b;
	b[addr++] = v & 255;
	b[addr++] = v >> 8 & 255;
	b[addr++] = v >> 16 & 255;
	b[addr++] = v >> 24 & 255;
};
nme.NativeResource = function() { };
$hxClasses["nme.NativeResource"] = nme.NativeResource;
nme.NativeResource.__name__ = "nme.NativeResource";
nme.NativeResource.unrealize = function(handle,ptr,len,handleList) {
	var buffer = new ArrayBuffer(len);
	var bytes = new Uint8Array(buffer);
	var heap = Module.HEAP8;
	bytes.set(heap.subarray(ptr,ptr + len));
	handle.data = bytes;
	handle.handleList = handleList;
};
nme.NativeResource.realize = function(handle) {
	var bytes = handle.data;
	handle.data = null;
	var len = bytes.length;
	var ptr = Module._malloc(len);
	var heap = new Uint8Array(Module.HEAPU8.buffer,ptr,len);
	heap.set(bytes);
	handle.ptr = ptr;
	return len;
};
nme.NativeResource.lockHandler = function(handler) {
	nme.NativeResource.nme_native_resource_lock(handler.nmeHandle);
};
nme.NativeResource.unlockHandler = function(handler) {
	nme.NativeResource.nme_native_resource_unlock(handler.nmeHandle);
};
nme.NativeResource.setAutoClearHandler = function(handler) {
	var handle = handler.nmeHandle;
	if(handle != null) {
		handle.flags = handle.flags == null ? 1 : handle.flags | 1;
	}
};
nme.NativeResource.setWriteOnlyHandler = function(handler) {
	var handle = handler.nmeHandle;
	if(handle != null) {
		handle.flags = handle.flags == null ? 2 : handle.flags | 2;
	}
};
nme.NativeResource.lock = function(handle) {
	nme.NativeResource.nme_native_resource_lock(handle);
};
nme.NativeResource.unlock = function(handle) {
	nme.NativeResource.nme_native_resource_unlock(handle);
};
nme.NativeResource.setAutoClear = function(handle) {
	handle.flags = handle.flags == null ? 1 : handle.flags | 1;
};
nme.NativeResource.setWriteOnly = function(handle) {
	handle.flags = handle.flags == null ? 2 : handle.flags | 2;
};
nme.NativeResource.releaseTempRefs = function() {
	nme.NativeResource.nme_native_resource_release_temps();
};
nme.NativeResource.disposeHandler = function(handler) {
	if(handler.nmeHandle != null) {
		nme.NativeResource.nme_native_resource_dispose(handler.nmeHandle);
		handler.nmeHandle = null;
	}
};
nme.NativeResource.dispose = function(handle) {
	if(handle != null) {
		nme.NativeResource.nme_native_resource_dispose(handle);
	}
	return null;
};
nme.PrimeLoader = function() { };
$hxClasses["nme.PrimeLoader"] = nme.PrimeLoader;
nme.PrimeLoader.__name__ = "nme.PrimeLoader";
nme.Rgb = function() { };
$hxClasses["nme.Rgb"] = nme.Rgb;
nme.Rgb.__name__ = "nme.Rgb";
nme.Rgb.colourMap = null;
nme.Rgb.colourNames = null;
nme.Rgb.makeMap = function() {
	if(nme.Rgb.colourMap == null) {
		nme.Rgb.colourMap = new haxe.ds.StringMap();
		var parts = nme.Rgb.colourData.split(":");
		var idx = 0;
		while(idx < parts.length) {
			var this1 = nme.Rgb.colourMap;
			var value = nme.Rgb.hex2Int(parts[idx + 1],0);
			this1.h[parts[idx]] = value;
			idx += 2;
		}
	}
};
nme.Rgb.hex2Int = function(hex,pos) {
	var result = 0;
	while(pos < hex.length) {
		var code = HxOverrides.cca(hex,pos);
		if(code >= 48 && code <= 57) {
			result = result * 16 + code - 48;
		} else if(code >= 97 && code <= 102) {
			result = result * 16 + code - 97 + 10;
		} else {
			break;
		}
		++pos;
	}
	return result;
};
nme.Rgb.getColourNames = function() {
	if(nme.Rgb.colourNames == null) {
		nme.Rgb.colourNames = [];
		var parts = nme.Rgb.colourData.split(":");
		var idx = 0;
		while(idx < parts.length) {
			nme.Rgb.colourNames.push(parts[idx]);
			idx += 2;
		}
	}
	return nme.Rgb.colourNames;
};
nme.Rgb.getColorNames = function() {
	return nme.Rgb.getColourNames();
};
nme.Rgb.parse = function(inCol) {
	nme.Rgb.makeMap();
	var lower = inCol.toLowerCase();
	if(Object.prototype.hasOwnProperty.call(nme.Rgb.colourMap.h,lower)) {
		return nme.Rgb.colourMap.h[lower] | -16777216;
	}
	if(HxOverrides.cca(lower,0) == 35) {
		var col = nme.Rgb.hex2Int(lower,1);
		if(lower.length == 4) {
			col = (col & 15) * 17 | (col & 240) * 272 | (col & 3840) * 4352;
		}
		return col | -16777216;
	}
	var tmp = StringTools.startsWith(lower,"rgba(");
	var tmp = StringTools.startsWith(lower,"rgb(");
	return -16777216;
};
nme.Vector = {};
nme.Vector.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"};
nme.Vector._new = function(length,fixed) {
	var this1 = [];
	var tmp = length != null && length > 0;
	return this1;
};
nme.Vector.concat = function(this1,a) {
	return this1.concat(a);
};
nme.Vector.copy = function(this1) {
	return this1.slice();
};
nme.Vector.iterator = function(this1) {
	return new haxe.iterators.ArrayIterator(this1);
};
nme.Vector.join = function(this1,sep) {
	return this1.join(sep);
};
nme.Vector.pop = function(this1) {
	return this1.pop();
};
nme.Vector.push = function(this1,x) {
	return this1.push(x);
};
nme.Vector.reverse = function(this1) {
	this1.reverse();
};
nme.Vector.shift = function(this1) {
	return this1.shift();
};
nme.Vector.unshift = function(this1,x) {
	this1.unshift(x);
};
nme.Vector.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
};
nme.Vector.sort = function(this1,f) {
	this1.sort(f);
};
nme.Vector.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
};
nme.Vector.toString = function(this1) {
	if(this1 == null) {
		return "null";
	}
	return this1.toString();
};
nme.Vector.insertAt = function(this1,index,element) {
	this1.splice(index,0,element);
};
nme.Vector.indexOf = function(this1,x,from) {
	if(from == null) {
		from = 0;
	}
	var value = -1;
	var _g = from;
	var _g1 = this1.length;
	while(_g < _g1) {
		var i = _g++;
		if(this1[i] == x) {
			value = i;
			break;
		}
	}
	return value;
};
nme.Vector.lastIndexOf = function(this1,x,from) {
	if(from == null) {
		from = 0;
	}
	var i = this1.length - 1;
	var value = -1;
	while(i >= from) {
		if(this1[i] == x) {
			value = i;
			break;
		}
		--i;
	}
	return value;
};
nme.Vector.ofArray = function(a) {
	var length = null;
	var this1 = [];
	var tmp = length != null && length > 0;
	return this1.concat(a);
};
nme.Vector.convert = function(v) {
	return v;
};
nme.Vector.fromArray = function(a) {
	return a;
};
nme.Vector.toArray = function(this1) {
	return this1;
};
nme.Vector.get_length = function(this1) {
	return this1.length;
};
nme.Vector.set_length = function(this1,value) {
	return this1.length;
};
nme.Vector.get_fixed = function(this1) {
	return false;
};
nme.Vector.set_fixed = function(this1,value) {
	return value;
};
nme.Version = function() { };
$hxClasses["nme.Version"] = nme.Version;
nme.Version.__name__ = "nme.Version";
nme.app.EventId = function() { };
$hxClasses["nme.app.EventId"] = nme.app.EventId;
nme.app.EventId.__name__ = "nme.app.EventId";
nme.app.EventName = function() { };
$hxClasses["nme.app.EventName"] = nme.app.EventName;
nme.app.EventName.__name__ = "nme.app.EventName";
nme.app.FrameTimer = function(inWindow,inFps) {
	this.set_fps(inFps);
	this.lastRender = 0.0;
	this.window = inWindow;
	this.invalid = false;
	this.catchup = false;
	this.offTarget = 0.0;
	nme.app.Application.addPollClient(this,true);
};
$hxClasses["nme.app.FrameTimer"] = nme.app.FrameTimer;
nme.app.FrameTimer.__name__ = "nme.app.FrameTimer";
nme.app.FrameTimer.__interfaces__ = [nme.app.IPollClient];
nme.app.FrameTimer.prototype = {
	fps: null
	,lastRender: null
	,framePeriod: null
	,window: null
	,invalid: null
	,catchup: null
	,offTarget: null
	,destory: function() {
		nme.app.Application.removePollClient(this);
	}
	,set_fps: function(inFps) {
		this.fps = inFps;
		this.framePeriod = this.fps > 0 ? 1.0 / this.fps : 0.0;
		return inFps;
	}
	,onPoll: function(timestamp) {
		if(this.window.active) {
			var wasInvalid = this.invalid;
			this.invalid = false;
			if(this.fps >= 60) {
				this.lastRender = timestamp;
				this.window.onNewFrame();
				this.offTarget = 0.0;
			} else if(this.fps > 0 && timestamp >= this.lastRender - this.offTarget + this.framePeriod - 0.0005) {
				if(this.catchup) {
					this.offTarget = timestamp - (this.lastRender + this.framePeriod);
					if(this.offTarget > this.framePeriod) {
						this.offTarget = this.framePeriod;
					}
					if(this.offTarget < -this.framePeriod) {
						this.offTarget = -this.framePeriod;
					}
				} else {
					this.offTarget = 0.0;
				}
				this.lastRender = timestamp;
				this.window.onNewFrame();
			} else if(wasInvalid) {
				this.offTarget = 0.0;
				this.window.onInvalidFrame();
			}
		}
	}
	,invalidate: function() {
		this.invalid = true;
	}
	,getNextWake: function(defaultWake,timestamp) {
		if(!this.window.active) {
			return defaultWake;
		}
		if(this.invalid) {
			return 0.0;
		}
		if(this.framePeriod == 0.0) {
			return defaultWake;
		}
		var next = this.lastRender + this.framePeriod - haxe.Timer.stamp();
		if(next < defaultWake) {
			return next;
		}
		return defaultWake;
	}
	,__class__: nme.app.FrameTimer
	,__properties__: {set_fps:"set_fps"}
};
nme.app.IAppEventHandler = function() { };
$hxClasses["nme.app.IAppEventHandler"] = nme.app.IAppEventHandler;
nme.app.IAppEventHandler.__name__ = "nme.app.IAppEventHandler";
nme.app.IAppEventHandler.__isInterface__ = true;
nme.app.IAppEventHandler.prototype = {
	onRender: null
	,onText: null
	,onKey: null
	,onMouse: null
	,onTouch: null
	,onResize: null
	,onDisplayObjectFocus: null
	,onInputFocus: null
	,onChange: null
	,onActive: null
	,onJoystick: null
	,onSysMessage: null
	,onAppLink: null
	,onContextLost: null
	,onScroll: null
	,onDpiChanged: null
	,onDrop: null
	,onUnhandledException: null
	,onWindowClose: null
	,onWindowMoved: null
	,onWindowLeave: null
	,onWindowEnter: null
	,__class__: nme.app.IAppEventHandler
};
nme.app.MouseState = function() {
	this.x = this.y = this.buttons = 0;
};
$hxClasses["nme.app.MouseState"] = nme.app.MouseState;
nme.app.MouseState.__name__ = "nme.app.MouseState";
nme.app.MouseState.prototype = {
	x: null
	,y: null
	,buttons: null
	,getButton: function(but) {
		return (this.buttons & 1 << but) != 0;
	}
	,toString: function() {
		return "MouseState(" + this.x + "," + this.y + ":" + this.buttons + ")";
	}
	,__class__: nme.app.MouseState
};
nme.app.NmeApplication = function(inWindow) {
	this.window = inWindow;
	this.window.appEventHandler = this;
	this.width = inWindow.get_width();
	this.height = inWindow.get_width();
	this.fullViewport = [0,0,this.width,this.height];
	this.createFrameTimer();
};
$hxClasses["nme.app.NmeApplication"] = nme.app.NmeApplication;
nme.app.NmeApplication.__name__ = "nme.app.NmeApplication";
nme.app.NmeApplication.__interfaces__ = [nme.app.IPollClient,nme.app.IAppEventHandler];
nme.app.NmeApplication.prototype = {
	width: null
	,height: null
	,fullViewport: null
	,window: null
	,frameTimer: null
	,createFrameTimer: function() {
		this.frameTimer = new nme.app.FrameTimer(this.window,100);
	}
	,invalidate: function() {
		if(this.frameTimer != null) {
			this.frameTimer.invalidate();
		}
	}
	,get_frameRate: function() {
		if(this.frameTimer == null) {
			return 0;
		} else {
			return this.frameTimer.fps;
		}
	}
	,set_frameRate: function(fps) {
		if(this.frameTimer == null) {
			return fps;
		} else {
			return this.frameTimer.set_fps(fps);
		}
	}
	,onPoll: function(timestamp) {
	}
	,getNextWake: function(inDefault,timestamp) {
		return inDefault;
	}
	,onResize: function(inWidth,inHeight) {
		this.width = inWidth;
		this.height = inHeight;
		this.fullViewport = [0,0,this.width,this.height];
	}
	,onText: function(event,type) {
	}
	,onRender: function(inNewFrame) {
	}
	,onContextLost: function() {
	}
	,onKey: function(event,type) {
	}
	,onMouse: function(event,type,inFromMouse) {
	}
	,onTouch: function(event,type) {
	}
	,onDisplayObjectFocus: function(event) {
	}
	,onInputFocus: function(acquired) {
	}
	,onRotateRequest: function(inDirection) {
		return true;
	}
	,onChange: function(event) {
	}
	,onActive: function(activated) {
	}
	,onJoystick: function(event,type) {
	}
	,onSysMessage: function(event) {
	}
	,onAppLink: function(inEvent) {
	}
	,onScroll: function(event) {
	}
	,onDpiChanged: function(event) {
	}
	,onDrop: function(event) {
	}
	,onWindowClose: function() {
	}
	,onWindowMoved: function(x,y) {
	}
	,onWindowLeave: function() {
	}
	,onWindowEnter: function() {
	}
	,onUnhandledException: function(exception,stack) {
		haxe.Log.trace("Exception: " + Std.string(exception) + "\n" + haxe.CallStack.toString(stack),{ fileName : "../../src/nme/app/NmeApplication.hx", lineNumber : 157, className : "nme.app.NmeApplication", methodName : "onUnhandledException"});
		haxe.Log.trace("\n\n\n===Terminating===\n.",{ fileName : "../../src/nme/app/NmeApplication.hx", lineNumber : 158, className : "nme.app.NmeApplication", methodName : "onUnhandledException"});
		throw haxe.Exception.thrown("Unhandled exception:" + Std.string(exception));
	}
	,__class__: nme.app.NmeApplication
	,__properties__: {set_frameRate:"set_frameRate",get_frameRate:"get_frameRate"}
};
nme.app.Window = function(inFrameHandle,inWidth,inHeight) {
	this.appEventHandler = null;
	this.active = true;
	this.autoClear = true;
	this.nmeHandle = inFrameHandle;
	this.renderRequest = null;
	this.nmeStageHandle = nme.app.Window.nme_get_frame_stage(inFrameHandle);
	nme.app.Window.nme_set_stage_handler(this.nmeStageHandle,$bind(this,this.nmeProcessWindowEvent),inWidth,inHeight);
};
$hxClasses["nme.app.Window"] = nme.app.Window;
nme.app.Window.__name__ = "nme.app.Window";
nme.app.Window.__properties__ = {get_supportsSecondary:"get_supportsSecondary"};
nme.app.Window.supportsSecondary = null;
nme.app.Window.get_supportsSecondary = function() {
	return nme.app.Window.nme_window_supports_secondary();
};
nme.app.Window.prototype = {
	active: null
	,dpiScale: null
	,isOpenGL: null
	,x: null
	,y: null
	,height: null
	,width: null
	,autoClear: null
	,renderRequest: null
	,nextWakeHandler: null
	,beginRenderImmediate: null
	,endRenderImmediate: null
	,appEventHandler: null
	,stage: null
	,onText: null
	,nmeHandle: null
	,nmeStageHandle: null
	,enterFramePending: null
	,get_globalMouseState: function() {
		var m = new nme.app.MouseState();
		nme.app.Window.nme_stage_get_global_mouse_state(this.nmeStageHandle,m);
		return m;
	}
	,close: function() {
		if(this.stage != null) {
			var evt_before = new nme.events.Event("beforeClose",false,true);
			evt_before.set_target(this.stage);
			this.stage.dispatchEvent(evt_before);
			if(evt_before.nmeGetIsCancelled()) {
				return false;
			}
			var evt_after = new nme.events.Event("close",false,false);
			evt_after.set_target(this.stage);
			this.stage.dispatchEvent(evt_after);
			this.stage.dispose();
			this.stage = null;
		}
		nme.app.Window.nme_window_close(this.nmeHandle);
		var handle = this.nmeHandle;
		if(handle != null) {
			nme.NativeResource.nme_native_resource_dispose(handle);
		}
		return true;
	}
	,toString: function() {
		return "Window(" + this.get_title() + ")";
	}
	,shouldRenderNow: function() {
		if(this.renderRequest == null) {
			return true;
		}
		return this.renderRequest();
	}
	,setBackground: function(inBackground) {
		if(inBackground == null) {
			nme.app.Window.nme_display_object_set_bg(this.nmeStageHandle,0);
		} else {
			nme.app.Window.nme_display_object_set_bg(this.nmeStageHandle,inBackground | -16777216);
		}
	}
	,onNewFrame: function() {
		if(this.shouldRenderNow()) {
			if(this.beginRenderImmediate != null) {
				this.beginRenderImmediate();
			}
			this.beginRender();
			this.appEventHandler.onRender(true);
			this.endRender();
			if(this.endRenderImmediate != null) {
				this.endRenderImmediate();
			}
		} else {
			this.enterFramePending = true;
		}
	}
	,onInvalidFrame: function() {
		if(this.shouldRenderNow()) {
			if(this.beginRenderImmediate != null) {
				this.beginRenderImmediate();
			}
			this.beginRender();
			this.appEventHandler.onRender(false);
			this.endRender();
			if(this.endRenderImmediate != null) {
				this.endRenderImmediate();
			}
		}
	}
	,nmeProcessWindowEvent: function(inEvent) {
		if(this.appEventHandler == null) {
			return;
		}
		var event = inEvent;
		try {
			inEvent.pollTime = haxe.Timer.stamp();
			switch(event.type) {
			case 1:
				this.appEventHandler.onKey(event,"keyDown");
				break;
			case 2:
				if(this.onText != null) {
					this.onText(event);
				}
				this.appEventHandler.onText(event,"textInput");
				break;
			case 3:
				this.appEventHandler.onKey(event,"keyUp");
				break;
			case 4:
				this.appEventHandler.onMouse(event,"mouseMove",true);
				break;
			case 5:
				this.appEventHandler.onMouse(event,"mouseDown",true);
				break;
			case 6:
				this.appEventHandler.onMouse(event,"click",true);
				break;
			case 7:
				this.appEventHandler.onMouse(event,"mouseUp",true);
				break;
			case 8:
				this.appEventHandler.onResize(event.x,event.y);
				if(this.shouldRenderNow()) {
					if(this.beginRenderImmediate != null) {
						this.beginRenderImmediate();
					}
					this.beginRender();
					this.appEventHandler.onRender(false);
					this.endRender();
					if(this.endRenderImmediate != null) {
						this.endRenderImmediate();
					}
				}
				break;
			case 9:
				nme.app.Application.pollClients(event.pollTime);
				break;
			case 10:
				if(nme.app.Application.onQuit != null) {
					nme.app.Application.onQuit();
				}
				break;
			case 11:
				this.appEventHandler.onDisplayObjectFocus(event);
				break;
			case 12:
				break;
			case 14:
				this.beginRender();
				var wasTimed = this.enterFramePending;
				this.enterFramePending = false;
				this.appEventHandler.onRender(wasTimed);
				this.endRender();
				break;
			case 15:
				this.appEventHandler.onTouch(event,"touchBegin");
				if((event.flags & 32768) > 0) {
					this.appEventHandler.onMouse(event,"mouseDown",false);
				}
				break;
			case 16:
				this.appEventHandler.onTouch(event,"touchMove");
				break;
			case 17:
				this.appEventHandler.onTouch(event,"touchEnd");
				if((event.flags & 32768) > 0) {
					this.appEventHandler.onMouse(event,"mouseUp",false);
				}
				break;
			case 18:
				this.appEventHandler.onTouch(event,"touchTap");
				break;
			case 19:
				this.appEventHandler.onChange(event);
				break;
			case 20:
				this.appEventHandler.onActive(true);
				break;
			case 21:
				this.appEventHandler.onActive(false);
				break;
			case 22:
				this.appEventHandler.onInputFocus(true);
				break;
			case 23:
				this.appEventHandler.onInputFocus(false);
				break;
			case 24:
				this.appEventHandler.onJoystick(event,"axisMove");
				break;
			case 25:
				this.appEventHandler.onJoystick(event,"ballMove");
				break;
			case 26:
				this.appEventHandler.onJoystick(event,"hatMove");
				break;
			case 27:
				this.appEventHandler.onJoystick(event,"buttonDown");
				break;
			case 28:
				this.appEventHandler.onJoystick(event,"buttonUp");
				break;
			case 29:
				this.appEventHandler.onJoystick(event,"deviceAdded");
				break;
			case 30:
				this.appEventHandler.onJoystick(event,"deviceRemoved");
				break;
			case 31:
				this.appEventHandler.onSysMessage(event);
				break;
			case 32:
				this.appEventHandler.onContextLost();
				break;
			case 34:
				this.appEventHandler.onScroll(event);
				break;
			case 35:
				this.appEventHandler.onAppLink(event);
				break;
			case 36:
				this.appEventHandler.onDpiChanged(event);
				break;
			case 37:case 38:case 39:
				break;
			case 40:
				this.appEventHandler.onWindowClose();
				break;
			case 41:
				this.appEventHandler.onWindowMoved(event.x,event.y);
				break;
			case 42:
				this.appEventHandler.onWindowEnter();
				break;
			case 43:
				this.appEventHandler.onWindowLeave();
				break;
			}
			var nextWake = nme.app.Application.getNextWake(event.pollTime);
			if(this.nextWakeHandler != null) {
				this.nextWakeHandler(nextWake);
			}
			nme.app.Window.nme_stage_set_next_wake(this.nmeStageHandle,nextWake);
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			var e = haxe.Exception.caught(_g).unwrap();
			var stack = haxe.CallStack.exceptionStack();
			event.pollTime = 0;
			this.appEventHandler.onUnhandledException(e,stack);
		}
	}
	,beginRender: function() {
		nme.app.Window.nme_stage_begin_render(this.nmeStageHandle,this.autoClear);
	}
	,endRender: function() {
		nme.app.Window.nme_stage_end_render(this.nmeStageHandle);
	}
	,get_align: function() {
		var i = nme.app.Window.nme_stage_get_align(this.nmeStageHandle);
		return Type.createEnumIndex(nme.display.StageAlign,i);
	}
	,set_align: function(inMode) {
		nme.app.Window.nme_stage_set_align(this.nmeStageHandle,inMode._hx_index);
		return inMode;
	}
	,get_displayState: function() {
		var i = nme.app.Window.nme_stage_get_display_state(this.nmeStageHandle);
		return Type.createEnumIndex(nme.display.StageDisplayState,i);
	}
	,set_displayState: function(inState) {
		nme.app.Window.nme_stage_set_display_state(this.nmeStageHandle,inState._hx_index);
		return inState;
	}
	,get_dpiScale: function() {
		return nme.app.Window.nme_stage_get_dpi_scale(this.nmeStageHandle);
	}
	,get_isOpenGL: function() {
		return nme.app.Window.nme_stage_is_opengl(this.nmeStageHandle);
	}
	,get_quality: function() {
		var i = nme.app.Window.nme_stage_get_quality(this.nmeStageHandle);
		return Type.createEnumIndex(nme.display.StageQuality,i);
	}
	,set_quality: function(inQuality) {
		nme.app.Window.nme_stage_set_quality(this.nmeStageHandle,inQuality._hx_index);
		return inQuality;
	}
	,get_scaleMode: function() {
		var i = nme.app.Window.nme_stage_get_scale_mode(this.nmeStageHandle);
		return Type.createEnumIndex(nme.display.StageScaleMode,i);
	}
	,set_scaleMode: function(inMode) {
		nme.app.Window.nme_stage_set_scale_mode(this.nmeStageHandle,inMode._hx_index);
		return inMode;
	}
	,get_x: function() {
		return nme.app.Window.nme_stage_get_window_x(this.nmeStageHandle);
	}
	,get_y: function() {
		return nme.app.Window.nme_stage_get_window_y(this.nmeStageHandle);
	}
	,get_height: function() {
		return nme.app.Window.nme_stage_get_stage_height(this.nmeStageHandle);
	}
	,get_width: function() {
		return nme.app.Window.nme_stage_get_stage_width(this.nmeStageHandle);
	}
	,resize: function(width,height) {
		nme.app.Window.nme_stage_resize_window(this.nmeStageHandle,width,height);
	}
	,setPosition: function(x,y) {
		nme.app.Window.nme_stage_set_window_position(this.nmeStageHandle,x,y);
	}
	,get_title: function() {
		return nme.app.Window.nme_stage_get_title(this.nmeStageHandle);
	}
	,set_title: function(inTitle) {
		nme.app.Window.nme_stage_set_title(this.nmeStageHandle,inTitle);
		return inTitle;
	}
	,__class__: nme.app.Window
	,__properties__: {get_width:"get_width",get_height:"get_height",get_y:"get_y",get_x:"get_x",set_title:"set_title",get_title:"get_title",get_globalMouseState:"get_globalMouseState",set_scaleMode:"set_scaleMode",get_scaleMode:"get_scaleMode",set_quality:"set_quality",get_quality:"get_quality",get_isOpenGL:"get_isOpenGL",get_dpiScale:"get_dpiScale",set_displayState:"set_displayState",get_displayState:"get_displayState",set_align:"set_align",get_align:"get_align"}
};
nme.desktop = {};
nme.desktop.Clipboard = function() {
	this._systemClipboard = false;
	this._text = null;
	this._richText = null;
	this._htmlText = null;
};
$hxClasses["nme.desktop.Clipboard"] = nme.desktop.Clipboard;
nme.desktop.Clipboard.__name__ = "nme.desktop.Clipboard";
nme.desktop.Clipboard.__properties__ = {get_generalClipboard:"get_generalClipboard"};
nme.desktop.Clipboard.generalClipboard = null;
nme.desktop.Clipboard.get_generalClipboard = function() {
	if(nme.desktop.Clipboard._generalClipboard == null) {
		nme.desktop.Clipboard._generalClipboard = new nme.desktop.Clipboard();
		nme.desktop.Clipboard._generalClipboard._systemClipboard = true;
	}
	return nme.desktop.Clipboard._generalClipboard;
};
nme.desktop.Clipboard.prototype = {
	formats: null
	,_htmlText: null
	,_richText: null
	,_text: null
	,_systemClipboard: null
	,get_formats: function() {
		return [nme.desktop.ClipboardFormats.HTML_FORMAT,nme.desktop.ClipboardFormats.RICH_TEXT_FORMAT,nme.desktop.ClipboardFormats.TEXT_FORMAT];
	}
	,clear: function() {
		if(!this._systemClipboard) {
			this._htmlText = null;
			this._richText = null;
			this._text = null;
		} else {
			nme.desktop.Clipboard.nme_desktop_clipboard_set_clipboard_text(null);
		}
	}
	,clearData: function(format) {
		if(!this._systemClipboard) {
			switch(format._hx_index) {
			case 5:
				this._htmlText = null;
				break;
			case 7:
				this._richText = null;
				break;
			case 9:
				this._text = null;
				break;
			default:
			}
		} else {
			switch(format._hx_index) {
			case 5:case 7:case 9:
				nme.desktop.Clipboard.nme_desktop_clipboard_set_clipboard_text(null);
				break;
			default:
			}
		}
	}
	,getData: function(format,transferMode) {
		if(transferMode == null) {
			transferMode = nme.desktop.ClipboardTransferMode.ORIGINAL_PREFERRED;
		}
		if(!this._systemClipboard) {
			switch(format._hx_index) {
			case 5:
				return this._htmlText;
			case 7:
				return this._richText;
			case 9:
				return this._text;
			default:
				return null;
			}
		} else {
			switch(format._hx_index) {
			case 5:case 7:case 9:
				return nme.desktop.Clipboard.nme_desktop_clipboard_get_clipboard_text();
			default:
				return null;
			}
		}
	}
	,hasFormat: function(format) {
		if(!this._systemClipboard) {
			switch(format._hx_index) {
			case 5:
				return this._htmlText != null;
			case 7:
				return this._richText != null;
			case 9:
				return this._text != null;
			default:
				return false;
			}
		} else {
			switch(format._hx_index) {
			case 5:case 7:case 9:
				return nme.desktop.Clipboard.nme_desktop_clipboard_has_clipboard_text();
			default:
				return false;
			}
		}
	}
	,setData: function(format,data,serializable) {
		if(serializable == null) {
			serializable = true;
		}
		if(!this._systemClipboard) {
			switch(format._hx_index) {
			case 5:
				this._htmlText = data;
				return true;
			case 7:
				this._richText = data;
				return true;
			case 9:
				this._text = data;
				return true;
			default:
				return false;
			}
		} else {
			switch(format._hx_index) {
			case 5:case 7:case 9:
				return nme.desktop.Clipboard.nme_desktop_clipboard_set_clipboard_text(data);
			default:
				return false;
			}
		}
	}
	,setDataHandler: function(format,handler,serializable) {
		if(serializable == null) {
			serializable = true;
		}
		throw haxe.Exception.thrown("Clipboard.setDataHandler not implemented");
	}
	,__class__: nme.desktop.Clipboard
	,__properties__: {get_formats:"get_formats"}
};
nme.desktop.ClipboardFormats = $hxEnums["nme.desktop.ClipboardFormats"] = { __ename__:"nme.desktop.ClipboardFormats",__constructs__:null
	,AIR_PREFIX: {_hx_name:"AIR_PREFIX",_hx_index:0,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,BITMAP_FORMAT: {_hx_name:"BITMAP_FORMAT",_hx_index:1,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,FILE_LIST_FORMAT: {_hx_name:"FILE_LIST_FORMAT",_hx_index:2,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,FILE_PROMISE_LIST_FORMAT: {_hx_name:"FILE_PROMISE_LIST_FORMAT",_hx_index:3,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,FLASH_PREFIX: {_hx_name:"FLASH_PREFIX",_hx_index:4,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,HTML_FORMAT: {_hx_name:"HTML_FORMAT",_hx_index:5,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,REFERENCE_PREFIX: {_hx_name:"REFERENCE_PREFIX",_hx_index:6,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,RICH_TEXT_FORMAT: {_hx_name:"RICH_TEXT_FORMAT",_hx_index:7,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,SERIALIZATION_PREFIX: {_hx_name:"SERIALIZATION_PREFIX",_hx_index:8,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,TEXT_FORMAT: {_hx_name:"TEXT_FORMAT",_hx_index:9,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
	,URL_FORMAT: {_hx_name:"URL_FORMAT",_hx_index:10,__enum__:"nme.desktop.ClipboardFormats",toString:$estr}
};
nme.desktop.ClipboardFormats.__constructs__ = [nme.desktop.ClipboardFormats.AIR_PREFIX,nme.desktop.ClipboardFormats.BITMAP_FORMAT,nme.desktop.ClipboardFormats.FILE_LIST_FORMAT,nme.desktop.ClipboardFormats.FILE_PROMISE_LIST_FORMAT,nme.desktop.ClipboardFormats.FLASH_PREFIX,nme.desktop.ClipboardFormats.HTML_FORMAT,nme.desktop.ClipboardFormats.REFERENCE_PREFIX,nme.desktop.ClipboardFormats.RICH_TEXT_FORMAT,nme.desktop.ClipboardFormats.SERIALIZATION_PREFIX,nme.desktop.ClipboardFormats.TEXT_FORMAT,nme.desktop.ClipboardFormats.URL_FORMAT];
nme.desktop.ClipboardFormats.__empty_constructs__ = [nme.desktop.ClipboardFormats.AIR_PREFIX,nme.desktop.ClipboardFormats.BITMAP_FORMAT,nme.desktop.ClipboardFormats.FILE_LIST_FORMAT,nme.desktop.ClipboardFormats.FILE_PROMISE_LIST_FORMAT,nme.desktop.ClipboardFormats.FLASH_PREFIX,nme.desktop.ClipboardFormats.HTML_FORMAT,nme.desktop.ClipboardFormats.REFERENCE_PREFIX,nme.desktop.ClipboardFormats.RICH_TEXT_FORMAT,nme.desktop.ClipboardFormats.SERIALIZATION_PREFIX,nme.desktop.ClipboardFormats.TEXT_FORMAT,nme.desktop.ClipboardFormats.URL_FORMAT];
nme.desktop.ClipboardTransferMode = $hxEnums["nme.desktop.ClipboardTransferMode"] = { __ename__:"nme.desktop.ClipboardTransferMode",__constructs__:null
	,CLONE_ONLY: {_hx_name:"CLONE_ONLY",_hx_index:0,__enum__:"nme.desktop.ClipboardTransferMode",toString:$estr}
	,CLONE_PREFERRED: {_hx_name:"CLONE_PREFERRED",_hx_index:1,__enum__:"nme.desktop.ClipboardTransferMode",toString:$estr}
	,ORIGINAL_ONLY: {_hx_name:"ORIGINAL_ONLY",_hx_index:2,__enum__:"nme.desktop.ClipboardTransferMode",toString:$estr}
	,ORIGINAL_PREFERRED: {_hx_name:"ORIGINAL_PREFERRED",_hx_index:3,__enum__:"nme.desktop.ClipboardTransferMode",toString:$estr}
};
nme.desktop.ClipboardTransferMode.__constructs__ = [nme.desktop.ClipboardTransferMode.CLONE_ONLY,nme.desktop.ClipboardTransferMode.CLONE_PREFERRED,nme.desktop.ClipboardTransferMode.ORIGINAL_ONLY,nme.desktop.ClipboardTransferMode.ORIGINAL_PREFERRED];
nme.desktop.ClipboardTransferMode.__empty_constructs__ = [nme.desktop.ClipboardTransferMode.CLONE_ONLY,nme.desktop.ClipboardTransferMode.CLONE_PREFERRED,nme.desktop.ClipboardTransferMode.ORIGINAL_ONLY,nme.desktop.ClipboardTransferMode.ORIGINAL_PREFERRED];
nme.events = {};
nme.events.IEventDispatcher = function() { };
$hxClasses["nme.events.IEventDispatcher"] = nme.events.IEventDispatcher;
nme.events.IEventDispatcher.__name__ = "nme.events.IEventDispatcher";
nme.events.IEventDispatcher.__isInterface__ = true;
nme.events.IEventDispatcher.prototype = {
	addEventListener: null
	,dispatchEvent: null
	,hasEventListener: null
	,removeEventListener: null
	,willTrigger: null
	,__class__: nme.events.IEventDispatcher
};
nme.events.EventDispatcher = function(target) {
	this.nmeTarget = target == null ? this : target;
	this.nmeEventMap = null;
};
$hxClasses["nme.events.EventDispatcher"] = nme.events.EventDispatcher;
nme.events.EventDispatcher.__name__ = "nme.events.EventDispatcher";
nme.events.EventDispatcher.__interfaces__ = [nme.events.IEventDispatcher];
nme.events.EventDispatcher.sortEvents = function(a,b) {
	if(null == a && null == b) {
		return 0;
	}
	if(null == a) {
		return -1;
	}
	if(null == b) {
		return 1;
	}
	var al = a.mListner.get();
	var bl = b.mListner.get();
	if(null == al || null == bl) {
		return 0;
	}
	if(a.mPriority == b.mPriority) {
		if(a.mID == b.mID) {
			return 0;
		} else if(a.mID > b.mID) {
			return 1;
		} else {
			return -1;
		}
	} else if(a.mPriority < b.mPriority) {
		return 1;
	} else {
		return -1;
	}
};
nme.events.EventDispatcher.prototype = {
	nmeEventMap: null
	,nmeTarget: null
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) {
			useWeakReference = false;
		}
		if(priority == null) {
			priority = 0;
		}
		if(useCapture == null) {
			useCapture = false;
		}
		if(this.nmeEventMap == null) {
			this.nmeEventMap = new haxe.ds.StringMap();
		}
		var list = this.nmeEventMap.h[type];
		if(list == null) {
			list = [];
			this.nmeEventMap.h[type] = list;
		}
		var found = false;
		var liNew = new nme.events.Listener(listener,useCapture,priority,useWeakReference);
		var _g = 0;
		var _g1 = list.length;
		while(_g < _g1) {
			var i = _g++;
			if(list[i] != null) {
				var li = list[i];
				if(li.Is(listener,useCapture)) {
					list[i] = liNew;
					found = true;
					break;
				}
			}
		}
		if(!found) {
			list.push(liNew);
		}
		if(priority != 0) {
			list.sort(nme.events.EventDispatcher.sortEvents);
		}
	}
	,mightRespondTo: function(type) {
		if(this.nmeEventMap != null) {
			return Object.prototype.hasOwnProperty.call(this.nmeEventMap.h,type);
		} else {
			return false;
		}
	}
	,DispatchCompleteEvent: function() {
		var evt = new nme.events.Event("complete");
		this.dispatchEvent(evt);
	}
	,dispatchEvent: function(event) {
		if(this.nmeEventMap == null) {
			return false;
		}
		if(event.get_target() == null) {
			event.set_target(this.nmeTarget);
		}
		if(event.get_currentTarget() == null) {
			event.set_currentTarget(this.nmeTarget);
		}
		var _this = this.nmeEventMap;
		var key = event.get_type();
		var list = _this.h[key];
		var capture = event.get_eventPhase() == nme.events.EventPhase.CAPTURING_PHASE;
		if(list != null) {
			var idx = 0;
			var listLength = list.length;
			while(idx < listLength) {
				var listener = list[idx];
				var isValid = listener != null && listener.mListner.get() != null;
				if(!isValid) {
					list.splice(idx,1);
					listLength = list.length;
				} else {
					if(listener.mUseCapture == capture) {
						listener.dispatchEvent(event);
						if(event.nmeGetIsCancelledNow()) {
							return true;
						}
					}
					++idx;
				}
			}
			return true;
		}
		return false;
	}
	,DispatchIOErrorEvent: function() {
		var evt = new nme.events.IOErrorEvent("ioError");
		this.dispatchEvent(evt);
	}
	,hasEventListener: function(type) {
		if(this.nmeEventMap == null) {
			return false;
		}
		var h = this.nmeEventMap.h[type];
		if(h != null) {
			var _g = 0;
			while(_g < h.length) {
				var item = h[_g];
				++_g;
				if(item != null) {
					return true;
				}
			}
		}
		return false;
	}
	,removeEventListener: function(type,listener,capture) {
		if(capture == null) {
			capture = false;
		}
		if(this.nmeEventMap == null) {
			return;
		}
		if(!Object.prototype.hasOwnProperty.call(this.nmeEventMap.h,type)) {
			return;
		}
		var list = this.nmeEventMap.h[type];
		var _g = 0;
		var _g1 = list.length;
		while(_g < _g1) {
			var i = _g++;
			if(list[i] != null) {
				var li = list[i];
				if(li.Is(listener,capture)) {
					list[i] = null;
					return;
				}
			}
		}
	}
	,toString: function() {
		var c = js.Boot.getClass(this);
		return "[object " + c.__name__ + "]";
	}
	,willTrigger: function(type) {
		if(this.nmeEventMap == null) {
			return false;
		}
		return Object.prototype.hasOwnProperty.call(this.nmeEventMap.h,type);
	}
	,__class__: nme.events.EventDispatcher
};
nme.display = {};
nme.display.IBitmapDrawable = function() { };
$hxClasses["nme.display.IBitmapDrawable"] = nme.display.IBitmapDrawable;
nme.display.IBitmapDrawable.__name__ = "nme.display.IBitmapDrawable";
nme.display.IBitmapDrawable.__isInterface__ = true;
nme.display.IBitmapDrawable.prototype = {
	nmeDrawToSurface: null
	,__class__: nme.display.IBitmapDrawable
};
nme.display.DisplayObject = function(inHandle,inType) {
	this.nmeHandle = inHandle;
	if(this.nmeParent != null) {
		nme.display.DisplayObject.nme_doc_add_child(this.nmeParent.nmeHandle,this.nmeHandle);
	}
	this.nmeID = nme.display.DisplayObject.nme_display_object_get_id(this.nmeHandle);
	nme.events.EventDispatcher.call(this,this);
	if(inType != null) {
		this.set_name(inType + " " + this.nmeID);
	}
};
$hxClasses["nme.display.DisplayObject"] = nme.display.DisplayObject;
nme.display.DisplayObject.__name__ = "nme.display.DisplayObject";
nme.display.DisplayObject.__interfaces__ = [nme.display.IBitmapDrawable];
nme.display.DisplayObject.decodeDisplay = function(inBytes,inFlags) {
	if(inFlags == null) {
		inFlags = 0;
	}
	var handle = nme.display.DisplayObject.nme_display_object_decode(inBytes,inFlags);
	return new nme.display.DisplayObject(handle,null);
};
nme.display.DisplayObject.__super__ = nme.events.EventDispatcher;
nme.display.DisplayObject.prototype = $extend(nme.events.EventDispatcher.prototype,{
	graphics: null
	,loaderInfo: null
	,mask: null
	,mouseX: null
	,mouseY: null
	,parent: null
	,stage: null
	,nmeHandle: null
	,nmeFilters: null
	,nmeGraphicsCache: null
	,nmeID: null
	,nmeParent: null
	,nmeScale9Grid: null
	,nmeScrollRect: null
	,dispose: function() {
		if(this.nmeHandle != null) {
			nme.NativeResource.nme_native_resource_dispose(this.nmeHandle);
			this.nmeHandle = null;
		}
	}
	,dispatchEvent: function(event) {
		var result = this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) {
			return true;
		}
		if(event.get_bubbles() && this.get_parent() != null) {
			this.get_parent().dispatchEvent(event);
		}
		return result;
	}
	,get_hitEnabled: function() {
		return nme.display.DisplayObject.nme_display_object_get_hit_enabled(this.nmeHandle);
	}
	,set_hitEnabled: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_hit_enabled(this.nmeHandle,inVal);
		return inVal;
	}
	,getBounds: function(targetCoordinateSpace) {
		var result = new nme.geom.Rectangle();
		nme.display.DisplayObject.nme_display_object_get_bounds(this.nmeHandle,targetCoordinateSpace.nmeHandle,result,true);
		return result;
	}
	,getRect: function(targetCoordinateSpace) {
		var result = new nme.geom.Rectangle();
		nme.display.DisplayObject.nme_display_object_get_bounds(this.nmeHandle,targetCoordinateSpace.nmeHandle,result,false);
		return result;
	}
	,globalToLocal: function(inGlobal) {
		var result = inGlobal.clone();
		nme.display.DisplayObject.nme_display_object_global_to_local(this.nmeHandle,result);
		return result;
	}
	,hitTestObject: function(object) {
		if(object != null && object.get_parent() != null && this.get_parent() != null) {
			var currentMatrix = this.get_transform().get_concatenatedMatrix();
			var targetMatrix = object.get_transform().get_concatenatedMatrix();
			var xPoint = new nme.geom.Point(1,0);
			var yPoint = new nme.geom.Point(0,1);
			var currentWidth = this.get_width() * currentMatrix.deltaTransformPoint(xPoint).get_length();
			var currentHeight = this.get_height() * currentMatrix.deltaTransformPoint(yPoint).get_length();
			var targetWidth = object.get_width() * targetMatrix.deltaTransformPoint(xPoint).get_length();
			var targetHeight = object.get_height() * targetMatrix.deltaTransformPoint(yPoint).get_length();
			var currentRect = new nme.geom.Rectangle(currentMatrix.tx,currentMatrix.ty,currentWidth,currentHeight);
			var targetRect = new nme.geom.Rectangle(targetMatrix.tx,targetMatrix.ty,targetWidth,targetHeight);
			return currentRect.intersects(targetRect);
		}
		return false;
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) {
			shapeFlag = false;
		}
		return nme.display.DisplayObject.nme_display_object_hit_test_point(this.nmeHandle,x,y,shapeFlag,true);
	}
	,localToGlobal: function(inLocal) {
		var result = inLocal.clone();
		nme.display.DisplayObject.nme_display_object_local_to_global(this.nmeHandle,result);
		return result;
	}
	,encodeDisplay: function(inFlags) {
		if(inFlags == null) {
			inFlags = 0;
		}
		return nme.display.DisplayObject.nme_display_object_encode(this.nmeHandle,inFlags);
	}
	,nmeAsInteractiveObject: function() {
		return null;
	}
	,nmeBroadcast: function(inEvt) {
		this.nmeDispatchEvent(inEvt);
	}
	,nmeDispatchEvent: function(inEvt) {
		if(inEvt.get_target() == null) {
			inEvt.set_target(this);
		}
		inEvt.set_currentTarget(this);
		return nme.events.EventDispatcher.prototype.dispatchEvent.call(this,inEvt);
	}
	,nmeDrawToSurface: function(inSurface,matrix,colorTransform,blendMode,clipRect,smoothing) {
		nme.display.DisplayObject.nme_display_object_draw_to_surface(this.nmeHandle,inSurface,matrix,colorTransform,0,clipRect);
	}
	,nmeFindByID: function(inID) {
		if(this.nmeID == inID) {
			return this;
		}
		return null;
	}
	,nmeFireEvent: function(inEvt) {
		var stack = [];
		if(this.nmeParent != null) {
			this.nmeParent.nmeGetInteractiveObjectStack(stack);
		}
		var l = stack.length;
		if(l > 0) {
			inEvt.nmeSetPhase(nme.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				inEvt.set_currentTarget(obj);
				obj.nmeDispatchEvent(inEvt);
				if(inEvt.nmeGetIsCancelled()) {
					return;
				}
			}
		}
		inEvt.nmeSetPhase(nme.events.EventPhase.AT_TARGET);
		inEvt.set_currentTarget(this);
		this.nmeDispatchEvent(inEvt);
		if(inEvt.nmeGetIsCancelled()) {
			return;
		}
		if(inEvt.get_bubbles()) {
			inEvt.nmeSetPhase(nme.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				inEvt.set_currentTarget(obj);
				obj.nmeDispatchEvent(inEvt);
				if(inEvt.nmeGetIsCancelled()) {
					return;
				}
			}
		}
	}
	,nmeGetColorTransform: function() {
		var trans = new nme.geom.ColorTransform();
		nme.display.DisplayObject.nme_display_object_get_color_transform(this.nmeHandle,trans,false);
		return trans;
	}
	,nmeGetConcatenatedColorTransform: function() {
		var trans = new nme.geom.ColorTransform();
		nme.display.DisplayObject.nme_display_object_get_color_transform(this.nmeHandle,trans,true);
		return trans;
	}
	,nmeGetConcatenatedMatrix: function() {
		var mtx = new nme.geom.Matrix();
		nme.display.DisplayObject.nme_display_object_get_matrix(this.nmeHandle,mtx,true);
		return mtx;
	}
	,fillMatrix: function(outMatrix,concatenated) {
		nme.display.DisplayObject.nme_display_object_get_matrix(this.nmeHandle,outMatrix,concatenated);
	}
	,nmeGetInteractiveObjectStack: function(outStack) {
		var io = this.nmeAsInteractiveObject();
		if(io != null) {
			outStack.push(io);
		}
		if(this.nmeParent != null) {
			this.nmeParent.nmeGetInteractiveObjectStack(outStack);
		}
	}
	,nmeGetMatrix: function() {
		var mtx = new nme.geom.Matrix();
		nme.display.DisplayObject.nme_display_object_get_matrix(this.nmeHandle,mtx,false);
		return mtx;
	}
	,nmeGetObjectsUnderPoint: function(point,result) {
		if(nme.display.DisplayObject.nme_display_object_hit_test_point(this.nmeHandle,point.x,point.y,true,false)) {
			result.push(this);
		}
	}
	,nmeGetPixelBounds: function() {
		var rect = new nme.geom.Rectangle();
		nme.display.DisplayObject.nme_display_object_get_pixel_bounds(this.nmeHandle,rect);
		return rect;
	}
	,nmeOnAdded: function(inObj,inIsOnStage) {
		if(inObj == this) {
			var evt = new nme.events.Event("added",true,false);
			evt.set_target(inObj);
			this.dispatchEvent(evt);
		}
		if(inIsOnStage) {
			var evt = new nme.events.Event("addedToStage",false,false);
			evt.set_target(inObj);
			this.dispatchEvent(evt);
		}
	}
	,nmeOnRemoved: function(inObj,inWasOnStage) {
		if(inObj == this) {
			var evt = new nme.events.Event("removed",true,false);
			evt.set_target(inObj);
			this.dispatchEvent(evt);
		}
		if(inWasOnStage) {
			var evt = new nme.events.Event("removedFromStage",false,false);
			evt.set_target(inObj);
			this.dispatchEvent(evt);
		}
	}
	,nmeSetColorTransform: function(inTrans) {
		nme.display.DisplayObject.nme_display_object_set_color_transform(this.nmeHandle,inTrans);
	}
	,nmeSetMatrix: function(inMatrix) {
		nme.display.DisplayObject.nme_display_object_set_matrix(this.nmeHandle,inMatrix);
	}
	,nmeSetParent: function(inParent) {
		if(inParent == this.nmeParent) {
			return inParent;
		}
		if(this.nmeParent != null) {
			this.nmeParent.nmeRemoveChildFromArray(this);
		}
		if(this.nmeHandle == null) {
			this.nmeParent = inParent;
		} else if(this.nmeParent == null && inParent != null) {
			this.nmeParent = inParent;
			this.nmeOnAdded(this,this.get_stage() != null);
		} else if(this.nmeParent != null && inParent == null) {
			var was_on_stage = this.get_stage() != null;
			this.nmeParent = inParent;
			this.nmeOnRemoved(this,was_on_stage);
		} else {
			this.nmeParent = inParent;
		}
		return inParent;
	}
	,toString: function() {
		return this.get_name();
	}
	,get_alpha: function() {
		return nme.display.DisplayObject.nme_display_object_get_alpha(this.nmeHandle);
	}
	,set_alpha: function(inAlpha) {
		nme.display.DisplayObject.nme_display_object_set_alpha(this.nmeHandle,inAlpha);
		return inAlpha;
	}
	,get_opaqueBackground: function() {
		var i = nme.display.DisplayObject.nme_display_object_get_bg(this.nmeHandle);
		if((i & 16777216) == 0) {
			return null;
		}
		return i & 16777215;
	}
	,set_opaqueBackground: function(inBG) {
		if(inBG == null) {
			nme.display.DisplayObject.nme_display_object_set_bg(this.nmeHandle,0);
		} else {
			nme.display.DisplayObject.nme_display_object_set_bg(this.nmeHandle,inBG);
		}
		return inBG;
	}
	,get_blendMode: function() {
		var i = nme.display.DisplayObject.nme_display_object_get_blend_mode(this.nmeHandle);
		return Type.createEnumIndex(nme.display.BlendMode,i);
	}
	,set_blendMode: function(inMode) {
		nme.display.DisplayObject.nme_display_object_set_blend_mode(this.nmeHandle,inMode._hx_index);
		return inMode;
	}
	,get_cacheAsBitmap: function() {
		return nme.display.DisplayObject.nme_display_object_get_cache_as_bitmap(this.nmeHandle);
	}
	,set_cacheAsBitmap: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_cache_as_bitmap(this.nmeHandle,inVal);
		return inVal;
	}
	,get_pedanticBitmapCaching: function() {
		return nme.display.DisplayObject.nme_display_object_get_pedantic_bitmap_caching(this.nmeHandle);
	}
	,set_pedanticBitmapCaching: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_pedantic_bitmap_caching(this.nmeHandle,inVal);
		return inVal;
	}
	,get_pixelSnapping: function() {
		var val = nme.display.DisplayObject.nme_display_object_get_pixel_snapping(this.nmeHandle);
		return Type.createEnumIndex(nme.display.PixelSnapping,val);
	}
	,set_pixelSnapping: function(inVal) {
		if(inVal == null) {
			nme.display.DisplayObject.nme_display_object_set_pixel_snapping(this.nmeHandle,0);
		} else {
			nme.display.DisplayObject.nme_display_object_set_pixel_snapping(this.nmeHandle,inVal._hx_index);
		}
		return inVal;
	}
	,get_filters: function() {
		if(this.nmeFilters == null) {
			return [];
		}
		var result = [];
		var _g = 0;
		var _g1 = this.nmeFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,set_filters: function(inFilters) {
		if(inFilters == null) {
			this.nmeFilters = null;
		} else {
			this.nmeFilters = [];
			var _g = 0;
			while(_g < inFilters.length) {
				var filter = inFilters[_g];
				++_g;
				this.nmeFilters.push(filter.clone());
			}
		}
		nme.display.DisplayObject.nme_display_object_set_filters(this.nmeHandle,this.nmeFilters);
		return inFilters;
	}
	,get_graphics: function() {
		if(this.nmeGraphicsCache == null) {
			this.nmeGraphicsCache = new nme.display.Graphics(nme.display.DisplayObject.nme_display_object_get_graphics(this.nmeHandle));
		}
		return this.nmeGraphicsCache;
	}
	,get_height: function() {
		return nme.display.DisplayObject.nme_display_object_get_height(this.nmeHandle);
	}
	,set_height: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_height(this.nmeHandle,inVal);
		return inVal;
	}
	,set_mask: function(inObject) {
		this.mask = inObject;
		nme.display.DisplayObject.nme_display_object_set_mask(this.nmeHandle,inObject == null ? null : inObject.nmeHandle);
		return inObject;
	}
	,get_mouseX: function() {
		return nme.display.DisplayObject.nme_display_object_get_mouse_x(this.nmeHandle);
	}
	,get_mouseY: function() {
		return nme.display.DisplayObject.nme_display_object_get_mouse_y(this.nmeHandle);
	}
	,get_name: function() {
		return nme.display.DisplayObject.nme_display_object_get_name(this.nmeHandle);
	}
	,set_name: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_name(this.nmeHandle,inVal);
		return inVal;
	}
	,get_parent: function() {
		return this.nmeParent;
	}
	,get_rotation: function() {
		return nme.display.DisplayObject.nme_display_object_get_rotation(this.nmeHandle);
	}
	,set_rotation: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_rotation(this.nmeHandle,inVal);
		return inVal;
	}
	,get_scale9Grid: function() {
		if(this.nmeScale9Grid == null) {
			return null;
		} else {
			return this.nmeScale9Grid.clone();
		}
	}
	,set_scale9Grid: function(inRect) {
		this.nmeScale9Grid = inRect == null ? null : inRect.clone();
		nme.display.DisplayObject.nme_display_object_set_scale9_grid(this.nmeHandle,this.nmeScale9Grid);
		return inRect;
	}
	,get_scaleX: function() {
		return nme.display.DisplayObject.nme_display_object_get_scale_x(this.nmeHandle);
	}
	,set_scaleX: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_scale_x(this.nmeHandle,inVal);
		return inVal;
	}
	,get_scaleY: function() {
		return nme.display.DisplayObject.nme_display_object_get_scale_y(this.nmeHandle);
	}
	,set_scaleY: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_scale_y(this.nmeHandle,inVal);
		return inVal;
	}
	,get_scrollRect: function() {
		if(this.nmeScrollRect == null) {
			return null;
		} else {
			return this.nmeScrollRect.clone();
		}
	}
	,set_scrollRect: function(inRect) {
		this.nmeScrollRect = inRect == null ? null : inRect.clone();
		nme.display.DisplayObject.nme_display_object_set_scroll_rect(this.nmeHandle,this.nmeScrollRect);
		return inRect;
	}
	,get_stage: function() {
		if(this.nmeParent != null) {
			return this.nmeParent.get_stage();
		}
		return null;
	}
	,get_transform: function() {
		return new nme.geom.Transform(this);
	}
	,set_transform: function(inTransform) {
		this.nmeSetMatrix(inTransform.get_matrix());
		this.nmeSetColorTransform(inTransform.get_colorTransform());
		return inTransform;
	}
	,get_visible: function() {
		return nme.display.DisplayObject.nme_display_object_get_visible(this.nmeHandle);
	}
	,set_visible: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_visible(this.nmeHandle,inVal);
		return inVal;
	}
	,get_width: function() {
		return nme.display.DisplayObject.nme_display_object_get_width(this.nmeHandle);
	}
	,set_width: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_width(this.nmeHandle,inVal);
		return inVal;
	}
	,get_x: function() {
		return nme.display.DisplayObject.nme_display_object_get_x(this.nmeHandle);
	}
	,set_x: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_x(this.nmeHandle,inVal);
		return inVal;
	}
	,get_y: function() {
		return nme.display.DisplayObject.nme_display_object_get_y(this.nmeHandle);
	}
	,set_y: function(inVal) {
		nme.display.DisplayObject.nme_display_object_set_y(this.nmeHandle,inVal);
		return inVal;
	}
	,__class__: nme.display.DisplayObject
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_width:"set_width",get_width:"get_width",set_visible:"set_visible",get_visible:"get_visible",set_transform:"set_transform",get_transform:"get_transform",get_stage:"get_stage",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scale9Grid:"set_scale9Grid",get_scale9Grid:"get_scale9Grid",set_rotation:"set_rotation",get_rotation:"get_rotation",get_parent:"get_parent",set_opaqueBackground:"set_opaqueBackground",get_opaqueBackground:"get_opaqueBackground",set_name:"set_name",get_name:"get_name",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",set_mask:"set_mask",set_hitEnabled:"set_hitEnabled",get_hitEnabled:"get_hitEnabled",set_height:"set_height",get_height:"get_height",get_graphics:"get_graphics",set_filters:"set_filters",get_filters:"get_filters",set_pixelSnapping:"set_pixelSnapping",get_pixelSnapping:"get_pixelSnapping",set_pedanticBitmapCaching:"set_pedanticBitmapCaching",get_pedanticBitmapCaching:"get_pedanticBitmapCaching",set_cacheAsBitmap:"set_cacheAsBitmap",get_cacheAsBitmap:"get_cacheAsBitmap",set_blendMode:"set_blendMode",get_blendMode:"get_blendMode",set_alpha:"set_alpha",get_alpha:"get_alpha"}
});
nme.display.Bitmap = function(bitmapData,pixelSnapping,smoothing) {
	if(smoothing == null) {
		smoothing = false;
	}
	nme.display.DisplayObject.call(this,nme.display.DisplayObject.nme_create_display_object(),"Bitmap");
	this.set_pixelSnapping(pixelSnapping == null ? nme.display.PixelSnapping.AUTO : pixelSnapping);
	this.set_smoothing(smoothing);
	if(bitmapData != null) {
		this.set_bitmapData(bitmapData);
	} else if(this.bitmapData != null) {
		this.nmeRebuild();
	}
};
$hxClasses["nme.display.Bitmap"] = nme.display.Bitmap;
nme.display.Bitmap.__name__ = "nme.display.Bitmap";
nme.display.Bitmap.__super__ = nme.display.DisplayObject;
nme.display.Bitmap.prototype = $extend(nme.display.DisplayObject.prototype,{
	bitmapData: null
	,smoothing: null
	,mGraphics: null
	,nmeRebuild: function() {
		if(this.nmeHandle != null) {
			var gfx = this.get_graphics();
			gfx.clear();
			if(this.bitmapData != null) {
				gfx.beginBitmapFill(this.bitmapData,null,false,this.smoothing);
				gfx.drawRect(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				gfx.endFill();
			}
		}
	}
	,set_bitmapData: function(inBitmapData) {
		this.bitmapData = inBitmapData;
		this.nmeRebuild();
		return inBitmapData;
	}
	,set_smoothing: function(inSmooth) {
		this.smoothing = inSmooth;
		this.nmeRebuild();
		return inSmooth;
	}
	,__class__: nme.display.Bitmap
	,__properties__: $extend(nme.display.DisplayObject.prototype.__properties__,{set_smoothing:"set_smoothing",set_bitmapData:"set_bitmapData"})
});
nme.display.BitmapData = function(inWidth,inHeight,inTransparent,inFillARGB,inPixelFormat) {
	if(inPixelFormat == null) {
		inPixelFormat = -1;
	}
	if(inTransparent == null) {
		inTransparent = true;
	}
	this.nmeHandle = null;
	var pixelFormat = inPixelFormat != -1 ? inPixelFormat : !inTransparent ? 0 : nme.display.BitmapData.defaultPremultiplied ? 2 : 1;
	if(inWidth > 0 && inHeight > 0 && pixelFormat != -1) {
		var rgb = inFillARGB == null ? 0 : inFillARGB;
		this.nmeHandle = nme.display.BitmapData.nme_bitmap_data_create(inWidth,inHeight,pixelFormat,rgb,inFillARGB != null);
	}
	if(this.nmeHandle == null) {
		if(inPixelFormat != -1 || !inTransparent) {
			this.setFlags(this.getFlags() | nme.display.BitmapData.FLAG_FIXED_FORMAT);
		}
		var className = js.Boot.getClass(this);
		if(Object.prototype.hasOwnProperty.call(className,"resourceName")) {
			var resoName = Reflect.field(className,"resourceName");
			var inBytes = nme.utils.ByteArray.fromBytes(nme.Assets.getResource(resoName));
			this.nmeHandle = nme.display.BitmapData.nme_bitmap_data_from_bytes(inBytes,null);
		}
	}
	if(this.nmeHandle != null && nme.display.BitmapData.defaultMipmaps) {
		this.set_mipmaps(true);
	}
};
$hxClasses["nme.display.BitmapData"] = nme.display.BitmapData;
nme.display.BitmapData.__name__ = "nme.display.BitmapData";
nme.display.BitmapData.__interfaces__ = [nme.display.IBitmapDrawable];
nme.display.BitmapData.createPremultiplied = function(width,height,inArgb) {
	if(inArgb == null) {
		inArgb = 0;
	}
	return new nme.display.BitmapData(width,height,true,inArgb,2);
};
nme.display.BitmapData.createGrey = function(width,height,inLuma) {
	return new nme.display.BitmapData(width,height,false,inLuma,4);
};
nme.display.BitmapData.createAlpha = function(width,height,inAlpha) {
	if(inAlpha == null) {
		inAlpha = 0;
	}
	return new nme.display.BitmapData(width,height,false,(inAlpha & 255) << 24,3);
};
nme.display.BitmapData.createUInt16 = function(width,height) {
	return new nme.display.BitmapData(width,height,null,10,0);
};
nme.display.BitmapData.createUInt32 = function(width,height) {
	return new nme.display.BitmapData(width,height,null,11,0);
};
nme.display.BitmapData.createColor = function(inRGB,inAlpha) {
	if(inAlpha == null) {
		inAlpha = 255;
	}
	return inRGB | inAlpha << 24;
};
nme.display.BitmapData.extractAlpha = function(v) {
	return v >>> 24;
};
nme.display.BitmapData.extractColor = function(v) {
	return v & 16777215;
};
nme.display.BitmapData.sameValue = function(a,b) {
	return a == b;
};
nme.display.BitmapData.flip_pixel4 = function(pix4) {
	return (pix4 & 255) << 24 | (pix4 >> 8 & 255) << 16 | (pix4 >> 16 & 255) << 8 | pix4 >> 24 & 255;
};
nme.display.BitmapData.ucompare = function(n1,n2) {
	var tmp1 = n1 >> 24 & 255;
	var tmp2 = n2 >> 24 & 255;
	if(tmp1 != tmp2) {
		if(tmp1 > tmp2) {
			return 1;
		} else {
			return -1;
		}
	} else {
		tmp1 = n1 >> 16 & 255;
		tmp2 = n2 >> 16 & 255;
		if(tmp1 != tmp2) {
			if(tmp1 > tmp2) {
				return 1;
			} else {
				return -1;
			}
		} else {
			tmp1 = n1 >> 8 & 255;
			tmp2 = n2 >> 8 & 255;
			if(tmp1 != tmp2) {
				if(tmp1 > tmp2) {
					return 1;
				} else {
					return -1;
				}
			} else {
				tmp1 = n1 & 255;
				tmp2 = n2 & 255;
				if(tmp1 != tmp2) {
					if(tmp1 > tmp2) {
						return 1;
					} else {
						return -1;
					}
				} else {
					return 0;
				}
			}
		}
	}
};
nme.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new nme.geom.Rectangle(0,0,bitmapData.get_width(),bitmapData.get_height()));
	var num = bitmapData.get_width() * bitmapData.get_height();
	var _g = 0;
	var _g1 = num;
	while(_g < _g1) {
		var i = _g++;
		var alpha = p[i * 4];
		var red = p[i * 4 + 1];
		var green = p[i * 4 + 2];
		var blue = p[i * 4 + 3];
		p[i * 4] = red;
		p[i * 4 + 1] = green;
		p[i * 4 + 2] = blue;
		p[i * 4 + 3] = alpha;
	}
	return p;
};
nme.display.BitmapData.load = function(inFilename,format) {
	if(format == null) {
		format = -1;
	}
	var result = new nme.display.BitmapData(0,0);
	result.nmeHandle = nme.display.BitmapData.nme_bitmap_data_load(inFilename,format);
	if(result.get_width() < 1 || result.get_height() < 1) {
		return null;
	}
	if(result.nmeHandle != null && nme.display.BitmapData.defaultMipmaps) {
		result.set_mipmaps(true);
	}
	return result;
};
nme.display.BitmapData.loadFromBytes = function(inBytes,inRawAlpha) {
	var result = new nme.display.BitmapData(0,0);
	result.nmeHandle = nme.display.BitmapData.nme_bitmap_data_from_bytes(inBytes,inRawAlpha);
	if(result.get_width() < 1 || result.get_height() < 1) {
		return null;
	}
	if(result.nmeHandle != null && nme.display.BitmapData.defaultMipmaps) {
		result.set_mipmaps(true);
	}
	return result;
};
nme.display.BitmapData.loadFromHaxeBytes = function(inBytes,inRawAlpha) {
	return nme.display.BitmapData.loadFromBytes(nme.utils.ByteArray.fromBytes(inBytes),inRawAlpha == null ? null : nme.utils.ByteArray.fromBytes(inRawAlpha));
};
nme.display.BitmapData.prototype = {
	height: null
	,rect: null
	,transparent: null
	,width: null
	,nmeHandle: null
	,data: null
	,clear: function(color) {
		nme.display.BitmapData.nme_bitmap_data_clear(this.nmeHandle,color);
	}
	,colorTransform: function(rect,colorTransform) {
		nme.display.BitmapData.nme_bitmap_data_color_transform(this.nmeHandle,rect,colorTransform);
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,inSourceChannel,inDestChannel) {
		nme.display.BitmapData.nme_bitmap_data_copy_channel(sourceBitmapData.nmeHandle,sourceRect,this.nmeHandle,destPoint,inSourceChannel,inDestChannel);
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) {
			mergeAlpha = false;
		}
		nme.display.BitmapData.nme_bitmap_data_copy(sourceBitmapData.nmeHandle,sourceRect,this.nmeHandle,destPoint,mergeAlpha);
	}
	,createHardwareSurface: function() {
		nme.display.BitmapData.nme_bitmap_data_create_hardware_surface(this.nmeHandle);
	}
	,destroyHardwareSurface: function() {
		nme.display.BitmapData.nme_bitmap_data_destroy_hardware_surface(this.nmeHandle);
	}
	,dispose: function() {
		nme.display.BitmapData.nme_bitmap_data_dispose(this.nmeHandle);
		this.nmeHandle = null;
	}
	,dumpBits: function() {
		nme.display.BitmapData.nme_bitmap_data_dump_bits(this.nmeHandle);
	}
	,encode: function(inFormat,inQuality) {
		if(inQuality == null) {
			inQuality = 0.9;
		}
		return nme.display.BitmapData.nme_bitmap_data_encode(this.nmeHandle,inFormat,inQuality);
	}
	,fillRect: function(rect,inColour) {
		var a = inColour >>> 24;
		var c = inColour & 16777215;
		nme.display.BitmapData.nme_bitmap_data_fill(this.nmeHandle,rect,c,a);
	}
	,fillRectEx: function(rect,inColour,inAlpha) {
		if(inAlpha == null) {
			inAlpha = 255;
		}
		nme.display.BitmapData.nme_bitmap_data_fill(this.nmeHandle,rect,inColour,inAlpha);
	}
	,floodFill: function(x,y,color) {
		nme.display.BitmapData.nme_bitmap_data_flood_fill(this.nmeHandle,x,y,color);
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) {
			findColor = true;
		}
		var result = new nme.geom.Rectangle();
		nme.display.BitmapData.nme_bitmap_data_get_color_bounds_rect(this.nmeHandle,mask,color,findColor,result);
		return result;
	}
	,getPixel: function(x,y) {
		return nme.display.BitmapData.nme_bitmap_data_get_pixel(this.nmeHandle,x,y);
	}
	,getPixel32: function(x,y) {
		return nme.display.BitmapData.nme_bitmap_data_get_pixel32(this.nmeHandle,x,y);
	}
	,getPixels: function(rect) {
		var result = nme.display.BitmapData.nme_bitmap_data_get_pixels(this.nmeHandle,rect);
		if(result != null) {
			result.position = result.length;
		}
		return result;
	}
	,getVector: function(rect) {
		var pixels = rect.width * rect.height | 0;
		if(pixels < 1) {
			return [];
		}
		var result = [];
		result[pixels - 1] = 0;
		var bytes = nme.display.BitmapData.nme_bitmap_data_get_pixels(this.nmeHandle,rect);
		bytes.position = 0;
		var _g = 0;
		var _g1 = pixels;
		while(_g < _g1) {
			var i = _g++;
			result[i] = bytes.readInt();
		}
		return result;
	}
	,nmeDrawToSurface: function(inSurface,matrix,colorTransform,blendMode,clipRect,smoothing) {
		var blendIndex = 0;
		nme.display.BitmapData.nme_render_surface_to_surface(inSurface,this.nmeHandle,matrix,colorTransform,blendIndex,clipRect,smoothing);
	}
	,nmeLoadFromBytes: function(inBytes,inRawAlpha) {
		this.nmeHandle = nme.display.BitmapData.nme_bitmap_data_from_bytes(inBytes,inRawAlpha);
	}
	,scroll: function(inDX,inDY) {
		nme.display.BitmapData.nme_bitmap_data_scroll(this.nmeHandle,inDX,inDY);
	}
	,setFlags: function(inFlags) {
		nme.display.BitmapData.nme_bitmap_data_set_flags(this.nmeHandle,inFlags);
	}
	,getFlags: function() {
		return nme.display.BitmapData.nme_bitmap_data_get_flags(this.nmeHandle);
	}
	,setPixel: function(inX,inY,inColour) {
		nme.display.BitmapData.nme_bitmap_data_set_pixel(this.nmeHandle,inX,inY,inColour);
	}
	,setPixel32: function(inX,inY,inColour) {
		nme.display.BitmapData.nme_bitmap_data_set_pixel32(this.nmeHandle,inX,inY,inColour);
	}
	,setPixels: function(rect,pixels) {
		var size = rect.width * rect.height * 4 | 0;
		pixels.checkData(size | 0);
		nme.display.BitmapData.nme_bitmap_data_set_bytes(this.nmeHandle,rect,pixels,pixels.position);
		pixels.position += size;
	}
	,setVector: function(rect,inPixels) {
		if(rect == null) {
			rect = new nme.geom.Rectangle(0,0,this.get_width(),this.get_height());
		}
		var count = rect.width * rect.height | 0;
		if(inPixels.length < count) {
			return;
		}
		var bytes = new nme.utils.ByteArray(0,true);
		var _g = 0;
		var _g1 = count;
		while(_g < _g1) {
			var i = _g++;
			bytes.writeInt(inPixels[i]);
		}
		nme.display.BitmapData.nme_bitmap_data_set_bytes(this.nmeHandle,rect,bytes,0);
	}
	,get_data: function() {
		return nme.utils.UInt8Array.fromBytes(this.getPixels());
	}
	,getUInts8: function(dataHandle,dataOffset,dataStride,pixelFormat,subSample) {
		if(subSample == null) {
			subSample = 1;
		}
		nme.display.BitmapData.nme_bitmap_data_get_uints8(this.nmeHandle,dataHandle,dataOffset,dataStride,pixelFormat,subSample);
	}
	,setUInts8: function(dataHandle,dataOffset,dataStride,pixelFormat,expand) {
		if(expand == null) {
			expand = 1;
		}
		nme.display.BitmapData.nme_bitmap_data_set_uints8(this.nmeHandle,dataHandle,dataOffset,dataStride,pixelFormat,expand);
	}
	,getFloats32: function(dataHandle,dataOffset,dataStride,pixelFormat,transform,subSample,subrect) {
		if(subSample == null) {
			subSample = 1;
		}
		nme.display.BitmapData.nme_bitmap_data_get_floats32(this.nmeHandle,dataHandle,dataOffset,dataStride,pixelFormat,transform,subSample,subrect);
	}
	,setFloats32: function(dataHandle,dataOffset,dataStride,pixelFormat,transform,expand,subrect) {
		if(expand == null) {
			expand = 1;
		}
		nme.display.BitmapData.nme_bitmap_data_set_floats32(this.nmeHandle,dataHandle,dataOffset,dataStride,pixelFormat,transform,expand,subrect);
	}
	,setFormat: function(format,inConvert) {
		if(inConvert == null) {
			inConvert = true;
		}
		nme.display.BitmapData.nme_bitmap_data_set_format(this.nmeHandle,format,inConvert);
	}
	,set_format: function(format) {
		this.setFormat(format);
		return format;
	}
	,get_format: function() {
		return nme.display.BitmapData.nme_bitmap_data_get_format(this.nmeHandle);
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) {
			grayScale = false;
		}
		if(channelOptions == null) {
			channelOptions = 7;
		}
		if(high == null) {
			high = 255;
		}
		if(low == null) {
			low = 0;
		}
		nme.display.BitmapData.nme_bitmap_data_noise(this.nmeHandle,randomSeed,low,high,channelOptions,grayScale);
	}
	,get_rect: function() {
		return new nme.geom.Rectangle(0,0,this.get_width(),this.get_height());
	}
	,get_width: function() {
		return nme.display.BitmapData.nme_bitmap_data_width(this.nmeHandle);
	}
	,get_height: function() {
		return nme.display.BitmapData.nme_bitmap_data_height(this.nmeHandle);
	}
	,get_transparent: function() {
		return nme.display.BitmapData.nme_bitmap_data_get_transparent(this.nmeHandle);
	}
	,get_premultipliedAlpha: function() {
		return nme.display.BitmapData.nme_bitmap_data_get_prem_alpha(this.nmeHandle);
	}
	,set_premultipliedAlpha: function(inVal) {
		nme.display.BitmapData.nme_bitmap_data_set_prem_alpha(this.nmeHandle,inVal);
		return inVal;
	}
	,get_mipmaps: function() {
		return (this.getFlags() & nme.display.BitmapData.FLAG_MIPMAPS) > 0;
	}
	,set_mipmaps: function(inMipmaps) {
		var f = this.getFlags();
		if((f & nme.display.BitmapData.FLAG_MIPMAPS) != 0 != inMipmaps) {
			if(inMipmaps) {
				this.setFlags(f | nme.display.BitmapData.FLAG_MIPMAPS);
			} else {
				this.setFlags(f & ~nme.display.BitmapData.FLAG_MIPMAPS);
			}
		}
		return inMipmaps;
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		nme.display.BitmapData.nme_bitmap_data_apply_filter(this.nmeHandle,sourceBitmapData.nmeHandle,sourceRect,destPoint,filter);
	}
	,clone: function() {
		var bm = new nme.display.BitmapData(0,0,false,0,-1);
		bm.nmeHandle = nme.display.BitmapData.nme_bitmap_data_clone(this.nmeHandle);
		bm.set_mipmaps(this.get_mipmaps());
		return bm;
	}
	,cloneRect: function(x0,y0,inWidth,inHeight) {
		var result = new nme.display.BitmapData(inWidth,inHeight,this.get_transparent(),0,this.get_format());
		result.copyPixels(this,new nme.geom.Rectangle(x0,y0,inWidth,inHeight),new nme.geom.Point(0,0),null,null,false);
		result.set_mipmaps(this.get_mipmaps());
		return result;
	}
	,draw: function(source,matrix,colorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) {
			smoothing = false;
		}
		source.nmeDrawToSurface(this.nmeHandle,matrix,colorTransform,Std.string(blendMode),clipRect,smoothing);
	}
	,unmultiplyAlpha: function() {
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) {
			copySource = false;
		}
		if(mask == null) {
			mask = -1;
		}
		if(color == null) {
			color = 0;
		}
		if(sourceBitmapData == this && sourceRect.equals(this.get_rect()) && destPoint.x == 0 && destPoint.y == 0) {
			return this._self_threshold(operation,threshold,color,mask);
		}
		var sx = sourceRect.x | 0;
		var sy = sourceRect.y | 0;
		var sw = sourceBitmapData.get_width() | 0;
		var sh = sourceBitmapData.get_height() | 0;
		var dx = destPoint.x | 0;
		var dy = destPoint.y | 0;
		var bw = this.get_width() - sw - dx;
		var bh = this.get_height() - sh - dy;
		var dw = bw < 0 ? sw + (this.get_width() - sw - dx) : sw;
		var dh = bw < 0 ? sh + (this.get_height() - sh - dy) : sh;
		var hits = 0;
		threshold = (threshold & 255) << 24 | (threshold >> 8 & 255) << 16 | (threshold >> 16 & 255) << 8 | threshold >> 24 & 255;
		color = (color & 255) << 24 | (color >> 8 & 255) << 16 | (color >> 16 & 255) << 8 | color >> 24 & 255;
		var canvas_mem = sw * sh * 4;
		var source_mem = 0;
		if(copySource) {
			source_mem = sw * sh * 4;
		}
		var total_mem = canvas_mem + source_mem;
		var mem = new nme.utils.ByteArray();
		mem.setLength(total_mem);
		mem.position = 0;
		var bd1 = sourceBitmapData.clone();
		mem.writeBytes(bd1.getPixels(sourceRect));
		mem.position = canvas_mem;
		if(copySource) {
			var bd2 = sourceBitmapData.clone();
			mem.writeBytes(bd2.getPixels(sourceRect));
		}
		mem.position = 0;
		nme.Memory.select(mem);
		var thresh_mask = threshold & mask;
		var _g = 0;
		var _g1 = dh;
		while(_g < _g1) {
			var yy = _g++;
			var _g2 = 0;
			var _g3 = dw;
			while(_g2 < _g3) {
				var xx = _g2++;
				var pos = (xx + sx + (yy + sy) * sw) * 4;
				var pixelValue = nme.Memory.getI32(pos);
				var pix_mask = pixelValue & mask;
				var i = nme.display.BitmapData.ucompare(pix_mask,thresh_mask);
				var test = false;
				if(operation == "==") {
					test = i == 0;
				} else if(operation == "<") {
					test = i == -1;
				} else if(operation == ">") {
					test = i == 1;
				} else if(operation == "!=") {
					test = i != 0;
				} else if(operation == "<=") {
					test = i == 0 || i == -1;
				} else if(operation == ">=") {
					test = i == 0 || i == 1;
				}
				if(test) {
					nme.Memory.setI32(pos,color);
					++hits;
				} else if(copySource) {
					var source_color = nme.Memory.getI32(canvas_mem + pos);
					nme.Memory.setI32(pos,source_color);
				}
			}
		}
		mem.position = 0;
		bd1.setPixels(sourceRect,mem);
		this.copyPixels(bd1,bd1.get_rect(),destPoint);
		nme.Memory.select(null);
		return hits;
	}
	,_self_threshold: function(operation,threshold,color,mask) {
		if(mask == null) {
			mask = -1;
		}
		if(color == null) {
			color = 0;
		}
		var hits = 0;
		threshold = (threshold & 255) << 24 | (threshold >> 8 & 255) << 16 | (threshold >> 16 & 255) << 8 | threshold >> 24 & 255;
		color = (color & 255) << 24 | (color >> 8 & 255) << 16 | (color >> 16 & 255) << 8 | color >> 24 & 255;
		var mem = new nme.utils.ByteArray();
		mem.setLength(this.get_width() * this.get_height() * 4);
		var mem = this.getPixels(this.get_rect());
		mem.position = 0;
		nme.Memory.select(mem);
		var thresh_mask = threshold & mask;
		var _g = 0;
		var _g1 = this.get_height();
		while(_g < _g1) {
			var yy = _g++;
			var width_yy = this.get_width() * yy;
			var _g2 = 0;
			var _g3 = this.get_width();
			while(_g2 < _g3) {
				var xx = _g2++;
				var pos = (width_yy + xx) * 4;
				var pixelValue = nme.Memory.getI32(pos);
				var pix_mask = pixelValue & mask;
				var i = nme.display.BitmapData.ucompare(pix_mask,thresh_mask);
				var test = false;
				if(operation == "==") {
					test = i == 0;
				} else if(operation == "<") {
					test = i == -1;
				} else if(operation == ">") {
					test = i == 1;
				} else if(operation == "!=") {
					test = i != 0;
				} else if(operation == "<=") {
					test = i == 0 || i == -1;
				} else if(operation == ">=") {
					test = i == 0 || i == 1;
				}
				if(test) {
					nme.Memory.setI32(pos,color);
					++hits;
				}
			}
		}
		mem.position = 0;
		this.setPixels(this.get_rect(),mem);
		nme.Memory.select(null);
		return hits;
	}
	,generateFilterRect: function(sourceRect,filter) {
		var result = new nme.geom.Rectangle();
		nme.display.BitmapData.nme_bitmap_data_generate_filter_rect(sourceRect,filter,result);
		return result;
	}
	,save: function(inFilename,inQuality) {
		if(inQuality == null) {
			inQuality = 0.9;
		}
		var ext = inFilename.length > 3 ? HxOverrides.substr(inFilename,inFilename.length - 3,null).toLowerCase() : "png";
		if(ext == "jpg" || ext == "jpeg") {
			ext = "jpg";
		} else {
			ext = "png";
		}
		var bytes = this.encode(ext,inQuality);
		bytes.writeFile(inFilename);
	}
	,lock: function() {
	}
	,unlock: function(changeRect) {
	}
	,toString: function() {
		return "BitmapData(" + this.get_width() + "," + this.get_height() + ")";
	}
	,__class__: nme.display.BitmapData
	,__properties__: {set_mipmaps:"set_mipmaps",get_mipmaps:"get_mipmaps",get_data:"get_data",set_premultipliedAlpha:"set_premultipliedAlpha",get_premultipliedAlpha:"get_premultipliedAlpha",set_format:"set_format",get_format:"get_format",get_width:"get_width",get_transparent:"get_transparent",get_rect:"get_rect",get_height:"get_height"}
};
nme.display.BitmapDataChannel = function() { };
$hxClasses["nme.display.BitmapDataChannel"] = nme.display.BitmapDataChannel;
nme.display.BitmapDataChannel.__name__ = "nme.display.BitmapDataChannel";
nme.display.BlendMode = $hxEnums["nme.display.BlendMode"] = { __ename__:"nme.display.BlendMode",__constructs__:null
	,NORMAL: {_hx_name:"NORMAL",_hx_index:0,__enum__:"nme.display.BlendMode",toString:$estr}
	,LAYER: {_hx_name:"LAYER",_hx_index:1,__enum__:"nme.display.BlendMode",toString:$estr}
	,MULTIPLY: {_hx_name:"MULTIPLY",_hx_index:2,__enum__:"nme.display.BlendMode",toString:$estr}
	,SCREEN: {_hx_name:"SCREEN",_hx_index:3,__enum__:"nme.display.BlendMode",toString:$estr}
	,LIGHTEN: {_hx_name:"LIGHTEN",_hx_index:4,__enum__:"nme.display.BlendMode",toString:$estr}
	,DARKEN: {_hx_name:"DARKEN",_hx_index:5,__enum__:"nme.display.BlendMode",toString:$estr}
	,DIFFERENCE: {_hx_name:"DIFFERENCE",_hx_index:6,__enum__:"nme.display.BlendMode",toString:$estr}
	,ADD: {_hx_name:"ADD",_hx_index:7,__enum__:"nme.display.BlendMode",toString:$estr}
	,SUBTRACT: {_hx_name:"SUBTRACT",_hx_index:8,__enum__:"nme.display.BlendMode",toString:$estr}
	,INVERT: {_hx_name:"INVERT",_hx_index:9,__enum__:"nme.display.BlendMode",toString:$estr}
	,ALPHA: {_hx_name:"ALPHA",_hx_index:10,__enum__:"nme.display.BlendMode",toString:$estr}
	,ERASE: {_hx_name:"ERASE",_hx_index:11,__enum__:"nme.display.BlendMode",toString:$estr}
	,OVERLAY: {_hx_name:"OVERLAY",_hx_index:12,__enum__:"nme.display.BlendMode",toString:$estr}
	,HARDLIGHT: {_hx_name:"HARDLIGHT",_hx_index:13,__enum__:"nme.display.BlendMode",toString:$estr}
};
nme.display.BlendMode.__constructs__ = [nme.display.BlendMode.NORMAL,nme.display.BlendMode.LAYER,nme.display.BlendMode.MULTIPLY,nme.display.BlendMode.SCREEN,nme.display.BlendMode.LIGHTEN,nme.display.BlendMode.DARKEN,nme.display.BlendMode.DIFFERENCE,nme.display.BlendMode.ADD,nme.display.BlendMode.SUBTRACT,nme.display.BlendMode.INVERT,nme.display.BlendMode.ALPHA,nme.display.BlendMode.ERASE,nme.display.BlendMode.OVERLAY,nme.display.BlendMode.HARDLIGHT];
nme.display.BlendMode.__empty_constructs__ = [nme.display.BlendMode.NORMAL,nme.display.BlendMode.LAYER,nme.display.BlendMode.MULTIPLY,nme.display.BlendMode.SCREEN,nme.display.BlendMode.LIGHTEN,nme.display.BlendMode.DARKEN,nme.display.BlendMode.DIFFERENCE,nme.display.BlendMode.ADD,nme.display.BlendMode.SUBTRACT,nme.display.BlendMode.INVERT,nme.display.BlendMode.ALPHA,nme.display.BlendMode.ERASE,nme.display.BlendMode.OVERLAY,nme.display.BlendMode.HARDLIGHT];
nme.display.CapsStyle = $hxEnums["nme.display.CapsStyle"] = { __ename__:"nme.display.CapsStyle",__constructs__:null
	,ROUND: {_hx_name:"ROUND",_hx_index:0,__enum__:"nme.display.CapsStyle",toString:$estr}
	,NONE: {_hx_name:"NONE",_hx_index:1,__enum__:"nme.display.CapsStyle",toString:$estr}
	,SQUARE: {_hx_name:"SQUARE",_hx_index:2,__enum__:"nme.display.CapsStyle",toString:$estr}
};
nme.display.CapsStyle.__constructs__ = [nme.display.CapsStyle.ROUND,nme.display.CapsStyle.NONE,nme.display.CapsStyle.SQUARE];
nme.display.CapsStyle.__empty_constructs__ = [nme.display.CapsStyle.ROUND,nme.display.CapsStyle.NONE,nme.display.CapsStyle.SQUARE];
nme.display.DirectRenderer = function(inType) {
	if(inType == null) {
		inType = "DirectRenderer";
	}
	var _gthis = this;
	nme.display.DisplayObject.call(this,nme.display.DirectRenderer.nme_direct_renderer_create(),inType);
	this.addEventListener("addedToStage",function(_) {
		nme.display.DirectRenderer.nme_direct_renderer_set(_gthis.nmeHandle,$bind(_gthis,_gthis.nmeOnRender));
	});
	this.addEventListener("removedFromStage",function(_) {
		nme.display.DirectRenderer.nme_direct_renderer_set(_gthis.nmeHandle,null);
	});
};
$hxClasses["nme.display.DirectRenderer"] = nme.display.DirectRenderer;
nme.display.DirectRenderer.__name__ = "nme.display.DirectRenderer";
nme.display.DirectRenderer.__super__ = nme.display.DisplayObject;
nme.display.DirectRenderer.prototype = $extend(nme.display.DisplayObject.prototype,{
	nmeOnRender: function(inRect) {
		if(this.render != null) {
			this.render(new nme.geom.Rectangle(inRect.x,inRect.y,inRect.width,inRect.height));
		}
	}
	,render: function(inRect) {
	}
	,__class__: nme.display.DirectRenderer
});
nme.display.InteractiveObject = function(inHandle,inType) {
	this.doubleClickEnabled = false;
	this.nmeMouseEnabled = true;
	nme.display.DisplayObject.call(this,inHandle,inType);
};
$hxClasses["nme.display.InteractiveObject"] = nme.display.InteractiveObject;
nme.display.InteractiveObject.__name__ = "nme.display.InteractiveObject";
nme.display.InteractiveObject.__super__ = nme.display.DisplayObject;
nme.display.InteractiveObject.prototype = $extend(nme.display.DisplayObject.prototype,{
	doubleClickEnabled: null
	,nmeMouseEnabled: null
	,nmeAsInteractiveObject: function() {
		return this;
	}
	,requestSoftKeyboard: function() {
		return nme.display.InteractiveObject.nme_display_object_request_soft_keyboard(this.nmeHandle);
	}
	,get_mouseEnabled: function() {
		return this.nmeMouseEnabled;
	}
	,set_mouseEnabled: function(inVal) {
		this.nmeMouseEnabled = inVal;
		nme.display.InteractiveObject.nme_display_object_set_mouse_enabled(this.nmeHandle,inVal);
		return this.nmeMouseEnabled;
	}
	,set_moveForSoftKeyboard: function(inVal) {
		nme.display.InteractiveObject.nme_display_object_set_moves_for_soft_keyboard(this.nmeHandle,inVal);
		return inVal;
	}
	,get_moveForSoftKeyboard: function() {
		return nme.display.InteractiveObject.nme_display_object_get_moves_for_soft_keyboard(this.nmeHandle);
	}
	,set_needsSoftKeyboard: function(inVal) {
		nme.display.InteractiveObject.nme_display_object_set_needs_soft_keyboard(this.nmeHandle,inVal);
		return inVal;
	}
	,get_needsSoftKeyboard: function() {
		return nme.display.InteractiveObject.nme_display_object_get_needs_soft_keyboard(this.nmeHandle);
	}
	,get_softKeyboard: function() {
		return nme.display.InteractiveObject.nme_display_object_get_soft_keyboard(this.nmeHandle);
	}
	,set_softKeyboard: function(inVal) {
		nme.display.InteractiveObject.nme_display_object_set_soft_keyboard(this.nmeHandle,inVal);
		return inVal;
	}
	,__class__: nme.display.InteractiveObject
	,__properties__: $extend(nme.display.DisplayObject.prototype.__properties__,{set_softKeyboard:"set_softKeyboard",get_softKeyboard:"get_softKeyboard",set_needsSoftKeyboard:"set_needsSoftKeyboard",get_needsSoftKeyboard:"get_needsSoftKeyboard",set_moveForSoftKeyboard:"set_moveForSoftKeyboard",get_moveForSoftKeyboard:"get_moveForSoftKeyboard",set_mouseEnabled:"set_mouseEnabled",get_mouseEnabled:"get_mouseEnabled"})
});
nme.display.DisplayObjectContainer = function(inHandle,inType) {
	nme.display.InteractiveObject.call(this,inHandle,inType);
	this.nmeChildren = [];
};
$hxClasses["nme.display.DisplayObjectContainer"] = nme.display.DisplayObjectContainer;
nme.display.DisplayObjectContainer.__name__ = "nme.display.DisplayObjectContainer";
nme.display.DisplayObjectContainer.__super__ = nme.display.InteractiveObject;
nme.display.DisplayObjectContainer.prototype = $extend(nme.display.InteractiveObject.prototype,{
	numChildren: null
	,nmeChildren: null
	,addChild: function(child) {
		if(child == this) {
			throw haxe.Exception.thrown("Adding to self");
		}
		if(child.nmeParent == this) {
			this.setChildIndex(child,this.nmeChildren.length - 1);
		} else {
			child.nmeSetParent(this);
			this.nmeChildren.push(child);
			if(child.nmeHandle != null) {
				nme.display.DisplayObjectContainer.nme_doc_add_child(this.nmeHandle,child.nmeHandle);
			}
		}
		return child;
	}
	,addChildAt: function(child,index) {
		if(child == this) {
			throw haxe.Exception.thrown("Adding to self");
		}
		if(child.nmeParent == this) {
			this.setChildIndex(child,this.nmeChildren.length - 1);
		} else {
			child.nmeSetParent(this);
			this.nmeChildren.push(child);
			if(child.nmeHandle != null) {
				nme.display.DisplayObjectContainer.nme_doc_add_child(this.nmeHandle,child.nmeHandle);
			}
		}
		if(index > this.nmeChildren.length) {
			throw haxe.Exception.thrown("Invalid index position " + index);
		}
		var orig = this.nmeGetChildIndex(child);
		if(orig < 0) {
			var msg = "setChildIndex : object " + child.toString() + " not found.";
			if(child.nmeParent == this) {
				var realindex = -1;
				var _g = 0;
				var _g1 = this.nmeChildren.length;
				while(_g < _g1) {
					var i = _g++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) {
					msg += "Internal error: Real child index was " + Std.string(realindex);
				} else {
					msg += "Internal error: Child was not in nmeChildren array!";
				}
			}
			throw haxe.Exception.thrown(msg);
		}
		nme.display.DisplayObjectContainer.nme_doc_set_child_index(this.nmeHandle,child.nmeHandle,index);
		if(index < orig) {
			var i = orig;
			while(i > index) {
				this.nmeChildren[i] = this.nmeChildren[i - 1];
				--i;
			}
			this.nmeChildren[index] = child;
		} else if(orig < index) {
			var i = orig;
			while(i < index) {
				this.nmeChildren[i] = this.nmeChildren[i + 1];
				++i;
			}
			this.nmeChildren[index] = child;
		}
		return child;
	}
	,areInaccessibleObjectsUnderPoint: function(point) {
		return false;
	}
	,contains: function(child) {
		if(child == null) {
			return false;
		}
		if(this == child) {
			return true;
		}
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child) {
				return true;
			}
		}
		return false;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) {
			return this.nmeChildren[index];
		}
		throw haxe.Exception.thrown(new nme.errors.RangeError("getChildAt : index out of bounds " + index + "/" + this.nmeChildren.length));
	}
	,getChildByName: function(name) {
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(name == c.get_name()) {
				return c;
			}
		}
		return null;
	}
	,getChildIndex: function(child) {
		return this.nmeGetChildIndex(child);
	}
	,getObjectsUnderPoint: function(point) {
		var result = [];
		this.nmeGetObjectsUnderPoint(point,result);
		return result;
	}
	,nmeAddChild: function(child) {
		if(child == this) {
			throw haxe.Exception.thrown("Adding to self");
		}
		if(child.nmeParent == this) {
			this.setChildIndex(child,this.nmeChildren.length - 1);
		} else {
			child.nmeSetParent(this);
			this.nmeChildren.push(child);
			if(child.nmeHandle != null) {
				nme.display.DisplayObjectContainer.nme_doc_add_child(this.nmeHandle,child.nmeHandle);
			}
		}
	}
	,nmeBroadcast: function(inEvt) {
		var i = 0;
		if(this.nmeChildren.length > 0) {
			while(true) {
				var child = this.nmeChildren[i];
				child.nmeBroadcast(inEvt);
				if(i >= this.nmeChildren.length) {
					break;
				}
				if(this.nmeChildren[i] == child) {
					++i;
					if(i >= this.nmeChildren.length) {
						break;
					}
				}
			}
		}
		nme.display.InteractiveObject.prototype.nmeBroadcast.call(this,inEvt);
	}
	,nmeFindByID: function(inID) {
		if(this.nmeID == inID) {
			return this;
		}
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			var found = child.nmeFindByID(inID);
			if(found != null) {
				return found;
			}
		}
		return nme.display.InteractiveObject.prototype.nmeFindByID.call(this,inID);
	}
	,nmeGetChildIndex: function(child) {
		var _g = 0;
		var _g1 = this.nmeChildren.length;
		while(_g < _g1) {
			var i = _g++;
			if(this.nmeChildren[i] == child) {
				return i;
			}
		}
		return -1;
	}
	,nmeGetObjectsUnderPoint: function(point,result) {
		nme.display.InteractiveObject.prototype.nmeGetObjectsUnderPoint.call(this,point,result);
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeGetObjectsUnderPoint(point,result);
		}
	}
	,nmeOnAdded: function(inObj,inIsOnStage) {
		nme.display.InteractiveObject.prototype.nmeOnAdded.call(this,inObj,inIsOnStage);
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeOnAdded(inObj,inIsOnStage);
		}
	}
	,nmeOnRemoved: function(inObj,inWasOnStage) {
		nme.display.InteractiveObject.prototype.nmeOnRemoved.call(this,inObj,inWasOnStage);
		var _g = 0;
		var _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeOnRemoved(inObj,inWasOnStage);
		}
	}
	,nmeRemoveChildFromArray: function(child) {
		var i = this.nmeGetChildIndex(child);
		if(i >= 0) {
			nme.display.DisplayObjectContainer.nme_doc_remove_child(this.nmeHandle,i);
			this.nmeChildren.splice(i,1);
		}
	}
	,nmeSetChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) {
			throw haxe.Exception.thrown("Invalid index position " + index);
		}
		var s = null;
		var orig = this.nmeGetChildIndex(child);
		if(orig < 0) {
			var msg = "setChildIndex : object " + child.toString() + " not found.";
			if(child.nmeParent == this) {
				var realindex = -1;
				var _g = 0;
				var _g1 = this.nmeChildren.length;
				while(_g < _g1) {
					var i = _g++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) {
					msg += "Internal error: Real child index was " + (realindex == null ? "null" : "" + realindex);
				} else {
					msg += "Internal error: Child was not in nmeChildren array!";
				}
			}
			throw haxe.Exception.thrown(msg);
		}
		nme.display.DisplayObjectContainer.nme_doc_set_child_index(this.nmeHandle,child.nmeHandle,index);
		if(index < orig) {
			var i = orig;
			while(i > index) {
				this.nmeChildren[i] = this.nmeChildren[i - 1];
				--i;
			}
			this.nmeChildren[index] = child;
		} else if(orig < index) {
			var i = orig;
			while(i < index) {
				this.nmeChildren[i] = this.nmeChildren[i + 1];
				++i;
			}
			this.nmeChildren[index] = child;
		}
	}
	,nmeSwapChildrenAt: function(index1,index2) {
		if(index1 < 0 || index2 < 0 || index1 > this.nmeChildren.length || index2 > this.nmeChildren.length) {
			throw haxe.Exception.thrown(new nme.errors.RangeError("swapChildrenAt : index out of bounds"));
		}
		if(index1 != index2) {
			var tmp = this.nmeChildren[index1];
			this.nmeChildren[index1] = this.nmeChildren[index2];
			this.nmeChildren[index2] = tmp;
			nme.display.DisplayObjectContainer.nme_doc_swap_children(this.nmeHandle,index1,index2);
		}
	}
	,removeChild: function(child) {
		var c = this.nmeGetChildIndex(child);
		if(c >= 0) {
			child.nmeSetParent(null);
			return child;
		}
		return null;
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) {
			var result = this.nmeChildren[index];
			result.nmeSetParent(null);
			return result;
		}
		throw haxe.Exception.thrown(new nme.errors.ArgumentError("The supplied DisplayObject must be a child of the caller."));
	}
	,removeChildren: function(beginIndex,endIndex) {
		if(endIndex == null) {
			endIndex = 2147483647;
		}
		if(beginIndex == null) {
			beginIndex = 0;
		}
		if(endIndex == 2147483647) {
			endIndex = this.nmeChildren.length - 1;
			if(endIndex < 0) {
				return;
			}
		}
		if(beginIndex > this.nmeChildren.length - 1) {
			return;
		} else if(endIndex < beginIndex || beginIndex < 0 || endIndex > this.nmeChildren.length) {
			throw haxe.Exception.thrown(new nme.errors.RangeError("The supplied index is out of bounds."));
		}
		var numRemovals = endIndex - beginIndex;
		while(numRemovals >= 0) {
			this.removeChildAt(beginIndex);
			--numRemovals;
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) {
			throw haxe.Exception.thrown("Invalid index position " + index);
		}
		var orig = this.nmeGetChildIndex(child);
		if(orig < 0) {
			var msg = "setChildIndex : object " + child.toString() + " not found.";
			if(child.nmeParent == this) {
				var realindex = -1;
				var _g = 0;
				var _g1 = this.nmeChildren.length;
				while(_g < _g1) {
					var i = _g++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) {
					msg += "Internal error: Real child index was " + Std.string(realindex);
				} else {
					msg += "Internal error: Child was not in nmeChildren array!";
				}
			}
			throw haxe.Exception.thrown(msg);
		}
		nme.display.DisplayObjectContainer.nme_doc_set_child_index(this.nmeHandle,child.nmeHandle,index);
		if(index < orig) {
			var i = orig;
			while(i > index) {
				this.nmeChildren[i] = this.nmeChildren[i - 1];
				--i;
			}
			this.nmeChildren[index] = child;
		} else if(orig < index) {
			var i = orig;
			while(i < index) {
				this.nmeChildren[i] = this.nmeChildren[i + 1];
				++i;
			}
			this.nmeChildren[index] = child;
		}
	}
	,swapChildren: function(child1,child2) {
		var idx1 = this.nmeGetChildIndex(child1);
		var idx2 = this.nmeGetChildIndex(child2);
		if(idx1 < 0 || idx2 < 0) {
			throw haxe.Exception.thrown("swapChildren:Could not find children");
		}
		if(idx1 < 0 || idx2 < 0 || idx1 > this.nmeChildren.length || idx2 > this.nmeChildren.length) {
			throw haxe.Exception.thrown(new nme.errors.RangeError("swapChildrenAt : index out of bounds"));
		}
		if(idx1 != idx2) {
			var tmp = this.nmeChildren[idx1];
			this.nmeChildren[idx1] = this.nmeChildren[idx2];
			this.nmeChildren[idx2] = tmp;
			nme.display.DisplayObjectContainer.nme_doc_swap_children(this.nmeHandle,idx1,idx2);
		}
	}
	,swapChildrenAt: function(index1,index2) {
		if(index1 < 0 || index2 < 0 || index1 > this.nmeChildren.length || index2 > this.nmeChildren.length) {
			throw haxe.Exception.thrown(new nme.errors.RangeError("swapChildrenAt : index out of bounds"));
		}
		if(index1 != index2) {
			var tmp = this.nmeChildren[index1];
			this.nmeChildren[index1] = this.nmeChildren[index2];
			this.nmeChildren[index2] = tmp;
			nme.display.DisplayObjectContainer.nme_doc_swap_children(this.nmeHandle,index1,index2);
		}
	}
	,get_mouseChildren: function() {
		return nme.display.DisplayObjectContainer.nme_doc_get_mouse_children(this.nmeHandle);
	}
	,set_mouseChildren: function(inVal) {
		nme.display.DisplayObjectContainer.nme_doc_set_mouse_children(this.nmeHandle,inVal);
		return inVal;
	}
	,get_numChildren: function() {
		return this.nmeChildren.length;
	}
	,get_tabChildren: function() {
		return false;
	}
	,set_tabChildren: function(inValue) {
		return false;
	}
	,__class__: nme.display.DisplayObjectContainer
	,__properties__: $extend(nme.display.InteractiveObject.prototype.__properties__,{set_tabChildren:"set_tabChildren",get_tabChildren:"get_tabChildren",get_numChildren:"get_numChildren",set_mouseChildren:"set_mouseChildren",get_mouseChildren:"get_mouseChildren"})
});
nme.display.DisplayTools = function() { };
$hxClasses["nme.display.DisplayTools"] = nme.display.DisplayTools;
nme.display.DisplayTools.__name__ = "nme.display.DisplayTools";
nme.display.DisplayTools.ellipse = function(gfx,cx,cy,radX,radY) {
	gfx.drawEllipse(cx - radX,cy - radY,radX * 2,radY * 2);
};
nme.text = {};
nme.text.TextField = function() {
	var handle = nme.text.TextField.nme_text_field_create();
	nme.display.InteractiveObject.call(this,handle,"TextField");
	this.gridFitType = nme.text.GridFitType.PIXEL;
	this.sharpness = 0;
};
$hxClasses["nme.text.TextField"] = nme.text.TextField;
nme.text.TextField.__name__ = "nme.text.TextField";
nme.text.TextField.__super__ = nme.display.InteractiveObject;
nme.text.TextField.prototype = $extend(nme.display.InteractiveObject.prototype,{
	antiAliasType: null
	,bottomScrollV: null
	,gridFitType: null
	,maxScrollH: null
	,maxScrollV: null
	,selectionBeginIndex: null
	,selectionEndIndex: null
	,numLines: null
	,sharpness: null
	,textHeight: null
	,textWidth: null
	,appendText: function(newText) {
		var tmp = this.nmeHandle;
		var tmp1 = nme.text.TextField.nme_text_field_get_text(this.nmeHandle) + newText;
		nme.text.TextField.nme_text_field_set_text(tmp,tmp1);
	}
	,getLineOffset: function(lineIndex) {
		return nme.text.TextField.nme_text_field_get_line_offset(this.nmeHandle,lineIndex);
	}
	,getLineIndexOfChar: function(charIndex) {
		return nme.text.TextField.nme_text_field_get_line_for_char(this.nmeHandle,charIndex);
	}
	,getLinePositions: function(startLine,endLine) {
		var count = endLine - startLine;
		var buffer = [];
		if(count > 0) {
			buffer[count - 1] = 0.0;
			nme.text.TextField.nme_text_field_get_line_positions(this.nmeHandle,startLine,buffer);
		}
		return buffer;
	}
	,getLineText: function(lineIndex) {
		return nme.text.TextField.nme_text_field_get_line_text(this.nmeHandle,lineIndex);
	}
	,getLineMetrics: function(lineIndex) {
		var result = new nme.text.TextLineMetrics();
		nme.text.TextField.nme_text_field_get_line_metrics(this.nmeHandle,lineIndex,result);
		return result;
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) {
			endIndex = -1;
		}
		if(beginIndex == null) {
			beginIndex = -1;
		}
		var result = new nme.text.TextFormat();
		nme.text.TextField.nme_text_field_get_text_format(this.nmeHandle,result,beginIndex,endIndex);
		return result;
	}
	,getCharBoundaries: function(charIndex) {
		var result = new nme.geom.Rectangle();
		nme.text.TextField.nme_text_field_get_char_boundaries(this.nmeHandle,charIndex,result);
		return result;
	}
	,setSelection: function(beginIndex,endIndex) {
		nme.text.TextField.nme_text_field_set_selection(this.nmeHandle,beginIndex,endIndex);
	}
	,setTextFormat: function(format,beginIndex,endIndex) {
		if(endIndex == null) {
			endIndex = -1;
		}
		if(beginIndex == null) {
			beginIndex = -1;
		}
		nme.text.TextField.nme_text_field_set_text_format(this.nmeHandle,format,beginIndex,endIndex);
	}
	,replaceSelectedText: function(inNewText) {
		nme.text.TextField.nme_text_field_replace_selected_text(this.nmeHandle,inNewText);
	}
	,replaceText: function(c0,c1,inNewText) {
		nme.text.TextField.nme_text_field_replace_text(this.nmeHandle,c0,c1,inNewText);
	}
	,sendKey: function(charCode,keyId,shift,ctrl,alt) {
		var flags = 0;
		if(shift) {
			flags |= 2;
		}
		if(ctrl) {
			flags |= 20;
		}
		if(alt) {
			flags |= 8;
		}
		nme.text.TextField.nme_text_field_send_key(this.nmeHandle,charCode,keyId,flags);
	}
	,sendCopy: function() {
		this.sendKey(0,67,false,true,false);
	}
	,sendPaste: function() {
		this.sendKey(0,86,false,true,false);
	}
	,get_autoSize: function() {
		return Type.createEnumIndex(nme.text.TextFieldAutoSize,nme.text.TextField.nme_text_field_get_auto_size(this.nmeHandle));
	}
	,set_autoSize: function(inVal) {
		nme.text.TextField.nme_text_field_set_auto_size(this.nmeHandle,inVal._hx_index);
		return inVal;
	}
	,get_background: function() {
		return nme.text.TextField.nme_text_field_get_background(this.nmeHandle);
	}
	,set_background: function(inVal) {
		nme.text.TextField.nme_text_field_set_background(this.nmeHandle,inVal);
		return inVal;
	}
	,get_backgroundColor: function() {
		return nme.text.TextField.nme_text_field_get_background_color(this.nmeHandle);
	}
	,set_backgroundColor: function(inVal) {
		nme.text.TextField.nme_text_field_set_background_color(this.nmeHandle,inVal);
		return inVal;
	}
	,get_border: function() {
		return nme.text.TextField.nme_text_field_get_border(this.nmeHandle);
	}
	,set_border: function(inVal) {
		nme.text.TextField.nme_text_field_set_border(this.nmeHandle,inVal);
		return inVal;
	}
	,get_borderColor: function() {
		return nme.text.TextField.nme_text_field_get_border_color(this.nmeHandle);
	}
	,set_borderColor: function(inVal) {
		nme.text.TextField.nme_text_field_set_border_color(this.nmeHandle,inVal);
		return inVal;
	}
	,get_bottomScrollV: function() {
		return nme.text.TextField.nme_text_field_get_bottom_scroll_v(this.nmeHandle);
	}
	,get_defaultTextFormat: function() {
		var result = new nme.text.TextFormat();
		nme.text.TextField.nme_text_field_get_def_text_format(this.nmeHandle,result);
		return result;
	}
	,set_defaultTextFormat: function(inFormat) {
		nme.text.TextField.nme_text_field_set_def_text_format(this.nmeHandle,inFormat);
		return inFormat;
	}
	,get_displayAsPassword: function() {
		return nme.text.TextField.nme_text_field_get_display_as_password(this.nmeHandle);
	}
	,set_displayAsPassword: function(inVal) {
		nme.text.TextField.nme_text_field_set_display_as_password(this.nmeHandle,inVal);
		return inVal;
	}
	,get_embedFonts: function() {
		return nme.text.TextField.nme_text_field_get_embed_fonts(this.nmeHandle);
	}
	,set_embedFonts: function(inVal) {
		nme.text.TextField.nme_text_field_set_embed_fonts(this.nmeHandle,inVal);
		return inVal;
	}
	,get_forceFreeType: function() {
		return nme.text.TextField.nme_text_field_get_embed_fonts(this.nmeHandle);
	}
	,set_forceFreeType: function(inVal) {
		nme.text.TextField.nme_text_field_set_embed_fonts(this.nmeHandle,inVal);
		return inVal;
	}
	,get_htmlText: function() {
		return StringTools.replace(nme.text.TextField.nme_text_field_get_html_text(this.nmeHandle),"\n","<br/>");
	}
	,set_htmlText: function(inText) {
		nme.text.TextField.nme_text_field_set_html_text(this.nmeHandle,inText);
		return inText;
	}
	,get_maxChars: function() {
		return nme.text.TextField.nme_text_field_get_max_chars(this.nmeHandle);
	}
	,set_maxChars: function(inVal) {
		nme.text.TextField.nme_text_field_set_max_chars(this.nmeHandle,inVal);
		return inVal;
	}
	,get_maxScrollH: function() {
		return nme.text.TextField.nme_text_field_get_max_scroll_h(this.nmeHandle);
	}
	,get_maxScrollV: function() {
		return nme.text.TextField.nme_text_field_get_max_scroll_v(this.nmeHandle);
	}
	,get_multiline: function() {
		return nme.text.TextField.nme_text_field_get_multiline(this.nmeHandle);
	}
	,set_multiline: function(inVal) {
		nme.text.TextField.nme_text_field_set_multiline(this.nmeHandle,inVal);
		return inVal;
	}
	,get_numLines: function() {
		return nme.text.TextField.nme_text_field_get_num_lines(this.nmeHandle);
	}
	,get_scrollH: function() {
		return nme.text.TextField.nme_text_field_get_scroll_h(this.nmeHandle);
	}
	,set_scrollH: function(inVal) {
		nme.text.TextField.nme_text_field_set_scroll_h(this.nmeHandle,inVal);
		return inVal;
	}
	,get_scrollV: function() {
		return nme.text.TextField.nme_text_field_get_scroll_v(this.nmeHandle);
	}
	,set_scrollV: function(inVal) {
		nme.text.TextField.nme_text_field_set_scroll_v(this.nmeHandle,inVal);
		return inVal;
	}
	,get_selectable: function() {
		return nme.text.TextField.nme_text_field_get_selectable(this.nmeHandle);
	}
	,set_selectable: function(inSel) {
		nme.text.TextField.nme_text_field_set_selectable(this.nmeHandle,inSel);
		return inSel;
	}
	,get_selectionBeginIndex: function() {
		return nme.text.TextField.nme_text_field_get_selection_begin_index(this.nmeHandle);
	}
	,get_selectionEndIndex: function() {
		return nme.text.TextField.nme_text_field_get_selection_end_index(this.nmeHandle);
	}
	,get_text: function() {
		return nme.text.TextField.nme_text_field_get_text(this.nmeHandle);
	}
	,set_text: function(inText) {
		nme.text.TextField.nme_text_field_set_text(this.nmeHandle,inText);
		return inText;
	}
	,get_textColor: function() {
		return nme.text.TextField.nme_text_field_get_text_color(this.nmeHandle);
	}
	,set_textColor: function(inCol) {
		nme.text.TextField.nme_text_field_set_text_color(this.nmeHandle,inCol);
		return inCol;
	}
	,get_textWidth: function() {
		return nme.text.TextField.nme_text_field_get_text_width(this.nmeHandle);
	}
	,get_textHeight: function() {
		return nme.text.TextField.nme_text_field_get_text_height(this.nmeHandle);
	}
	,get_type: function() {
		if(nme.text.TextField.nme_text_field_get_type(this.nmeHandle)) {
			return nme.text.TextFieldType.INPUT;
		} else {
			return nme.text.TextFieldType.DYNAMIC;
		}
	}
	,set_type: function(inType) {
		nme.text.TextField.nme_text_field_set_type(this.nmeHandle,inType == nme.text.TextFieldType.INPUT);
		return inType;
	}
	,get_wordWrap: function() {
		return nme.text.TextField.nme_text_field_get_word_wrap(this.nmeHandle);
	}
	,set_wordWrap: function(inVal) {
		nme.text.TextField.nme_text_field_set_word_wrap(this.nmeHandle,inVal);
		return inVal;
	}
	,get_caretIndex: function() {
		return nme.text.TextField.nme_text_field_get_caret_index(this.nmeHandle);
	}
	,set_caretIndex: function(inVal) {
		nme.text.TextField.nme_text_field_set_caret_index(this.nmeHandle,inVal);
		return inVal;
	}
	,__class__: nme.text.TextField
	,__properties__: $extend(nme.display.InteractiveObject.prototype.__properties__,{set_caretIndex:"set_caretIndex",get_caretIndex:"get_caretIndex",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap",set_type:"set_type",get_type:"get_type",get_textWidth:"get_textWidth",get_textHeight:"get_textHeight",set_textColor:"set_textColor",get_textColor:"get_textColor",set_text:"set_text",get_text:"get_text",set_selectable:"set_selectable",get_selectable:"get_selectable",set_scrollV:"set_scrollV",get_scrollV:"get_scrollV",set_scrollH:"set_scrollH",get_scrollH:"get_scrollH",get_numLines:"get_numLines",set_multiline:"set_multiline",get_multiline:"get_multiline",get_selectionEndIndex:"get_selectionEndIndex",get_selectionBeginIndex:"get_selectionBeginIndex",get_maxScrollV:"get_maxScrollV",get_maxScrollH:"get_maxScrollH",set_maxChars:"set_maxChars",get_maxChars:"get_maxChars",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",set_forceFreeType:"set_forceFreeType",get_forceFreeType:"get_forceFreeType",set_embedFonts:"set_embedFonts",get_embedFonts:"get_embedFonts",set_displayAsPassword:"set_displayAsPassword",get_displayAsPassword:"get_displayAsPassword",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",get_bottomScrollV:"get_bottomScrollV",set_borderColor:"set_borderColor",get_borderColor:"get_borderColor",set_border:"set_border",get_border:"get_border",set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_background:"set_background",get_background:"get_background",set_autoSize:"set_autoSize",get_autoSize:"get_autoSize"})
});
nme.display.FPS = function(inX,inY,inCol) {
	if(inCol == null) {
		inCol = 0;
	}
	if(inY == null) {
		inY = 10.0;
	}
	if(inX == null) {
		inX = 10.0;
	}
	nme.text.TextField.call(this);
	this.set_x(inX);
	this.set_y(inY);
	this.set_selectable(false);
	this.set_defaultTextFormat(new nme.text.TextFormat("_sans",12,inCol));
	this.set_text("FPS: ");
	this.set_autoSize(nme.text.TextFieldAutoSize.LEFT);
	this.times = [];
	this.addEventListener("enterFrame",$bind(this,this.onEnter));
};
$hxClasses["nme.display.FPS"] = nme.display.FPS;
nme.display.FPS.__name__ = "nme.display.FPS";
nme.display.FPS.__super__ = nme.text.TextField;
nme.display.FPS.prototype = $extend(nme.text.TextField.prototype,{
	times: null
	,get_currentFPS: function() {
		return this.times.length;
	}
	,onEnter: function(_) {
		var now = haxe.Timer.stamp();
		this.times.push(now);
		while(this.times[0] < now - 1) this.times.shift();
		if(this.get_visible()) {
			this.set_text("FPS: " + this.times.length);
		}
	}
	,__class__: nme.display.FPS
	,__properties__: $extend(nme.text.TextField.prototype.__properties__,{get_currentFPS:"get_currentFPS"})
});
nme.display.FrameLabel = function(inName,inFrame) {
	nme.events.EventDispatcher.call(this);
	this.name = inName;
	this.frame = inFrame;
};
$hxClasses["nme.display.FrameLabel"] = nme.display.FrameLabel;
nme.display.FrameLabel.__name__ = "nme.display.FrameLabel";
nme.display.FrameLabel.__super__ = nme.events.EventDispatcher;
nme.display.FrameLabel.prototype = $extend(nme.events.EventDispatcher.prototype,{
	frame: null
	,name: null
	,__class__: nme.display.FrameLabel
});
nme.display.GradientType = $hxEnums["nme.display.GradientType"] = { __ename__:"nme.display.GradientType",__constructs__:null
	,RADIAL: {_hx_name:"RADIAL",_hx_index:0,__enum__:"nme.display.GradientType",toString:$estr}
	,LINEAR: {_hx_name:"LINEAR",_hx_index:1,__enum__:"nme.display.GradientType",toString:$estr}
};
nme.display.GradientType.__constructs__ = [nme.display.GradientType.RADIAL,nme.display.GradientType.LINEAR];
nme.display.GradientType.__empty_constructs__ = [nme.display.GradientType.RADIAL,nme.display.GradientType.LINEAR];
nme.display.Graphics = function(inHandle) {
	this.nmeHandle = inHandle;
};
$hxClasses["nme.display.Graphics"] = nme.display.Graphics;
nme.display.Graphics.__name__ = "nme.display.Graphics";
nme.display.Graphics.RGBA = function(inRGB,inA) {
	if(inA == null) {
		inA = 255;
	}
	return inRGB | inA << 24;
};
nme.display.Graphics.prototype = {
	nmeHandle: null
	,arcTo: function(inCX,inCY,inX,inY) {
		nme.display.Graphics.nme_gfx_arc_to(this.nmeHandle,inCX,inCY,inX,inY);
	}
	,beginBitmapFill: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) {
			smooth = false;
		}
		if(repeat == null) {
			repeat = true;
		}
		nme.display.Graphics.nme_gfx_begin_bitmap_fill(this.nmeHandle,bitmap.nmeHandle,matrix,repeat,smooth);
	}
	,beginFill: function(color,alpha) {
		if(alpha == null) {
			alpha = 1.0;
		}
		nme.display.Graphics.nme_gfx_begin_fill(this.nmeHandle,color,alpha);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		if(focalPointRatio == null) {
			focalPointRatio = 0.0;
		}
		if(matrix == null) {
			matrix = new nme.geom.Matrix();
			matrix.createGradientBox(200,200,0,-100,-100);
		}
		nme.display.Graphics.nme_gfx_begin_set_gradient_fill(this.nmeHandle,type._hx_index,colors,alphas,ratios,matrix,spreadMethod == null ? 0 : spreadMethod._hx_index,interpolationMethod == null ? 0 : interpolationMethod._hx_index,focalPointRatio,true);
	}
	,clear: function() {
		nme.display.Graphics.nme_gfx_clear(this.nmeHandle);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		nme.display.Graphics.nme_gfx_curve_to(this.nmeHandle,inCX,inCY,inX,inY);
	}
	,cubicTo: function(inCx0,inCy0,inCx1,inCy1,inX,inY) {
		nme.display.Graphics.nme_gfx_cubic_to(this.nmeHandle,inCx0,inCy0,inCx1,inCy1,inX,inY);
	}
	,drawCircle: function(inX,inY,inRadius) {
		nme.display.Graphics.nme_gfx_draw_ellipse(this.nmeHandle,inX - inRadius,inY - inRadius,inRadius * 2,inRadius * 2);
	}
	,drawEllipse: function(inX,inY,inWidth,inHeight) {
		nme.display.Graphics.nme_gfx_draw_ellipse(this.nmeHandle,inX,inY,inWidth,inHeight);
	}
	,drawGraphicsData: function(graphicsData) {
		var handles = [];
		var _g = 0;
		while(_g < graphicsData.length) {
			var datum = graphicsData[_g];
			++_g;
			handles.push(datum.nmeHandle);
		}
		nme.display.Graphics.nme_gfx_draw_data(this.nmeHandle,handles);
	}
	,drawGraphicsDatum: function(graphicsDatum) {
		nme.display.Graphics.nme_gfx_draw_datum(this.nmeHandle,graphicsDatum.nmeHandle);
	}
	,drawPoints: function(inXY,inPointRGBA,inDefaultRGBA,inSize) {
		if(inSize == null) {
			inSize = -1.0;
		}
		if(inDefaultRGBA == null) {
			inDefaultRGBA = -1;
		}
		nme.display.Graphics.nme_gfx_draw_points(this.nmeHandle,inXY,inPointRGBA,inDefaultRGBA,false,inSize);
	}
	,drawRect: function(inX,inY,inWidth,inHeight) {
		nme.display.Graphics.nme_gfx_draw_rect(this.nmeHandle,inX,inY,inWidth,inHeight);
	}
	,drawRoundRect: function(inX,inY,inWidth,inHeight,inRadX,inRadY) {
		if(inRadX == 0 || inRadY == 0) {
			nme.display.Graphics.nme_gfx_draw_rect(this.nmeHandle,inX,inY,inWidth,inHeight);
		} else {
			nme.display.Graphics.nme_gfx_draw_round_rect(this.nmeHandle,inX,inY,inWidth,inHeight,inRadX,inRadY == null ? inRadX : inRadY);
		}
	}
	,drawPath: function(commands,data,winding) {
		if(winding == null) {
			winding = "evenOdd";
		}
		nme.display.Graphics.nme_gfx_draw_path(this.nmeHandle,commands,data,winding == "evenOdd");
	}
	,drawTiles: function(sheet,inXYID,inSmooth,inFlags,inCount) {
		if(inCount == null) {
			inCount = -1;
		}
		if(inFlags == null) {
			inFlags = 0;
		}
		if(inSmooth == null) {
			inSmooth = false;
		}
		this.beginBitmapFill(sheet.nmeBitmap,null,false,inSmooth);
		if(inSmooth) {
			inFlags |= 4096;
		}
		var buffer = ((inXYID) instanceof nme.utils.Float32Buffer) ? inXYID : null;
		if(buffer != null) {
			if(inCount < 0) {
				inCount = buffer.count;
			}
			nme.display.Graphics.nme_gfx_draw_tiles(this.nmeHandle,sheet.nmeHandle,buffer,inFlags,inCount);
		} else {
			nme.display.Graphics.nme_gfx_draw_tiles(this.nmeHandle,sheet.nmeHandle,inXYID,inFlags,inCount);
		}
	}
	,drawTriangles: function(vertices,indices,uvtData,culling,colours,blendMode) {
		if(blendMode == null) {
			blendMode = 0;
		}
		var cull = culling == null ? 0 : culling._hx_index - 1;
		nme.display.Graphics.nme_gfx_draw_triangles(this.nmeHandle,vertices,indices,uvtData,cull,colours,blendMode);
	}
	,endFill: function() {
		nme.display.Graphics.nme_gfx_end_fill(this.nmeHandle);
	}
	,lineBitmapStyle: function(bitmap,matrix,repeat,smooth) {
		if(smooth == null) {
			smooth = false;
		}
		if(repeat == null) {
			repeat = true;
		}
		nme.display.Graphics.nme_gfx_line_bitmap_fill(this.nmeHandle,bitmap.nmeHandle,matrix,repeat,smooth);
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		if(focalPointRatio == null) {
			focalPointRatio = 0.0;
		}
		if(matrix == null) {
			matrix = new nme.geom.Matrix();
			matrix.createGradientBox(200,200,0,-100,-100);
		}
		nme.display.Graphics.nme_gfx_begin_set_gradient_fill(this.nmeHandle,type._hx_index,colors,alphas,ratios,matrix,spreadMethod == null ? 0 : spreadMethod._hx_index,interpolationMethod == null ? 0 : interpolationMethod._hx_index,focalPointRatio,false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(miterLimit == null) {
			miterLimit = 3;
		}
		if(pixelHinting == null) {
			pixelHinting = false;
		}
		if(alpha == null) {
			alpha = 1.0;
		}
		if(color == null) {
			color = 0;
		}
		nme.display.Graphics.nme_gfx_line_style(this.nmeHandle,thickness,color,alpha,pixelHinting,scaleMode == null ? 0 : scaleMode._hx_index,caps == null ? 0 : caps._hx_index,joints == null ? 0 : joints._hx_index,miterLimit);
	}
	,lineTo: function(inX,inY) {
		nme.display.Graphics.nme_gfx_line_to(this.nmeHandle,inX,inY);
	}
	,moveTo: function(inX,inY) {
		nme.display.Graphics.nme_gfx_move_to(this.nmeHandle,inX,inY);
	}
	,__class__: nme.display.Graphics
};
nme.display.IGraphicsData = function(inHandle) {
	this.nmeHandle = inHandle;
};
$hxClasses["nme.display.IGraphicsData"] = nme.display.IGraphicsData;
nme.display.IGraphicsData.__name__ = "nme.display.IGraphicsData";
nme.display.IGraphicsData.prototype = {
	nmeHandle: null
	,__class__: nme.display.IGraphicsData
};
nme.display.GraphicsBitmapFill = function(bitmapData,matrix,repeat,smooth) {
	if(smooth == null) {
		smooth = false;
	}
	if(repeat == null) {
		repeat = true;
	}
	nme.display.IGraphicsData.call(this,nme.display.GraphicsBitmapFill.nme_graphics_solid_fill_create(0,1));
};
$hxClasses["nme.display.GraphicsBitmapFill"] = nme.display.GraphicsBitmapFill;
nme.display.GraphicsBitmapFill.__name__ = "nme.display.GraphicsBitmapFill";
nme.display.GraphicsBitmapFill.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsBitmapFill.prototype = $extend(nme.display.IGraphicsData.prototype,{
	__class__: nme.display.GraphicsBitmapFill
});
nme.display.GraphicsEndFill = function() {
	nme.display.IGraphicsData.call(this,nme.display.GraphicsEndFill.nme_graphics_end_fill_create());
};
$hxClasses["nme.display.GraphicsEndFill"] = nme.display.GraphicsEndFill;
nme.display.GraphicsEndFill.__name__ = "nme.display.GraphicsEndFill";
nme.display.GraphicsEndFill.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsEndFill.prototype = $extend(nme.display.IGraphicsData.prototype,{
	__class__: nme.display.GraphicsEndFill
});
nme.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) {
		focalPointRatio = 0;
	}
	nme.display.IGraphicsData.call(this,nme.display.GraphicsGradientFill.nme_graphics_solid_fill_create(0,1));
};
$hxClasses["nme.display.GraphicsGradientFill"] = nme.display.GraphicsGradientFill;
nme.display.GraphicsGradientFill.__name__ = "nme.display.GraphicsGradientFill";
nme.display.GraphicsGradientFill.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsGradientFill.prototype = $extend(nme.display.IGraphicsData.prototype,{
	__class__: nme.display.GraphicsGradientFill
});
nme.display.GraphicsPath = function(commands,data,winding) {
	if(winding == null) {
		winding = "evenOdd";
	}
	nme.display.IGraphicsData.call(this,nme.display.GraphicsPath.nme_graphics_path_create(commands,data,winding == "evenOdd"));
};
$hxClasses["nme.display.GraphicsPath"] = nme.display.GraphicsPath;
nme.display.GraphicsPath.__name__ = "nme.display.GraphicsPath";
nme.display.GraphicsPath.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsPath.prototype = $extend(nme.display.IGraphicsData.prototype,{
	curveTo: function(controlX,controlY,anchorX,anchorY) {
		nme.display.GraphicsPath.nme_graphics_path_curve_to(this.nmeHandle,controlX,controlY,anchorX,anchorY);
	}
	,cubicTo: function(cx0,cy0,cx1,cy1,x,y) {
		nme.display.GraphicsPath.nme_graphics_path_cubic_to(this.nmeHandle,cx0,cy0,cx1,cy1,x,y);
	}
	,lineTo: function(x,y) {
		nme.display.GraphicsPath.nme_graphics_path_line_to(this.nmeHandle,x,y);
	}
	,moveTo: function(x,y) {
		nme.display.GraphicsPath.nme_graphics_path_move_to(this.nmeHandle,x,y);
	}
	,wideLineTo: function(x,y) {
		nme.display.GraphicsPath.nme_graphics_path_wline_to(this.nmeHandle,x,y);
	}
	,wideMoveTo: function(x,y) {
		nme.display.GraphicsPath.nme_graphics_path_wmove_to(this.nmeHandle,x,y);
	}
	,get_commands: function() {
		var result = [];
		nme.display.GraphicsPath.nme_graphics_path_get_commands(this.nmeHandle,result);
		return result;
	}
	,set_commands: function(inCommands) {
		nme.display.GraphicsPath.nme_graphics_path_set_commands(this.nmeHandle,inCommands);
		return inCommands;
	}
	,get_data: function() {
		var result = [];
		nme.display.GraphicsPath.nme_graphics_path_get_data(this.nmeHandle,result);
		return result;
	}
	,set_data: function(inData) {
		nme.display.GraphicsPath.nme_graphics_path_set_data(this.nmeHandle,inData);
		return inData;
	}
	,__class__: nme.display.GraphicsPath
	,__properties__: {set_data:"set_data",get_data:"get_data",set_commands:"set_commands",get_commands:"get_commands"}
});
nme.display.GraphicsPathCommand = function() { };
$hxClasses["nme.display.GraphicsPathCommand"] = nme.display.GraphicsPathCommand;
nme.display.GraphicsPathCommand.__name__ = "nme.display.GraphicsPathCommand";
nme.display.GraphicsPathWinding = function() { };
$hxClasses["nme.display.GraphicsPathWinding"] = nme.display.GraphicsPathWinding;
nme.display.GraphicsPathWinding.__name__ = "nme.display.GraphicsPathWinding";
nme.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) {
		alpha = 1.0;
	}
	if(color == null) {
		color = 0;
	}
	nme.display.IGraphicsData.call(this,nme.display.GraphicsSolidFill.nme_graphics_solid_fill_create(color,alpha));
};
$hxClasses["nme.display.GraphicsSolidFill"] = nme.display.GraphicsSolidFill;
nme.display.GraphicsSolidFill.__name__ = "nme.display.GraphicsSolidFill";
nme.display.GraphicsSolidFill.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsSolidFill.prototype = $extend(nme.display.IGraphicsData.prototype,{
	__class__: nme.display.GraphicsSolidFill
});
nme.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) {
		miterLimit = 3;
	}
	if(pixelHinting == null) {
		pixelHinting = false;
	}
	if(thickness == null) {
		thickness = -1;
	}
	nme.display.IGraphicsData.call(this,nme.display.GraphicsStroke.nme_graphics_stroke_create(thickness,pixelHinting,scaleMode == null ? 0 : scaleMode._hx_index,caps == null ? 0 : caps._hx_index,joints == null ? 0 : joints._hx_index,miterLimit,fill == null ? null : fill.nmeHandle));
};
$hxClasses["nme.display.GraphicsStroke"] = nme.display.GraphicsStroke;
nme.display.GraphicsStroke.__name__ = "nme.display.GraphicsStroke";
nme.display.GraphicsStroke.__super__ = nme.display.IGraphicsData;
nme.display.GraphicsStroke.prototype = $extend(nme.display.IGraphicsData.prototype,{
	__class__: nme.display.GraphicsStroke
});
nme.display.InterpolationMethod = $hxEnums["nme.display.InterpolationMethod"] = { __ename__:"nme.display.InterpolationMethod",__constructs__:null
	,RGB: {_hx_name:"RGB",_hx_index:0,__enum__:"nme.display.InterpolationMethod",toString:$estr}
	,LINEAR_RGB: {_hx_name:"LINEAR_RGB",_hx_index:1,__enum__:"nme.display.InterpolationMethod",toString:$estr}
};
nme.display.InterpolationMethod.__constructs__ = [nme.display.InterpolationMethod.RGB,nme.display.InterpolationMethod.LINEAR_RGB];
nme.display.InterpolationMethod.__empty_constructs__ = [nme.display.InterpolationMethod.RGB,nme.display.InterpolationMethod.LINEAR_RGB];
nme.display.JointStyle = $hxEnums["nme.display.JointStyle"] = { __ename__:"nme.display.JointStyle",__constructs__:null
	,ROUND: {_hx_name:"ROUND",_hx_index:0,__enum__:"nme.display.JointStyle",toString:$estr}
	,MITER: {_hx_name:"MITER",_hx_index:1,__enum__:"nme.display.JointStyle",toString:$estr}
	,BEVEL: {_hx_name:"BEVEL",_hx_index:2,__enum__:"nme.display.JointStyle",toString:$estr}
};
nme.display.JointStyle.__constructs__ = [nme.display.JointStyle.ROUND,nme.display.JointStyle.MITER,nme.display.JointStyle.BEVEL];
nme.display.JointStyle.__empty_constructs__ = [nme.display.JointStyle.ROUND,nme.display.JointStyle.MITER,nme.display.JointStyle.BEVEL];
nme.display.LineScaleMode = $hxEnums["nme.display.LineScaleMode"] = { __ename__:"nme.display.LineScaleMode",__constructs__:null
	,NORMAL: {_hx_name:"NORMAL",_hx_index:0,__enum__:"nme.display.LineScaleMode",toString:$estr}
	,NONE: {_hx_name:"NONE",_hx_index:1,__enum__:"nme.display.LineScaleMode",toString:$estr}
	,VERTICAL: {_hx_name:"VERTICAL",_hx_index:2,__enum__:"nme.display.LineScaleMode",toString:$estr}
	,HORIZONTAL: {_hx_name:"HORIZONTAL",_hx_index:3,__enum__:"nme.display.LineScaleMode",toString:$estr}
	,OPENGL: {_hx_name:"OPENGL",_hx_index:4,__enum__:"nme.display.LineScaleMode",toString:$estr}
};
nme.display.LineScaleMode.__constructs__ = [nme.display.LineScaleMode.NORMAL,nme.display.LineScaleMode.NONE,nme.display.LineScaleMode.VERTICAL,nme.display.LineScaleMode.HORIZONTAL,nme.display.LineScaleMode.OPENGL];
nme.display.LineScaleMode.__empty_constructs__ = [nme.display.LineScaleMode.NORMAL,nme.display.LineScaleMode.NONE,nme.display.LineScaleMode.VERTICAL,nme.display.LineScaleMode.HORIZONTAL,nme.display.LineScaleMode.OPENGL];
nme.display.Sprite = function() {
	nme.display.DisplayObjectContainer.call(this,nme.display.DisplayObjectContainer.nme_create_display_object_container(),this.nmeGetType());
};
$hxClasses["nme.display.Sprite"] = nme.display.Sprite;
nme.display.Sprite.__name__ = "nme.display.Sprite";
nme.display.Sprite.__super__ = nme.display.DisplayObjectContainer;
nme.display.Sprite.prototype = $extend(nme.display.DisplayObjectContainer.prototype,{
	buttonMode: null
	,useHandCursor: null
	,nmeGetType: function() {
		var c = js.Boot.getClass(this);
		var type = c.__name__;
		var pos = type.lastIndexOf(".");
		if(pos >= 0) {
			return HxOverrides.substr(type,pos + 1,null);
		} else {
			return type;
		}
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) {
			lockCenter = false;
		}
		if(this.get_stage() != null) {
			this.get_stage().nmeStartDrag(this,lockCenter,bounds);
		}
	}
	,stopDrag: function() {
		if(this.get_stage() != null) {
			this.get_stage().nmeStopDrag(this);
		}
	}
	,__class__: nme.display.Sprite
});
nme.display.Loader = function() {
	nme.display.Sprite.call(this);
	this.contentLoaderInfo = nme.display.LoaderInfo.create(this);
	this.contentLoaderInfo.nmeOnComplete = $bind(this,this.doLoad);
};
$hxClasses["nme.display.Loader"] = nme.display.Loader;
nme.display.Loader.__name__ = "nme.display.Loader";
nme.display.Loader.__super__ = nme.display.Sprite;
nme.display.Loader.prototype = $extend(nme.display.Sprite.prototype,{
	content: null
	,contentLoaderInfo: null
	,nmeImage: null
	,doLoad: function(inBytes) {
		if(inBytes == null) {
			return false;
		}
		try {
			this.nmeImage = nme.display.BitmapData.loadFromBytes(inBytes);
			var bmp = new nme.display.Bitmap(this.nmeImage);
			this.content = bmp;
			this.contentLoaderInfo.content = bmp;
			while(this.get_numChildren() > 0) this.removeChildAt(0);
			this.addChild(bmp);
			return true;
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			return false;
		}
	}
	,load: function(request,context) {
		this.contentLoaderInfo.load(request);
	}
	,loadBytes: function(bytes,context) {
		if(this.doLoad(bytes)) {
			var event = new nme.events.Event("complete");
			event.set_currentTarget(this);
			this.contentLoaderInfo.dispatchEvent(event);
		} else {
			this.contentLoaderInfo.DispatchIOErrorEvent();
		}
	}
	,unload: function() {
		if(this.get_numChildren() > 0) {
			while(this.get_numChildren() > 0) this.removeChildAt(0);
			this.contentLoaderInfo.url = null;
			this.contentLoaderInfo.contentType = null;
			this.contentLoaderInfo.content = null;
			this.contentLoaderInfo.bytesLoaded = this.contentLoaderInfo.bytesTotal = 0;
			this.contentLoaderInfo.width = 0;
			this.contentLoaderInfo.height = 0;
			var event = new nme.events.Event("unload");
			event.set_currentTarget(this);
			this.dispatchEvent(event);
		}
	}
	,onData: function(event) {
		event.stopImmediatePropagation();
		this.doLoad(this.contentLoaderInfo.get_bytes());
	}
	,__class__: nme.display.Loader
});
nme.net = {};
nme.net.URLLoader = function(request) {
	nme.events.EventDispatcher.call(this);
	this.nmeHandle = null;
	this.bytesLoaded = 0;
	this.bytesTotal = -1;
	this.state = 0;
	this.dataFormat = nme.net.URLLoaderDataFormat.TEXT;
	if(request != null) {
		this.load(request);
	}
};
$hxClasses["nme.net.URLLoader"] = nme.net.URLLoader;
nme.net.URLLoader.__name__ = "nme.net.URLLoader";
nme.net.URLLoader.hasActive = function() {
	return !nme.net.URLLoader.activeLoaders.isEmpty();
};
nme.net.URLLoader.initialize = function(inCACertFilePath) {
	nme.net.URLLoader.nme_curl_initialize(inCACertFilePath);
};
nme.net.URLLoader.nmeLoadPending = function() {
	return !nme.net.URLLoader.activeLoaders.isEmpty();
};
nme.net.URLLoader.nmePollData = function() {
	if(!nme.net.URLLoader.activeLoaders.isEmpty()) {
		nme.net.URLLoader.pollLoaders();
		var oldLoaders = nme.net.URLLoader.activeLoaders;
		nme.net.URLLoader.activeLoaders = new haxe.ds.List();
		var _g_head = oldLoaders.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var loader = val;
			loader.update();
			if(loader.state == 2) {
				nme.net.URLLoader.activeLoaders.push(loader);
			}
		}
	}
};
nme.net.URLLoader.pollLoaders = function() {
	nme.net.URLLoader.nme_curl_process_loaders();
};
nme.net.URLLoader.__super__ = nme.events.EventDispatcher;
nme.net.URLLoader.prototype = $extend(nme.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,data: null
	,dataFormat: null
	,nmeHandle: null
	,state: null
	,nmeOnComplete: null
	,close: function() {
	}
	,load: function(request) {
		this.state = 1;
		var pref = HxOverrides.substr(request.url,0,7);
		if(pref != "http://" && pref != "https:/") {
			try {
				var bytes = nme.utils.ByteArray.readFile(request.url);
				if(bytes == null) {
					throw haxe.Exception.thrown("Could not open file \"" + request.url + "\"");
				}
				switch(this.dataFormat._hx_index) {
				case 1:
					this.data = bytes.asString();
					break;
				case 2:
					this.data = nme.net.URLVariables._new(bytes.asString());
					break;
				default:
					this.data = bytes;
				}
			} catch( _g ) {
				haxe.NativeStackTrace.lastError = _g;
				var e = haxe.Exception.caught(_g).unwrap();
				this.onError(e);
				return;
			}
			this.nmeDataComplete();
		} else {
			request.nmePrepare();
			this.nmeHandle = this.createLoader(request);
			if(this.nmeHandle == null) {
				this.onError("Could not open URL");
			} else {
				nme.NativeResource.nme_native_resource_lock(this.nmeHandle);
				nme.net.URLLoader.activeLoaders.push(this);
			}
		}
	}
	,nmeDataComplete: function() {
		nme.net.URLLoader.activeLoaders.remove(this);
		if(this.nmeOnComplete != null) {
			if(this.nmeOnComplete(this.data)) {
				this.dispatchEvent(new nme.events.Event("complete"));
			} else {
				this.DispatchIOErrorEvent();
			}
		} else {
			this.dispatchEvent(new nme.events.Event("complete"));
		}
		this.disposeHandler();
	}
	,onError: function(msg) {
		nme.net.URLLoader.activeLoaders.remove(this);
		this.dispatchEvent(new nme.events.IOErrorEvent("ioError",true,false,msg));
		this.disposeHandler();
	}
	,dispatchHTTPStatus: function(code) {
		var evt = new nme.events.HTTPStatusEvent("httpStatus",false,false,code);
		var headers = this.getHeaders();
		var _g = 0;
		while(_g < headers.length) {
			var h = headers[_g];
			++_g;
			var idx = h.indexOf(": ");
			if(idx > 0) {
				evt.responseHeaders.push(new nme.net.URLRequestHeader(HxOverrides.substr(h,0,idx),HxOverrides.substr(h,idx + 2,h.length - idx - 4)));
			}
		}
		this.dispatchEvent(evt);
	}
	,update: function() {
		if(this.nmeHandle != null) {
			var old_loaded = this.bytesLoaded;
			var old_total = this.bytesTotal;
			this.updateLoader();
			if(old_total < 0 && this.bytesTotal > 0) {
				this.dispatchEvent(new nme.events.Event("open"));
			}
			if(this.bytesTotal > 0 && this.bytesLoaded != old_loaded) {
				this.dispatchEvent(new nme.events.ProgressEvent("progress",false,false,this.bytesLoaded,this.bytesTotal));
			}
			var code = this.getCode();
			if(this.state == 3) {
				this.dispatchHTTPStatus(code);
				if(code < 400) {
					switch(this.dataFormat._hx_index) {
					case 1:case 2:
						this.data = this.getString();
						break;
					default:
						this.data = this.getData();
					}
					this.nmeDataComplete();
				} else {
					var evt = new nme.events.IOErrorEvent("ioError",true,false,"HTTP status code " + (code == null ? "null" : "" + code),code);
					this.dispatchEvent(evt);
					this.disposeHandler();
				}
			} else if(this.state == 4) {
				this.dispatchHTTPStatus(code);
				var evt = new nme.events.IOErrorEvent("ioError",true,false,this.getErrorMessage(),code);
				this.dispatchEvent(evt);
				this.disposeHandler();
			}
		}
	}
	,getErrorMessage: function() {
		return nme.net.URLLoader.nme_curl_get_error_message(this.nmeHandle);
	}
	,getData: function() {
		return nme.net.URLLoader.nme_curl_get_data(this.nmeHandle);
	}
	,getString: function() {
		var bytes = this.getData();
		if(bytes == null) {
			return "";
		} else {
			return bytes.asString();
		}
	}
	,getCode: function() {
		return nme.net.URLLoader.nme_curl_get_code(this.nmeHandle);
	}
	,updateLoader: function() {
		nme.net.URLLoader.nme_curl_update_loader(this.nmeHandle,this);
	}
	,getHeaders: function() {
		return nme.net.URLLoader.nme_curl_get_headers(this.nmeHandle);
	}
	,createLoader: function(request) {
		return nme.net.URLLoader.nme_curl_create(request);
	}
	,getCookies: function() {
		return nme.net.URLLoader.nme_curl_get_cookies(this.nmeHandle);
	}
	,disposeHandler: function() {
		if(this.nmeHandle != null) {
			nme.NativeResource.nme_native_resource_dispose(this.nmeHandle);
			this.nmeHandle = null;
		}
	}
	,__class__: nme.net.URLLoader
});
nme.display.LoaderInfo = function() {
	nme.net.URLLoader.call(this);
	this.childAllowsParent = true;
	this.frameRate = 0;
	this.dataFormat = nme.net.URLLoaderDataFormat.BINARY;
	this.loaderURL = null;
	this.addEventListener("complete",$bind(this,this.onURLLoaded));
};
$hxClasses["nme.display.LoaderInfo"] = nme.display.LoaderInfo;
nme.display.LoaderInfo.__name__ = "nme.display.LoaderInfo";
nme.display.LoaderInfo.create = function(ldr) {
	var li = new nme.display.LoaderInfo();
	li.loader = ldr;
	if(ldr == null) {
		li.url = "";
	}
	return li;
};
nme.display.LoaderInfo.__super__ = nme.net.URLLoader;
nme.display.LoaderInfo.prototype = $extend(nme.net.URLLoader.prototype,{
	bytes: null
	,childAllowsParent: null
	,content: null
	,contentType: null
	,frameRate: null
	,height: null
	,loader: null
	,loaderURL: null
	,parameters: null
	,parentAllowsChild: null
	,sameDomain: null
	,sharedEvents: null
	,url: null
	,width: null
	,pendingURL: null
	,load: function(request) {
		this.pendingURL = request.url;
		var dot = this.pendingURL.lastIndexOf(".");
		var extension = dot > 0 ? HxOverrides.substr(this.pendingURL,dot + 1,null).toLowerCase() : "";
		if(request.contentType == null || request.contentType.length == 0 || request.contentType == "application/x-www-form-urlencoded") {
			var tmp;
			switch(extension) {
			case "gif":
				tmp = "image/gif";
				break;
			case "jpeg":case "jpg":
				tmp = "image/jpeg";
				break;
			case "png":
				tmp = "image/png";
				break;
			case "swf":
				tmp = "application/x-shockwave-flash";
				break;
			default:
				throw haxe.Exception.thrown("Unrecognized file " + this.pendingURL);
			}
			this.contentType = tmp;
		}
		this.url = null;
		nme.net.URLLoader.prototype.load.call(this,request);
	}
	,onURLLoaded: function(event) {
		this.url = this.pendingURL;
	}
	,get_bytes: function() {
		return this.data;
	}
	,__class__: nme.display.LoaderInfo
	,__properties__: {get_bytes:"get_bytes"}
});
nme.display.Stage = function(inWindow) {
	this.nmeEnterFrameEvent = new nme.events.Event("enterFrame");
	this.nmeRenderEvent = new nme.events.Event("render");
	this.nmeIsMainStage = nme.display.Stage.firstStage;
	nme.display.Stage.firstStage = false;
	this.window = inWindow;
	this.invalid = false;
	nme.display.DisplayObjectContainer.call(this,this.window.nmeStageHandle,"Stage");
	this.nmeMouseOverObjects = [];
	this.nmeFocusOverObjects = [];
	this.pauseWhenDeactivated = true;
	this.window.stage = this;
	if(this.window.appEventHandler == null) {
		if(this.nmeIsMainStage) {
			nme.app.Application.addPollClient(this);
		}
		this.window.appEventHandler = this;
		this.nmeFrameTimer = new nme.app.FrameTimer(this.window,nme.app.Application.initFrameRate);
	}
	if(!this.nmeIsMainStage) {
		this.onCloseRequest = ($_=this.window,$bind($_,$_.close));
	}
	this.nmeLastRender = 0;
	this.nmeLastDown = [];
	this.nmeLastClickTime = 0.0;
	this.nmeTouchInfo = new haxe.ds.IntMap();
	this.nmeJoyAxisData = [];
	var this1 = [];
	this.stageVideos = this1;
	this.stageVideos[0] = new nme.media.StageVideo(this);
};
$hxClasses["nme.display.Stage"] = nme.display.Stage;
nme.display.Stage.__name__ = "nme.display.Stage";
nme.display.Stage.__interfaces__ = [nme.app.IAppEventHandler,nme.app.IPollClient];
nme.display.Stage.getOrientation = function() {
	return nme.display.Stage.nme_stage_get_orientation();
};
nme.display.Stage.getNormalOrientation = function() {
	return nme.display.Stage.nme_stage_get_normal_orientation();
};
nme.display.Stage.setFixedOrientation = function(inOrientation) {
	nme.app.Application.setFixedOrientation(inOrientation);
};
nme.display.Stage.shouldRotateInterface = function(inOrientation) {
	return true;
};
nme.display.Stage.__super__ = nme.display.DisplayObjectContainer;
nme.display.Stage.prototype = $extend(nme.display.DisplayObjectContainer.prototype,{
	window: null
	,onCloseRequest: null
	,exceptionHandler: null
	,pauseWhenDeactivated: null
	,current: null
	,safeRect: null
	,invalid: null
	,stageVideos: null
	,nmeJoyAxisData: null
	,nmeDragBounds: null
	,nmeDragObject: null
	,nmeDragOffsetX: null
	,nmeDragOffsetY: null
	,nmeFocusOverObjects: null
	,nmeFramePeriod: null
	,nmeLastClickTime: null
	,nmeLastDown: null
	,nmeLastRender: null
	,nmeMouseOverObjects: null
	,nmeTouchInfo: null
	,nmeFrameTimer: null
	,nmeEnterFrameEvent: null
	,nmeRenderEvent: null
	,nmeDropItems: null
	,nmeCurrent: null
	,nmePrenderListeners: null
	,nmeIsMainStage: null
	,dispose: function() {
		if(this.nmeFrameTimer != null) {
			this.nmeFrameTimer.destory();
			this.nmeFrameTimer = null;
		}
		nme.display.DisplayObjectContainer.prototype.dispose.call(this);
	}
	,invalidate: function() {
		this.invalid = true;
		if(this.nmeFrameTimer != null) {
			this.nmeFrameTimer.invalidate();
		}
	}
	,isDisplayListDirty: function() {
		var result = nme.display.Stage.nme_stage_check_cache(this.nmeHandle);
		return result;
	}
	,get_onQuit: function() {
		return nme.app.Application.onQuit;
	}
	,set_onQuit: function(val) {
		nme.app.Application.onQuit = val;
		return val;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) {
			useWeakReference = false;
		}
		if(priority == null) {
			priority = 0;
		}
		if(useCapture == null) {
			useCapture = false;
		}
		nme.display.DisplayObjectContainer.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		if(type == "stageVideoAvailability") {
			this.dispatchEvent(new nme.events.StageVideoAvailabilityEvent("stageVideoAvailability",false,false,"available"));
		}
	}
	,nmeCheckFocusInOuts: function(inEvent,inStack) {
		var new_n = inStack.length;
		var new_obj = new_n > 0 ? inStack[new_n - 1] : null;
		var old_n = this.nmeFocusOverObjects.length;
		var old_obj = old_n > 0 ? this.nmeFocusOverObjects[old_n - 1] : null;
		if(new_obj != old_obj) {
			if(old_obj != null) {
				var focusOut = new nme.events.FocusEvent("focusOut",true,false,new_obj,inEvent.flags > 0,inEvent.code);
				focusOut.set_target(old_obj);
				old_obj.nmeFireEvent(focusOut);
			}
			if(new_obj != null) {
				var focusIn = new nme.events.FocusEvent("focusIn",true,false,old_obj,inEvent.flags > 0,inEvent.code);
				focusIn.set_target(new_obj);
				new_obj.nmeFireEvent(focusIn);
			}
			this.nmeFocusOverObjects = inStack;
		}
	}
	,nmeCheckInOuts: function(inEvent,inStack,touchInfo) {
		var prev = touchInfo == null ? this.nmeMouseOverObjects : touchInfo.touchOverObjects;
		var events = touchInfo == null ? nme.display.Stage.nmeMouseChanges : nme.display.Stage.nmeTouchChanges;
		var new_n = inStack.length;
		var new_obj = new_n > 0 ? inStack[new_n - 1] : null;
		var old_n = prev.length;
		var old_obj = old_n > 0 ? prev[old_n - 1] : null;
		if(new_obj != old_obj) {
			if(old_obj != null) {
				old_obj.nmeFireEvent(inEvent.nmeCreateSimilar(events[0],new_obj,old_obj));
			}
			if(new_obj != null) {
				new_obj.nmeFireEvent(inEvent.nmeCreateSimilar(events[1],old_obj));
			}
			var common = 0;
			while(common < new_n && common < old_n && inStack[common] == prev[common]) ++common;
			var rollOut = inEvent.nmeCreateSimilar(events[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].nmeDispatchEvent(rollOut);
				--i;
			}
			var rollOver = inEvent.nmeCreateSimilar(events[3],old_obj);
			var i = new_n - 1;
			while(i >= common) {
				inStack[i].nmeDispatchEvent(rollOver);
				--i;
			}
			if(touchInfo == null) {
				this.nmeMouseOverObjects = inStack;
			} else {
				touchInfo.touchOverObjects = inStack;
			}
			return false;
		}
		return true;
	}
	,addPrerenderListener: function(listener) {
		if(this.nmePrenderListeners == null) {
			this.nmePrenderListeners = [listener];
		} else {
			this.nmePrenderListeners.push(listener);
		}
	}
	,removePrerenderListener: function(listener) {
		if(this.nmePrenderListeners != null && HxOverrides.remove(this.nmePrenderListeners,listener) && this.nmePrenderListeners.length == 0) {
			this.nmePrenderListeners = null;
		}
	}
	,onText: function(inEvent,type) {
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null && ((obj) instanceof nme.text.TextField)) {
			var text = null;
			if(inEvent.code > 0) {
				var code = inEvent.code;
				text = String.fromCodePoint(code);
			} else {
				text = inEvent.text;
			}
			var evt = new nme.events.TextEvent(type,true,true,text);
			evt.set_target(obj);
			obj.nmeFireEvent(evt);
			if(evt.nmeGetIsCancelled()) {
				inEvent.result = 1;
			}
		}
	}
	,onKey: function(inEvent,type) {
		var stack = [];
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeGetInteractiveObjectStack(stack);
		}
		if(stack.length > 0) {
			var value = inEvent.value;
			var obj = stack[0];
			var flags = inEvent.flags;
			var evt = new nme.events.KeyboardEvent(type,true,true,inEvent.code,value,(flags & nme.display.Stage.efLocationRight) == 0 ? 1 : 0,(flags & nme.display.Stage.efCtrlDown) != 0,(flags & nme.display.Stage.efAltDown) != 0,(flags & nme.display.Stage.efShiftDown) != 0,(flags & nme.display.Stage.efCtrlDown) != 0,(flags & nme.display.Stage.efCommandDown) != 0);
			obj.nmeFireEvent(evt);
			if(evt.nmeGetIsCancelled()) {
				inEvent.result = 1;
			}
		}
	}
	,onMouse: function(inEvent,inType,inFromMouse) {
		var type = inType;
		var button = inEvent.value;
		if(!inFromMouse) {
			button = 0;
		}
		var wheel = 0;
		if(inType == "mouseDown") {
			if(button > 2) {
				return;
			}
			type = nme.display.Stage.sDownEvents[button];
		} else if(inType == "mouseUp") {
			if(button > 2) {
				type = "mouseWheel";
				wheel = button == 3 ? 1 : -1;
			} else {
				type = nme.display.Stage.sUpEvents[button];
			}
		}
		if(this.nmeDragObject != null) {
			this.nmeDrag(new nme.geom.Point(inEvent.x,inEvent.y));
		}
		var stack = [];
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeGetInteractiveObjectStack(stack);
		}
		var local = null;
		var evt = null;
		var cancelClick = false;
		if(stack.length > 0) {
			var obj = stack[0];
			stack.reverse();
			local = obj.globalToLocal(new nme.geom.Point(inEvent.x,inEvent.y));
			evt = nme.events.MouseEvent.nmeCreate(type,inEvent,local,obj);
			evt.delta = wheel;
			if(inFromMouse) {
				this.nmeCheckInOuts(evt,stack);
			}
			obj.nmeFireEvent(evt);
			cancelClick = evt.cancelClick;
		} else {
			local = new nme.geom.Point(inEvent.x,inEvent.y);
			evt = nme.events.MouseEvent.nmeCreate(type,inEvent,local,null);
			evt.delta = wheel;
			if(inFromMouse) {
				this.nmeCheckInOuts(evt,stack);
			}
		}
		var click_obj = stack.length > 0 ? stack[stack.length - 1] : this;
		if(inType == "mouseDown" && button < 3) {
			this.nmeLastDown[button] = evt.clickCancelled ? null : click_obj;
		} else if(inType == "mouseUp" && button < 3) {
			if(click_obj == this.nmeLastDown[button] && !cancelClick) {
				var evt = nme.events.MouseEvent.nmeCreate(nme.display.Stage.sClickEvents[button],inEvent,local,click_obj);
				click_obj.nmeFireEvent(evt);
				if(button == 0 && click_obj.doubleClickEnabled) {
					var now = inEvent.pollTime;
					if(now - this.nmeLastClickTime < 0.25) {
						var evt = nme.events.MouseEvent.nmeCreate("doubleClick",inEvent,local,click_obj);
						click_obj.nmeFireEvent(evt);
					}
					this.nmeLastClickTime = now;
				}
			}
			this.nmeLastDown[button] = null;
		}
	}
	,onUnhandledException: function(exception,stack) {
		if(this.exceptionHandler != null) {
			this.exceptionHandler(exception,stack);
		} else {
			haxe.Log.trace("Exception: " + Std.string(exception) + "\n" + haxe.CallStack.toString(stack),{ fileName : "../../src/nme/display/Stage.hx", lineNumber : 531, className : "nme.display.Stage", methodName : "onUnhandledException"});
			haxe.Log.trace("\n\n\n===Terminating===\n.",{ fileName : "../../src/nme/display/Stage.hx", lineNumber : 532, className : "nme.display.Stage", methodName : "onUnhandledException"});
			throw haxe.Exception.thrown("Unhandled exception:" + Std.string(exception));
		}
	}
	,onTouch: function(inEvent,inType) {
		if(inType == "touchTap") {
			return;
		}
		if(inType == "touchBegin") {
			var touchInfo = new nme.display.TouchInfo();
			this.nmeTouchInfo.h[inEvent.value] = touchInfo;
			this.nmeOnTouch(inEvent,"touchBegin",touchInfo);
			return;
		}
		var touchInfo = this.nmeTouchInfo.h[inEvent.value];
		this.nmeOnTouch(inEvent,inType,touchInfo);
		if(inType == "touchEnd") {
			this.nmeTouchInfo.remove(inEvent.value);
		}
	}
	,onResize: function(width,height) {
		var evt = new nme.events.Event("resize");
		this.nmeDispatchEvent(evt);
	}
	,onRender: function(inFrameDue) {
		if(inFrameDue) {
			this.nmeBroadcast(this.nmeEnterFrameEvent);
		}
		if(this.invalid) {
			this.invalid = false;
			this.nmeBroadcast(this.nmeRenderEvent);
		}
		if(this.nmePrenderListeners != null) {
			var _g = 0;
			var _g1 = this.nmePrenderListeners;
			while(_g < _g1.length) {
				var listener = _g1[_g];
				++_g;
				listener();
			}
		}
		nme.display.Stage.nme_render_stage(this.nmeHandle);
	}
	,onDisplayObjectFocus: function(inEvent) {
		var stack = [];
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeGetInteractiveObjectStack(stack);
		}
		if(stack.length > 0 && (inEvent.value == 1 || inEvent.value == 2)) {
			var obj = stack[0];
			var evt = new nme.events.FocusEvent(inEvent.value == 1 ? "mouseFocusChange" : "keyFocusChange",true,true,this.nmeFocusOverObjects.length == 0 ? null : this.nmeFocusOverObjects[0],inEvent.flags > 0,inEvent.code);
			obj.nmeFireEvent(evt);
			if(evt.nmeGetIsCancelled()) {
				inEvent.result = 1;
				return;
			}
		}
		stack.reverse();
		this.nmeCheckFocusInOuts(inEvent,stack);
	}
	,onInputFocus: function(acquired) {
		var evt = new nme.events.Event(acquired ? "focusIn" : "focusOut");
		this.nmeDispatchEvent(evt);
	}
	,onRotateRequest: function(inDirection) {
		return nme.display.Stage.shouldRotateInterface(inDirection);
	}
	,onChange: function(inEvent) {
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeFireEvent(new nme.events.Event("change"));
		}
	}
	,onScroll: function(inEvent) {
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeFireEvent(new nme.events.Event("scroll"));
		}
	}
	,onWindowClose: function() {
		if(this.onCloseRequest != null) {
			this.onCloseRequest();
		}
	}
	,onDrop: function(inEvent) {
		if(inEvent.type == 37) {
			this.nmeDropItems = [];
		} else if(inEvent.type == 39) {
			if(this.nmeDropItems != null) {
				var stack = [];
				var obj = this.nmeFindByID(inEvent.id);
				if(obj != null) {
					obj.nmeGetInteractiveObjectStack(stack);
				}
				var local = null;
				if(stack.length > 0) {
					var obj = stack[0];
					stack.reverse();
					local = obj.globalToLocal(new nme.geom.Point(inEvent.x,inEvent.y));
					var evt = nme.events.DropEvent.nmeCreate(nme.events.DropEvent.DROP_FILES,inEvent,local,obj,this.nmeDropItems);
					evt.items = this.nmeDropItems;
					obj.nmeFireEvent(evt);
				}
				this.nmeDropItems = null;
			}
		} else if(inEvent.type == 38) {
			if(this.nmeDropItems != null) {
				this.nmeDropItems.push(inEvent.text);
			}
		}
	}
	,onDpiChanged: function(inEvent) {
		this.nmeDispatchEvent(new nme.events.Event("dpiChanged"));
	}
	,onActive: function(inActive) {
		if(inActive != this.get_active()) {
			this.window.active = inActive;
			if(!this.get_active()) {
				this.nmeLastRender = haxe.Timer.stamp();
			}
			var evt = new nme.events.Event(inActive ? "activate" : "deactivate");
			this.nmeBroadcast(evt);
		}
	}
	,onWindowMoved: function(inX,inY) {
		this.nmeBroadcast(new nme.events.MoveEvent(nme.events.MoveEvent.WINDOW_MOVED,null,null,inX,inY));
	}
	,onWindowEnter: function() {
		this.nmeBroadcast(new nme.events.Event("mouseEnter"));
	}
	,onWindowLeave: function() {
		this.nmeBroadcast(new nme.events.Event("mouseLeave"));
	}
	,axismap: function(code) {
		return code;
	}
	,buttonmap: function(code) {
		return code;
	}
	,onJoystick: function(inEvent,inType) {
		var data = null;
		var user = inEvent.value;
		var isGamePad = inEvent.y > 0;
		if(inEvent.flags > 0) {
			if(inEvent.flags == 1) {
				if(this.nmeJoyAxisData[user] == null) {
					this.nmeJoyAxisData[user] = [0.0,0.0,0.0,0.0,0.0,0.0];
				}
				data = this.nmeJoyAxisData[user];
				data[inEvent.code] = inEvent.sx;
				data[inEvent.code + 1] = inEvent.sy;
			} else if(inEvent.flags == 3) {
				if(this.nmeJoyAxisData[user] == null) {
					this.nmeJoyAxisData[user] = [0.0,0.0,0.0,0.0,0.0,0.0];
				}
				data = this.nmeJoyAxisData[user];
				data[inEvent.code] = inEvent.sx;
				data[inEvent.code + 1] = inEvent.sy;
			} else if(inEvent.flags == 2) {
				if(this.nmeJoyAxisData[user] != null) {
					var _g = 0;
					var _g1 = this.nmeJoyAxisData[user];
					while(_g < _g1.length) {
						var d = _g1[_g];
						++_g;
						d = 0.0;
					}
				}
			}
		}
		var evt = new nme.events.JoystickEvent(inType,false,false,inEvent.id,inEvent.code,inEvent.value,inEvent.sx,inEvent.sy,data,isGamePad);
		this.nmeDispatchEvent(evt);
		if(nme.ui.GameInput.hasInstances()) {
			if(inType == "deviceAdded") {
				nme.ui.GameInput.nmeGamepadConnect(user);
			} else if(inType == "deviceRemoved") {
				nme.ui.GameInput.nmeGamepadDisconnect(user);
			} else if(inType == "axisMove") {
				nme.ui.GameInput.nmeGamepadAxisMove(user,inEvent.code,inEvent.sx);
				nme.ui.GameInput.nmeGamepadAxisMove(user,inEvent.code + 1,inEvent.sy);
			} else if(inType == "buttonDown") {
				nme.ui.GameInput.nmeGamepadButton(user,inEvent.code,1);
			} else if(inType == "buttonUp") {
				nme.ui.GameInput.nmeGamepadButton(user,inEvent.code,0);
			} else if(inType == "hatMove") {
				nme.ui.GameInput.nmeGamepadButton(user,11,inEvent.sy > 0.0 ? 1 : 0);
				nme.ui.GameInput.nmeGamepadButton(user,12,inEvent.sy < 0.0 ? 1 : 0);
				nme.ui.GameInput.nmeGamepadButton(user,13,inEvent.sx < 0.0 ? 1 : 0);
				nme.ui.GameInput.nmeGamepadButton(user,14,inEvent.sx > 0.0 ? 1 : 0);
			}
		}
	}
	,onSysMessage: function(inEvent) {
		var evt = new nme.events.SystemEvent("system",false,false,inEvent.value);
		this.nmeDispatchEvent(evt);
	}
	,onAppLink: function(inEvent) {
		var evt = new nme.events.AppLinkEvent(nme.events.AppLinkEvent.APP_LINK,false,false);
		evt.url = inEvent.text;
		this.nmeDispatchEvent(evt);
	}
	,onContextLost: function() {
		var evt = new nme.events.Event("context3DLost");
		this.nmeBroadcast(evt);
	}
	,nmeDrag: function(inMouse) {
		var p = this.nmeDragObject.get_parent();
		if(p != null) {
			inMouse = p.globalToLocal(inMouse);
		}
		var x = inMouse.x + this.nmeDragOffsetX;
		var y = inMouse.y + this.nmeDragOffsetY;
		if(this.nmeDragBounds != null) {
			if(x < this.nmeDragBounds.x) {
				x = this.nmeDragBounds.x;
			} else if(x > this.nmeDragBounds.get_right()) {
				x = this.nmeDragBounds.get_right();
			}
			if(y < this.nmeDragBounds.y) {
				y = this.nmeDragBounds.y;
			} else if(y > this.nmeDragBounds.get_bottom()) {
				y = this.nmeDragBounds.get_bottom();
			}
		}
		this.nmeDragObject.set_x(x);
		this.nmeDragObject.set_y(y);
	}
	,set_opaqueBackground: function(inBG) {
		this.window.setBackground(inBG);
		if(inBG == null) {
			nme.display.DisplayObject.nme_display_object_set_bg(this.nmeHandle,0);
		} else {
			nme.display.DisplayObject.nme_display_object_set_bg(this.nmeHandle,inBG | -16777216);
		}
		return inBG;
	}
	,set_color: function(inColor) {
		this.set_opaqueBackground(inColor);
		return inColor;
	}
	,get_color: function() {
		var col = this.get_opaqueBackground();
		if(col == null) {
			return 0;
		} else {
			return col;
		}
	}
	,get_current: function() {
		if(this.nmeCurrent == null) {
			this.nmeCurrent = new nme.display.MovieClip();
			this.addChild(this.nmeCurrent);
		}
		return this.nmeCurrent;
	}
	,get_captureMouse: function() {
		return nme.display.Stage.nme_stage_get_capture_mouse(this.nmeHandle);
	}
	,set_captureMouse: function(val) {
		return nme.display.Stage.nme_stage_set_capture_mouse(this.nmeHandle,val);
	}
	,nmeOnTouch: function(inEvent,inType,touchInfo) {
		var stack = [];
		var obj = this.nmeFindByID(inEvent.id);
		if(obj != null) {
			obj.nmeGetInteractiveObjectStack(stack);
		}
		if(stack.length > 0) {
			var obj = stack[0];
			stack.reverse();
			var local = obj.globalToLocal(new nme.geom.Point(inEvent.x,inEvent.y));
			var evt = nme.events.TouchEvent.nmeCreate(inType,inEvent,local,obj,inEvent.sx,inEvent.sy);
			evt.touchPointID = inEvent.value;
			evt.isPrimaryTouchPoint = (inEvent.flags & 32768) > 0;
			this.nmeCheckInOuts(evt,stack,touchInfo);
			obj.nmeFireEvent(evt);
			if(evt.isPrimaryTouchPoint && inType == "touchMove") {
				if(this.nmeDragObject != null) {
					this.nmeDrag(new nme.geom.Point(inEvent.x,inEvent.y));
				}
				var evt = nme.events.MouseEvent.nmeCreate("mouseMove",inEvent,local,obj);
				obj.nmeFireEvent(evt);
			}
		} else {
			var evt = nme.events.TouchEvent.nmeCreate(inType,inEvent,new nme.geom.Point(inEvent.x,inEvent.y),null,inEvent.sx,inEvent.sy);
			evt.touchPointID = inEvent.value;
			evt.isPrimaryTouchPoint = (inEvent.flags & 32768) > 0;
			this.nmeCheckInOuts(evt,stack,touchInfo);
		}
	}
	,onPoll: function(inTimestamp) {
		nme.media.SoundChannel.nmePollComplete();
		nme.net.URLLoader.nmePollData();
	}
	,getNextWake: function(inDefaultWake,inTimestamp) {
		var wake = inDefaultWake;
		if(wake > 0.001 && nme.media.SoundChannel.nmeDynamicSoundCount > 0) {
			wake = 0.001;
		}
		if(wake > 0.02 && (nme.media.SoundChannel.nmeCompletePending() || nme.net.URLLoader.nmeLoadPending())) {
			wake = this.get_active() || !this.pauseWhenDeactivated ? 0.020 : 0.500;
		}
		return wake;
	}
	,nmeStartDrag: function(sprite,lockCenter,bounds) {
		this.nmeDragBounds = bounds == null ? null : bounds.clone();
		this.nmeDragObject = sprite;
		if(this.nmeDragObject != null) {
			if(lockCenter) {
				this.nmeDragOffsetX = -this.nmeDragObject.get_width() / 2;
				this.nmeDragOffsetY = -this.nmeDragObject.get_height() / 2;
			} else {
				var mouse = new nme.geom.Point(this.get_mouseX(),this.get_mouseY());
				var p = this.nmeDragObject.get_parent();
				if(p != null) {
					mouse = p.globalToLocal(mouse);
				}
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - mouse.x;
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - mouse.y;
			}
		}
	}
	,nmeStopDrag: function(sprite) {
		this.nmeDragBounds = null;
		this.nmeDragObject = null;
	}
	,setPreemtiveGcFrequency: function(inFrames) {
	}
	,setSmartPreemtiveGc: function() {
		this.setPreemtiveGcFrequency(-1);
	}
	,showCursor: function(inShow) {
		nme.display.Stage.nme_stage_show_cursor(this.nmeHandle,inShow);
	}
	,get_focus: function() {
		var id = nme.display.Stage.nme_stage_get_focus_id(this.nmeHandle);
		var obj = this.nmeFindByID(id);
		return obj;
	}
	,set_focus: function(inObject) {
		if(inObject == null) {
			nme.display.Stage.nme_stage_set_focus(this.nmeHandle,null);
		} else {
			nme.display.Stage.nme_stage_set_focus(this.nmeHandle,inObject.nmeHandle);
		}
		return inObject;
	}
	,set_frameRate: function(inRate) {
		if(this.nmeFrameTimer != null) {
			this.nmeFrameTimer.set_fps(inRate);
		}
		return inRate;
	}
	,get_frameRate: function() {
		if(this.nmeFrameTimer == null) {
			return 0;
		} else {
			return this.nmeFrameTimer.fps;
		}
	}
	,get_stage: function() {
		return this;
	}
	,get_safeRect: function() {
		var rect = new nme.geom.Rectangle();
		nme.display.Stage.nme_stage_get_safe_rect(this.nmeHandle,rect);
		return rect;
	}
	,resize: function(width,height) {
		this.window.resize(width,height);
	}
	,get_stageFocusRect: function() {
		return nme.display.Stage.nme_stage_get_focus_rect(this.nmeHandle);
	}
	,set_stageFocusRect: function(inVal) {
		nme.display.Stage.nme_stage_set_focus_rect(this.nmeHandle,inVal);
		return inVal;
	}
	,get_active: function() {
		return this.window.active;
	}
	,get_align: function() {
		return this.window.get_align();
	}
	,set_align: function(inMode) {
		return this.window.set_align(inMode);
	}
	,get_displayState: function() {
		return this.window.get_displayState();
	}
	,set_displayState: function(inState) {
		return this.window.set_displayState(inState);
	}
	,get_dpiScale: function() {
		return this.window.get_dpiScale();
	}
	,get_quality: function() {
		return this.window.get_quality();
	}
	,set_quality: function(inQuality) {
		return this.window.set_quality(inQuality);
	}
	,get_scaleMode: function() {
		return this.window.get_scaleMode();
	}
	,set_scaleMode: function(inMode) {
		return this.window.set_scaleMode(inMode);
	}
	,get_stageHeight: function() {
		return this.window.get_height();
	}
	,get_stageWidth: function() {
		return this.window.get_width();
	}
	,get_isOpenGL: function() {
		return this.window.get_isOpenGL();
	}
	,get_renderRequest: function() {
		return this.window.renderRequest;
	}
	,set_renderRequest: function(f) {
		return this.window.renderRequest = f;
	}
	,__class__: nme.display.Stage
	,__properties__: $extend(nme.display.DisplayObjectContainer.prototype.__properties__,{get_safeRect:"get_safeRect",get_current:"get_current",set_color:"set_color",get_color:"get_color",set_renderRequest:"set_renderRequest",get_renderRequest:"get_renderRequest",get_stageWidth:"get_stageWidth",get_stageHeight:"get_stageHeight",set_captureMouse:"set_captureMouse",get_captureMouse:"get_captureMouse",set_stageFocusRect:"set_stageFocusRect",get_stageFocusRect:"get_stageFocusRect",set_scaleMode:"set_scaleMode",get_scaleMode:"get_scaleMode",set_quality:"set_quality",get_quality:"get_quality",get_isOpenGL:"get_isOpenGL",set_onQuit:"set_onQuit",get_onQuit:"get_onQuit",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",set_focus:"set_focus",get_focus:"get_focus",get_dpiScale:"get_dpiScale",set_displayState:"set_displayState",get_displayState:"get_displayState",set_align:"set_align",get_align:"get_align",get_active:"get_active"})
});
nme.display.ManagedStage = function(inWidth,inHeight,inFlags) {
	if(inFlags == null) {
		inFlags = 0;
	}
	var managedStage = nme.display.ManagedStage.nme_managed_stage_create(inWidth,inHeight,inFlags);
	var managedWindow = new nme.app.Window(managedStage,inWidth,inHeight);
	nme.display.Stage.call(this,managedWindow);
};
$hxClasses["nme.display.ManagedStage"] = nme.display.ManagedStage;
nme.display.ManagedStage.__name__ = "nme.display.ManagedStage";
nme.display.ManagedStage.initSdlAudio = function() {
	nme.display.ManagedStage.nme_init_sdl_audio();
};
nme.display.ManagedStage.__super__ = nme.display.Stage;
nme.display.ManagedStage.prototype = $extend(nme.display.Stage.prototype,{
	pumpEvent: function(inEvent) {
		nme.display.ManagedStage.nme_managed_stage_pump_event(this.nmeHandle,inEvent);
	}
	,onWindowSize: function(inWidth,inHeight) {
		this.pumpEvent({ type : 8, x : inWidth, y : inHeight});
	}
	,sendQuit: function() {
		this.pumpEvent({ type : 10});
	}
	,setNextWake: function(inDelay) {
	}
	,invalidate: function() {
		nme.display.Stage.prototype.invalidate.call(this);
		if(this.get_renderRequest() != null) {
			(this.get_renderRequest())();
		}
	}
	,__class__: nme.display.ManagedStage
});
nme.display.MovieClip = function() {
	nme.display.Sprite.call(this);
	this.mCurrentFrame = 0;
	this.mTotalFrames = 0;
	this.__currentLabels = [];
	this.enabled = true;
};
$hxClasses["nme.display.MovieClip"] = nme.display.MovieClip;
nme.display.MovieClip.__name__ = "nme.display.MovieClip";
nme.display.MovieClip.__super__ = nme.display.Sprite;
nme.display.MovieClip.prototype = $extend(nme.display.Sprite.prototype,{
	currentFrame: null
	,enabled: null
	,framesLoaded: null
	,totalFrames: null
	,mCurrentFrame: null
	,mTotalFrames: null
	,get___currentFrame: function() {
		return this.mCurrentFrame;
	}
	,set___currentFrame: function(f) {
		return this.mCurrentFrame = f;
	}
	,get___totalFrames: function() {
		return this.mTotalFrames;
	}
	,set___totalFrames: function(f) {
		return this.mTotalFrames = f;
	}
	,__frameScripts: null
	,__currentLabels: null
	,__currentFrameLabel: null
	,__currentLabel: null
	,gotoAndPlay: function(frame,scene) {
	}
	,gotoAndStop: function(frame,scene) {
	}
	,nextFrame: function() {
	}
	,nmeGetType: function() {
		return "MovieClip";
	}
	,play: function() {
	}
	,prevFrame: function() {
	}
	,stop: function() {
	}
	,get_currentFrame: function() {
		return this.mCurrentFrame;
	}
	,get_framesLoaded: function() {
		return this.mTotalFrames;
	}
	,get_totalFrames: function() {
		return this.mTotalFrames;
	}
	,__class__: nme.display.MovieClip
	,__properties__: $extend(nme.display.Sprite.prototype.__properties__,{set___totalFrames:"set___totalFrames",get___totalFrames:"get___totalFrames",set___currentFrame:"set___currentFrame",get___currentFrame:"get___currentFrame",get_totalFrames:"get_totalFrames",get_framesLoaded:"get_framesLoaded",get_currentFrame:"get_currentFrame"})
});
nme.display.OpenGLView = function() {
	nme.display.DirectRenderer.call(this,"OpenGLView");
};
$hxClasses["nme.display.OpenGLView"] = nme.display.OpenGLView;
nme.display.OpenGLView.__name__ = "nme.display.OpenGLView";
nme.display.OpenGLView.__properties__ = {get_isSupported:"get_isSupported"};
nme.display.OpenGLView.isSupported = null;
nme.display.OpenGLView.get_isSupported = function() {
	return true;
};
nme.display.OpenGLView.__super__ = nme.display.DirectRenderer;
nme.display.OpenGLView.prototype = $extend(nme.display.DirectRenderer.prototype,{
	__class__: nme.display.OpenGLView
});
nme.display.PixelSnapping = $hxEnums["nme.display.PixelSnapping"] = { __ename__:"nme.display.PixelSnapping",__constructs__:null
	,NEVER: {_hx_name:"NEVER",_hx_index:0,__enum__:"nme.display.PixelSnapping",toString:$estr}
	,AUTO: {_hx_name:"AUTO",_hx_index:1,__enum__:"nme.display.PixelSnapping",toString:$estr}
	,ALWAYS: {_hx_name:"ALWAYS",_hx_index:2,__enum__:"nme.display.PixelSnapping",toString:$estr}
};
nme.display.PixelSnapping.__constructs__ = [nme.display.PixelSnapping.NEVER,nme.display.PixelSnapping.AUTO,nme.display.PixelSnapping.ALWAYS];
nme.display.PixelSnapping.__empty_constructs__ = [nme.display.PixelSnapping.NEVER,nme.display.PixelSnapping.AUTO,nme.display.PixelSnapping.ALWAYS];
nme.display.Shape = function() {
	nme.display.DisplayObject.call(this,nme.display.DisplayObject.nme_create_display_object(),"Shape");
};
$hxClasses["nme.display.Shape"] = nme.display.Shape;
nme.display.Shape.__name__ = "nme.display.Shape";
nme.display.Shape.__super__ = nme.display.DisplayObject;
nme.display.Shape.prototype = $extend(nme.display.DisplayObject.prototype,{
	__class__: nme.display.Shape
});
nme.display.SimpleButton = function(upState,overState,downState,hitTestState) {
	nme.display.InteractiveObject.call(this,nme.display.SimpleButton.nme_simple_button_create(),"SimpleButton");
	this.set_upState(upState);
	this.set_overState(overState);
	this.set_downState(downState);
	this.set_hitTestState(hitTestState);
};
$hxClasses["nme.display.SimpleButton"] = nme.display.SimpleButton;
nme.display.SimpleButton.__name__ = "nme.display.SimpleButton";
nme.display.SimpleButton.__super__ = nme.display.InteractiveObject;
nme.display.SimpleButton.prototype = $extend(nme.display.InteractiveObject.prototype,{
	downState: null
	,hitTestState: null
	,overState: null
	,upState: null
	,set_downState: function(inState) {
		this.downState = inState;
		nme.display.SimpleButton.nme_simple_button_set_state(this.nmeHandle,1,inState == null ? null : inState.nmeHandle);
		return inState;
	}
	,get_enabled: function() {
		return nme.display.SimpleButton.nme_simple_button_get_enabled(this.nmeHandle);
	}
	,set_enabled: function(inVal) {
		nme.display.SimpleButton.nme_simple_button_set_enabled(this.nmeHandle,inVal);
		return inVal;
	}
	,get_useHandCursor: function() {
		return nme.display.SimpleButton.nme_simple_button_get_hand_cursor(this.nmeHandle);
	}
	,set_useHandCursor: function(inVal) {
		nme.display.SimpleButton.nme_simple_button_set_hand_cursor(this.nmeHandle,inVal);
		return inVal;
	}
	,set_hitTestState: function(inState) {
		this.hitTestState = inState;
		nme.display.SimpleButton.nme_simple_button_set_state(this.nmeHandle,3,inState == null ? null : inState.nmeHandle);
		return inState;
	}
	,set_overState: function(inState) {
		this.overState = inState;
		nme.display.SimpleButton.nme_simple_button_set_state(this.nmeHandle,2,inState == null ? null : inState.nmeHandle);
		return inState;
	}
	,set_upState: function(inState) {
		this.upState = inState;
		nme.display.SimpleButton.nme_simple_button_set_state(this.nmeHandle,0,inState == null ? null : inState.nmeHandle);
		return inState;
	}
	,__class__: nme.display.SimpleButton
	,__properties__: $extend(nme.display.InteractiveObject.prototype.__properties__,{set_useHandCursor:"set_useHandCursor",get_useHandCursor:"get_useHandCursor",set_upState:"set_upState",set_overState:"set_overState",set_hitTestState:"set_hitTestState",set_enabled:"set_enabled",get_enabled:"get_enabled",set_downState:"set_downState"})
});
nme.display.SpreadMethod = $hxEnums["nme.display.SpreadMethod"] = { __ename__:"nme.display.SpreadMethod",__constructs__:null
	,PAD: {_hx_name:"PAD",_hx_index:0,__enum__:"nme.display.SpreadMethod",toString:$estr}
	,REPEAT: {_hx_name:"REPEAT",_hx_index:1,__enum__:"nme.display.SpreadMethod",toString:$estr}
	,REFLECT: {_hx_name:"REFLECT",_hx_index:2,__enum__:"nme.display.SpreadMethod",toString:$estr}
};
nme.display.SpreadMethod.__constructs__ = [nme.display.SpreadMethod.PAD,nme.display.SpreadMethod.REPEAT,nme.display.SpreadMethod.REFLECT];
nme.display.SpreadMethod.__empty_constructs__ = [nme.display.SpreadMethod.PAD,nme.display.SpreadMethod.REPEAT,nme.display.SpreadMethod.REFLECT];
nme.display.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["nme.display.TouchInfo"] = nme.display.TouchInfo;
nme.display.TouchInfo.__name__ = "nme.display.TouchInfo";
nme.display.TouchInfo.prototype = {
	touchOverObjects: null
	,__class__: nme.display.TouchInfo
};
nme.display.StageAlign = $hxEnums["nme.display.StageAlign"] = { __ename__:"nme.display.StageAlign",__constructs__:null
	,TOP_RIGHT: {_hx_name:"TOP_RIGHT",_hx_index:0,__enum__:"nme.display.StageAlign",toString:$estr}
	,TOP_LEFT: {_hx_name:"TOP_LEFT",_hx_index:1,__enum__:"nme.display.StageAlign",toString:$estr}
	,TOP: {_hx_name:"TOP",_hx_index:2,__enum__:"nme.display.StageAlign",toString:$estr}
	,RIGHT: {_hx_name:"RIGHT",_hx_index:3,__enum__:"nme.display.StageAlign",toString:$estr}
	,LEFT: {_hx_name:"LEFT",_hx_index:4,__enum__:"nme.display.StageAlign",toString:$estr}
	,BOTTOM_RIGHT: {_hx_name:"BOTTOM_RIGHT",_hx_index:5,__enum__:"nme.display.StageAlign",toString:$estr}
	,BOTTOM_LEFT: {_hx_name:"BOTTOM_LEFT",_hx_index:6,__enum__:"nme.display.StageAlign",toString:$estr}
	,BOTTOM: {_hx_name:"BOTTOM",_hx_index:7,__enum__:"nme.display.StageAlign",toString:$estr}
	,CENTRE: {_hx_name:"CENTRE",_hx_index:8,__enum__:"nme.display.StageAlign",toString:$estr}
	,GAME: {_hx_name:"GAME",_hx_index:9,__enum__:"nme.display.StageAlign",toString:$estr}
};
nme.display.StageAlign.__constructs__ = [nme.display.StageAlign.TOP_RIGHT,nme.display.StageAlign.TOP_LEFT,nme.display.StageAlign.TOP,nme.display.StageAlign.RIGHT,nme.display.StageAlign.LEFT,nme.display.StageAlign.BOTTOM_RIGHT,nme.display.StageAlign.BOTTOM_LEFT,nme.display.StageAlign.BOTTOM,nme.display.StageAlign.CENTRE,nme.display.StageAlign.GAME];
nme.display.StageAlign.__empty_constructs__ = [nme.display.StageAlign.TOP_RIGHT,nme.display.StageAlign.TOP_LEFT,nme.display.StageAlign.TOP,nme.display.StageAlign.RIGHT,nme.display.StageAlign.LEFT,nme.display.StageAlign.BOTTOM_RIGHT,nme.display.StageAlign.BOTTOM_LEFT,nme.display.StageAlign.BOTTOM,nme.display.StageAlign.CENTRE,nme.display.StageAlign.GAME];
nme.display.StageDisplayState = $hxEnums["nme.display.StageDisplayState"] = { __ename__:"nme.display.StageDisplayState",__constructs__:null
	,NORMAL: {_hx_name:"NORMAL",_hx_index:0,__enum__:"nme.display.StageDisplayState",toString:$estr}
	,FULL_SCREEN: {_hx_name:"FULL_SCREEN",_hx_index:1,__enum__:"nme.display.StageDisplayState",toString:$estr}
	,FULL_SCREEN_INTERACTIVE: {_hx_name:"FULL_SCREEN_INTERACTIVE",_hx_index:2,__enum__:"nme.display.StageDisplayState",toString:$estr}
};
nme.display.StageDisplayState.__constructs__ = [nme.display.StageDisplayState.NORMAL,nme.display.StageDisplayState.FULL_SCREEN,nme.display.StageDisplayState.FULL_SCREEN_INTERACTIVE];
nme.display.StageDisplayState.__empty_constructs__ = [nme.display.StageDisplayState.NORMAL,nme.display.StageDisplayState.FULL_SCREEN,nme.display.StageDisplayState.FULL_SCREEN_INTERACTIVE];
nme.display.StageQuality = $hxEnums["nme.display.StageQuality"] = { __ename__:"nme.display.StageQuality",__constructs__:null
	,LOW: {_hx_name:"LOW",_hx_index:0,__enum__:"nme.display.StageQuality",toString:$estr}
	,MEDIUM: {_hx_name:"MEDIUM",_hx_index:1,__enum__:"nme.display.StageQuality",toString:$estr}
	,HIGH: {_hx_name:"HIGH",_hx_index:2,__enum__:"nme.display.StageQuality",toString:$estr}
	,BEST: {_hx_name:"BEST",_hx_index:3,__enum__:"nme.display.StageQuality",toString:$estr}
};
nme.display.StageQuality.__constructs__ = [nme.display.StageQuality.LOW,nme.display.StageQuality.MEDIUM,nme.display.StageQuality.HIGH,nme.display.StageQuality.BEST];
nme.display.StageQuality.__empty_constructs__ = [nme.display.StageQuality.LOW,nme.display.StageQuality.MEDIUM,nme.display.StageQuality.HIGH,nme.display.StageQuality.BEST];
nme.display.StageScaleMode = $hxEnums["nme.display.StageScaleMode"] = { __ename__:"nme.display.StageScaleMode",__constructs__:null
	,SHOW_ALL: {_hx_name:"SHOW_ALL",_hx_index:0,__enum__:"nme.display.StageScaleMode",toString:$estr}
	,NO_SCALE: {_hx_name:"NO_SCALE",_hx_index:1,__enum__:"nme.display.StageScaleMode",toString:$estr}
	,NO_BORDER: {_hx_name:"NO_BORDER",_hx_index:2,__enum__:"nme.display.StageScaleMode",toString:$estr}
	,EXACT_FIT: {_hx_name:"EXACT_FIT",_hx_index:3,__enum__:"nme.display.StageScaleMode",toString:$estr}
};
nme.display.StageScaleMode.__constructs__ = [nme.display.StageScaleMode.SHOW_ALL,nme.display.StageScaleMode.NO_SCALE,nme.display.StageScaleMode.NO_BORDER,nme.display.StageScaleMode.EXACT_FIT];
nme.display.StageScaleMode.__empty_constructs__ = [nme.display.StageScaleMode.SHOW_ALL,nme.display.StageScaleMode.NO_SCALE,nme.display.StageScaleMode.NO_BORDER,nme.display.StageScaleMode.EXACT_FIT];
nme.display.Tile = function(inId,inX,inY) {
	if(inY == null) {
		inY = 0;
	}
	if(inX == null) {
		inX = 0;
	}
	this.set_id(inId);
	this.set_x(inX);
	this.set_y(inY);
};
$hxClasses["nme.display.Tile"] = nme.display.Tile;
nme.display.Tile.__name__ = "nme.display.Tile";
nme.display.Tile.prototype = {
	id: null
	,x: null
	,y: null
	,nmeOwner: null
	,set_x: function(inX) {
		this.x = inX;
		if(this.nmeOwner != null) {
			this.nmeOwner.dirtyFlags |= 1;
		}
		return inX;
	}
	,set_y: function(inY) {
		this.y = inY;
		if(this.nmeOwner != null) {
			this.nmeOwner.dirtyFlags |= 1;
		}
		return inY;
	}
	,set_id: function(inId) {
		this.id = inId;
		if(this.nmeOwner != null) {
			this.nmeOwner.dirtyFlags |= 1;
		}
		return inId;
	}
	,__class__: nme.display.Tile
	,__properties__: {set_y:"set_y",set_x:"set_x",set_id:"set_id"}
};
nme.display.Tilemap = function(inWidth,inHeight,inTilesheet,inSmoothing) {
	if(inSmoothing == null) {
		inSmoothing = true;
	}
	nme.display.Shape.call(this);
	this.dirtyFlags = this.attribFlags = 0;
	this.tilesheet = inTilesheet;
	this.nmeWidth = inWidth;
	this.nmeHeight = inHeight;
	this.smoothing = inSmoothing;
	this.tiles = [];
	this.addEventListener("addedToStage",$bind(this,this.onAddedToStage));
};
$hxClasses["nme.display.Tilemap"] = nme.display.Tilemap;
nme.display.Tilemap.__name__ = "nme.display.Tilemap";
nme.display.Tilemap.__super__ = nme.display.Shape;
nme.display.Tilemap.prototype = $extend(nme.display.Shape.prototype,{
	smoothing: null
	,dirtyFlags: null
	,tiles: null
	,attribFlags: null
	,nmeWidth: null
	,nmeHeight: null
	,drawList: null
	,tilesheet: null
	,addTile: function(tile) {
		if(tile.nmeOwner != null) {
			tile.nmeOwner.removeTile(tile);
		}
		tile.nmeOwner = this;
		this.dirtyFlags |= 1;
		this.tiles.push(tile);
		return tile;
	}
	,removeTile: function(tile) {
		HxOverrides.remove(this.tiles,tile);
		tile.nmeOwner = null;
		return tile;
	}
	,onAddedToStage: function(_) {
		this.removeEventListener("addedToStage",$bind(this,this.onAddedToStage));
		this.addEventListener("removedFromStage",$bind(this,this.onRemovedFromStage));
		nme.Lib.get_current().get_stage().addPrerenderListener($bind(this,this.onPrerender));
		this.drawList = new nme.utils.Float32Buffer(16,true);
		nme.NativeResource.nme_native_resource_lock(this.drawList);
	}
	,onRemovedFromStage: function(_) {
		this.removeEventListener("removedFromStage",$bind(this,this.onRemovedFromStage));
		this.addEventListener("addedToStage",$bind(this,this.onAddedToStage));
		nme.Lib.get_current().get_stage().removePrerenderListener($bind(this,this.onPrerender));
		nme.NativeResource.nme_native_resource_unlock(this.drawList);
		this.drawList = null;
	}
	,rebuild: function() {
		var gfx = this.get_graphics();
		gfx.clear();
		var n = this.tiles.length;
		if(n > 0) {
			var attribCount = 2;
			var flags = 0;
			var hasId = this.tilesheet.tileCount > 1;
			if(hasId) {
				++attribCount;
			} else {
				flags |= 128;
			}
			this.drawList.resize(n * attribCount);
			var idx = 0;
			var _g = 0;
			var _g1 = this.tiles;
			while(_g < _g1.length) {
				var tile = _g1[_g];
				++_g;
				this.drawList.f32View[idx++] = tile.x;
				this.drawList.f32View[idx++] = tile.y;
				if(hasId) {
					this.drawList.f32View[idx++] = tile.id;
				}
			}
			var this1 = this.drawList;
			this.tilesheet.drawTiles(gfx,this1,this.smoothing,flags);
		}
	}
	,onPrerender: function() {
		if(this.dirtyFlags != 0) {
			this.attribFlags |= this.dirtyFlags & -2;
			this.dirtyFlags = 0;
			this.rebuild();
		}
	}
	,__class__: nme.display.Tilemap
});
nme.display.Tilesheet = function(inImage,rects,inPoint) {
	this.tileCount = 0;
	this.nmeBitmap = inImage;
	this.nmeHandle = nme.display.Tilesheet.nme_tilesheet_create(inImage.nmeHandle);
	if(rects != null) {
		var _g = 0;
		while(_g < rects.length) {
			var rect = rects[_g];
			++_g;
			this.addTileRect(rect,inPoint);
		}
	}
};
$hxClasses["nme.display.Tilesheet"] = nme.display.Tilesheet;
nme.display.Tilesheet.__name__ = "nme.display.Tilesheet";
nme.display.Tilesheet.prototype = {
	nmeBitmap: null
	,tileCount: null
	,nmeHandle: null
	,addTileRect: function(rectangle,centerPoint) {
		this.tileCount++;
		return nme.display.Tilesheet.nme_tilesheet_add_rect(this.nmeHandle,rectangle,centerPoint);
	}
	,getTileRect: function(index,result) {
		if(this.tileCount <= index || index < 0) {
			return null;
		}
		if(result == null) {
			result = new nme.geom.Rectangle();
		}
		nme.display.Tilesheet.nme_tilesheet_get_rect(this.nmeHandle,index,result);
		return result;
	}
	,drawTiles: function(graphics,tileData,smooth,flags,count) {
		if(count == null) {
			count = -1;
		}
		if(flags == null) {
			flags = 0;
		}
		if(smooth == null) {
			smooth = false;
		}
		graphics.drawTiles(this,tileData,smooth,flags,count);
	}
	,getRect: function(index) {
		return this.getTileRect(index);
	}
	,addRect: function(rectangle) {
		return this.addTileRect(rectangle);
	}
	,__class__: nme.display.Tilesheet
};
nme.display.TriangleCulling = $hxEnums["nme.display.TriangleCulling"] = { __ename__:"nme.display.TriangleCulling",__constructs__:null
	,POSITIVE: {_hx_name:"POSITIVE",_hx_index:0,__enum__:"nme.display.TriangleCulling",toString:$estr}
	,NONE: {_hx_name:"NONE",_hx_index:1,__enum__:"nme.display.TriangleCulling",toString:$estr}
	,NEGATIVE: {_hx_name:"NEGATIVE",_hx_index:2,__enum__:"nme.display.TriangleCulling",toString:$estr}
};
nme.display.TriangleCulling.__constructs__ = [nme.display.TriangleCulling.POSITIVE,nme.display.TriangleCulling.NONE,nme.display.TriangleCulling.NEGATIVE];
nme.display.TriangleCulling.__empty_constructs__ = [nme.display.TriangleCulling.POSITIVE,nme.display.TriangleCulling.NONE,nme.display.TriangleCulling.NEGATIVE];
nme.errors = {};
nme.errors.Error = function(inMessage,id) {
	if(id == null) {
		id = 0;
	}
	this.message = inMessage;
	this.errorID = id;
};
$hxClasses["nme.errors.Error"] = nme.errors.Error;
nme.errors.Error.__name__ = "nme.errors.Error";
nme.errors.Error.prototype = {
	errorID: null
	,message: null
	,name: null
	,getStackTrace: function() {
		return "";
	}
	,toString: function() {
		return this.message;
	}
	,__class__: nme.errors.Error
};
nme.errors.ArgumentError = function(inMessage,id) {
	nme.errors.Error.call(this,inMessage,id);
};
$hxClasses["nme.errors.ArgumentError"] = nme.errors.ArgumentError;
nme.errors.ArgumentError.__name__ = "nme.errors.ArgumentError";
nme.errors.ArgumentError.__super__ = nme.errors.Error;
nme.errors.ArgumentError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.ArgumentError
});
nme.errors.EOFError = function() {
	nme.errors.Error.call(this,"End of file was encountered",2030);
};
$hxClasses["nme.errors.EOFError"] = nme.errors.EOFError;
nme.errors.EOFError.__name__ = "nme.errors.EOFError";
nme.errors.EOFError.__super__ = nme.errors.Error;
nme.errors.EOFError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.EOFError
});
nme.errors.IllegalOperationError = function(inMessage,id) {
	nme.errors.Error.call(this,inMessage,id);
};
$hxClasses["nme.errors.IllegalOperationError"] = nme.errors.IllegalOperationError;
nme.errors.IllegalOperationError.__name__ = "nme.errors.IllegalOperationError";
nme.errors.IllegalOperationError.__super__ = nme.errors.Error;
nme.errors.IllegalOperationError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.IllegalOperationError
});
nme.errors.RangeError = function(inMessage) {
	if(inMessage == null) {
		inMessage = "";
	}
	nme.errors.Error.call(this,inMessage,0);
};
$hxClasses["nme.errors.RangeError"] = nme.errors.RangeError;
nme.errors.RangeError.__name__ = "nme.errors.RangeError";
nme.errors.RangeError.__super__ = nme.errors.Error;
nme.errors.RangeError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.RangeError
});
nme.errors.SecurityError = function(inMessage) {
	if(inMessage == null) {
		inMessage = "";
	}
	nme.errors.Error.call(this,inMessage,0);
};
$hxClasses["nme.errors.SecurityError"] = nme.errors.SecurityError;
nme.errors.SecurityError.__name__ = "nme.errors.SecurityError";
nme.errors.SecurityError.__super__ = nme.errors.Error;
nme.errors.SecurityError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.SecurityError
});
nme.errors.TypeError = function(inMessage) {
	if(inMessage == null) {
		inMessage = "";
	}
	nme.errors.Error.call(this,inMessage,0);
};
$hxClasses["nme.errors.TypeError"] = nme.errors.TypeError;
nme.errors.TypeError.__name__ = "nme.errors.TypeError";
nme.errors.TypeError.__super__ = nme.errors.Error;
nme.errors.TypeError.prototype = $extend(nme.errors.Error.prototype,{
	__class__: nme.errors.TypeError
});
nme.events.Event = function(type,bubbles,cancelable) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	this._type = type;
	this._bubbles = bubbles;
	this._cancelable = cancelable;
	this.nmeIsCancelled = false;
	this.nmeIsCancelledNow = false;
	this.clickCancelled = false;
	this._target = null;
	this._currentTarget = null;
	this._eventPhase = nme.events.EventPhase.AT_TARGET;
};
$hxClasses["nme.events.Event"] = nme.events.Event;
nme.events.Event.__name__ = "nme.events.Event";
nme.events.Event.prototype = {
	_bubbles: null
	,_cancelable: null
	,_currentTarget: null
	,_eventPhase: null
	,_target: null
	,_type: null
	,nmeIsCancelled: null
	,nmeIsCancelledNow: null
	,clickCancelled: null
	,clone: function() {
		return new nme.events.Event(this.get_type(),this.get_bubbles(),this.get_cancelable());
	}
	,nmeGetIsCancelled: function() {
		return this.nmeIsCancelled;
	}
	,nmeGetIsCancelledNow: function() {
		return this.nmeIsCancelledNow;
	}
	,nmeSetPhase: function(inPhase) {
		this._eventPhase = inPhase;
	}
	,stopImmediatePropagation: function() {
		if(this.get_cancelable()) {
			this.nmeIsCancelledNow = this.nmeIsCancelled = true;
		}
	}
	,stopPropagation: function() {
		if(this.get_cancelable()) {
			this.nmeIsCancelled = true;
		}
	}
	,toString: function() {
		return "[Event type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + "]";
	}
	,get_bubbles: function() {
		return this._bubbles;
	}
	,get_cancelable: function() {
		return this._cancelable;
	}
	,get_currentTarget: function() {
		return this._currentTarget;
	}
	,set_currentTarget: function(v) {
		this._currentTarget = v;
		return v;
	}
	,get_eventPhase: function() {
		return this._eventPhase;
	}
	,get_target: function() {
		return this._target;
	}
	,set_target: function(v) {
		this._target = v;
		return v;
	}
	,get_type: function() {
		return this._type;
	}
	,__class__: nme.events.Event
	,__properties__: {get_type:"get_type",set_target:"set_target",get_target:"get_target",get_eventPhase:"get_eventPhase",set_currentTarget:"set_currentTarget",get_currentTarget:"get_currentTarget",get_cancelable:"get_cancelable",get_bubbles:"get_bubbles"}
};
nme.events.AccelerometerEvent = function(type,bubbles,cancelable,timestamp,accelerationX,accelerationY,accelerationZ) {
	if(accelerationZ == null) {
		accelerationZ = 0;
	}
	if(accelerationY == null) {
		accelerationY = 0;
	}
	if(accelerationX == null) {
		accelerationX = 0;
	}
	if(timestamp == null) {
		timestamp = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.timestamp = timestamp;
	this.accelerationX = accelerationX;
	this.accelerationY = accelerationY;
	this.accelerationZ = accelerationZ;
};
$hxClasses["nme.events.AccelerometerEvent"] = nme.events.AccelerometerEvent;
nme.events.AccelerometerEvent.__name__ = "nme.events.AccelerometerEvent";
nme.events.AccelerometerEvent.UPDATE = null;
nme.events.AccelerometerEvent.__super__ = nme.events.Event;
nme.events.AccelerometerEvent.prototype = $extend(nme.events.Event.prototype,{
	accelerationX: null
	,accelerationY: null
	,accelerationZ: null
	,timestamp: null
	,clone: function() {
		return new nme.events.AccelerometerEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.timestamp,this.accelerationX,this.accelerationY,this.accelerationZ);
	}
	,toString: function() {
		return "[AccelerometerEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " timestamp=" + this.timestamp + " accelerationX=" + this.accelerationX + " accelerationY=" + this.accelerationY + " accelerationZ=" + this.accelerationZ + "]";
	}
	,__class__: nme.events.AccelerometerEvent
});
nme.events.AppLinkEvent = function(type,bubbles,cancelable) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["nme.events.AppLinkEvent"] = nme.events.AppLinkEvent;
nme.events.AppLinkEvent.__name__ = "nme.events.AppLinkEvent";
nme.events.AppLinkEvent.__super__ = nme.events.Event;
nme.events.AppLinkEvent.prototype = $extend(nme.events.Event.prototype,{
	url: null
	,clone: function() {
		var e = new nme.events.AppLinkEvent(this.get_type(),this.get_bubbles(),this.get_cancelable());
		e.url = this.url;
		return e;
	}
	,toString: function() {
		return "[AppLinkEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " url=" + this.url + "]";
	}
	,__class__: nme.events.AppLinkEvent
});
nme.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) {
		text = "";
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["nme.events.TextEvent"] = nme.events.TextEvent;
nme.events.TextEvent.__name__ = "nme.events.TextEvent";
nme.events.TextEvent.__super__ = nme.events.Event;
nme.events.TextEvent.prototype = $extend(nme.events.Event.prototype,{
	text: null
	,clone: function() {
		return new nme.events.TextEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.text);
	}
	,toString: function() {
		return "[TextEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " text=" + this.text + "]";
	}
	,__class__: nme.events.TextEvent
});
nme.events.ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) {
		id = 0;
	}
	if(text == null) {
		text = "";
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.TextEvent.call(this,type,bubbles,cancelable,text);
	this.errorID = id;
};
$hxClasses["nme.events.ErrorEvent"] = nme.events.ErrorEvent;
nme.events.ErrorEvent.__name__ = "nme.events.ErrorEvent";
nme.events.ErrorEvent.__super__ = nme.events.TextEvent;
nme.events.ErrorEvent.prototype = $extend(nme.events.TextEvent.prototype,{
	errorID: null
	,clone: function() {
		return new nme.events.ErrorEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.text,this.errorID);
	}
	,toString: function() {
		return "[ErrorEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: nme.events.ErrorEvent
});
nme.events.AsyncErrorEvent = function(type,bubbles,cancelable,text,inError) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.ErrorEvent.call(this,type,bubbles,cancelable,text,inError == null ? inError.errorID : 0);
	this.error = inError;
};
$hxClasses["nme.events.AsyncErrorEvent"] = nme.events.AsyncErrorEvent;
nme.events.AsyncErrorEvent.__name__ = "nme.events.AsyncErrorEvent";
nme.events.AsyncErrorEvent.__super__ = nme.events.ErrorEvent;
nme.events.AsyncErrorEvent.prototype = $extend(nme.events.ErrorEvent.prototype,{
	error: null
	,__class__: nme.events.AsyncErrorEvent
});
nme.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) {
		clickCount = 0;
	}
	if(commandKey == null) {
		commandKey = false;
	}
	if(delta == null) {
		delta = 0;
	}
	if(buttonDown == null) {
		buttonDown = false;
	}
	if(shiftKey == null) {
		shiftKey = false;
	}
	if(altKey == null) {
		altKey = false;
	}
	if(ctrlKey == null) {
		ctrlKey = false;
	}
	if(localY == null) {
		localY = 0;
	}
	if(localX == null) {
		localX = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.localX = localX;
	this.localY = localY;
	this.relatedObject = relatedObject;
	this.ctrlKey = ctrlKey;
	this.altKey = altKey;
	this.shiftKey = shiftKey;
	this.buttonDown = buttonDown;
	this.delta = delta;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
	this.cancelClick = false;
};
$hxClasses["nme.events.MouseEvent"] = nme.events.MouseEvent;
nme.events.MouseEvent.__name__ = "nme.events.MouseEvent";
nme.events.MouseEvent.nmeCreate = function(inType,inEvent,inLocal,inTarget) {
	var flags = inEvent.flags;
	var evt = new nme.events.MouseEvent(inType,true,true,inLocal.x,inLocal.y,null,(flags & nme.events.MouseEvent.efCtrlDown) != 0,(flags & nme.events.MouseEvent.efAltDown) != 0,(flags & nme.events.MouseEvent.efShiftDown) != 0,(flags & nme.events.MouseEvent.efLeftDown) != 0,0,null,0);
	evt.stageX = inEvent.x;
	evt.stageY = inEvent.y;
	evt.set_target(inTarget);
	return evt;
};
nme.events.MouseEvent.__super__ = nme.events.Event;
nme.events.MouseEvent.prototype = $extend(nme.events.Event.prototype,{
	altKey: null
	,buttonDown: null
	,clickCount: null
	,commandKey: null
	,ctrlKey: null
	,delta: null
	,localX: null
	,localY: null
	,relatedObject: null
	,shiftKey: null
	,stageX: null
	,stageY: null
	,cancelClick: null
	,clone: function() {
		return new nme.events.MouseEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
	}
	,nmeCreateSimilar: function(inType,related,targ) {
		var result = new nme.events.MouseEvent(inType,this.get_bubbles(),this.get_cancelable(),this.localX,this.localY,related == null ? this.relatedObject : related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		result.stageX = this.stageX;
		result.stageY = this.stageY;
		if(targ != null) {
			result.set_target(targ);
		}
		return result;
	}
	,toString: function() {
		return "MouseEvent(type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " localX=" + this.localX + " localY=" + this.localY + " relatedObject=" + Std.string(this.relatedObject) + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + " buttonDown=" + Std.string(this.buttonDown) + " delta=" + this.delta + " cancelClick=" + Std.string(this.cancelClick) + ")";
	}
	,updateAfterEvent: function() {
	}
	,__class__: nme.events.MouseEvent
});
nme.events.DropEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	nme.events.MouseEvent.call(this,type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount);
};
$hxClasses["nme.events.DropEvent"] = nme.events.DropEvent;
nme.events.DropEvent.__name__ = "nme.events.DropEvent";
nme.events.DropEvent.nmeCreate = function(inType,inEvent,inLocal,inTarget,inItems) {
	var flags = inEvent.flags;
	var evt = new nme.events.DropEvent(inType,true,true,inLocal.x,inLocal.y,null,(flags & nme.events.MouseEvent.efCtrlDown) != 0,(flags & nme.events.MouseEvent.efAltDown) != 0,(flags & nme.events.MouseEvent.efShiftDown) != 0,(flags & nme.events.MouseEvent.efLeftDown) != 0,0,null,0);
	evt.stageX = inEvent.x;
	evt.stageY = inEvent.y;
	evt.set_target(inTarget);
	evt.items = inItems;
	return evt;
};
nme.events.DropEvent.__super__ = nme.events.MouseEvent;
nme.events.DropEvent.prototype = $extend(nme.events.MouseEvent.prototype,{
	items: null
	,clone: function() {
		var e = new nme.events.DropEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.localX,this.localY,this.relatedObject,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		e.items = this.items;
		return e;
	}
	,toString: function() {
		return "DropEvent(" + this.get_type() + ":" + Std.string(this.items) + ")";
	}
	,__class__: nme.events.DropEvent
});
nme.events.Listener = function(inListener,inUseCapture,inPriority,inUseWeakRef) {
	this.mListner = new nme.utils.WeakRef(inListener,inUseWeakRef);
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = nme.events.Listener.sIDs++;
};
$hxClasses["nme.events.Listener"] = nme.events.Listener;
nme.events.Listener.__name__ = "nme.events.Listener";
nme.events.Listener.prototype = {
	mID: null
	,mListner: null
	,mPriority: null
	,mUseCapture: null
	,dispatchEvent: function(event) {
		var ref = this.mListner.get();
		if(ref != null) {
			ref(event);
		}
	}
	,Is: function(inListener,inCapture) {
		var ref = this.mListner.get();
		if(ref == null) {
			return false;
		}
		if(Reflect.compareMethods(ref,inListener)) {
			return this.mUseCapture == inCapture;
		} else {
			return false;
		}
	}
	,__class__: nme.events.Listener
};
nme.events.EventPhase = function() { };
$hxClasses["nme.events.EventPhase"] = nme.events.EventPhase;
nme.events.EventPhase.__name__ = "nme.events.EventPhase";
nme.events.FocusEvent = function(inType,bubbles,cancelable,relatedObject,shiftKey,keyCode,direction) {
	if(direction == null) {
		direction = "none";
	}
	if(keyCode == null) {
		keyCode = 0;
	}
	if(shiftKey == null) {
		shiftKey = false;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.Event.call(this,inType,bubbles,cancelable);
	this.relatedObject = relatedObject;
	this.keyCode = keyCode;
	this.shiftKey = shiftKey;
};
$hxClasses["nme.events.FocusEvent"] = nme.events.FocusEvent;
nme.events.FocusEvent.__name__ = "nme.events.FocusEvent";
nme.events.FocusEvent.__super__ = nme.events.Event;
nme.events.FocusEvent.prototype = $extend(nme.events.Event.prototype,{
	keyCode: null
	,relatedObject: null
	,shiftKey: null
	,clone: function() {
		return new nme.events.FocusEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.relatedObject,this.shiftKey,this.keyCode);
	}
	,toString: function() {
		return "[FocusEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " relatedObject=" + Std.string(this.relatedObject) + " shiftKey=" + Std.string(this.shiftKey) + " keyCode=" + this.keyCode + "]";
	}
	,__class__: nme.events.FocusEvent
});
nme.events.GameInputEvent = function(type,bubbles,cancelable,inDevice) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.device = inDevice;
};
$hxClasses["nme.events.GameInputEvent"] = nme.events.GameInputEvent;
nme.events.GameInputEvent.__name__ = "nme.events.GameInputEvent";
nme.events.GameInputEvent.__super__ = nme.events.Event;
nme.events.GameInputEvent.prototype = $extend(nme.events.Event.prototype,{
	device: null
	,clone: function() {
		var event = new nme.events.GameInputEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.device);
		event.set_target(this.get_target());
		event.set_currentTarget(this.get_currentTarget());
		return event;
	}
	,__class__: nme.events.GameInputEvent
});
nme.events.HTTPStatusEvent = function(inType,bubbles,cancelable,status) {
	if(status == null) {
		status = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,inType,bubbles,cancelable);
	this.status = status;
	this.responseHeaders = [];
};
$hxClasses["nme.events.HTTPStatusEvent"] = nme.events.HTTPStatusEvent;
nme.events.HTTPStatusEvent.__name__ = "nme.events.HTTPStatusEvent";
nme.events.HTTPStatusEvent.__super__ = nme.events.Event;
nme.events.HTTPStatusEvent.prototype = $extend(nme.events.Event.prototype,{
	status: null
	,responseHeaders: null
	,clone: function() {
		return new nme.events.HTTPStatusEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.status);
	}
	,toString: function() {
		return "[HTTPStatusEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " status=" + this.status + "]";
	}
	,__class__: nme.events.HTTPStatusEvent
});
nme.events.IOErrorEvent = function(inType,bubbles,cancelable,text,id) {
	if(id == null) {
		id = 0;
	}
	if(text == null) {
		text = "";
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.ErrorEvent.call(this,inType,bubbles,cancelable,text,id);
};
$hxClasses["nme.events.IOErrorEvent"] = nme.events.IOErrorEvent;
nme.events.IOErrorEvent.__name__ = "nme.events.IOErrorEvent";
nme.events.IOErrorEvent.__super__ = nme.events.ErrorEvent;
nme.events.IOErrorEvent.prototype = $extend(nme.events.ErrorEvent.prototype,{
	clone: function() {
		return new nme.events.IOErrorEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.text,this.errorID);
	}
	,toString: function() {
		return "[IOErrorEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: nme.events.IOErrorEvent
});
nme.events.JoystickEvent = function(type,bubbles,cancelable,device,id,userId,x,y,axis,isGamePad) {
	if(isGamePad == null) {
		isGamePad = false;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(userId == null) {
		userId = 0;
	}
	if(id == null) {
		id = 0;
	}
	if(device == null) {
		device = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.device = device;
	this.id = id;
	this.user = userId;
	this.axis = axis;
	this.x = x;
	this.y = y;
	this.isGamePad = isGamePad;
};
$hxClasses["nme.events.JoystickEvent"] = nme.events.JoystickEvent;
nme.events.JoystickEvent.__name__ = "nme.events.JoystickEvent";
nme.events.JoystickEvent.__super__ = nme.events.Event;
nme.events.JoystickEvent.prototype = $extend(nme.events.Event.prototype,{
	axis: null
	,device: null
	,id: null
	,user: null
	,isGamePad: null
	,x: null
	,y: null
	,z: null
	,w: null
	,get_z: function() {
		if(this.axis == null) {
			return 0;
		} else {
			return this.axis[2];
		}
	}
	,get_w: function() {
		if(this.axis == null) {
			return 0;
		} else {
			return this.axis[3];
		}
	}
	,clone: function() {
		return new nme.events.JoystickEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.device,this.id,this.user,this.x,this.y,this.axis);
	}
	,toString: function() {
		var buf_b = "";
		buf_b += "[JoystickEvent type=";
		buf_b += Std.string(this.get_type());
		buf_b += " device=";
		buf_b += Std.string(this.device);
		buf_b += " user=";
		buf_b += Std.string(this.user);
		buf_b += " id=";
		buf_b += Std.string(this.id);
		buf_b += "(";
		buf_b += Std.string(this.idLabel());
		buf_b += ")";
		buf_b += " x=";
		buf_b += Std.string(this.x);
		buf_b += "]";
		return buf_b;
	}
	,idLabel: function() {
		switch(this.get_type()) {
		case "axisMove":
			return nme.ui.GamepadAxis.toString(this.id) + "[x:" + this.x + " y:" + this.y + "]";
		case "ballMove":
			return "BALL_MOVE[x:" + this.x + " y:" + this.y + "]";
		case "buttonDown":
			return nme.ui.GamepadButton.toString(this.id) + "[pressed]";
		case "buttonUp":
			return nme.ui.GamepadButton.toString(this.id) + "[released]";
		case "hatMove":
			return "HAT_MOVE[x:" + this.x + " y:" + this.y + "]";
		}
		return "";
	}
	,__class__: nme.events.JoystickEvent
	,__properties__: $extend(nme.events.Event.prototype.__properties__,{get_w:"get_w",get_z:"get_z"})
});
nme.events.KeyboardEvent = function(type,bubbles,cancelable,charCodeValue,keyCodeValue,keyLocationValue,ctrlKeyValue,altKeyValue,shiftKeyValue,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) {
		commandKeyValue = false;
	}
	if(controlKeyValue == null) {
		controlKeyValue = false;
	}
	if(shiftKeyValue == null) {
		shiftKeyValue = false;
	}
	if(altKeyValue == null) {
		altKeyValue = false;
	}
	if(ctrlKeyValue == null) {
		ctrlKeyValue = false;
	}
	if(keyLocationValue == null) {
		keyLocationValue = 0;
	}
	if(keyCodeValue == null) {
		keyCodeValue = 0;
	}
	if(charCodeValue == null) {
		charCodeValue = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = keyCodeValue;
	this.keyLocation = keyLocationValue;
	this.charCode = charCodeValue;
	this.shiftKey = shiftKeyValue;
	this.altKey = altKeyValue;
	this.controlKey = controlKeyValue;
	this.commandKey = commandKeyValue;
	this.ctrlKey = ctrlKeyValue || this.controlKey || this.commandKey;
};
$hxClasses["nme.events.KeyboardEvent"] = nme.events.KeyboardEvent;
nme.events.KeyboardEvent.__name__ = "nme.events.KeyboardEvent";
nme.events.KeyboardEvent.__super__ = nme.events.Event;
nme.events.KeyboardEvent.prototype = $extend(nme.events.Event.prototype,{
	altKey: null
	,charCode: null
	,ctrlKey: null
	,controlKey: null
	,commandKey: null
	,keyCode: null
	,keyLocation: null
	,shiftKey: null
	,clone: function() {
		return new nme.events.KeyboardEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.charCode,this.keyCode,this.keyLocation,this.ctrlKey,this.altKey,this.shiftKey,this.controlKey,this.commandKey);
	}
	,toString: function() {
		return "[KeyboardEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " charCode=" + this.charCode + " keyCode=" + this.keyCode + " keyLocation=" + this.keyLocation + " ctrlKey=" + Std.string(this.ctrlKey) + " altKey=" + Std.string(this.altKey) + " shiftKey=" + Std.string(this.shiftKey) + " controlKeyValue=" + Std.string(this.controlKey) + " commandKeyValue=" + Std.string(this.commandKey) + "]";
	}
	,__class__: nme.events.KeyboardEvent
});
nme.events.MoveEvent = function(type,bubbles,cancelable,inX,inY) {
	if(inY == null) {
		inY = 0;
	}
	if(inX == null) {
		inX = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.x = inX;
	this.y = inY;
};
$hxClasses["nme.events.MoveEvent"] = nme.events.MoveEvent;
nme.events.MoveEvent.__name__ = "nme.events.MoveEvent";
nme.events.MoveEvent.__super__ = nme.events.Event;
nme.events.MoveEvent.prototype = $extend(nme.events.Event.prototype,{
	x: null
	,y: null
	,clone: function() {
		var e = new nme.events.MoveEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.x,this.y);
		return e;
	}
	,toString: function() {
		return "MoveEvent(" + this.get_type() + "," + this.x + "," + this.y + ")";
	}
	,__class__: nme.events.MoveEvent
});
nme.events.NetStatusEvent = function(type,bubbles,cancelable,inInfo) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.info = inInfo;
};
$hxClasses["nme.events.NetStatusEvent"] = nme.events.NetStatusEvent;
nme.events.NetStatusEvent.__name__ = "nme.events.NetStatusEvent";
nme.events.NetStatusEvent.__super__ = nme.events.Event;
nme.events.NetStatusEvent.prototype = $extend(nme.events.Event.prototype,{
	info: null
	,__class__: nme.events.NetStatusEvent
});
nme.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) {
		bytesTotal = 0;
	}
	if(bytesLoaded == null) {
		bytesLoaded = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["nme.events.ProgressEvent"] = nme.events.ProgressEvent;
nme.events.ProgressEvent.__name__ = "nme.events.ProgressEvent";
nme.events.ProgressEvent.__super__ = nme.events.Event;
nme.events.ProgressEvent.prototype = $extend(nme.events.Event.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,clone: function() {
		return new nme.events.ProgressEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.bytesLoaded,this.bytesTotal);
	}
	,toString: function() {
		return "[ProgressEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " bytesLoaded=" + this.bytesLoaded + " bytesTotal=" + this.bytesTotal + "]";
	}
	,__class__: nme.events.ProgressEvent
});
nme.events.SampleDataEvent = function(type,bubbles,cancelable) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.data = new nme.utils.ByteArray();
	this.data.bigEndian = false;
	this.position = 0.0;
};
$hxClasses["nme.events.SampleDataEvent"] = nme.events.SampleDataEvent;
nme.events.SampleDataEvent.__name__ = "nme.events.SampleDataEvent";
nme.events.SampleDataEvent.__super__ = nme.events.Event;
nme.events.SampleDataEvent.prototype = $extend(nme.events.Event.prototype,{
	data: null
	,position: null
	,clone: function() {
		return new nme.events.SampleDataEvent(this.get_type(),this.get_bubbles(),this.get_cancelable());
	}
	,toString: function() {
		return "[SampleDataEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + "]";
	}
	,__class__: nme.events.SampleDataEvent
});
nme.events.SecurityErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) {
		id = 0;
	}
	if(text == null) {
		text = "";
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.ErrorEvent.call(this,type,bubbles,cancelable,text,id);
};
$hxClasses["nme.events.SecurityErrorEvent"] = nme.events.SecurityErrorEvent;
nme.events.SecurityErrorEvent.__name__ = "nme.events.SecurityErrorEvent";
nme.events.SecurityErrorEvent.__super__ = nme.events.ErrorEvent;
nme.events.SecurityErrorEvent.prototype = $extend(nme.events.ErrorEvent.prototype,{
	clone: function() {
		return new nme.events.SecurityErrorEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),this.text,this.errorID);
	}
	,toString: function() {
		return "[SecurityErrorEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " text=" + this.text + " errorID=" + this.errorID + "]";
	}
	,__class__: nme.events.SecurityErrorEvent
});
nme.events.StageVideoAvailabilityEvent = function(type,bubbles,cancelable,inAvailability) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.availability = inAvailability;
};
$hxClasses["nme.events.StageVideoAvailabilityEvent"] = nme.events.StageVideoAvailabilityEvent;
nme.events.StageVideoAvailabilityEvent.__name__ = "nme.events.StageVideoAvailabilityEvent";
nme.events.StageVideoAvailabilityEvent.__super__ = nme.events.Event;
nme.events.StageVideoAvailabilityEvent.prototype = $extend(nme.events.Event.prototype,{
	availability: null
	,__class__: nme.events.StageVideoAvailabilityEvent
});
nme.events.StageVideoEvent = function(type,bubbles,cancelable,inStatus,inColorSpace) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.colorSpace = inColorSpace;
	this.status = inStatus;
};
$hxClasses["nme.events.StageVideoEvent"] = nme.events.StageVideoEvent;
nme.events.StageVideoEvent.__name__ = "nme.events.StageVideoEvent";
nme.events.StageVideoEvent.__super__ = nme.events.Event;
nme.events.StageVideoEvent.prototype = $extend(nme.events.Event.prototype,{
	colorSpace: null
	,status: null
	,__class__: nme.events.StageVideoEvent
});
nme.events.StatusEvent = function(type,bubbles,cancelable,inCode,inLevel) {
	if(inLevel == null) {
		inLevel = "";
	}
	if(inCode == null) {
		inCode = "";
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.code = inCode;
	this.level = inLevel;
};
$hxClasses["nme.events.StatusEvent"] = nme.events.StatusEvent;
nme.events.StatusEvent.__name__ = "nme.events.StatusEvent";
nme.events.StatusEvent.__super__ = nme.events.Event;
nme.events.StatusEvent.prototype = $extend(nme.events.Event.prototype,{
	code: null
	,level: null
	,__class__: nme.events.StatusEvent
});
nme.events.SystemEvent = function(type,bubbles,cancelable,data) {
	if(data == null) {
		data = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
	this.data = data;
};
$hxClasses["nme.events.SystemEvent"] = nme.events.SystemEvent;
nme.events.SystemEvent.__name__ = "nme.events.SystemEvent";
nme.events.SystemEvent.__super__ = nme.events.Event;
nme.events.SystemEvent.prototype = $extend(nme.events.Event.prototype,{
	data: null
	,clone: function() {
		return new nme.events.ErrorEvent(this.get_type(),this.get_bubbles(),this.get_cancelable(),null,this.data);
	}
	,toString: function() {
		return "[SystemEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + " data=" + this.data + "]";
	}
	,__class__: nme.events.SystemEvent
});
nme.events.TimerEvent = function(type,bubbles,cancelable) {
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = false;
	}
	nme.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["nme.events.TimerEvent"] = nme.events.TimerEvent;
nme.events.TimerEvent.__name__ = "nme.events.TimerEvent";
nme.events.TimerEvent.__super__ = nme.events.Event;
nme.events.TimerEvent.prototype = $extend(nme.events.Event.prototype,{
	clone: function() {
		return new nme.events.TimerEvent(this.get_type(),this.get_bubbles(),this.get_cancelable());
	}
	,toString: function() {
		return "[TimerEvent type=" + this.get_type() + " bubbles=" + Std.string(this.get_bubbles()) + " cancelable=" + Std.string(this.get_cancelable()) + "]";
	}
	,updateAfterEvent: function() {
	}
	,__class__: nme.events.TimerEvent
});
nme.events.TouchEvent = function(type,bubbles,cancelable,in_localX,in_localY,in_sizeX,in_sizeY,in_relatedObject,in_ctrlKey,in_altKey,in_shiftKey,in_buttonDown,in_delta,in_commandKey,in_clickCount) {
	if(in_clickCount == null) {
		in_clickCount = 0;
	}
	if(in_commandKey == null) {
		in_commandKey = false;
	}
	if(in_delta == null) {
		in_delta = 0;
	}
	if(in_buttonDown == null) {
		in_buttonDown = false;
	}
	if(in_shiftKey == null) {
		in_shiftKey = false;
	}
	if(in_altKey == null) {
		in_altKey = false;
	}
	if(in_ctrlKey == null) {
		in_ctrlKey = false;
	}
	if(in_sizeY == null) {
		in_sizeY = 1;
	}
	if(in_sizeX == null) {
		in_sizeX = 1;
	}
	if(in_localY == null) {
		in_localY = 0;
	}
	if(in_localX == null) {
		in_localX = 0;
	}
	if(cancelable == null) {
		cancelable = false;
	}
	if(bubbles == null) {
		bubbles = true;
	}
	nme.events.MouseEvent.call(this,type,bubbles,cancelable,in_localX,in_localY,in_relatedObject,in_ctrlKey,in_altKey,in_shiftKey,in_buttonDown,in_delta,in_commandKey,in_clickCount);
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
	this.sizeX = in_sizeX;
	this.sizeY = in_sizeY;
};
$hxClasses["nme.events.TouchEvent"] = nme.events.TouchEvent;
nme.events.TouchEvent.__name__ = "nme.events.TouchEvent";
nme.events.TouchEvent.nmeCreate = function(inType,inEvent,inLocal,inTarget,sizeX,sizeY) {
	var flags = inEvent.flags;
	var evt = new nme.events.TouchEvent(inType,true,true,inLocal.x,inLocal.y,sizeX,sizeY,null,(flags & nme.events.MouseEvent.efCtrlDown) != 0,(flags & nme.events.MouseEvent.efAltDown) != 0,(flags & nme.events.MouseEvent.efShiftDown) != 0,(flags & nme.events.MouseEvent.efLeftDown) != 0,0,null,0);
	evt.stageX = inEvent.x;
	evt.stageY = inEvent.y;
	evt.set_target(inTarget);
	return evt;
};
nme.events.TouchEvent.__super__ = nme.events.MouseEvent;
nme.events.TouchEvent.prototype = $extend(nme.events.MouseEvent.prototype,{
	isPrimaryTouchPoint: null
	,touchPointID: null
	,sizeX: null
	,sizeY: null
	,nmeCreateSimilar: function(inType,related,targ) {
		var result = new nme.events.TouchEvent(inType,this.get_bubbles(),this.get_cancelable(),this.localX,this.localY,this.sizeX,this.sizeY,related == null ? this.relatedObject : related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) {
			result.set_target(targ);
		}
		return result;
	}
	,__class__: nme.events.TouchEvent
});
nme.external = {};
nme.external.ExternalInterface = function() { };
$hxClasses["nme.external.ExternalInterface"] = nme.external.ExternalInterface;
nme.external.ExternalInterface.__name__ = "nme.external.ExternalInterface";
nme.external.ExternalInterface.__properties__ = {get_available:"get_available"};
nme.external.ExternalInterface.available = null;
nme.external.ExternalInterface.marshallExceptions = null;
nme.external.ExternalInterface.objectID = null;
nme.external.ExternalInterface.addCallback = function(functionName,closure) {
	if(!Object.prototype.hasOwnProperty.call(nme.external.ExternalInterface.callbacks.h,functionName)) {
		nme.external.ExternalInterface.nme_external_interface_add_callback(functionName,nme.external.ExternalInterface.handler);
	}
	nme.external.ExternalInterface.callbacks.h[functionName] = closure;
};
nme.external.ExternalInterface.call = function(functionName,p1,p2,p3,p4,p5) {
	var params = [];
	if(p1 != null) {
		params.push(p1);
	}
	if(p2 != null) {
		params.push(p2);
	}
	if(p3 != null) {
		params.push(p3);
	}
	if(p4 != null) {
		params.push(p4);
	}
	if(p5 != null) {
		params.push(p5);
	}
	return nme.external.ExternalInterface.nme_external_interface_call(functionName,params);
};
nme.external.ExternalInterface.handler = function(functionName,params) {
	if(Object.prototype.hasOwnProperty.call(nme.external.ExternalInterface.callbacks.h,functionName)) {
		var handler = nme.external.ExternalInterface.callbacks.h[functionName];
		return handler.apply(handler,params);
	}
	return null;
};
nme.external.ExternalInterface.registerCallbacks = function() {
	nme.external.ExternalInterface.nme_external_interface_register_callbacks();
};
nme.external.ExternalInterface.get_available = function() {
	return nme.external.ExternalInterface.nme_external_interface_available();
};
nme.feedback = {};
nme.feedback.Haptic = function() { };
$hxClasses["nme.feedback.Haptic"] = nme.feedback.Haptic;
nme.feedback.Haptic.__name__ = "nme.feedback.Haptic";
nme.feedback.Haptic.vibrate = function(period,duration) {
	if(duration == null) {
		duration = 1000;
	}
	if(period == null) {
		period = 0;
	}
};
nme.filesystem = {};
nme.filesystem.File = function(path) {
	this.set_url(path);
	this.set_nativePath(path);
};
$hxClasses["nme.filesystem.File"] = nme.filesystem.File;
nme.filesystem.File.__name__ = "nme.filesystem.File";
nme.filesystem.File.__properties__ = {get_userDirectory:"get_userDirectory",get_documentsDirectory:"get_documentsDirectory",get_desktopDirectory:"get_desktopDirectory",get_applicationStorageDirectory:"get_applicationStorageDirectory",get_applicationDirectory:"get_applicationDirectory"};
nme.filesystem.File.applicationDirectory = null;
nme.filesystem.File.applicationStorageDirectory = null;
nme.filesystem.File.desktopDirectory = null;
nme.filesystem.File.documentsDirectory = null;
nme.filesystem.File.userDirectory = null;
nme.filesystem.File.get_applicationDirectory = function() {
	return new nme.filesystem.File(nme.filesystem.File.nme_filesystem_get_special_dir(0));
};
nme.filesystem.File.get_applicationStorageDirectory = function() {
	return new nme.filesystem.File(nme.filesystem.File.nme_filesystem_get_special_dir(1));
};
nme.filesystem.File.get_desktopDirectory = function() {
	return new nme.filesystem.File(nme.filesystem.File.nme_filesystem_get_special_dir(2));
};
nme.filesystem.File.get_documentsDirectory = function() {
	return new nme.filesystem.File(nme.filesystem.File.nme_filesystem_get_special_dir(3));
};
nme.filesystem.File.get_userDirectory = function() {
	return new nme.filesystem.File(nme.filesystem.File.nme_filesystem_get_special_dir(4));
};
nme.filesystem.File.prototype = {
	nativePath: null
	,url: null
	,set_nativePath: function(inPath) {
		this.nativePath = inPath;
		return this.nativePath;
	}
	,set_url: function(inPath) {
		if(inPath == null) {
			this.url = null;
		} else {
			this.url = StringTools.replace(inPath," ","%20");
			this.url = "file:" + this.url;
		}
		return this.url;
	}
	,toString: function() {
		return "File(" + this.nativePath + ")";
	}
	,__class__: nme.filesystem.File
	,__properties__: {set_url:"set_url",set_nativePath:"set_nativePath"}
};
nme.filesystem.StorageVolume = function(inRootDirPath,inName,inWritable,inRemovable,inFileSysType,inDrive) {
	this.rootDirectory = inRootDirPath;
	this.name = inName;
	this.fileSystemType = inFileSysType;
	this.isRemovable = inRemovable;
	this.isWritable = inWritable;
	this.drive = inDrive;
	if(this.drive == "") {
		this.drive = null;
	}
};
$hxClasses["nme.filesystem.StorageVolume"] = nme.filesystem.StorageVolume;
nme.filesystem.StorageVolume.__name__ = "nme.filesystem.StorageVolume";
nme.filesystem.StorageVolume.prototype = {
	drive: null
	,fileSystemType: null
	,isRemovable: null
	,isWritable: null
	,name: null
	,rootDirectory: null
	,toString: function() {
		return "StorageVolume(" + this.name + "@" + Std.string(this.rootDirectory) + ")";
	}
	,__class__: nme.filesystem.StorageVolume
};
nme.filesystem.StorageVolumeInfo = function() {
	nme.events.EventDispatcher.call(this);
	this.volumes = [];
	nme.filesystem.StorageVolumeInfo.nme_filesystem_get_volumes(this.volumes,function(args) {
		return new nme.filesystem.StorageVolume(new nme.filesystem.File(args[0]),args[1],args[2],args[3],args[4],args[5]);
	});
};
$hxClasses["nme.filesystem.StorageVolumeInfo"] = nme.filesystem.StorageVolumeInfo;
nme.filesystem.StorageVolumeInfo.__name__ = "nme.filesystem.StorageVolumeInfo";
nme.filesystem.StorageVolumeInfo.__properties__ = {get_storageVolumeInfo:"get_storageVolumeInfo"};
nme.filesystem.StorageVolumeInfo.storageVolumeInfo = null;
nme.filesystem.StorageVolumeInfo.nmeStorageVolumeInfo = null;
nme.filesystem.StorageVolumeInfo.getInstance = function() {
	if(nme.filesystem.StorageVolumeInfo.nmeStorageVolumeInfo == null) {
		nme.filesystem.StorageVolumeInfo.nmeStorageVolumeInfo = new nme.filesystem.StorageVolumeInfo();
	}
	return nme.filesystem.StorageVolumeInfo.nmeStorageVolumeInfo;
};
nme.filesystem.StorageVolumeInfo.get_storageVolumeInfo = function() {
	return nme.filesystem.StorageVolumeInfo.getInstance();
};
nme.filesystem.StorageVolumeInfo.__super__ = nme.events.EventDispatcher;
nme.filesystem.StorageVolumeInfo.prototype = $extend(nme.events.EventDispatcher.prototype,{
	volumes: null
	,getStorageVolumes: function() {
		return this.volumes.slice();
	}
	,__class__: nme.filesystem.StorageVolumeInfo
});
nme.filters = {};
nme.filters.BitmapFilter = function(inType) {
	this.type = inType;
};
$hxClasses["nme.filters.BitmapFilter"] = nme.filters.BitmapFilter;
nme.filters.BitmapFilter.__name__ = "nme.filters.BitmapFilter";
nme.filters.BitmapFilter.prototype = {
	type: null
	,clone: function() {
		throw haxe.Exception.thrown("clone not implemented");
	}
	,__class__: nme.filters.BitmapFilter
};
nme.filters.BitmapFilterQuality = function() { };
$hxClasses["nme.filters.BitmapFilterQuality"] = nme.filters.BitmapFilterQuality;
nme.filters.BitmapFilterQuality.__name__ = "nme.filters.BitmapFilterQuality";
nme.filters.BitmapFilterType = function() { };
$hxClasses["nme.filters.BitmapFilterType"] = nme.filters.BitmapFilterType;
nme.filters.BitmapFilterType.__name__ = "nme.filters.BitmapFilterType";
nme.filters.BlurFilter = function(inBlurX,inBlurY,inQuality) {
	if(inQuality == null) {
		inQuality = 1;
	}
	if(inBlurY == null) {
		inBlurY = 4.0;
	}
	if(inBlurX == null) {
		inBlurX = 4.0;
	}
	nme.filters.BitmapFilter.call(this,"BlurFilter");
	this.blurX = inBlurX;
	this.blurY = inBlurY;
	this.quality = inQuality;
};
$hxClasses["nme.filters.BlurFilter"] = nme.filters.BlurFilter;
nme.filters.BlurFilter.__name__ = "nme.filters.BlurFilter";
nme.filters.BlurFilter.__super__ = nme.filters.BitmapFilter;
nme.filters.BlurFilter.prototype = $extend(nme.filters.BitmapFilter.prototype,{
	blurX: null
	,blurY: null
	,quality: null
	,clone: function() {
		return new nme.filters.BlurFilter(this.blurX,this.blurY,this.quality);
	}
	,__class__: nme.filters.BlurFilter
});
nme.filters.ColorMatrixFilter = function(inMatrix) {
	nme.filters.BitmapFilter.call(this,"ColorMatrixFilter");
	this.matrix = inMatrix;
};
$hxClasses["nme.filters.ColorMatrixFilter"] = nme.filters.ColorMatrixFilter;
nme.filters.ColorMatrixFilter.__name__ = "nme.filters.ColorMatrixFilter";
nme.filters.ColorMatrixFilter.__super__ = nme.filters.BitmapFilter;
nme.filters.ColorMatrixFilter.prototype = $extend(nme.filters.BitmapFilter.prototype,{
	matrix: null
	,clone: function() {
		return new nme.filters.ColorMatrixFilter(this.matrix);
	}
	,__class__: nme.filters.ColorMatrixFilter
});
nme.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) {
		in_hideObject = false;
	}
	if(in_knockout == null) {
		in_knockout = false;
	}
	if(in_inner == null) {
		in_inner = false;
	}
	if(in_quality == null) {
		in_quality = 1;
	}
	if(in_strength == null) {
		in_strength = 1.0;
	}
	if(in_blurY == null) {
		in_blurY = 4.0;
	}
	if(in_blurX == null) {
		in_blurX = 4.0;
	}
	if(in_alpha == null) {
		in_alpha = 1.0;
	}
	if(in_color == null) {
		in_color = 0;
	}
	if(in_angle == null) {
		in_angle = 45.0;
	}
	if(in_distance == null) {
		in_distance = 4.0;
	}
	nme.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurY;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
};
$hxClasses["nme.filters.DropShadowFilter"] = nme.filters.DropShadowFilter;
nme.filters.DropShadowFilter.__name__ = "nme.filters.DropShadowFilter";
nme.filters.DropShadowFilter.__super__ = nme.filters.BitmapFilter;
nme.filters.DropShadowFilter.prototype = $extend(nme.filters.BitmapFilter.prototype,{
	alpha: null
	,angle: null
	,blurX: null
	,blurY: null
	,color: null
	,distance: null
	,hideObject: null
	,inner: null
	,knockout: null
	,quality: null
	,strength: null
	,clone: function() {
		return new nme.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: nme.filters.DropShadowFilter
});
nme.filters.GlowFilter = function(in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout) {
	if(in_knockout == null) {
		in_knockout = false;
	}
	if(in_inner == null) {
		in_inner = false;
	}
	if(in_quality == null) {
		in_quality = 1;
	}
	if(in_strength == null) {
		in_strength = 2.0;
	}
	if(in_blurY == null) {
		in_blurY = 6.0;
	}
	if(in_blurX == null) {
		in_blurX = 6.0;
	}
	if(in_alpha == null) {
		in_alpha = 1.0;
	}
	if(in_color == null) {
		in_color = 0;
	}
	nme.filters.DropShadowFilter.call(this,0,0,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,false);
};
$hxClasses["nme.filters.GlowFilter"] = nme.filters.GlowFilter;
nme.filters.GlowFilter.__name__ = "nme.filters.GlowFilter";
nme.filters.GlowFilter.__super__ = nme.filters.DropShadowFilter;
nme.filters.GlowFilter.prototype = $extend(nme.filters.DropShadowFilter.prototype,{
	__class__: nme.filters.GlowFilter
});
nme.geom = {};
nme.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) {
		inAlphaOffset = 0.0;
	}
	if(inBlueOffset == null) {
		inBlueOffset = 0.0;
	}
	if(inGreenOffset == null) {
		inGreenOffset = 0.0;
	}
	if(inRedOffset == null) {
		inRedOffset = 0.0;
	}
	if(inAlphaMultiplier == null) {
		inAlphaMultiplier = 1.0;
	}
	if(inBlueMultiplier == null) {
		inBlueMultiplier = 1.0;
	}
	if(inGreenMultiplier == null) {
		inGreenMultiplier = 1.0;
	}
	if(inRedMultiplier == null) {
		inRedMultiplier = 1.0;
	}
	this.redMultiplier = inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier;
	this.redOffset = inRedOffset;
	this.greenOffset = inGreenOffset;
	this.blueOffset = inBlueOffset;
	this.alphaOffset = inAlphaOffset;
};
$hxClasses["nme.geom.ColorTransform"] = nme.geom.ColorTransform;
nme.geom.ColorTransform.__name__ = "nme.geom.ColorTransform";
nme.geom.ColorTransform.prototype = {
	alphaMultiplier: null
	,alphaOffset: null
	,blueMultiplier: null
	,blueOffset: null
	,greenMultiplier: null
	,greenOffset: null
	,redMultiplier: null
	,redOffset: null
	,concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,__class__: nme.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
};
nme.geom.GeomTools = function() { };
$hxClasses["nme.geom.GeomTools"] = nme.geom.GeomTools;
nme.geom.GeomTools.__name__ = "nme.geom.GeomTools";
nme.geom.GeomTools.centerX = function(rect) {
	return rect.x + rect.width * 0.5;
};
nme.geom.GeomTools.centerY = function(rect) {
	return rect.y + rect.height * 0.5;
};
nme.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null ? 1.0 : in_a;
	this.b = in_b == null ? 0.0 : in_b;
	this.c = in_c == null ? 0.0 : in_c;
	this.d = in_d == null ? 1.0 : in_d;
	this.tx = in_tx == null ? 0.0 : in_tx;
	this.ty = in_ty == null ? 0.0 : in_ty;
};
$hxClasses["nme.geom.Matrix"] = nme.geom.Matrix;
nme.geom.Matrix.__name__ = "nme.geom.Matrix";
nme.geom.Matrix.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
	,copyFrom: function(src) {
		this.a = src.a;
		this.b = src.b;
		this.c = src.c;
		this.d = src.d;
		this.tx = src.tx;
		this.ty = src.ty;
	}
	,clone: function() {
		return new nme.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation == null ? 0.0 : rotation;
		this.tx = tx == null ? 0.0 : tx;
		this.ty = ty == null ? 0.0 : ty;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = this.c = 0;
		}
		this.tx = in_tx != null ? in_tx + in_width / 2 : in_width / 2;
		this.ty = in_ty != null ? in_ty + in_height / 2 : in_height / 2;
	}
	,deltaTransformPoint: function(point) {
		return new nme.geom.Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new nme.geom.Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
	}
	,setRotation: function(inTheta,inScale) {
		var scale = inScale == null ? 1.0 : inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,transformPoint: function(inPos) {
		return new nme.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,translate: function(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
	}
	,toString: function() {
		return "[ " + this.a + " " + this.b + " " + this.c + " " + this.d + " " + this.tx + " " + this.ty + " ]";
	}
	,__class__: nme.geom.Matrix
};
nme.geom.Matrix3D = function(v) {
	if(v != null && v.length == 16) {
		this.rawData = v;
	} else {
		this.rawData = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0];
	}
};
$hxClasses["nme.geom.Matrix3D"] = nme.geom.Matrix3D;
nme.geom.Matrix3D.__name__ = "nme.geom.Matrix3D";
nme.geom.Matrix3D.create2D = function(x,y,scale,rotation) {
	if(rotation == null) {
		rotation = 0;
	}
	if(scale == null) {
		scale = 1;
	}
	var theta = rotation * Math.PI / 180.0;
	var c = Math.cos(theta);
	var s = Math.sin(theta);
	return new nme.geom.Matrix3D([c * scale,-s * scale,0,0,s * scale,c * scale,0,0,0,0,1,0,x,y,0,1]);
};
nme.geom.Matrix3D.createABCD = function(a,b,c,d,tx,ty) {
	return new nme.geom.Matrix3D([a,b,0,0,c,d,0,0,0,0,1,0,tx,ty,0,1]);
};
nme.geom.Matrix3D.createOrtho = function(x0,x1,y0,y1,zNear,zFar) {
	var sx = 1.0 / (x1 - x0);
	var sy = 1.0 / (y1 - y0);
	var sz = 1.0 / (zFar - zNear);
	return new nme.geom.Matrix3D([2.0 * sx,0,0,0,0,2.0 * sy,0,0,0,0,-2.0 * sz,0,-(x0 + x1) * sx,-(y0 + y1) * sy,-(zNear + zFar) * sz,1]);
};
nme.geom.Matrix3D.getAxisRotation = function(x,y,z,degrees) {
	var m = new nme.geom.Matrix3D();
	var a1 = new nme.geom.Vector3D(x,y,z);
	var rad = -degrees * (Math.PI / 180);
	var c = Math.cos(rad);
	var s = Math.sin(rad);
	var t = 1.0 - c;
	m.rawData[0] = c + a1.x * a1.x * t;
	m.rawData[5] = c + a1.y * a1.y * t;
	m.rawData[10] = c + a1.z * a1.z * t;
	var tmp1 = a1.x * a1.y * t;
	var tmp2 = a1.z * s;
	m.rawData[4] = tmp1 + tmp2;
	m.rawData[1] = tmp1 - tmp2;
	tmp1 = a1.x * a1.z * t;
	tmp2 = a1.y * s;
	m.rawData[8] = tmp1 - tmp2;
	m.rawData[2] = tmp1 + tmp2;
	tmp1 = a1.y * a1.z * t;
	tmp2 = a1.x * s;
	m.rawData[9] = tmp1 + tmp2;
	m.rawData[6] = tmp1 - tmp2;
	return m;
};
nme.geom.Matrix3D.interpolate = function(thisMat,toMat,percent) {
	var m = new nme.geom.Matrix3D();
	var _g = 0;
	while(_g < 16) {
		var i = _g++;
		m.rawData[i] = thisMat.rawData[i] + (toMat.rawData[i] - thisMat.rawData[i]) * percent;
	}
	return m;
};
nme.geom.Matrix3D.prototype = {
	determinant: null
	,rawData: null
	,get_mxx: function() {
		return this.rawData[0];
	}
	,set_mxx: function(m) {
		return this.rawData[0] = m;
	}
	,get_myx: function() {
		return this.rawData[1];
	}
	,set_myx: function(m) {
		return this.rawData[1] = m;
	}
	,get_mzx: function() {
		return this.rawData[2];
	}
	,set_mzx: function(m) {
		return this.rawData[2] = m;
	}
	,get_mwx: function() {
		return this.rawData[3];
	}
	,set_mwx: function(m) {
		return this.rawData[3] = m;
	}
	,get_mxy: function() {
		return this.rawData[4];
	}
	,set_mxy: function(m) {
		return this.rawData[4] = m;
	}
	,get_myy: function() {
		return this.rawData[5];
	}
	,set_myy: function(m) {
		return this.rawData[5] = m;
	}
	,get_mzy: function() {
		return this.rawData[6];
	}
	,set_mzy: function(m) {
		return this.rawData[6] = m;
	}
	,get_mwy: function() {
		return this.rawData[7];
	}
	,set_mwy: function(m) {
		return this.rawData[7] = m;
	}
	,get_mxz: function() {
		return this.rawData[8];
	}
	,set_mxz: function(m) {
		return this.rawData[8] = m;
	}
	,get_myz: function() {
		return this.rawData[9];
	}
	,set_myz: function(m) {
		return this.rawData[9] = m;
	}
	,get_mzz: function() {
		return this.rawData[10];
	}
	,set_mzz: function(m) {
		return this.rawData[10] = m;
	}
	,get_mwz: function() {
		return this.rawData[11];
	}
	,set_mwz: function(m) {
		return this.rawData[11] = m;
	}
	,get_tx: function() {
		return this.rawData[12];
	}
	,set_tx: function(m) {
		return this.rawData[12] = m;
	}
	,get_ty: function() {
		return this.rawData[13];
	}
	,set_ty: function(m) {
		return this.rawData[13] = m;
	}
	,get_tz: function() {
		return this.rawData[14];
	}
	,set_tz: function(m) {
		return this.rawData[14] = m;
	}
	,get_tw: function() {
		return this.rawData[15];
	}
	,set_tw: function(m) {
		return this.rawData[15] = m;
	}
	,append: function(lhs) {
		var m111 = this.rawData[0];
		var m121 = this.rawData[4];
		var m131 = this.rawData[8];
		var m141 = this.rawData[12];
		var m112 = this.rawData[1];
		var m122 = this.rawData[5];
		var m132 = this.rawData[9];
		var m142 = this.rawData[13];
		var m113 = this.rawData[2];
		var m123 = this.rawData[6];
		var m133 = this.rawData[10];
		var m143 = this.rawData[14];
		var m114 = this.rawData[3];
		var m124 = this.rawData[7];
		var m134 = this.rawData[11];
		var m144 = this.rawData[15];
		var m211 = lhs.rawData[0];
		var m221 = lhs.rawData[4];
		var m231 = lhs.rawData[8];
		var m241 = lhs.rawData[12];
		var m212 = lhs.rawData[1];
		var m222 = lhs.rawData[5];
		var m232 = lhs.rawData[9];
		var m242 = lhs.rawData[13];
		var m213 = lhs.rawData[2];
		var m223 = lhs.rawData[6];
		var m233 = lhs.rawData[10];
		var m243 = lhs.rawData[14];
		var m214 = lhs.rawData[3];
		var m224 = lhs.rawData[7];
		var m234 = lhs.rawData[11];
		var m244 = lhs.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,appendRotation: function(degrees,axis,pivotPoint) {
		var x = axis.x;
		var y = axis.y;
		var z = axis.z;
		var m = new nme.geom.Matrix3D();
		var a1 = new nme.geom.Vector3D(x,y,z);
		var rad = -degrees * (Math.PI / 180);
		var c = Math.cos(rad);
		var s = Math.sin(rad);
		var t = 1.0 - c;
		m.rawData[0] = c + a1.x * a1.x * t;
		m.rawData[5] = c + a1.y * a1.y * t;
		m.rawData[10] = c + a1.z * a1.z * t;
		var tmp1 = a1.x * a1.y * t;
		var tmp2 = a1.z * s;
		m.rawData[4] = tmp1 + tmp2;
		m.rawData[1] = tmp1 - tmp2;
		tmp1 = a1.x * a1.z * t;
		tmp2 = a1.y * s;
		m.rawData[8] = tmp1 - tmp2;
		m.rawData[2] = tmp1 + tmp2;
		tmp1 = a1.y * a1.z * t;
		tmp2 = a1.x * s;
		m.rawData[9] = tmp1 + tmp2;
		m.rawData[6] = tmp1 - tmp2;
		var m1 = m;
		if(pivotPoint != null) {
			var p = pivotPoint;
			m1.rawData[12] += p.x;
			m1.rawData[13] += p.y;
			m1.rawData[14] += p.z;
		}
		this.append(m1);
	}
	,appendScale: function(xScale,yScale,zScale) {
		this.append(new nme.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]));
	}
	,appendTranslation: function(x,y,z) {
		this.rawData[12] += x;
		this.rawData[13] += y;
		this.rawData[14] += z;
	}
	,clone: function() {
		return new nme.geom.Matrix3D(this.rawData.slice());
	}
	,copyColumnFrom: function(column,vector3D) {
		switch(column) {
		case 0:
			this.rawData[0] = vector3D.x;
			this.rawData[1] = vector3D.y;
			this.rawData[2] = vector3D.z;
			this.rawData[3] = vector3D.w;
			break;
		case 1:
			this.rawData[4] = vector3D.x;
			this.rawData[5] = vector3D.y;
			this.rawData[6] = vector3D.z;
			this.rawData[7] = vector3D.w;
			break;
		case 2:
			this.rawData[8] = vector3D.x;
			this.rawData[9] = vector3D.y;
			this.rawData[10] = vector3D.z;
			this.rawData[11] = vector3D.w;
			break;
		case 3:
			this.rawData[12] = vector3D.x;
			this.rawData[13] = vector3D.y;
			this.rawData[14] = vector3D.z;
			this.rawData[15] = vector3D.w;
			break;
		default:
			throw haxe.Exception.thrown("Error, Column " + column + " out of bounds [0, ..., 3]");
		}
	}
	,copyColumnTo: function(column,vector3D) {
		switch(column) {
		case 0:
			vector3D.x = this.rawData[0];
			vector3D.y = this.rawData[1];
			vector3D.z = this.rawData[2];
			vector3D.w = this.rawData[3];
			break;
		case 1:
			vector3D.x = this.rawData[4];
			vector3D.y = this.rawData[5];
			vector3D.z = this.rawData[6];
			vector3D.w = this.rawData[7];
			break;
		case 2:
			vector3D.x = this.rawData[8];
			vector3D.y = this.rawData[9];
			vector3D.z = this.rawData[10];
			vector3D.w = this.rawData[11];
			break;
		case 3:
			vector3D.x = this.rawData[12];
			vector3D.y = this.rawData[13];
			vector3D.z = this.rawData[14];
			vector3D.w = this.rawData[15];
			break;
		default:
			throw haxe.Exception.thrown("Error, Column " + column + " out of bounds [0, ..., 3]");
		}
	}
	,copyFrom: function(other) {
		this.rawData = other.rawData.slice();
	}
	,copyRawDataFrom: function(vector,index,transpose) {
		if(transpose == null) {
			transpose = false;
		}
		if(index == null) {
			index = 0;
		}
		if(transpose) {
			var oRawData = this.rawData.slice();
			this.rawData[1] = oRawData[4];
			this.rawData[2] = oRawData[8];
			this.rawData[3] = oRawData[12];
			this.rawData[4] = oRawData[1];
			this.rawData[6] = oRawData[9];
			this.rawData[7] = oRawData[13];
			this.rawData[8] = oRawData[2];
			this.rawData[9] = oRawData[6];
			this.rawData[11] = oRawData[14];
			this.rawData[12] = oRawData[3];
			this.rawData[13] = oRawData[7];
			this.rawData[14] = oRawData[11];
		}
		var l = vector.length - index;
		var _g = 0;
		var _g1 = l;
		while(_g < _g1) {
			var c = _g++;
			this.rawData[c] = vector[c + index];
		}
		if(transpose) {
			var oRawData = this.rawData.slice();
			this.rawData[1] = oRawData[4];
			this.rawData[2] = oRawData[8];
			this.rawData[3] = oRawData[12];
			this.rawData[4] = oRawData[1];
			this.rawData[6] = oRawData[9];
			this.rawData[7] = oRawData[13];
			this.rawData[8] = oRawData[2];
			this.rawData[9] = oRawData[6];
			this.rawData[11] = oRawData[14];
			this.rawData[12] = oRawData[3];
			this.rawData[13] = oRawData[7];
			this.rawData[14] = oRawData[11];
		}
	}
	,copyRawDataTo: function(vector,index,transpose) {
		if(transpose == null) {
			transpose = false;
		}
		if(index == null) {
			index = 0;
		}
		if(transpose) {
			var oRawData = this.rawData.slice();
			this.rawData[1] = oRawData[4];
			this.rawData[2] = oRawData[8];
			this.rawData[3] = oRawData[12];
			this.rawData[4] = oRawData[1];
			this.rawData[6] = oRawData[9];
			this.rawData[7] = oRawData[13];
			this.rawData[8] = oRawData[2];
			this.rawData[9] = oRawData[6];
			this.rawData[11] = oRawData[14];
			this.rawData[12] = oRawData[3];
			this.rawData[13] = oRawData[7];
			this.rawData[14] = oRawData[11];
		}
		var l = this.rawData.length;
		var _g = 0;
		var _g1 = l;
		while(_g < _g1) {
			var c = _g++;
			vector[c + index] = this.rawData[c];
		}
		if(transpose) {
			var oRawData = this.rawData.slice();
			this.rawData[1] = oRawData[4];
			this.rawData[2] = oRawData[8];
			this.rawData[3] = oRawData[12];
			this.rawData[4] = oRawData[1];
			this.rawData[6] = oRawData[9];
			this.rawData[7] = oRawData[13];
			this.rawData[8] = oRawData[2];
			this.rawData[9] = oRawData[6];
			this.rawData[11] = oRawData[14];
			this.rawData[12] = oRawData[3];
			this.rawData[13] = oRawData[7];
			this.rawData[14] = oRawData[11];
		}
	}
	,oglString: function(join) {
		if(join == null) {
			join = "\n";
		}
		return "[ " + this.rawData[0] + " " + this.rawData[1] + " " + this.rawData[2] + " " + this.rawData[11] + " ]" + join + "[ " + this.rawData[4] + " " + this.rawData[5] + " " + this.rawData[6] + " " + this.rawData[7] + " ]" + join + "[ " + this.rawData[8] + " " + this.rawData[9] + " " + this.rawData[10] + " " + this.rawData[11] + " ]" + join + "[ " + this.rawData[12] + " " + this.rawData[13] + " " + this.rawData[14] + " " + this.rawData[15] + " ]";
	}
	,copyRowFrom: function(row,vector3D) {
		switch(row) {
		case 0:
			this.rawData[0] = vector3D.x;
			this.rawData[4] = vector3D.y;
			this.rawData[8] = vector3D.z;
			this.rawData[12] = vector3D.w;
			break;
		case 1:
			this.rawData[1] = vector3D.x;
			this.rawData[5] = vector3D.y;
			this.rawData[9] = vector3D.z;
			this.rawData[13] = vector3D.w;
			break;
		case 2:
			this.rawData[2] = vector3D.x;
			this.rawData[6] = vector3D.y;
			this.rawData[10] = vector3D.z;
			this.rawData[14] = vector3D.w;
			break;
		case 3:
			this.rawData[3] = vector3D.x;
			this.rawData[7] = vector3D.y;
			this.rawData[11] = vector3D.z;
			this.rawData[15] = vector3D.w;
			break;
		default:
			throw haxe.Exception.thrown("Error, Row " + (row == null ? "null" : Std.string(UInt.toFloat(row))) + " out of bounds [0, ..., 3]");
		}
	}
	,decompose: function() {
		var length = null;
		var this1 = [];
		var tmp = length != null && length > 0;
		var vec = this1;
		var m = new nme.geom.Matrix3D(this.rawData.slice());
		var mr = m.rawData;
		var pos = new nme.geom.Vector3D(mr[12],mr[13],mr[14]);
		mr[12] = 0;
		mr[13] = 0;
		mr[14] = 0;
		var scale = new nme.geom.Vector3D();
		scale.x = Math.sqrt(mr[0] * mr[0] + mr[1] * mr[1] + mr[2] * mr[2]);
		scale.y = Math.sqrt(mr[4] * mr[4] + mr[5] * mr[5] + mr[6] * mr[6]);
		scale.z = Math.sqrt(mr[8] * mr[8] + mr[9] * mr[9] + mr[10] * mr[10]);
		if(mr[0] * (mr[5] * mr[10] - mr[6] * mr[9]) - mr[1] * (mr[4] * mr[10] - mr[6] * mr[8]) + mr[2] * (mr[4] * mr[9] - mr[5] * mr[8]) < 0) {
			scale.z = -scale.z;
		}
		mr[0] /= scale.x;
		mr[1] /= scale.x;
		mr[2] /= scale.x;
		mr[4] /= scale.y;
		mr[5] /= scale.y;
		mr[6] /= scale.y;
		mr[8] /= scale.z;
		mr[9] /= scale.z;
		mr[10] /= scale.z;
		var rot = new nme.geom.Vector3D();
		rot.y = Math.asin(-mr[2]);
		var C = Math.cos(rot.y);
		if(C > 0) {
			rot.x = Math.atan2(mr[6],mr[10]);
			rot.z = Math.atan2(mr[1],mr[0]);
		} else {
			rot.z = 0;
			rot.x = Math.atan2(mr[4],mr[5]);
		}
		vec.push(pos);
		vec.push(rot);
		vec.push(scale);
		return vec;
	}
	,deltaTransformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new nme.geom.Vector3D(x * this.rawData[0] + y * this.rawData[1] + z * this.rawData[2] + this.rawData[3],x * this.rawData[4] + y * this.rawData[5] + z * this.rawData[6] + this.rawData[7],x * this.rawData[8] + y * this.rawData[9] + z * this.rawData[10] + this.rawData[11],0);
	}
	,identity: function() {
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
	}
	,interpolateTo: function(toMat,percent) {
		var _g = 0;
		while(_g < 16) {
			var i = _g++;
			this.rawData[i] += (toMat.rawData[i] - this.rawData[i]) * percent;
		}
	}
	,invert: function(minDet) {
		if(minDet == null) {
			minDet = 1e-11;
		}
		var d = -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
		var invertable = Math.abs(d) > minDet;
		if(invertable) {
			d = -1 / d;
			var m11 = this.rawData[0];
			var m21 = this.rawData[4];
			var m31 = this.rawData[8];
			var m41 = this.rawData[12];
			var m12 = this.rawData[1];
			var m22 = this.rawData[5];
			var m32 = this.rawData[9];
			var m42 = this.rawData[13];
			var m13 = this.rawData[2];
			var m23 = this.rawData[6];
			var m33 = this.rawData[10];
			var m43 = this.rawData[14];
			var m14 = this.rawData[3];
			var m24 = this.rawData[7];
			var m34 = this.rawData[11];
			var m44 = this.rawData[15];
			this.rawData[0] = d * (m22 * (m33 * m44 - m43 * m34) - m32 * (m23 * m44 - m43 * m24) + m42 * (m23 * m34 - m33 * m24));
			this.rawData[1] = -d * (m12 * (m33 * m44 - m43 * m34) - m32 * (m13 * m44 - m43 * m14) + m42 * (m13 * m34 - m33 * m14));
			this.rawData[2] = d * (m12 * (m23 * m44 - m43 * m24) - m22 * (m13 * m44 - m43 * m14) + m42 * (m13 * m24 - m23 * m14));
			this.rawData[3] = -d * (m12 * (m23 * m34 - m33 * m24) - m22 * (m13 * m34 - m33 * m14) + m32 * (m13 * m24 - m23 * m14));
			this.rawData[4] = -d * (m21 * (m33 * m44 - m43 * m34) - m31 * (m23 * m44 - m43 * m24) + m41 * (m23 * m34 - m33 * m24));
			this.rawData[5] = d * (m11 * (m33 * m44 - m43 * m34) - m31 * (m13 * m44 - m43 * m14) + m41 * (m13 * m34 - m33 * m14));
			this.rawData[6] = -d * (m11 * (m23 * m44 - m43 * m24) - m21 * (m13 * m44 - m43 * m14) + m41 * (m13 * m24 - m23 * m14));
			this.rawData[7] = d * (m11 * (m23 * m34 - m33 * m24) - m21 * (m13 * m34 - m33 * m14) + m31 * (m13 * m24 - m23 * m14));
			this.rawData[8] = d * (m21 * (m32 * m44 - m42 * m34) - m31 * (m22 * m44 - m42 * m24) + m41 * (m22 * m34 - m32 * m24));
			this.rawData[9] = -d * (m11 * (m32 * m44 - m42 * m34) - m31 * (m12 * m44 - m42 * m14) + m41 * (m12 * m34 - m32 * m14));
			this.rawData[10] = d * (m11 * (m22 * m44 - m42 * m24) - m21 * (m12 * m44 - m42 * m14) + m41 * (m12 * m24 - m22 * m14));
			this.rawData[11] = -d * (m11 * (m22 * m34 - m32 * m24) - m21 * (m12 * m34 - m32 * m14) + m31 * (m12 * m24 - m22 * m14));
			this.rawData[12] = -d * (m21 * (m32 * m43 - m42 * m33) - m31 * (m22 * m43 - m42 * m23) + m41 * (m22 * m33 - m32 * m23));
			this.rawData[13] = d * (m11 * (m32 * m43 - m42 * m33) - m31 * (m12 * m43 - m42 * m13) + m41 * (m12 * m33 - m32 * m13));
			this.rawData[14] = -d * (m11 * (m22 * m43 - m42 * m23) - m21 * (m12 * m43 - m42 * m13) + m41 * (m12 * m23 - m22 * m13));
			this.rawData[15] = d * (m11 * (m22 * m33 - m32 * m23) - m21 * (m12 * m33 - m32 * m13) + m31 * (m12 * m23 - m22 * m13));
		}
		return invertable;
	}
	,prepend: function(rhs) {
		var m111 = rhs.rawData[0];
		var m121 = rhs.rawData[4];
		var m131 = rhs.rawData[8];
		var m141 = rhs.rawData[12];
		var m112 = rhs.rawData[1];
		var m122 = rhs.rawData[5];
		var m132 = rhs.rawData[9];
		var m142 = rhs.rawData[13];
		var m113 = rhs.rawData[2];
		var m123 = rhs.rawData[6];
		var m133 = rhs.rawData[10];
		var m143 = rhs.rawData[14];
		var m114 = rhs.rawData[3];
		var m124 = rhs.rawData[7];
		var m134 = rhs.rawData[11];
		var m144 = rhs.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependRotation: function(degrees,axis,pivotPoint) {
		var x = axis.x;
		var y = axis.y;
		var z = axis.z;
		var m = new nme.geom.Matrix3D();
		var a1 = new nme.geom.Vector3D(x,y,z);
		var rad = -degrees * (Math.PI / 180);
		var c = Math.cos(rad);
		var s = Math.sin(rad);
		var t = 1.0 - c;
		m.rawData[0] = c + a1.x * a1.x * t;
		m.rawData[5] = c + a1.y * a1.y * t;
		m.rawData[10] = c + a1.z * a1.z * t;
		var tmp1 = a1.x * a1.y * t;
		var tmp2 = a1.z * s;
		m.rawData[4] = tmp1 + tmp2;
		m.rawData[1] = tmp1 - tmp2;
		tmp1 = a1.x * a1.z * t;
		tmp2 = a1.y * s;
		m.rawData[8] = tmp1 - tmp2;
		m.rawData[2] = tmp1 + tmp2;
		tmp1 = a1.y * a1.z * t;
		tmp2 = a1.x * s;
		m.rawData[9] = tmp1 + tmp2;
		m.rawData[6] = tmp1 - tmp2;
		var m1 = m;
		if(pivotPoint != null) {
			var p = pivotPoint;
			m1.rawData[12] += p.x;
			m1.rawData[13] += p.y;
			m1.rawData[14] += p.z;
		}
		var m111 = m1.rawData[0];
		var m121 = m1.rawData[4];
		var m131 = m1.rawData[8];
		var m141 = m1.rawData[12];
		var m112 = m1.rawData[1];
		var m122 = m1.rawData[5];
		var m132 = m1.rawData[9];
		var m142 = m1.rawData[13];
		var m113 = m1.rawData[2];
		var m123 = m1.rawData[6];
		var m133 = m1.rawData[10];
		var m143 = m1.rawData[14];
		var m114 = m1.rawData[3];
		var m124 = m1.rawData[7];
		var m134 = m1.rawData[11];
		var m144 = m1.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependScale: function(xScale,yScale,zScale) {
		var rhs = new nme.geom.Matrix3D([xScale,0.0,0.0,0.0,0.0,yScale,0.0,0.0,0.0,0.0,zScale,0.0,0.0,0.0,0.0,1.0]);
		var m111 = rhs.rawData[0];
		var m121 = rhs.rawData[4];
		var m131 = rhs.rawData[8];
		var m141 = rhs.rawData[12];
		var m112 = rhs.rawData[1];
		var m122 = rhs.rawData[5];
		var m132 = rhs.rawData[9];
		var m142 = rhs.rawData[13];
		var m113 = rhs.rawData[2];
		var m123 = rhs.rawData[6];
		var m133 = rhs.rawData[10];
		var m143 = rhs.rawData[14];
		var m114 = rhs.rawData[3];
		var m124 = rhs.rawData[7];
		var m134 = rhs.rawData[11];
		var m144 = rhs.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,prependTranslation: function(x,y,z) {
		var m = new nme.geom.Matrix3D();
		var val = new nme.geom.Vector3D(x,y,z);
		m.rawData[12] = val.x;
		m.rawData[13] = val.y;
		m.rawData[14] = val.z;
		var m111 = m.rawData[0];
		var m121 = m.rawData[4];
		var m131 = m.rawData[8];
		var m141 = m.rawData[12];
		var m112 = m.rawData[1];
		var m122 = m.rawData[5];
		var m132 = m.rawData[9];
		var m142 = m.rawData[13];
		var m113 = m.rawData[2];
		var m123 = m.rawData[6];
		var m133 = m.rawData[10];
		var m143 = m.rawData[14];
		var m114 = m.rawData[3];
		var m124 = m.rawData[7];
		var m134 = m.rawData[11];
		var m144 = m.rawData[15];
		var m211 = this.rawData[0];
		var m221 = this.rawData[4];
		var m231 = this.rawData[8];
		var m241 = this.rawData[12];
		var m212 = this.rawData[1];
		var m222 = this.rawData[5];
		var m232 = this.rawData[9];
		var m242 = this.rawData[13];
		var m213 = this.rawData[2];
		var m223 = this.rawData[6];
		var m233 = this.rawData[10];
		var m243 = this.rawData[14];
		var m214 = this.rawData[3];
		var m224 = this.rawData[7];
		var m234 = this.rawData[11];
		var m244 = this.rawData[15];
		this.rawData[0] = m111 * m211 + m112 * m221 + m113 * m231 + m114 * m241;
		this.rawData[1] = m111 * m212 + m112 * m222 + m113 * m232 + m114 * m242;
		this.rawData[2] = m111 * m213 + m112 * m223 + m113 * m233 + m114 * m243;
		this.rawData[3] = m111 * m214 + m112 * m224 + m113 * m234 + m114 * m244;
		this.rawData[4] = m121 * m211 + m122 * m221 + m123 * m231 + m124 * m241;
		this.rawData[5] = m121 * m212 + m122 * m222 + m123 * m232 + m124 * m242;
		this.rawData[6] = m121 * m213 + m122 * m223 + m123 * m233 + m124 * m243;
		this.rawData[7] = m121 * m214 + m122 * m224 + m123 * m234 + m124 * m244;
		this.rawData[8] = m131 * m211 + m132 * m221 + m133 * m231 + m134 * m241;
		this.rawData[9] = m131 * m212 + m132 * m222 + m133 * m232 + m134 * m242;
		this.rawData[10] = m131 * m213 + m132 * m223 + m133 * m233 + m134 * m243;
		this.rawData[11] = m131 * m214 + m132 * m224 + m133 * m234 + m134 * m244;
		this.rawData[12] = m141 * m211 + m142 * m221 + m143 * m231 + m144 * m241;
		this.rawData[13] = m141 * m212 + m142 * m222 + m143 * m232 + m144 * m242;
		this.rawData[14] = m141 * m213 + m142 * m223 + m143 * m233 + m144 * m243;
		this.rawData[15] = m141 * m214 + m142 * m224 + m143 * m234 + m144 * m244;
	}
	,recompose: function(components) {
		if(components.length < 3 || components[2].x == 0 || components[2].y == 0 || components[2].z == 0) {
			return false;
		}
		this.rawData[0] = 1;
		this.rawData[1] = 0;
		this.rawData[2] = 0;
		this.rawData[3] = 0;
		this.rawData[4] = 0;
		this.rawData[5] = 1;
		this.rawData[6] = 0;
		this.rawData[7] = 0;
		this.rawData[8] = 0;
		this.rawData[9] = 0;
		this.rawData[10] = 1;
		this.rawData[11] = 0;
		this.rawData[12] = 0;
		this.rawData[13] = 0;
		this.rawData[14] = 0;
		this.rawData[15] = 1;
		this.append(new nme.geom.Matrix3D([components[2].x,0.0,0.0,0.0,0.0,components[2].y,0.0,0.0,0.0,0.0,components[2].z,0.0,0.0,0.0,0.0,1.0]));
		var angle = -components[1].x;
		this.append(new nme.geom.Matrix3D([1,0,0,0,0,Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,0]));
		angle = -components[1].y;
		this.append(new nme.geom.Matrix3D([Math.cos(angle),0,Math.sin(angle),0,0,1,0,0,-Math.sin(angle),0,Math.cos(angle),0,0,0,0,0]));
		angle = -components[1].z;
		this.append(new nme.geom.Matrix3D([Math.cos(angle),-Math.sin(angle),0,0,Math.sin(angle),Math.cos(angle),0,0,0,0,1,0,0,0,0,0]));
		var val = components[0];
		this.rawData[12] = val.x;
		this.rawData[13] = val.y;
		this.rawData[14] = val.z;
		this.rawData[15] = 1;
		return true;
	}
	,transformVector: function(v) {
		var x = v.x;
		var y = v.y;
		var z = v.z;
		return new nme.geom.Vector3D(x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12],x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13],x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14],x * this.rawData[3] + y * this.rawData[7] + z * this.rawData[11] + this.rawData[15]);
	}
	,transformVectors: function(vin,vout) {
		var i = 0;
		while(i + 3 <= vin.length) {
			var x = vin[i];
			var y = vin[i + 1];
			var z = vin[i + 2];
			vout[i] = x * this.rawData[0] + y * this.rawData[4] + z * this.rawData[8] + this.rawData[12];
			vout[i + 1] = x * this.rawData[1] + y * this.rawData[5] + z * this.rawData[9] + this.rawData[13];
			vout[i + 2] = x * this.rawData[2] + y * this.rawData[6] + z * this.rawData[10] + this.rawData[14];
			i += 3;
		}
	}
	,transpose: function() {
		var oRawData = this.rawData.slice();
		this.rawData[1] = oRawData[4];
		this.rawData[2] = oRawData[8];
		this.rawData[3] = oRawData[12];
		this.rawData[4] = oRawData[1];
		this.rawData[6] = oRawData[9];
		this.rawData[7] = oRawData[13];
		this.rawData[8] = oRawData[2];
		this.rawData[9] = oRawData[6];
		this.rawData[11] = oRawData[14];
		this.rawData[12] = oRawData[3];
		this.rawData[13] = oRawData[7];
		this.rawData[14] = oRawData[11];
	}
	,get_determinant: function() {
		return -1 * ((this.rawData[0] * this.rawData[5] - this.rawData[4] * this.rawData[1]) * (this.rawData[10] * this.rawData[15] - this.rawData[14] * this.rawData[11]) - (this.rawData[0] * this.rawData[9] - this.rawData[8] * this.rawData[1]) * (this.rawData[6] * this.rawData[15] - this.rawData[14] * this.rawData[7]) + (this.rawData[0] * this.rawData[13] - this.rawData[12] * this.rawData[1]) * (this.rawData[6] * this.rawData[11] - this.rawData[10] * this.rawData[7]) + (this.rawData[4] * this.rawData[9] - this.rawData[8] * this.rawData[5]) * (this.rawData[2] * this.rawData[15] - this.rawData[14] * this.rawData[3]) - (this.rawData[4] * this.rawData[13] - this.rawData[12] * this.rawData[5]) * (this.rawData[2] * this.rawData[11] - this.rawData[10] * this.rawData[3]) + (this.rawData[8] * this.rawData[13] - this.rawData[12] * this.rawData[9]) * (this.rawData[2] * this.rawData[7] - this.rawData[6] * this.rawData[3]));
	}
	,get_position: function() {
		return new nme.geom.Vector3D(this.rawData[12],this.rawData[13],this.rawData[14]);
	}
	,set_position: function(val) {
		this.rawData[12] = val.x;
		this.rawData[13] = val.y;
		this.rawData[14] = val.z;
		return val;
	}
	,__class__: nme.geom.Matrix3D
	,__properties__: {set_tw:"set_tw",get_tw:"get_tw",set_tz:"set_tz",get_tz:"get_tz",set_ty:"set_ty",get_ty:"get_ty",set_tx:"set_tx",get_tx:"get_tx",set_mwz:"set_mwz",get_mwz:"get_mwz",set_mzz:"set_mzz",get_mzz:"get_mzz",set_myz:"set_myz",get_myz:"get_myz",set_mxz:"set_mxz",get_mxz:"get_mxz",set_mwy:"set_mwy",get_mwy:"get_mwy",set_mzy:"set_mzy",get_mzy:"get_mzy",set_myy:"set_myy",get_myy:"get_myy",set_mxy:"set_mxy",get_mxy:"get_mxy",set_mwx:"set_mwx",get_mwx:"get_mwx",set_mzx:"set_mzx",get_mzx:"get_mzx",set_myx:"set_myx",get_myx:"get_myx",set_mxx:"set_mxx",get_mxx:"get_mxx",set_position:"set_position",get_position:"get_position",get_determinant:"get_determinant"}
};
nme.geom.Point = function(inX,inY) {
	if(inY == null) {
		inY = 0;
	}
	if(inX == null) {
		inX = 0;
	}
	this.x = inX;
	this.y = inY;
};
$hxClasses["nme.geom.Point"] = nme.geom.Point;
nme.geom.Point.__name__ = "nme.geom.Point";
nme.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
nme.geom.Point.interpolate = function(pt1,pt2,f) {
	return new nme.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
nme.geom.Point.polar = function(len,angle) {
	return new nme.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
};
nme.geom.Point.prototype = {
	x: null
	,y: null
	,add: function(v) {
		return new nme.geom.Point(v.x + this.x,v.y + this.y);
	}
	,scaled: function(scale) {
		return new nme.geom.Point(this.x * scale,this.y * scale);
	}
	,clone: function() {
		return new nme.geom.Point(this.x,this.y);
	}
	,setTo: function(inX,inY) {
		this.x = inX;
		this.y = inY;
		return this;
	}
	,copyFrom: function(sourcePoint) {
		this.x = sourcePoint.x;
		this.y = sourcePoint.y;
	}
	,dist: function(pt2) {
		var dx = this.x - pt2.x;
		var dy = this.y - pt2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	,dist2: function(pt2) {
		var dx = this.x - pt2.x;
		var dy = this.y - pt2.y;
		return dx * dx + dy * dy;
	}
	,equals: function(toCompare) {
		if(toCompare.x == this.x) {
			return toCompare.y == this.y;
		} else {
			return false;
		}
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) {
			return;
		} else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,subtract: function(v) {
		return new nme.geom.Point(this.x - v.x,this.y - v.y);
	}
	,toString: function() {
		return "(x=" + this.x + ", y=" + this.y + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: nme.geom.Point
	,__properties__: {get_length:"get_length"}
};
nme.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	this.x = inX == null ? 0 : inX;
	this.y = inY == null ? 0 : inY;
	this.width = inWidth == null ? 0 : inWidth;
	this.height = inHeight == null ? 0 : inHeight;
};
$hxClasses["nme.geom.Rectangle"] = nme.geom.Rectangle;
nme.geom.Rectangle.__name__ = "nme.geom.Rectangle";
nme.geom.Rectangle.prototype = {
	height: null
	,width: null
	,x: null
	,y: null
	,toString: function() {
		return "Rectangle(" + this.x + "," + this.y + " " + this.width + ("x" + this.height + ")");
	}
	,setTo: function(inX,inY,inWidth,inHeight) {
		this.x = inX;
		this.y = inY;
		this.width = inWidth;
		this.height = inHeight;
	}
	,clone: function() {
		return new nme.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(inX,inY) {
		if(inX >= this.x && inY >= this.y && inX < this.get_right()) {
			return inY < this.get_bottom();
		} else {
			return false;
		}
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(this.contains(rect.x,rect.y)) {
			return this.containsPoint(rect.get_bottomRight());
		} else {
			return false;
		}
	}
	,equals: function(toCompare) {
		if(this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width) {
			return this.height == toCompare.height;
		} else {
			return false;
		}
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) {
			this.set_right(r.get_right());
		}
		if(r.get_bottom() > this.get_bottom()) {
			this.set_bottom(r.get_bottom());
		}
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
		var x1 = this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right();
		if(x1 <= x0) {
			return new nme.geom.Rectangle();
		}
		var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom();
		if(y1 <= y0) {
			return new nme.geom.Rectangle();
		}
		return new nme.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
		var x1 = this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right();
		if(x1 <= x0) {
			return false;
		}
		var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		if(this.width == 0) {
			return this.height == 0;
		} else {
			return false;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) {
			tx0 = tx;
		}
		if(ty < ty0) {
			ty0 = ty;
		}
		if(tx > tx1) {
			tx1 = tx;
		}
		if(ty > ty1) {
			ty1 = ty;
		}
		return new nme.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x ? toUnion.x : this.x;
		var x1 = this.get_right() < toUnion.get_right() ? toUnion.get_right() : this.get_right();
		var y0 = this.y > toUnion.y ? toUnion.y : this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom() ? toUnion.get_bottom() : this.get_bottom();
		return new nme.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottomRight: function() {
		return new nme.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_size: function() {
		return new nme.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_topLeft: function() {
		return new nme.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_centre: function() {
		return new nme.geom.Point(this.x + this.width * 0.5,this.y + this.height * 0.5);
	}
	,set_centre: function(p) {
		this.x = p.x - this.width * 0.5;
		this.y = p.y - this.height * 0.5;
		return p.clone();
	}
	,__class__: nme.geom.Rectangle
	,__properties__: {set_centre:"set_centre",get_centre:"get_centre",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
nme.geom.Transform = function(inParent) {
	this.nmeObj = inParent;
};
$hxClasses["nme.geom.Transform"] = nme.geom.Transform;
nme.geom.Transform.__name__ = "nme.geom.Transform";
nme.geom.Transform.prototype = {
	concatenatedColorTransform: null
	,concatenatedMatrix: null
	,pixelBounds: null
	,nmeObj: null
	,get_colorTransform: function() {
		return this.nmeObj.nmeGetColorTransform();
	}
	,set_colorTransform: function(inTrans) {
		this.nmeObj.nmeSetColorTransform(inTrans);
		return inTrans;
	}
	,get_concatenatedColorTransform: function() {
		return this.nmeObj.nmeGetConcatenatedColorTransform();
	}
	,get_concatenatedMatrix: function() {
		return this.nmeObj.nmeGetConcatenatedMatrix();
	}
	,get_matrix: function() {
		return this.nmeObj.nmeGetMatrix();
	}
	,set_matrix: function(inMatrix) {
		this.nmeObj.nmeSetMatrix(inMatrix);
		return inMatrix;
	}
	,get_pixelBounds: function() {
		return this.nmeObj.nmeGetPixelBounds();
	}
	,__class__: nme.geom.Transform
	,__properties__: {get_pixelBounds:"get_pixelBounds",set_matrix:"set_matrix",get_matrix:"get_matrix",get_concatenatedMatrix:"get_concatenatedMatrix",get_concatenatedColorTransform:"get_concatenatedColorTransform",set_colorTransform:"set_colorTransform",get_colorTransform:"get_colorTransform"}
};
nme.geom.Vector3D = function(x,y,z,w) {
	if(w == null) {
		w = 1.0;
	}
	if(z == null) {
		z = 0.;
	}
	if(y == null) {
		y = 0.;
	}
	if(x == null) {
		x = 0.;
	}
	this.w = w;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["nme.geom.Vector3D"] = nme.geom.Vector3D;
nme.geom.Vector3D.__name__ = "nme.geom.Vector3D";
nme.geom.Vector3D.__properties__ = {get_Z_AXIS:"get_Z_AXIS",get_Y_AXIS:"get_Y_AXIS",get_X_AXIS:"get_X_AXIS"};
nme.geom.Vector3D.X_AXIS = null;
nme.geom.Vector3D.Y_AXIS = null;
nme.geom.Vector3D.Z_AXIS = null;
nme.geom.Vector3D.angleBetween = function(a,b) {
	var a0 = new nme.geom.Vector3D(a.x,a.y,a.z,a.w);
	var l = Math.sqrt(a0.x * a0.x + a0.y * a0.y + a0.z * a0.z);
	if(l != 0) {
		a0.x /= l;
		a0.y /= l;
		a0.z /= l;
	}
	var b0 = new nme.geom.Vector3D(b.x,b.y,b.z,b.w);
	var l = Math.sqrt(b0.x * b0.x + b0.y * b0.y + b0.z * b0.z);
	if(l != 0) {
		b0.x /= l;
		b0.y /= l;
		b0.z /= l;
	}
	return Math.acos(a0.x * b0.x + a0.y * b0.y + a0.z * b0.z);
};
nme.geom.Vector3D.distance = function(pt1,pt2) {
	var x = pt2.x - pt1.x;
	var y = pt2.y - pt1.y;
	var z = pt2.z - pt1.z;
	return Math.sqrt(x * x + y * y + z * z);
};
nme.geom.Vector3D.get_X_AXIS = function() {
	return new nme.geom.Vector3D(1,0,0);
};
nme.geom.Vector3D.get_Y_AXIS = function() {
	return new nme.geom.Vector3D(0,1,0);
};
nme.geom.Vector3D.get_Z_AXIS = function() {
	return new nme.geom.Vector3D(0,0,1);
};
nme.geom.Vector3D.prototype = {
	length: null
	,lengthSquared: null
	,w: null
	,x: null
	,y: null
	,z: null
	,normW: function() {
		if(this.w != 0 && this.w != 1) {
			this.x /= this.w;
			this.y /= this.w;
			this.z /= this.w;
		}
		return this;
	}
	,toPoint: function() {
		return new nme.geom.Point(this.x,this.y);
	}
	,add: function(a) {
		return new nme.geom.Vector3D(this.x + a.x,this.y + a.y,this.z + a.z);
	}
	,clone: function() {
		return new nme.geom.Vector3D(this.x,this.y,this.z,this.w);
	}
	,copyFrom: function(sourceVector3D) {
		this.x = sourceVector3D.x;
		this.y = sourceVector3D.y;
		this.z = sourceVector3D.z;
	}
	,crossProduct: function(a) {
		return new nme.geom.Vector3D(this.y * a.z - this.z * a.y,this.z * a.x - this.x * a.z,this.x * a.y - this.y * a.x,1);
	}
	,decrementBy: function(a) {
		this.x -= a.x;
		this.y -= a.y;
		this.z -= a.z;
	}
	,dotProduct: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z;
	}
	,equals: function(toCompare,allFour) {
		if(allFour == null) {
			allFour = false;
		}
		if(this.x == toCompare.x && this.y == toCompare.y && this.z == toCompare.z) {
			if(!(!allFour)) {
				return this.w == toCompare.w;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,incrementBy: function(a) {
		this.x += a.x;
		this.y += a.y;
		this.z += a.z;
	}
	,nearEquals: function(toCompare,tolerance,allFour) {
		if(allFour == null) {
			allFour = false;
		}
		if(Math.abs(this.x - toCompare.x) < tolerance && Math.abs(this.y - toCompare.y) < tolerance && Math.abs(this.z - toCompare.z) < tolerance) {
			if(!(!allFour)) {
				return Math.abs(this.w - toCompare.w) < tolerance;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,negate: function() {
		this.x *= -1;
		this.y *= -1;
		this.z *= -1;
	}
	,normalize: function() {
		var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		if(l != 0) {
			this.x /= l;
			this.y /= l;
			this.z /= l;
		}
		return l;
	}
	,project: function() {
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
	}
	,setTo: function(xa,ya,za) {
		this.x = xa;
		this.y = ya;
		this.z = za;
	}
	,scaleBy: function(s) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}
	,subtract: function(a) {
		return new nme.geom.Vector3D(this.x - a.x,this.y - a.y,this.z - a.z);
	}
	,toString: function() {
		return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,get_lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	,__class__: nme.geom.Vector3D
	,__properties__: {get_lengthSquared:"get_lengthSquared",get_length:"get_length"}
};
nme.gl = {};
nme.gl.GL = function() { };
$hxClasses["nme.gl.GL"] = nme.gl.GL;
nme.gl.GL.__name__ = "nme.gl.GL";
nme.gl.GL.getParameter = function(pname) {
	return 0;
};
nme.gl.WebGL2Context = function() {
};
$hxClasses["nme.gl.WebGL2Context"] = nme.gl.WebGL2Context;
nme.gl.WebGL2Context.__name__ = "nme.gl.WebGL2Context";
nme.gl.WebGL2Context.getParameter = function(pname) {
	return 0;
};
nme.gl.WebGL2Context.prototype = {
	__class__: nme.gl.WebGL2Context
};
nme.graphics = {};
nme.graphics.opengl = {};
nme.graphics.opengl.ext = {};
nme.graphics.opengl.ext.EXT_texture_compression_s3tc = function() {
	this.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779;
	this.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778;
	this.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777;
	this.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776;
};
$hxClasses["nme.graphics.opengl.ext.EXT_texture_compression_s3tc"] = nme.graphics.opengl.ext.EXT_texture_compression_s3tc;
nme.graphics.opengl.ext.EXT_texture_compression_s3tc.__name__ = "nme.graphics.opengl.ext.EXT_texture_compression_s3tc";
nme.graphics.opengl.ext.EXT_texture_compression_s3tc.prototype = {
	COMPRESSED_RGB_S3TC_DXT1_EXT: null
	,COMPRESSED_RGBA_S3TC_DXT1_EXT: null
	,COMPRESSED_RGBA_S3TC_DXT3_EXT: null
	,COMPRESSED_RGBA_S3TC_DXT5_EXT: null
	,__class__: nme.graphics.opengl.ext.EXT_texture_compression_s3tc
};
nme.graphics.opengl.ext.EXT_texture_filter_anisotropic = function() {
	this.MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047;
	this.TEXTURE_MAX_ANISOTROPY_EXT = 34046;
};
$hxClasses["nme.graphics.opengl.ext.EXT_texture_filter_anisotropic"] = nme.graphics.opengl.ext.EXT_texture_filter_anisotropic;
nme.graphics.opengl.ext.EXT_texture_filter_anisotropic.__name__ = "nme.graphics.opengl.ext.EXT_texture_filter_anisotropic";
nme.graphics.opengl.ext.EXT_texture_filter_anisotropic.prototype = {
	TEXTURE_MAX_ANISOTROPY_EXT: null
	,MAX_TEXTURE_MAX_ANISOTROPY_EXT: null
	,__class__: nme.graphics.opengl.ext.EXT_texture_filter_anisotropic
};
nme.graphics.opengl.ext.NV_draw_buffers = function() {
	this.COLOR_ATTACHMENT15_NV = 36079;
	this.COLOR_ATTACHMENT14_NV = 36078;
	this.COLOR_ATTACHMENT13_NV = 36077;
	this.COLOR_ATTACHMENT12_NV = 36076;
	this.COLOR_ATTACHMENT11_NV = 36075;
	this.COLOR_ATTACHMENT10_NV = 36074;
	this.COLOR_ATTACHMENT9_NV = 36073;
	this.COLOR_ATTACHMENT8_NV = 36072;
	this.COLOR_ATTACHMENT7_NV = 36071;
	this.COLOR_ATTACHMENT6_NV = 36070;
	this.COLOR_ATTACHMENT5_NV = 36069;
	this.COLOR_ATTACHMENT4_NV = 36068;
	this.COLOR_ATTACHMENT3_NV = 36067;
	this.COLOR_ATTACHMENT2_NV = 36066;
	this.COLOR_ATTACHMENT1_NV = 36065;
	this.COLOR_ATTACHMENT0_NV = 36064;
	this.DRAW_BUFFER15_NV = 34868;
	this.DRAW_BUFFER14_NV = 34867;
	this.DRAW_BUFFER13_NV = 34866;
	this.DRAW_BUFFER12_NV = 34865;
	this.DRAW_BUFFER11_NV = 34864;
	this.DRAW_BUFFER10_NV = 34863;
	this.DRAW_BUFFER9_NV = 34862;
	this.DRAW_BUFFER8_NV = 34861;
	this.DRAW_BUFFER7_NV = 34860;
	this.DRAW_BUFFER6_NV = 34859;
	this.DRAW_BUFFER5_NV = 34858;
	this.DRAW_BUFFER4_NV = 34857;
	this.DRAW_BUFFER3_NV = 34856;
	this.DRAW_BUFFER2_NV = 34855;
	this.DRAW_BUFFER1_NV = 34854;
	this.DRAW_BUFFER0_NV = 34853;
	this.MAX_DRAW_BUFFERS_NV = 34852;
};
$hxClasses["nme.graphics.opengl.ext.NV_draw_buffers"] = nme.graphics.opengl.ext.NV_draw_buffers;
nme.graphics.opengl.ext.NV_draw_buffers.__name__ = "nme.graphics.opengl.ext.NV_draw_buffers";
nme.graphics.opengl.ext.NV_draw_buffers.prototype = {
	MAX_DRAW_BUFFERS_NV: null
	,DRAW_BUFFER0_NV: null
	,DRAW_BUFFER1_NV: null
	,DRAW_BUFFER2_NV: null
	,DRAW_BUFFER3_NV: null
	,DRAW_BUFFER4_NV: null
	,DRAW_BUFFER5_NV: null
	,DRAW_BUFFER6_NV: null
	,DRAW_BUFFER7_NV: null
	,DRAW_BUFFER8_NV: null
	,DRAW_BUFFER9_NV: null
	,DRAW_BUFFER10_NV: null
	,DRAW_BUFFER11_NV: null
	,DRAW_BUFFER12_NV: null
	,DRAW_BUFFER13_NV: null
	,DRAW_BUFFER14_NV: null
	,DRAW_BUFFER15_NV: null
	,COLOR_ATTACHMENT0_NV: null
	,COLOR_ATTACHMENT1_NV: null
	,COLOR_ATTACHMENT2_NV: null
	,COLOR_ATTACHMENT3_NV: null
	,COLOR_ATTACHMENT4_NV: null
	,COLOR_ATTACHMENT5_NV: null
	,COLOR_ATTACHMENT6_NV: null
	,COLOR_ATTACHMENT7_NV: null
	,COLOR_ATTACHMENT8_NV: null
	,COLOR_ATTACHMENT9_NV: null
	,COLOR_ATTACHMENT10_NV: null
	,COLOR_ATTACHMENT11_NV: null
	,COLOR_ATTACHMENT12_NV: null
	,COLOR_ATTACHMENT13_NV: null
	,COLOR_ATTACHMENT14_NV: null
	,COLOR_ATTACHMENT15_NV: null
	,__class__: nme.graphics.opengl.ext.NV_draw_buffers
};
nme.image = {};
nme.image.PixelFormat = function() { };
$hxClasses["nme.image.PixelFormat"] = nme.image.PixelFormat;
nme.image.PixelFormat.__name__ = "nme.image.PixelFormat";
nme.image.PixelFormat.channelCount = function(inFormat) {
	switch(inFormat) {
	case 0:
		return 3;
	case 3:case 4:case 10:case 11:
		return 1;
	case 5:
		return 2;
	case 6:case 7:
		return 4;
	case 1:case 2:case 8:case 9:
		return 4;
	default:
		throw haxe.Exception.thrown("Unknown pixel format " + inFormat);
	}
};
nme.macros = {};
nme.macros.Prime = function() { };
$hxClasses["nme.macros.Prime"] = nme.macros.Prime;
nme.macros.Prime.__name__ = "nme.macros.Prime";
nme.media = {};
nme.media.AudioSampleFormat = $hxEnums["nme.media.AudioSampleFormat"] = { __ename__:"nme.media.AudioSampleFormat",__constructs__:null
	,UInt8: {_hx_name:"UInt8",_hx_index:0,__enum__:"nme.media.AudioSampleFormat",toString:$estr}
	,SInt16: {_hx_name:"SInt16",_hx_index:1,__enum__:"nme.media.AudioSampleFormat",toString:$estr}
	,Float32: {_hx_name:"Float32",_hx_index:2,__enum__:"nme.media.AudioSampleFormat",toString:$estr}
};
nme.media.AudioSampleFormat.__constructs__ = [nme.media.AudioSampleFormat.UInt8,nme.media.AudioSampleFormat.SInt16,nme.media.AudioSampleFormat.Float32];
nme.media.AudioSampleFormat.__empty_constructs__ = [nme.media.AudioSampleFormat.UInt8,nme.media.AudioSampleFormat.SInt16,nme.media.AudioSampleFormat.Float32];
nme.media.Camera = function(inHandle) {
	nme.events.EventDispatcher.call(this);
	this.width = 0;
	this.height = 0;
	this.nmeHandle = inHandle;
	this.bitmapData = null;
};
$hxClasses["nme.media.Camera"] = nme.media.Camera;
nme.media.Camera.__name__ = "nme.media.Camera";
nme.media.Camera.cameraMap = null;
nme.media.Camera.getCamera = function(name) {
	if(name == null) {
		name = "default";
	}
	if(nme.media.Camera.cameraMap == null) {
		nme.media.Camera.cameraMap = new haxe.ds.StringMap();
	}
	if(Object.prototype.hasOwnProperty.call(nme.media.Camera.cameraMap.h,name)) {
		return nme.media.Camera.cameraMap.h[name];
	}
	var handle = nme.media.Camera.nme_camera_create(name);
	if(handle == null) {
		return null;
	}
	var result = new nme.media.Camera(handle);
	nme.media.Camera.cameraMap.h[name] = result;
	nme.Lib.get_current().get_stage().addEventListener("enterFrame",$bind(result,result.onPoll));
	return result;
};
nme.media.Camera.__super__ = nme.events.EventDispatcher;
nme.media.Camera.prototype = $extend(nme.events.EventDispatcher.prototype,{
	bitmapData: null
	,errorString: null
	,width: null
	,height: null
	,nmeHandle: null
	,_on_error: function() {
		var event = new nme.events.StatusEvent("status");
		event.code = "Camera.muted";
		event.level = "error";
		this.dispatchEvent(event);
		nme.Lib.get_current().get_stage().removeEventListener("enterFrame",$bind(this,this.onPoll));
	}
	,_init_frame_fmt: function(inPixelFormat) {
		this.bitmapData = new nme.display.BitmapData(this.width,this.height,false,0,inPixelFormat);
		var event = new nme.events.StatusEvent("status");
		event.code = "Camera.unmuted";
		event.level = "status";
		this.dispatchEvent(event);
		return this.bitmapData.nmeHandle;
	}
	,_init_frame: function() {
		this.bitmapData = new nme.display.BitmapData(this.width,this.height,true);
		var event = new nme.events.StatusEvent("status");
		event.code = "Camera.unmuted";
		event.level = "status";
		this.dispatchEvent(event);
		return this.bitmapData.nmeHandle;
	}
	,_on_frame: function() {
		var event = new nme.events.Event("videoFrame");
		this.dispatchEvent(event);
	}
	,onPoll: function(_) {
		nme.media.Camera.nme_camera_on_poll(this.nmeHandle,this);
	}
	,__class__: nme.media.Camera
});
nme.media.ID3Info = function() {
};
$hxClasses["nme.media.ID3Info"] = nme.media.ID3Info;
nme.media.ID3Info.__name__ = "nme.media.ID3Info";
nme.media.ID3Info.prototype = {
	album: null
	,artist: null
	,comment: null
	,genre: null
	,songName: null
	,track: null
	,year: null
	,__class__: nme.media.ID3Info
};
nme.media.SampleRate = $hxEnums["nme.media.SampleRate"] = { __ename__:"nme.media.SampleRate",__constructs__:null
	,Rate11025: {_hx_name:"Rate11025",_hx_index:0,__enum__:"nme.media.SampleRate",toString:$estr}
	,Rate22050: {_hx_name:"Rate22050",_hx_index:1,__enum__:"nme.media.SampleRate",toString:$estr}
	,Rate44100: {_hx_name:"Rate44100",_hx_index:2,__enum__:"nme.media.SampleRate",toString:$estr}
};
nme.media.SampleRate.__constructs__ = [nme.media.SampleRate.Rate11025,nme.media.SampleRate.Rate22050,nme.media.SampleRate.Rate44100];
nme.media.SampleRate.__empty_constructs__ = [nme.media.SampleRate.Rate11025,nme.media.SampleRate.Rate22050,nme.media.SampleRate.Rate44100];
nme.media.Sound = function(stream,context,forcePlayAsMusic,inEngine) {
	if(forcePlayAsMusic == null) {
		forcePlayAsMusic = false;
	}
	nme.events.EventDispatcher.call(this);
	if(stream == null) {
		var className = js.Boot.getClass(this);
		if(Object.prototype.hasOwnProperty.call(className,"resourceName")) {
			stream = new nme.net.URLRequest(Reflect.field(className,"resourceName"));
			forcePlayAsMusic = true;
		}
	}
	this.bytesLoaded = this.bytesTotal = 0;
	this.nmeLoading = false;
	this.nmeDynamicSound = false;
	if(stream != null) {
		this.load(stream,context,forcePlayAsMusic,inEngine);
	}
};
$hxClasses["nme.media.Sound"] = nme.media.Sound;
nme.media.Sound.__name__ = "nme.media.Sound";
nme.media.Sound.suspend = function(inSuspend,inFlags) {
	if(inFlags == null) {
		inFlags = 2;
	}
	nme.media.Sound.nme_sound_suspend(inSuspend,inFlags);
};
nme.media.Sound.__super__ = nme.events.EventDispatcher;
nme.media.Sound.prototype = $extend(nme.events.EventDispatcher.prototype,{
	bytesLoaded: null
	,bytesTotal: null
	,id3: null
	,isBuffering: null
	,length: null
	,url: null
	,nmeHandle: null
	,nmeLoading: null
	,nmeDynamicSound: null
	,getEngine: function() {
		return nme.media.Sound.nme_sound_get_engine(this.nmeHandle);
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) {
			useWeakReference = false;
		}
		if(priority == null) {
			priority = 0;
		}
		if(useCapture == null) {
			useCapture = false;
		}
		nme.events.EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		if(type == "sampleData") {
			if(this.nmeHandle != null) {
				throw haxe.Exception.thrown("Can't use dynamic sound once file loaded");
			}
			this.nmeDynamicSound = true;
			this.nmeLoading = false;
		}
	}
	,close: function() {
		if(this.nmeHandle != null) {
			nme.media.Sound.nme_sound_close(this.nmeHandle);
		}
		if(this.nmeHandle != null) {
			nme.NativeResource.nme_native_resource_dispose(this.nmeHandle);
			this.nmeHandle = null;
		}
		this.nmeLoading = false;
	}
	,load: function(stream,context,forcePlayAsMusic,inEngine) {
		if(forcePlayAsMusic == null) {
			forcePlayAsMusic = false;
		}
		this.bytesLoaded = this.bytesTotal = 0;
		this.nmeHandle = nme.media.Sound.nme_sound_from_file(stream.url,forcePlayAsMusic,inEngine);
		if(this.nmeHandle == null) {
			throw haxe.Exception.thrown("Could not load " + (forcePlayAsMusic ? "music" : "sound") + ":" + stream.url);
		} else {
			nme.NativeResource.nme_native_resource_lock(this.nmeHandle);
			this.url = stream.url;
			this.nmeLoading = false;
			this.nmeCheckLoading();
		}
	}
	,loadCompressedDataFromByteArray: function(bytes,length,forcePlayAsMusic,inEngine) {
		if(forcePlayAsMusic == null) {
			forcePlayAsMusic = false;
		}
		this.bytesLoaded = this.bytesTotal = length;
		this.nmeHandle = nme.media.Sound.nme_sound_from_data(bytes,length,forcePlayAsMusic,inEngine);
		if(this.nmeHandle == null) {
			throw haxe.Exception.thrown("Could not load buffer with length: " + length);
		} else {
			nme.NativeResource.nme_native_resource_lock(this.nmeHandle);
		}
	}
	,loadPCMFromByteArray: function(Bytes,samples,format,stereo,sampleRate,inEngine) {
		if(sampleRate == null) {
			sampleRate = 44100.0;
		}
		if(stereo == null) {
			stereo = true;
		}
		if(format == null) {
			format = "float";
		}
		var wav = new nme.utils.ByteArray();
		wav.set_endian("littleEndian");
		var AudioFormat;
		switch(format) {
		case "float":
			AudioFormat = 3;
			break;
		case "short":
			AudioFormat = 1;
			break;
		default:
			throw haxe.Exception.thrown(new nme.errors.Error("Unsupported format " + format));
		}
		var NumChannels = stereo ? 2 : 1;
		var SampleRate = sampleRate | 0;
		var BitsPerSample;
		switch(format) {
		case "float":
			BitsPerSample = 32;
			break;
		case "short":
			BitsPerSample = 16;
			break;
		default:
			throw haxe.Exception.thrown(new nme.errors.Error("Unsupported format " + format));
		}
		var ByteRate = SampleRate * NumChannels * BitsPerSample / 8 | 0;
		var BlockAlign = NumChannels * BitsPerSample / 8 | 0;
		var NumSamples = Bytes.length / BlockAlign | 0;
		wav.writeUTFBytes("RIFF");
		wav.writeInt(36 + Bytes.length);
		wav.writeUTFBytes("WAVE");
		wav.writeUTFBytes("fmt ");
		wav.writeInt(16);
		wav.writeShort(AudioFormat);
		wav.writeShort(NumChannels);
		wav.writeInt(SampleRate);
		wav.writeInt(ByteRate);
		wav.writeShort(BlockAlign);
		wav.writeShort(BitsPerSample);
		wav.writeUTFBytes("data");
		wav.writeInt(Bytes.length);
		wav.writeBytes(Bytes,0,Bytes.length);
		wav.position = 0;
		this.loadCompressedDataFromByteArray(wav,wav.length);
	}
	,nmeCheckLoading: function() {
		if(!this.nmeDynamicSound && this.nmeLoading && this.nmeHandle != null) {
			var status = nme.media.Sound.nme_sound_get_status(this.nmeHandle);
			if(status == null) {
				throw haxe.Exception.thrown("Could not get sound status");
			}
			this.bytesLoaded = status.bytesLoaded;
			this.bytesTotal = status.bytesTotal;
			this.nmeLoading = this.bytesLoaded < this.bytesTotal;
			if(status.error != null) {
				throw haxe.Exception.thrown(status.error);
			}
		}
	}
	,nmeOnError: function(msg) {
		this.dispatchEvent(new nme.events.IOErrorEvent("ioError",true,false,msg));
		this.close();
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) {
			loops = 0;
		}
		if(startTime == null) {
			startTime = 0;
		}
		this.nmeCheckLoading();
		if(this.nmeDynamicSound) {
			var request = new nme.events.SampleDataEvent("sampleData");
			this.dispatchEvent(request);
			if(request.data.length > 0) {
				this.nmeHandle = nme.media.Sound.nme_sound_channel_create_dynamic(request.data,sndTransform);
			}
			if(this.nmeHandle == null) {
				return null;
			}
			var result = nme.media.SoundChannel.createDynamic(this.nmeHandle,sndTransform,this);
			nme.NativeResource.nme_native_resource_lock(this.nmeHandle);
			return result;
		} else {
			if(this.nmeHandle == null || this.nmeLoading) {
				return null;
			}
			var result = new nme.media.SoundChannel(this.nmeHandle,startTime,loops,sndTransform);
			if(result.nmeHandle == null) {
				return null;
			}
			return result;
		}
	}
	,get_id3: function() {
		this.nmeCheckLoading();
		if(this.nmeHandle == null || this.nmeLoading) {
			return null;
		}
		var id3 = new nme.media.ID3Info();
		nme.media.Sound.nme_sound_get_id3(this.nmeHandle,id3);
		return id3;
	}
	,get_isBuffering: function() {
		this.nmeCheckLoading();
		if(this.nmeLoading) {
			return this.nmeHandle == null;
		} else {
			return false;
		}
	}
	,get_length: function() {
		if(this.nmeHandle == null || this.nmeLoading) {
			return 0;
		}
		return nme.media.Sound.nme_sound_get_length(this.nmeHandle);
	}
	,__class__: nme.media.Sound
	,__properties__: {get_length:"get_length",get_isBuffering:"get_isBuffering",get_id3:"get_id3"}
});
nme.media.SoundChannel = function(inSoundHandle,startTime,loops,sndTransform) {
	nme.events.EventDispatcher.call(this);
	this.pitch = 1.0;
	this.nmeStopped = false;
	if(sndTransform != null) {
		this.nmeTransform = sndTransform.clone();
	}
	if(inSoundHandle != null) {
		this.nmeHandle = nme.media.SoundChannel.nme_sound_channel_create(inSoundHandle,startTime,loops,this.nmeTransform);
	}
	if(this.nmeHandle != null) {
		nme.NativeResource.nme_native_resource_lock(this.nmeHandle);
		nme.media.SoundChannel.nmeIncompleteList.push(this);
	}
};
$hxClasses["nme.media.SoundChannel"] = nme.media.SoundChannel;
nme.media.SoundChannel.__name__ = "nme.media.SoundChannel";
nme.media.SoundChannel.createAsync = function(inRate,inIsStereo,sampleFormat,asyncDataRequired,inEngine) {
	var handle = nme.media.SoundChannel.nme_sound_channel_create_async(inRate._hx_index,inIsStereo,sampleFormat._hx_index,asyncDataRequired,inEngine);
	if(handle == null) {
		return null;
	}
	return new nme.media.SoundChannel(handle,0,0,null);
};
nme.media.SoundChannel.createDynamic = function(inSoundHandle,sndTransform,dataProvider) {
	var result = new nme.media.SoundChannel(null,0,0,sndTransform);
	result.nmeDataProvider = dataProvider;
	result.nmeHandle = inSoundHandle;
	nme.media.SoundChannel.nmeIncompleteList.push(result);
	nme.media.SoundChannel.nmeDynamicSoundCount++;
	return result;
};
nme.media.SoundChannel.nmeCompletePending = function() {
	return nme.media.SoundChannel.nmeIncompleteList.length > 0;
};
nme.media.SoundChannel.nmePollComplete = function() {
	if(nme.media.SoundChannel.nmeIsPolling) {
		return;
	}
	nme.media.SoundChannel.nmeIsPolling = true;
	var checkLength = nme.media.SoundChannel.nmeIncompleteList.length;
	if(checkLength > 0) {
		var idx = 0;
		while(idx < checkLength) {
			var channel = nme.media.SoundChannel.nmeIncompleteList[idx];
			if(channel.nmeCheckComplete()) {
				nme.media.SoundChannel.nmeIncompleteList.splice(idx,1);
				--checkLength;
				if(!channel.nmeStopped) {
					channel.dispatchComplete();
				}
			} else {
				++idx;
			}
		}
	}
	nme.media.SoundChannel.nmeIsPolling = false;
};
nme.media.SoundChannel.__super__ = nme.events.EventDispatcher;
nme.media.SoundChannel.prototype = $extend(nme.events.EventDispatcher.prototype,{
	leftPeak: null
	,rightPeak: null
	,pitch: null
	,nmeStopped: null
	,nmeHandle: null
	,nmeTransform: null
	,nmeDataProvider: null
	,postBuffer: function(inData) {
		if(this.nmeHandle != null) {
			nme.media.SoundChannel.nme_sound_channel_post_buffer(this.nmeHandle,inData);
		}
	}
	,nmeCheckComplete: function() {
		if(this.nmeHandle != null) {
			if(this.nmeDataProvider != null && nme.media.SoundChannel.nme_sound_channel_needs_data(this.nmeHandle)) {
				var request = new nme.events.SampleDataEvent("sampleData");
				request.position = nme.media.SoundChannel.nme_sound_channel_get_data_position(this.nmeHandle);
				this.nmeDataProvider.dispatchEvent(request);
				if(request.data.length > 0) {
					nme.media.SoundChannel.nme_sound_channel_add_data(this.nmeHandle,request.data);
				}
			}
			if(nme.media.SoundChannel.nme_sound_channel_is_complete(this.nmeHandle)) {
				this.nmeHandle = null;
				if(this.nmeDataProvider != null) {
					nme.media.SoundChannel.nmeDynamicSoundCount--;
				}
				return true;
			}
		}
		return false;
	}
	,dispatchComplete: function() {
		var complete = new nme.events.Event("soundComplete");
		this.dispatchEvent(complete);
		if(this.nmeHandle != null) {
			nme.NativeResource.nme_native_resource_dispose(this.nmeHandle);
			this.nmeHandle = null;
		}
	}
	,stop: function() {
		this.nmeStopped = true;
		nme.media.SoundChannel.nme_sound_channel_stop(this.nmeHandle);
		nme.media.SoundChannel.nmePollComplete();
	}
	,get_leftPeak: function() {
		return nme.media.SoundChannel.nme_sound_channel_get_left(this.nmeHandle);
	}
	,get_rightPeak: function() {
		return nme.media.SoundChannel.nme_sound_channel_get_right(this.nmeHandle);
	}
	,get_position: function() {
		return nme.media.SoundChannel.nme_sound_channel_get_position(this.nmeHandle);
	}
	,set_position: function(value) {
		nme.media.SoundChannel.nme_sound_channel_set_position(this.nmeHandle,this.get_position());
		return value;
	}
	,get_soundTransform: function() {
		if(this.nmeTransform == null) {
			this.nmeTransform = new nme.media.SoundTransform();
		}
		return this.nmeTransform.clone();
	}
	,set_soundTransform: function(inTransform) {
		this.nmeTransform = inTransform.clone();
		nme.media.SoundChannel.nme_sound_channel_set_transform(this.nmeHandle,this.nmeTransform);
		return inTransform;
	}
	,__class__: nme.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",set_position:"set_position",get_position:"get_position",get_rightPeak:"get_rightPeak",get_leftPeak:"get_leftPeak"}
});
nme.media.SoundEngine = function() { };
$hxClasses["nme.media.SoundEngine"] = nme.media.SoundEngine;
nme.media.SoundEngine.__name__ = "nme.media.SoundEngine";
nme.media.SoundEngine.getAvailableEngines = function() {
	return ["sdl"];
};
nme.media.SoundEngine.getEngine = function(sound) {
	return sound.getEngine();
};
nme.media.SoundLoaderContext = function() {
};
$hxClasses["nme.media.SoundLoaderContext"] = nme.media.SoundLoaderContext;
nme.media.SoundLoaderContext.__name__ = "nme.media.SoundLoaderContext";
nme.media.SoundLoaderContext.prototype = {
	__class__: nme.media.SoundLoaderContext
};
nme.media.SoundTransform = function(vol,panning) {
	if(panning == null) {
		panning = 0.0;
	}
	if(vol == null) {
		vol = 1.0;
	}
	this.volume = vol;
	this.pan = panning;
};
$hxClasses["nme.media.SoundTransform"] = nme.media.SoundTransform;
nme.media.SoundTransform.__name__ = "nme.media.SoundTransform";
nme.media.SoundTransform.prototype = {
	pan: null
	,volume: null
	,clone: function() {
		return new nme.media.SoundTransform(this.volume,this.pan);
	}
	,__class__: nme.media.SoundTransform
};
nme.media.StageVideo = function(inStage) {
	nme.events.EventDispatcher.call(this);
	this.nmeStage = inStage;
	this.depth = 0;
	this.nmePan = new nme.geom.Point(0,0);
	this.nmeZoom = new nme.geom.Point(1,1);
	this.videoWidth = 0;
	this.videoHeight = 0;
	this.duration = 0;
	this.nmeViewport = new nme.geom.Rectangle(0,0,0,0);
};
$hxClasses["nme.media.StageVideo"] = nme.media.StageVideo;
nme.media.StageVideo.__name__ = "nme.media.StageVideo";
nme.media.StageVideo.__super__ = nme.events.EventDispatcher;
nme.media.StageVideo.prototype = $extend(nme.events.EventDispatcher.prototype,{
	colorSpaces: null
	,depth: null
	,videoHeight: null
	,videoWidth: null
	,duration: null
	,seekFrom: null
	,seekCode: null
	,nmeHandle: null
	,nmePan: null
	,nmeZoom: null
	,nmeViewport: null
	,nmeNetStream: null
	,nmeStage: null
	,get_colorSpaces: function() {
		var length = null;
		var this1 = [];
		var tmp = length != null && length > 0;
		var colorSpaces = this1;
		colorSpaces.push("BT.709");
		return colorSpaces;
	}
	,attachNetStream: function(inNetStream) {
		if(this.nmeNetStream != null) {
			this.nmeNetStream.nmeAttachedVideo = null;
		}
		this.nmeNetStream = inNetStream;
		if(this.nmeNetStream != null) {
			this.nmeNetStream.nmeAttachedVideo = this;
			this.nmeCreate();
			if(this.nmeNetStream.nmeFilename != null) {
				this.nmePlay(this.nmeNetStream.nmeFilename,this.nmeNetStream.nmeSeek,this.nmeNetStream.nmePaused ? -3 : -1);
			}
		} else {
			this.nmeDestroy();
		}
	}
	,get_pan: function() {
		return this.nmePan.clone();
	}
	,set_pan: function(inPan) {
		this.nmePan = inPan.clone();
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_pan(this.nmeHandle,inPan.x,inPan.y);
		}
		return inPan;
	}
	,get_zoom: function() {
		return this.nmeZoom.clone();
	}
	,set_zoom: function(inZoom) {
		this.nmeZoom = inZoom.clone();
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_zoom(this.nmeHandle,this.nmeZoom.x,this.nmeZoom.y);
		}
		return inZoom;
	}
	,get_viewPort: function() {
		return this.nmeViewport.clone();
	}
	,set_viewPort: function(inVp) {
		this.nmeViewport = inVp.clone();
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_viewport(this.nmeHandle,inVp.x,inVp.y,inVp.width,inVp.height);
		}
		return inVp;
	}
	,nmeCreate: function() {
		if(this.nmeHandle == null) {
			this.nmeHandle = nme.media.StageVideo.nme_sv_create(this.nmeStage.nmeHandle,this);
		}
		return this.nmeHandle != null;
	}
	,nmeDestroy: function() {
		if(this.nmeNetStream != null && this.nmeNetStream.nmeAttachedVideo != null) {
			this.nmeNetStream.nmeAttachedVideo = null;
		}
		this.nmeNetStream = null;
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_destroy(this.nmeHandle);
		}
		this.nmeHandle = null;
	}
	,nmeGetTime: function() {
		if(this.nmeHandle == null) {
			return 0;
		}
		return nme.media.StageVideo.nme_sv_get_time(this.nmeHandle);
	}
	,nmeSeek: function(inTime) {
		if(this.nmeHandle == null) {
			return;
		}
		nme.media.StageVideo.nme_sv_seek(this.nmeHandle,inTime);
	}
	,nmePlay: function(inUrl,inStart,inLength) {
		if(inLength == null) {
			inLength = -1;
		}
		if(inStart == null) {
			inStart = 0;
		}
		if(this.nmeHandle == null) {
			this.nmeCreate();
		}
		if(this.nmeHandle == null) {
			return;
		}
		var localName = nme.Assets.getAssetPath(inUrl);
		nme.media.StageVideo.nme_sv_play(this.nmeHandle,localName != null ? localName : inUrl,inStart,inLength);
	}
	,nmePause: function() {
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_action(this.nmeHandle,0);
		}
	}
	,nmeTogglePause: function() {
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_action(this.nmeHandle,2);
		}
	}
	,nmeResume: function() {
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_action(this.nmeHandle,1);
		}
	}
	,nmeSetVolume: function(inVolume) {
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_set_sound_transform(this.nmeHandle,inVolume,0);
		}
	}
	,nmeGetBytesTotal: function() {
		if(this.nmeHandle != null && this.duration > 0) {
			return 100000;
		}
		return 0;
	}
	,nmeGetDecodedFrames: function() {
		return 0;
	}
	,nmeGetBytesLoaded: function() {
		if(this.nmeHandle != null && this.duration > 0) {
			var percent = nme.media.StageVideo.nme_sv_get_buffered_percent(this.nmeHandle);
			return 1000 * percent | 0;
		}
		return 0;
	}
	,nmeSetSoundTransform: function(inVolume,inRightness) {
		if(this.nmeHandle != null) {
			nme.media.StageVideo.nme_sv_set_sound_transform(this.nmeHandle,inVolume,inRightness);
		}
	}
	,_native_meta_data: function() {
		if(this.nmeNetStream != null) {
			var client = this.nmeNetStream.client;
			if(client != null && client.onMetaData != null) {
				client.onMetaData({ width : this.videoWidth, height : this.videoHeight, duration : this.duration});
			}
		}
	}
	,_native_set_data: function(inWidth,inHeight,inDuration) {
		this.videoWidth = inWidth;
		this.videoHeight = inHeight;
		this.duration = inDuration;
		this._native_meta_data();
	}
	,_native_play_status: function(inStatus) {
		if(this.nmeNetStream != null) {
			var client = this.nmeNetStream.client;
			if(client != null && client.onPlayStatus != null) {
				switch(inStatus) {
				case 0:
					client.onPlayStatus("NetStream.Play.Complete");
					break;
				case 1:
					client.onPlayStatus("NetStream.Play.Switch");
					break;
				case 2:
					client.onPlayStatus("NetStream.Play.TransitionComplete");
					break;
				}
			}
			var info = null;
			switch(inStatus) {
			case 0:
				info = { code : "NetStream.Play.Complete"};
				break;
			case 1:
				info = { code : "NetStream.Play.Switch"};
				break;
			case 2:
				info = { code : "NetStream.Play.TransitionComplete"};
				break;
			case 3:
				info = { code : "NetStream.Play.Failed"};
				break;
			case 4:
				info = { code : "NetStream.Play.StreamNotFound"};
				break;
			case 5:
				info = { code : "NetStream.Play.Start"};
				break;
			case 6:
				info = { code : "NetStream.Play.Stop"};
				break;
			}
			if(info != null) {
				var event = new nme.events.NetStatusEvent("netStatus",false,false,info);
				this.nmeNetStream.dispatchEvent(event);
			}
		}
	}
	,_native_on_seek: function() {
		if(this.nmeNetStream != null) {
			var info = null;
			switch(this.seekCode) {
			case 0:
				info = { code : "NetStream.Seek.Notify", seekPoint : this.seekFrom};
				break;
			case 1:
				info = { code : "NetStream.Seek.InvalidTime", details : this.seekFrom};
				break;
			case 2:
				info = { code : "NetStream.Seek.Failed", seekPoint : this.seekFrom};
				break;
			}
			if(info != null) {
				var event = new nme.events.NetStatusEvent("netStatus",false,false,info);
				this.nmeNetStream.dispatchEvent(event);
			}
		}
	}
	,_native_on_seek_data: function(inCode,inWhen) {
		this.seekCode = inCode;
		this.seekFrom = inWhen;
		this._native_on_seek();
	}
	,__class__: nme.media.StageVideo
	,__properties__: {set_zoom:"set_zoom",get_zoom:"get_zoom",set_pan:"set_pan",get_pan:"get_pan",set_viewPort:"set_viewPort",get_viewPort:"get_viewPort",get_colorSpaces:"get_colorSpaces"}
});
nme.media.StageVideoAvailability = function() { };
$hxClasses["nme.media.StageVideoAvailability"] = nme.media.StageVideoAvailability;
nme.media.StageVideoAvailability.__name__ = "nme.media.StageVideoAvailability";
nme.media.Video = function(width,height) {
	if(height == null) {
		height = 240;
	}
	if(width == null) {
		width = 320;
	}
	nme.display.DisplayObject.call(this,nme.media.Video.nme_video_create(width,height),"Video");
	this.set_smoothing(false);
	this.videoWidth = width;
	this.videoHeight = height;
};
$hxClasses["nme.media.Video"] = nme.media.Video;
nme.media.Video.__name__ = "nme.media.Video";
nme.media.Video.__super__ = nme.display.DisplayObject;
nme.media.Video.prototype = $extend(nme.display.DisplayObject.prototype,{
	smoothing: null
	,videoHeight: null
	,videoWidth: null
	,load: function(filename) {
		nme.media.Video.nme_video_load(this.nmeHandle,filename);
	}
	,play: function() {
		nme.media.Video.nme_video_play(this.nmeHandle);
	}
	,clear: function() {
		nme.media.Video.nme_video_clear(this.nmeHandle);
	}
	,set_smoothing: function(value) {
		nme.media.Video.nme_video_set_smoothing(this.nmeHandle,value);
		this.smoothing = value;
		return value;
	}
	,attachNetStream: function(inNetStream) {
	}
	,__class__: nme.media.Video
	,__properties__: $extend(nme.display.DisplayObject.prototype.__properties__,{set_smoothing:"set_smoothing"})
});
nme.media.VideoStatus = function() { };
$hxClasses["nme.media.VideoStatus"] = nme.media.VideoStatus;
nme.media.VideoStatus.__name__ = "nme.media.VideoStatus";
nme.net.FileFilter = function(inDescription,inExtension,inMacType) {
	this.description = inDescription;
	this.set_extension(inExtension);
	this.macType = inMacType;
};
$hxClasses["nme.net.FileFilter"] = nme.net.FileFilter;
nme.net.FileFilter.__name__ = "nme.net.FileFilter";
nme.net.FileFilter.prototype = {
	description: null
	,extension: null
	,macType: null
	,match: null
	,getBestExtension: function() {
		var _g = 0;
		var _g1 = this.match;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m != ".*" && HxOverrides.substr(m,0,1) == ".") {
				return m;
			}
		}
		var _g = 0;
		var _g1 = this.match;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m != ".*") {
				return "." + m;
			}
		}
		return "";
	}
	,set_extension: function(inExtension) {
		this.match = [];
		this.extension = inExtension;
		if(this.extension != null) {
			var _g = 0;
			var _g1 = this.extension.split(";");
			while(_g < _g1.length) {
				var part = _g1[_g];
				++_g;
				if(part.length > 0 && HxOverrides.substr(part,0,1) == "*") {
					this.match.push(HxOverrides.substr(part.toLowerCase(),1,null));
				}
			}
		}
		return inExtension;
	}
	,matches: function(inFilename) {
		var filename = inFilename.toLowerCase();
		var flen = filename.length;
		var _g = 0;
		var _g1 = this.match;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m == ".*") {
				return true;
			}
			if(m.length <= flen && HxOverrides.substr(filename,flen - m.length,null) == m) {
				return true;
			}
		}
		return false;
	}
	,__class__: nme.net.FileFilter
	,__properties__: {set_extension:"set_extension"}
};
nme.net.NetConnection = function() {
	nme.events.EventDispatcher.call(this);
	this.objectEncoding = 0;
	this.connectedProxyType = "";
	this.usingTLS = false;
};
$hxClasses["nme.net.NetConnection"] = nme.net.NetConnection;
nme.net.NetConnection.__name__ = "nme.net.NetConnection";
nme.net.NetConnection.__super__ = nme.events.EventDispatcher;
nme.net.NetConnection.prototype = $extend(nme.events.EventDispatcher.prototype,{
	client: null
	,connected: null
	,objectEncoding: null
	,uri: null
	,connectedProxyType: null
	,usingTLS: null
	,connect: function(command,p1,p2,p3,p4,p5) {
		this.uri = command;
		if(this.uri == null || this.uri == "") {
			this.dispatchEvent(new nme.events.NetStatusEvent("netStatus",false,false,{ code : "NetConnection.Connect.Success", level : "status"}));
		}
	}
	,close: function() {
	}
	,get_connected: function() {
		return false;
	}
	,get_proxyType: function() {
		return "";
	}
	,set_proxyType: function(inType) {
		return inType;
	}
	,__class__: nme.net.NetConnection
	,__properties__: {set_proxyType:"set_proxyType",get_proxyType:"get_proxyType",get_connected:"get_connected"}
});
nme.net.NetStream = function(inConnection,peerID) {
	nme.events.EventDispatcher.call(this);
	this.nmeConnection = inConnection;
	this.client = null;
	this.nmeReceiveAudio = true;
	this.nmeReceiveVideo = true;
	this.nmeVolume = 1.0;
	this.nmeSoundPan = 0.0;
	this.objectEncoding = 0;
	this.nmePaused = false;
	this.nmeSeek = 0.0;
};
$hxClasses["nme.net.NetStream"] = nme.net.NetStream;
nme.net.NetStream.__name__ = "nme.net.NetStream";
nme.net.NetStream.__super__ = nme.events.EventDispatcher;
nme.net.NetStream.prototype = $extend(nme.events.EventDispatcher.prototype,{
	bytesTotal: null
	,bytesLoaded: null
	,decodedFrames: null
	,client: null
	,objectEncoding: null
	,peerStreams: null
	,time: null
	,nmeConnection: null
	,nmeReceiveAudio: null
	,nmeReceiveVideo: null
	,nmeVolume: null
	,nmeSoundPan: null
	,nmeFilename: null
	,nmePaused: null
	,nmeSeek: null
	,nmeAttachedVideo: null
	,attach: function(inConnection) {
		this.nmeConnection = inConnection;
	}
	,get_time: function() {
		if(this.nmeAttachedVideo != null) {
			return this.nmeAttachedVideo.nmeGetTime();
		}
		return 0.0;
	}
	,seek: function(offset) {
		this.nmeSeek = offset;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmeSeek(offset);
		}
	}
	,close: function() {
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmeDestroy();
		}
		this.nmeFilename = null;
		this.nmeSeek = 0.0;
	}
	,dispose: function() {
		this.close();
	}
	,play: function(inFilename,startSeconds,lenSeconds,p4,p5) {
		if(lenSeconds == null) {
			lenSeconds = -1;
		}
		if(startSeconds == null) {
			startSeconds = 0.0;
		}
		this.nmeFilename = inFilename;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmePlay(this.nmeFilename,startSeconds,lenSeconds);
		}
	}
	,pause: function() {
		this.nmePaused = true;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmePause();
		}
	}
	,togglePause: function() {
		this.nmePaused = !this.nmePaused;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmeTogglePause();
		}
	}
	,resume: function() {
		this.nmePaused = false;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmeResume();
		}
	}
	,receiveAudio: function(flag) {
		this.nmeReceiveAudio = flag;
	}
	,receiveVideo: function(flag) {
		this.nmeReceiveVideo = flag;
	}
	,onPeerConnect: function(subscriber) {
		return true;
	}
	,get_bytesTotal: function() {
		if(this.nmeAttachedVideo != null) {
			return this.nmeAttachedVideo.nmeGetBytesTotal();
		}
		return 0;
	}
	,get_bytesLoaded: function() {
		if(this.nmeAttachedVideo != null) {
			return this.nmeAttachedVideo.nmeGetBytesLoaded();
		}
		return 0;
	}
	,get_decodedFrames: function() {
		if(this.nmeAttachedVideo != null) {
			return this.nmeAttachedVideo.nmeGetDecodedFrames();
		}
		return 0;
	}
	,get_peerStreams: function() {
		return [];
	}
	,get_soundTransform: function() {
		return new nme.media.SoundTransform(this.nmeVolume,this.nmeSoundPan);
	}
	,set_soundTransform: function(inTransform) {
		this.nmeVolume = inTransform.volume;
		this.nmeSoundPan = inTransform.pan;
		if(this.nmeAttachedVideo != null) {
			this.nmeAttachedVideo.nmeSetSoundTransform(this.nmeVolume,this.nmeSoundPan);
		}
		return inTransform;
	}
	,__class__: nme.net.NetStream
	,__properties__: {set_soundTransform:"set_soundTransform",get_soundTransform:"get_soundTransform",get_time:"get_time",get_peerStreams:"get_peerStreams",get_decodedFrames:"get_decodedFrames",get_bytesLoaded:"get_bytesLoaded",get_bytesTotal:"get_bytesTotal"}
});
nme.net.SharedObject = function(inName,inLocalPath,inData) {
	nme.events.EventDispatcher.call(this);
	this.name = inName;
	this.localPath = inLocalPath;
	this.data = inData;
};
$hxClasses["nme.net.SharedObject"] = nme.net.SharedObject;
nme.net.SharedObject.__name__ = "nme.net.SharedObject";
nme.net.SharedObject.getLocal = function(name,localPath,secure) {
	if(secure == null) {
		secure = false;
	}
	if(localPath == null) {
		localPath = "";
	}
	var rawData = null;
	var storage = js.Browser.getLocalStorage();
	if(storage != null) {
		rawData = storage.getItem(localPath + ":" + name);
	}
	var loadedData = { };
	if(!(rawData == "" || rawData == null)) {
		try {
			var unserializer = new haxe.Unserializer(rawData);
			unserializer.setResolver({ resolveEnum : Type.resolveEnum, resolveClass : nme.net.SharedObject.resolveClass});
			loadedData = unserializer.unserialize();
		} catch( _g ) {
			haxe.NativeStackTrace.lastError = _g;
			haxe.Log.trace("Could not unserialize SharedObject",{ fileName : "../../src/nme/net/SharedObject.hx", lineNumber : 214, className : "nme.net.SharedObject", methodName : "getLocal"});
		}
	}
	var so = new nme.net.SharedObject(name,localPath,loadedData);
	return so;
};
nme.net.SharedObject.resolveClass = function(name) {
	if(name != null) {
		var name1 = StringTools.replace(name,"neash.","nme.");
		return $hxClasses[name1];
	}
	return null;
};
nme.net.SharedObject.__super__ = nme.events.EventDispatcher;
nme.net.SharedObject.prototype = $extend(nme.events.EventDispatcher.prototype,{
	data: null
	,localPath: null
	,name: null
	,clear: function() {
		var storage = js.Browser.getLocalStorage();
		if(storage != null) {
			storage.removeItem(this.localPath + ":" + this.name);
		}
	}
	,flush: function(minDiskSpace) {
		if(minDiskSpace == null) {
			minDiskSpace = 0;
		}
		var encodedData = haxe.Serializer.run(this.data);
		var storage = js.Browser.getLocalStorage();
		if(storage != null) {
			storage.removeItem(this.localPath + ":" + this.name);
			storage.setItem(this.localPath + ":" + this.name,encodedData);
		}
		return "FLUSHED";
	}
	,get_realPath: function() {
		return "";
	}
	,setProperty: function(propertyName,value) {
		if(this.data != null) {
			this.data[propertyName] = value;
		}
	}
	,__class__: nme.net.SharedObject
	,__properties__: {get_realPath:"get_realPath"}
});
nme.net.URLLoaderDataFormat = $hxEnums["nme.net.URLLoaderDataFormat"] = { __ename__:"nme.net.URLLoaderDataFormat",__constructs__:null
	,BINARY: {_hx_name:"BINARY",_hx_index:0,__enum__:"nme.net.URLLoaderDataFormat",toString:$estr}
	,TEXT: {_hx_name:"TEXT",_hx_index:1,__enum__:"nme.net.URLLoaderDataFormat",toString:$estr}
	,VARIABLES: {_hx_name:"VARIABLES",_hx_index:2,__enum__:"nme.net.URLLoaderDataFormat",toString:$estr}
};
nme.net.URLLoaderDataFormat.__constructs__ = [nme.net.URLLoaderDataFormat.BINARY,nme.net.URLLoaderDataFormat.TEXT,nme.net.URLLoaderDataFormat.VARIABLES];
nme.net.URLLoaderDataFormat.__empty_constructs__ = [nme.net.URLLoaderDataFormat.BINARY,nme.net.URLLoaderDataFormat.TEXT,nme.net.URLLoaderDataFormat.VARIABLES];
nme.net.URLRequest = function(inURL) {
	if(inURL != null) {
		this.url = inURL;
	}
	this.requestHeaders = [];
	this.method = "GET";
	this.verbose = false;
	this.cookieString = "";
	this.authType = 0;
	this.contentType = "application/x-www-form-urlencoded";
	this.credentials = "";
	this.followRedirects = true;
};
$hxClasses["nme.net.URLRequest"] = nme.net.URLRequest;
nme.net.URLRequest.__name__ = "nme.net.URLRequest";
nme.net.URLRequest.prototype = {
	url: null
	,userAgent: null
	,requestHeaders: null
	,authType: null
	,cookieString: null
	,verbose: null
	,method: null
	,contentType: null
	,data: null
	,credentials: null
	,followRedirects: null
	,__bytes: null
	,toString: function() {
		return "URLRequest(" + this.url + ")";
	}
	,launchBrowser: function() {
		nme.net.URLRequest.nme_get_url(this.url);
	}
	,basicAuth: function(inUser,inPasswd) {
		this.authType = 1;
		this.credentials = inUser + ":" + inPasswd;
	}
	,digestAuth: function(inUser,inPasswd) {
		this.authType = 2;
		this.credentials = inUser + ":" + inPasswd;
	}
	,nmePrepare: function() {
		if(this.data == null) {
			this.set_nmeBytes(new nme.utils.ByteArray());
		} else if(((this.data) instanceof nme.utils.ByteArray)) {
			this.set_nmeBytes(this.data);
		} else if(((this.data) instanceof nme.net.URLVariablesBase)) {
			var vars = this.data;
			var str = vars.toString();
			this.set_nmeBytes(new nme.utils.ByteArray());
			this.get_nmeBytes().writeUTFBytes(str);
		} else if(typeof(this.data) == "string") {
			var str = this.data;
			this.set_nmeBytes(new nme.utils.ByteArray());
			this.get_nmeBytes().writeUTFBytes(str);
		} else if(js.Boot.__instanceof(this.data,Dynamic)) {
			var vars = nme.net.URLVariables._new();
			var _g = 0;
			var _g1 = Reflect.fields(this.data);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				vars[i] = Reflect.field(this.data,i);
			}
			var str = vars.toString();
			this.set_nmeBytes(new nme.utils.ByteArray());
			this.get_nmeBytes().writeUTFBytes(str);
		} else {
			throw haxe.Exception.thrown("Unknown data type");
		}
	}
	,get_nmeBytes: function() {
		return this.__bytes;
	}
	,set_nmeBytes: function(value) {
		return this.__bytes = value;
	}
	,__class__: nme.net.URLRequest
	,__properties__: {set_nmeBytes:"set_nmeBytes",get_nmeBytes:"get_nmeBytes"}
};
nme.net.URLRequestHeader = function(name,value) {
	this.name = name;
	this.value = value;
};
$hxClasses["nme.net.URLRequestHeader"] = nme.net.URLRequestHeader;
nme.net.URLRequestHeader.__name__ = "nme.net.URLRequestHeader";
nme.net.URLRequestHeader.prototype = {
	name: null
	,value: null
	,__class__: nme.net.URLRequestHeader
};
nme.net.URLRequestMethod = function() { };
$hxClasses["nme.net.URLRequestMethod"] = nme.net.URLRequestMethod;
nme.net.URLRequestMethod.__name__ = "nme.net.URLRequestMethod";
nme.net.URLVariablesBase = function(inEncoded) {
	if(inEncoded != null) {
		this.decode(inEncoded);
	} else {
		this.fields = new haxe.ds.StringMap();
	}
};
$hxClasses["nme.net.URLVariablesBase"] = nme.net.URLVariablesBase;
nme.net.URLVariablesBase.__name__ = "nme.net.URLVariablesBase";
nme.net.URLVariablesBase.prototype = {
	fields: null
	,decode: function(inVars) {
		this.fields = new haxe.ds.StringMap();
		var fieldStrings = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fieldStrings.length) {
			var f = fieldStrings[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) {
				var this1 = this.fields;
				var s = HxOverrides.substr(f,0,eq);
				var key = decodeURIComponent(s.split("+").join(" "));
				var s1 = HxOverrides.substr(f,eq + 1,null);
				var value = decodeURIComponent(s1.split("+").join(" "));
				this1.h[key] = value;
			} else if(eq != 0) {
				var this2 = this.fields;
				var key1 = decodeURIComponent(f.split("+").join(" "));
				this2.h[key1] = "";
			}
		}
	}
	,set: function(name,value) {
		this.fields.h[name] = value;
		return value;
	}
	,get: function(name) {
		return this.fields.h[name];
	}
	,toString: function() {
		var result = [];
		var h = this.fields.h;
		var f_h = h;
		var f_keys = Object.keys(h);
		var f_length = f_keys.length;
		var f_current = 0;
		while(f_current < f_length) {
			var f = f_keys[f_current++];
			var tmp = encodeURIComponent(f) + "=";
			var s = this.fields.h[f];
			result.push(tmp + encodeURIComponent(s));
		}
		return result.join("&");
	}
	,__class__: nme.net.URLVariablesBase
};
nme.net.URLVariables = {};
nme.net.URLVariables._new = function(inEncoded) {
	var this1 = new nme.net.URLVariablesBase(inEncoded);
	return this1;
};
nme.net.URLVariables.set = function(this1,name,value) {
	return this1.set(name,value);
};
nme.net.URLVariables.get = function(this1,name) {
	return this1.get(name);
};
nme.net.http = {};
nme.net.http.Handler = function(inHandler,inLog) {
	if(inHandler != null) {
		this.log = inHandler.log;
		this.chained = $bind(inHandler,inHandler.onRequest);
	}
	if(inLog != null) {
		this.log = inLog;
	}
};
$hxClasses["nme.net.http.Handler"] = nme.net.http.Handler;
nme.net.http.Handler.__name__ = "nme.net.http.Handler";
nme.net.http.Handler.prototype = {
	chained: null
	,log: null
	,defaultHandler: function(request) {
		if(this.chained != null) {
			return this.chained(request);
		}
		if(this.log != null) {
			this.log("404 not found: " + request.url);
		}
		return haxe.io.Bytes.ofString("HTTP/1.1 404 Not Found\r\n\r\n");
	}
	,onRequest: function(request) {
		return this.defaultHandler(request);
	}
	,__class__: nme.net.http.Handler
};
nme.net.http.Request = function(inHeaders,inBody) {
	this.headers = inHeaders;
	this.body = inBody;
};
$hxClasses["nme.net.http.Request"] = nme.net.http.Request;
nme.net.http.Request.__name__ = "nme.net.http.Request";
nme.net.http.Request.prototype = {
	method: null
	,url: null
	,version: null
	,body: null
	,headers: null
	,getHeader: function(name) {
		if(this.headers == null) {
			return null;
		} else {
			return this.headers.h[name];
		}
	}
	,isKeepAlive: function() {
		return this.getHeader("Connection") == "Keep-Alive";
	}
	,__class__: nme.net.http.Request
};
nme.net.http.Response = function() { };
$hxClasses["nme.net.http.Response"] = nme.net.http.Response;
nme.net.http.Response.__name__ = "nme.net.http.Response";
nme.net.http.StdioHandler = function(inHandler,inLog) {
	nme.net.http.Handler.call(this,inHandler,inLog);
};
$hxClasses["nme.net.http.StdioHandler"] = nme.net.http.StdioHandler;
nme.net.http.StdioHandler.__name__ = "nme.net.http.StdioHandler";
nme.net.http.StdioHandler.__super__ = nme.net.http.Handler;
nme.net.http.StdioHandler.prototype = $extend(nme.net.http.Handler.prototype,{
	onRequest: function(request) {
		if(request.method == "POST" && request.url == "/stdio.html") {
			var parts = request.body.split("\r\n").join("").split("^");
			var message = parts[3];
			if(this.log != null) {
				if(message == null) {
					this.log("");
				} else {
					this.log(decodeURIComponent(message.split("+").join(" ")));
				}
			}
			var header = ["HTTP/1.1 200 OK","Content-Length: " + 0,"",""];
			return haxe.io.Bytes.ofString(header.join("\r\n"));
		}
		return this.defaultHandler(request);
	}
	,__class__: nme.net.http.StdioHandler
});
nme.sensors = {};
nme.sensors._Accelerometer = {};
nme.sensors._Accelerometer.Data = function() {
	this.x = this.y = this.z = 0.0;
};
$hxClasses["nme.sensors._Accelerometer.Data"] = nme.sensors._Accelerometer.Data;
nme.sensors._Accelerometer.Data.__name__ = "nme.sensors._Accelerometer.Data";
nme.sensors._Accelerometer.Data.prototype = {
	x: null
	,y: null
	,z: null
	,__class__: nme.sensors._Accelerometer.Data
};
nme.sensors.Accelerometer = function() {
	this.timer = haxe.ds.Option.None;
	nme.events.EventDispatcher.call(this);
	this.data = new nme.sensors._Accelerometer.Data();
	this.setRequestedUpdateInterval(nme.sensors.Accelerometer.defaultInterval);
};
$hxClasses["nme.sensors.Accelerometer"] = nme.sensors.Accelerometer;
nme.sensors.Accelerometer.__name__ = "nme.sensors.Accelerometer";
nme.sensors.Accelerometer.__properties__ = {get_isSupported:"get_isSupported"};
nme.sensors.Accelerometer.isSupported = null;
nme.sensors.Accelerometer.get_isSupported = function() {
	return nme.ui.Accelerometer.nme_input_get_acceleration_support();
};
nme.sensors.Accelerometer.__super__ = nme.events.EventDispatcher;
nme.sensors.Accelerometer.prototype = $extend(nme.events.EventDispatcher.prototype,{
	muted: null
	,data: null
	,timer: null
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) {
			useWeakReference = false;
		}
		if(priority == null) {
			priority = 0;
		}
		if(useCapture == null) {
			useCapture = false;
		}
		nme.events.EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		this.update();
	}
	,setRequestedUpdateInterval: function(interval) {
		if(interval < 0) {
			throw haxe.Exception.thrown(new nme.errors.ArgumentError());
		} else if(interval == 0) {
			interval = nme.sensors.Accelerometer.defaultInterval;
		}
		var _g = this.timer;
		switch(_g._hx_index) {
		case 0:
			var t = _g.v;
			t.stop();
			break;
		case 1:
			break;
		}
		if(nme.sensors.Accelerometer.get_isSupported()) {
			var t = new haxe.Timer(interval);
			t.run = $bind(this,this.update);
			this.timer = haxe.ds.Option.Some(t);
		}
	}
	,removeInterval: function() {
		var _g = this.timer;
		switch(_g._hx_index) {
		case 0:
			var t = _g.v;
			t.stop();
			break;
		case 1:
			break;
		}
	}
	,update: function() {
		var event = new nme.events.AccelerometerEvent(nme.events.AccelerometerEvent.UPDATE);
		nme.ui.Accelerometer.get(this.data);
		event.timestamp = haxe.Timer.stamp();
		event.accelerationX = this.data.x;
		event.accelerationY = this.data.y;
		event.accelerationZ = this.data.z;
		this.dispatchEvent(event);
	}
	,__class__: nme.sensors.Accelerometer
});
nme.system = {};
nme.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) {
		this.parentDomain = parentDomain;
	} else {
		this.parentDomain = nme.system.ApplicationDomain.currentDomain;
	}
};
$hxClasses["nme.system.ApplicationDomain"] = nme.system.ApplicationDomain;
nme.system.ApplicationDomain.__name__ = "nme.system.ApplicationDomain";
nme.system.ApplicationDomain.prototype = {
	parentDomain: null
	,getDefinition: function(name) {
		return $hxClasses[name];
	}
	,hasDefinition: function(name) {
		return $hxClasses[name] != null;
	}
	,__class__: nme.system.ApplicationDomain
};
nme.system.Capabilities = function() { };
$hxClasses["nme.system.Capabilities"] = nme.system.Capabilities;
nme.system.Capabilities.__name__ = "nme.system.Capabilities";
nme.system.Capabilities.__properties__ = {get_language:"get_language",get_screenResolutions:"get_screenResolutions",get_screenResolutionY:"get_screenResolutionY",get_screenResolutionX:"get_screenResolutionX",get_screenDPI:"get_screenDPI",get_pixelAspectRatio:"get_pixelAspectRatio"};
nme.system.Capabilities.pixelAspectRatio = null;
nme.system.Capabilities.screenDPI = null;
nme.system.Capabilities.screenResolutionX = null;
nme.system.Capabilities.screenResolutionY = null;
nme.system.Capabilities.screenResolutions = null;
nme.system.Capabilities.language = null;
nme.system.Capabilities.get_pixelAspectRatio = function() {
	return nme.system.Capabilities.nme_capabilities_get_pixel_aspect_ratio();
};
nme.system.Capabilities.get_screenDPI = function() {
	return nme.system.Capabilities.nme_capabilities_get_screen_dpi();
};
nme.system.Capabilities.get_screenResolutionX = function() {
	return nme.system.Capabilities.nme_capabilities_get_screen_resolution_x();
};
nme.system.Capabilities.get_screenResolutionY = function() {
	return nme.system.Capabilities.nme_capabilities_get_screen_resolution_y();
};
nme.system.Capabilities.get_language = function() {
	var locale = nme.system.Capabilities.nme_capabilities_get_language();
	if(locale == null || locale == "" || locale == "C" || locale == "POSIX") {
		return "en-US";
	} else {
		var formattedLocale = "";
		var length = locale.length;
		if(length > 5) {
			length = 5;
		}
		var _g = 0;
		var _g1 = length;
		while(_g < _g1) {
			var i = _g++;
			var char = locale.charAt(i);
			if(i < 2) {
				formattedLocale += char.toLowerCase();
			} else if(i == 2) {
				formattedLocale += "-";
			} else {
				formattedLocale += char.toUpperCase();
			}
		}
		return formattedLocale;
	}
};
nme.system.Capabilities.get_screenResolutions = function() {
	var res = nme.system.Capabilities.nme_capabilities_get_screen_resolutions();
	if(res == null) {
		return [];
	}
	var out = [];
	var _g = 0;
	var _g1 = res.length / 2 | 0;
	while(_g < _g1) {
		var c = _g++;
		out.push([res[c * 2],res[c * 2 + 1]]);
	}
	return out;
};
nme.system.Dialog = function() { };
$hxClasses["nme.system.Dialog"] = nme.system.Dialog;
nme.system.Dialog.__name__ = "nme.system.Dialog";
nme.system.Dialog.fileDialog = function(title,text,defaultPath,filesSpec,onResult,rememberKey,inFlags) {
	if(filesSpec == null) {
		filesSpec = "All Files|*.*";
	}
	var resultCallback = onResult;
	if(rememberKey != null) {
		if(defaultPath == null) {
			defaultPath = nme.system.Dialog.getDefaultPath(rememberKey);
		}
		resultCallback = function(name) {
			if(name != null && name != "") {
				var path = name;
				if((inFlags & 16) != 0) {
					var nullTerm = path.indexOf(String.fromCodePoint(0));
					if(nullTerm >= 0) {
						path = HxOverrides.substr(path,0,nullTerm);
					}
				}
				var def = nme.net.SharedObject.getLocal("fileOpen");
				if(def != null) {
					def.setProperty(rememberKey,path);
					def.flush();
				}
			}
			if(name == "") {
				name = null;
			}
			onResult(name);
		};
	}
	return nme.system.Dialog.nme_file_dialog_open(title,text,defaultPath,filesSpec,resultCallback,inFlags);
};
nme.system.Dialog.getDefaultPath = function(rememberKey) {
	var def = nme.net.SharedObject.getLocal("fileOpen");
	var defaultPath = null;
	if(def != null) {
		defaultPath = Reflect.field(def.data,rememberKey);
	}
	if(defaultPath == null) {
		defaultPath = "";
	}
	return defaultPath;
};
nme.system.Dialog.fileOpen = function(title,text,defaultPath,filesSpec,onResult,rememberKey,inFlags) {
	if(inFlags == null) {
		inFlags = 4;
	}
	if(filesSpec == null) {
		filesSpec = "All Files|*.*";
	}
	return nme.system.Dialog.fileDialog(title,text,defaultPath,filesSpec,onResult,rememberKey,inFlags);
};
nme.system.Dialog.fileSave = function(title,text,defaultPath,filesSpec,onResult,rememberKey,inFlags) {
	if(inFlags == null) {
		inFlags = 34;
	}
	if(filesSpec == null) {
		filesSpec = "All Files|*.*";
	}
	var flags = 1 | inFlags;
	return nme.system.Dialog.fileDialog(title,text,defaultPath,filesSpec,onResult,rememberKey,flags);
};
nme.system.Dialog.getImage = function(title,text,defaultPath,onResult,rememberKey) {
	if(rememberKey == null) {
		rememberKey = "imageDirectory";
	}
	var imageFiles = "Image Files(*.jpg,*.png)|*.jpg;*.png|All Files(*.*)|*.*";
	var flags = 4;
	return nme.system.Dialog.fileDialog(title,text,defaultPath,imageFiles,onResult,rememberKey,flags);
};
nme.system.Dialog.getImages = function(title,text,defaultPath,onResult,rememberKey) {
	if(rememberKey == null) {
		rememberKey = "imageDirectory";
	}
	var imageFiles = "Image Files(*.jpg,*.png)|*.jpg;*.png|All Files(*.*)|*.*";
	var flags = 4;
	flags |= 16;
	var split = function(string) {
		onResult(nme.system.Dialog.splitStringList(string));
	};
	return nme.system.Dialog.fileDialog(title,text,defaultPath,imageFiles,split,rememberKey,flags);
};
nme.system.Dialog.splitStringList = function(s) {
	var result = [];
	var term = String.fromCodePoint(0);
	while(true) {
		var pos = s.indexOf(term);
		if(pos >= 0) {
			result.push(HxOverrides.substr(s,0,pos));
			s = HxOverrides.substr(s,pos + 1,null);
		} else {
			if(s.length > 0) {
				result.push(s);
			}
			break;
		}
	}
	if(result.length > 1) {
		var dir = result.shift();
		var _g = [];
		var _g1 = 0;
		while(_g1 < result.length) {
			var r = result[_g1];
			++_g1;
			_g.push("" + dir + "/" + r);
		}
		result = _g;
	}
	return result;
};
nme.system.Dialog.getDirectory = function(title,text,defaultPath,onResult,rememberKey) {
	if(rememberKey == null) {
		rememberKey = "lastDirectory";
	}
	var directoryMatch = "<directory>";
	return nme.system.Dialog.fileDialog(title,text,defaultPath,directoryMatch,onResult,rememberKey,8);
};
nme.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) {
		checkPolicyFile = false;
	}
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) {
		this.applicationDomain = applicationDomain;
	} else {
		this.applicationDomain = nme.system.ApplicationDomain.currentDomain;
	}
};
$hxClasses["nme.system.LoaderContext"] = nme.system.LoaderContext;
nme.system.LoaderContext.__name__ = "nme.system.LoaderContext";
nme.system.LoaderContext.prototype = {
	allowCodeImport: null
	,allowLoadBytesCodeExecution: null
	,applicationDomain: null
	,checkPolicyFile: null
	,securityDomain: null
	,__class__: nme.system.LoaderContext
};
nme.system.SecurityDomain = function() {
};
$hxClasses["nme.system.SecurityDomain"] = nme.system.SecurityDomain;
nme.system.SecurityDomain.__name__ = "nme.system.SecurityDomain";
nme.system.SecurityDomain.prototype = {
	__class__: nme.system.SecurityDomain
};
nme.system.System = function() { };
$hxClasses["nme.system.System"] = nme.system.System;
nme.system.System.__name__ = "nme.system.System";
nme.system.System.__properties__ = {get_exeDirectory:"get_exeDirectory",get_exeName:"get_exeName",get_totalMemoryNumber:"get_totalMemoryNumber",get_totalMemory:"get_totalMemory",get_deviceID:"get_deviceID"};
nme.system.System.deviceID = null;
nme.system.System.totalMemory = null;
nme.system.System.totalMemoryNumber = null;
nme.system.System.exeName = null;
nme.system.System.exeDirectory = null;
nme.system.System.args = null;
nme.system.System.exit = function(inCode) {
	nme.Lib.close();
};
nme.system.System.getArgs = function() {
	if(nme.system.System.args == null) {
		nme.system.System.args = [];
	}
	return nme.system.System.args.slice();
};
nme.system.System.setArgs = function(inArgs) {
	nme.system.System.args = inArgs.slice();
};
nme.system.System.gc = function() {
};
nme.system.System.get_deviceID = function() {
	return nme.system.System.nme_get_unique_device_identifier();
};
nme.system.System.get_totalMemory = function() {
	return __js_get_heap_memory();
};
nme.system.System.get_totalMemoryNumber = function() {
	return nme.system.System.get_totalMemory();
};
nme.system.System.pauseForGCIfCollectionImminent = function(imminence) {
	if(imminence == null) {
		imminence = 0.75;
	}
};
nme.system.System.systemName = function() {
	return "js";
};
nme.system.System.setClipboard = function(string) {
	var cb = new nme.desktop.Clipboard();
	cb.setData(nme.desktop.ClipboardFormats.TEXT_FORMAT,string);
};
nme.system.System.get_exeName = function() {
	var func = nme.Loader.load("nme_sys_get_exe_name",0);
	return func();
};
nme.system.System.get_exeDirectory = function() {
	var name = nme.system.System.get_exeName().split("\\").join("/");
	var slash = name.lastIndexOf("/");
	if(slash < 0) {
		return "./";
	}
	return HxOverrides.substr(name,0,slash + 1);
};
nme.system.System.restart = function() {
};
nme.system.System.getLocalIpAddress = function() {
	return "localhost";
};
nme.system.System.getGLStats = function(statsArray) {
	nme.system.System.nme_get_glstats(statsArray);
};
nme.text.AntiAliasType = $hxEnums["nme.text.AntiAliasType"] = { __ename__:"nme.text.AntiAliasType",__constructs__:null
	,ADVANCED: {_hx_name:"ADVANCED",_hx_index:0,__enum__:"nme.text.AntiAliasType",toString:$estr}
	,NORMAL: {_hx_name:"NORMAL",_hx_index:1,__enum__:"nme.text.AntiAliasType",toString:$estr}
};
nme.text.AntiAliasType.__constructs__ = [nme.text.AntiAliasType.ADVANCED,nme.text.AntiAliasType.NORMAL];
nme.text.AntiAliasType.__empty_constructs__ = [nme.text.AntiAliasType.ADVANCED,nme.text.AntiAliasType.NORMAL];
nme.text.Font = function(inFilename,inStyle,inType,resourceName,id) {
	if(inFilename == null) {
		inFilename = "";
	}
	this.knownFontStyle = inStyle;
	if(inFilename == "") {
		var fontClass = js.Boot.getClass(this);
		var name = resourceName != null ? resourceName : Object.prototype.hasOwnProperty.call(fontClass,"resourceName") ? Reflect.field(fontClass,"resourceName") : null;
		if(name != null) {
			this.fontName = id;
			var existing = nme.text.Font.nmeRegisteredFonts.h[this.fontName];
			if(existing != null) {
				this.fontType = existing.fontType;
				this.knownFontStyle = existing.knownFontStyle;
			} else {
				this.fontType = "EMBEDDED";
				var bytes = nme.Assets.getResource(name);
				if(bytes != null) {
					nme.text.Font.registerFontData(this,bytes);
				} else {
					haxe.Log.trace("Could not find font data for " + name,{ fileName : "../../src/nme/text/Font.hx", lineNumber : 51, className : "nme.text.Font", methodName : "new"});
				}
			}
		} else {
			var c = js.Boot.getClass(this);
			var className = c.__name__;
			this.fontName = className.split(".").pop();
			this.knownFontStyle = "REGULAR";
			this.fontType = "EMBEDDED";
		}
	} else {
		this.fontName = inFilename;
		this.knownFontStyle = inStyle == null ? "REGULAR" : inStyle;
		this.fontType = inType == null ? "EMBEDDED" : inType;
	}
};
$hxClasses["nme.text.Font"] = nme.text.Font;
nme.text.Font.__name__ = "nme.text.Font";
nme.text.Font.__properties__ = {set_useNative:"set_useNative",get_useNative:"get_useNative"};
nme.text.Font.nmeDeviceFonts = null;
nme.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) {
		enumerateDeviceFonts = false;
	}
	var result = [];
	var h = nme.text.Font.nmeRegisteredFonts.h;
	var key_h = h;
	var key_keys = Object.keys(h);
	var key_length = key_keys.length;
	var key_current = 0;
	while(key_current < key_length) {
		var key = key_keys[key_current++];
		result.push(nme.text.Font.nmeRegisteredFonts.h[key]);
	}
	if(enumerateDeviceFonts) {
		if(nme.text.Font.nmeDeviceFonts == null) {
			nme.text.Font.nmeDeviceFonts = [];
			var styles = ["BOLD","BOLD_ITALIC","ITALIC","REGULAR"];
			nme.text.Font.nme_font_iterate_device_fonts(function(name,style) {
				nme.text.Font.nmeDeviceFonts.push(new nme.text.Font(name,styles[style],"DEVICE"));
			});
		}
		result = result.concat(nme.text.Font.nmeDeviceFonts);
	}
	return result;
};
nme.text.Font.load = function(inFilename) {
	var result = nme.text.Font.freetype_import_font(inFilename,null,2048,null);
	return result;
};
nme.text.Font.loadBytes = function(inBytes) {
	var result = nme.text.Font.freetype_import_font("",null,2048,inBytes);
	return result;
};
nme.text.Font.registerFontData = function(instance,inBytes) {
	if(Object.prototype.hasOwnProperty.call(nme.text.Font.nmeRegisteredFonts.h,instance.fontName)) {
		return;
	}
	nme.text.Font.nme_font_register_font(instance.fontName,inBytes);
	nme.text.Font.nmeRegisteredFonts.h[instance.fontName] = instance;
};
nme.text.Font.registerFont = function(font) {
	var instance = Type.createInstance(font,["",null,null]);
	if(instance != null) {
		if(Object.prototype.hasOwnProperty.call(nme.text.Font.nmeRegisteredFonts.h,instance.fontName)) {
			return;
		}
		if(Object.prototype.hasOwnProperty.call(font,"resourceName")) {
			var instance1 = instance.fontName;
			var tmp = nme.utils.ByteArray.fromBytes(haxe.Resource.getBytes(Reflect.field(font,"resourceName")));
			nme.text.Font.nme_font_register_font(instance1,tmp);
		}
		nme.text.Font.nmeRegisteredFonts.h[instance.fontName] = instance;
	}
};
nme.text.Font.get_useNative = function() {
	return false;
};
nme.text.Font.set_useNative = function(inVal) {
	return false;
};
nme.text.Font.prototype = {
	fontName: null
	,fontType: null
	,knownFontStyle: null
	,get_fontStyle: function() {
		if(this.knownFontStyle == null) {
			this.knownFontStyle = "REGULAR";
			var details = nme.text.Font.freetype_import_font(this.fontName,null,0,null);
			if(details != null) {
				if(details.is_bold && details.is_italic) {
					this.knownFontStyle = "BOLD_ITALIC";
				} else if(details.is_bold) {
					this.knownFontStyle = "BOLD";
				} else if(details.is_italic) {
					this.knownFontStyle = "ITALIC";
				}
			}
		}
		return this.knownFontStyle;
	}
	,toString: function() {
		return "{ name=" + this.fontName + ", style=" + this.knownFontStyle + ", type=" + this.fontType + " }";
	}
	,__class__: nme.text.Font
	,__properties__: {get_fontStyle:"get_fontStyle"}
};
nme.text.GridFitType = $hxEnums["nme.text.GridFitType"] = { __ename__:"nme.text.GridFitType",__constructs__:null
	,NONE: {_hx_name:"NONE",_hx_index:0,__enum__:"nme.text.GridFitType",toString:$estr}
	,PIXEL: {_hx_name:"PIXEL",_hx_index:1,__enum__:"nme.text.GridFitType",toString:$estr}
	,SUBPIXEL: {_hx_name:"SUBPIXEL",_hx_index:2,__enum__:"nme.text.GridFitType",toString:$estr}
};
nme.text.GridFitType.__constructs__ = [nme.text.GridFitType.NONE,nme.text.GridFitType.PIXEL,nme.text.GridFitType.SUBPIXEL];
nme.text.GridFitType.__empty_constructs__ = [nme.text.GridFitType.NONE,nme.text.GridFitType.PIXEL,nme.text.GridFitType.SUBPIXEL];
nme.text.NMEFont = function(inHeight,inAscent,inDescent,inIsRGB) {
	this.height = inHeight;
	this.ascent = inAscent;
	this.descent = inDescent;
	this.isRGB = inIsRGB;
};
$hxClasses["nme.text.NMEFont"] = nme.text.NMEFont;
nme.text.NMEFont.__name__ = "nme.text.NMEFont";
nme.text.NMEFont.factories = null;
nme.text.NMEFont.createFont = function(inDef) {
	if(nme.text.NMEFont.factories == null) {
		return null;
	}
	if(Object.prototype.hasOwnProperty.call(nme.text.NMEFont.factories.h,inDef.name)) {
		return nme.text.NMEFont.factories.h[inDef.name](inDef);
	}
	return null;
};
nme.text.NMEFont.registerFont = function(inName,inFactory) {
	if(nme.text.NMEFont.factories == null) {
		nme.text.NMEFont.factories = new haxe.ds.StringMap();
		var this1 = nme.Loader.load("nme_font_set_factory",1);
		var register = this1;
		register(nme.text.NMEFont.createFont);
	}
	nme.text.NMEFont.factories.h[inName] = inFactory;
};
nme.text.NMEFont.prototype = {
	height: null
	,ascent: null
	,descent: null
	,isRGB: null
	,getGlyphInfo: function(inChar) {
		haxe.Log.trace("getGlyphInfo - not implemented",{ fileName : "../../src/nme/text/NMEFont.hx", lineNumber : 38, className : "nme.text.NMEFont", methodName : "getGlyphInfo"});
		return null;
	}
	,renderGlyph: function(inChar) {
		return new nme.display.BitmapData(1,1);
	}
	,renderGlyphInternal: function(inChar) {
		var result = this.renderGlyph(inChar);
		if(result != null) {
			return result.nmeHandle;
		}
		return null;
	}
	,__class__: nme.text.NMEFont
};
nme.text.SoftKeyboardType = function() {
};
$hxClasses["nme.text.SoftKeyboardType"] = nme.text.SoftKeyboardType;
nme.text.SoftKeyboardType.__name__ = "nme.text.SoftKeyboardType";
nme.text.SoftKeyboardType.prototype = {
	__class__: nme.text.SoftKeyboardType
};
nme.text.TextFieldAutoSize = $hxEnums["nme.text.TextFieldAutoSize"] = { __ename__:"nme.text.TextFieldAutoSize",__constructs__:null
	,CENTER: {_hx_name:"CENTER",_hx_index:0,__enum__:"nme.text.TextFieldAutoSize",toString:$estr}
	,LEFT: {_hx_name:"LEFT",_hx_index:1,__enum__:"nme.text.TextFieldAutoSize",toString:$estr}
	,NONE: {_hx_name:"NONE",_hx_index:2,__enum__:"nme.text.TextFieldAutoSize",toString:$estr}
	,RIGHT: {_hx_name:"RIGHT",_hx_index:3,__enum__:"nme.text.TextFieldAutoSize",toString:$estr}
};
nme.text.TextFieldAutoSize.__constructs__ = [nme.text.TextFieldAutoSize.CENTER,nme.text.TextFieldAutoSize.LEFT,nme.text.TextFieldAutoSize.NONE,nme.text.TextFieldAutoSize.RIGHT];
nme.text.TextFieldAutoSize.__empty_constructs__ = [nme.text.TextFieldAutoSize.CENTER,nme.text.TextFieldAutoSize.LEFT,nme.text.TextFieldAutoSize.NONE,nme.text.TextFieldAutoSize.RIGHT];
nme.text.TextFieldType = $hxEnums["nme.text.TextFieldType"] = { __ename__:"nme.text.TextFieldType",__constructs__:null
	,DYNAMIC: {_hx_name:"DYNAMIC",_hx_index:0,__enum__:"nme.text.TextFieldType",toString:$estr}
	,INPUT: {_hx_name:"INPUT",_hx_index:1,__enum__:"nme.text.TextFieldType",toString:$estr}
};
nme.text.TextFieldType.__constructs__ = [nme.text.TextFieldType.DYNAMIC,nme.text.TextFieldType.INPUT];
nme.text.TextFieldType.__empty_constructs__ = [nme.text.TextFieldType.DYNAMIC,nme.text.TextFieldType.INPUT];
nme.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["nme.text.TextFormat"] = nme.text.TextFormat;
nme.text.TextFormat.__name__ = "nme.text.TextFormat";
nme.text.TextFormat.prototype = {
	align: null
	,blockIndent: null
	,bold: null
	,bullet: null
	,color: null
	,display: null
	,font: null
	,indent: null
	,italic: null
	,kerning: null
	,leading: null
	,leftMargin: null
	,letterSpacing: null
	,rightMargin: null
	,size: null
	,outline: null
	,outlineFlags: null
	,outlineMiterLimit: null
	,tabStops: null
	,target: null
	,underline: null
	,url: null
	,__class__: nme.text.TextFormat
};
nme.text.TextLineMetrics = function(in_x,in_width,in_height,in_ascent,in_descent,in_leading) {
	this.x = in_x;
	this.width = in_width;
	this.height = in_height;
	this.ascent = in_ascent;
	this.descent = in_descent;
	this.leading = in_leading;
};
$hxClasses["nme.text.TextLineMetrics"] = nme.text.TextLineMetrics;
nme.text.TextLineMetrics.__name__ = "nme.text.TextLineMetrics";
nme.text.TextLineMetrics.prototype = {
	x: null
	,width: null
	,height: null
	,ascent: null
	,descent: null
	,leading: null
	,__class__: nme.text.TextLineMetrics
};
nme.ui = {};
nme.ui.Accelerometer = function() { };
$hxClasses["nme.ui.Accelerometer"] = nme.ui.Accelerometer;
nme.ui.Accelerometer.__name__ = "nme.ui.Accelerometer";
nme.ui.Accelerometer.get = function(inAcceleration) {
	var bIsSupported = nme.ui.Accelerometer.nme_input_get_acceleration_support();
	if(bIsSupported) {
		var x = nme.ui.Accelerometer.nme_input_get_acceleration_x();
		var y = nme.ui.Accelerometer.nme_input_get_acceleration_y();
		var z = nme.ui.Accelerometer.nme_input_get_acceleration_z();
		if(inAcceleration == null) {
			return { x : x, y : y, z : z};
		} else {
			inAcceleration.x = x;
			inAcceleration.y = y;
			inAcceleration.z = z;
			return inAcceleration;
		}
	}
	return null;
};
nme.ui.Accelerometer.isSupported = function() {
	return nme.ui.Accelerometer.nme_input_get_acceleration_support();
};
nme.ui.GameInput = function() {
	nme.events.EventDispatcher.call(this);
	nme.ui.GameInput.nmeInstances.push(this);
};
$hxClasses["nme.ui.GameInput"] = nme.ui.GameInput;
nme.ui.GameInput.__name__ = "nme.ui.GameInput";
nme.ui.GameInput.hasInstances = function() {
	if(nme.ui.GameInput.nmeInstances.length <= 0) {
		return nme.ui.GameInput.nmeKeyboardDevices.length > 0;
	} else {
		return true;
	}
};
nme.ui.GameInput.getBest = function() {
	var d = nme.ui.GameInput.getDeviceAt(0);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(1);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(2);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(3);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(4);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(5);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(6);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(7);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(8);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(9);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(10);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(11);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(12);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(13);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(14);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(15);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(16);
	if(d != null) {
		return d;
	}
	var d = nme.ui.GameInput.getDeviceAt(17);
	if(d != null) {
		return d;
	}
	return null;
};
nme.ui.GameInput.getDeviceAt = function(index) {
	if(index >= 0 && index < nme.ui.GameInput.nmeDevices.length) {
		return nme.ui.GameInput.nmeDevices[index];
	}
	index -= 16;
	if(index >= 0 && index < nme.ui.GameInput.nmeKeyboardDevices.length) {
		return nme.ui.GameInput.nmeKeyboardDevices[index];
	}
	return null;
};
nme.ui.GameInput.getGamepadGuid = function(index) {
	return "guid" + index;
};
nme.ui.GameInput.getGamepadName = function(index) {
	return "name" + index;
};
nme.ui.GameInput.__getDevice = function(index) {
	if(index < 0 || index > 16) {
		return null;
	}
	if(nme.ui.GameInput.nmeDevices[index] == null) {
		nme.ui.GameInput.nmeDevices[index] = new nme.ui.GameInputDevice(nme.ui.GameInput.getGamepadGuid(index),nme.ui.GameInput.getGamepadName(index));
		nme.ui.GameInput.numDevices = 0;
		var _g = 0;
		var _g1 = nme.ui.GameInput.nmeDevices;
		while(_g < _g1.length) {
			var nmeDevice = _g1[_g];
			++_g;
			if(nmeDevice != null) {
				nme.ui.GameInput.numDevices++;
			}
		}
	}
	return nme.ui.GameInput.nmeDevices[index];
};
nme.ui.GameInput.nmeGamepadConnect = function(index) {
	var device = nme.ui.GameInput.__getDevice(index);
	if(device == null) {
		return;
	}
	var _g = 0;
	var _g1 = nme.ui.GameInput.nmeInstances;
	while(_g < _g1.length) {
		var instance = _g1[_g];
		++_g;
		instance.dispatchEvent(new nme.events.GameInputEvent("deviceAdded",null,null,device));
	}
};
nme.ui.GameInput.nmeGamepadDisconnect = function(index) {
	var device = nme.ui.GameInput.nmeDevices[index];
	if(device != null) {
		nme.ui.GameInput.nmeDevices[index] = null;
		nme.ui.GameInput.numDevices = 0;
		var _g = 0;
		var _g1 = nme.ui.GameInput.nmeDevices;
		while(_g < _g1.length) {
			var nmeDevice = _g1[_g];
			++_g;
			if(nmeDevice != null) {
				nme.ui.GameInput.numDevices++;
			}
		}
		var _g = 0;
		var _g1 = nme.ui.GameInput.nmeInstances;
		while(_g < _g1.length) {
			var instance = _g1[_g];
			++_g;
			instance.dispatchEvent(new nme.events.GameInputEvent("deviceRemoved",null,null,device));
		}
	}
};
nme.ui.GameInput.nmeGamepadAxisMove = function(index,axis,value) {
	var device = nme.ui.GameInput.__getDevice(index);
	if(device == null) {
		return;
	}
	if(device.enabled) {
		if(!device.nmeAxis.h.hasOwnProperty(axis)) {
			var control = new nme.ui.GameInputControl(device,"AXIS_" + axis,-1,1);
			device.nmeAxis.h[axis] = control;
			device.nmeControls.push(control);
		}
		var control = device.nmeAxis.h[axis];
		control.value = value;
		control.dispatchEvent(new nme.events.Event("change"));
	}
};
nme.ui.GameInput.nmeGamepadButton = function(index,button,down) {
	var device = nme.ui.GameInput.__getDevice(index);
	if(device == null) {
		return;
	}
	if(device.enabled) {
		if(!device.nmeButton.h.hasOwnProperty(button)) {
			var control = new nme.ui.GameInputControl(device,"BUTTON_" + button,0,1);
			device.nmeButton.h[button] = control;
			device.nmeControls.push(control);
		}
		var control = device.nmeButton.h[button];
		control.value = down;
		control.dispatchEvent(new nme.events.Event("change"));
	}
};
nme.ui.GameInput.__super__ = nme.events.EventDispatcher;
nme.ui.GameInput.prototype = $extend(nme.events.EventDispatcher.prototype,{
	addKeyboardDevice0: function() {
		if(nme.ui.GameInput.nmeKeyboardDevices[0] != null) {
			return nme.ui.GameInput.nmeKeyboardDevices[0];
		}
		var _g = new haxe.ds.IntMap();
		_g.h[0] = 32;
		_g.h[1] = 13;
		_g.h[2] = 188;
		_g.h[3] = 190;
		_g.h[11] = 38;
		_g.h[12] = 40;
		_g.h[13] = 37;
		_g.h[14] = 39;
		_g.h[4] = 27;
		_g.h[6] = 9;
		var device = new nme.ui.KeyboardInputDevice("Keyboard0","Keyboard0",_g);
		nme.ui.GameInput.nmeKeyboardDevices[0] = device;
		this.dispatchEvent(new nme.events.GameInputEvent("deviceAdded",null,null,device));
		return device;
	}
	,addEventListener: function(type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) {
			useWeakReference = false;
		}
		if(priority == null) {
			priority = 0;
		}
		if(useCapture == null) {
			useCapture = false;
		}
		nme.events.EventDispatcher.prototype.addEventListener.call(this,type,listener,useCapture,priority,useWeakReference);
		if(type == "deviceAdded") {
			var _g = 0;
			var _g1 = nme.ui.GameInput.nmeDevices;
			while(_g < _g1.length) {
				var device = _g1[_g];
				++_g;
				if(device != null) {
					this.dispatchEvent(new nme.events.GameInputEvent("deviceAdded",null,null,device));
				}
			}
			var _g = 0;
			var _g1 = nme.ui.GameInput.nmeKeyboardDevices;
			while(_g < _g1.length) {
				var device = _g1[_g];
				++_g;
				if(device != null) {
					this.dispatchEvent(new nme.events.GameInputEvent("deviceAdded",null,null,device));
				}
			}
		}
	}
	,__class__: nme.ui.GameInput
});
nme.ui.GameInputControl = function(inDevice,inId,inMinValue,inMaxValue,inValue) {
	if(inValue == null) {
		inValue = 0;
	}
	nme.events.EventDispatcher.call(this);
	this.device = inDevice;
	this.id = inId;
	this.minValue = inMinValue;
	this.maxValue = inMaxValue;
	this.value = inValue;
	this.hasListeners = false;
};
$hxClasses["nme.ui.GameInputControl"] = nme.ui.GameInputControl;
nme.ui.GameInputControl.__name__ = "nme.ui.GameInputControl";
nme.ui.GameInputControl.__super__ = nme.events.EventDispatcher;
nme.ui.GameInputControl.prototype = $extend(nme.events.EventDispatcher.prototype,{
	device: null
	,id: null
	,maxValue: null
	,minValue: null
	,value: null
	,hasListeners: null
	,setButtonState: function(down) {
		this.value = down ? 1 : 0;
		if(this.mightRespondTo("change")) {
			this.dispatchEvent(new nme.events.Event("change"));
		}
	}
	,__class__: nme.ui.GameInputControl
});
nme.ui.GameInputDevice = function(id,name) {
	this.nmeControls = [];
	this.nmeButton = new haxe.ds.IntMap();
	this.nmeAxis = new haxe.ds.IntMap();
	this.id = id;
	this.name = name;
	var control;
	control = new nme.ui.GameInputControl(this,"AXIS_" + 0,-1,1);
	this.nmeAxis.h[0] = control;
	this.nmeControls.push(control);
	control = new nme.ui.GameInputControl(this,"AXIS_" + 1,-1,1);
	this.nmeAxis.h[1] = control;
	this.nmeControls.push(control);
	control = new nme.ui.GameInputControl(this,"AXIS_" + 2,-1,1);
	this.nmeAxis.h[2] = control;
	this.nmeControls.push(control);
	control = new nme.ui.GameInputControl(this,"AXIS_" + 3,-1,1);
	this.nmeAxis.h[3] = control;
	this.nmeControls.push(control);
	control = new nme.ui.GameInputControl(this,"AXIS_" + 4,-1,1);
	this.nmeAxis.h[4] = control;
	this.nmeControls.push(control);
	control = new nme.ui.GameInputControl(this,"AXIS_" + 5,-1,1);
	this.nmeAxis.h[5] = control;
	this.nmeControls.push(control);
	var _g = 0;
	while(_g < 15) {
		var i = _g++;
		control = new nme.ui.GameInputControl(this,"BUTTON_" + i,0,1);
		this.nmeButton.h[i] = control;
		this.nmeControls.push(control);
	}
};
$hxClasses["nme.ui.GameInputDevice"] = nme.ui.GameInputDevice;
nme.ui.GameInputDevice.__name__ = "nme.ui.GameInputDevice";
nme.ui.GameInputDevice.prototype = {
	enabled: null
	,id: null
	,name: null
	,sampleInterval: null
	,nmeAxis: null
	,nmeButton: null
	,nmeControls: null
	,nmeHandle: null
	,toString: function() {
		return "GameInputDevice(" + this.id + ":" + this.name + ")";
	}
	,getButtonAt: function(i) {
		if(i >= 0 && i < 15) {
			return this.nmeControls[i + 6];
		} else {
			return null;
		}
	}
	,getAxisAt: function(i) {
		if(i >= 0 && i < 6) {
			return this.nmeControls[i];
		} else {
			return null;
		}
	}
	,getCachedSamples: function(data,append) {
		if(append == null) {
			append = false;
		}
		return 0;
	}
	,isButtonDown: function(buttonId) {
		if(buttonId < 0 || buttonId >= 15) {
			return false;
		}
		return this.nmeControls[buttonId + 6].value > 0;
	}
	,readDPadUp: function() {
		return this.isButtonDown(11);
	}
	,readDPadDown: function() {
		return this.isButtonDown(12);
	}
	,readDPadLeft: function() {
		return this.isButtonDown(13);
	}
	,readDPadRight: function() {
		return this.isButtonDown(14);
	}
	,getX0: function() {
		return this.nmeControls[0].value;
	}
	,getY0: function() {
		return this.nmeControls[1].value;
	}
	,isLeft: function() {
		if(!(this.getX0() < -0.5)) {
			return this.readDPadLeft();
		} else {
			return true;
		}
	}
	,isRight: function() {
		if(!(this.getX0() > 0.5)) {
			return this.readDPadRight();
		} else {
			return true;
		}
	}
	,isUp: function() {
		if(!(this.getY0() < -0.5)) {
			return this.readDPadUp();
		} else {
			return true;
		}
	}
	,isDown: function() {
		if(!(this.getY0() > 0.5)) {
			return this.readDPadDown();
		} else {
			return true;
		}
	}
	,getDx: function() {
		return (this.isLeft() ? -1 : 0) + (this.isRight() ? 1 : 0);
	}
	,getDy: function() {
		return (this.isUp() ? -1 : 0) + (this.isDown() ? 1 : 0);
	}
	,getControlAt: function(i) {
		if(i >= 0 && i < this.nmeControls.length) {
			return this.nmeControls[i];
		}
		return null;
	}
	,startCachingSamples: function(numSamples,controls) {
	}
	,stopCachingSamples: function() {
	}
	,get_numControls: function() {
		return this.nmeControls.length;
	}
	,__class__: nme.ui.GameInputDevice
	,__properties__: {get_numControls:"get_numControls"}
};
nme.ui.GamepadAxis = function() { };
$hxClasses["nme.ui.GamepadAxis"] = nme.ui.GamepadAxis;
nme.ui.GamepadAxis.__name__ = "nme.ui.GamepadAxis";
nme.ui.GamepadAxis.toString = function(id) {
	switch(id) {
	case 0:
		return "GamepadAxis.LEFT";
	case 2:
		return "GamepadAxis.RIGHT";
	case 4:
		return "GamepadAxis.TRIGGER";
	default:
		return "AXIS UNKNOWN";
	}
};
nme.ui.GamepadButton = function() { };
$hxClasses["nme.ui.GamepadButton"] = nme.ui.GamepadButton;
nme.ui.GamepadButton.__name__ = "nme.ui.GamepadButton";
nme.ui.GamepadButton.toString = function(id) {
	switch(id) {
	case 0:
		return "GamepadButton.A";
	case 1:
		return "GamepadButton.B";
	case 2:
		return "GamepadButton.X";
	case 3:
		return "GamepadButton.Y";
	case 4:
		return "GamepadButton.BACK";
	case 5:
		return "GamepadButton.GUIDE";
	case 6:
		return "GamepadButton.START";
	case 7:
		return "GamepadButton.LEFT_STICK";
	case 8:
		return "GamepadButton.RIGHT_STICK";
	case 9:
		return "GamepadButton.LEFT_SHOULDER";
	case 10:
		return "GamepadButton.RIGHT_SHOULDER";
	case 11:
		return "GamepadButton.DPAD_UP";
	case 12:
		return "GamepadButton.DPAD_DOWN";
	case 13:
		return "GamepadButton.DPAD_LEFT";
	case 14:
		return "GamepadButton.DPAD_RIGHT";
	default:
		return "BUTTON UNKNOWN[id:" + id + "]";
	}
};
nme.ui.KeyLocation = function() { };
$hxClasses["nme.ui.KeyLocation"] = nme.ui.KeyLocation;
nme.ui.KeyLocation.__name__ = "nme.ui.KeyLocation";
nme.ui.Keyboard = function() { };
$hxClasses["nme.ui.Keyboard"] = nme.ui.Keyboard;
nme.ui.Keyboard.__name__ = "nme.ui.Keyboard";
nme.ui.KeyboardInputDevice = function(id,name,inButtonKeys) {
	nme.ui.GameInputDevice.call(this,id,name);
	if(nme.ui.KeyboardInputDevice.allDevices == null) {
		nme.ui.KeyboardInputDevice.allDevices = [];
		nme.Lib.get_current().get_stage().addEventListener("keyDown",nme.ui.KeyboardInputDevice.keyDown);
		nme.Lib.get_current().get_stage().addEventListener("keyUp",nme.ui.KeyboardInputDevice.keyUp);
	}
	this.buttonKeys = [];
	var bid = inButtonKeys.keys();
	while(bid.hasNext()) {
		var bid1 = bid.next();
		this.buttonKeys[bid1] = inButtonKeys.h[bid1];
	}
	nme.ui.KeyboardInputDevice.allDevices.push(this);
};
$hxClasses["nme.ui.KeyboardInputDevice"] = nme.ui.KeyboardInputDevice;
nme.ui.KeyboardInputDevice.__name__ = "nme.ui.KeyboardInputDevice";
nme.ui.KeyboardInputDevice.keyDown = function(ev) {
	if(ev.keyCode > 0) {
		var _g = 0;
		var _g1 = nme.ui.KeyboardInputDevice.allDevices;
		while(_g < _g1.length) {
			var device = _g1[_g];
			++_g;
			if(device.enabled) {
				device.onKey(ev.keyCode,true);
			}
		}
	}
};
nme.ui.KeyboardInputDevice.keyUp = function(ev) {
	if(ev.keyCode > 0) {
		var _g = 0;
		var _g1 = nme.ui.KeyboardInputDevice.allDevices;
		while(_g < _g1.length) {
			var device = _g1[_g];
			++_g;
			if(device.enabled) {
				device.onKey(ev.keyCode,false);
			}
		}
	}
};
nme.ui.KeyboardInputDevice.__super__ = nme.ui.GameInputDevice;
nme.ui.KeyboardInputDevice.prototype = $extend(nme.ui.GameInputDevice.prototype,{
	buttonKeys: null
	,onKey: function(code,isDown) {
		var bid = this.buttonKeys.indexOf(code);
		if(bid >= 0) {
			var but = this.getButtonAt(bid);
			if(but != null) {
				but.setButtonState(isDown);
			}
		}
	}
	,__class__: nme.ui.KeyboardInputDevice
});
nme.ui.Mouse = function() { };
$hxClasses["nme.ui.Mouse"] = nme.ui.Mouse;
nme.ui.Mouse.__name__ = "nme.ui.Mouse";
nme.ui.Mouse.hide = function() {
	if(nme.Lib.get_stage() != null) {
		nme.Lib.get_stage().showCursor(false);
	}
};
nme.ui.Mouse.show = function() {
	if(nme.Lib.get_stage() != null) {
		nme.Lib.get_stage().showCursor(true);
	}
};
nme.ui.MouseCursor = function() { };
$hxClasses["nme.ui.MouseCursor"] = nme.ui.MouseCursor;
nme.ui.MouseCursor.__name__ = "nme.ui.MouseCursor";
nme.ui.Multitouch = function() { };
$hxClasses["nme.ui.Multitouch"] = nme.ui.Multitouch;
nme.ui.Multitouch.__name__ = "nme.ui.Multitouch";
nme.ui.Multitouch.__properties__ = {get_supportsTouchEvents:"get_supportsTouchEvents",set_inputMode:"set_inputMode",get_inputMode:"get_inputMode"};
nme.ui.Multitouch.maxTouchPoints = null;
nme.ui.Multitouch.supportedGestures = null;
nme.ui.Multitouch.supportsGestureEvents = null;
nme.ui.Multitouch.supportsTouchEvents = null;
nme.ui.Multitouch.get_inputMode = function() {
	if(nme.ui.Multitouch.nme_stage_get_multitouch_active(nme.Lib.get_current().get_stage().nmeHandle)) {
		return nme.ui.MultitouchInputMode.TOUCH_POINT;
	} else {
		return nme.ui.MultitouchInputMode.NONE;
	}
};
nme.ui.Multitouch.set_inputMode = function(inMode) {
	if(inMode == nme.ui.MultitouchInputMode.GESTURE) {
		return nme.ui.Multitouch.get_inputMode();
	}
	nme.ui.Multitouch.nme_stage_set_multitouch_active(nme.Lib.get_current().get_stage().nmeHandle,inMode == nme.ui.MultitouchInputMode.TOUCH_POINT);
	return inMode;
};
nme.ui.Multitouch.get_supportsTouchEvents = function() {
	return nme.ui.Multitouch.nme_stage_get_multitouch_supported(nme.Lib.get_current().get_stage().nmeHandle);
};
nme.ui.MultitouchInputMode = $hxEnums["nme.ui.MultitouchInputMode"] = { __ename__:"nme.ui.MultitouchInputMode",__constructs__:null
	,NONE: {_hx_name:"NONE",_hx_index:0,__enum__:"nme.ui.MultitouchInputMode",toString:$estr}
	,TOUCH_POINT: {_hx_name:"TOUCH_POINT",_hx_index:1,__enum__:"nme.ui.MultitouchInputMode",toString:$estr}
	,GESTURE: {_hx_name:"GESTURE",_hx_index:2,__enum__:"nme.ui.MultitouchInputMode",toString:$estr}
};
nme.ui.MultitouchInputMode.__constructs__ = [nme.ui.MultitouchInputMode.NONE,nme.ui.MultitouchInputMode.TOUCH_POINT,nme.ui.MultitouchInputMode.GESTURE];
nme.ui.MultitouchInputMode.__empty_constructs__ = [nme.ui.MultitouchInputMode.NONE,nme.ui.MultitouchInputMode.TOUCH_POINT,nme.ui.MultitouchInputMode.GESTURE];
nme.ui.Scale = function() { };
$hxClasses["nme.ui.Scale"] = nme.ui.Scale;
nme.ui.Scale.__name__ = "nme.ui.Scale";
nme.ui.Scale.getFontScale = function() {
	if(nme.ui.Scale.scale == 0.0) {
		nme.ui.Scale.scale = nme.system.Capabilities.get_screenDPI();
		if(nme.ui.Scale.scale > 120) {
			nme.ui.Scale.scale /= 120;
		} else {
			nme.ui.Scale.scale = 1.0;
		}
	}
	return nme.ui.Scale.scale;
};
nme.utils = {};
nme.utils.IMemoryRange = function() { };
$hxClasses["nme.utils.IMemoryRange"] = nme.utils.IMemoryRange;
nme.utils.IMemoryRange.__name__ = "nme.utils.IMemoryRange";
nme.utils.IMemoryRange.__isInterface__ = true;
nme.utils.IMemoryRange.prototype = {
	getByteBuffer: null
	,getStart: null
	,getLength: null
	,__class__: nme.utils.IMemoryRange
};
nme.utils.ArrayBufferView = function(inLengthOrBuffer,inByteOffset,inLength) {
	if(inByteOffset == null) {
		inByteOffset = 0;
	}
	if(typeof(inLengthOrBuffer) == "number" && ((inLengthOrBuffer | 0) === inLengthOrBuffer)) {
		this.byteLength = inLengthOrBuffer | 0;
		this.byteOffset = 0;
		this.buffer = new nme.utils.ByteArray(inLengthOrBuffer | 0);
	} else {
		if(((inLengthOrBuffer) instanceof haxe.io.Bytes)) {
			this.buffer = nme.utils.ByteArray.fromBytes(inLengthOrBuffer);
		} else {
			this.buffer = inLengthOrBuffer;
		}
		if(this.buffer == null) {
			this.buffer = new nme.utils.ByteArray(0);
		}
		this.byteOffset = inByteOffset;
		if(this.byteOffset > this.buffer.length) {
			throw haxe.Exception.thrown("Invalid starting position");
		}
		if(inLength == null) {
			this.byteLength = this.buffer.length - inByteOffset;
		} else {
			this.byteLength = inLength;
			if(this.byteLength + this.byteOffset > this.buffer.length) {
				throw haxe.Exception.thrown("Invalid buffer length");
			}
		}
	}
	this.buffer.bigEndian = false;
};
$hxClasses["nme.utils.ArrayBufferView"] = nme.utils.ArrayBufferView;
nme.utils.ArrayBufferView.__name__ = "nme.utils.ArrayBufferView";
nme.utils.ArrayBufferView.__interfaces__ = [nme.utils.IMemoryRange];
nme.utils.ArrayBufferView.prototype = {
	buffer: null
	,byteOffset: null
	,byteLength: null
	,toBytes: function() {
		return this.buffer;
	}
	,setData: function(byteData,inOffset) {
		var size = byteData.getLength();
		if(size + inOffset > this.byteLength) {
			throw haxe.Exception.thrown("Out of bounds");
		}
		var targetOff = this.byteOffset + inOffset;
		this.buffer.blit(targetOff,byteData.getByteBuffer(),byteData.getStart(),size);
	}
	,getByteBuffer: function() {
		return this.buffer;
	}
	,getStart: function() {
		return this.byteOffset;
	}
	,getLength: function() {
		return this.byteLength;
	}
	,getFloat32: function(bytePos) {
		this.buffer.position = bytePos + this.byteOffset;
		return this.buffer.readFloat();
	}
	,setFloat32: function(bytePos,v) {
		this.buffer.position = bytePos + this.byteOffset;
		this.buffer.writeFloat(v);
	}
	,getUInt8: function(bytePos) {
		this.buffer.position = bytePos + this.byteOffset;
		var _this = this.buffer;
		var val = _this.position < _this.length ? _this.b[_this.position++] : _this.ThrowEOFi();
		if((val & 128) != 0) {
			return val - 256;
		} else {
			return val;
		}
	}
	,setUInt8: function(bytePos,v) {
		this.buffer.position = bytePos + this.byteOffset;
		var _this = this.buffer;
		_this.ensureElem(_this.position,true);
		_this.b[_this.position++] = v;
	}
	,getInt16: function(bytePos) {
		this.buffer.position = bytePos + this.byteOffset;
		return this.buffer.readShort();
	}
	,getUInt16: function(bytePos) {
		this.buffer.position = bytePos + this.byteOffset;
		return this.buffer.readUnsignedShort();
	}
	,setInt16: function(bytePos,v) {
		this.buffer.position = bytePos + this.byteOffset;
		this.buffer.writeShort(v | 0);
	}
	,setUInt16: function(bytePos,v) {
		this.buffer.position = bytePos + this.byteOffset;
		this.buffer.writeShort(v | 0);
	}
	,getInt32: function(bytePos) {
		this.buffer.position = bytePos + this.byteOffset;
		return this.buffer.readInt();
	}
	,setInt32: function(bytePos,v) {
		this.buffer.position = bytePos + this.byteOffset;
		this.buffer.writeInt(v | 0);
	}
	,__class__: nme.utils.ArrayBufferView
};
nme.utils.IDataOutput = function() { };
$hxClasses["nme.utils.IDataOutput"] = nme.utils.IDataOutput;
nme.utils.IDataOutput.__name__ = "nme.utils.IDataOutput";
nme.utils.IDataOutput.__isInterface__ = true;
nme.utils.IDataOutput.prototype = {
	writeBoolean: null
	,writeByte: null
	,writeBytes: null
	,writeDouble: null
	,writeFloat: null
	,writeInt: null
	,writeShort: null
	,writeUnsignedInt: null
	,writeUTF: null
	,writeUTFBytes: null
	,get_endian: null
	,set_endian: null
	,__class__: nme.utils.IDataOutput
	,__properties__: {set_endian:"set_endian",get_endian:"get_endian"}
};
nme.utils.IDataInput = function() { };
$hxClasses["nme.utils.IDataInput"] = nme.utils.IDataInput;
nme.utils.IDataInput.__name__ = "nme.utils.IDataInput";
nme.utils.IDataInput.__isInterface__ = true;
nme.utils.IDataInput.prototype = {
	bytesAvailable: null
	,readBoolean: null
	,readByte: null
	,readBytes: null
	,readDouble: null
	,readFloat: null
	,readInt: null
	,readShort: null
	,readUnsignedByte: null
	,readUnsignedInt: null
	,readUnsignedShort: null
	,readUTF: null
	,readUTFBytes: null
	,get_bytesAvailable: null
	,get_endian: null
	,set_endian: null
	,__class__: nme.utils.IDataInput
	,__properties__: {set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
};
nme.utils.ByteArray = function(inSize,inWriteOnly) {
	if(inWriteOnly == null) {
		inWriteOnly = false;
	}
	if(inSize == null) {
		inSize = 0;
	}
	this.ptr = null;
	this.bigEndian = true;
	this.position = 0;
	if(inSize < 0) {
		inSize = 0;
	}
	this.alloced = inSize < 16 ? 16 : inSize;
	var bytes = new ArrayBuffer(this.alloced);
	haxe.io.Bytes.call(this,bytes);
	if(inWriteOnly) {
		this.flags = this.flags == null ? 2 : this.flags | 2;
	}
	this.onBufferChanged();
};
$hxClasses["nme.utils.ByteArray"] = nme.utils.ByteArray;
nme.utils.ByteArray.__name__ = "nme.utils.ByteArray";
nme.utils.ByteArray.__interfaces__ = [nme.utils.IDataOutput,nme.utils.IMemoryRange,nme.utils.IDataInput];
nme.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new nme.utils.ByteArray(-1);
	result.b = inBytes.b;
	result.length = inBytes.length;
	result.alloced = result.length;
	result.ptr = null;
	result.onBufferChanged();
	return result;
};
nme.utils.ByteArray.readFile = function(inString) {
	return nme.utils.ByteArray.nme_byte_array_read_file(inString);
};
nme.utils.ByteArray.__super__ = haxe.io.Bytes;
nme.utils.ByteArray.prototype = $extend(haxe.io.Bytes.prototype,{
	bigEndian: null
	,bytesAvailable: null
	,position: null
	,byteLength: null
	,ptr: null
	,flags: null
	,alloced: null
	,get___length: function() {
		return this.length;
	}
	,set___length: function(inLength) {
		return this.setLength(inLength);
	}
	,__resize: function(inLength) {
		this.ensureElem(inLength - 1,true);
	}
	,onBufferChanged: function() {
		if(this.ptr > 0) {
			var offset = nme.utils.ByteArray.nme_buffer_offset(this.ptr);
			this.b = new Uint8Array(Module.HEAP8.buffer,offset,this.alloced);
		}
		this.data = null;
	}
	,realize: function() {
		this.alloced = this.length;
		this.ptr = nme.utils.ByteArray.nme_buffer_create(this.length);
		if(this.length > 0) {
			var offset = nme.utils.ByteArray.nme_buffer_offset(this.ptr);
			var heap = Module.HEAP8;
			if(this.b.length <= this.length) {
				heap.set(this.b,offset);
			} else {
				heap.set(this.b.subarray(0,this.length),offset);
			}
		}
		this.b = null;
		this.onBufferChanged();
	}
	,unrealize: function() {
		var f = this.flags == null ? 0 : this.flags;
		if((f & 1) != 0) {
			this.ptr = null;
			this.alloced = 0;
			this.length = 0;
			this.data = null;
			this.b = null;
		} else {
			this.alloced = this.length < 16 ? 16 : this.length;
			var data = new ArrayBuffer(this.alloced);
			this.b = new Uint8Array(data);
			this.b.bufferValue = data;
			data.hxBytes = this;
			data.bytes = this.b;
			if(this.length > 0 && (f & 2) != 0) {
				var offset = nme.utils.ByteArray.nme_buffer_offset(this.ptr);
				var heap = Module.HEAP8;
				this.b.set(heap.subarray(offset,offset + this.length));
			}
			this.ptr = null;
		}
		this.onBufferChanged();
	}
	,__get: function(pos) {
		return this.b[pos];
	}
	,__set: function(pos,v) {
		this.b[pos] = v;
	}
	,asString: function() {
		return this.readUTFBytes(this.length);
	}
	,checkData: function(inLength) {
		if(inLength + this.position > this.length) {
			this.ThrowEOFi();
		}
	}
	,clear: function() {
		this.position = 0;
		this.length = 0;
	}
	,compress: function(algorithm) {
		var src = this;
		var result;
		if(algorithm == nme.utils.CompressionAlgorithm.LZMA) {
			result = haxe.io.Bytes.ofData(nme.utils.ByteArray.nme_lzma_encode(src.b.bufferValue));
		} else {
			var windowBits;
			if(algorithm == null) {
				windowBits = 15;
			} else {
				switch(algorithm._hx_index) {
				case 0:
					windowBits = -15;
					break;
				case 3:
					windowBits = 31;
					break;
				default:
					windowBits = 15;
				}
			}
			this.alloced = this.length = nme.utils.ByteArray.nme_zip_encode(src);
			this.onBufferChanged();
		}
	}
	,deflate: function() {
		this.compress(nme.utils.CompressionAlgorithm.DEFLATE);
	}
	,setAllocSize: function(inSize) {
		this.alloced = inSize;
		if(this.ptr > 0) {
			nme.utils.ByteArray.nme_buffer_resize(this.ptr,this.alloced);
		} else {
			var dest = new Uint8Array(this.alloced);
			var copy = this.length < inSize ? this.length : inSize;
			var _g = 0;
			var _g1 = copy;
			while(_g < _g1) {
				var i = _g++;
				dest[i] = this.b[i];
			}
			this.b = dest;
		}
		this.onBufferChanged();
	}
	,setByteSize: function(inSize) {
		this.setAllocSize(inSize);
		this.length = inSize;
	}
	,ensureElem: function(inSize,inUpdateLength) {
		var len = inSize + 1;
		if(this.alloced < len) {
			this.setAllocSize(((len + 1) * 3 >> 1) + 3 & -4);
		}
		if(inUpdateLength && this.length < len) {
			this.length = len;
		}
	}
	,getLength: function() {
		return this.length;
	}
	,getByteBuffer: function() {
		return this;
	}
	,getStart: function() {
		return 0;
	}
	,inflate: function() {
		this.uncompress(nme.utils.CompressionAlgorithm.DEFLATE);
	}
	,nmeFromBytes: function(inBytes) {
		this.b = inBytes.b;
		this.length = inBytes.length;
		this.alloced = this.length;
		this.ptr = null;
		this.onBufferChanged();
	}
	,readBoolean: function() {
		if(this.position < this.length) {
			return this.b[this.position++] != 0;
		} else {
			return this.ThrowEOFi() != 0;
		}
	}
	,readByte: function() {
		var val = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		if((val & 128) != 0) {
			return val - 256;
		} else {
			return val;
		}
	}
	,readBytes: function(outData,inOffset,inLen) {
		if(inLen == null) {
			inLen = 0;
		}
		if(inOffset == null) {
			inOffset = 0;
		}
		if(inLen == 0) {
			inLen = this.length - this.position;
		}
		if(this.position + inLen > this.length) {
			this.ThrowEOFi();
		}
		if(outData.length < inOffset + inLen) {
			outData.ensureElem(inOffset + inLen - 1,true);
		}
		var src = this.b.subarray(this.position,this.position + inLen);
		outData.b.set(src,inOffset);
		this.position += inLen;
	}
	,readDouble: function() {
		if(this.position + 8 > this.length) {
			this.ThrowEOFi();
		}
		var p = this.position;
		this.position += 8;
		return this.getDouble(p);
	}
	,readFloat: function() {
		if(this.position + 4 > this.length) {
			this.ThrowEOFi();
		}
		var p = this.position;
		this.position += 4;
		return this.getFloat(p);
	}
	,readInt: function() {
		var ch1 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch2 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch3 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch4 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		if(this.bigEndian) {
			return ch1 << 24 | ch2 << 16 | ch3 << 8 | ch4;
		} else {
			return ch4 << 24 | ch3 << 16 | ch2 << 8 | ch1;
		}
	}
	,readMultiByte: function(inLen,charSet) {
		return this.readUTFBytes(inLen);
	}
	,readShort: function() {
		var ch1 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch2 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var val = this.bigEndian ? ch1 << 8 | ch2 : ch2 << 8 | ch1;
		if((val & 32768) != 0) {
			return val - 65536;
		} else {
			return val;
		}
	}
	,readUnsignedByte: function() {
		if(this.position < this.length) {
			return this.b[this.position++];
		} else {
			return this.ThrowEOFi();
		}
	}
	,readUnsignedInt: function() {
		var ch1 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch2 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch3 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch4 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		if(this.bigEndian) {
			return ch1 << 24 | ch2 << 16 | ch3 << 8 | ch4;
		} else {
			return ch4 << 24 | ch3 << 16 | ch2 << 8 | ch1;
		}
	}
	,readUnsignedShort: function() {
		var ch1 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		var ch2 = this.position < this.length ? this.b[this.position++] : this.ThrowEOFi();
		if(this.bigEndian) {
			return ch1 << 8 | ch2;
		} else {
			return (ch2 << 8) + ch1;
		}
	}
	,readUTF: function() {
		var len = this.readUnsignedShort();
		return this.readUTFBytes(len);
	}
	,readUTFBytes: function(inLen) {
		if(this.position + inLen > this.length) {
			this.ThrowEOFi();
		}
		var p = this.position;
		this.position += inLen;
		return this.getString(p,inLen);
	}
	,setLength: function(inLength) {
		if(inLength > 0) {
			this.ensureElem(inLength - 1,false);
		}
		return this.length = inLength;
	}
	,slice: function(inBegin,inEnd) {
		var begin = inBegin;
		if(begin < 0) {
			begin += this.length;
			if(begin < 0) {
				begin = 0;
			}
		}
		var end = inEnd == null ? this.length : inEnd;
		if(end < 0) {
			end += this.length;
			if(end < 0) {
				end = 0;
			}
		}
		if(begin >= end) {
			return new nme.utils.ByteArray();
		}
		var result = new nme.utils.ByteArray(end - begin);
		var opos = this.position;
		result.blit(0,this,begin,end - begin);
		return result;
	}
	,ThrowEOFi: function() {
		throw haxe.Exception.thrown(new nme.errors.EOFError());
	}
	,uncompress: function(algorithm) {
		if(algorithm == null) {
			algorithm = nme.utils.CompressionAlgorithm.GZIP;
		}
		var src = this;
		var result;
		if(algorithm == nme.utils.CompressionAlgorithm.LZMA) {
			result = haxe.io.Bytes.ofData(nme.utils.ByteArray.nme_lzma_decode(src.b.bufferValue));
		} else {
			var windowBits;
			if(algorithm == null) {
				windowBits = 15;
			} else {
				switch(algorithm._hx_index) {
				case 0:
					windowBits = -15;
					break;
				case 3:
					windowBits = 31;
					break;
				default:
					windowBits = 15;
				}
			}
			this.alloced = this.length = nme.utils.ByteArray.nme_zip_decode(src);
			this.b = null;
			this.onBufferChanged();
		}
	}
	,write_uncheck: function(inByte) {
		this.b[this.position++] = inByte;
	}
	,writeBoolean: function(value) {
		this.ensureElem(this.position,true);
		this.b[this.position++] = value ? 1 : 0;
	}
	,writeByte: function(value) {
		this.ensureElem(this.position,true);
		this.b[this.position++] = value;
	}
	,writeBytes: function(bytes,inOffset,inLength) {
		if(inLength == null) {
			inLength = 0;
		}
		if(inOffset == null) {
			inOffset = 0;
		}
		this.writeHaxeBytes(bytes,inOffset,inLength);
	}
	,writeHaxeBytes: function(bytes,inOffset,inLength) {
		if(inLength == 0) {
			inLength = bytes.length - inOffset;
		}
		this.ensureElem(this.position + inLength - 1,true);
		var opos = this.position;
		this.position += inLength;
		this.blit(opos,bytes,inOffset,inLength);
	}
	,writeDouble: function(x) {
		var end = this.position + 8;
		this.ensureElem(end - 1,true);
		this.setDouble(this.position,x);
		this.position += 8;
	}
	,writeFile: function(inString) {
		nme.utils.ByteArray.nme_byte_array_overwrite_file(inString,this);
	}
	,writeFloat: function(x) {
		var end = this.position + 4;
		this.ensureElem(end - 1,true);
		this.setFloat(this.position,x);
		this.position += 4;
	}
	,writeInt: function(value) {
		this.ensureElem(this.position + 3,true);
		if(this.bigEndian) {
			this.b[this.position++] = value >> 24;
			this.b[this.position++] = value >> 16;
			this.b[this.position++] = value >> 8;
			this.b[this.position++] = value;
		} else {
			this.b[this.position++] = value;
			this.b[this.position++] = value >> 8;
			this.b[this.position++] = value >> 16;
			this.b[this.position++] = value >> 24;
		}
	}
	,writeShort: function(value) {
		this.ensureElem(this.position + 1,true);
		if(this.bigEndian) {
			this.b[this.position++] = value >> 8;
			this.b[this.position++] = value;
		} else {
			this.b[this.position++] = value;
			this.b[this.position++] = value >> 8;
		}
	}
	,writeUnsignedInt: function(value) {
		this.writeInt(value);
	}
	,writeUTF: function(s) {
		var bytes = haxe.io.Bytes.ofString(s);
		this.writeShort(bytes.length);
		this.writeHaxeBytes(bytes,0,0);
	}
	,writeUTFBytes: function(s) {
		var bytes = haxe.io.Bytes.ofString(s);
		this.writeHaxeBytes(bytes,0,0);
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,get_byteLength: function() {
		return this.length;
	}
	,get_endian: function() {
		if(this.bigEndian) {
			return "bigEndian";
		} else {
			return "littleEndian";
		}
	}
	,set_endian: function(s) {
		this.bigEndian = s == "bigEndian";
		return s;
	}
	,__class__: nme.utils.ByteArray
	,__properties__: {set___length:"set___length",get___length:"get___length",get_byteLength:"get_byteLength",set_endian:"set_endian",get_endian:"get_endian",get_bytesAvailable:"get_bytesAvailable"}
});
nme.utils.ByteArrayTools = function() { };
$hxClasses["nme.utils.ByteArrayTools"] = nme.utils.ByteArrayTools;
nme.utils.ByteArrayTools.__name__ = "nme.utils.ByteArrayTools";
nme.utils.ByteArrayTools.ofLength = function(inLength) {
	var result = new nme.utils.ByteArray(inLength);
	result.bigEndian = false;
	return result;
};
nme.utils.CompressionAlgorithm = $hxEnums["nme.utils.CompressionAlgorithm"] = { __ename__:"nme.utils.CompressionAlgorithm",__constructs__:null
	,DEFLATE: {_hx_name:"DEFLATE",_hx_index:0,__enum__:"nme.utils.CompressionAlgorithm",toString:$estr}
	,ZLIB: {_hx_name:"ZLIB",_hx_index:1,__enum__:"nme.utils.CompressionAlgorithm",toString:$estr}
	,LZMA: {_hx_name:"LZMA",_hx_index:2,__enum__:"nme.utils.CompressionAlgorithm",toString:$estr}
	,GZIP: {_hx_name:"GZIP",_hx_index:3,__enum__:"nme.utils.CompressionAlgorithm",toString:$estr}
};
nme.utils.CompressionAlgorithm.__constructs__ = [nme.utils.CompressionAlgorithm.DEFLATE,nme.utils.CompressionAlgorithm.ZLIB,nme.utils.CompressionAlgorithm.LZMA,nme.utils.CompressionAlgorithm.GZIP];
nme.utils.CompressionAlgorithm.__empty_constructs__ = [nme.utils.CompressionAlgorithm.DEFLATE,nme.utils.CompressionAlgorithm.ZLIB,nme.utils.CompressionAlgorithm.LZMA,nme.utils.CompressionAlgorithm.GZIP];
nme.utils.Endian = function() { };
$hxClasses["nme.utils.Endian"] = nme.utils.Endian;
nme.utils.Endian.__name__ = "nme.utils.Endian";
nme.utils.Float32Array = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 4;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		this.length = inBufferOrArray | 0;
		nme.utils.ArrayBufferView.call(this,this.length * this.BYTES_PER_ELEMENT);
	} else if(((inBufferOrArray) instanceof Array)) {
		var floats = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = floats.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length << 2);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			this.buffer.writeFloat(floats[i + inStart]);
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements != null ? inElements * 4 : null);
		if((this.byteLength & 3) > 0) {
			throw haxe.Exception.thrown("Invalid array size");
		}
		this.length = this.byteLength >> 2;
		if(this.length << 2 != this.byteLength) {
			throw haxe.Exception.thrown("Invalid length multiple");
		}
	}
};
$hxClasses["nme.utils.Float32Array"] = nme.utils.Float32Array;
nme.utils.Float32Array.__name__ = "nme.utils.Float32Array";
nme.utils.Float32Array.fromMatrix = function(inMatrix) {
	return new nme.utils.Float32Array(inMatrix.rawData);
};
nme.utils.Float32Array.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) {
		byteOffset = 0;
	}
	return new nme.utils.Float32Array(bytes,byteOffset,len);
};
nme.utils.Float32Array.__super__ = nme.utils.ArrayBufferView;
nme.utils.Float32Array.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,subarray: function(start,end) {
		if(start == null) {
			start = 0;
		}
		if(end == null) {
			end = this.length;
		}
		return new nme.utils.Float32Array(this.buffer,(start << 2) + this.byteOffset,end - start);
	}
	,set: function(inBufferOrArray,offset) {
		if(offset == null) {
			offset = 0;
		}
		if(((inBufferOrArray) instanceof nme.utils.ArrayBufferView)) {
			var a = inBufferOrArray;
			var length = a.byteLength >> 2;
			var _g = 0;
			var _g1 = length;
			while(_g < _g1) {
				var i = _g++;
				a.buffer.position = (i << 2) + a.byteOffset;
				var v = a.buffer.readFloat();
				this.buffer.position = (i + offset << 2) + this.byteOffset;
				this.buffer.writeFloat(v);
			}
		}
		var _g = 0;
		var _g1 = inBufferOrArray.length;
		while(_g < _g1) {
			var i = _g++;
			var v = inBufferOrArray[i];
			this.buffer.position = (i + offset << 2) + this.byteOffset;
			this.buffer.writeFloat(v);
		}
	}
	,__get: function(index) {
		this.buffer.position = (index << 2) + this.byteOffset;
		return this.buffer.readFloat();
	}
	,__set: function(index,v) {
		this.buffer.position = (index << 2) + this.byteOffset;
		this.buffer.writeFloat(v);
		return v;
	}
	,__class__: nme.utils.Float32Array
});
nme.utils.Float32Buffer = function(inCount,inWriteOnly) {
	if(inWriteOnly == null) {
		inWriteOnly = false;
	}
	if(inCount == null) {
		inCount = 0;
	}
	this.count = inCount;
	nme.utils.ByteArray.call(this,this.count < 4 ? 16 : this.count << 2,inWriteOnly);
	this.bufferSize = this.alloced >> 2;
};
$hxClasses["nme.utils.Float32Buffer"] = nme.utils.Float32Buffer;
nme.utils.Float32Buffer.__name__ = "nme.utils.Float32Buffer";
nme.utils.Float32Buffer.__super__ = nme.utils.ByteArray;
nme.utils.Float32Buffer.prototype = $extend(nme.utils.ByteArray.prototype,{
	count: null
	,f32View: null
	,bufferSize: null
	,onBufferChanged: function() {
		this.bufferSize = this.alloced >> 2;
		if(this.ptr > 0) {
			var offset = nme.utils.ByteArray.nme_buffer_offset(this.ptr);
			this.f32View = new Float32Array(Module.HEAP8.buffer,offset,this.bufferSize);
		} else if(this.b != null) {
			this.f32View = new Float32Array(this.b.buffer,0,this.bufferSize);
		} else {
			this.f32View = null;
		}
	}
	,resize: function(inSize) {
		this.count = inSize;
		this.setByteSize((this.count = inSize) << 2);
		this.bufferSize = this.alloced >> 2;
	}
	,setF32: function(index,val) {
		if(index >= this.count) {
			this.count = index + 1;
			if(index >= this.bufferSize) {
				this.ensureElem((index << 2) + 3,true);
			}
		}
		this.f32View[index] = val;
	}
	,getF32: function(index) {
		return this.f32View[index];
	}
	,setF32q: function(index,val) {
		this.f32View[index] = val;
	}
	,__class__: nme.utils.Float32Buffer
});
nme.utils.Floats3264 = {};
nme.utils.Floats3264._new = function(d) {
	var this1 = d;
	return this1;
};
nme.utils.Floats3264.toDynamic = function(this1) {
	return this1;
};
nme.utils.Floats3264.fromArrayFloat = function(f) {
	var this1 = f;
	return this1;
};
nme.utils.Floats3264.fromArrayFloat32Buffer = function(f) {
	var this1 = f;
	return this1;
};
nme.utils.Int16Array = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 2;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		nme.utils.ArrayBufferView.call(this,(this.length = inBufferOrArray | 0) << 1);
	} else if(((inBufferOrArray) instanceof Array)) {
		var ints = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = ints.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length << 1);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			this.buffer.writeShort(ints[i + inStart]);
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements != null ? inElements * 2 : null);
		if((this.byteLength & 1) > 0) {
			throw haxe.Exception.thrown("Invalid array size");
		}
		this.length = this.byteLength >> 1;
		if(this.length << 1 != this.byteLength) {
			throw haxe.Exception.thrown("Invalid length multiple");
		}
	}
};
$hxClasses["nme.utils.Int16Array"] = nme.utils.Int16Array;
nme.utils.Int16Array.__name__ = "nme.utils.Int16Array";
nme.utils.Int16Array.__super__ = nme.utils.ArrayBufferView;
nme.utils.Int16Array.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,subarray: function(start,end) {
		if(start == null) {
			start = 0;
		}
		if(end == null) {
			end = this.length;
		}
		return new nme.utils.Int16Array(this.buffer,(start << 1) + this.byteOffset,end - start);
	}
	,__get: function(index) {
		this.buffer.position = (index << 1) + this.byteOffset;
		return this.buffer.readShort();
	}
	,__set: function(index,v) {
		this.buffer.position = (index << 1) + this.byteOffset;
		this.buffer.writeShort(v | 0);
		return v;
	}
	,__class__: nme.utils.Int16Array
});
nme.utils.Int32Array = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 4;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		nme.utils.ArrayBufferView.call(this,(this.length = inBufferOrArray | 0) << 2);
	} else if(((inBufferOrArray) instanceof Array)) {
		var ints = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = ints.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length << 2);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			this.buffer.writeInt(ints[i + inStart]);
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements != null ? inElements * 4 : null);
		if((this.byteLength & 3) > 0) {
			throw haxe.Exception.thrown("Invalid array size");
		}
		this.length = this.byteLength >> 2;
		if(this.length << 2 != this.byteLength) {
			throw haxe.Exception.thrown("Invalid length multiple");
		}
	}
};
$hxClasses["nme.utils.Int32Array"] = nme.utils.Int32Array;
nme.utils.Int32Array.__name__ = "nme.utils.Int32Array";
nme.utils.Int32Array.__super__ = nme.utils.ArrayBufferView;
nme.utils.Int32Array.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,subarray: function(start,end) {
		if(start == null) {
			start = 0;
		}
		if(end == null) {
			end = this.length;
		}
		return new nme.utils.Int32Array(this.buffer,(start << 2) + this.byteOffset,end - start);
	}
	,__get: function(index) {
		this.buffer.position = (index << 2) + this.byteOffset;
		return this.buffer.readInt();
	}
	,__set: function(index,v) {
		this.buffer.position = (index << 2) + this.byteOffset;
		this.buffer.writeInt(v | 0);
	}
	,__class__: nme.utils.Int32Array
});
nme.utils.Timer = function(delay,repeatCount) {
	if(repeatCount == null) {
		repeatCount = 0;
	}
	if(isNaN(delay) || delay < 0) {
		throw haxe.Exception.thrown(new nme.errors.Error("The delay specified is negative or not a finite number"));
	}
	nme.events.EventDispatcher.call(this);
	this._delay = delay;
	this.repeatCount = repeatCount;
	this.currentCount = 0;
};
$hxClasses["nme.utils.Timer"] = nme.utils.Timer;
nme.utils.Timer.__name__ = "nme.utils.Timer";
nme.utils.Timer.__super__ = nme.events.EventDispatcher;
nme.utils.Timer.prototype = $extend(nme.events.EventDispatcher.prototype,{
	currentCount: null
	,repeatCount: null
	,running: null
	,_delay: null
	,timer: null
	,reset: function() {
		if(this.running) {
			this.stop();
		}
		this.currentCount = 0;
	}
	,start: function() {
		if(!this.running) {
			this.running = true;
			this.timer = new haxe.Timer(this._delay);
			this.timer.run = $bind(this,this.timer_onTimer);
		}
	}
	,stop: function() {
		this.running = false;
		if(this.timer != null) {
			this.timer.stop();
			this.timer = null;
		}
	}
	,get_delay: function() {
		return this._delay;
	}
	,set_delay: function(value) {
		this._delay = value;
		if(this.running) {
			this.stop();
			this.start();
		}
		return this._delay;
	}
	,timer_onTimer: function() {
		this.currentCount++;
		if(this.repeatCount > 0 && this.currentCount >= this.repeatCount) {
			this.stop();
			this.dispatchEvent(new nme.events.TimerEvent("timer"));
			this.dispatchEvent(new nme.events.TimerEvent("timerComplete"));
		} else {
			this.dispatchEvent(new nme.events.TimerEvent("timer"));
		}
	}
	,__class__: nme.utils.Timer
	,__properties__: {set_delay:"set_delay",get_delay:"get_delay"}
});
nme.utils.UInt16Array = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 2;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		nme.utils.ArrayBufferView.call(this,(this.length = inBufferOrArray | 0) << 1);
	} else if(((inBufferOrArray) instanceof Array)) {
		var ints = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = ints.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length << 1);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			this.buffer.writeShort(ints[i + inStart]);
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements != null ? inElements * 2 : null);
		if((this.byteLength & 1) > 0) {
			throw haxe.Exception.thrown("Invalid array size");
		}
		this.length = this.byteLength >> 1;
		if(this.length << 1 != this.byteLength) {
			throw haxe.Exception.thrown("Invalid length multiple");
		}
	}
};
$hxClasses["nme.utils.UInt16Array"] = nme.utils.UInt16Array;
nme.utils.UInt16Array.__name__ = "nme.utils.UInt16Array";
nme.utils.UInt16Array.__super__ = nme.utils.ArrayBufferView;
nme.utils.UInt16Array.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,__get: function(index) {
		this.buffer.position = (index << 1) + this.byteOffset;
		return this.buffer.readUnsignedShort();
	}
	,__set: function(index,v) {
		this.buffer.position = (index << 1) + this.byteOffset;
		this.buffer.writeShort(v | 0);
		return v;
	}
	,__class__: nme.utils.UInt16Array
});
nme.utils.UInt8Array = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 1;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		nme.utils.ArrayBufferView.call(this,this.length = inBufferOrArray | 0);
	} else if(((inBufferOrArray) instanceof Array)) {
		var ints = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = ints.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var _this = this.buffer;
			_this.ensureElem(_this.position,true);
			var ints1 = ints[i + inStart];
			_this.b[_this.position++] = ints1;
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements);
		this.length = this.byteLength;
	}
};
$hxClasses["nme.utils.UInt8Array"] = nme.utils.UInt8Array;
nme.utils.UInt8Array.__name__ = "nme.utils.UInt8Array";
nme.utils.UInt8Array.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) {
		byteOffset = 0;
	}
	return new nme.utils.UInt8Array(bytes,byteOffset,len);
};
nme.utils.UInt8Array.__super__ = nme.utils.ArrayBufferView;
nme.utils.UInt8Array.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,subarray: function(start,end) {
		if(start == null) {
			start = 0;
		}
		if(end == null) {
			end = this.length;
		}
		return new nme.utils.UInt8Array(this.buffer,start + this.byteOffset,end - start);
	}
	,__get: function(index) {
		this.buffer.position = index + this.byteOffset;
		var _this = this.buffer;
		var val = _this.position < _this.length ? _this.b[_this.position++] : _this.ThrowEOFi();
		if((val & 128) != 0) {
			return val - 256;
		} else {
			return val;
		}
	}
	,__set: function(index,v) {
		this.buffer.position = index + this.byteOffset;
		var _this = this.buffer;
		_this.ensureElem(_this.position,true);
		_this.b[_this.position++] = v;
		return v;
	}
	,__class__: nme.utils.UInt8Array
});
nme.utils.UInt8ClampedArray = function(inBufferOrArray,inStart,inElements) {
	if(inStart == null) {
		inStart = 0;
	}
	this.BYTES_PER_ELEMENT = 1;
	if(typeof(inBufferOrArray) == "number" && ((inBufferOrArray | 0) === inBufferOrArray)) {
		nme.utils.ArrayBufferView.call(this,this.length = inBufferOrArray | 0);
	} else if(((inBufferOrArray) instanceof Array)) {
		var ints = inBufferOrArray;
		if(inElements != null) {
			this.length = inElements;
		} else {
			this.length = ints.length - inStart;
		}
		nme.utils.ArrayBufferView.call(this,this.length);
		this.buffer.position = 0;
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var val = ints[i + inStart];
			val = val < 0 ? 0 : val > 255 ? 255 : 0;
			var _this = this.buffer;
			_this.ensureElem(_this.position,true);
			_this.b[_this.position++] = val;
		}
	} else {
		nme.utils.ArrayBufferView.call(this,inBufferOrArray,inStart,inElements);
		this.length = this.byteLength;
	}
};
$hxClasses["nme.utils.UInt8ClampedArray"] = nme.utils.UInt8ClampedArray;
nme.utils.UInt8ClampedArray.__name__ = "nme.utils.UInt8ClampedArray";
nme.utils.UInt8ClampedArray.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) {
		byteOffset = 0;
	}
	return new nme.utils.UInt8Array(bytes,byteOffset,len);
};
nme.utils.UInt8ClampedArray.__super__ = nme.utils.ArrayBufferView;
nme.utils.UInt8ClampedArray.prototype = $extend(nme.utils.ArrayBufferView.prototype,{
	BYTES_PER_ELEMENT: null
	,length: null
	,subarray: function(start,end) {
		if(start == null) {
			start = 0;
		}
		if(end == null) {
			end = this.length;
		}
		return new nme.utils.UInt8ClampedArray(this.buffer,start + this.byteOffset,end - start);
	}
	,__get: function(index) {
		this.buffer.position = index + this.byteOffset;
		var _this = this.buffer;
		var val = _this.position < _this.length ? _this.b[_this.position++] : _this.ThrowEOFi();
		if((val & 128) != 0) {
			return val - 256;
		} else {
			return val;
		}
	}
	,__set: function(index,v) {
		if(v < 0) {
			v = 0;
		}
		if(v > 255) {
			v = 255;
		}
		this.buffer.position = index + this.byteOffset;
		var _this = this.buffer;
		_this.ensureElem(_this.position,true);
		_this.b[_this.position++] = v;
		return v;
	}
	,__class__: nme.utils.UInt8ClampedArray
});
nme.utils.WeakRef = function(inObject,inMakeWeak) {
	if(inMakeWeak == null) {
		inMakeWeak = true;
	}
	if(inMakeWeak) {
		this.weakRef = nme.utils.WeakRef.nme_weak_ref_create(this,inObject);
		this.hardRef = null;
	} else {
		this.weakRef = -1;
		this.hardRef = inObject;
	}
};
$hxClasses["nme.utils.WeakRef"] = nme.utils.WeakRef;
nme.utils.WeakRef.__name__ = "nme.utils.WeakRef";
nme.utils.WeakRef.prototype = {
	hardRef: null
	,weakRef: null
	,get: function() {
		if(this.hardRef != null) {
			return this.hardRef;
		}
		if(this.weakRef < 0) {
			return null;
		}
		var result = nme.utils.WeakRef.nme_weak_ref_get(this.weakRef);
		if(result == null) {
			this.weakRef = -1;
		}
		return result;
	}
	,toString: function() {
		if(this.hardRef != null) {
			return "" + Std.string(this.hardRef);
		}
		return "WeakRef(" + Std.string(this.get()) + ")";
	}
	,__class__: nme.utils.WeakRef
};
function $iterator(o) { if( o instanceof Array ) return function() { return new haxe.iterators.ArrayIterator(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
haxe.Resource.content = [];
haxe.ds.ObjectMap.count = 0;
js.Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js.lib._ArrayBuffer.ArrayBufferCompat.sliceImpl;
}
if(Module != null) {
	Module.unrealize = nme.NativeResource.unrealize;
	Module.realize = nme.NativeResource.realize;
}
nme.ui.Multitouch.maxTouchPoints = 2;
nme.ui.Multitouch.supportedGestures = [];
nme.ui.Multitouch.supportsGestureEvents = false;
var factory = function(inLen) {
	return new nme.utils.ByteArray(inLen);
};
var resize = function(inArray,inLen) {
	if(inLen > 0) {
		inArray.ensureElem(inLen - 1,true);
	}
	inArray.length = inLen;
};
var bytes = function(inArray) {
	if(inArray == null) {
		return null;
	} else {
		return inArray.b;
	}
};
var slen = function(inArray) {
	if(inArray == null) {
		return 0;
	} else {
		return inArray.length;
	}
};
var this1 = nme.Loader.load("nme_byte_array_init",4);
var init = this1;
if(init != null) {
	init(factory,slen,resize,bytes);
}
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
haxe.SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe.SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
XmlType.Element = 0;
XmlType.PCData = 1;
XmlType.CData = 2;
XmlType.Comment = 3;
XmlType.DocType = 4;
XmlType.ProcessingInstruction = 5;
XmlType.Document = 6;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe.Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Serializer.BASE64_CODES = null;
nme.Loader.foundNdll = false;
nme.Loader.moduleInit = false;
nme.Loader.moduleName = "";
haxe.Timer.sRunningTimers = null;
haxe.Timer.sPollClient = null;
haxe.Timer.nme_time_stamp = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_time_stamp",0);
	$r = this1;
	return $r;
}(this));
haxe.Unserializer.DEFAULT_RESOLVER = new haxe._Unserializer.DefaultResolver();
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
haxe.crypto.Base64.URL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
haxe.crypto.Base64.URL_BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.URL_CHARS);
haxe.io.FPHelper.i64tmp = (function($this) {
	var $r;
	var this1 = new haxe._Int64.___Int64(0,0);
	$r = this1;
	return $r;
}(this));
haxe.io.FPHelper.LN2 = 0.6931471805599453;
haxe.io.FPHelper.helper = new DataView(new ArrayBuffer(8));
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.h["lt"] = "<";
	h.h["gt"] = ">";
	h.h["amp"] = "&";
	h.h["quot"] = "\"";
	h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
nme.Assets.UNCACHED = 0;
nme.Assets.WEAK_CACHE = 1;
nme.Assets.STRONG_CACHE = 2;
nme.Assets.info = new haxe.ds.StringMap();
nme.Assets.pathMapper = new haxe.ds.StringMap();
nme.Assets.byteFactory = new haxe.ds.StringMap();
nme.Assets.libraryFactories = new haxe.ds.StringMap();
nme.Assets.loadedLibraries = new haxe.ds.StringMap();
nme.Assets.cacheMode = 2;
nme.Assets.scriptBase = "";
nme.Assets.cache = new nme.Cache();
nme.app.Application.OrientationPortrait = 1;
nme.app.Application.OrientationPortraitUpsideDown = 2;
nme.app.Application.OrientationLandscapeRight = 3;
nme.app.Application.OrientationLandscapeLeft = 4;
nme.app.Application.OrientationFaceUp = 5;
nme.app.Application.OrientationFaceDown = 6;
nme.app.Application.OrientationPortraitAny = 7;
nme.app.Application.OrientationLandscapeAny = 8;
nme.app.Application.OrientationAny = 9;
nme.app.Application.FULLSCREEN = 1;
nme.app.Application.BORDERLESS = 2;
nme.app.Application.RESIZABLE = 4;
nme.app.Application.HARDWARE = 8;
nme.app.Application.VSYNC = 16;
nme.app.Application.HW_AA = 32;
nme.app.Application.HW_AA_HIRES = 96;
nme.app.Application.DEPTH_BUFFER = 512;
nme.app.Application.STENCIL_BUFFER = 1024;
nme.app.Application.SINGLE_INSTANCE = 2048;
nme.app.Application.SCALE_BASE = 4096;
nme.app.Application.HARDWARE_METAL = 65536;
nme.app.Application.ALWAYS_ON_TOP = 131072;
nme.app.Application.nmeFrameHandle = null;
nme.app.Application.nmeWindow = null;
nme.app.Application.silentRecreate = false;
nme.app.Application.sIsInit = false;
nme.app.Application.onQuit = nme.app.Application.close;
nme.app.Application.nmeQuitting = false;
nme.app.Application.asyncPing = null;
nme.app.Application.mainThreadJobs = [];
nme.app.Application.nme_set_package = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_set_package",4);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_pause_animation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_pause_animation",0);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_resume_animation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_resume_animation",0);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_get_ndll_version = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_get_ndll_version",0);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_get_nme_state_version = nme.Loader.load("nme_get_nme_state_version",0);
nme.app.Application.nme_stage_set_fixed_orientation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_fixed_orientation",1);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_get_bits = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_get_bits",0);
	$r = this1;
	return $r;
}(this));
nme.app.Application.nme_set_native_window = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_set_native_window",1);
	$r = this1;
	return $r;
}(this));
nme.Lib.nmeCurrent = null;
nme.Lib.nmeStage = null;
nme.Lib.FULLSCREEN = 1;
nme.Lib.BORDERLESS = 2;
nme.Lib.RESIZABLE = 4;
nme.Lib.HARDWARE = 8;
nme.Lib.VSYNC = 16;
nme.Lib.HW_AA = 32;
nme.Lib.HW_AA_HIRES = 96;
nme.Lib.ALLOW_SHADERS = 0;
nme.Lib.REQUIRE_SHADERS = 0;
nme.Lib.DEPTH_BUFFER = 512;
nme.Lib.STENCIL_BUFFER = 1024;
nme.Lib.SINGLE_INSTANCE = 2048;
nme.Lib.close = nme.app.Application.close;
nme.Lib.exit = nme.app.Application.exit;
nme.Lib.forceClose = nme.app.Application.forceClose;
nme.Lib.pause = nme.app.Application.pause;
nme.Lib.postUICallback = nme.app.Application.postUICallback;
nme.Lib.resume = nme.app.Application.resume;
nme.Lib.setPackage = nme.app.Application.setPackage;
nme.Lib.setIcon = nme.app.Application.setIcon;
nme.Lib.nme_log = nme.Loader.load("nme_log",1);
nme.Lib.nme_crash = nme.Loader.load("nme_crash",0);
nme.NativeResource.AUTO_CLEAR = 1;
nme.NativeResource.WRITE_ONLY = 2;
nme.NativeResource.nme_native_resource_lock = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_native_resource_lock",1);
	$r = this1;
	return $r;
}(this));
nme.NativeResource.nme_native_resource_unlock = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_native_resource_unlock",1);
	$r = this1;
	return $r;
}(this));
nme.NativeResource.nme_native_resource_release_temps = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_native_resource_release_temps",0);
	$r = this1;
	return $r;
}(this));
nme.NativeResource.nme_native_resource_dispose = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_native_resource_dispose",1);
	$r = this1;
	return $r;
}(this));
nme.Rgb.colourData = "aliceblue:f0f8ff:antiquewhite:faebd7:aqua:00ffff:aquamarine:7fffd4:azure:f0ffff:beige:f5f5dc:bisque:ffe4c4:black:000000:blanchedalmond:ffebcd:blue:0000ff:blueviolet:8a2be2:brown:a52a2a:burlywood:deb887:cadetblue:5f9ea0:chartreuse:7fff00:chocolate:d2691e:coral:ff7f50:cornflowerblue:6495ed:cornsilk:fff8dc:crimson:dc143c:cyan:00ffff:darkblue:00008b:darkcyan:008b8b:darkgoldenrod:b8860b:darkgray:a9a9a9:darkgreen:006400:darkgrey:a9a9a9:darkkhaki:bdb76b:darkmagenta:8b008b:darkolivegreen:556b2f:darkorange:ff8c00:darkorchid:9932cc:darkred:8b0000:darksalmon:e9967a:darkseagreen:8fbc8f:darkslateblue:483d8b:darkslategray:2f4f4f:darkslategrey:2f4f4f:darkturquoise:00ced1:darkviolet:9400d3:deeppink:ff1493:deepskyblue:00bfff:dimgray:696969:dimgrey:696969:dodgerblue:1e90ff:firebrick:b22222:floralwhite:fffaf0:forestgreen:228b22:fuchsia:ff00ff:gainsboro:dcdcdc:ghostwhite:f8f8ff:gold:ffd700:goldenrod:daa520:gray:808080:green:008000:greenyellow:adff2f:grey:808080:honeydew:f0fff0:hotpink:ff69b4:indianred:cd5c5c:indigo:4b0082:ivory:fffff0:khaki:f0e68c:lavender:e6e6fa:lavenderblush:fff0f5:lawngreen:7cfc00:lemonchiffon:fffacd:lightblue:add8e6:lightcoral:f08080:lightcyan:e0ffff:lightgoldenrodyellow:fafad2:lightgray:d3d3d3:lightgreen:90ee90:lightgrey:d3d3d3:lightpink:ffb6c1:lightsalmon:ffa07a:lightseagreen:20b2aa:lightskyblue:87cefa:lightslategray:778899:lightslategrey:778899:lightsteelblue:b0c4de:lightyellow:ffffe0:lime:00ff00:limegreen:32cd32:linen:faf0e6:magenta:ff00ff:maroon:800000:mediumaquamarine:66cdaa:mediumblue:0000cd:mediumorchid:ba55d3:mediumpurple:9370db:mediumseagreen:3cb371:mediumslateblue:7b68ee:mediumspringgreen:00fa9a:mediumturquoise:48d1cc:mediumvioletred:c71585:midnightblue:191970:mintcream:f5fffa:mistyrose:ffe4e1:moccasin:ffe4b5:navajowhite:ffdead:navy:000080:oldlace:fdf5e6:olive:808000:olivedrab:6b8e23:orange:ffa500:orangered:ff4500:orchid:da70d6:palegoldenrod:eee8aa:palegreen:98fb98:paleturquoise:afeeee:palevioletred:db7093:papayawhip:ffefd5:peachpuff:ffdab9:peru:cd853f:pink:ffc0cb:plum:dda0dd:powderblue:b0e0e6:purple:800080:red:ff0000:rosybrown:bc8f8f:royalblue:4169e1:saddlebrown:8b4513:salmon:fa8072:sandybrown:f4a460:seagreen:2e8b57:seashell:fff5ee:sienna:a0522d:silver:c0c0c0:skyblue:87ceeb:slateblue:6a5acd:slategray:708090:slategrey:708090:snow:fffafa:springgreen:00ff7f:steelblue:4682b4:tan:d2b48c:teal:008080:thistle:d8bfd8:tomato:ff6347:turquoise:40e0d0:violet:ee82ee:wheat:f5deb3:white:ffffff:whitesmoke:f5f5f5:yellow:ffff00:yellowgreen:9acd32";
nme.Version.$name = "6.0.0";
nme.app.EventId.Unknown = 0;
nme.app.EventId.KeyDown = 1;
nme.app.EventId.Char = 2;
nme.app.EventId.KeyUp = 3;
nme.app.EventId.MouseMove = 4;
nme.app.EventId.MouseDown = 5;
nme.app.EventId.MouseClick = 6;
nme.app.EventId.MouseUp = 7;
nme.app.EventId.Resize = 8;
nme.app.EventId.Poll = 9;
nme.app.EventId.Quit = 10;
nme.app.EventId.Focus = 11;
nme.app.EventId.ShouldRotate = 12;
nme.app.EventId.DestroyHandler = 13;
nme.app.EventId.Redraw = 14;
nme.app.EventId.TouchBegin = 15;
nme.app.EventId.TouchMove = 16;
nme.app.EventId.TouchEnd = 17;
nme.app.EventId.TouchTap = 18;
nme.app.EventId.Change = 19;
nme.app.EventId.Activate = 20;
nme.app.EventId.Deactivate = 21;
nme.app.EventId.GotInputFocus = 22;
nme.app.EventId.LostInputFocus = 23;
nme.app.EventId.JoyAxisMove = 24;
nme.app.EventId.JoyBallMove = 25;
nme.app.EventId.JoyHatMove = 26;
nme.app.EventId.JoyButtonDown = 27;
nme.app.EventId.JoyButtonUp = 28;
nme.app.EventId.JoyDeviceAdded = 29;
nme.app.EventId.JoyDeviceRemoved = 30;
nme.app.EventId.SysWM = 31;
nme.app.EventId.RenderContextLost = 32;
nme.app.EventId.RenderContextRestored = 33;
nme.app.EventId.Scroll = 34;
nme.app.EventId.AppLink = 35;
nme.app.EventId.DpiChanged = 36;
nme.app.EventId.DropBegin = 37;
nme.app.EventId.DropFile = 38;
nme.app.EventId.DropEnd = 39;
nme.app.EventId.WindowClose = 40;
nme.app.EventId.WindowMoved = 41;
nme.app.EventId.WindowEnter = 42;
nme.app.EventId.WindowLeave = 43;
nme.app.EventName.KEY_DOWN = "keyDown";
nme.app.EventName.KEY_UP = "keyUp";
nme.app.EventName.MOUSE_MOVE = "mouseMove";
nme.app.EventName.MOUSE_DOWN = "mouseDown";
nme.app.EventName.MOUSE_UP = "mouseUp";
nme.app.EventName.CLICK = "click";
nme.app.EventName.TOUCH_BEGIN = "touchBegin";
nme.app.EventName.TOUCH_MOVE = "touchMove";
nme.app.EventName.TOUCH_END = "touchEnd";
nme.app.EventName.TOUCH_TAP = "touchTap";
nme.app.EventName.AXIS_MOVE = "axisMove";
nme.app.EventName.BALL_MOVE = "ballMove";
nme.app.EventName.HAT_MOVE = "hatMove";
nme.app.EventName.BUTTON_DOWN = "buttonDown";
nme.app.EventName.BUTTON_UP = "buttonUp";
nme.app.EventName.DEVICE_ADDED = "deviceAdded";
nme.app.EventName.DEVICE_REMOVED = "deviceRemoved";
nme.app.Window.nme_stage_resize_window = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_resize_window",3);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_is_opengl = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_is_opengl",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_stage_width = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_stage_width",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_stage_height = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_stage_height",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_dpi_scale = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_dpi_scale",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_scale_mode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_scale_mode",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_scale_mode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_scale_mode",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_align = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_align",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_align = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_align",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_quality = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_quality",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_quality = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_quality",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_display_state = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_display_state",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_display_state = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_display_state",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_window_position = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_window_position",3);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_window_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_window_x",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_window_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_window_y",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_next_wake = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_next_wake",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_begin_render = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_begin_render",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_end_render = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_end_render",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_get_frame_stage = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_get_frame_stage",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_display_object_set_bg = nme.Loader.load("nme_display_object_set_bg",2);
nme.app.Window.nme_stage_get_title = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_title",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_set_title = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_title",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_window_close = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_window_close",1);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_window_supports_secondary = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_window_supports_secondary",0);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_stage_get_global_mouse_state = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_global_mouse_state",2);
	$r = this1;
	return $r;
}(this));
nme.app.Window.nme_set_stage_handler = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_set_stage_handler",4);
	$r = this1;
	return $r;
}(this));
nme.desktop.Clipboard._generalClipboard = null;
nme.desktop.Clipboard.nme_desktop_clipboard_set_clipboard_text = nme.Loader.load("nme_desktop_clipboard_set_clipboard_text",1);
nme.desktop.Clipboard.nme_desktop_clipboard_has_clipboard_text = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_desktop_clipboard_has_clipboard_text",0);
	$r = this1;
	return $r;
}(this));
nme.desktop.Clipboard.nme_desktop_clipboard_get_clipboard_text = nme.Loader.load("nme_desktop_clipboard_get_clipboard_text",0);
nme.display.DisplayObject.DISPLAY_KEEP_ID = 1;
nme.display.DisplayObject.nme_create_display_object = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_create_display_object",0);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_graphics = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_graphics",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_draw_to_surface = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_draw_to_surface",-1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_id = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_id",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_x",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_x",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_y",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_y",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_scale_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_scale_x",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_scale_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_scale_x",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_scale_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_scale_y",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_scale_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_scale_y",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_mouse_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_mouse_x",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_mouse_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_mouse_y",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_rotation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_rotation",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_rotation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_rotation",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_bg = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_bg",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_bg = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_bg",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_name = nme.Loader.load("nme_display_object_get_name",1);
nme.display.DisplayObject.nme_display_object_set_name = nme.Loader.load("nme_display_object_set_name",2);
nme.display.DisplayObject.nme_display_object_get_width = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_width",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_width = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_width",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_height = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_height",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_height = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_height",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_alpha = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_alpha",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_alpha = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_alpha",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_blend_mode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_blend_mode",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_blend_mode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_blend_mode",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_cache_as_bitmap = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_cache_as_bitmap",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_cache_as_bitmap = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_cache_as_bitmap",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_pedantic_bitmap_caching = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_pedantic_bitmap_caching",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_pedantic_bitmap_caching = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_pedantic_bitmap_caching",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_pixel_snapping = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_pixel_snapping",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_pixel_snapping = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_pixel_snapping",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_visible = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_visible",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_visible = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_visible",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_filters = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_filters",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_global_to_local = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_global_to_local",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_local_to_global = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_local_to_global",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_scale9_grid = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_scale9_grid",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_scroll_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_scroll_rect",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_mask = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_mask",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_matrix = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_matrix",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_matrix = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_matrix",3);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_color_transform = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_color_transform",3);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_color_transform = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_color_transform",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_pixel_bounds = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_pixel_bounds",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_bounds = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_bounds",4);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_hit_test_point = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_hit_test_point",5);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_get_hit_enabled = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_get_hit_enabled",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_set_hit_enabled = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_set_hit_enabled",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_doc_add_child = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_add_child",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_encode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_encode",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObject.nme_display_object_decode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_display_object_decode",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.PNG = "png";
nme.display.BitmapData.JPG = "jpg";
nme.display.BitmapData.TRANSPARENT = 1;
nme.display.BitmapData.HARDWARE = 2;
nme.display.BitmapData.FLAG_NOREPEAT_NONPOT = 1;
nme.display.BitmapData.FLAG_FIXED_FORMAT = 2;
nme.display.BitmapData.FLAG_MIPMAPS = 4;
nme.display.BitmapData.CHANNEL_RED = 1;
nme.display.BitmapData.CHANNEL_GREEN = 2;
nme.display.BitmapData.CHANNEL_BLUE = 4;
nme.display.BitmapData.CHANNEL_ALPHA = 8;
nme.display.BitmapData.FLOAT_UNSCALED = 0;
nme.display.BitmapData.FLOAT_ZERO_MEAN = 1;
nme.display.BitmapData.FLOAT_128_MEAN = 2;
nme.display.BitmapData.FLOAT_UNIT_SCALE = 4;
nme.display.BitmapData.FLOAT_STD_SCALE = 8;
nme.display.BitmapData.FLOAT_SWIZZLE_RGB = 16;
nme.display.BitmapData.FLOAT_100_SCALE = 32;
nme.display.BitmapData.FLOAT_NORM = 9;
nme.display.BitmapData.FLOAT_EXPAND = 6;
nme.display.BitmapData.CLEAR = (function($this) {
	var $r;
	var inAlpha = 0;
	if(inAlpha == null) {
		inAlpha = 255;
	}
	$r = 0 | inAlpha << 24;
	return $r;
}(this));
nme.display.BitmapData.BLACK = -16777216;
nme.display.BitmapData.WHITE = -16777216;
nme.display.BitmapData.RED = -65536;
nme.display.BitmapData.GREEN = -16711936;
nme.display.BitmapData.BLUE = -16776961;
nme.display.BitmapData.defaultPremultiplied = true;
nme.display.BitmapData.defaultMipmaps = false;
nme.display.BitmapData.nme_bitmap_data_apply_filter = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_apply_filter",5);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_generate_filter_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_generate_filter_rect",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_create",5);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_load = nme.Loader.load("nme_bitmap_data_load",2);
nme.display.BitmapData.nme_bitmap_data_from_bytes = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_from_bytes",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_clear = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_clear",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_clone = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_clone",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_color_transform = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_color_transform",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_copy = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_copy",5);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_copy_channel = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_copy_channel",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_fill",4);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_pixels = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_pixels",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_pixel = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_pixel",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_pixel32 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_pixel32",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_color_bounds_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_color_bounds_rect",5);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_scroll = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_scroll",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_pixel = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_pixel",4);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_pixel32 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_pixel32",4);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_bytes = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_bytes",4);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_format",3);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_format",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_create_hardware_surface = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_create_hardware_surface",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_destroy_hardware_surface = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_destroy_hardware_surface",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_render_surface_to_surface = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_render_surface_to_surface",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_height = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_height",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_width = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_width",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_transparent = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_transparent",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_flags = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_flags",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_flags = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_flags",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_encode = nme.Loader.load("nme_bitmap_data_encode",3);
nme.display.BitmapData.nme_bitmap_data_dump_bits = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_dump_bits",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_dispose = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_dispose",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_noise = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_noise",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_flood_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_flood_fill",4);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_prem_alpha = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_prem_alpha",1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_prem_alpha = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_prem_alpha",2);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_floats32 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_floats32",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_floats32 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_floats32",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_get_uints8 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_get_uints8",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapData.nme_bitmap_data_set_uints8 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_bitmap_data_set_uints8",-1);
	$r = this1;
	return $r;
}(this));
nme.display.BitmapDataChannel.ALPHA = 8;
nme.display.BitmapDataChannel.BLUE = 4;
nme.display.BitmapDataChannel.GREEN = 2;
nme.display.BitmapDataChannel.RED = 1;
nme.display.DirectRenderer.nme_direct_renderer_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_direct_renderer_create",0);
	$r = this1;
	return $r;
}(this));
nme.display.DirectRenderer.nme_direct_renderer_set = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_direct_renderer_set",2);
	$r = this1;
	return $r;
}(this));
nme.display.InteractiveObject.nme_display_object_set_mouse_enabled = nme.Loader.load("nme_display_object_set_mouse_enabled",2);
nme.display.InteractiveObject.nme_display_object_set_needs_soft_keyboard = nme.Loader.load("nme_display_object_set_needs_soft_keyboard",2);
nme.display.InteractiveObject.nme_display_object_get_needs_soft_keyboard = nme.Loader.load("nme_display_object_get_needs_soft_keyboard",1);
nme.display.InteractiveObject.nme_display_object_set_moves_for_soft_keyboard = nme.Loader.load("nme_display_object_set_moves_for_soft_keyboard",2);
nme.display.InteractiveObject.nme_display_object_get_moves_for_soft_keyboard = nme.Loader.load("nme_display_object_get_moves_for_soft_keyboard",1);
nme.display.InteractiveObject.nme_display_object_request_soft_keyboard = nme.Loader.load("nme_display_object_request_soft_keyboard",1);
nme.display.InteractiveObject.nme_display_object_set_soft_keyboard = nme.Loader.load("nme_display_object_set_soft_keyboard",2);
nme.display.InteractiveObject.nme_display_object_get_soft_keyboard = nme.Loader.load("nme_display_object_get_soft_keyboard",1);
nme.display.DisplayObjectContainer.nme_create_display_object_container = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_create_display_object_container",0);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_add_child = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_add_child",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_remove_child = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_remove_child",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_set_child_index = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_set_child_index",3);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_get_mouse_children = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_get_mouse_children",1);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_set_mouse_children = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_set_mouse_children",2);
	$r = this1;
	return $r;
}(this));
nme.display.DisplayObjectContainer.nme_doc_swap_children = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_doc_swap_children",3);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_create",0);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_text = nme.Loader.load("nme_text_field_get_text",1);
nme.text.TextField.nme_text_field_set_text = nme.Loader.load("nme_text_field_set_text",2);
nme.text.TextField.nme_text_field_get_html_text = nme.Loader.load("nme_text_field_get_html_text",1);
nme.text.TextField.nme_text_field_set_html_text = nme.Loader.load("nme_text_field_set_html_text",2);
nme.text.TextField.nme_text_field_get_text_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_text_color",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_text_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_text_color",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_selectable = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_selectable",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_selectable = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_selectable",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_display_as_password = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_display_as_password",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_display_as_password = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_display_as_password",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_def_text_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_def_text_format",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_def_text_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_def_text_format",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_auto_size = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_auto_size",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_auto_size = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_auto_size",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_type = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_type",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_type = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_type",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_multiline = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_multiline",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_multiline = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_multiline",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_word_wrap = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_word_wrap",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_word_wrap = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_word_wrap",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_border = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_border",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_border = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_border",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_border_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_border_color",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_border_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_border_color",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_background = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_background",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_background = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_background",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_background_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_background_color",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_background_color = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_background_color",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_text_width = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_text_width",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_text_height = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_text_height",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_text_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_text_format",4);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_text_format = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_text_format",4);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_max_scroll_v = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_max_scroll_v",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_max_scroll_h = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_max_scroll_h",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_bottom_scroll_v = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_bottom_scroll_v",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_scroll_h = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_scroll_h",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_scroll_h = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_scroll_h",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_scroll_v = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_scroll_v",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_scroll_v = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_scroll_v",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_num_lines = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_num_lines",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_max_chars = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_max_chars",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_max_chars = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_max_chars",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_line_text = nme.Loader.load("nme_text_field_get_line_text",2);
nme.text.TextField.nme_text_field_get_line_metrics = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_line_metrics",3);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_line_offset = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_line_offset",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_embed_fonts = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_embed_fonts",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_embed_fonts = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_embed_fonts",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_char_boundaries = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_char_boundaries",3);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_selection_begin_index = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_selection_begin_index",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_selection_end_index = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_selection_end_index",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_selection = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_selection",3);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_caret_index = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_caret_index",1);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_set_caret_index = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_set_caret_index",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_line_positions = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_line_positions",3);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_get_line_for_char = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_get_line_for_char",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_replace_selected_text = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_replace_selected_text",2);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_replace_text = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_replace_text",4);
	$r = this1;
	return $r;
}(this));
nme.text.TextField.nme_text_field_send_key = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_text_field_send_key",4);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.TILE_SCALE = 1;
nme.display.Graphics.TILE_ROTATION = 2;
nme.display.Graphics.TILE_RGB = 4;
nme.display.Graphics.TILE_ALPHA = 8;
nme.display.Graphics.TILE_TRANS_2x2 = 16;
nme.display.Graphics.TILE_RECT = 32;
nme.display.Graphics.TILE_ORIGIN = 64;
nme.display.Graphics.TILE_NO_ID = 128;
nme.display.Graphics.TILE_MOUSE_ENABLE = 256;
nme.display.Graphics.TILE_FIXED_SIZE = 512;
nme.display.Graphics.TILE_SMOOTH = 4096;
nme.display.Graphics.TILE_BLEND_NORMAL = 0;
nme.display.Graphics.TILE_BLEND_ADD = 65536;
nme.display.Graphics.nme_gfx_clear = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_clear",1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_begin_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_begin_fill",3);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_begin_bitmap_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_begin_bitmap_fill",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_line_bitmap_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_line_bitmap_fill",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_begin_set_gradient_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_begin_set_gradient_fill",-1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_end_fill = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_end_fill",1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_line_style = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_line_style",-1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_move_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_move_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_line_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_line_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_curve_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_curve_to",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_cubic_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_cubic_to",-1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_arc_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_arc_to",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_ellipse = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_ellipse",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_data = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_data",2);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_datum = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_datum",2);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_rect",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_path = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_path",4);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_tiles = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_tiles",5);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_points = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_points",-1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_round_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_round_rect",-1);
	$r = this1;
	return $r;
}(this));
nme.display.Graphics.nme_gfx_draw_triangles = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_gfx_draw_triangles",-1);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsBitmapFill.nme_graphics_solid_fill_create = nme.Loader.load("nme_graphics_solid_fill_create",2);
nme.display.GraphicsEndFill.nme_graphics_end_fill_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_end_fill_create",0);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsGradientFill.nme_graphics_solid_fill_create = nme.Loader.load("nme_graphics_solid_fill_create",2);
nme.display.GraphicsPath.nme_graphics_path_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_create",3);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_curve_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_curve_to",5);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_cubic_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_cubic_to",-1);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_line_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_line_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_move_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_move_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_wline_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_wline_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_wmove_to = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_wmove_to",3);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_get_commands = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_get_commands",2);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_set_commands = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_set_commands",2);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_get_data = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_get_data",2);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPath.nme_graphics_path_set_data = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_path_set_data",2);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsPathCommand.NO_OP = 0;
nme.display.GraphicsPathCommand.MOVE_TO = 1;
nme.display.GraphicsPathCommand.LINE_TO = 2;
nme.display.GraphicsPathCommand.CURVE_TO = 3;
nme.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
nme.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
nme.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
nme.display.GraphicsPathWinding.EVEN_ODD = "evenOdd";
nme.display.GraphicsPathWinding.NON_ZERO = "nonZero";
nme.display.GraphicsSolidFill.nme_graphics_solid_fill_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_solid_fill_create",2);
	$r = this1;
	return $r;
}(this));
nme.display.GraphicsStroke.nme_graphics_stroke_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_graphics_stroke_create",-1);
	$r = this1;
	return $r;
}(this));
nme.net.URLLoader.activeLoaders = new haxe.ds.List();
nme.net.URLLoader.urlInvalid = 0;
nme.net.URLLoader.urlInit = 1;
nme.net.URLLoader.urlLoading = 2;
nme.net.URLLoader.urlComplete = 3;
nme.net.URLLoader.urlError = 4;
nme.net.URLLoader.nme_curl_create = nme.Loader.load("nme_curl_create",1);
nme.net.URLLoader.nme_curl_process_loaders = nme.Loader.load("nme_curl_process_loaders",0);
nme.net.URLLoader.nme_curl_update_loader = nme.Loader.load("nme_curl_update_loader",2);
nme.net.URLLoader.nme_curl_get_code = nme.Loader.load("nme_curl_get_code",1);
nme.net.URLLoader.nme_curl_get_error_message = nme.Loader.load("nme_curl_get_error_message",1);
nme.net.URLLoader.nme_curl_get_data = nme.Loader.load("nme_curl_get_data",1);
nme.net.URLLoader.nme_curl_get_cookies = nme.Loader.load("nme_curl_get_cookies",1);
nme.net.URLLoader.nme_curl_get_headers = nme.Loader.load("nme_curl_get_headers",1);
nme.net.URLLoader.nme_curl_initialize = nme.Loader.load("nme_curl_initialize",1);
nme.display.Stage.nmeEarlyWakeup = 0.005;
nme.display.Stage.OrientationPortrait = 1;
nme.display.Stage.OrientationPortraitUpsideDown = 2;
nme.display.Stage.OrientationLandscapeRight = 3;
nme.display.Stage.OrientationLandscapeLeft = 4;
nme.display.Stage.OrientationFaceUp = 5;
nme.display.Stage.OrientationFaceDown = 6;
nme.display.Stage.OrientationPortraitAny = 7;
nme.display.Stage.OrientationLandscapeAny = 8;
nme.display.Stage.OrientationAny = 9;
nme.display.Stage.OrientationUseFunction = -1;
nme.display.Stage.firstStage = true;
nme.display.Stage.efLeftDown = 1;
nme.display.Stage.efShiftDown = 2;
nme.display.Stage.efCtrlDown = 4;
nme.display.Stage.efAltDown = 8;
nme.display.Stage.efCommandDown = 16;
nme.display.Stage.efLocationRight = 16384;
nme.display.Stage.efNoNativeClick = 65536;
nme.display.Stage.nmeMouseChanges = ["mouseOut","mouseOver","rollOut","rollOver"];
nme.display.Stage.nmeTouchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
nme.display.Stage.sClickEvents = ["click","middleClick","rightClick"];
nme.display.Stage.sDownEvents = ["mouseDown","middleMouseDown","rightMouseDown"];
nme.display.Stage.sUpEvents = ["mouseUp","middleMouseUp","rightMouseUp"];
nme.display.Stage.nmeQuitting = false;
nme.display.Stage.nme_render_stage = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_render_stage",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_set_render_gc_free = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_set_render_gc_free",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_focus_id = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_focus_id",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_set_focus = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_focus",2);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_focus_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_focus_rect",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_set_focus_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_focus_rect",2);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_resize_window = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_resize_window",3);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_show_cursor = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_show_cursor",2);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_capture_mouse = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_capture_mouse",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_set_capture_mouse = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_capture_mouse",2);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_orientation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_orientation",0);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_normal_orientation = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_normal_orientation",0);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_check_cache = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_check_cache",1);
	$r = this1;
	return $r;
}(this));
nme.display.Stage.nme_stage_get_safe_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_safe_rect",2);
	$r = this1;
	return $r;
}(this));
nme.display.ManagedStage.etUnknown = 0;
nme.display.ManagedStage.etKeyDown = 1;
nme.display.ManagedStage.etChar = 2;
nme.display.ManagedStage.etKeyUp = 3;
nme.display.ManagedStage.etMouseMove = 4;
nme.display.ManagedStage.etMouseDown = 5;
nme.display.ManagedStage.etMouseClick = 6;
nme.display.ManagedStage.etMouseUp = 7;
nme.display.ManagedStage.etResize = 8;
nme.display.ManagedStage.etPoll = 9;
nme.display.ManagedStage.etQuit = 10;
nme.display.ManagedStage.etFocus = 11;
nme.display.ManagedStage.etShouldRotate = 12;
nme.display.ManagedStage.etDestroyHandler = 13;
nme.display.ManagedStage.etRedraw = 14;
nme.display.ManagedStage.etTouchBegin = 15;
nme.display.ManagedStage.etTouchMove = 16;
nme.display.ManagedStage.etTouchEnd = 17;
nme.display.ManagedStage.etTouchTap = 18;
nme.display.ManagedStage.etChange = 19;
nme.display.ManagedStage.efLeftDown = 1;
nme.display.ManagedStage.efShiftDown = 2;
nme.display.ManagedStage.efCtrlDown = 4;
nme.display.ManagedStage.efAltDown = 8;
nme.display.ManagedStage.efCommandDown = 16;
nme.display.ManagedStage.efMiddleDown = 32;
nme.display.ManagedStage.efRightDown = 64;
nme.display.ManagedStage.efLocationRight = 16384;
nme.display.ManagedStage.efPrimaryTouch = 32768;
nme.display.ManagedStage.nme_managed_stage_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_managed_stage_create",3);
	$r = this1;
	return $r;
}(this));
nme.display.ManagedStage.nme_managed_stage_pump_event = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_managed_stage_pump_event",2);
	$r = this1;
	return $r;
}(this));
nme.display.ManagedStage.nme_init_sdl_audio = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_init_sdl_audio",0);
	$r = this1;
	return $r;
}(this));
nme.display.OpenGLView.CONTEXT_LOST = "glcontextlost";
nme.display.OpenGLView.CONTEXT_RESTORED = "glcontextrestored";
nme.display.SimpleButton.nme_simple_button_set_state = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_set_state",3);
	$r = this1;
	return $r;
}(this));
nme.display.SimpleButton.nme_simple_button_get_enabled = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_get_enabled",1);
	$r = this1;
	return $r;
}(this));
nme.display.SimpleButton.nme_simple_button_set_enabled = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_set_enabled",2);
	$r = this1;
	return $r;
}(this));
nme.display.SimpleButton.nme_simple_button_get_hand_cursor = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_get_hand_cursor",1);
	$r = this1;
	return $r;
}(this));
nme.display.SimpleButton.nme_simple_button_set_hand_cursor = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_set_hand_cursor",2);
	$r = this1;
	return $r;
}(this));
nme.display.SimpleButton.nme_simple_button_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_simple_button_create",0);
	$r = this1;
	return $r;
}(this));
nme.display.Tilemap.DIRTY_BASE = 1;
nme.display.Tilesheet.TILE_SCALE = 1;
nme.display.Tilesheet.TILE_ROTATION = 2;
nme.display.Tilesheet.TILE_RGB = 4;
nme.display.Tilesheet.TILE_ALPHA = 8;
nme.display.Tilesheet.TILE_TRANS_2x2 = 16;
nme.display.Tilesheet.TILE_RECT = 32;
nme.display.Tilesheet.TILE_ORIGIN = 64;
nme.display.Tilesheet.TILE_NO_ID = 128;
nme.display.Tilesheet.TILE_MOUSE_ENABLE = 256;
nme.display.Tilesheet.TILE_FIXED_SIZE = 512;
nme.display.Tilesheet.TILE_BLEND_NORMAL = 0;
nme.display.Tilesheet.TILE_BLEND_ADD = 65536;
nme.display.Tilesheet.TILE_BLEND_SCREEN = 0;
nme.display.Tilesheet.TILE_BLEND_MULTIPLY = 0;
nme.display.Tilesheet.TILE_BLEND_SUBTRACT = 0;
nme.display.Tilesheet.nme_tilesheet_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_tilesheet_create",1);
	$r = this1;
	return $r;
}(this));
nme.display.Tilesheet.nme_tilesheet_add_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_tilesheet_add_rect",3);
	$r = this1;
	return $r;
}(this));
nme.display.Tilesheet.nme_tilesheet_get_rect = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_tilesheet_get_rect",3);
	$r = this1;
	return $r;
}(this));
nme.events.Event.ACTIVATE = "activate";
nme.events.Event.ADDED = "added";
nme.events.Event.ADDED_TO_STAGE = "addedToStage";
nme.events.Event.CANCEL = "cancel";
nme.events.Event.CHANGE = "change";
nme.events.Event.BEFORE_CLOSE = "beforeClose";
nme.events.Event.CLOSE = "close";
nme.events.Event.COMPLETE = "complete";
nme.events.Event.CONNECT = "connect";
nme.events.Event.CONTEXT3D_CREATE = "context3DCreate";
nme.events.Event.CONTEXT3D_LOST = "context3DLost";
nme.events.Event.DEACTIVATE = "deactivate";
nme.events.Event.ENTER_FRAME = "enterFrame";
nme.events.Event.ID3 = "id3";
nme.events.Event.INIT = "init";
nme.events.Event.MOUSE_ENTER = "mouseEnter";
nme.events.Event.MOUSE_LEAVE = "mouseLeave";
nme.events.Event.OPEN = "open";
nme.events.Event.REMOVED = "removed";
nme.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
nme.events.Event.RENDER = "render";
nme.events.Event.RESIZE = "resize";
nme.events.Event.SCROLL = "scroll";
nme.events.Event.SELECT = "select";
nme.events.Event.SOUND_COMPLETE = "soundComplete";
nme.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
nme.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
nme.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
nme.events.Event.UNLOAD = "unload";
nme.events.Event.VIDEO_FRAME = "videoFrame";
nme.events.Event.DPI_CHANGED = "dpiChanged";
nme.events.Event.DROP_FILES = "dropFiles";
nme.events.AppLinkEvent.APP_LINK = "appLink";
nme.events.TextEvent.LINK = "link";
nme.events.TextEvent.TEXT_INPUT = "textInput";
nme.events.ErrorEvent.ERROR = "error";
nme.events.AsyncErrorEvent.ASYNC_ERROR = "asyncError";
nme.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
nme.events.MouseEvent.CLICK = "click";
nme.events.MouseEvent.MIDDLE_CLICK = "middleClick";
nme.events.MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown";
nme.events.MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp";
nme.events.MouseEvent.MOUSE_DOWN = "mouseDown";
nme.events.MouseEvent.MOUSE_MOVE = "mouseMove";
nme.events.MouseEvent.MOUSE_OUT = "mouseOut";
nme.events.MouseEvent.MOUSE_OVER = "mouseOver";
nme.events.MouseEvent.MOUSE_UP = "mouseUp";
nme.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
nme.events.MouseEvent.RIGHT_CLICK = "rightClick";
nme.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
nme.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
nme.events.MouseEvent.ROLL_OUT = "rollOut";
nme.events.MouseEvent.ROLL_OVER = "rollOver";
nme.events.MouseEvent.efLeftDown = 1;
nme.events.MouseEvent.efShiftDown = 2;
nme.events.MouseEvent.efCtrlDown = 4;
nme.events.MouseEvent.efAltDown = 8;
nme.events.MouseEvent.efCommandDown = 16;
nme.events.DropEvent.DROP_FILES = "dropFiles";
nme.events.Listener.sIDs = 1;
nme.events.EventPhase.CAPTURING_PHASE = 0;
nme.events.EventPhase.AT_TARGET = 1;
nme.events.EventPhase.BUBBLING_PHASE = 2;
nme.events.FocusEvent.FOCUS_IN = "focusIn";
nme.events.FocusEvent.FOCUS_OUT = "focusOut";
nme.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
nme.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
nme.events.GameInputEvent.DEVICE_ADDED = "deviceAdded";
nme.events.GameInputEvent.DEVICE_REMOVED = "deviceRemoved";
nme.events.GameInputEvent.DEVICE_UNUSABLE = "deviceUnusable";
nme.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
nme.events.IOErrorEvent.IO_ERROR = "ioError";
nme.events.JoystickEvent.AXIS_MOVE = "axisMove";
nme.events.JoystickEvent.BALL_MOVE = "ballMove";
nme.events.JoystickEvent.BUTTON_DOWN = "buttonDown";
nme.events.JoystickEvent.BUTTON_UP = "buttonUp";
nme.events.JoystickEvent.HAT_MOVE = "hatMove";
nme.events.JoystickEvent.DEVICE_ADDED = "deviceAdded";
nme.events.JoystickEvent.DEVICE_REMOVED = "deviceRemoved";
nme.events.KeyboardEvent.KEY_DOWN = "keyDown";
nme.events.KeyboardEvent.KEY_UP = "keyUp";
nme.events.MoveEvent.WINDOW_MOVED = "windowMoved";
nme.events.NetStatusEvent.NET_STATUS = "netStatus";
nme.events.ProgressEvent.PROGRESS = "progress";
nme.events.ProgressEvent.SOCKET_DATA = "socketData";
nme.events.SampleDataEvent.SAMPLE_DATA = "sampleData";
nme.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
nme.events.StageVideoAvailabilityEvent.STAGE_VIDEO_AVAILABILITY = "stageVideoAvailability";
nme.events.StageVideoEvent.RENDER_STATE = "renderState";
nme.events.StageVideoEvent.RENDER_STATUS_ACCELERATED = "accelerated";
nme.events.StageVideoEvent.RENDER_STATUS_SOFTWARE = "software";
nme.events.StageVideoEvent.RENDER_STATUS_UNAVAILABLE = "unavailable";
nme.events.StatusEvent.STATUS = "status";
nme.events.StatusEvent.WARNING = "warning";
nme.events.StatusEvent.ERROR = "error";
nme.events.SystemEvent.SYSTEM = "system";
nme.events.TimerEvent.TIMER = "timer";
nme.events.TimerEvent.TIMER_COMPLETE = "timerComplete";
nme.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
nme.events.TouchEvent.TOUCH_END = "touchEnd";
nme.events.TouchEvent.TOUCH_MOVE = "touchMove";
nme.events.TouchEvent.TOUCH_OUT = "touchOut";
nme.events.TouchEvent.TOUCH_OVER = "touchOver";
nme.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
nme.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
nme.events.TouchEvent.TOUCH_TAP = "touchTap";
nme.external.ExternalInterface.callbacks = new haxe.ds.StringMap();
nme.external.ExternalInterface.nme_external_interface_add_callback = nme.Loader.load("nme_external_interface_add_callback",2);
nme.external.ExternalInterface.nme_external_interface_available = nme.Loader.load("nme_external_interface_available",0);
nme.external.ExternalInterface.nme_external_interface_call = nme.Loader.load("nme_external_interface_call",2);
nme.external.ExternalInterface.nme_external_interface_register_callbacks = nme.Loader.load("nme_external_interface_register_callbacks",0);
nme.filesystem.File.APP = 0;
nme.filesystem.File.STORAGE = 1;
nme.filesystem.File.DESKTOP = 2;
nme.filesystem.File.DOCS = 3;
nme.filesystem.File.USER = 4;
nme.filesystem.File.nme_filesystem_get_special_dir = nme.Loader.load("nme_filesystem_get_special_dir",1);
nme.filesystem.StorageVolumeInfo.isSupported = true;
nme.filesystem.StorageVolumeInfo.nme_filesystem_get_volumes = nme.Loader.load("nme_filesystem_get_volumes",2);
nme.filters.BitmapFilterQuality.HIGH = 3;
nme.filters.BitmapFilterQuality.MEDIUM = 2;
nme.filters.BitmapFilterQuality.LOW = 1;
nme.filters.BitmapFilterType.FULL = "full";
nme.filters.BitmapFilterType.INNER = "inner";
nme.filters.BitmapFilterType.OUTER = "outer";
nme.gl.GL.DEPTH_BUFFER_BIT = 256;
nme.gl.GL.STENCIL_BUFFER_BIT = 1024;
nme.gl.GL.COLOR_BUFFER_BIT = 16384;
nme.gl.GL.POINTS = 0;
nme.gl.GL.LINES = 1;
nme.gl.GL.LINE_LOOP = 2;
nme.gl.GL.LINE_STRIP = 3;
nme.gl.GL.TRIANGLES = 4;
nme.gl.GL.TRIANGLE_STRIP = 5;
nme.gl.GL.TRIANGLE_FAN = 6;
nme.gl.GL.ZERO = 0;
nme.gl.GL.ONE = 1;
nme.gl.GL.SRC_COLOR = 768;
nme.gl.GL.ONE_MINUS_SRC_COLOR = 769;
nme.gl.GL.SRC_ALPHA = 770;
nme.gl.GL.ONE_MINUS_SRC_ALPHA = 771;
nme.gl.GL.DST_ALPHA = 772;
nme.gl.GL.ONE_MINUS_DST_ALPHA = 773;
nme.gl.GL.DST_COLOR = 774;
nme.gl.GL.ONE_MINUS_DST_COLOR = 775;
nme.gl.GL.SRC_ALPHA_SATURATE = 776;
nme.gl.GL.FUNC_ADD = 32774;
nme.gl.GL.BLEND_EQUATION = 32777;
nme.gl.GL.BLEND_EQUATION_RGB = 32777;
nme.gl.GL.BLEND_EQUATION_ALPHA = 34877;
nme.gl.GL.FUNC_SUBTRACT = 32778;
nme.gl.GL.FUNC_REVERSE_SUBTRACT = 32779;
nme.gl.GL.BLEND_DST_RGB = 32968;
nme.gl.GL.BLEND_SRC_RGB = 32969;
nme.gl.GL.BLEND_DST_ALPHA = 32970;
nme.gl.GL.BLEND_SRC_ALPHA = 32971;
nme.gl.GL.CONSTANT_COLOR = 32769;
nme.gl.GL.ONE_MINUS_CONSTANT_COLOR = 32770;
nme.gl.GL.CONSTANT_ALPHA = 32771;
nme.gl.GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
nme.gl.GL.BLEND_COLOR = 32773;
nme.gl.GL.ARRAY_BUFFER = 34962;
nme.gl.GL.ELEMENT_ARRAY_BUFFER = 34963;
nme.gl.GL.ARRAY_BUFFER_BINDING = 34964;
nme.gl.GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
nme.gl.GL.STREAM_DRAW = 35040;
nme.gl.GL.STATIC_DRAW = 35044;
nme.gl.GL.DYNAMIC_DRAW = 35048;
nme.gl.GL.BUFFER_SIZE = 34660;
nme.gl.GL.BUFFER_USAGE = 34661;
nme.gl.GL.CURRENT_VERTEX_ATTRIB = 34342;
nme.gl.GL.FRONT = 1028;
nme.gl.GL.BACK = 1029;
nme.gl.GL.FRONT_AND_BACK = 1032;
nme.gl.GL.CULL_FACE = 2884;
nme.gl.GL.BLEND = 3042;
nme.gl.GL.DITHER = 3024;
nme.gl.GL.STENCIL_TEST = 2960;
nme.gl.GL.DEPTH_TEST = 2929;
nme.gl.GL.SCISSOR_TEST = 3089;
nme.gl.GL.POLYGON_OFFSET_FILL = 32823;
nme.gl.GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
nme.gl.GL.SAMPLE_COVERAGE = 32928;
nme.gl.GL.NO_ERROR = 0;
nme.gl.GL.INVALID_ENUM = 1280;
nme.gl.GL.INVALID_VALUE = 1281;
nme.gl.GL.INVALID_OPERATION = 1282;
nme.gl.GL.OUT_OF_MEMORY = 1285;
nme.gl.GL.CW = 2304;
nme.gl.GL.CCW = 2305;
nme.gl.GL.LINE_WIDTH = 2849;
nme.gl.GL.ALIASED_POINT_SIZE_RANGE = 33901;
nme.gl.GL.ALIASED_LINE_WIDTH_RANGE = 33902;
nme.gl.GL.CULL_FACE_MODE = 2885;
nme.gl.GL.FRONT_FACE = 2886;
nme.gl.GL.DEPTH_RANGE = 2928;
nme.gl.GL.DEPTH_WRITEMASK = 2930;
nme.gl.GL.DEPTH_CLEAR_VALUE = 2931;
nme.gl.GL.DEPTH_FUNC = 2932;
nme.gl.GL.STENCIL_CLEAR_VALUE = 2961;
nme.gl.GL.STENCIL_FUNC = 2962;
nme.gl.GL.STENCIL_FAIL = 2964;
nme.gl.GL.STENCIL_PASS_DEPTH_FAIL = 2965;
nme.gl.GL.STENCIL_PASS_DEPTH_PASS = 2966;
nme.gl.GL.STENCIL_REF = 2967;
nme.gl.GL.STENCIL_VALUE_MASK = 2963;
nme.gl.GL.STENCIL_WRITEMASK = 2968;
nme.gl.GL.STENCIL_BACK_FUNC = 34816;
nme.gl.GL.STENCIL_BACK_FAIL = 34817;
nme.gl.GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
nme.gl.GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
nme.gl.GL.STENCIL_BACK_REF = 36003;
nme.gl.GL.STENCIL_BACK_VALUE_MASK = 36004;
nme.gl.GL.STENCIL_BACK_WRITEMASK = 36005;
nme.gl.GL.VIEWPORT = 2978;
nme.gl.GL.SCISSOR_BOX = 3088;
nme.gl.GL.COLOR_CLEAR_VALUE = 3106;
nme.gl.GL.COLOR_WRITEMASK = 3107;
nme.gl.GL.UNPACK_ALIGNMENT = 3317;
nme.gl.GL.PACK_ALIGNMENT = 3333;
nme.gl.GL.MAX_TEXTURE_SIZE = 3379;
nme.gl.GL.MAX_VIEWPORT_DIMS = 3386;
nme.gl.GL.SUBPIXEL_BITS = 3408;
nme.gl.GL.RED_BITS = 3410;
nme.gl.GL.GREEN_BITS = 3411;
nme.gl.GL.BLUE_BITS = 3412;
nme.gl.GL.ALPHA_BITS = 3413;
nme.gl.GL.DEPTH_BITS = 3414;
nme.gl.GL.STENCIL_BITS = 3415;
nme.gl.GL.POLYGON_OFFSET_UNITS = 10752;
nme.gl.GL.POLYGON_OFFSET_POINT = 10753;
nme.gl.GL.POLYGON_OFFSET_LINE = 10754;
nme.gl.GL.POLYGON_OFFSET_FACTOR = 32824;
nme.gl.GL.TEXTURE_BINDING_2D = 32873;
nme.gl.GL.SAMPLE_BUFFERS = 32936;
nme.gl.GL.SAMPLES = 32937;
nme.gl.GL.SAMPLE_COVERAGE_VALUE = 32938;
nme.gl.GL.SAMPLE_COVERAGE_INVERT = 32939;
nme.gl.GL.COMPRESSED_TEXTURE_FORMATS = 34467;
nme.gl.GL.DONT_CARE = 4352;
nme.gl.GL.FASTEST = 4353;
nme.gl.GL.NICEST = 4354;
nme.gl.GL.GENERATE_MIPMAP_HINT = 33170;
nme.gl.GL.BYTE = 5120;
nme.gl.GL.UNSIGNED_BYTE = 5121;
nme.gl.GL.SHORT = 5122;
nme.gl.GL.UNSIGNED_SHORT = 5123;
nme.gl.GL.INT = 5124;
nme.gl.GL.UNSIGNED_INT = 5125;
nme.gl.GL.FLOAT = 5126;
nme.gl.GL.DEPTH_COMPONENT = 6402;
nme.gl.GL.ALPHA = 6406;
nme.gl.GL.RGB = 6407;
nme.gl.GL.RGBA = 6408;
nme.gl.GL.LUMINANCE = 6409;
nme.gl.GL.LUMINANCE_ALPHA = 6410;
nme.gl.GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
nme.gl.GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
nme.gl.GL.UNSIGNED_SHORT_5_6_5 = 33635;
nme.gl.GL.FRAGMENT_SHADER = 35632;
nme.gl.GL.VERTEX_SHADER = 35633;
nme.gl.GL.MAX_VERTEX_ATTRIBS = 34921;
nme.gl.GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
nme.gl.GL.MAX_VARYING_VECTORS = 36348;
nme.gl.GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
nme.gl.GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
nme.gl.GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
nme.gl.GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
nme.gl.GL.SHADER_TYPE = 35663;
nme.gl.GL.DELETE_STATUS = 35712;
nme.gl.GL.LINK_STATUS = 35714;
nme.gl.GL.VALIDATE_STATUS = 35715;
nme.gl.GL.ATTACHED_SHADERS = 35717;
nme.gl.GL.ACTIVE_UNIFORMS = 35718;
nme.gl.GL.ACTIVE_ATTRIBUTES = 35721;
nme.gl.GL.SHADING_LANGUAGE_VERSION = 35724;
nme.gl.GL.CURRENT_PROGRAM = 35725;
nme.gl.GL.NEVER = 512;
nme.gl.GL.LESS = 513;
nme.gl.GL.EQUAL = 514;
nme.gl.GL.LEQUAL = 515;
nme.gl.GL.GREATER = 516;
nme.gl.GL.NOTEQUAL = 517;
nme.gl.GL.GEQUAL = 518;
nme.gl.GL.ALWAYS = 519;
nme.gl.GL.KEEP = 7680;
nme.gl.GL.REPLACE = 7681;
nme.gl.GL.INCR = 7682;
nme.gl.GL.DECR = 7683;
nme.gl.GL.INVERT = 5386;
nme.gl.GL.INCR_WRAP = 34055;
nme.gl.GL.DECR_WRAP = 34056;
nme.gl.GL.VENDOR = 7936;
nme.gl.GL.RENDERER = 7937;
nme.gl.GL.VERSION = 7938;
nme.gl.GL.NEAREST = 9728;
nme.gl.GL.LINEAR = 9729;
nme.gl.GL.NEAREST_MIPMAP_NEAREST = 9984;
nme.gl.GL.LINEAR_MIPMAP_NEAREST = 9985;
nme.gl.GL.NEAREST_MIPMAP_LINEAR = 9986;
nme.gl.GL.LINEAR_MIPMAP_LINEAR = 9987;
nme.gl.GL.TEXTURE_MAG_FILTER = 10240;
nme.gl.GL.TEXTURE_MIN_FILTER = 10241;
nme.gl.GL.TEXTURE_WRAP_S = 10242;
nme.gl.GL.TEXTURE_WRAP_T = 10243;
nme.gl.GL.TEXTURE_2D = 3553;
nme.gl.GL.TEXTURE = 5890;
nme.gl.GL.TEXTURE_CUBE_MAP = 34067;
nme.gl.GL.TEXTURE_BINDING_CUBE_MAP = 34068;
nme.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
nme.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
nme.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
nme.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
nme.gl.GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
nme.gl.GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
nme.gl.GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
nme.gl.GL.TEXTURE0 = 33984;
nme.gl.GL.TEXTURE1 = 33985;
nme.gl.GL.TEXTURE2 = 33986;
nme.gl.GL.TEXTURE3 = 33987;
nme.gl.GL.TEXTURE4 = 33988;
nme.gl.GL.TEXTURE5 = 33989;
nme.gl.GL.TEXTURE6 = 33990;
nme.gl.GL.TEXTURE7 = 33991;
nme.gl.GL.TEXTURE8 = 33992;
nme.gl.GL.TEXTURE9 = 33993;
nme.gl.GL.TEXTURE10 = 33994;
nme.gl.GL.TEXTURE11 = 33995;
nme.gl.GL.TEXTURE12 = 33996;
nme.gl.GL.TEXTURE13 = 33997;
nme.gl.GL.TEXTURE14 = 33998;
nme.gl.GL.TEXTURE15 = 33999;
nme.gl.GL.TEXTURE16 = 34000;
nme.gl.GL.TEXTURE17 = 34001;
nme.gl.GL.TEXTURE18 = 34002;
nme.gl.GL.TEXTURE19 = 34003;
nme.gl.GL.TEXTURE20 = 34004;
nme.gl.GL.TEXTURE21 = 34005;
nme.gl.GL.TEXTURE22 = 34006;
nme.gl.GL.TEXTURE23 = 34007;
nme.gl.GL.TEXTURE24 = 34008;
nme.gl.GL.TEXTURE25 = 34009;
nme.gl.GL.TEXTURE26 = 34010;
nme.gl.GL.TEXTURE27 = 34011;
nme.gl.GL.TEXTURE28 = 34012;
nme.gl.GL.TEXTURE29 = 34013;
nme.gl.GL.TEXTURE30 = 34014;
nme.gl.GL.TEXTURE31 = 34015;
nme.gl.GL.ACTIVE_TEXTURE = 34016;
nme.gl.GL.REPEAT = 10497;
nme.gl.GL.CLAMP_TO_EDGE = 33071;
nme.gl.GL.MIRRORED_REPEAT = 33648;
nme.gl.GL.FLOAT_VEC2 = 35664;
nme.gl.GL.FLOAT_VEC3 = 35665;
nme.gl.GL.FLOAT_VEC4 = 35666;
nme.gl.GL.INT_VEC2 = 35667;
nme.gl.GL.INT_VEC3 = 35668;
nme.gl.GL.INT_VEC4 = 35669;
nme.gl.GL.BOOL = 35670;
nme.gl.GL.BOOL_VEC2 = 35671;
nme.gl.GL.BOOL_VEC3 = 35672;
nme.gl.GL.BOOL_VEC4 = 35673;
nme.gl.GL.FLOAT_MAT2 = 35674;
nme.gl.GL.FLOAT_MAT3 = 35675;
nme.gl.GL.FLOAT_MAT4 = 35676;
nme.gl.GL.SAMPLER_2D = 35678;
nme.gl.GL.SAMPLER_CUBE = 35680;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
nme.gl.GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
nme.gl.GL.POINT_SPRITE = 34913;
nme.gl.GL.COMPILE_STATUS = 35713;
nme.gl.GL.LOW_FLOAT = 36336;
nme.gl.GL.MEDIUM_FLOAT = 36337;
nme.gl.GL.HIGH_FLOAT = 36338;
nme.gl.GL.LOW_INT = 36339;
nme.gl.GL.MEDIUM_INT = 36340;
nme.gl.GL.HIGH_INT = 36341;
nme.gl.GL.FRAMEBUFFER = 36160;
nme.gl.GL.RENDERBUFFER = 36161;
nme.gl.GL.RGBA4 = 32854;
nme.gl.GL.RGB5_A1 = 32855;
nme.gl.GL.RGB565 = 36194;
nme.gl.GL.DEPTH_COMPONENT16 = 33189;
nme.gl.GL.STENCIL_INDEX = 6401;
nme.gl.GL.STENCIL_INDEX8 = 36168;
nme.gl.GL.DEPTH_STENCIL = 34041;
nme.gl.GL.RENDERBUFFER_WIDTH = 36162;
nme.gl.GL.RENDERBUFFER_HEIGHT = 36163;
nme.gl.GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
nme.gl.GL.RENDERBUFFER_RED_SIZE = 36176;
nme.gl.GL.RENDERBUFFER_GREEN_SIZE = 36177;
nme.gl.GL.RENDERBUFFER_BLUE_SIZE = 36178;
nme.gl.GL.RENDERBUFFER_ALPHA_SIZE = 36179;
nme.gl.GL.RENDERBUFFER_DEPTH_SIZE = 36180;
nme.gl.GL.RENDERBUFFER_STENCIL_SIZE = 36181;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
nme.gl.GL.COLOR_ATTACHMENT0 = 36064;
nme.gl.GL.DEPTH_ATTACHMENT = 36096;
nme.gl.GL.STENCIL_ATTACHMENT = 36128;
nme.gl.GL.DEPTH_STENCIL_ATTACHMENT = 33306;
nme.gl.GL.NONE = 0;
nme.gl.GL.FRAMEBUFFER_COMPLETE = 36053;
nme.gl.GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
nme.gl.GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
nme.gl.GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
nme.gl.GL.FRAMEBUFFER_UNSUPPORTED = 36061;
nme.gl.GL.FRAMEBUFFER_BINDING = 36006;
nme.gl.GL.RENDERBUFFER_BINDING = 36007;
nme.gl.GL.MAX_RENDERBUFFER_SIZE = 34024;
nme.gl.GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
nme.gl.GL.UNPACK_FLIP_Y_WEBGL = 37440;
nme.gl.GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
nme.gl.GL.CONTEXT_LOST_WEBGL = 37442;
nme.gl.GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
nme.gl.GL.BROWSER_DEFAULT_WEBGL = 37444;
nme.gl.GL.READ_BUFFER = 3074;
nme.gl.GL.UNPACK_ROW_LENGTH = 3314;
nme.gl.GL.UNPACK_SKIP_ROWS = 3315;
nme.gl.GL.UNPACK_SKIP_PIXELS = 3316;
nme.gl.GL.PACK_ROW_LENGTH = 3330;
nme.gl.GL.PACK_SKIP_ROWS = 3331;
nme.gl.GL.PACK_SKIP_PIXELS = 3332;
nme.gl.GL.TEXTURE_BINDING_3D = 32874;
nme.gl.GL.UNPACK_SKIP_IMAGES = 32877;
nme.gl.GL.UNPACK_IMAGE_HEIGHT = 32878;
nme.gl.GL.MAX_3D_TEXTURE_SIZE = 32883;
nme.gl.GL.MAX_ELEMENTS_VERTICES = 33000;
nme.gl.GL.MAX_ELEMENTS_INDICES = 33001;
nme.gl.GL.MAX_TEXTURE_LOD_BIAS = 34045;
nme.gl.GL.MAX_FRAGMENT_UNIFORM_COMPONENTS = 35657;
nme.gl.GL.MAX_VERTEX_UNIFORM_COMPONENTS = 35658;
nme.gl.GL.MAX_ARRAY_TEXTURE_LAYERS = 35071;
nme.gl.GL.MIN_PROGRAM_TEXEL_OFFSET = 35076;
nme.gl.GL.MAX_PROGRAM_TEXEL_OFFSET = 35077;
nme.gl.GL.MAX_VARYING_COMPONENTS = 35659;
nme.gl.GL.FRAGMENT_SHADER_DERIVATIVE_HINT = 35723;
nme.gl.GL.RASTERIZER_DISCARD = 35977;
nme.gl.GL.VERTEX_ARRAY_BINDING = 34229;
nme.gl.GL.MAX_VERTEX_OUTPUT_COMPONENTS = 37154;
nme.gl.GL.MAX_FRAGMENT_INPUT_COMPONENTS = 37157;
nme.gl.GL.MAX_SERVER_WAIT_TIMEOUT = 37137;
nme.gl.GL.MAX_ELEMENT_INDEX = 36203;
nme.gl.GL.RED = 6403;
nme.gl.GL.RGB8 = 32849;
nme.gl.GL.RGBA8 = 32856;
nme.gl.GL.RGB10_A2 = 32857;
nme.gl.GL.TEXTURE_3D = 32879;
nme.gl.GL.TEXTURE_WRAP_R = 32882;
nme.gl.GL.TEXTURE_MIN_LOD = 33082;
nme.gl.GL.TEXTURE_MAX_LOD = 33083;
nme.gl.GL.TEXTURE_BASE_LEVEL = 33084;
nme.gl.GL.TEXTURE_MAX_LEVEL = 33085;
nme.gl.GL.TEXTURE_COMPARE_MODE = 34892;
nme.gl.GL.TEXTURE_COMPARE_FUNC = 34893;
nme.gl.GL.SRGB = 35904;
nme.gl.GL.SRGB8 = 35905;
nme.gl.GL.SRGB8_ALPHA8 = 35907;
nme.gl.GL.COMPARE_REF_TO_TEXTURE = 34894;
nme.gl.GL.RGBA32F = 34836;
nme.gl.GL.RGB32F = 34837;
nme.gl.GL.RGBA16F = 34842;
nme.gl.GL.RGB16F = 34843;
nme.gl.GL.TEXTURE_2D_ARRAY = 35866;
nme.gl.GL.TEXTURE_BINDING_2D_ARRAY = 35869;
nme.gl.GL.R11F_G11F_B10F = 35898;
nme.gl.GL.RGB9_E5 = 35901;
nme.gl.GL.RGBA32UI = 36208;
nme.gl.GL.RGB32UI = 36209;
nme.gl.GL.RGBA16UI = 36214;
nme.gl.GL.RGB16UI = 36215;
nme.gl.GL.RGBA8UI = 36220;
nme.gl.GL.RGB8UI = 36221;
nme.gl.GL.RGBA32I = 36226;
nme.gl.GL.RGB32I = 36227;
nme.gl.GL.RGBA16I = 36232;
nme.gl.GL.RGB16I = 36233;
nme.gl.GL.RGBA8I = 36238;
nme.gl.GL.RGB8I = 36239;
nme.gl.GL.RED_INTEGER = 36244;
nme.gl.GL.RGB_INTEGER = 36248;
nme.gl.GL.RGBA_INTEGER = 36249;
nme.gl.GL.R8 = 33321;
nme.gl.GL.RG8 = 33323;
nme.gl.GL.R16F = 33325;
nme.gl.GL.R32F = 33326;
nme.gl.GL.RG16F = 33327;
nme.gl.GL.RG32F = 33328;
nme.gl.GL.R8I = 33329;
nme.gl.GL.R8UI = 33330;
nme.gl.GL.R16I = 33331;
nme.gl.GL.R16UI = 33332;
nme.gl.GL.R32I = 33333;
nme.gl.GL.R32UI = 33334;
nme.gl.GL.RG8I = 33335;
nme.gl.GL.RG8UI = 33336;
nme.gl.GL.RG16I = 33337;
nme.gl.GL.RG16UI = 33338;
nme.gl.GL.RG32I = 33339;
nme.gl.GL.RG32UI = 33340;
nme.gl.GL.R8_SNORM = 36756;
nme.gl.GL.RG8_SNORM = 36757;
nme.gl.GL.RGB8_SNORM = 36758;
nme.gl.GL.RGBA8_SNORM = 36759;
nme.gl.GL.RGB10_A2UI = 36975;
nme.gl.GL.TEXTURE_IMMUTABLE_FORMAT = 37167;
nme.gl.GL.TEXTURE_IMMUTABLE_LEVELS = 33503;
nme.gl.GL.UNSIGNED_INT_2_10_10_10_REV = 33640;
nme.gl.GL.UNSIGNED_INT_10F_11F_11F_REV = 35899;
nme.gl.GL.UNSIGNED_INT_5_9_9_9_REV = 35902;
nme.gl.GL.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
nme.gl.GL.UNSIGNED_INT_24_8 = 34042;
nme.gl.GL.HALF_FLOAT = 5131;
nme.gl.GL.RG = 33319;
nme.gl.GL.RG_INTEGER = 33320;
nme.gl.GL.INT_2_10_10_10_REV = 36255;
nme.gl.GL.CURRENT_QUERY = 34917;
nme.gl.GL.QUERY_RESULT = 34918;
nme.gl.GL.QUERY_RESULT_AVAILABLE = 34919;
nme.gl.GL.ANY_SAMPLES_PASSED = 35887;
nme.gl.GL.ANY_SAMPLES_PASSED_CONSERVATIVE = 36202;
nme.gl.GL.MAX_DRAW_BUFFERS = 34852;
nme.gl.GL.DRAW_BUFFER0 = 34853;
nme.gl.GL.DRAW_BUFFER1 = 34854;
nme.gl.GL.DRAW_BUFFER2 = 34855;
nme.gl.GL.DRAW_BUFFER3 = 34856;
nme.gl.GL.DRAW_BUFFER4 = 34857;
nme.gl.GL.DRAW_BUFFER5 = 34858;
nme.gl.GL.DRAW_BUFFER6 = 34859;
nme.gl.GL.DRAW_BUFFER7 = 34860;
nme.gl.GL.DRAW_BUFFER8 = 34861;
nme.gl.GL.DRAW_BUFFER9 = 34862;
nme.gl.GL.DRAW_BUFFER10 = 34863;
nme.gl.GL.DRAW_BUFFER11 = 34864;
nme.gl.GL.DRAW_BUFFER12 = 34865;
nme.gl.GL.DRAW_BUFFER13 = 34866;
nme.gl.GL.DRAW_BUFFER14 = 34867;
nme.gl.GL.DRAW_BUFFER15 = 34868;
nme.gl.GL.MAX_COLOR_ATTACHMENTS = 36063;
nme.gl.GL.COLOR_ATTACHMENT1 = 36065;
nme.gl.GL.COLOR_ATTACHMENT2 = 36066;
nme.gl.GL.COLOR_ATTACHMENT3 = 36067;
nme.gl.GL.COLOR_ATTACHMENT4 = 36068;
nme.gl.GL.COLOR_ATTACHMENT5 = 36069;
nme.gl.GL.COLOR_ATTACHMENT6 = 36070;
nme.gl.GL.COLOR_ATTACHMENT7 = 36071;
nme.gl.GL.COLOR_ATTACHMENT8 = 36072;
nme.gl.GL.COLOR_ATTACHMENT9 = 36073;
nme.gl.GL.COLOR_ATTACHMENT10 = 36074;
nme.gl.GL.COLOR_ATTACHMENT11 = 36075;
nme.gl.GL.COLOR_ATTACHMENT12 = 36076;
nme.gl.GL.COLOR_ATTACHMENT13 = 36077;
nme.gl.GL.COLOR_ATTACHMENT14 = 36078;
nme.gl.GL.COLOR_ATTACHMENT15 = 36079;
nme.gl.GL.SAMPLER_3D = 35679;
nme.gl.GL.SAMPLER_2D_SHADOW = 35682;
nme.gl.GL.SAMPLER_2D_ARRAY = 36289;
nme.gl.GL.SAMPLER_2D_ARRAY_SHADOW = 36292;
nme.gl.GL.SAMPLER_CUBE_SHADOW = 36293;
nme.gl.GL.INT_SAMPLER_2D = 36298;
nme.gl.GL.INT_SAMPLER_3D = 36299;
nme.gl.GL.INT_SAMPLER_CUBE = 36300;
nme.gl.GL.INT_SAMPLER_2D_ARRAY = 36303;
nme.gl.GL.UNSIGNED_INT_SAMPLER_2D = 36306;
nme.gl.GL.UNSIGNED_INT_SAMPLER_3D = 36307;
nme.gl.GL.UNSIGNED_INT_SAMPLER_CUBE = 36308;
nme.gl.GL.UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
nme.gl.GL.MAX_SAMPLES = 36183;
nme.gl.GL.SAMPLER_BINDING = 35097;
nme.gl.GL.PIXEL_PACK_BUFFER = 35051;
nme.gl.GL.PIXEL_UNPACK_BUFFER = 35052;
nme.gl.GL.PIXEL_PACK_BUFFER_BINDING = 35053;
nme.gl.GL.PIXEL_UNPACK_BUFFER_BINDING = 35055;
nme.gl.GL.COPY_READ_BUFFER = 36662;
nme.gl.GL.COPY_WRITE_BUFFER = 36663;
nme.gl.GL.COPY_READ_BUFFER_BINDING = 36662;
nme.gl.GL.COPY_WRITE_BUFFER_BINDING = 36663;
nme.gl.GL.FLOAT_MAT2x3 = 35685;
nme.gl.GL.FLOAT_MAT2x4 = 35686;
nme.gl.GL.FLOAT_MAT3x2 = 35687;
nme.gl.GL.FLOAT_MAT3x4 = 35688;
nme.gl.GL.FLOAT_MAT4x2 = 35689;
nme.gl.GL.FLOAT_MAT4x3 = 35690;
nme.gl.GL.UNSIGNED_INT_VEC2 = 36294;
nme.gl.GL.UNSIGNED_INT_VEC3 = 36295;
nme.gl.GL.UNSIGNED_INT_VEC4 = 36296;
nme.gl.GL.UNSIGNED_NORMALIZED = 35863;
nme.gl.GL.SIGNED_NORMALIZED = 36764;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_INTEGER = 35069;
nme.gl.GL.VERTEX_ATTRIB_ARRAY_DIVISOR = 35070;
nme.gl.GL.TRANSFORM_FEEDBACK_BUFFER_MODE = 35967;
nme.gl.GL.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 35968;
nme.gl.GL.TRANSFORM_FEEDBACK_VARYINGS = 35971;
nme.gl.GL.TRANSFORM_FEEDBACK_BUFFER_START = 35972;
nme.gl.GL.TRANSFORM_FEEDBACK_BUFFER_SIZE = 35973;
nme.gl.GL.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 35976;
nme.gl.GL.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 35978;
nme.gl.GL.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 35979;
nme.gl.GL.INTERLEAVED_ATTRIBS = 35980;
nme.gl.GL.SEPARATE_ATTRIBS = 35981;
nme.gl.GL.TRANSFORM_FEEDBACK_BUFFER = 35982;
nme.gl.GL.TRANSFORM_FEEDBACK_BUFFER_BINDING = 35983;
nme.gl.GL.TRANSFORM_FEEDBACK = 36386;
nme.gl.GL.TRANSFORM_FEEDBACK_PAUSED = 36387;
nme.gl.GL.TRANSFORM_FEEDBACK_ACTIVE = 36388;
nme.gl.GL.TRANSFORM_FEEDBACK_BINDING = 36389;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 33296;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 33297;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_RED_SIZE = 33298;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 33299;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 33300;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 33301;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 33302;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 33303;
nme.gl.GL.FRAMEBUFFER_DEFAULT = 33304;
nme.gl.GL.DEPTH24_STENCIL8 = 35056;
nme.gl.GL.DRAW_FRAMEBUFFER_BINDING = 36006;
nme.gl.GL.READ_FRAMEBUFFER = 36008;
nme.gl.GL.DRAW_FRAMEBUFFER = 36009;
nme.gl.GL.READ_FRAMEBUFFER_BINDING = 36010;
nme.gl.GL.RENDERBUFFER_SAMPLES = 36011;
nme.gl.GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 36052;
nme.gl.GL.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 36182;
nme.gl.GL.UNIFORM_BUFFER = 35345;
nme.gl.GL.UNIFORM_BUFFER_BINDING = 35368;
nme.gl.GL.UNIFORM_BUFFER_START = 35369;
nme.gl.GL.UNIFORM_BUFFER_SIZE = 35370;
nme.gl.GL.MAX_VERTEX_UNIFORM_BLOCKS = 35371;
nme.gl.GL.MAX_FRAGMENT_UNIFORM_BLOCKS = 35373;
nme.gl.GL.MAX_COMBINED_UNIFORM_BLOCKS = 35374;
nme.gl.GL.MAX_UNIFORM_BUFFER_BINDINGS = 35375;
nme.gl.GL.MAX_UNIFORM_BLOCK_SIZE = 35376;
nme.gl.GL.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 35377;
nme.gl.GL.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 35379;
nme.gl.GL.UNIFORM_BUFFER_OFFSET_ALIGNMENT = 35380;
nme.gl.GL.ACTIVE_UNIFORM_BLOCKS = 35382;
nme.gl.GL.UNIFORM_TYPE = 35383;
nme.gl.GL.UNIFORM_SIZE = 35384;
nme.gl.GL.UNIFORM_BLOCK_INDEX = 35386;
nme.gl.GL.UNIFORM_OFFSET = 35387;
nme.gl.GL.UNIFORM_ARRAY_STRIDE = 35388;
nme.gl.GL.UNIFORM_MATRIX_STRIDE = 35389;
nme.gl.GL.UNIFORM_IS_ROW_MAJOR = 35390;
nme.gl.GL.UNIFORM_BLOCK_BINDING = 35391;
nme.gl.GL.UNIFORM_BLOCK_DATA_SIZE = 35392;
nme.gl.GL.UNIFORM_BLOCK_ACTIVE_UNIFORMS = 35394;
nme.gl.GL.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
nme.gl.GL.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
nme.gl.GL.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
nme.gl.GL.OBJECT_TYPE = 37138;
nme.gl.GL.SYNC_CONDITION = 37139;
nme.gl.GL.SYNC_STATUS = 37140;
nme.gl.GL.SYNC_FLAGS = 37141;
nme.gl.GL.SYNC_FENCE = 37142;
nme.gl.GL.SYNC_GPU_COMMANDS_COMPLETE = 37143;
nme.gl.GL.UNSIGNALED = 37144;
nme.gl.GL.SIGNALED = 37145;
nme.gl.GL.ALREADY_SIGNALED = 37146;
nme.gl.GL.TIMEOUT_EXPIRED = 37147;
nme.gl.GL.CONDITION_SATISFIED = 37148;
nme.gl.GL.WAIT_FAILED = 37149;
nme.gl.GL.SYNC_FLUSH_COMMANDS_BIT = 1;
nme.gl.GL.COLOR = 6144;
nme.gl.GL.DEPTH = 6145;
nme.gl.GL.STENCIL = 6146;
nme.gl.GL.MIN = 32775;
nme.gl.GL.MAX = 32776;
nme.gl.GL.DEPTH_COMPONENT24 = 33190;
nme.gl.GL.STREAM_READ = 35041;
nme.gl.GL.STREAM_COPY = 35042;
nme.gl.GL.STATIC_READ = 35045;
nme.gl.GL.STATIC_COPY = 35046;
nme.gl.GL.DYNAMIC_READ = 35049;
nme.gl.GL.DYNAMIC_COPY = 35050;
nme.gl.GL.DEPTH_COMPONENT32F = 36012;
nme.gl.GL.DEPTH32F_STENCIL8 = 36013;
nme.gl.GL.INVALID_INDEX = -1;
nme.gl.GL.TIMEOUT_IGNORED = -1;
nme.gl.GL.MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 37447;
nme.gl.GL.CLIP_DISTANCE0 = 12288;
nme.gl.WebGL2Context.DEPTH_BUFFER_BIT = 256;
nme.gl.WebGL2Context.STENCIL_BUFFER_BIT = 1024;
nme.gl.WebGL2Context.COLOR_BUFFER_BIT = 16384;
nme.gl.WebGL2Context.POINTS = 0;
nme.gl.WebGL2Context.LINES = 1;
nme.gl.WebGL2Context.LINE_LOOP = 2;
nme.gl.WebGL2Context.LINE_STRIP = 3;
nme.gl.WebGL2Context.TRIANGLES = 4;
nme.gl.WebGL2Context.TRIANGLE_STRIP = 5;
nme.gl.WebGL2Context.TRIANGLE_FAN = 6;
nme.gl.WebGL2Context.ZERO = 0;
nme.gl.WebGL2Context.ONE = 1;
nme.gl.WebGL2Context.SRC_COLOR = 768;
nme.gl.WebGL2Context.ONE_MINUS_SRC_COLOR = 769;
nme.gl.WebGL2Context.SRC_ALPHA = 770;
nme.gl.WebGL2Context.ONE_MINUS_SRC_ALPHA = 771;
nme.gl.WebGL2Context.DST_ALPHA = 772;
nme.gl.WebGL2Context.ONE_MINUS_DST_ALPHA = 773;
nme.gl.WebGL2Context.DST_COLOR = 774;
nme.gl.WebGL2Context.ONE_MINUS_DST_COLOR = 775;
nme.gl.WebGL2Context.SRC_ALPHA_SATURATE = 776;
nme.gl.WebGL2Context.FUNC_ADD = 32774;
nme.gl.WebGL2Context.BLEND_EQUATION = 32777;
nme.gl.WebGL2Context.BLEND_EQUATION_RGB = 32777;
nme.gl.WebGL2Context.BLEND_EQUATION_ALPHA = 34877;
nme.gl.WebGL2Context.FUNC_SUBTRACT = 32778;
nme.gl.WebGL2Context.FUNC_REVERSE_SUBTRACT = 32779;
nme.gl.WebGL2Context.BLEND_DST_RGB = 32968;
nme.gl.WebGL2Context.BLEND_SRC_RGB = 32969;
nme.gl.WebGL2Context.BLEND_DST_ALPHA = 32970;
nme.gl.WebGL2Context.BLEND_SRC_ALPHA = 32971;
nme.gl.WebGL2Context.CONSTANT_COLOR = 32769;
nme.gl.WebGL2Context.ONE_MINUS_CONSTANT_COLOR = 32770;
nme.gl.WebGL2Context.CONSTANT_ALPHA = 32771;
nme.gl.WebGL2Context.ONE_MINUS_CONSTANT_ALPHA = 32772;
nme.gl.WebGL2Context.BLEND_COLOR = 32773;
nme.gl.WebGL2Context.ARRAY_BUFFER = 34962;
nme.gl.WebGL2Context.ELEMENT_ARRAY_BUFFER = 34963;
nme.gl.WebGL2Context.ARRAY_BUFFER_BINDING = 34964;
nme.gl.WebGL2Context.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
nme.gl.WebGL2Context.STREAM_DRAW = 35040;
nme.gl.WebGL2Context.STATIC_DRAW = 35044;
nme.gl.WebGL2Context.DYNAMIC_DRAW = 35048;
nme.gl.WebGL2Context.BUFFER_SIZE = 34660;
nme.gl.WebGL2Context.BUFFER_USAGE = 34661;
nme.gl.WebGL2Context.CURRENT_VERTEX_ATTRIB = 34342;
nme.gl.WebGL2Context.FRONT = 1028;
nme.gl.WebGL2Context.BACK = 1029;
nme.gl.WebGL2Context.FRONT_AND_BACK = 1032;
nme.gl.WebGL2Context.CULL_FACE = 2884;
nme.gl.WebGL2Context.BLEND = 3042;
nme.gl.WebGL2Context.DITHER = 3024;
nme.gl.WebGL2Context.STENCIL_TEST = 2960;
nme.gl.WebGL2Context.DEPTH_TEST = 2929;
nme.gl.WebGL2Context.SCISSOR_TEST = 3089;
nme.gl.WebGL2Context.POLYGON_OFFSET_FILL = 32823;
nme.gl.WebGL2Context.SAMPLE_ALPHA_TO_COVERAGE = 32926;
nme.gl.WebGL2Context.SAMPLE_COVERAGE = 32928;
nme.gl.WebGL2Context.NO_ERROR = 0;
nme.gl.WebGL2Context.INVALID_ENUM = 1280;
nme.gl.WebGL2Context.INVALID_VALUE = 1281;
nme.gl.WebGL2Context.INVALID_OPERATION = 1282;
nme.gl.WebGL2Context.OUT_OF_MEMORY = 1285;
nme.gl.WebGL2Context.CW = 2304;
nme.gl.WebGL2Context.CCW = 2305;
nme.gl.WebGL2Context.LINE_WIDTH = 2849;
nme.gl.WebGL2Context.ALIASED_POINT_SIZE_RANGE = 33901;
nme.gl.WebGL2Context.ALIASED_LINE_WIDTH_RANGE = 33902;
nme.gl.WebGL2Context.CULL_FACE_MODE = 2885;
nme.gl.WebGL2Context.FRONT_FACE = 2886;
nme.gl.WebGL2Context.DEPTH_RANGE = 2928;
nme.gl.WebGL2Context.DEPTH_WRITEMASK = 2930;
nme.gl.WebGL2Context.DEPTH_CLEAR_VALUE = 2931;
nme.gl.WebGL2Context.DEPTH_FUNC = 2932;
nme.gl.WebGL2Context.STENCIL_CLEAR_VALUE = 2961;
nme.gl.WebGL2Context.STENCIL_FUNC = 2962;
nme.gl.WebGL2Context.STENCIL_FAIL = 2964;
nme.gl.WebGL2Context.STENCIL_PASS_DEPTH_FAIL = 2965;
nme.gl.WebGL2Context.STENCIL_PASS_DEPTH_PASS = 2966;
nme.gl.WebGL2Context.STENCIL_REF = 2967;
nme.gl.WebGL2Context.STENCIL_VALUE_MASK = 2963;
nme.gl.WebGL2Context.STENCIL_WRITEMASK = 2968;
nme.gl.WebGL2Context.STENCIL_BACK_FUNC = 34816;
nme.gl.WebGL2Context.STENCIL_BACK_FAIL = 34817;
nme.gl.WebGL2Context.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
nme.gl.WebGL2Context.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
nme.gl.WebGL2Context.STENCIL_BACK_REF = 36003;
nme.gl.WebGL2Context.STENCIL_BACK_VALUE_MASK = 36004;
nme.gl.WebGL2Context.STENCIL_BACK_WRITEMASK = 36005;
nme.gl.WebGL2Context.VIEWPORT = 2978;
nme.gl.WebGL2Context.SCISSOR_BOX = 3088;
nme.gl.WebGL2Context.COLOR_CLEAR_VALUE = 3106;
nme.gl.WebGL2Context.COLOR_WRITEMASK = 3107;
nme.gl.WebGL2Context.UNPACK_ALIGNMENT = 3317;
nme.gl.WebGL2Context.PACK_ALIGNMENT = 3333;
nme.gl.WebGL2Context.MAX_TEXTURE_SIZE = 3379;
nme.gl.WebGL2Context.MAX_VIEWPORT_DIMS = 3386;
nme.gl.WebGL2Context.SUBPIXEL_BITS = 3408;
nme.gl.WebGL2Context.RED_BITS = 3410;
nme.gl.WebGL2Context.GREEN_BITS = 3411;
nme.gl.WebGL2Context.BLUE_BITS = 3412;
nme.gl.WebGL2Context.ALPHA_BITS = 3413;
nme.gl.WebGL2Context.DEPTH_BITS = 3414;
nme.gl.WebGL2Context.STENCIL_BITS = 3415;
nme.gl.WebGL2Context.POLYGON_OFFSET_UNITS = 10752;
nme.gl.WebGL2Context.POLYGON_OFFSET_FACTOR = 32824;
nme.gl.WebGL2Context.TEXTURE_BINDING_2D = 32873;
nme.gl.WebGL2Context.SAMPLE_BUFFERS = 32936;
nme.gl.WebGL2Context.SAMPLES = 32937;
nme.gl.WebGL2Context.SAMPLE_COVERAGE_VALUE = 32938;
nme.gl.WebGL2Context.SAMPLE_COVERAGE_INVERT = 32939;
nme.gl.WebGL2Context.COMPRESSED_TEXTURE_FORMATS = 34467;
nme.gl.WebGL2Context.DONT_CARE = 4352;
nme.gl.WebGL2Context.FASTEST = 4353;
nme.gl.WebGL2Context.NICEST = 4354;
nme.gl.WebGL2Context.GENERATE_MIPMAP_HINT = 33170;
nme.gl.WebGL2Context.BYTE = 5120;
nme.gl.WebGL2Context.UNSIGNED_BYTE = 5121;
nme.gl.WebGL2Context.SHORT = 5122;
nme.gl.WebGL2Context.UNSIGNED_SHORT = 5123;
nme.gl.WebGL2Context.INT = 5124;
nme.gl.WebGL2Context.UNSIGNED_INT = 5125;
nme.gl.WebGL2Context.FLOAT = 5126;
nme.gl.WebGL2Context.DEPTH_COMPONENT = 6402;
nme.gl.WebGL2Context.ALPHA = 6406;
nme.gl.WebGL2Context.RGB = 6407;
nme.gl.WebGL2Context.RGBA = 6408;
nme.gl.WebGL2Context.LUMINANCE = 6409;
nme.gl.WebGL2Context.LUMINANCE_ALPHA = 6410;
nme.gl.WebGL2Context.UNSIGNED_SHORT_4_4_4_4 = 32819;
nme.gl.WebGL2Context.UNSIGNED_SHORT_5_5_5_1 = 32820;
nme.gl.WebGL2Context.UNSIGNED_SHORT_5_6_5 = 33635;
nme.gl.WebGL2Context.FRAGMENT_SHADER = 35632;
nme.gl.WebGL2Context.VERTEX_SHADER = 35633;
nme.gl.WebGL2Context.MAX_VERTEX_ATTRIBS = 34921;
nme.gl.WebGL2Context.MAX_VERTEX_UNIFORM_VECTORS = 36347;
nme.gl.WebGL2Context.MAX_VARYING_VECTORS = 36348;
nme.gl.WebGL2Context.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
nme.gl.WebGL2Context.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
nme.gl.WebGL2Context.MAX_TEXTURE_IMAGE_UNITS = 34930;
nme.gl.WebGL2Context.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
nme.gl.WebGL2Context.SHADER_TYPE = 35663;
nme.gl.WebGL2Context.DELETE_STATUS = 35712;
nme.gl.WebGL2Context.LINK_STATUS = 35714;
nme.gl.WebGL2Context.VALIDATE_STATUS = 35715;
nme.gl.WebGL2Context.ATTACHED_SHADERS = 35717;
nme.gl.WebGL2Context.ACTIVE_UNIFORMS = 35718;
nme.gl.WebGL2Context.ACTIVE_ATTRIBUTES = 35721;
nme.gl.WebGL2Context.SHADING_LANGUAGE_VERSION = 35724;
nme.gl.WebGL2Context.CURRENT_PROGRAM = 35725;
nme.gl.WebGL2Context.NEVER = 512;
nme.gl.WebGL2Context.LESS = 513;
nme.gl.WebGL2Context.EQUAL = 514;
nme.gl.WebGL2Context.LEQUAL = 515;
nme.gl.WebGL2Context.GREATER = 516;
nme.gl.WebGL2Context.NOTEQUAL = 517;
nme.gl.WebGL2Context.GEQUAL = 518;
nme.gl.WebGL2Context.ALWAYS = 519;
nme.gl.WebGL2Context.KEEP = 7680;
nme.gl.WebGL2Context.REPLACE = 7681;
nme.gl.WebGL2Context.INCR = 7682;
nme.gl.WebGL2Context.DECR = 7683;
nme.gl.WebGL2Context.INVERT = 5386;
nme.gl.WebGL2Context.INCR_WRAP = 34055;
nme.gl.WebGL2Context.DECR_WRAP = 34056;
nme.gl.WebGL2Context.VENDOR = 7936;
nme.gl.WebGL2Context.RENDERER = 7937;
nme.gl.WebGL2Context.VERSION = 7938;
nme.gl.WebGL2Context.NEAREST = 9728;
nme.gl.WebGL2Context.LINEAR = 9729;
nme.gl.WebGL2Context.NEAREST_MIPMAP_NEAREST = 9984;
nme.gl.WebGL2Context.LINEAR_MIPMAP_NEAREST = 9985;
nme.gl.WebGL2Context.NEAREST_MIPMAP_LINEAR = 9986;
nme.gl.WebGL2Context.LINEAR_MIPMAP_LINEAR = 9987;
nme.gl.WebGL2Context.TEXTURE_MAG_FILTER = 10240;
nme.gl.WebGL2Context.TEXTURE_MIN_FILTER = 10241;
nme.gl.WebGL2Context.TEXTURE_WRAP_S = 10242;
nme.gl.WebGL2Context.TEXTURE_WRAP_T = 10243;
nme.gl.WebGL2Context.TEXTURE_2D = 3553;
nme.gl.WebGL2Context.TEXTURE = 5890;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP = 34067;
nme.gl.WebGL2Context.TEXTURE_BINDING_CUBE_MAP = 34068;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
nme.gl.WebGL2Context.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
nme.gl.WebGL2Context.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
nme.gl.WebGL2Context.TEXTURE0 = 33984;
nme.gl.WebGL2Context.TEXTURE1 = 33985;
nme.gl.WebGL2Context.TEXTURE2 = 33986;
nme.gl.WebGL2Context.TEXTURE3 = 33987;
nme.gl.WebGL2Context.TEXTURE4 = 33988;
nme.gl.WebGL2Context.TEXTURE5 = 33989;
nme.gl.WebGL2Context.TEXTURE6 = 33990;
nme.gl.WebGL2Context.TEXTURE7 = 33991;
nme.gl.WebGL2Context.TEXTURE8 = 33992;
nme.gl.WebGL2Context.TEXTURE9 = 33993;
nme.gl.WebGL2Context.TEXTURE10 = 33994;
nme.gl.WebGL2Context.TEXTURE11 = 33995;
nme.gl.WebGL2Context.TEXTURE12 = 33996;
nme.gl.WebGL2Context.TEXTURE13 = 33997;
nme.gl.WebGL2Context.TEXTURE14 = 33998;
nme.gl.WebGL2Context.TEXTURE15 = 33999;
nme.gl.WebGL2Context.TEXTURE16 = 34000;
nme.gl.WebGL2Context.TEXTURE17 = 34001;
nme.gl.WebGL2Context.TEXTURE18 = 34002;
nme.gl.WebGL2Context.TEXTURE19 = 34003;
nme.gl.WebGL2Context.TEXTURE20 = 34004;
nme.gl.WebGL2Context.TEXTURE21 = 34005;
nme.gl.WebGL2Context.TEXTURE22 = 34006;
nme.gl.WebGL2Context.TEXTURE23 = 34007;
nme.gl.WebGL2Context.TEXTURE24 = 34008;
nme.gl.WebGL2Context.TEXTURE25 = 34009;
nme.gl.WebGL2Context.TEXTURE26 = 34010;
nme.gl.WebGL2Context.TEXTURE27 = 34011;
nme.gl.WebGL2Context.TEXTURE28 = 34012;
nme.gl.WebGL2Context.TEXTURE29 = 34013;
nme.gl.WebGL2Context.TEXTURE30 = 34014;
nme.gl.WebGL2Context.TEXTURE31 = 34015;
nme.gl.WebGL2Context.ACTIVE_TEXTURE = 34016;
nme.gl.WebGL2Context.REPEAT = 10497;
nme.gl.WebGL2Context.CLAMP_TO_EDGE = 33071;
nme.gl.WebGL2Context.MIRRORED_REPEAT = 33648;
nme.gl.WebGL2Context.FLOAT_VEC2 = 35664;
nme.gl.WebGL2Context.FLOAT_VEC3 = 35665;
nme.gl.WebGL2Context.FLOAT_VEC4 = 35666;
nme.gl.WebGL2Context.INT_VEC2 = 35667;
nme.gl.WebGL2Context.INT_VEC3 = 35668;
nme.gl.WebGL2Context.INT_VEC4 = 35669;
nme.gl.WebGL2Context.BOOL = 35670;
nme.gl.WebGL2Context.BOOL_VEC2 = 35671;
nme.gl.WebGL2Context.BOOL_VEC3 = 35672;
nme.gl.WebGL2Context.BOOL_VEC4 = 35673;
nme.gl.WebGL2Context.FLOAT_MAT2 = 35674;
nme.gl.WebGL2Context.FLOAT_MAT3 = 35675;
nme.gl.WebGL2Context.FLOAT_MAT4 = 35676;
nme.gl.WebGL2Context.SAMPLER_2D = 35678;
nme.gl.WebGL2Context.SAMPLER_CUBE = 35680;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
nme.gl.WebGL2Context.VERTEX_PROGRAM_POINT_SIZE = 34370;
nme.gl.WebGL2Context.POINT_SPRITE = 34913;
nme.gl.WebGL2Context.COMPILE_STATUS = 35713;
nme.gl.WebGL2Context.LOW_FLOAT = 36336;
nme.gl.WebGL2Context.MEDIUM_FLOAT = 36337;
nme.gl.WebGL2Context.HIGH_FLOAT = 36338;
nme.gl.WebGL2Context.LOW_INT = 36339;
nme.gl.WebGL2Context.MEDIUM_INT = 36340;
nme.gl.WebGL2Context.HIGH_INT = 36341;
nme.gl.WebGL2Context.FRAMEBUFFER = 36160;
nme.gl.WebGL2Context.RENDERBUFFER = 36161;
nme.gl.WebGL2Context.RGBA4 = 32854;
nme.gl.WebGL2Context.RGB5_A1 = 32855;
nme.gl.WebGL2Context.RGB565 = 36194;
nme.gl.WebGL2Context.DEPTH_COMPONENT16 = 33189;
nme.gl.WebGL2Context.STENCIL_INDEX = 6401;
nme.gl.WebGL2Context.STENCIL_INDEX8 = 36168;
nme.gl.WebGL2Context.DEPTH_STENCIL = 34041;
nme.gl.WebGL2Context.RENDERBUFFER_WIDTH = 36162;
nme.gl.WebGL2Context.RENDERBUFFER_HEIGHT = 36163;
nme.gl.WebGL2Context.RENDERBUFFER_INTERNAL_FORMAT = 36164;
nme.gl.WebGL2Context.RENDERBUFFER_RED_SIZE = 36176;
nme.gl.WebGL2Context.RENDERBUFFER_GREEN_SIZE = 36177;
nme.gl.WebGL2Context.RENDERBUFFER_BLUE_SIZE = 36178;
nme.gl.WebGL2Context.RENDERBUFFER_ALPHA_SIZE = 36179;
nme.gl.WebGL2Context.RENDERBUFFER_DEPTH_SIZE = 36180;
nme.gl.WebGL2Context.RENDERBUFFER_STENCIL_SIZE = 36181;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
nme.gl.WebGL2Context.COLOR_ATTACHMENT0 = 36064;
nme.gl.WebGL2Context.DEPTH_ATTACHMENT = 36096;
nme.gl.WebGL2Context.STENCIL_ATTACHMENT = 36128;
nme.gl.WebGL2Context.DEPTH_STENCIL_ATTACHMENT = 33306;
nme.gl.WebGL2Context.NONE = 0;
nme.gl.WebGL2Context.FRAMEBUFFER_COMPLETE = 36053;
nme.gl.WebGL2Context.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
nme.gl.WebGL2Context.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
nme.gl.WebGL2Context.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
nme.gl.WebGL2Context.FRAMEBUFFER_UNSUPPORTED = 36061;
nme.gl.WebGL2Context.FRAMEBUFFER_BINDING = 36006;
nme.gl.WebGL2Context.RENDERBUFFER_BINDING = 36007;
nme.gl.WebGL2Context.MAX_RENDERBUFFER_SIZE = 34024;
nme.gl.WebGL2Context.INVALID_FRAMEBUFFER_OPERATION = 1286;
nme.gl.WebGL2Context.UNPACK_FLIP_Y_WEBGL = 37440;
nme.gl.WebGL2Context.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
nme.gl.WebGL2Context.CONTEXT_LOST_WEBGL = 37442;
nme.gl.WebGL2Context.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
nme.gl.WebGL2Context.BROWSER_DEFAULT_WEBGL = 37444;
nme.gl.WebGL2Context.READ_BUFFER = 3074;
nme.gl.WebGL2Context.UNPACK_ROW_LENGTH = 3314;
nme.gl.WebGL2Context.UNPACK_SKIP_ROWS = 3315;
nme.gl.WebGL2Context.UNPACK_SKIP_PIXELS = 3316;
nme.gl.WebGL2Context.PACK_ROW_LENGTH = 3330;
nme.gl.WebGL2Context.PACK_SKIP_ROWS = 3331;
nme.gl.WebGL2Context.PACK_SKIP_PIXELS = 3332;
nme.gl.WebGL2Context.TEXTURE_BINDING_3D = 32874;
nme.gl.WebGL2Context.UNPACK_SKIP_IMAGES = 32877;
nme.gl.WebGL2Context.UNPACK_IMAGE_HEIGHT = 32878;
nme.gl.WebGL2Context.MAX_3D_TEXTURE_SIZE = 32883;
nme.gl.WebGL2Context.MAX_ELEMENTS_VERTICES = 33000;
nme.gl.WebGL2Context.MAX_ELEMENTS_INDICES = 33001;
nme.gl.WebGL2Context.MAX_TEXTURE_LOD_BIAS = 34045;
nme.gl.WebGL2Context.MAX_FRAGMENT_UNIFORM_COMPONENTS = 35657;
nme.gl.WebGL2Context.MAX_VERTEX_UNIFORM_COMPONENTS = 35658;
nme.gl.WebGL2Context.MAX_ARRAY_TEXTURE_LAYERS = 35071;
nme.gl.WebGL2Context.MIN_PROGRAM_TEXEL_OFFSET = 35076;
nme.gl.WebGL2Context.MAX_PROGRAM_TEXEL_OFFSET = 35077;
nme.gl.WebGL2Context.MAX_VARYING_COMPONENTS = 35659;
nme.gl.WebGL2Context.FRAGMENT_SHADER_DERIVATIVE_HINT = 35723;
nme.gl.WebGL2Context.RASTERIZER_DISCARD = 35977;
nme.gl.WebGL2Context.VERTEX_ARRAY_BINDING = 34229;
nme.gl.WebGL2Context.MAX_VERTEX_OUTPUT_COMPONENTS = 37154;
nme.gl.WebGL2Context.MAX_FRAGMENT_INPUT_COMPONENTS = 37157;
nme.gl.WebGL2Context.MAX_SERVER_WAIT_TIMEOUT = 37137;
nme.gl.WebGL2Context.MAX_ELEMENT_INDEX = 36203;
nme.gl.WebGL2Context.RED = 6403;
nme.gl.WebGL2Context.RGB8 = 32849;
nme.gl.WebGL2Context.RGBA8 = 32856;
nme.gl.WebGL2Context.RGB10_A2 = 32857;
nme.gl.WebGL2Context.TEXTURE_3D = 32879;
nme.gl.WebGL2Context.TEXTURE_WRAP_R = 32882;
nme.gl.WebGL2Context.TEXTURE_MIN_LOD = 33082;
nme.gl.WebGL2Context.TEXTURE_MAX_LOD = 33083;
nme.gl.WebGL2Context.TEXTURE_BASE_LEVEL = 33084;
nme.gl.WebGL2Context.TEXTURE_MAX_LEVEL = 33085;
nme.gl.WebGL2Context.TEXTURE_COMPARE_MODE = 34892;
nme.gl.WebGL2Context.TEXTURE_COMPARE_FUNC = 34893;
nme.gl.WebGL2Context.SRGB = 35904;
nme.gl.WebGL2Context.SRGB8 = 35905;
nme.gl.WebGL2Context.SRGB8_ALPHA8 = 35907;
nme.gl.WebGL2Context.COMPARE_REF_TO_TEXTURE = 34894;
nme.gl.WebGL2Context.RGBA32F = 34836;
nme.gl.WebGL2Context.RGB32F = 34837;
nme.gl.WebGL2Context.RGBA16F = 34842;
nme.gl.WebGL2Context.RGB16F = 34843;
nme.gl.WebGL2Context.TEXTURE_2D_ARRAY = 35866;
nme.gl.WebGL2Context.TEXTURE_BINDING_2D_ARRAY = 35869;
nme.gl.WebGL2Context.R11F_G11F_B10F = 35898;
nme.gl.WebGL2Context.RGB9_E5 = 35901;
nme.gl.WebGL2Context.RGBA32UI = 36208;
nme.gl.WebGL2Context.RGB32UI = 36209;
nme.gl.WebGL2Context.RGBA16UI = 36214;
nme.gl.WebGL2Context.RGB16UI = 36215;
nme.gl.WebGL2Context.RGBA8UI = 36220;
nme.gl.WebGL2Context.RGB8UI = 36221;
nme.gl.WebGL2Context.RGBA32I = 36226;
nme.gl.WebGL2Context.RGB32I = 36227;
nme.gl.WebGL2Context.RGBA16I = 36232;
nme.gl.WebGL2Context.RGB16I = 36233;
nme.gl.WebGL2Context.RGBA8I = 36238;
nme.gl.WebGL2Context.RGB8I = 36239;
nme.gl.WebGL2Context.RED_INTEGER = 36244;
nme.gl.WebGL2Context.RGB_INTEGER = 36248;
nme.gl.WebGL2Context.RGBA_INTEGER = 36249;
nme.gl.WebGL2Context.R8 = 33321;
nme.gl.WebGL2Context.RG8 = 33323;
nme.gl.WebGL2Context.R16F = 33325;
nme.gl.WebGL2Context.R32F = 33326;
nme.gl.WebGL2Context.RG16F = 33327;
nme.gl.WebGL2Context.RG32F = 33328;
nme.gl.WebGL2Context.R8I = 33329;
nme.gl.WebGL2Context.R8UI = 33330;
nme.gl.WebGL2Context.R16I = 33331;
nme.gl.WebGL2Context.R16UI = 33332;
nme.gl.WebGL2Context.R32I = 33333;
nme.gl.WebGL2Context.R32UI = 33334;
nme.gl.WebGL2Context.RG8I = 33335;
nme.gl.WebGL2Context.RG8UI = 33336;
nme.gl.WebGL2Context.RG16I = 33337;
nme.gl.WebGL2Context.RG16UI = 33338;
nme.gl.WebGL2Context.RG32I = 33339;
nme.gl.WebGL2Context.RG32UI = 33340;
nme.gl.WebGL2Context.R8_SNORM = 36756;
nme.gl.WebGL2Context.RG8_SNORM = 36757;
nme.gl.WebGL2Context.RGB8_SNORM = 36758;
nme.gl.WebGL2Context.RGBA8_SNORM = 36759;
nme.gl.WebGL2Context.RGB10_A2UI = 36975;
nme.gl.WebGL2Context.TEXTURE_IMMUTABLE_FORMAT = 37167;
nme.gl.WebGL2Context.TEXTURE_IMMUTABLE_LEVELS = 33503;
nme.gl.WebGL2Context.UNSIGNED_INT_2_10_10_10_REV = 33640;
nme.gl.WebGL2Context.UNSIGNED_INT_10F_11F_11F_REV = 35899;
nme.gl.WebGL2Context.UNSIGNED_INT_5_9_9_9_REV = 35902;
nme.gl.WebGL2Context.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
nme.gl.WebGL2Context.UNSIGNED_INT_24_8 = 34042;
nme.gl.WebGL2Context.HALF_FLOAT = 5131;
nme.gl.WebGL2Context.RG = 33319;
nme.gl.WebGL2Context.RG_INTEGER = 33320;
nme.gl.WebGL2Context.INT_2_10_10_10_REV = 36255;
nme.gl.WebGL2Context.CURRENT_QUERY = 34917;
nme.gl.WebGL2Context.QUERY_RESULT = 34918;
nme.gl.WebGL2Context.QUERY_RESULT_AVAILABLE = 34919;
nme.gl.WebGL2Context.ANY_SAMPLES_PASSED = 35887;
nme.gl.WebGL2Context.ANY_SAMPLES_PASSED_CONSERVATIVE = 36202;
nme.gl.WebGL2Context.MAX_DRAW_BUFFERS = 34852;
nme.gl.WebGL2Context.DRAW_BUFFER0 = 34853;
nme.gl.WebGL2Context.DRAW_BUFFER1 = 34854;
nme.gl.WebGL2Context.DRAW_BUFFER2 = 34855;
nme.gl.WebGL2Context.DRAW_BUFFER3 = 34856;
nme.gl.WebGL2Context.DRAW_BUFFER4 = 34857;
nme.gl.WebGL2Context.DRAW_BUFFER5 = 34858;
nme.gl.WebGL2Context.DRAW_BUFFER6 = 34859;
nme.gl.WebGL2Context.DRAW_BUFFER7 = 34860;
nme.gl.WebGL2Context.DRAW_BUFFER8 = 34861;
nme.gl.WebGL2Context.DRAW_BUFFER9 = 34862;
nme.gl.WebGL2Context.DRAW_BUFFER10 = 34863;
nme.gl.WebGL2Context.DRAW_BUFFER11 = 34864;
nme.gl.WebGL2Context.DRAW_BUFFER12 = 34865;
nme.gl.WebGL2Context.DRAW_BUFFER13 = 34866;
nme.gl.WebGL2Context.DRAW_BUFFER14 = 34867;
nme.gl.WebGL2Context.DRAW_BUFFER15 = 34868;
nme.gl.WebGL2Context.MAX_COLOR_ATTACHMENTS = 36063;
nme.gl.WebGL2Context.COLOR_ATTACHMENT1 = 36065;
nme.gl.WebGL2Context.COLOR_ATTACHMENT2 = 36066;
nme.gl.WebGL2Context.COLOR_ATTACHMENT3 = 36067;
nme.gl.WebGL2Context.COLOR_ATTACHMENT4 = 36068;
nme.gl.WebGL2Context.COLOR_ATTACHMENT5 = 36069;
nme.gl.WebGL2Context.COLOR_ATTACHMENT6 = 36070;
nme.gl.WebGL2Context.COLOR_ATTACHMENT7 = 36071;
nme.gl.WebGL2Context.COLOR_ATTACHMENT8 = 36072;
nme.gl.WebGL2Context.COLOR_ATTACHMENT9 = 36073;
nme.gl.WebGL2Context.COLOR_ATTACHMENT10 = 36074;
nme.gl.WebGL2Context.COLOR_ATTACHMENT11 = 36075;
nme.gl.WebGL2Context.COLOR_ATTACHMENT12 = 36076;
nme.gl.WebGL2Context.COLOR_ATTACHMENT13 = 36077;
nme.gl.WebGL2Context.COLOR_ATTACHMENT14 = 36078;
nme.gl.WebGL2Context.COLOR_ATTACHMENT15 = 36079;
nme.gl.WebGL2Context.SAMPLER_3D = 35679;
nme.gl.WebGL2Context.SAMPLER_2D_SHADOW = 35682;
nme.gl.WebGL2Context.SAMPLER_2D_ARRAY = 36289;
nme.gl.WebGL2Context.SAMPLER_2D_ARRAY_SHADOW = 36292;
nme.gl.WebGL2Context.SAMPLER_CUBE_SHADOW = 36293;
nme.gl.WebGL2Context.INT_SAMPLER_2D = 36298;
nme.gl.WebGL2Context.INT_SAMPLER_3D = 36299;
nme.gl.WebGL2Context.INT_SAMPLER_CUBE = 36300;
nme.gl.WebGL2Context.INT_SAMPLER_2D_ARRAY = 36303;
nme.gl.WebGL2Context.UNSIGNED_INT_SAMPLER_2D = 36306;
nme.gl.WebGL2Context.UNSIGNED_INT_SAMPLER_3D = 36307;
nme.gl.WebGL2Context.UNSIGNED_INT_SAMPLER_CUBE = 36308;
nme.gl.WebGL2Context.UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
nme.gl.WebGL2Context.MAX_SAMPLES = 36183;
nme.gl.WebGL2Context.SAMPLER_BINDING = 35097;
nme.gl.WebGL2Context.PIXEL_PACK_BUFFER = 35051;
nme.gl.WebGL2Context.PIXEL_UNPACK_BUFFER = 35052;
nme.gl.WebGL2Context.PIXEL_PACK_BUFFER_BINDING = 35053;
nme.gl.WebGL2Context.PIXEL_UNPACK_BUFFER_BINDING = 35055;
nme.gl.WebGL2Context.COPY_READ_BUFFER = 36662;
nme.gl.WebGL2Context.COPY_WRITE_BUFFER = 36663;
nme.gl.WebGL2Context.COPY_READ_BUFFER_BINDING = 36662;
nme.gl.WebGL2Context.COPY_WRITE_BUFFER_BINDING = 36663;
nme.gl.WebGL2Context.FLOAT_MAT2x3 = 35685;
nme.gl.WebGL2Context.FLOAT_MAT2x4 = 35686;
nme.gl.WebGL2Context.FLOAT_MAT3x2 = 35687;
nme.gl.WebGL2Context.FLOAT_MAT3x4 = 35688;
nme.gl.WebGL2Context.FLOAT_MAT4x2 = 35689;
nme.gl.WebGL2Context.FLOAT_MAT4x3 = 35690;
nme.gl.WebGL2Context.UNSIGNED_INT_VEC2 = 36294;
nme.gl.WebGL2Context.UNSIGNED_INT_VEC3 = 36295;
nme.gl.WebGL2Context.UNSIGNED_INT_VEC4 = 36296;
nme.gl.WebGL2Context.UNSIGNED_NORMALIZED = 35863;
nme.gl.WebGL2Context.SIGNED_NORMALIZED = 36764;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_INTEGER = 35069;
nme.gl.WebGL2Context.VERTEX_ATTRIB_ARRAY_DIVISOR = 35070;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BUFFER_MODE = 35967;
nme.gl.WebGL2Context.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 35968;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_VARYINGS = 35971;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BUFFER_START = 35972;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BUFFER_SIZE = 35973;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 35976;
nme.gl.WebGL2Context.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 35978;
nme.gl.WebGL2Context.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 35979;
nme.gl.WebGL2Context.INTERLEAVED_ATTRIBS = 35980;
nme.gl.WebGL2Context.SEPARATE_ATTRIBS = 35981;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BUFFER = 35982;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BUFFER_BINDING = 35983;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK = 36386;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_PAUSED = 36387;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_ACTIVE = 36388;
nme.gl.WebGL2Context.TRANSFORM_FEEDBACK_BINDING = 36389;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 33296;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 33297;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_RED_SIZE = 33298;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 33299;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 33300;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 33301;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 33302;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 33303;
nme.gl.WebGL2Context.FRAMEBUFFER_DEFAULT = 33304;
nme.gl.WebGL2Context.DEPTH24_STENCIL8 = 35056;
nme.gl.WebGL2Context.DRAW_FRAMEBUFFER_BINDING = 36006;
nme.gl.WebGL2Context.READ_FRAMEBUFFER = 36008;
nme.gl.WebGL2Context.DRAW_FRAMEBUFFER = 36009;
nme.gl.WebGL2Context.READ_FRAMEBUFFER_BINDING = 36010;
nme.gl.WebGL2Context.RENDERBUFFER_SAMPLES = 36011;
nme.gl.WebGL2Context.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 36052;
nme.gl.WebGL2Context.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 36182;
nme.gl.WebGL2Context.UNIFORM_BUFFER = 35345;
nme.gl.WebGL2Context.UNIFORM_BUFFER_BINDING = 35368;
nme.gl.WebGL2Context.UNIFORM_BUFFER_START = 35369;
nme.gl.WebGL2Context.UNIFORM_BUFFER_SIZE = 35370;
nme.gl.WebGL2Context.MAX_VERTEX_UNIFORM_BLOCKS = 35371;
nme.gl.WebGL2Context.MAX_FRAGMENT_UNIFORM_BLOCKS = 35373;
nme.gl.WebGL2Context.MAX_COMBINED_UNIFORM_BLOCKS = 35374;
nme.gl.WebGL2Context.MAX_UNIFORM_BUFFER_BINDINGS = 35375;
nme.gl.WebGL2Context.MAX_UNIFORM_BLOCK_SIZE = 35376;
nme.gl.WebGL2Context.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 35377;
nme.gl.WebGL2Context.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 35379;
nme.gl.WebGL2Context.UNIFORM_BUFFER_OFFSET_ALIGNMENT = 35380;
nme.gl.WebGL2Context.ACTIVE_UNIFORM_BLOCKS = 35382;
nme.gl.WebGL2Context.UNIFORM_TYPE = 35383;
nme.gl.WebGL2Context.UNIFORM_SIZE = 35384;
nme.gl.WebGL2Context.UNIFORM_BLOCK_INDEX = 35386;
nme.gl.WebGL2Context.UNIFORM_OFFSET = 35387;
nme.gl.WebGL2Context.UNIFORM_ARRAY_STRIDE = 35388;
nme.gl.WebGL2Context.UNIFORM_MATRIX_STRIDE = 35389;
nme.gl.WebGL2Context.UNIFORM_IS_ROW_MAJOR = 35390;
nme.gl.WebGL2Context.UNIFORM_BLOCK_BINDING = 35391;
nme.gl.WebGL2Context.UNIFORM_BLOCK_DATA_SIZE = 35392;
nme.gl.WebGL2Context.UNIFORM_BLOCK_ACTIVE_UNIFORMS = 35394;
nme.gl.WebGL2Context.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
nme.gl.WebGL2Context.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
nme.gl.WebGL2Context.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
nme.gl.WebGL2Context.OBJECT_TYPE = 37138;
nme.gl.WebGL2Context.SYNC_CONDITION = 37139;
nme.gl.WebGL2Context.SYNC_STATUS = 37140;
nme.gl.WebGL2Context.SYNC_FLAGS = 37141;
nme.gl.WebGL2Context.SYNC_FENCE = 37142;
nme.gl.WebGL2Context.SYNC_GPU_COMMANDS_COMPLETE = 37143;
nme.gl.WebGL2Context.UNSIGNALED = 37144;
nme.gl.WebGL2Context.SIGNALED = 37145;
nme.gl.WebGL2Context.ALREADY_SIGNALED = 37146;
nme.gl.WebGL2Context.TIMEOUT_EXPIRED = 37147;
nme.gl.WebGL2Context.CONDITION_SATISFIED = 37148;
nme.gl.WebGL2Context.WAIT_FAILED = 37149;
nme.gl.WebGL2Context.SYNC_FLUSH_COMMANDS_BIT = 1;
nme.gl.WebGL2Context.COLOR = 6144;
nme.gl.WebGL2Context.DEPTH = 6145;
nme.gl.WebGL2Context.STENCIL = 6146;
nme.gl.WebGL2Context.MIN = 32775;
nme.gl.WebGL2Context.MAX = 32776;
nme.gl.WebGL2Context.DEPTH_COMPONENT24 = 33190;
nme.gl.WebGL2Context.STREAM_READ = 35041;
nme.gl.WebGL2Context.STREAM_COPY = 35042;
nme.gl.WebGL2Context.STATIC_READ = 35045;
nme.gl.WebGL2Context.STATIC_COPY = 35046;
nme.gl.WebGL2Context.DYNAMIC_READ = 35049;
nme.gl.WebGL2Context.DYNAMIC_COPY = 35050;
nme.gl.WebGL2Context.DEPTH_COMPONENT32F = 36012;
nme.gl.WebGL2Context.DEPTH32F_STENCIL8 = 36013;
nme.gl.WebGL2Context.INVALID_INDEX = -1;
nme.gl.WebGL2Context.TIMEOUT_IGNORED = -1;
nme.gl.WebGL2Context.MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 37447;
nme.image.PixelFormat.pfNone = -1;
nme.image.PixelFormat.pfRGB = 0;
nme.image.PixelFormat.pfBGRA = 1;
nme.image.PixelFormat.pfBGRPremA = 2;
nme.image.PixelFormat.pfAlpha = 3;
nme.image.PixelFormat.pfRenderToCount = 4;
nme.image.PixelFormat.pfLuma = 4;
nme.image.PixelFormat.pfLumaAlpha = 5;
nme.image.PixelFormat.pfRGB32f = 6;
nme.image.PixelFormat.pfRGBA32f = 7;
nme.image.PixelFormat.pfRGBPremA = 8;
nme.image.PixelFormat.pfRGBA = 9;
nme.image.PixelFormat.pfUInt16 = 10;
nme.image.PixelFormat.pfUInt32 = 11;
nme.media.Camera.CAMERA_UNMUTED = "Camera.unmuted";
nme.media.Camera.CAMERA_MUTED = "Camera.muted";
nme.media.Camera.nme_camera_create = nme.Loader.load("nme_camera_create",1);
nme.media.Camera.nme_camera_on_poll = nme.Loader.load("nme_camera_on_poll",2);
nme.media.Sound.nme_sound_from_file = nme.Loader.load("nme_sound_from_file",3);
nme.media.Sound.nme_sound_from_data = nme.Loader.load("nme_sound_from_data",4);
nme.media.Sound.nme_sound_get_id3 = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_get_id3",2);
	$r = this1;
	return $r;
}(this));
nme.media.Sound.nme_sound_get_length = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_get_length",1);
	$r = this1;
	return $r;
}(this));
nme.media.Sound.nme_sound_close = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_close",1);
	$r = this1;
	return $r;
}(this));
nme.media.Sound.nme_sound_get_status = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_get_status",1);
	$r = this1;
	return $r;
}(this));
nme.media.Sound.nme_sound_suspend = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_suspend",2);
	$r = this1;
	return $r;
}(this));
nme.media.Sound.nme_sound_get_engine = nme.Loader.load("nme_sound_get_engine",1);
nme.media.Sound.nme_sound_channel_create_dynamic = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_create_dynamic",2);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nmeDynamicSoundCount = 0;
nme.media.SoundChannel.nmeIncompleteList = [];
nme.media.SoundChannel.nmeIsPolling = false;
nme.media.SoundChannel.nme_sound_channel_is_complete = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_is_complete",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_get_left = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_get_left",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_get_right = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_get_right",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_get_position = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_get_position",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_set_position = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_set_position",2);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_get_data_position = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_get_data_position",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_stop = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_stop",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_create",4);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_set_transform = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_set_transform",2);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_needs_data = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_needs_data",1);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_add_data = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_add_data",2);
	$r = this1;
	return $r;
}(this));
nme.media.SoundChannel.nme_sound_channel_create_async = nme.Loader.load("nme_sound_channel_create_async",5);
nme.media.SoundChannel.nme_sound_channel_post_buffer = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_sound_channel_post_buffer",2);
	$r = this1;
	return $r;
}(this));
nme.media.SoundEngine.FLASH = "flash";
nme.media.SoundEngine.SDL = "sdl";
nme.media.SoundEngine.OPENSL = "opensl";
nme.media.SoundEngine.OPENAL = "openal";
nme.media.SoundEngine.ANDROID = "android";
nme.media.SoundEngine.AVPLAYER = "avplayer";
nme.media.SoundEngine.SDL_MUSIC = "sdl music";
nme.media.SoundEngine.SDL_SOUND = "sdl sound";
nme.media.SoundEngine.SDL_NATIVE_MIDI = "sdl native midi";
nme.media.SoundEngine.ANDROID_SOUND = "android sound";
nme.media.SoundEngine.ANDROID_MEDIAPLAYER = "android mediaplayer";
nme.media.StageVideo.playComplete = "NetStream.Play.Complete";
nme.media.StageVideo.playSwitch = "NetStream.Play.Switch";
nme.media.StageVideo.playTransitionComplete = "NetStream.Play.TransitionComplete";
nme.media.StageVideo.playStart = "NetStream.Play.Start";
nme.media.StageVideo.playStop = "NetStream.Play.Stop";
nme.media.StageVideo.playStreamNotFound = "NetStream.Play.StreamNotFound";
nme.media.StageVideo.playFailed = "NetStream.Play.Failed";
nme.media.StageVideo.seekFailed = "NetStream.Seek.Failed";
nme.media.StageVideo.seekNotify = "NetStream.Seek.Notify";
nme.media.StageVideo.seekInvalidTime = "NetStream.Seek.InvalidTime";
nme.media.StageVideo.failed = "NetStream.Failed";
nme.media.StageVideo.PAUSE = 0;
nme.media.StageVideo.RESUME = 1;
nme.media.StageVideo.TOGGLE = 2;
nme.media.StageVideo.PAUSE_LEN = -3;
nme.media.StageVideo.ALL_LEN = -1;
nme.media.StageVideo.PLAY_STATUS_COMPLETE = 0;
nme.media.StageVideo.PLAY_STATUS_SWITCH = 1;
nme.media.StageVideo.PLAY_STATUS_TRANSITION = 2;
nme.media.StageVideo.PLAY_STATUS_ERROR = 3;
nme.media.StageVideo.PLAY_STATUS_NOT_STARTED = 4;
nme.media.StageVideo.PLAY_STATUS_STARTED = 5;
nme.media.StageVideo.PLAY_STATUS_STOPPED = 6;
nme.media.StageVideo.SEEK_FINISHED_OK = 0;
nme.media.StageVideo.SEEK_FINISHED_EARLY = 1;
nme.media.StageVideo.SEEK_FINISHED_ERROR = 2;
nme.media.StageVideo.nme_sv_create = nme.Loader.load("nme_sv_create",2);
nme.media.StageVideo.nme_sv_destroy = nme.Loader.load("nme_sv_destroy",1);
nme.media.StageVideo.nme_sv_action = nme.Loader.load("nme_sv_action",2);
nme.media.StageVideo.nme_sv_play = nme.Loader.load("nme_sv_play",4);
nme.media.StageVideo.nme_sv_seek = nme.Loader.load("nme_sv_seek",2);
nme.media.StageVideo.nme_sv_get_time = nme.Loader.load("nme_sv_get_time",1);
nme.media.StageVideo.nme_sv_get_buffered_percent = nme.Loader.load("nme_sv_get_buffered_percent",1);
nme.media.StageVideo.nme_sv_viewport = nme.Loader.load("nme_sv_viewport",5);
nme.media.StageVideo.nme_sv_pan = nme.Loader.load("nme_sv_pan",3);
nme.media.StageVideo.nme_sv_zoom = nme.Loader.load("nme_sv_zoom",3);
nme.media.StageVideo.nme_sv_set_sound_transform = nme.Loader.load("nme_sv_set_sound_transform",3);
nme.media.StageVideoAvailability.AVAILABLE = "available";
nme.media.StageVideoAvailability.UNAVAILABLE = "unavailable";
nme.media.Video.nme_video_create = nme.Loader.load("nme_video_create",2);
nme.media.Video.nme_video_load = nme.Loader.load("nme_video_load",2);
nme.media.Video.nme_video_play = nme.Loader.load("nme_video_play",1);
nme.media.Video.nme_video_clear = nme.Loader.load("nme_video_clear",1);
nme.media.Video.nme_video_set_smoothing = nme.Loader.load("nme_video_set_smoothing",2);
nme.media.VideoStatus.ACCELERATED = "accelerated";
nme.media.VideoStatus.SOFTWARE = "software";
nme.media.VideoStatus.UNAVAILABLE = "unavailable";
nme.net.NetConnection.defaultObjectEncoding = 0;
nme.net.NetStream.CONNECT_TO_FMS = "connectToFMS";
nme.net.NetStream.DIRECT_CONNECTIONS = "directConnections";
nme.net.URLRequest.AUTH_BASIC = 1;
nme.net.URLRequest.AUTH_DIGEST = 2;
nme.net.URLRequest.AUTH_GSSNEGOTIATE = 4;
nme.net.URLRequest.AUTH_NTLM = 8;
nme.net.URLRequest.AUTH_DIGEST_IE = 16;
nme.net.URLRequest.AUTH_DIGEST_ANY = 15;
nme.net.URLRequest.nme_get_url = nme.Loader.load("nme_get_url",1);
nme.net.URLRequestMethod.DELETE = "DELETE";
nme.net.URLRequestMethod.GET = "GET";
nme.net.URLRequestMethod.HEAD = "HEAD";
nme.net.URLRequestMethod.OPTIONS = "OPTIONS";
nme.net.URLRequestMethod.POST = "POST";
nme.net.URLRequestMethod.PUT = "PUT";
nme.sensors.Accelerometer.defaultInterval = 34;
nme.system.ApplicationDomain.currentDomain = new nme.system.ApplicationDomain(null);
nme.system.Capabilities.nme_capabilities_get_pixel_aspect_ratio = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_capabilities_get_pixel_aspect_ratio",0);
	$r = this1;
	return $r;
}(this));
nme.system.Capabilities.nme_capabilities_get_screen_dpi = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_capabilities_get_screen_dpi",0);
	$r = this1;
	return $r;
}(this));
nme.system.Capabilities.nme_capabilities_get_screen_resolution_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_capabilities_get_screen_resolution_x",0);
	$r = this1;
	return $r;
}(this));
nme.system.Capabilities.nme_capabilities_get_screen_resolution_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_capabilities_get_screen_resolution_y",0);
	$r = this1;
	return $r;
}(this));
nme.system.Capabilities.nme_capabilities_get_screen_resolutions = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_capabilities_get_screen_resolutions",0);
	$r = this1;
	return $r;
}(this));
nme.system.Capabilities.nme_capabilities_get_language = nme.Loader.load("nme_capabilities_get_language",0);
nme.system.Dialog.Save = 1;
nme.system.Dialog.PromptOverwrite = 2;
nme.system.Dialog.MustExist = 4;
nme.system.Dialog.Directory = 8;
nme.system.Dialog.MultiSelect = 16;
nme.system.Dialog.HideReadOnly = 32;
nme.system.Dialog.nme_file_dialog_open = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_file_dialog_open",-1);
	$r = this1;
	return $r;
}(this));
nme.system.SecurityDomain.currentDomain = new nme.system.SecurityDomain();
nme.system.System.nme_get_unique_device_identifier = nme.Loader.load("nme_get_unique_device_identifier",0);
nme.system.System.nme_get_glstats = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_get_glstats",1);
	$r = this1;
	return $r;
}(this));
nme.text.Font.nmeRegisteredFonts = new haxe.ds.StringMap();
nme.text.Font.freetype_import_font = nme.Loader.load("freetype_import_font",4);
nme.text.Font.nme_font_register_font = nme.Loader.load("nme_font_register_font",2);
nme.text.Font.nme_font_iterate_device_fonts = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_font_iterate_device_fonts",1);
	$r = this1;
	return $r;
}(this));
nme.text.SoftKeyboardType.DEFAULT = 0;
nme.text.SoftKeyboardType.CONTACT = 1;
nme.text.SoftKeyboardType.EMAIL = 2;
nme.text.SoftKeyboardType.NUMBER = 3;
nme.text.SoftKeyboardType.PUNCTUATION = 4;
nme.text.SoftKeyboardType.URL = 5;
nme.text.SoftKeyboardType.ANDROID_VISIBLE_PASSWORD = 101;
nme.text.SoftKeyboardType.IOS_ASCII = 102;
nme.text.TextFormat.OUTLINE_END_SQUARE = 16;
nme.text.TextFormat.OUTLINE_EDGE_BEVEL = 32;
nme.text.TextFormat.OUTLINE_EDGE_MITER = 64;
nme.ui.Accelerometer.nme_input_get_acceleration_support = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_input_get_acceleration_support",0);
	$r = this1;
	return $r;
}(this));
nme.ui.Accelerometer.nme_input_get_acceleration_x = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_input_get_acceleration_x",0);
	$r = this1;
	return $r;
}(this));
nme.ui.Accelerometer.nme_input_get_acceleration_y = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_input_get_acceleration_y",0);
	$r = this1;
	return $r;
}(this));
nme.ui.Accelerometer.nme_input_get_acceleration_z = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_input_get_acceleration_z",0);
	$r = this1;
	return $r;
}(this));
nme.ui.GameInput.isSupported = true;
nme.ui.GameInput.numDevices = 0;
nme.ui.GameInput.nmeDevices = [];
nme.ui.GameInput.nmeInstances = [];
nme.ui.GameInput.nmeKeyboardDevices = [];
nme.ui.GameInputDevice.MAX_BUFFER_SIZE = 32000;
nme.ui.GamepadAxis.LEFT = 0;
nme.ui.GamepadAxis.RIGHT = 2;
nme.ui.GamepadAxis.TRIGGER = 4;
nme.ui.GamepadButton.A = 0;
nme.ui.GamepadButton.B = 1;
nme.ui.GamepadButton.X = 2;
nme.ui.GamepadButton.Y = 3;
nme.ui.GamepadButton.BACK = 4;
nme.ui.GamepadButton.GUIDE = 5;
nme.ui.GamepadButton.START = 6;
nme.ui.GamepadButton.LEFT_STICK = 7;
nme.ui.GamepadButton.RIGHT_STICK = 8;
nme.ui.GamepadButton.LEFT_SHOULDER = 9;
nme.ui.GamepadButton.RIGHT_SHOULDER = 10;
nme.ui.GamepadButton.DPAD_UP = 11;
nme.ui.GamepadButton.DPAD_DOWN = 12;
nme.ui.GamepadButton.DPAD_LEFT = 13;
nme.ui.GamepadButton.DPAD_RIGHT = 14;
nme.ui.KeyLocation.STANDARD = 0;
nme.ui.KeyLocation.LEFT = 1;
nme.ui.KeyLocation.RIGHT = 2;
nme.ui.KeyLocation.NUM_PAD = 3;
nme.ui.Keyboard.A = 65;
nme.ui.Keyboard.B = 66;
nme.ui.Keyboard.C = 67;
nme.ui.Keyboard.D = 68;
nme.ui.Keyboard.E = 69;
nme.ui.Keyboard.F = 70;
nme.ui.Keyboard.G = 71;
nme.ui.Keyboard.H = 72;
nme.ui.Keyboard.I = 73;
nme.ui.Keyboard.J = 74;
nme.ui.Keyboard.K = 75;
nme.ui.Keyboard.L = 76;
nme.ui.Keyboard.M = 77;
nme.ui.Keyboard.N = 78;
nme.ui.Keyboard.O = 79;
nme.ui.Keyboard.P = 80;
nme.ui.Keyboard.Q = 81;
nme.ui.Keyboard.R = 82;
nme.ui.Keyboard.S = 83;
nme.ui.Keyboard.T = 84;
nme.ui.Keyboard.U = 85;
nme.ui.Keyboard.V = 86;
nme.ui.Keyboard.W = 87;
nme.ui.Keyboard.X = 88;
nme.ui.Keyboard.Y = 89;
nme.ui.Keyboard.Z = 90;
nme.ui.Keyboard.ALTERNATE = 18;
nme.ui.Keyboard.BACKQUOTE = 192;
nme.ui.Keyboard.BACKSLASH = 220;
nme.ui.Keyboard.BACKSPACE = 8;
nme.ui.Keyboard.CAPS_LOCK = 20;
nme.ui.Keyboard.COMMA = 188;
nme.ui.Keyboard.COMMAND = 15;
nme.ui.Keyboard.CONTROL = 17;
nme.ui.Keyboard.DELETE = 46;
nme.ui.Keyboard.DOWN = 40;
nme.ui.Keyboard.END = 35;
nme.ui.Keyboard.ENTER = 13;
nme.ui.Keyboard.EQUAL = 187;
nme.ui.Keyboard.ESCAPE = 27;
nme.ui.Keyboard.F1 = 112;
nme.ui.Keyboard.F2 = 113;
nme.ui.Keyboard.F3 = 114;
nme.ui.Keyboard.F4 = 115;
nme.ui.Keyboard.F5 = 116;
nme.ui.Keyboard.F6 = 117;
nme.ui.Keyboard.F7 = 118;
nme.ui.Keyboard.F8 = 119;
nme.ui.Keyboard.F9 = 120;
nme.ui.Keyboard.F10 = 121;
nme.ui.Keyboard.F11 = 122;
nme.ui.Keyboard.F12 = 123;
nme.ui.Keyboard.F13 = 124;
nme.ui.Keyboard.F14 = 125;
nme.ui.Keyboard.F15 = 126;
nme.ui.Keyboard.HOME = 36;
nme.ui.Keyboard.INSERT = 45;
nme.ui.Keyboard.LEFT = 37;
nme.ui.Keyboard.LEFTBRACKET = 219;
nme.ui.Keyboard.MINUS = 189;
nme.ui.Keyboard.NUMBER_0 = 48;
nme.ui.Keyboard.NUMBER_1 = 49;
nme.ui.Keyboard.NUMBER_2 = 50;
nme.ui.Keyboard.NUMBER_3 = 51;
nme.ui.Keyboard.NUMBER_4 = 52;
nme.ui.Keyboard.NUMBER_5 = 53;
nme.ui.Keyboard.NUMBER_6 = 54;
nme.ui.Keyboard.NUMBER_7 = 55;
nme.ui.Keyboard.NUMBER_8 = 56;
nme.ui.Keyboard.NUMBER_9 = 57;
nme.ui.Keyboard.NUMPAD = 21;
nme.ui.Keyboard.NUMPAD_0 = 96;
nme.ui.Keyboard.NUMPAD_1 = 97;
nme.ui.Keyboard.NUMPAD_2 = 98;
nme.ui.Keyboard.NUMPAD_3 = 99;
nme.ui.Keyboard.NUMPAD_4 = 100;
nme.ui.Keyboard.NUMPAD_5 = 101;
nme.ui.Keyboard.NUMPAD_6 = 102;
nme.ui.Keyboard.NUMPAD_7 = 103;
nme.ui.Keyboard.NUMPAD_8 = 104;
nme.ui.Keyboard.NUMPAD_9 = 105;
nme.ui.Keyboard.NUMPAD_ADD = 107;
nme.ui.Keyboard.NUMPAD_DECIMAL = 110;
nme.ui.Keyboard.NUMPAD_DIVIDE = 111;
nme.ui.Keyboard.NUMPAD_ENTER = 108;
nme.ui.Keyboard.NUMPAD_MULTIPLY = 106;
nme.ui.Keyboard.NUMPAD_SUBTRACT = 109;
nme.ui.Keyboard.PAGE_DOWN = 34;
nme.ui.Keyboard.PAGE_UP = 33;
nme.ui.Keyboard.PERIOD = 190;
nme.ui.Keyboard.QUOTE = 222;
nme.ui.Keyboard.RIGHT = 39;
nme.ui.Keyboard.RIGHTBRACKET = 221;
nme.ui.Keyboard.SEMICOLON = 186;
nme.ui.Keyboard.SHIFT = 16;
nme.ui.Keyboard.SLASH = 191;
nme.ui.Keyboard.SPACE = 32;
nme.ui.Keyboard.TAB = 9;
nme.ui.Keyboard.UP = 38;
nme.ui.KeyboardInputDevice.allDevices = null;
nme.ui.MouseCursor.ARROW = "arrow";
nme.ui.MouseCursor.BUTTON = "button";
nme.ui.MouseCursor.HAND = "hand";
nme.ui.MouseCursor.IBEAM = "ibeam";
nme.ui.Multitouch.nme_stage_get_multitouch_supported = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_multitouch_supported",1);
	$r = this1;
	return $r;
}(this));
nme.ui.Multitouch.nme_stage_get_multitouch_active = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_get_multitouch_active",1);
	$r = this1;
	return $r;
}(this));
nme.ui.Multitouch.nme_stage_set_multitouch_active = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_stage_set_multitouch_active",2);
	$r = this1;
	return $r;
}(this));
nme.ui.Scale.scale = 0.0;
nme.utils.ArrayBufferView.invalidDataIndex = "Invalid data index";
nme.utils.ByteArray.nme_buffer_create = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_buffer_create",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_buffer_offset = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_buffer_offset",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_buffer_resize = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_buffer_resize",2);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_buffer_length = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_buffer_length",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_byte_array_overwrite_file = nme.Loader.load("nme_byte_array_overwrite_file",2);
nme.utils.ByteArray.nme_byte_array_read_file = nme.Loader.load("nme_byte_array_read_file",1);
nme.utils.ByteArray.nme_lzma_encode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_lzma_encode",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_lzma_decode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_lzma_decode",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_zip_encode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_zip_encode",1);
	$r = this1;
	return $r;
}(this));
nme.utils.ByteArray.nme_zip_decode = (function($this) {
	var $r;
	var this1 = nme.Loader.load("nme_zip_decode",1);
	$r = this1;
	return $r;
}(this));
nme.utils.Endian.BIG_ENDIAN = "bigEndian";
nme.utils.Endian.LITTLE_ENDIAN = "littleEndian";
nme.utils.Float32Array.SBYTES_PER_ELEMENT = 4;
nme.utils.Int16Array.SBYTES_PER_ELEMENT = 2;
nme.utils.Int32Array.SBYTES_PER_ELEMENT = 4;
nme.utils.UInt16Array.SBYTES_PER_ELEMENT = 2;
nme.utils.UInt8Array.SBYTES_PER_ELEMENT = 1;
nme.utils.UInt8ClampedArray.SBYTES_PER_ELEMENT = 1;
nme.utils.WeakRef.nme_weak_ref_create = nme.Loader.load("nme_weak_ref_create",2);
nme.utils.WeakRef.nme_weak_ref_get = nme.Loader.load("nme_weak_ref_get",1);
$hxClasses.package = {};
$hxClasses.package.Array = Array;
$hxClasses.package.Class = Class;
$hxClasses.package.Date = Date;
$hxClasses.package.js = js;
$hxClasses.package.EReg = EReg;
$hxClasses.package.Enum = Enum;
$hxClasses.package.HxOverrides = HxOverrides;
$hxClasses.package.IntIterator = IntIterator;
$hxClasses.package.Math = Math;
$hxClasses.package.Reflect = Reflect;
$hxClasses.package.String = String;
$hxClasses.package.Std = Std;
$hxClasses.package.Float = Float;
$hxClasses.package.Int = Int;
$hxClasses.package.Dynamic = Dynamic;
$hxClasses.package.StringBuf = StringBuf;
$hxClasses.package.haxe = haxe;
$hxClasses.package.StringTools = StringTools;
$hxClasses.package.ValueType = ValueType;
$hxClasses.package.Type = Type;
$hxClasses.package.Xml = Xml;
$hxClasses.package.cpp = cpp;
$hxClasses.package.nme = nme
Export.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
