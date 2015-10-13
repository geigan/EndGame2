
CREATE DATABASE IF NOT EXISTS EndGame2;
USE EndGame2;

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
SET foreign_key_checks = 1;

CREATE TABLE users
( username varchar(50) NOT NULL,
password varchar(50) NOT NULL,
PRIMARY KEY (username)
);

INSERT INTO users VALUES ('test1','5f4dcc3b5aa765d61d8327deb882cf99');
INSERT INTO users VALUES ('test2','5f4dcc3b5aa765d61d8327deb882cf99');
