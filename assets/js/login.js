$(function () {
  // 1.点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 2.点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //3.自定义验证规则
  var form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],

    repwd: function (value) {
      //获取password的val值
      var pwd = $('.reg-box input[name=password]').val()
      if (value !== pwd) {
        return "两次密码输入不一致,请重试"
      }
    }
  })

  //4.注册功能
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status != 0) {
          // 返回状态判断
          return alert(res.message)
        }
        //提交成功后处理代码
        alert(res.message)
      }
    })
  })



})
