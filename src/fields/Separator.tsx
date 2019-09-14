import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface ISeparatorProps {
    containerStyle?: any;
    labelStyle?: any;
    label?: string;
}

export class Separator extends React.Component<ISeparatorProps> {
    public render() {
        return (<View style={[formStyles.separatorContainer, this.props.containerStyle]}>
            {
                (this.props.label) ?
                    <Text style={[formStyles.separator, this.props.labelStyle]}>{this.props.label.toUpperCase()}</Text>
                    : null
            }
        </View>
        );
    }
}

const formStyles = StyleSheet.create({
    form: {

    },
    alignRight: {
        marginTop: 7, position: 'absolute', right: 10,
    },
    separatorContainer: {
        paddingTop: 35,
    },
    separator: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#6D6D72',
        paddingBottom: 7,
    },
    fieldContainer: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 45,
    },
});
