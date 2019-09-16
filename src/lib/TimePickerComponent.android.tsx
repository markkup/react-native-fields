import React from 'react';
import { StyleSheet, Text, TimePickerAndroid, TimePickerAndroidOpenOptions, View } from 'react-native';

import { TextSize } from '../styles';
import { Field, IFieldProps } from './Field';
import { FieldIcon } from './FieldIcon';

export interface ITimePickerComponentProps extends IFieldProps {
    date?: Date;
    label?: string;
    dateTimeFormat?: (value: Date | undefined, mode?: 'datetime' | 'date' | 'time') => string;
    onChange?: (value: Date) => void;
    onValueChange?: (value: Date) => void;
    prettyPrint?: boolean;
    options?: TimePickerAndroidOpenOptions;
    containerStyle?: any;
    valueStyle?: any;
    labelStyle?: any;
    valueContainerStyle?: any;
}

interface IState {
    date?: Date;
    isPickerVisible: boolean;
}

export class TimePickerComponent extends React.Component<ITimePickerComponentProps, IState> {
    constructor(props: ITimePickerComponentProps) {
        super(props);
        this.state = {
            date: props.date || new Date(),
            isPickerVisible: false,
        };

    }

    public setTime(date: Date) {
        this.setState({ date });
        if (this.props.onChange) {
            this.props.onChange(date);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(date);
        }
    }

    public render() {
        const timeValue = this.dateTimeFormat(this.state.date);
        return (<View><Field
            {...this.props}
            ref='inputBox'
            onPress={() => this.togglePicker()}>
            <View style={this.props.containerStyle}
                onLayout={this.handleLayoutChange.bind(this)}>
                {(this.props.iconLeft)
                    ? <FieldIcon align='left' icon={this.props.iconLeft} />
                    : null
                }
                <Text style={this.props.labelStyle}>{this.props.label}</Text>
                <View style={this.props.valueContainerStyle}>
                    <Text style={this.props.valueStyle}>
                        {(this.state.date) ? timeValue : '5:44pm'}
                    </Text>
                </View>
                {(this.props.iconRight)
                    ? <FieldIcon align='right' icon={this.props.iconRight} />
                    : null
                }

            </View>
        </Field></View>
        );
    }

    protected async togglePicker() {
        try {
            const result = await TimePickerAndroid.open({ ...this.props.options });
            if (result.action === TimePickerAndroid.timeSetAction) {
                const { hour, minute } = result;
                const date = new Date(0, 0, 0, hour, minute);
                this.handleValueChange(date);
                // Selected year, month (0-11), day
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    protected handleLayoutChange(e: any) {
        this.setState(e.nativeEvent.layout);
        // e.nativeEvent.layout: {x, y, width, height}}}.
    }

    protected handleValueChange(date: Date) {

        this.setState({ date });

        if (this.props.onChange) { this.props.onChange(date); }
        if (this.props.onValueChange) { this.props.onValueChange(date); }
    }

    protected dateTimeFormat(date: Date | undefined): string {

        if (this.props.dateTimeFormat) {
            return this.props.dateTimeFormat(date, 'time');
        }

        if (!date) {
            return '';
        }
        return date.toLocaleTimeString();
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
        borderBottomWidth: 1,
        borderBottomColor: '#C8C7CC',
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
