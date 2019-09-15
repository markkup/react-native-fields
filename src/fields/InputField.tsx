import React, { Component } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';

import { IFieldProps as BaseFieldProps } from '../lib/Field';
import { InputComponent } from '../lib/InputComponent';
import Styles, { Color, Dims, TextSize } from '../styles';

export interface IInputFieldProps extends TextInputProps, BaseFieldProps {
    labelStyle?: any;
    multiline?: boolean;
    label?: string;
    style?: any;
    containerStyle?: any;
    height?: number;
    helpText?: string;
    validationFunction?: any;
}

export class InputField extends Component<IInputFieldProps> {
    protected valid: any;
    protected validationErrors: any;

    public setValue(value: string) {
        (this.refs.fieldComponent as any).setValue(value);
    }

    public focus() {
        (this.refs.fieldComponent as any).focus();
    }

    public render() {
        return (<InputComponent
            {...this.props}
            ref='fieldComponent'
            onValidation={this._handleValidation.bind(this)}
            labelStyle={[
                { color: Color.text },
                formStyles.fieldText,
                this.props.labelStyle,
            ]}
            inputStyle={[
                formStyles.input,
                (this.props.multiline) ? formStyles.multiline : {},
                (this.props.label) ? formStyles.textRight : {},
                this.props.style,
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

    public _handleValidation(isValid: boolean, validationErrors: any[]) {
        this.valid = isValid;
        this.validationErrors = validationErrors;
    }
}

const formStyles = StyleSheet.create({
    textRight: {
        textAlign: 'right',
    },
    multiline: {
        lineHeight: 24,
        fontSize: TextSize.normal,
        paddingBottom: 10,
    },
    horizontalContainer: {
        paddingLeft: Dims.horzPadding,
        paddingRight: Dims.horzPadding,
    },
    fieldContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fieldText: {
        fontSize: TextSize.normal,
        paddingLeft: 0,
        paddingRight: 10,
        marginTop: 5,
        lineHeight: 32,
        flex: 1,
    },
    input: {
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: TextSize.normal,
        flex: 1,
        textAlignVertical: 'top',
    },
});
