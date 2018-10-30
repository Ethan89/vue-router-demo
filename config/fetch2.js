import util from '../src/assets/js/util';
// import store from '../src/store/index';
// import { router } from '../src/router/index';
import '../src/assets/js/encry.min.js' //接口加密工具
function initData(params) {
    var URLSearchParams = require('url-search-params');
    //360浏览器不支持URLSearchParams
    if (typeof URLSearchParams === "function") {
        var formMap = new URLSearchParams();
        for (var key in params) {
            formMap.append(key, params[key]);
        }
        return formMap;
    }
    else {
        return params;
    }

}
function tokenCheck (status) {
    if (status === 401){
        // store.commit('logout', this);
        // store.commit('clearOpenedSubmenu');
        // store.commit('clearAllTags');
        // router.push({
        //     name: 'login',
        //     props: {
        //         timeout: true
        //     },
        //     query: {
        //         isTokenInValid: true
        //     }
        // });
    }
    return false;
}

export default async (url = '', baseUrl = '', data = {}, dataType = 'JSON', type = 'GET',requestType='JSON',pathArr=[],method = 'fetch') => {
    type = type.toUpperCase();
    // 拼接userid
    // data.userId = localStorage.userId;
    // 清除空参数
    data = util.filter_param(data);
    if (process.env.NODE_ENV === 'production') {
      if (baseUrl) {
        switch (baseUrl) {
          case "/crm400":
//          baseUrl = 'http://zhenro.wuyeface.com/crmui/landcrm'; //测试环境接口
            baseUrl = 'http://'+host.FILE_SERVER+'/landcrm'; //测试环境接口
            break;
          case "/walter":
//          baseUrl = 'http://zhenro.wuyeface.com/qpi'; //新商城接口
            baseUrl = 'http://'+host.FILE_SERVER+'/qpi'; //测试环境接口
            break;

          case "/manage":
            // baseUrl = 'http://zhenro.wuyeface.com/'; //
            baseUrl = 'http://'+host.FILE_SERVER; //
            break;

          case "/activity":
            // baseUrl = 'http://zhenro.wuyeface.com/'; //
            baseUrl = 'http://'+host.FILE_SERVER+'/activity'; //
            break;
          case "/steward":
          case "/houserkeep":
//          baseUrl = 'http://zhenro.wuyeface.com/steward'; //测试环境接口
            baseUrl = 'http://'+host.FILE_SERVER+'/steward'; //测试环境接口
            break;
          case '/question'://调查问卷
//						baseUrl = 'http://ebei.natapp1.cc/question';
            baseUrl = 'http://'+host.FILE_SERVER+'/question';
          	break;
          case '/article'://调查问卷
            baseUrl = 'http://'+host.FILE_SERVER+'/media';
            break;
          default:
            baseUrl = "";
        }
      }
    }
    url = baseUrl + url;
    if(pathArr && pathArr.length>0)
    {
        url+="/"+pathArr.join("/");
    }
    if (type === 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr+'&_t=' + new Date().getTime();
    }
    else {
    	url = url + '?_t=' + new Date().getTime();
    }
}

if (window.fetch && method === 'fetch') {
    var header_content = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    if (dataType && dataType === "XML") {
        header_content = {
            'Accept': 'application/xml',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    }
    else if(requestType === "JSON")
    {
        if (type === 'POST') {
            header_content = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }
    }
    else if(requestType === "FORMDATA")
    {
        header_content = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':"Basic ZWJlaTplYmVp"
        };
    }

    if (localStorage.token && requestType === "JSON") {
        header_content.Authorization = (localStorage.tokenType==="bearer"?"Bearer ":"")+localStorage.token;
    } else {
        tokenCheck(402);
    }
    header_content.token = localStorage.getItem('token') || ""
    header_content.sign = key_gen.encode(key_gen.handlerData(type === 'GET'?url.substring(url.indexOf("?")+1):data));

    let requestConfig = {
        // credentials: 'include',
        method: type,
        headers: header_content,
        mode: "cors",
        cache: "force-cache"
    };

    if (type === 'POST') {
        if(requestType === "FORMDATA")
        {
            Object.defineProperty(requestConfig, 'body', {
                value: initData(data)
            })
        }
        else if(requestType === "JSON")
        {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
    }
    try {
        const response = await fetch(url, requestConfig);
        if (dataType && dataType === "XML") {
            const responseJson = await response.text();
            // responseJson.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
            // tokenCheck(responseJson.status);
            return responseJson
        }
        else {
            const responseJson = await response.json();
            responseJson.errCode=200;
            responseJson.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
            if (response.status == 401) {
                tokenCheck(401);
            } else {
                tokenCheck(responseJson.status);
            }
            return responseJson
        }
    } catch (error) {
        const responseJson={
            errCode:500,
            msg:"系统异常"
        };
        return responseJson;
    }
} else {
    return new Promise((resolve, reject) => {
            let requestObj;
    if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
    } else {
        requestObj = new ActiveXObject;
    }

    let sendData = '';
    if(type === 'POST') {
    	if(requestType === "FORMDATA")
      {
      	sendData = initData(data);
      }
      else if(requestType === "JSON")
      {
      	sendData = JSON.stringify(data);
      }
    }

    requestObj.open(type, url, true);
    if(requestType === "JSON") {
        if (type === 'GET') {
    	    requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        } else if (type === 'POST') {
            requestObj.setRequestHeader("Content-type", "application/json");
        }
    }
    else {
    	requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    requestObj.setRequestHeader("token", localStorage.getItem('token') || "");
    requestObj.setRequestHeader("sign", key_gen.encode(key_gen.handlerData(type == 'GET'?url.substring(url.indexOf("?")+1):data)));

    requestObj.send(sendData);
    requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
                let obj = requestObj.response
                if (typeof obj !== 'object' && obj.indexOf("<?xml") == -1) {
                    obj = JSON.parse(obj);
                }
                obj.interfacePath = process.env.NODE_ENV === 'development' ? url : '';
                tokenCheck(obj.status);
                resolve(obj)
            } else {
                reject(requestObj)
            }
        }
    }
})
}
}
