import React, {Component} from 'react';
import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer
} from 'react-navigation-redux-helpers';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import decks from './reducers/decks';
import quiz from './reducers/quiz';
import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import {colors} from './styles/styles';
import AddCard from './components/AddCard';
import QuizView from './components/QuizView';
import AddDeck from './components/AddDeck';
import {setNotification} from './utilities/notification';

const Tabs = createMaterialTopTabNavigator({
        DeckListView: {
            screen: DeckListView,
            navigationOptions: {
                tabBarLabel: 'Decks',
            },
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'Add New Deck',
            },
        }
    },
    {
        navigationOptions: {
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },

        },
    });

const AppNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            title: `Add card to ${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title} quiz`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
});

const navReducer = createNavigationReducer(AppNavigator);

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const appReducer = combineReducers({
    nav: navReducer,
    decks,
    quiz
});

const reduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = (state) => ({
    state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
    appReducer,
    applyMiddleware(thunkMiddleware, reduxMiddleware, logger),
);

export default class Root extends Component {
    componentDidMount() {
        setNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}
