import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';

import { Field } from '../lib/Field';

const PickerItem = Picker.Item;

export interface IPickerComponentProps {
    value?: string;
    label?: string;
    autoclose?: boolean;
    onChange?: (value: string) => void;
    onValueChange?: (value: string) => void;
    onFocus?: (event: any, handle: any) => void;
    onPress?: () => void;
    containerStyle?: any;
    labelStyle?: any;
    pickerProps?: any;
    options?: any;
}

interface IState {
    value?: string;
    isPickerVisible: boolean;
}

export class PickerComponent extends React.Component<IPickerComponentProps, IState> {

    constructor(props: IPickerComponentProps) {
        super(props);
        this.state = {
            value: props.value || props.label,
            isPickerVisible: false,
        };
    }

    public setValue(value: string) {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(value);
        }
    }

    public focus() {
        this.setState({ isPickerVisible: true });
    }

    public render() {

        return (<View><Field
            {...this.props}
            ref='inputBox'
            onPress={this.props.onPress}
        >
            <View style={[
                this.props.containerStyle]}
                onLayout={this.handleLayoutChange.bind(this)}>

                <Text style={this.props.labelStyle}>{this.props.label}</Text>
                <Picker ref='picker'
                    {...this.props.pickerProps}
                    selectedValue={this.state.value}
                    onValueChange={this.handleValueChange.bind(this)}
                >
                    {Object.keys(this.props.options).map((value) => (
                        <PickerItem
                            key={value}
                            value={value}
                            label={this.props.options[value]}
                        />
                    ), this)}

                </Picker>

            </View>
        </Field>

        </View>
        );
    }

    protected handleLayoutChange(e: any) {
        this.setState(e.nativeEvent.layout);
        // e.nativeEvent.layout: {x, y, width, height}}}.
    }

    protected handleValueChange(value: string) {

        this.setState({ value: (value && value !== '') ? value : this.props.label });

        if (this.props.onChange) { this.props.onChange(value); }
        if (this.props.onValueChange) { this.props.onValueChange(value); }
        if (this.props.autoclose) { this.togglePicker(); }
    }

    protected scrollToInput(event: any) {
        // if (this.props.onFocus) {
        //     const handle = ReactNative.findNodeHandle(this.refs.inputBox as any);
        //     this.props.onFocus(event, handle);
        // }
        //      this.refs.picker.measure(this.getPickerLayout.bind(this));
    }

    protected togglePicker() {
        // this.setState({isPickerVisible:!this.state.isPickerVisible});
        // this._scrollToInput(event);
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
        fontSize: 34 / 2,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        paddingTop: 4,
        justifyContent: 'center',

        color: '#C7C7CC',
    },
    fieldText: {
        fontSize: 34 / 2,
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
