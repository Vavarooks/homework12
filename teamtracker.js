var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");
const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employetracker"
});

menue()

function menue() {
    inquirer.prompt([
        {
            type: "list",
            name: "userchoice",
            choices: ["View Employees", "View Deparment", "View Manager", "Add Employee", "Add Deparment","Update Position", "Exit Application"],
            message: "Choose an Option please."
        }
    ]).then(function (reply) {
        switch (reply.userchoice) {
            case "View Employees":
                workerrepots();
                break;
            case "View Deparment":
                drepots();
                break;
            case "View Manager":
                mrepots();
                break;
            case "Add Employee":
                workeradd();
                break;
            case "Add Deparment":
                dadd();
                break;
            case "Update Position":
                updatep();
                break;  
            case "Exit Application":
                console.log("Thank You, Come again.")
                process.exit(0)
        }
    })
}

function workerrepots() {
    var query = "select * from employe;"
    connection.query(query, function (error, result) {
        if (error) throw error;
        console.table(result)
        menue()
    })
}

function drepots() {
    var query = "select * from deparment;"
    connection.query(query, function (error, result) {
        if (error) throw error;
        console.table(result)
        menue()
    })
}

function mrepots() {
    var query = 'select * from positions where title = "Manager"; '
    connection.query(query, function (error, result) {
        if (error) throw error;
        console.table(result)
        menue()
    })
}

function workeradd() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Enter Employee First Name."
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter Employee Last Name."
        },
        {
            type: "list",
            name: "positionid",
            choices: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            message: "Select Employee Id."
        },
        {
            type: "list",
            name: "managerid",
            choices: [1, 2, 3, 4, 5],
            message: "Select a Manager."
        }
    ]).then(function (userinput) {
        connection.query('insert into employe(first_name, last_name, positions_id, manager_id)values(?,?,?,?);',
            [userinput.firstname, userinput.lastname, userinput.positionid, userinput.managerid],
            function (error, result) {
                if (error) throw error;
                console.log("Employee added.", result)
                menue()
            })
    })
}

function dadd() {
    inquirer.prompt([
        {
            type: "input",
            name: "deparmentname",
            message: "Add Deparment."
        },
        
    ]).then(function (userinput) {
        connection.query('insert into deparment(deparmentname) values("?");',
        userinput.deparmentname,
            function (error, result) {
                if (error) throw error;
                console.log("Deparment added.", result)
                menue()
            })
    })
}

function updatep(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeid",
            message: "Enter Employee id."
        },
        {
            type: "list",
            name: "positionid",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            message: "Select Employee Id."
        }     
    ]
    ).then(function (userinput){
        connection.query('update employe set positions_id = ? where id = ?;',
        [userinput.positionid, userinput.employeid],
            function (error, result) {
                if (error) throw error;
                console.log("Deparment added.", result)
                menue()
            })   
    })
}

