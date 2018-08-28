export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const RESTART_QUIZ = 'RESTART_QUIZ';
export const QUIZ_RESET = 'QUIZ_RESET';

export const answerQuestion = (answer) => ({
    type: ANSWER_QUESTION,
    answer
});

export const restartQuiz = () => {
    return (dispatch) => {
        dispatch(quizReset());
    };
};

const quizReset = () => ({
    type: QUIZ_RESET
});