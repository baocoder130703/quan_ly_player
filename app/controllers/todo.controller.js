const Todo = require("../models/todo.model");
const Todo_con = require("../models/todocon.model");

// Show form create Todo
exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('todo/create');
}
//Create and Save a new Todo

exports.store = (req, res) => {
    // Validate request
    if (!req.body)
    {
        res.redirect('/todo/create?status=error')
    }
    // Create a Todo
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        published: !req.body.published ? false : true
    });
    // Save Todo in the database
    Todo.create(todo, (err, data) => {
        if(err)
        {
            res.redirect('/todo/create?status=error')
        }
        else
        {
            res.redirect('/todo')
        }
    });
};

// exports.khoitao = (req, res) => {
//     // Validate request
//     const {title,description,published} = req.body;
//     if(title&&description&&published)
//     {
//         Todo.findByTitle(title,())
//     }
//     // Create a Todo
//     const todo = new Todo({
//         title: req.body.title,
//         description: req.body.description,
//         published: !req.body.published ? false : true
//     });
//     // Save Todo in the database
//     Todo.create(todo, (err, data) => {
//         if(err)
//         {
//             res.redirect('/todo/create?status=error')
//         }
//         else
//         {
//             res.redirect('/todo')
//         }
//     });
// };
// exports.tao = (req,res)=>{
    
//     if(title&&description&&published)
//     {
//         Todo.findByTitle(title,(err,todo)=>{
//             if(err||todo)
//             {
//                 const thongbao = " cai ten nay co toi ";
//                 res.render('/todo/create',{title,description,published,thongbao})
//             }
//             else if(!err||!title)
//             {
//                 const todo = new Todo({
//                     title: req.body.title,
//                     description: req.body.description,
//                     published: !req.body.published ? false : true
//                 });
//                 Todo.create(todo, (err, data) => {
//                     if(err)
//                     {
//                         res.redirect('/todo/create?status=error')
//                     }
//                     else
//                     {
//                         res.redirect('/todo')
//                     }
//                 });
//             }
//         });
//     }
// }
//Retrieve all Todo from the database (with condition).

exports.findAll = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const title = req.query.title; 
    Todo.getAll(title, (err, data) => {
        if (err)
        {
            res.redirect('/500');
        }
        else
        {
            res.render('todo/index', {todo: data});
        }
    });
};

// Find a single Todo with a id 
exports.edit = (req, res) => {
    res.locals.status = req.query.status;
    Todo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } 
        else
        {
            res.render('todo/edit', { todo: data });
        }
    });
};
// Update a Todo identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.redirect('/todo/edit/' + req.params.id + '?status=error')
    }
    if (req.body.published == 'on') {
        req.body.published = true;
    } else {
        req.body.published = false;
    }
    Todo.updateById(
        req.params.id,
        new Todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.redirect('/404');
                }
                else
                {
                    res.redirect('/500');
                }
            }
            else
            {
                res.redirect('/todo' /* + req.params.id + '?status=success' */);
            }
        }
    );
};
// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
    Todo.remove(req.params.id, (err, data) => {
        if (err)
        {
            if (err.kind === "not_found")
            {
                res.redirect('/404');
            }
            else
            {
                res.redirect('/500');
            }
        }
        else 
        {
            res.redirect('/todo')
        }
    });
};
// Delete all Todo from the database.
exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
        if (err)
            res.redirect('/500');
        else res.redirect('/todo?deleted=true')
    });
};

// find all published Todo
exports.findAllPublished = (req, res) => {
    Todo.getAllPublished((err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('todo/index', { todo: data})
    });
};