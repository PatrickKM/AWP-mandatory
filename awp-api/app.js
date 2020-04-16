/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

/**** Configuration ****/
const appName = "Express API Template"; // Change the name of your server app!
const port = process.env.PORT || 8080; // Pick port 8080 if the PORT env variable is empty.
const app = express(); // Get the express app object.

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/
const questions = [
    {
        id: 1,
        question: "How to add Bootstrap to React?",
        answers: [
            { answerText: "I don't know??", votes: 0},
            { answerText: "Run npm i bootstrap in your project", votes: 0}
            ]},
    {
        id: 2,
        question: "Class vs Functions in React?",
        answers: [
            { id: 1, answerText: "You how state classes but not in Functions", votes: 0},
            { id: 2, answerText: "See answer 1", votes: 0}
    ]}
];

/* HUSK: mongoose laver id som _id */

/**** Routes ****/

// Return all recipes in data
app.get('/api/questions', (req, res) => res.json(questions));

app.get('/api/questions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);
    res.json({msg: "Question added", question: question});
});

// Ask Question
app.post('/api/questions/', (req, res) => {
    const text = req.body.text;
    questions.push({id: Math.floor(Math.random() * 101), question: text, answers: []});
    console.log(text);
    res.json({msg: "Question added", question: text});
});

// PostAnswer
app.post('/api/questions/:id/answers', (req, res) => {
    const id = parseInt(req.params.id);
    const text = req.body.text;
    const question = questions.find(q => q.id === id);
    question.answers.push(text);
    console.log(question);
    res.json({msg: "Answer added", question: question});
});

app.put('/api/questions/:id/answers/:aid', (req, res) => {
    const id = parseInt(req.params.id);
    const answer = answers.find(a => a.id === aid );
    const question = questions.find(q => q.id === id);
    const text = req.body.text;
    question.answers.push(text);
    answer.answers.push(text);
    console.log(question);
    res.json({msg: "Answer added", question: question});
    console.log(answer);
    res.json({msg: "Answer added", answer: answer});
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));