import {StyleSheet} from 'react-native';

export const colors = {
    white: '#ffffff',
    black: '#000000',
    green: '#008000',
    red: '#b71845',
    gray: '#808080',
};

const fonts = {
    small: 10,
    medium: 20,
    large: 40
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTop: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: fonts.large,
    },
    subheader: {
        fontSize: fonts.medium
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40
    },
    deck: {
        marginTop: 10,
        padding: 30,
        borderBottomWidth: 1,
        borderRadius: 5,
        backgroundColor: colors.gray,
    },
    deckText: {
        fontSize: fonts.medium,
        textAlign: 'center',
        color: colors.white
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    baseButton: {
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 5,
        height: 50,
    },
    baseButtonText: {
        textAlign: 'center',
        fontSize: fonts.medium,
    },
    blackButton: {
        backgroundColor: colors.black,
        borderColor: colors.black,
        borderRadius: 5,
    },
    textBlack: {
        color: colors.black
    },
    whiteButton: {
        backgroundColor: colors.white,
        borderColor: colors.black,
        borderRadius: 5,
        borderWidth: 1
    },
    greenButton: {
        backgroundColor: colors.green,
        borderRadius: 5,
        borderColor: colors.green
    },
    redButton: {
        backgroundColor: colors.red,
        borderColor: colors.red,
        borderRadius: 5,
    },
    textWhite: {
        color: colors.white
    },
    baseButtonView: {
        padding: 5
    },
    input: {
        fontSize: fonts.medium,
        height: 40,
        width: 300,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    flipCard: {
        width: 300,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 10
    },
    flipCardBack: {
        backgroundColor: colors.white,
        position: 'absolute',
        top: 0
    },
    flipCardText: {
        color: colors.red,
        padding: 10
    },
    error: {
        color: colors.red
    }
});
