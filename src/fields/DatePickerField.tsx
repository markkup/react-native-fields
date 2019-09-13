import React from 'react';
import { StyleSheet } from 'react-native';

import { DatePickerComponent } from '../lib/DatePickerComponent';
import Styles, { Color, Dims } from '../styles';

export interface IDatePickerFieldProps {
    labelStyle?: any;
    valueStyle?: any;
    valueContainerStyle?: any;
    containerStyle?: any;
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
                labelStyle={[formStyles.fieldText, this.props.labelStyle]}
                valueStyle={[formStyles.fieldValue, { color: Color.tint }, this.props.valueStyle]}
                valueContainerStyle={[formStyles.alignRight,
                this.props.valueContainerStyle]}
                containerStyle={[
                    { borderTopColor: Color.border },
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
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 45,
    },
    fieldText: {
        fontSize: 34 / 2,
        paddingLeft: 0,
        paddingRight: 10,
        marginTop: 5,
        justifyContent: 'center',
        lineHeight: 32,
    },
    fieldValue: {
        fontSize: 34 / 2,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        paddingTop: 4,
        justifyContent: 'center',
    },
});
