

// Show Stage view
//$('#content').html(can.view('components/stage/stage.hbs', { }));

if (sessionStorage.getItem('token') && sessionStorage.getItem('email')) {

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-Api-Key', sessionStorage.getItem('token'));
        jqXHR.setRequestHeader('X-Account-Name', sessionStorage.getItem('email'));
    });

} else {
    window.location = 'signin.html';
}

$(function () {

    $.get('http://sleepy-castle-1003.herokuapp.com/goals/1.json', function(data) {
        console.log(data);
    });

    $('#content').html(can.view('components/singin/singin.hbs', { }));
});
