CREATE TABLE categories (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(50)
);

CREATE TABLE todo (
  product_id INT PRIMARY KEY,
  title	varchar(255),
  description varchar(255),
  published	tinyint(1),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE todo (
  id_bac1 INT PRIMARY KEY,
  title VARCHAR(50),
  description varchar(255),
  published tinyint(1)
);

CREATE TABLE todocon (
  id_con INT PRIMARY KEY,
  id_bac1 INT,
  ten_cau_thu	varchar(255),
  chieu_cao int,
  luc_sut varchar(255),
  FOREIGN KEY (id_cha) REFERENCES todo(id_cha)
);
