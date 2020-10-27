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
  var layer = layui.layer
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val()
      },
      success: function (res) {
        if (res.status != 0) {
          // 返回状态判断
          return layer.msg(res.message)
        }
        //提交成功后处理代码
        layer.msg("注册成功,请登录")
        // 自动切换到登录表单
        $('#link_login').click()
        // 重置form表单
        $('#form_reg')[0].reset()
      }
    })
  })

  //5.登录功能
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("恭喜您,登陆成功")
        //保存token,未来的接口要用token
        localStorage.setItem('token', res.token)
        //跳转
        // location.href = "/index.html"
      }
    })
  })



})
