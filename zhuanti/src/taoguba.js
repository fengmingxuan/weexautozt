var BASE_URL = {
    //js.taoguba.com.cn/weex/zhuanti (传线上环境注意下一行换成https) 192.168.1.10:8080   192.168.1.15:8080  192.168.1.18:8080   192.168.1.19:8080
    IP:'js.taoguba.com.cn/weex/zhuanti',
    HTTP:'https://',
    API_URL:'http://api.taoguba.sp/',
    M_TAOGUBA:'https://m.taoguba.com.cn/mViewTopic?'

};

var FIX = {
    com:'https://api.taoguba.com.cn',
    token:'web_4132&A99FC8CEC59DACE59AF20DE1E808DF21',
};


var API = {
    getFocusTopic:"free/topic/getFocusTopic",//获取专题内容
    getFocusList :"free/topic/getFocusList",//获取专题列表
};


exports.getImageUrl = function (path) {
    var url;
    //path = new String(path);
    if (typeof window === 'object') {
        //https://www.taoguba.com.cn/taogubaweexzhuanti/dist/image/leftw_0.png
        //js.taoguba.com.cn/weex/zhuanti/index.html?page=./zhuanti/build/src/zhuanti.js?focusSeq=62&skinType=0
        //http://192.168.1.15:8080/index.html?page=./zhuanti/build/src/zhuanti.js?focusSeq=62&skinType=0
        //http://191.1.68.1.15:8080/dist/image/leftw_0.png
        //./image/leftw_0.png
        url =  BASE_URL.HTTP+  BASE_URL.IP  +'/zhuanti'+path.substring(1, path.length);
    } else {
        url = BASE_URL.HTTP+  BASE_URL.IP+ '/zhuanti'  +path.substring(1, path.length);;
    }
    // console.log('getImageUrl=='+url);
    return url;
};




exports.getDefaultUrl = function (name) {
    var url;
    url = getBaseUrl(name,true)+name+".js";
    // console.log('getDefaultUrl=='+url);
    return url;
};

exports.getPathUrl = function (path) {
    var url;
    url = getBaseUrl(path,true)+path;
    // console.log('getPathUrl=='+url);
    return url;
};


exports.getToken = function () {
    var token;
    token = FIX.token;
    // console.log('getToken=='+token);
    return token;
};


exports.getOriginApi = function () {
    var api;
    api = BASE_URL.API_URL;
    // console.log('getOriginApi=='+api);
    return api;
};


exports.getFocusTopic = function () {
    var  url = getApiUrl(API.getFocusTopic);
    return url;
};

exports.getFocusList = function () {
    var  url = getApiUrl(API.getFocusList);
    return url;
};


function getBaseUrl(bundleUrl, isnav) {
    //bundleUrl = new String(bundleUrl);
    var nativeBase;
    var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;

    var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
    if (isAndroidAssets) {
        nativeBase = 'file://assets/build/';
    }
    else if (isiOSAssets) {
        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
    }
    else {
        //'localhost:8080';
        var host = BASE_URL.IP;
        // var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
        // if (matches && matches.length >= 2) {
        //     host = matches[1];
        // }

        if (typeof window === 'object') {
            if (host.endsWith(':8080/zhuanti') || host.endsWith(':12580/zhuanti')) {
                host = host.replace('/zhuanti', '');
                // console.log('replace local test zhuanti name');
            }
        }
        //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.
        //网页 http://localhost:8080/index.html?page=./dist/weexbar/stocknews.js?id=id
        //android 原生 http://192.168.1.15:12580/dist/mainlist.js
        //js.taoguba.com.cn/weex/zhuanti/index.html?page=./zhuanti/build/src/zhuanti.js?focusSeq=62&skinType=0
        //http://192.168.1.15:8080/index.html?page=./zhuanti/build/src/zhuanti.js?focusSeq=62&skinType=0
        if (typeof window === 'object') {
            nativeBase = isnav ? BASE_URL.HTTP + host + '/index.html?page=./zhuanti/build/src/' : BASE_URL.HTTP + BASE_URL.IP+'/build/src/';
        } else {
            //http://192.168.1.15:8080/zhuanti/build/src/zhuanti.js
            nativeBase = BASE_URL.HTTP + BASE_URL.IP+ '/zhuanti/build/src/';
        }
    }

    return nativeBase;
};


function getApiUrl(apiurl){
    var url;
    //apiurl = new String(apiurl);
    if (typeof window === 'object') {
        //http://api.taoguba.cu/free/topic/getFocusList
        ///free/topic/apiGetForums?
        url =  BASE_URL.API_URL+apiurl;
    } else {
        url = apiurl;
    }
    // console.log('getApiUrl=='+url);
    return url;
};

exports.getUrlParam =  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
}

exports.getMTaoguba = function getMTaoguba(murl){
    var url;
    ////http://m.taoguba.com.cn/mViewTopic?topicID=1293091&replyID=890&pageNo=1
    //https://m.taoguba.com.cn/Article/1657029/1
    // murl = new String(murl);
    url =  BASE_URL.M_TAOGUBA+murl;
    // console.log('getMTaoguba=='+url);
    return url;
};
