const db = require('./db');
const Todo = require('./todo.model');

const Todo_con = function(todo_con){
    this.ten_cau_thu = todo_con.ten_cau_thu;
    this.chieu_cao = todo_con.chieu_cao;
    this.luc_sut = todo_con.luc_sut;
    this.type_id = todo_con.type_id
};
// Todo_con.create = (newTodo,result) =>{
//     sql.query('insert into todo_con SET ?',newTodo,(err,res)=>{
//         if(err)
//         {
//             console.log("err : ",err);
//             result(err,null);
//             return;
//         }
//         console.log("created todo: ",{id_con});
//         result(null,res);
//     });
// };

Todo_con.create_con = (todo_con, callback) => {
        const sql = 'INSERT INTO todo_con (ten_cau_thu, chieu_cao, luc_sut, type_id,image) VALUES (?, ?, ?, ?,?)';
        const values = [todo_con.ten_cau_thu, todo_con.chieu_cao, todo_con.luc_sut, todo_con.type_id,todo_con.image];
        db.query(sql, values, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    // getAll_con: (callback) => {
    //     let query = "SELECT todo_con.*, todo.title FROM todo_con JOIN todo ON todo_con.id = todo.id";
    //     // if (ten) {
    //     //     query += ` WHERE todo_con.ten_cau_thu LIKE '%${ten}%'`;
    //     // }
    //     db.query(query, (err, results) => {
    //         if (err) {
    //             throw err;
    //         } else {
    //             callback(results);
    //         }
    //     });
    // }
    
};
Todo_con.getAll_con = (ten_cau_thu, result) => {
    let query = "SELECT * FROM todo_con";
    if (ten_cau_thu) {
        query += ` WHERE ten_cau_thu LIKE '%${ten_cau_thu}%'`;
    }
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("todo con: ", res);
        result(null, res);
    });
};

Todo_con.findById_con = (id,result)=>{
    db.query(`SELECT * FROM todo_con WHERE id = ${id}`,(err,res) => {
        if(err)
        {
            console.log("err : ",err);
            result(null,res[0]);
            return;
        }
        if(res.length)
        {
            console.log("found todo_con : ",res[0]);
            result(null,res[0]);
            return;
        }       
        result({kind:"not_found"},null);
    });
};
Todo_con.updateById_con = (id, todo_con, result) => {
    db.query(
        "UPDATE todo_con SET ten_cau_thu = ?, chieu_cao = ?, luc_sut = ?, type_id = ? WHERE id = ?",
        [todo_con.ten_cau_thu, todo_con.chieu_cao, todo_con.luc_sut, todo_con.type_id, id],
        (err, res) => {
            if (err) {
                console.log("err : ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("update todo_con : ", { id: id, ...todo_con });
            result(null, { id: id, ...todo_con });
        }
    );
};

Todo_con.remove_con = (id,result) =>{
    db.query("DELETE FROM todo_con WHERE id = ?",id,(err,res)=>{
        if(err)
        {
            console.log('err : ',err);
            result(err,null);
            return;
        }
        console.log("deleted todo_con width id : ",id);
        result(null, res);// Thêm tham số res ở đây
    });
};
Todo_con.removeAll = result =>{
    db.query("DELETE FROM todo_con",(err,res) =>{
        if(err)
        {
            console.log("err : ",err);
            result(null,err);
        }
    })
}

module.exports = Todo_con;
// Todo_con.getAll_con = (ten,result)=>{
//     let query = "SELECT * FROM todo_con.*, todo.title FROM todo_con JOIN todo ON todo_con.id = todo.id";
//     if(ten)
//     {
//         query += `WHERE todo_con.ten_cau_thu LIKE '%${ten}'`;
//     }
//     db.query(query,(err,res)=>{
//         if(err)
//         {
//             console.log("err :",err);
//             result(null,err);
//             return;
//         }
//         console.log("todo_con :",res);
//         result(null,res);
//     });
// };




// -- Tìm bản ghi cha trong bảng cha
// SELECT * FROM parent WHERE id = 1;

// -- Tạo một bản ghi con mới với các giá trị tương ứng từ bản ghi cha
// INSERT INTO child (name, age, parent_id) 
// SELECT CONCAT(name, ' Jr.'), age, id FROM parent WHERE id = 1;

// -- Cập nhật bản ghi cha để tham chiếu đến bản ghi con mới
// UPDATE parent SET has_child = 1 WHERE id = 1;



// Todo_con.create = (newTodo_con,result) =>{
//     sql.query('insert into todo_con SET ?',newTodo,(err,res)=>{
//         if(err)
//         {
//             console.log("err : ",err);
//             result(err,null);
//             return;
//         }
//         console.log("created todo: ",{id_con});
//         result(null,res);
//     });
// };


