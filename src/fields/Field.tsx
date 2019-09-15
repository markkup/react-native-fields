import React, { Component, ReactNode } from 'react';
import { Platform, StyleSheet, TextInputProps } from 'react-native';

import { IFieldProps as BaseFieldProps } from '../lib/Field';
import { FieldComponent } from '../lib/FieldComponent';
import Styles, { Color, Dims, TextSize } from '../styles';

export interface IFieldProps extends TextInputProps, BaseFieldProps {
    label?: string;
    value?: string;
    left?: ReactNode;
    right?: ReactNode;
    labelStyle?: any;
    valueStyle?: any;
    leftStyle?: any;
    rightStyle?: any;
    containerStyle?: any;
    height?: number;
    active?: boolean;
    onFocus?: () => void;
    onSetValue?: (value: any) => void;
}

export class Field extends Component<IFieldProps> {
    protected valid: any;
    protected validationErrors: any;

    public setValue(value: string) {
        this.props.onSetValue && this.props.onSetValue(value);
    }

    public focus() {
        this.props.onFocus && this.props.onFocus();
    }

    public render() {
        return (<FieldComponent
            {...this.props}
            ref='fieldComponent'
            labelStyle={[
                { color: this.props.active ? Color.tint : Color.text },
                Platform.OS === 'ios' ? formStyles.fieldTextIos : formStyles.fieldTextAndroid,
                this.props.labelStyle,
            ]}
            valueStyle={[
                { color: Color.text },
                Platform.OS === 'ios' ? formStyles.valueTextIos : formStyles.valueTextAndroid,
                this.props.valueStyle,
            ]}
            containerStyle={[
                {
                    borderTopColor: Color.border,
                    backgroundColor: Color.background,
                    borderTopWidth: Dims.borderWidth,
                },
                formStyles.fieldContainer,
                formStyles.horizontalContainer,
                this.props.containerStyle,
            ]}
        />);
    }
}

const formStyles = StyleSheet.create({
    horizontalContainer: {
        paddingLeft: Dims.horzPadding,
        paddingRight: Dims.horzPadding,
    },
    fieldContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fieldTextIos: {
        fontSize: TextSize.normal,
        paddingLeft: 0,
        paddingRight: 10,
        paddingVertical: 12,
        flex: 1,
    },
    fieldTextAndroid: {
        fontSize: TextSize.normal,
        paddingLeft: 0,
        paddingRight: 10,
        marginTop: 5,
        justifyContent: 'center',
        lineHeight: 32,
    },
    valueTextIos: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 0,
        paddingVertical: 12,
        flex: 1,
        textAlign: 'right',
    },
    valueTextAndroid: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 0,
        marginTop: 5,
        justifyContent: 'center',
        lineHeight: 32,
        textAlign: 'right',
    },
});
