import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

// Injection test data
const question = {
    id: 3,
    question: "How do I return the response from an Observable in Angular 2?",
    answers: [
        {id: 20, answerText: "Observables are lazy so you have to subscribe to get the value.", votes: 5},
        {id: 22, answerText: "You can use asyncPipe", votes: 2},
    ]
};

it('renders the actual question', () => {
    const comp = <Question getQuestion={id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.text)).toBeInTheDocument();
});

it('renders all answers for a Question', () => {
    const comp = <Question getQuestion={id => question}/>
    const {getByText, getByLabelText} = render(comp);
    expect(getByText(question.answers[0].text)).toBeInTheDocument();
    expect(getByText(question.answers[1].text)).toBeInTheDocument();
});

it('calls "putVote" when the voting button is clicked', () => {
    const putVote = jest.fn();
    const comp =
        <Question
            getQuestion={id => question}
            putVote={putVote}
        />
    const {getAllByText} = render(comp);
    fireEvent.click(getAllByText(/votes/i)[0]);
    expect(putVote).toHaveBeenCalled();
});