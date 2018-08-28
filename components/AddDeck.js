import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Button from './Button';
import {styles} from '../styles/styles';
import {requestAddDeck} from '../actions/decks';

class AddDeck extends Component {
    state = {
        text: null,
        error: null,
    };

    validateForm = () => {
        const {text} = this.state;

        if (!text) {
            this.setState({error: 'Please input a name for the deck'});
        } else {
            return true;
        }
    };

    submit = () => {
        const {text} = this.state;
        const {requestAddDeck} = this.props;

        if (this.validateForm()) {
            requestAddDeck(text);

            this.setState({text: null, error: null});
        }
    };

    handleChangeText = (text) => this.setState({text});

    render() {
        const {error, text} = this.state;

        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.containerTop}>
                    <Text style={styles.header}>What is the title of your new deck?</Text>
                    <TextInput
                        placeholder='Deck Title'
                        style={styles.input}
                        maxLength={40}
                        value={text}
                        onChangeText={this.handleChangeText}
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    <Button
                        onPress={this.submit}
                        style={styles.blackButton}
                        textStyle={styles.textWhite}
                    >
                        Create Deck
                    </Button>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestAddDeck: (deck, navigation) => dispatch(requestAddDeck(deck, navigation)),
    navigate: (options) => dispatch(NavigationActions.navigate(options))
});

export default connect(
    null,
    mapDispatchToProps
)(AddDeck);
