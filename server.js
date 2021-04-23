var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

// Cookie parser init
app.use(cookieParser());

// Build mappa kiszolgálása automatikusan
app.use('/build', express.static(__dirname + '/build'));

app.get('/', function(req, res) {
    var index = fs.readFileSync('build/index.html', 'utf8');
    console.log( index );
    res.send(index);
});

// Kérések adatainak összegyűjtése
function getRequestBody(req, callBack) {
    var requestData = '';
    req.on('data', function(dataPackage) {
        requestData += dataPackage;
    });
    req.on('end', function() {
        callBack(requestData); 
    });
}

// Bejelentkezés
app.post('/dologin', function(req, res) {
    getRequestBody(req, function(requestData) {
        var serverResponse = {
            'userId': 0,
            'loggedIn': false
        };
        var user = findUser(JSON.parse(requestData));
        if (user !== null) {
            serverResponse.userId = user.id;
            serverResponse.loggedIn = true;
            res.writeHead(200, {
                'Set-Cookie': 'ittoken='+user.token,
                'Content-Type': 'application/json'
            });
        }
        res.end(JSON.stringify(serverResponse));
    });
});

// Felhasználók lekérése
app.get('/users', function(req, res) {
    var user = checkUser(req, res);
    if (user === false) {
        return;
    }
    // res.send(JSON.stringify(getUsers()));
    res.send(getUsers());
});

// Bejelentkezés ellenőrzése
app.get('/checklogin', function(req, res){
    var user = checkUser(req, res);
    if (user === false) { return; }
    var fullResponse = {
        'loggedIn': true,
        'user': user
    };
    res.send(JSON.stringify(fullResponse));
});

// Felhasználók keresésée
function findUser(loginData) {
    var currentUser = null;
    var users = getUsers();
    users = JSON.parse(users);
    for(var k in users) {
        if (users[k].email === loginData.email && users[k].pass === loginData.pass) {
            var d = new Date();
            var token = 'token_' + d.getTime();
            currentUser = users[k];
            currentUser.id = k;
            currentUser.token = token;
            saveSession({
                id: k,
                token: token
            });
        }
    }
    return currentUser;
}

// Userek beolvasása
function getUsers() {
    var users = fs.readFileSync(__dirname + '/json/user.json', 'utf8');
    return users;
}

// User ellenőrzése
function checkUser(req, res) {
    // Munakmenetek kiolvasása
    var sessions = getSessions();
    var users = getUsers();
    users = JSON.parse(users);

    // Felhasználó keresése a cookie alapján
    var cookie = req.cookies.ittoken;
    var user = false;
    for (var k in sessions) {
        if (sessions[k].token === cookie) {
            user = users[sessions[k].id];
        }
    }
    if (user !== false) {
        return user;
    } else {
        var err = {'loggedIn': false};
        res.send(JSON.stringify(err));
        return false;
    }
}

// Felhasználó módosítása
app.post('/user', function(req, res) {
    var user = checkUser(req, res);
    if (!user) { return; }

    getRequestBody(req, function(requestData) {
        // console.log('server:/user', requestData);
        var user = JSON.parse(requestData);
        var users = JSON.parse(getUsers());
        for(var k in users) {
            if ( users[k].email === user.email ) {
                for(var j in user) {
                    users[k][j] = user[j];
                }
            }
        }
        fs.writeFileSync(__dirname + '/json/user.json', JSON.stringify(users));
        res.send(JSON.stringify({'success': true}));
    });
});

// Session beolvasása
function getSessions() {
    var sessions = fs.readFileSync(__dirname + '/json/session.json', 'utf8');
    if (sessions === '') {
        sessions = [];
    } else {
        sessions = JSON.parse(sessions);
    }
    return sessions;
}

// Session mentés
function saveSession(sessionData) {
    var sessions = getSessions();

    // Új munkamenet hozzáadása
    sessions.push(sessionData);
    
    // Adatok visszaírása a fájlba
    fs.writeFileSync(__dirname + '/json/session.json', JSON.stringify(sessions));
}

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});