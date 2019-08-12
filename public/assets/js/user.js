// 当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload()
        },
        error: function() {
            alert('用户添加失败')
        }

    })
    return false
})


//当用户选择文件的时候,
$('#avatar').on('change', function() {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            $('#preview').attr('src', data[0].avatar)
            $('#hiddenAvatar').val(data[0].avatar)
        }
    })
})


// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response)
            // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', { data: response });
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});