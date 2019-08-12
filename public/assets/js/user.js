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
$('#modifyBox').on('change', '#avatar', function() {
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
        var html = template('userTpl', { data: response });
        $('#userBox').html(html);
    }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response)
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});




// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})

//删除
$('#userBox').on('click', '.delete', function() {
    if (confirm('真的要删除用户吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
selectAll.on('change', function() {
    var status = $(this).prop('checked');
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    $('#userBox').find('input').prop('checked', status);
});

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }
    // 如果选中的复选框的数量大于0 就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量删除按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
});


// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = []
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('真的要进行批量删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }
})