var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require("console.table");
const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employetracker"
  });

inquirer.prompt([
    {
        type: "list",
        name: "userchoice",
        choices: ["View Employees", "View Deparment", "View Manager", "Add Employee", "Add Deparment","Add Manager"],
        message: "Choose an Option please."
    }
]).then(function(reply){
    switch(reply.userchoice){
        case "View Employees":
            workerrepots();
    }
})

  
// function(workerrepots(){

// })