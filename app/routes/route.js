
module.exports = app => {
    require('./auth.route')(app);
    require('./todo.route')(app);
    require('./web.routes')(app);
    require('./todocon.route')(app);
}