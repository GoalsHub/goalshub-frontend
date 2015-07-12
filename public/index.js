$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

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
var Model = {};
var ModelHash = {};

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

    function setHashModel(model) {
        model.children.forEach(function(elem) {
            ModelHash[elem.type + '_' + elem.entity_id] = elem;
            if (elem.children) {
                setHashModel(elem);
            }
        });
    }

    $.get(SERVER_API + '/goals/1.json', function (model) {
        Model = model;
        setHashModel(model);
        drawGraph(model);
        showPlans();
    });

    $('body').click(function (event) {
        //target: button.btn.btn-primary

        if ($(event.target).hasClass('new-step')) {
            addNewStep(event.target);
        }
    });

    $(document).on('refresh_model', function (event, model) {
        if (model.type === 'stage') {
            var stage_view = $('#stage-view-' + model.entity_id);
            stage_view.html(_.template($('#stage-template').html())(model));
        }
    });
});

function updateModel(model) {
    ModelHash[model.type + '_' + model.entity_id] = model;
}

function newModel(model) {
    var parent = ModelHash[model.parent_type + '_' + model.parent_id];

    if (parent) {
        parent.children = parent.children || [];
        parent.children.push(model);

        $(document).trigger('refresh_model', parent);
    }
}

function addNewStep (button) {
    var id = $(button).attr('stage'),
        name = $('#new-step-for-' + id).val();

    $.postJSON(SERVER_API + '/steps.json', {
        stage_id: id,
        name: name
    }, function (stage) {
        newModel(stage);
    });
}

function selectPlan (plan) {
    $('.list-group-item').removeClass('active');
    $(this).addClass('active');

    $('.steps-list').html('');

    plan.children.forEach(viewStage);
}

function viewStage(stage) {
    var temp = _.template($('#stage-template').html());
    $('<div id="stage-view-' + stage.entity_id + '">' + temp(stage) + '</div>')
        .appendTo('.steps-list');
}

function showPlans () {
    var listPlans = $('.list-plans');

    $.each(listPlans, function (i, elemList) {

        Model.children.forEach(function(plan, i) {
            var elemPlan = $('<a>')
                    .addClass('list-group-item')
                    .attr('plan', plan.entity_id)
                    .attr('href', '#plan/' + plan.id);

            if (i === 0) {
                elemPlan.addClass('active');

                selectPlan(plan);
            }

            elemPlan.html(plan.name);

            elemPlan.appendTo(elemList);

            elemPlan.click(selectPlan.bind(elemPlan, plan));
        })


    });
}
