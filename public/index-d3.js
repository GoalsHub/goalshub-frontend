

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

//{"id":1,"name":"Open own cofee shop in Amsterdam","description":"Good thing I believe","plans":[{"id":1,"name":"plan1","description":"plan1","stages":[{"id":1,"name":"stage1","description":"stage1","step":[{"id":980190962,"name":"step1","description":"step1","done":false},{"id":298486374,"name":"step2","description":"step2","done":false}]},{"id":2,"name":"stage2","description":"stage2","step":[]}]},{"id":2,"name":"plan2","description":"plan2","stages":[]}]}

$(function () {

    var labelType, useGradients, nativeTextSupport, animate;

    $.get('http://sleepy-castle-1003.herokuapp.com/goals/1.json', function (json) {

        drawTree(json, document.getElementById('tree-container'));
    });

});
