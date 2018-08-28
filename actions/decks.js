import {AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';

export const ADD_CARD = 'ADD_CARD';
export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

const KEY = 'mobile-flashcards';

export const addCardAndSave = (deck, card) => {
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

export const addDeckAndSave = (deck) => {
    return (dispatch) => {
        AsyncStorage.getItem(KEY)
            .then((item) => {
                const action = item ? 'mergeItem' : 'setItem';

                AsyncStorage[action](KEY, JSON.stringify({
                    [deck]: {
                        title: deck,
                        questions: []
                    },
                })).then(async () => {
                    dispatch(addDeck(deck));
                    dispatch(NavigationActions.navigate({routeName: 'DeckView', params: {title: deck}}));
                });
            });
    };
};

const addDeck = (deck) => ({
    type: ADD_DECK,
    deck: deck,
});

export const loadDecks = () => {
    return dispatch => {
        AsyncStorage.getItem(KEY)
            .then((item) => {
                dispatch(receiveDecks(item ? JSON.parse(item) : null));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks,
    loadedAt: Date.now()
});