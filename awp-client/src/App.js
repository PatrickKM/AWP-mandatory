import React, {Component} from 'react';
import Questions from './Questions';
import Question from './Question';
import { Router } from "@reach/router";
import AskQuestion from "./AskQuestion";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }

    incrementCount = () => {
        this.setState({
            votes: this.state.questions.answers.votes + 1
        });
    };

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const url = "http://localhost:8080/api/questions";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            questions: data
        })
    }

    getQuestion(id) {
        const question = this.state.questions.find(q => q.id === parseInt(id));
        return question;
    }

    async askQuestion(text) {
        console.log("askQuestion", text);
        const url = `http://localhost:8080/api/questions`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
    }

    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `http://localhost:8080/api/questions/${id}/answers`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
    }

    async putVote(id, aid) {
        console.log("putVote", id, aid);
        const url = `http://localhost:8080/api/questions/${id}/answers/${aid}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
        const data = await response.json();
        console.log("Printing the response:", data);
    }

    render() {
        return (
            <>
                <h1>QA</h1>
                <Router>
                    <Questions path="/" data={this.state.questions}></Questions>
                    <Question path="/question/:id"
                              getQuestion={id => this.getQuestion(id)}
                              postAnswer={(id, text) => this.postAnswer(id, text)}
                              putVote={(id, aid) => this.putVote(id, aid)}
                    ></Question>
                    <AskQuestion path="/new" askQuestion={(text) => this.askQuestion(text)}></AskQuestion>
                </Router>
            </>
        );
    }
}

export default App;

