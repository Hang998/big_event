$.ajaxPrefilter(function(option){
    // option表示 在发送get或者post请求中所携带的参数
    option.url = 'http://www.liulongbin.top:3007' + option.url
    console.log(option.url);
})