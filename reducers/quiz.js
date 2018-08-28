import { ANSWER_QUESTION, QUIZ_RESET } from '../actions/quiz';

const initialModel = {
    currentQuestion: 0,
    score: 0,
};

const quiz = (state = initialModel, action) => {
    switch (action.type) { 
    case ANSWER_QUESTION: 
        return {
            ...state,
            currentQuestion: state.currentQuestion + 1,
            score: action.answer ? state.score + 1 : state.score
        };
    case QUIZ_RESET:
        return initialModel;
    default: 
        return state;
    }
};

export default quiz;