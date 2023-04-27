CREATE TABLE IF NOT EXISTS `todo`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) ,
    published BOOLEAN DEFAULT false
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `nodejs_base`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) ,
    published BOOLEAN DEFAULT false
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `users`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    password varchar(255) ,
    email varchar(100) NOT NULL
)
ENGINE = InnoDB DEFAULT CHARSET = utf8;


ALTER TABLE users
add email_verified_at TIMESTAMP

ALTER TABLE todo ADD id_bac1 INTEGER;


CREATE TABLE todo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) ,
  published BOOLEAN DEFAULT false
);

/*  bảng sách */
CREATE TABLE todo_con (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ten_cau_thu	varchar(255),
  chieu_cao int,
  luc_sut varchar(255),
  type_id INT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES todo(id)
);

/*  lien ket 2 bang vs nha */

/* bảng loại sách */
CREATE TABLE book_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) ,
  published BOOLEAN DEFAULT false
);

/*  bảng sách */
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ten_cau_thu	varchar(255),
  chieu_cao int,
  luc_sut varchar(255),
  type_id INT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES book_types(id)
);