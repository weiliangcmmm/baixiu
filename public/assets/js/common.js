$('#login').on('click', function() {
    var isConfirm = confirm('确认要退出吗？')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(data) {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})