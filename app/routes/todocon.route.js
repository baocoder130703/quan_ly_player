module.exports = app =>{
    const todo_con = require('../controllers/todo_con.controller');
    var router = require('express').Router();
    

    router.get('/',todo_con.findAll_con);

    router.get('/create_con',todo_con.create_con);    
    router.post('/',todo_con.store_con);

    router.get('/edit_con/:id',todo_con.edit_con);
    router.put("/:id",todo_con.update_con);

    router.get("/delete_con/:id", todo_con.delete_con);
    // Delete all todo
    router.delete("/delete_con", todo_con.deleteAll_con);
    app.use('/todo_con', router);
    
    app.get('/500', (req, res) => {
        res.render('err')
    });
    app.get('/404', (req, res) => {
        res.render('404')
    });
}