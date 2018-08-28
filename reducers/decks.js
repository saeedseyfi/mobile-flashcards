import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions/decks';

const decks = (state = {}, action) => {
    switch (action.type) { 
    case ADD_CARD: 
        return {
            ...state, 
            [action.deck]: {
                ...state[action.deck],
                questions: [
                    ...state[action.deck].questions,
                    action.card
                ]
            }
        };
    case ADD_DECK:
        return {
            ...state, 
            [action.deck]: {
                title: action.deck,
                questions: [] }
        };
    case RECEIVE_DECKS:
        return {
            ...state,
            ...action.decks
        };
    default: 
        return state;
    }
};

export default decks;