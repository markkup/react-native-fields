import React from 'react';
import { StyleSheet } from 'react-native';

import { DatePickerComponent } from '../lib/DatePickerComponent';
import Styles, { Color, Dims, TextSize } from '../styles';

export interface IDatePickerFieldProps {
    label?: string;
    value?: any;
    labelStyle?: any;
    valueStyle?: any;
    valueContainerStyle?: any;
    containerStyle?: any;
    dateTimeFormat?: any;
    mode?: string;
}

export class DatePickerField extends React.Component<IDatePickerFieldProps> {

    public setDate(date: Date) {
        (this.refs.datePickerComponent as any).setDate(date);
    }

    public render() {
        return (
            <DatePickerComponent
                ref='datePickerComponent'
                {...this.props}
                labelStyle={[{ color: Color.text }, formStyles.fieldText, this.props.labelStyle]}
                valueStyle={[formStyles.fieldValue, { color: Color.tint }, this.props.valueStyle]}
                valueContainerStyle={[formStyles.alignRight,
                formStyles.horizontalContainer, this.props.valueContainerStyle]}
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
            />
        );
    }
}

const formStyles = StyleSheet.create({
    alignRight: {
        marginTop: 7,
        position: 'absolute',
        right: 0,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        justifyContent: 'center',
        lineHeight: 32,
    },
    fieldValue: {
        fontSize: TextSize.normal,
        marginRight: 0,
        paddingTop: 4,
        justifyContent: 'center',
    },
});
