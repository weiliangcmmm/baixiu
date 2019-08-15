// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

// 分页
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
        }
    });
}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response)
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);
    }
})


// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    return false;
});


// 当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function() {
    if (confirm('您真的要进行删除操作吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }
});