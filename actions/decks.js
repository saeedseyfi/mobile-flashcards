import { AsyncStorage } from 'react-native';
import { initialDecksModel } from '../reducers/decks';
import { NavigationActions } from 'react-navigation';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const REQUEST_DECKS = 'REQUEST_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

const KEY = 'flashcards';

export const requestAddCard = (deck, card) => {
    return dispatch => {
        AsyncStorage.getItem(KEY)
            .then((item) => {
                const decks = JSON.parse(item);
                const newQs = [
                    ...decks[deck].questions,
                    card
                ];
                AsyncStorage.mergeItem(KEY, JSON.stringify({
                    [deck]: {
                        questions: newQs
                    }
                })).then(dispatch(addCard(deck, card)));
            });
    };
};


const addCard = (deck, card) => ({
    type: ADD_CARD, 
    deck, 
    card,
});

export const requestAddDeck = (deck) => {
    return (dispatch) => {
        AsyncStorage.getItem(KEY)
            .then((item) => {
                if (!item) {
                    AsyncStorage.setItem(KEY, JSON.stringify({
                        ...initialDecksModel,
                        [deck]: {
                            title: deck,
                            questions: []
                        }, 
                    })).then(async () => {
                        dispatch(addDeck(deck));
                        dispatch(NavigationActions.navigate({ routeName: 'DeckView', params: { title: deck }}));
                    });                    
                }
                else {
                    AsyncStorage.mergeItem(KEY, JSON.stringify({
                        [deck]: {
                            title: deck,
                            questions: []
                        }, 
                    })).then(async () => {
                        dispatch(addDeck(deck));
                        dispatch(NavigationActions.navigate({ routeName: 'DeckView', params: { title: deck }}));
                    });
                }
            });
    };
};

const addDeck = (deck) => ({
    type: ADD_DECK, 
    deck: deck,
});

export const loadDecks = () => {
    return dispatch => {
        dispatch(requestDecks);
        // uncomment to clear storage
        // AsyncStorage.setItem(KEY, JSON.stringify(initialDecksModel));
        AsyncStorage.getItem(KEY)
            .then((item) => {
                if (item) {
                    dispatch(receiveDecks(JSON.parse(item)));
                }
                else {
                    dispatch(receiveDecks(initialDecksModel, null));
                }
            })
            .catch((error) => {
                console.log( error);
            });
    };
};

export const requestDecks = () => ({
    type: REQUEST_DECKS
});

export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS, 
    decks,
    loadedAt: Date.now()
});