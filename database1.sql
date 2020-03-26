drop database if exists employetracker;
create database employetracker;
use employetracker;
create table deparment(id int auto_increment primary key, deparmentname varchar(30) not null);
create table positions(id int auto_increment primary key, title varchar(30) not null, salary decimal, deparment_id int, 
constraint law foreign key(deparment_id) references deparment(id) on delete cascade);
create table employe(id int auto_increment primary key, first_name varchar(30) not null, last_name varchar(30) not null,
positions_id int, manager_id int, constraint jobs foreign key(positions_id) references positions(id));
