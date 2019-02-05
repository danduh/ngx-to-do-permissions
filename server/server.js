// server.js
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './data.json'));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.get('/todos', function (req, res, next) {
    const db = router.db;
    let filter = {};
    if (req.query.completed === 'true') {
        filter = Object.assign(filter, {completed: true})
    }

    let results = db.get('todos').filter(filter).value();

    let completedCount = db.get('todos').filter({completed: true}).size().value();
    let notCompletedCount = db.get('todos').filter({completed: false}).size().value();
    let allCount = db.get('todos').size().value();

    let metadata = {
        completed: completedCount,
        active: notCompletedCount,
        all: allCount
    };

    let response = {
        results: results,
        metadata: metadata
    };
    console.log(metadata);
    res.json(response);
});

server.delete('/todos/deleteCompleted', function (req, res, next) {
    const db = router.db;
    const t = db.get('todos').remove({completed: true}).write();
    const r = db.get('todos').value();

    setTimeout(function () {
        res.json(r)
    }, 600)
});

server.post('/todos/delete-many', function (req, res, next) {
    const ids = req.body.ids;

    const db = router.db;
    for (let id of ids) {
        db.get('todos').remove({id: id}).write();
    }

    const r = db.get('todos').value();

    setTimeout(function () {
        res.json(r)
    }, 600)
});

// server.use(jsonServer.rewriter({
//   '/todos/all': '/todos',
//   '/todos/create': '/todos'
// }))

server.use(router);
server.listen(3000, function () {
    console.log('JSON Server is running')
});
