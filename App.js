import React, {Component} from 'react';
import {Text} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer
} from 'react-navigation-redux-helpers';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import decksReducer from 'reducers/decks';
import quizReducer from 'reducers/quiz';
import DeckListScreen from 'components/DeckListScreen';
import DeckScreen from 'components/DeckScreen';
import {colors} from 'styles';
import AddCardScreen from 'components/AddCardScreen';
import QuizScreen from 'components/QuizScreen';
import AddDeckScreen from 'components/AddDeckScreen';
import {setNotification} from 'utils/notification';

const TabNavigator = createBottomTabNavigator({
        DeckListView: {
            screen: DeckListScreen,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: () => <Text style={{fontSize: 20}}>🗂</Text>
            },
        },
        AddDeck: {
            screen: AddDeckScreen,
            navigationOptions: {
                tabBarLabel: 'Add New Deck',
                tabBarIcon: () => <Text style={{fontSize: 20}}>➕</Text>
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

const StackNavigator = createStackNavigator({
    Home: {
        screen: TabNavigator,
    },
    DeckView: {
        screen: DeckScreen,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
    AddCard: {
        screen: AddCardScreen,
        navigationOptions: ({navigation}) => ({
            title: `Add card to ${navigation.state.params.title}`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
    QuizView: {
        screen: QuizScreen,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title} quiz`,
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.black,
            },
        }),
    },
});

const navReducer = createNavigationReducer(StackNavigator);

const reducer = combineReducers({
    nav: navReducer,
    decks: decksReducer,
    quiz: quizReducer
});

const reduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

const ReduxifiedApp = reduxifyNavigator(StackNavigator, 'root');

const mapStateToProps = (state) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(ReduxifiedApp);

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, reduxMiddleware),
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
