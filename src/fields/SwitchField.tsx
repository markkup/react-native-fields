import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { IFieldProps } from '../lib/Field';
import { SwitchComponent } from '../lib/SwitchComponent';
import Styles, { Color, Dims, TextSize } from '../styles';

export interface ISwitchFieldProps extends IFieldProps {
    containerStyle?: any;
    label?: string;
    labelStyle?: any;
    switchStyle?: any;
}

export class SwitchField extends React.Component<ISwitchFieldProps> {
    public setValue(value: boolean) {
        (this.refs.fieldComponent as any).setValue(value);
    }
    public render() {

        return (<SwitchComponent
            {...this.props}
            ref='fieldComponent'
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
            labelStyle={[
                { color: Color.text },
                Platform.OS === 'ios' ? formStyles.fieldTextIos : formStyles.fieldTextAndroid,
                this.props.labelStyle,
            ]}
            switchStyle={[
                { marginTop: Platform.OS === 'ios' ? 7 : 2 },
                this.props.switchStyle,
            ]}
        />
        );
    }
}

const formStyles = StyleSheet.create({
    fieldContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: 45,
    },
    horizontalContainer: {
        paddingLeft: Dims.horzPadding,
        paddingRight: Dims.horzPadding,
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
});
