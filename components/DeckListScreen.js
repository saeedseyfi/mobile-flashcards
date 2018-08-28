import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import Deck from 'components/Deck';
import {loadDecks} from 'actions/decks';
import {styles} from 'styles';

class DeckListScreen extends Component {
    componentDidMount() {
        this.props.loadDecks();
    }

    render() {
        const {decks} = this.props;

        if (Object.keys(decks).length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.subheader}>Please add some decks</Text>
                </View>
            )
        }

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
)(DeckListScreen);