;(function (){
// 绑定登录注册按钮的点击切换

// 点击去注册
$('.links').on('click' , function(){
    $('.login_box').hide()
    $('.reg_box').show()
})

// 点击去登陆
$('.qudenglu').on('click' , function(){
    $('.reg_box').hide()
    $('.login_box').show()
})

// 从layui中获取from对象
let form = layui.form
let layer = layui.layer
form.verify({
    // 自定义pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'] ,
    // 校验两次密码输入一致
    repwd:function(value){
        // 拿到第一次输入密码和第二次输入进行比较
        let pwd = $('.reg_box [name = password]').val()
        if (pwd !== value){
            return '两次密码不一致'
        }
    }
})

// 监听注册表单的提交事件
$('#form_reg').on('submit' , function(e){
    e.preventDefault()
    let data = {username:$('#form_reg [name=username]').val() , password:$('#form_reg [name=password]').val()}
    $.post('/api/reguser' ,
        data, 
        function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            // 模拟点击去登陆
            $('.qudenglu').click()
    })
})

// 监听登录表单的提交事件
$('#form_login').on('submit' , function(e){
    e.preventDefault()
    let username = $('#form_login [name = username]').val()
    let password = $('#form_login [name = password]').val()
    $.post('/api/login' , 
    {username , password} , function (res){
        if (res.status!==0){
            return layer.msg(res.message)
        }
        layer.msg(res.message)
        console.log(res.token);
        // 将登录后返回的token字符串存到本地存储 locastorage中
        localStorage.setItem('token' , res.token)
        // 跳转到主页
        location.href = './index.html'

    })
})












}())