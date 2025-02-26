const fs = require('fs');
const util = require('util');

const readFileSync = util.promisify(fs.readFile);

async function loadPage(path,res)
{
    try
    {
        const data = await readFileSync(path);
        
        res.statusCode = 200;
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.end(data);
    }
    catch(err)
    {
        res.writeHead(500,{'content-type': 'text/plain; charset=utf-8'});
        res.end("Błąd loadPage(): " + err.message);
        console.error(`Błąd loadPage(): ${err.message}`);
        return;
    }
}

module.exports = {
    loadPage
}

