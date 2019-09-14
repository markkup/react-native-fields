import React from 'react';
import { DatePickerIOS, StyleSheet, Text, View } from 'react-native';

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
    minimumDate?: Date;
    maximumDate?: Date;
    minuteInterval?: any;
    timeZoneOffsetInMinutes?: number;
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

    public componentWillReceiveProps(nextProps: IDatePickerComponent) {
        if (this.props.value !== nextProps.value) {
            this.setState({ date: nextProps.value });
        }
    }

    public setDate(value: Date) {
        this.setState({ date: value });
        this.props.onChange && this.props.onChange(
            (this.props.prettyPrint) ? this.dateTimeFormat(value, this.props.mode) : value);
        this.props.onValueChange && this.props.onValueChange(value);
    }

    public render() {
        const {
            maximumDate,
            minimumDate,
            minuteInterval,
            mode,
            timeZoneOffsetInMinutes,
        } = this.props;

        const valueString = this.dateTimeFormat(this.state.date, this.props.mode);

        const datePicker = <DatePickerIOS
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            minuteInterval={minuteInterval}
            mode={mode}
            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
            date={this.state.date || new Date()}
            onDateChange={this.handleValueChange.bind(this)}
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

    protected togglePicker() {
        this.setState({ isPickerVisible: !this.state.isPickerVisible });
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
        marginRight: 10,
        paddingTop: 4,
        justifyContent: 'center',

        color: '#C7C7CC',
    },
    fieldText: {
        fontSize: TextSize.normal,
        paddingLeft: 0,
        paddingRight: 10,
        marginTop: 5,
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
