import React, { ReactNode } from 'react';
import { DatePickerAndroid, StyleSheet, Text, View } from 'react-native';

import { TextSize } from '../styles';
import { Field } from './Field';

export interface IDatePickerComponent {
    value?: Date;
    onChange?: any;
    dateTimeFormat?: (value: Date | undefined, mode?: 'datetime' | 'time') => string;
    onValueChange?: any;
    prettyPrint?: any;
    pickerWrapper?: any;
    mode?: any;
    onPress?: () => void;
    valueStyle?: any;
    labelComponent?: any;
    iconLeft?: any;
    iconRight?: any;
    labelStyle?: any;
    label?: string;
    containerStyle?: any;
    valueContainerStyle?: any;
    minimumDate?: Date | number;
    maximumDate?: Date | number;
}

export interface IState {
    date?: Date;
    isPickerVisible: boolean;
}

export class DatePickerComponent extends React.Component<IDatePickerComponent, IState> {

    constructor(props: IDatePickerComponent) {
        super(props);
        this.state = {
            date: props.value,
            isPickerVisible: false,
        };
    }

    // public componentWillReceiveProps(nextProps: IDatePickerComponent) {
    //     if (this.props.value !== nextProps.value) {
    //         this.setState({ date: nextProps.value });
    //     }
    // }

    public setDate(value: any) {
        this.setState({ date: value });
        this.props.onChange && this.props.onChange(
            (this.props.prettyPrint) ? this.dateTimeFormat(value, this.props.mode) : value);
        this.props.onValueChange && this.props.onValueChange(value);
    }

    public render() {

        const valueString = this.dateTimeFormat(this.state.date, this.props.mode);

        const datePicker = <View
            {...this.props}
        // date={this.state.date || new Date()}
        // onDateChange={this.handleValueChange.bind(this)}
        />;

        const pickerWrapper = React.cloneElement(
            this.props.pickerWrapper || <View />,
            { onHidePicker: () => { this.setState({ isPickerVisible: false }); } },
            datePicker,
        );

        let iconLeft = this.props.iconLeft;
        let iconRight = this.props.iconRight;

        if (iconLeft && iconLeft.constructor === Array) {
            iconLeft = (!this.state.isPickerVisible)
                ? iconLeft[0]
                : iconLeft[1];
        }

        if (iconRight && iconRight.constructor === Array) {
            iconRight = (!this.state.isPickerVisible)
                ? iconRight[0]
                : iconRight[1];
        }

        const labelComponent = (this.props.labelComponent)
            ? this.props.labelComponent
            : <Text style={[formStyles.fieldText, this.props.labelStyle]}>{this.props.label}</Text>;
        return (
            <View>
                <Field {...this.props}
                    ref='inputBox'
                    onPress={() => this.togglePicker()}>
                    <View style={[formStyles.fieldContainer,
                    formStyles.horizontalContainer,
                    this.props.containerStyle]}
                        onLayout={this.handleLayoutChange.bind(this)}>
                        {(iconLeft)
                            ? iconLeft
                            : null
                        }
                        {labelComponent}
                        <View style={[
                            formStyles.alignRight,
                            formStyles.horizontalContainer,
                            this.props.valueContainerStyle,
                        ]}>
                            <Text style={[formStyles.fieldValue, this.props.valueStyle]}>{valueString}</Text>

                            {(iconRight)
                                ? iconRight
                                : null
                            }
                        </View>

                    </View>
                </Field>
                {(this.state.isPickerVisible) ?
                    pickerWrapper : null
                }
            </View>
        );
    }

    protected handleLayoutChange(e: any) {
        this.setState(e.nativeEvent.layout);
    }

    protected handleValueChange(value: Date) {
        this.setState({ date: value });
        this.props.onChange && this.props.onChange(
            (this.props.prettyPrint) ? this.dateTimeFormat(value, this.props.mode) : value);
        this.props.onValueChange && this.props.onValueChange(value);
    }

    protected async togglePicker() {
        try {
            const result = await DatePickerAndroid.open({
                date: this.props.value || new Date(),
                minDate: this.props.minimumDate,
                maxDate: this.props.maximumDate,
            });
            if (result.action !== DatePickerAndroid.dismissedAction) {
                const {
                    year = 0,
                    month = 0,
                    day = 0,
                } = result;
                this.handleValueChange(new Date(year, month, day));
                // Selected year, month (0-11), day
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
        this.props.onPress && this.props.onPress();
    }

    protected dateTimeFormat(value: Date | undefined, mode?: 'datetime' | 'time'): string {

        if (this.props.dateTimeFormat) {
            return this.props.dateTimeFormat(value, mode);
        }

        if (!value) { return ''; }
        let result = '';
        switch (mode) {
            case 'datetime':
                result = value.toLocaleDateString()
                    + ' '
                    + value.toLocaleTimeString();
                break;
            case 'time':
                result = value.toLocaleTimeString();
                break;
            default:
                result = value.toLocaleDateString();
        }
        return result;
    }
}

const formStyles = StyleSheet.create({
    form: {

    },
    alignRight: {
        marginTop: 7, position: 'absolute', right: 10,
    },
    noBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    separatorContainer: {
        // borderTopColor: '#C8C7CC',
        // borderTopWidth: 1,
        paddingTop: 35,
        borderBottomColor: '#C8C7CC',
        borderBottomWidth: 1,

    },
    separator: {

        paddingLeft: 10,
        paddingRight: 10,
        color: '#6D6D72',
        paddingBottom: 7,

    },
    fieldsWrapper: {
        // borderTopColor: '#afafaf',
        // borderTopWidth: 1,
    },
    horizontalContainer: {
        flexDirection: 'row',

        justifyContent: 'flex-start',
    },
    fieldContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 45,
    },
    fieldValue: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        paddingTop: 4,
        justifyContent: 'center',

        color: '#C7C7CC',
    },
    fieldText: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        lineHeight: 32,
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,

    },
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
