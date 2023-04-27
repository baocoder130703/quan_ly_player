const Todo_con = require("../models/todocon.model");
const Todo = require('../models/todo.model');
const { request } = require("express");
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'publics/images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
});
const upload = multer({storage:storage});
// exports.create_con = (req,res) =>{
//     res.locals.status = req.query.status;
//     res.render('todo_con/create_con');
// }
exports.create_con = (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.redirect('/todo_con/create_con?status=err');
        } else {
            res.render('todo_con/create_con', { todos });
        }
    });
};

exports.store_con = (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        res.redirect('/todo_con/create_con?status=err');
      } else {
        const { ten_cau_thu, chieu_cao, luc_sut, type_id } = req.body;
        const todo_con = {
          ten_cau_thu,
          chieu_cao,
          luc_sut,
          type_id
        };
        if (req.file && req.file.filename) {
          todo_con.image = req.file.filename;
        }
        Todo_con.create_con(todo_con, (err, data) => {
          if (err) {
            res.redirect('/todo_con/create_con?status=err');
          } else {
            res.redirect('/todo_con');
          }
        });
      }
    });
  };
// exports.store_con = (req, res) => {
//     const { ten_cau_thu, chieu_cao, luc_sut, type_id } = req.body;
//     const todo_con = {
//         ten_cau_thu,
//         chieu_cao,
//         luc_sut,
//         type_id,
       
//     };
//     Todo_con.create_con(todo_con, (err, data) => {
//         if (err) {
//             res.redirect('/todo_con/create_con?status=err');
//         } else {
//             //res.redirect('/todo_con/create_con?status=success');
//             res.redirect('/todo_con');
//         }
//     });
// };

exports.findAll_con = (req,res)=>{
    res.locals.deleted = req.query.deleted;
    const ten_cau_thu  = req.query.ten_cau_thu;
    Todo_con.getAll_con(ten_cau_thu,(err,data)=>{
        if(err)
        {
            res.redirect('/500');
        }
        else
        {
            res.render('todo_con/index_con',{todos : data})
        }
    });
}

exports.edit_con = (req, res) => {
    res.locals.status = req.query.status;
    Todo_con.findById_con(req.params.id,(err,data) =>{
        if(err)
        {
            if(err.kind === " not found ")
            {
                res.redirect('/404');
            }
            else
            {
                res.redirect('/505');
            }
        }
        else
        {
            res.render('todo_con/edit_con',{todo_con:data});
        }
    });
};

exports.update_con = (req,res)=>{
    if(!req.body)
    {
        res.redirect('/todo_con/edit_con/' + req.params.id + '?status=error')
    }
    Todo_con.updateById_con(
        req.params.id,
        new Todo_con(req.body),
        (err,data)=>{
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
                res.redirect('/todo_con' /* + req.params.id + '?status=success' */);
            }
        }
    );
};
exports.delete_con = (req, res) => {
    Todo_con.remove_con(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
            return; // Thêm câu lệnh return ở đây
        }
        res.redirect('/todo_con');
    });
};
exports.deleteAll_con = (req,res)=>{
    Todo_con.removeAll((err,data) =>{
        if(err)
        {
            res.redirect('/500');
        }
        else
        {
            res.redirect('/todo_con?deleted=true')
        }
    });
}

// exports.store_con = (req, res) => {
//     const { ten_cau_thu, chieu_cao, luc_sut, type_id } = req.body;
//     const todo_con = new Todo_con({
//         ten_cau_thu,
//         chieu_cao,
//         luc_sut,
//         type_id
//     });
//     create_con(todo_con, (err, data) => {
//         if (err) {
//             res.redirect('/todo_con/create_con?status=err');
//         } else {
//             res.redirect('/todo_con');
//         }
//     });
// };





// exports.create_con = (req, res) => {
//     Todo.find({}, (err, todos) => {
//         if (err) {
//             res.redirect('/todo_con/create_con?status=err');
//         } else {
//             res.render('todo_con/create_con', { todos });
//         }
//     });
// };

// exports.store_con = (req, res) => {
//     const { ten_cau_thu, chieu_cao, luc_sut, type_id } = req.body;
//     const todo_con = {
//         ten_cau_thu,
//         chieu_cao,
//         luc_sut,
//         type_id
//     };
//     Todo_con.create_con(todo_con, (err, data) => {
//         if (err) {
//             res.redirect('/todo_con/create_con?status=err');
//         } else {
//             res.redirect('/todo_con');
//         }
//     });
// };