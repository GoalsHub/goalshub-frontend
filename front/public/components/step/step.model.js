
/* Модель шага */
var Step = can.Model.extend({
    findAll: 'GET /steps',
    findOne: 'GET /steps/{id}',
    update: 'PUT /steps/{id}',
    destroy: 'DELETE /steps/{id}'
}, {});

