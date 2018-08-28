import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from '../styles/styles';

class Button extends Component {
    render() {
        const {children, style, textStyle, onPress} = this.props;
        return (
            <View style={styles.baseButtonView}>
                <TouchableOpacity style={[styles.baseButton, style]} onPress={onPress}>
                    <Text style={[styles.baseButtonText, textStyle]}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Button;