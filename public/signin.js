$('#form-signin').submit(function (event) {
    var email = $('#email').val(),
       password = $('#password').val();

    $.post('http://sleepy-castle-1003.herokuapp.com/tokens.json', {
       'email': email,
       'password': password
    }).done(function(data) {

        sessionStorage.setItem('email', email);
        sessionStorage.setItem('token', data.token);

        window.location = 'index.html';

    }).fail(function (data) {
        var modal = $('#modal-error-singin');

        if (data.responseJSON && data.responseJSON.message) {
            modal.find('.modal-content').html('<p>' + data.responseJSON.message + '</p>');
        }

        modal.modal();
    });

    event.preventDefault();

    return false;
});