import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {styles} from '../styles/styles';


class Deck extends Component {
    render() {
        const {title, questions, navigate} = this.props;
        return (
            <TouchableOpacity style={styles.deck} onPress={() => navigate({routeName: 'DeckView', params: {title}})}>
                <Text style={styles.deckText}>{title}</Text>
                <Text style={styles.deckText}>{questions.length} Cards</Text>
            </TouchableOpacity>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    navigate: (options) => dispatch(NavigationActions.navigate(options))
});

export default connect(
    null,
    mapDispatchToProps
)(Deck);