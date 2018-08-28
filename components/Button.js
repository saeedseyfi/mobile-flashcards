import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from 'styles';

const Button = ({children, style, textStyle, onPress}) => {
    return (
        <View style={styles.baseButtonView}>
            <TouchableOpacity style={[styles.baseButton, style]} onPress={onPress}>
                <Text style={[styles.baseButtonText, textStyle]}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;