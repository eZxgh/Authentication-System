const http = require('http');
const querystring = require('querystring');
const { initializeDatabase, checkLogin, registerUser } = require('./sql/database.js');
const { loadPage } = require('./utils/reader.js');

const PORT = 3003;
const mainPath = __dirname + '/pages/index.html';
const succesPath = __dirname +'/pages/succes.html';
const registerPath = __dirname +'/pages/register.html';

initializeDatabase();

const server1 = http.createServer(async (req,res) => {
    if (req.method === "GET") {
        switch(req.url)
        {
            case "/":
            case "/index.html":
                await loadPage(mainPath, res);
                break;
            case "/register.html":
                await loadPage(registerPath,res);
                break;
            case "/succes.html":
                await loadPage(succesPath,res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Page not found</h1>');
        }
    }
    else if(req.method=="POST")
    {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => 
        {
            const parsedData = querystring.parse(body);
            const { nickname, password } = parsedData;
            
            switch (req.url) {
                case "/register.html":
                    try 
                    {
                        const result = await registerUser(nickname,password);
                        if(result.succes)
                        {
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ message: "Registration successful" }));
                        }
                        else
                        {
                            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ error: result.error || "Registration error" }));
                        }
                    } 
                    catch (err) 
                    {
                        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end(JSON.stringify({ error: "Registration error" }));
                    }
                    break;
                case "/login.html":
                    try 
                    {
                        const result = await checkLogin(nickname,password);
                        if(result.succes)
                        {
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ message: "Login successful" }));
                        }
                        else
                        {
                            res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ error: result.error || "Wrong login data" }));
                        }
                    } 
                    catch (err) 
                    {
                        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                        res.end("Error while logging-in");
                    }
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 - Page not found</h1>');
            }   
        });
    }
    else
    {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("Unexpected method");
    }
});

server1.listen(PORT,() => {
    console.log(`Run: http://localhost:${PORT} in your browser.`);
});
