//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
//1.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net"
//1.生产环境服务器地址
//var baseURL = "http://ajax.frontend.itheima.net"



// 拦截所有ajax请求
$.ajaxPrefilter(function (options) {
    //1.
    options.url = baseURL + options.url
    // console.log(params.url);
    //2.
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //3.
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message === "身份认证失败！") {
            localStorage.removeItem("token")
            location.href = '/login.html'
        }
    }
})