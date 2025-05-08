const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase, checkLogin, registerUser } = require('./sql/database.js');
const router = require('./routes/router');

const app = express();
const PORT = 3006;

initializeDatabase();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.post('/register', async (req,res) => {
    const { nickname, password } = req.body;
    try
    {
        const result = await registerUser(nickname,password);
        if(result.success)
        {
            res.status(200).json({ message: "Registration successful" });
        }
        else
        {
            res.status(401).json({ error: result.error || "Registration error" });
        }
    } 
    catch(err) 
    {
        res.status(500).json({ error: "Registration error" });
    }
});

app.post('/login', async (req,res) => {
    const { nickname, password } = req.body;
    try
    {
        const result = await checkLogin(nickname,password);
        if(result.success)
        {
            res.status(200).json({ message: "Login successful" });
        }
        else
        {
            res.status(401).json({ error: result.error || "Wrong login data" });
        }
    }
    catch(err)
    {
        res.status(500).json({ error: "Error while logging-in" });
    }
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found</h1>');
});

app.listen(PORT,(err)=> {
    if (err) {
        console.log("Error accured while starting server: ", err.message);
        return;
    }

    console.log(`Run: http://localhost:${PORT} in your browser.`);
})