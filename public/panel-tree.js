

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

var MocData = {
    "id":1,
    "name": "GOAL 1",
    "description": " Open own cofee shop in Amsterdam thing I believe",
    "children": [{
        "id": 1,
        "name": "super plan1",
        "description": "plan1",
        "children": [{
                "id": 1,
                "name": "stage1",
                "description": "stage1",
                "children": [
                    {"id": 980190962, "name": "step1", "description": "step1", "done": false, "children": []},
                    {"id": 298486374, "name": "step2", "description": "step2","done": false, "children": [] }
                ]
            },
            { "id": 2, "name": "stage2", "description": "stage2", "children": []}
        ]
    }, {"id": 2, "name": "super plan2", "description": "plan2", "children": []}]
};

$(function () {

    $.get('http://sleepy-castle-1003.herokuapp.com/goals/1.json', function(data) {

        console.log('goal', data);

        var treePanel = document.getElementById('tree-container');

        window.api = drawTree(data, treePanel);
    });

});
