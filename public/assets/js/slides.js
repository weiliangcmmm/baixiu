// 当管理员选择文件的时候
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response[0].image)
            $('#image').val(response[0].image)
        }
    })
});

// 当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})

// 向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        console.log(response)
        var html = template('slidesTpl', { data: response });
        $('#slidesBox').html(html);
    }
})

// 当删除按钮被点击时
$('#slidesBox').on('click', '.delete', function() {
    if (confirm('您真的要进行删除操作吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                location.reload();
            }
        })
    }
});