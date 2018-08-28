import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {styles} from 'styles';
import Button from 'components/Button';

class DeckScreen extends Component {
    render() {
        const {deck, navigate} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.header}>{deck.title}</Text>
                    <Text style={styles.subheader}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        style={styles.whiteButton}
                        textStyle={styles.textBlack}
                        onPress={() => navigate({routeName: 'AddCard', params: {title: deck.title}})}
                    >
                        Add Card
                    </Button>
                    {deck.questions.length > 0 && (
                        <Button
                            style={styles.blackButton}
                            textStyle={styles.textWhite}
                            onPress={() => navigate({routeName: 'QuizView', params: {title: deck.title}})}
                        >
                            Start Quiz
                        </Button>
                    )}
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({decks}, {navigation}) => ({
    deck: decks[navigation.state.params.title]
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (options) => dispatch(NavigationActions.navigate(options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckScreen);