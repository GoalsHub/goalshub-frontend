var STEPS = [
    'Download CanJS',
    'Read the guides',
    'Build your app',
    'Become immortal',
    'Haircut @ 2pm'
];

/* Модель шага */
var Step = can.Model.extend({
    findAll: 'GET /steps',
    findOne: 'GET /steps/{id}',
    update: 'PUT /steps/{id}',
    destroy: 'DELETE /steps/{id}'
}, {});

/* Хранилище шагов */
var stepsStore = can.fixture.make(STEPS.length, function (i) {
    return {
        id: i + 1,
        description: STEPS[i],
        done: false
    };
});

can.fixture({
    'GET /steps': stepsStore.findAll,
    'GET /steps/{id}': stepsStore.findOne,
    'PUT /steps/{id}': stepsStore.update,
    'DELETE /steps/{id}': stepsStore.destroy
});
can.fixture.delay = 500;


can.Component.extend({
    tag: "stage-app",
    scope: {
        selectedStep: null,
        steps: new Step.List({}),
        select: function(step){
            this.attr('selectedStep', step);
        },
        saveStep: function(step) {
            step.save();
            this.removeAttr('selectedStep');
        }
    }
});

// Start the application by rendering our template!
$('#content').html(can.view('appMustache', { }));