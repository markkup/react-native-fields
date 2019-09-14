import React from 'react';
import { StyleSheet } from 'react-native';

import { PickerComponent } from '../lib/PickerComponent';
import Styles, { Color, Dims, TextSize } from '../styles';

export interface IPickerFieldProps {
    label?: string;
    labelStyle?: any;
    valueStyle?: any;
    valueContainerStyle?: any;
    containerStyle?: any;
    onSubmitEditing?: any;
}

export class PickerField extends React.Component<IPickerFieldProps> {

    public setValue(value: any) {
        (this.refs.fieldComponent as any).setValue(value);
    }

    public focus() {
        (this.refs.fieldComponent as any).focus();
    }

    public render() {
        return (<PickerComponent
            {...this.props}
            ref='fieldComponent'
            labelStyle={[
                { color: Color.text },
                formStyles.fieldText,
                this.props.labelStyle]}
            valueStyle={[
                { color: Color.tint },
                formStyles.fieldValue,
                this.props.valueStyle,
            ]}
            valueContainerStyle={[
                formStyles.alignRight,
                this.props.valueContainerStyle,
            ]}
            containerStyle={[
                {
                    borderTopColor: Color.border,
                    backgroundColor: Color.cellBackground,
                    borderTopWidth: Dims.borderWidth,
                },
                formStyles.fieldContainer,
                formStyles.horizontalContainer,
                this.props.containerStyle,
            ]}
            onSubmitEditing={this.props.onSubmitEditing}
        />);
    }
}

const formStyles = StyleSheet.create({
    alignRight: {
        marginTop: 7,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: Dims.horzPadding,
        paddingRight: Dims.horzPadding,
    },
    fieldContainer: {
        justifyContent: 'flex-end',
    },
    fieldValue: {
        fontSize: TextSize.normal,
        justifyContent: 'flex-end',
        paddingTop: 4,
    },
    fieldText: {
        fontSize: TextSize.normal,
        paddingLeft: 0,
        paddingRight: 10,
        paddingVertical: 12,
        flex: 1,
    },
});
