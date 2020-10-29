$(function () {
    //1.获取用户信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            //清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //2.用户头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr('src', user.user_pic)
        $('.user-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avater').show().html(text)
    }
}