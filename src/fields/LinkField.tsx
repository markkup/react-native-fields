import React from 'react';
import { StyleSheet } from 'react-native';

import { LinkComponent } from '../lib/LinkComponent';

export interface ILinkFieldProps {
    labelStyle?: any;
    containerStyle?: any;
}

export class LinkField extends React.Component<ILinkFieldProps> {

    public render() {
        return (<LinkComponent
            {...this.props}
            labelStyle={[formStyles.fieldText, this.props.labelStyle]}
            containerStyle={[
                formStyles.fieldContainer,
                formStyles.horizontalContainer,
                this.props.containerStyle]}
        />
        );
    }
}

const formStyles = StyleSheet.create({
    fieldContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#DDDDDD',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 45,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    fieldText: {
        fontSize: 34 / 2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        lineHeight: 32,
        flex: 2,
    },
});
