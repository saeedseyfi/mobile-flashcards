import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import Button from './Button';
import {styles} from '../styles/styles';
import {requestAddCard} from '../actions/decks';

class AddCard extends Component {
    state = {
        question: null,
        answer: null,
        error: null,
    };

    validateForm = () => {
        const {question, answer} = this.state;

        if (!question) {
            this.setState({error: 'Please enter a question'});
        } else if (!answer) {
            this.setState({error: 'Please answer the question'});
        } else {
            return true;
        }
    };

    submit = () => {
        const {deck, navigation, requestAddCard} = this.props;
        const {question, answer} = this.state;

        if (this.validateForm()) {
            requestAddCard(deck.title, {
                question,
                answer
            });

            navigation.goBack();
        }
    };

    handleChangeQuestion = (question) => this.setState({question});

    handleChangeAnswer = (answer) => this.setState({answer});

    render() {
        const {error, question, answer} = this.state;

        return (
            <View style={styles.containerTop}>
                <KeyboardAvoidingView behavior='padding'>
                    <TextInput
                        placeholder='Question'
                        style={styles.input}
                        value={question}
                        onChangeText={this.handleChangeQuestion}
                    />
                    <TextInput
                        placeholder='Answer'
                        style={styles.input}
                        value={answer}
                        onChangeText={this.handleChangeAnswer}
                    />

                    {error && <Text style={styles.error}>{error}</Text>}

                    <Button
                        onPress={this.submit}
                        style={styles.blackButton}
                        textStyle={styles.textWhite}
                    >
                        Create Card
                    </Button>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = ({decks}, {navigation}) => ({
    deck: decks[navigation.state.params.title],
    navigation
});

const mapDispatchToProps = (dispatch) => ({
    requestAddCard: (deck, card) => dispatch(requestAddCard(deck, card))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCard);
