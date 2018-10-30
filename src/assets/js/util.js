
var util = {};
// 格式化时间
util.formatDate = function (date, space = '-') {
    return `${this.formatNumber(date.getFullYear())}${space}${this.formatNumber(date.getMonth())+1}${space}${this.formatNumber(date.getDate())}`;
};
util.formatTime = function (date, space1 = '-', space2 = ':') {
    return `${this.formatNumber(date.getFullYear())}${space1}${this.formatNumber(date.getMonth())+1}${space1}${this.formatNumber(date.getDate())} ${this.formatNumber(date.getHours())}${space2}${this.formatNumber(date.getMinutes())}${space2}${this.formatNumber(date.getSeconds())}`;
};
// 格式化数字
util.formatNumber = function (num) {
    return num > 9 ? num : '0' + num;
};
//自定义判断元素类型
util.toType = function(obj)
{
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
// 参数过滤函数
util.filter_param = function (o) {
    for(var key in o)
    {
        if(o[key]==null)
            delete o[key];
        if(this.toType(o[key])==="string")
        {
            o[key] = o[key].trim();
            if(o[key].length==0)
            {
                delete o[key];
            }
        }
    }
    return o;
};

//修改浏览器标题
util.title = function (title) {
    title = title || '业主微信平台';
    window.document.title = title;
};

util.isNotEmpty = function(num) {
	if(num === "" || typeof(num) === "undefined" || num === null || (typeof(num)==="number" && isNaN(parseInt(num)))) {
		return false;
	}
	else {
		return true;
	}
}

util.getQueryStrs = function(str) {
	var LocString = decodeURI(String(window.document.location.href));
	var rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(LocString), tmp;
	if (tmp = rs) {
		return tmp[2];
  }
	return "";
}

/*判断是否是微信内置浏览器*/
util.isWeixin = function() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}

util.isStrEmpty = function (o) {
  if (o == undefined || o == null || o == "") {
    return true;
  }
  return false;
}

// 给对象赋默认值
util.initValueIfEmpty = function (o) {
  if (o instanceof String) {
    if (this.isStrEmpty(value)) {
      value = "";
    }
    o = value;
  } else if(o instanceof Object) {
    for (var key in o) {
      o[key] = this.initValueIfEmpty(o[key]);
    }
  }
  return o;
};

util.debugLog = function (val) {
    process.env.NODE_ENV === 'development' && console.log(val)
}

//初始化时间类处理显示和数字计算
util.initFormatter=function (vm){
  Date.prototype.Format = function(fmt) { //
    let o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }
  function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    r1=Number(arg1.toString().replace(".",""))
    r2=Number(arg2.toString().replace(".",""))
    return (r1/r2)*Math.pow(10,t2-t1);
  }
  //给Number类型增加一个div方法，调用起来更加方便。
  Number.prototype.div = function (arg){
    return accDiv(this, arg);
  }
  function accMul(arg1,arg2) {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return  Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
  }
  //给Number类型增加一个mul方法，调用起来更加方便。
  Number.prototype.mul = function (arg){
    return accMul(arg, this);
  }

  //两数相减
  function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
  }

  Number.prototype.sub = function (arg){
    return Subtr(this,arg);
  }

  //两数相加
  function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    var result = (arg1*m+arg2*m)/m ;
    return  result.toFixed(2);
  }
  Number.prototype.add = function (arg){
    return accAdd(this,arg);
  }

};
//加
util.floatAdd = function floatAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

//减
util.floatSub = function floatSub(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  //动态控制精度长度
  n=(r1>=r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}

//乘
util.floatMul = function floatMul(arg1,arg2)   {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

//除
util.floatDiv = function floatDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}

  r1=Number(arg1.toString().replace(".",""));

  r2=Number(arg2.toString().replace(".",""));
  return (r1/r2)*Math.pow(10,t2-t1);
}

util.getAgentName = function getAgentName() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1){
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器
}

util.UUID = function(){
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export default util;
