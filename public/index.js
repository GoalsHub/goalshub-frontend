

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

    (function() {
        var ua = navigator.userAgent,
            iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
            typeOfCanvas = typeof HTMLCanvasElement,
            nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
            textSupport = nativeCanvasSupport
                && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
        //I'm setting this based on the fact that ExCanvas provides text support for IE
        //and that as of today iPhone/iPad current text support is lame
        labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
        nativeTextSupport = labelType == 'Native';
        useGradients = nativeCanvasSupport;
        animate = !(iStuff || !nativeCanvasSupport);
    })();


    $.get('http://sleepy-castle-1003.herokuapp.com/goals/1.json', function (json) {

        drawGraph(json);

    });



});
