// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
});

// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', { data: response });
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            console.log(response)
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    })
});

// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
});


//删除分类
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('真的要执行删除吗？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})