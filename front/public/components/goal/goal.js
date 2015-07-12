
/* Модель шага */
var Goal = can.Model.extend({
    findAll: 'GET /goal.json',
    findOne: 'GET /steps/{id}',
    update: 'PUT /steps/{id}',
    destroy: 'DELETE /steps/{id}'
}, {});

