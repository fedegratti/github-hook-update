const express = require("express");
const childProcess = require('child_process');
const crypto = require('crypto');

const secret = process.env.GITHUB_SECRET_TOKEN;
const prod_branch = 'master';

var app = express();
app.use(express.json())

app.post("/webhooks/github", function (req, res) {
    var branch = req.body.ref;

    // If came from github and prod branch was updated
    if (is_signature_correct(req) && branch.indexOf(prod_branch) > -1) {
        console.log('Updating server...');
        deploy(res);
    }
})

function deploy(res) {
    childProcess.exec('cd ~ && ./update_server.sh', function (err, stdout, stderr) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200)
    });
}

function is_signature_correct(req) {
    var signature = 'sha1=' + crypto.createHmac('sha1', secret).update(JSON.stringify(req.body)).digest('hex');
    return signature === req.headers['x-hub-signature'];
}

app.get("/", function (req, res) {
    res.send('Hello World!')
})

app.listen(3000)
