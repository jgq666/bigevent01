//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
//1.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net"
//1.生产环境服务器地址
//var baseURL = "http://ajax.frontend.itheima.net"



// 拦截所有ajax请求
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url
    // console.log(params.url);
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
})