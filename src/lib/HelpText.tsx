import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IHelpTextProps {
    text?: string;
}

export class HelpText extends React.Component<IHelpTextProps> {
    public render() {
        if (!this.props.text) { return null; }
        return (
            <View style={formStyles.helpTextContainer}>
                <Text style={formStyles.helpText}>{this.props.text}</Text>
            </View>
        );
    }
}

const formStyles = StyleSheet.create({
    helpTextContainer: {
        marginTop: 9,
        marginBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,

    },
    helpText: {
        color: '#7a7a7a',
    },
});
