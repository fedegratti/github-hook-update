var express = require("express");
var app = express();
var childProcess = require('child_process');
var githubUsername = 'fedegratti'

app.use(express.json())

app.post("/webhooks/github", function (req, res) {
    var sender = req.body.sender;
    var branch = req.body.ref;

    if (branch.indexOf('master') > -1 && sender.login === githubUsername) {
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

app.get("/", function (req, res) {
    res.send('Hello World!')
})

app.listen(3000)
