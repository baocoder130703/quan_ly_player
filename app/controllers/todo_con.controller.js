const Todo_con = require("../models/todocon.model");
const Todo = require('../models/todo.model');
const { request } = require("express");
const multer = require('multer');
const fs =  require('fs')
const path = require('path')

const imageDir = __dirname + '/../anh/images';

const imagePath = path.join(__dirname,'../anh/images/1682961547419-anh-nen-ronaldo-volley-768x432.jpg')
const imageContent = fs.readFileSync(imagePath);
//kiểm tra xem thư mục anh/images đã tồn tại hay chưa nếu chưa tồn tại , 
//fs.mkdirSync() được sử dụng để tạo ra việc này
if(!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir,{recursive:true});
}
//sau khi lưu trữ tệp ảnh ,bạn có thể sử dụng đường dẫn tuyệt đối 
// đến thư mục này trong multer để lưu trữ tệp ảnh



// check if image exists in the folder
fs.access(imageDir,(err) =>{
    if(err)
    {
        console.error('cannot access the folder where the photo is stored',err)
    }
    else
    {
        console.log('accessed the folder where the photo are stored')
    }
})



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,imageDir)
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
});
//const upload = multer({storage:storage});
// exports.create_con = (req,res) =>{
//     res.locals.status = req.query.status;
//     res.render('todo_con/create_con');
// }
var upload = multer({
    storage:storage,
    fileFilter:function(req,file, cb)
    {
        console.log(file);
        if(file.mimetype == "image/bmp"||file.mimetype == "image/jpeg"||file.mimetype == "image/gif" || file.mimetype == "image/png"){
            cb(null,true);
        }
        else
        {
            return cb(new Error('only image are allowed'))
        }
    }
}).single('image')
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
    upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
    res.json({ "kq": 0, "errhsg": "A Multer error occurred when uploading" });
    } else if (err) {
    res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading" + err });
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
    console.log("hello");
    console.log(err); // In ra giá trị của biến err
    res.redirect('/todo_con/create_con?status=err');
    } else {
    res.redirect('/todo_con');
    }
    });
    }
    });
    };
    // });
    // if (err) {
    //     console.log("hello")
    //     console.log(err); // In ra giá trị của biến err
    //     res.redirect('/todo_con/create_con?status=err');
    // } 
    // else 
    // {
    // const { ten_cau_thu, chieu_cao, luc_sut, type_id } = req.body;
    // const todo_con = {
    //       ten_cau_thu,
    //       chieu_cao,
    //       luc_sut,
    //       type_id
    // };
    //     if (req.file && req.file.filename) {
    //         todo_con.image = req.file.filename;
    //     }
    //     Todo_con.create_con(todo_con, (err, data) => {
    //         if (err) {
    //             res.redirect('/todo_con/create_con?status=err');
    //         } 
    //         else 
    //         {
    //             res.redirect('/todo_con');
    //         }
    //     });
    // }
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