import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FlipCard from 'react-native-flip-card';
import Button from 'components/Button';
import {styles} from 'styles';
import {answerQuestion, restartQuiz} from 'actions/quiz';
import {removeExistingNotification, setNotification} from 'utils/notification';

class QuizScreen extends Component {
    handleCorrectClick = () => {
        this.props.answerQuestion(true);
    };

    handleWrongClick = () => {
        this.props.answerQuestion(false);
    };

    handleRestartQuizClick = () => {
        this.props.restartQuiz();
    };

    handleGoBackClick = () => {
        const {restartQuiz, navigate, deck} = this.props;
        restartQuiz();
        navigate({routeName: 'DeckView', params: {title: deck.title}});
    };

    getScorePercentage = (score, numberOfQuestions) => {
        return Math.round((score / numberOfQuestions) * 100);
    };

    render() {
        const {deck, currentQuestion, score} = this.props;
        const numberOfQuestions = deck.questions.length;
        if (currentQuestion >= numberOfQuestions) {
            const correctPercent = this.getScorePercentage(score, numberOfQuestions);

            removeExistingNotification()
                .then(setNotification);

            return (
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.header}>
                            Correct answer percentage: {correctPercent}%
                        </Text>
                        <Button
                            onPress={this.handleRestartQuizClick}
                            style={styles.blackButton}
                            textStyle={styles.textWhite}
                        >
                            Restart Quiz
                        </Button>
                        <Button
                            onPress={this.handleGoBackClick}
                            style={styles.whiteButton}
                            textStyle={styles.textBlack}
                        >
                            Back to Deck
                        </Button>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.subheader}>{currentQuestion + 1}/{numberOfQuestions}</Text>
                </View>
                <View style={[styles.textContainer]}>
                    <FlipCard
                        style={styles.flipCard}
                        friction={6}
                        perspective={1000}
                        flipHorizontal
                        flipVertical={false}
                        flip={false}
                        clickable
                    >
                        <View style={styles.face}>
                            <Text style={[styles.subheader, styles.flipCardText]}>Question</Text>
                            <Text style={styles.header}>{deck.questions[currentQuestion].question}</Text>
                        </View>
                        <View style={styles.back}>
                            <Text style={[styles.subheader, styles.flipCardText]}>Answer</Text>
                            <Text style={styles.header}>{deck.questions[currentQuestion].answer}</Text>
                        </View>
                    </FlipCard>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        onPress={this.handleCorrectClick}
                        style={styles.greenButton}
                        textStyle={styles.textWhite}
                    >
                        Correct
                    </Button>
                    <Button onPress={this.handleWrongClick}
                            style={styles.redButton}
                            textStyle={styles.textWhite}
                    >
                        Incorrect
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({decks, quiz}, {navigation}) => ({
    deck: decks[navigation.state.params.title],
    currentQuestion: quiz.currentQuestion,
    score: quiz.score
});

const mapDispatchToProps = (dispatch) => ({
    answerQuestion: (answer) => dispatch(answerQuestion(answer)),
    restartQuiz: () => dispatch(restartQuiz()),
    navigate: (options) => dispatch(NavigationActions.navigate(options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizScreen);
