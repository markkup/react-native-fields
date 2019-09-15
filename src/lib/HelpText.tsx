import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Color, Dims } from '../styles';

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
        paddingTop: 9,
        paddingBottom: 25,
        paddingLeft: Dims.horzPadding,
        paddingRight: Dims.horzPadding,
        borderTopColor: Color.border,
        borderTopWidth: Dims.borderWidth,

    },
    helpText: {
        color: Color.help,
    },
});
