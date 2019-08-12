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