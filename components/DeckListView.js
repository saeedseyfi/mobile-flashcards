import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import Deck from './Deck';
import {loadDecks} from '../actions/decks';

class DeckListView extends Component {
    componentDidMount() {
        this.props.loadDecks();
    }

    render() {
        const {decks} = this.props;

        return (
            <ScrollView style={{padding: 10}}>
                {Object.keys(decks).map((deck) => (
                    <Deck key={deck} {...decks[deck]} />
                ))}
            </ScrollView>
        );
    }
}

const mapStateToProps = ({decks}) => ({
    decks
});

const mapDispatchToProps = (dispatch) => ({
    loadDecks: () => dispatch(loadDecks())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckListView);