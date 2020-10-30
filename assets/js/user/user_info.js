$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })

    //2.获取用户信息
    initUserInfo();
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",
            success: function (res) {
                // console.log('王企鹅群翁无');
                if (res.status !== 0) {
                    // console.log(111);
                    return layer.msg(res.message)
                }
                //把用户信息渲染到form表单中
                layui.form.val('formUserInfo', res.data);
                // console.log(111);
            }
        })
    }

    //3.重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //调用函数,重新渲染数据
        initUserInfo()
    })

    // 4.修改用户信息
    $('.layui-form').on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // console.log(111);
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initUserInfo()
                //调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})