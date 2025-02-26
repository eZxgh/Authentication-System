const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbName = "login_database";
const charset = "utf8";
const collate = "utf8_polish_ci";
const tableName = "users";

const host = 'localhost';
const port = 3306;
const user = 'root';
const password = '';

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${dbName} 
    DEFAULT CHARACTER SET = ${charset} 
    DEFAULT COLLATE = ${collate}`;

const useQuery = `USE ${dbName}`;

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName}
(
    id INT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(20),
    haslo VARCHAR(255)
)`;

const dbConnection = mysql.createConnection({ 
    host: host, 
    port: port, 
    user: user, 
    password: password,
});

//
async function initializeDatabase() {
    try 
    {
        const connection = await dbConnection;
        console.log("Connection to the MySQL server has been established.");

        connection.query(createDatabaseQuery);
        console.log(`Database ${dbName} has been created (or already exists).`);

        connection.query(useQuery);
        console.log(`Connected to ${dbName} database.`);

        connection.query(createTableQuery);
        console.log(`Table ${tableName} has been created (or already exists)`);
    } catch (err) {
        console.error(`Error in initializeDatabase(): ${err}`);
    } 
}

async function checkLogin(username,password)
{   
    try
    {
        const connection = await dbConnection;

        if(!username || !password)
        {
            return { succes: false, error: "You must provide username and password." };
        }
        
        const selectQuery = `SELECT * FROM ?? WHERE login = ?`;
        
        const [rows] = await connection.query(selectQuery, [tableName,username]);

        if(rows.length === 0)
        {
            return { succes: false, error: `Wrong login data for: ${username}` };
        }

        const storedPassword = rows[0].haslo;

        const isMatch = await bcrypt.compare(password,storedPassword);

        if (isMatch) 
        {
            console.log(`User ${username} logged-in succesfuly.`);
            return { succes: true };
        } 
        else 
        {
            console.log(`Wrong login data for user ${username}.`);
            return { succes: false };
        }
    }
    catch(err)
    {
        console.error(`Error in checkLogin(): ${err}`);
        return { succes: false };
    }
};   

async function registerUser(username,password) 
{
    if(!username || !password)
    {
        return { succes: false, error: "You must provide username and password."};
    }
    
    try
    {
        const connection = await dbConnection;
        const SALT_ROUNDS = 10;

        const checkUser = `SELECT * FROM ?? WHERE login = ?`;
        const [existingUser] = await connection.query(checkUser, [tableName,username]);

        if(existingUser.length > 0)
        {
            return { succes: false, error: `User ${username} already exists.`};
        }

        const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS);

        let insertQuery = `INSERT INTO ?? (login, haslo) VALUES (?, ?)`;
        const formattedQuery = mysql.format(insertQuery, [tableName, username, hashedPassword]);

        const result = await connection.query(formattedQuery);
        console.log(`New user has been added: Login = ${username}`);
        return { succes: true }
    }
    catch(err)
    {
        console.error(`Error in registerUser(): ${err}`);
        return { succes:false };
    }
};

module.exports = {
    initializeDatabase,
    registerUser,
    checkLogin
};
