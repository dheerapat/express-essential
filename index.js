import express from "express";
import data from "./data/mock.json" assert {type: "json"};

const app = express();

const PORT = 3000;

//Using public folder at root
app.use(express.static('public'));

//Using images folder at /img
app.use('/img', express.static('images'))

//GET
app.get('/', (request, response) => {
    response.json(data)
});

//GET with routing parameter
app.get('/class/:id', (request, response) => {
    const studentId = Number(request.params.id);
    const student = data.filter((student) => student.id === studentId);
    response.send(student);
});

//GET - redirect
app.get('/redirect', (request, response) => {
    response.redirect('https://www.linkedin.com')
});

//GET with next()
app.get('/next', (request, response, next) => {
    console.log('response will be send by the next function.');
    next();
}, (request, response) => {
    response.send('I just set up a route with a second callback');
});

//POST
app.post('/create', (request, response) => {
    response.send('This is a POST request at /create');
});

//PUT
app.put('/edit', (request, response) => {
    response.send('This is a PUT request at /edit');
});

//DELETE
app.delete('/delete', (request, response) => {
    response.send('This is a DELETE request at /delete');
});

//Route Chaining
app
    .route('/class')
    .get((request, response) => {
        response.send("retrieve class info");
    })
    .post((request, response) => {
        response.send("create class info");
    })
    .put((request, response) => {
        response.send("update class info");
    });

//GET
// app.get('/class', (request,response) => {
//     response.send("retrieve class info")
// });

//POST
// app.post('/class', (request,response) => {
//     response.send("create class info")
// });

//PUT
// app.put('/class', (request,response) => {
//     response.send("update class info")
// });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});