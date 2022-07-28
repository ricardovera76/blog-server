CREATE DATABASE testing;

CREATE TABLE books(section INT, title TEXT , author TEXT);

INSERT INTO books VALUES (1, 'foundation', 'Isaac Asimov');

INSERT INTO books VALUES (2, 'Digital Fortress', 'Dan Brown'),(3, 'World War 2', 'Max Brooks');

CREATE TABLE users(id SERIAL,username TEXT, password TEXT);

INSERT INTO users VALUES (1,'jose', 'jose132'),(2,'jhon', 'jhon132'),(3,'mery', 'mery132');