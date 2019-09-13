import React from 'react';
import { Picker, Text, View } from 'react-native';

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
    onSubmitEditing?: (event: any) => void;
    containerStyle?: any;
    labelStyle?: any;
    pickerProps?: any;
    options?: any;
    iconLeft?: any;
    iconRight?: any;
    pickerWrapper?: any;
    valueContainerStyle?: any;
    valueStyle?: any;
}

interface IState {
    value?: string;
    isPickerVisible: boolean;
}

export class PickerComponent extends React.Component<IPickerComponentProps, IState> {

    constructor(props: IPickerComponentProps) {
        super(props);
        this.state = {
            value: props.value,
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
        const picker = <Picker ref='picker'
            {...this.props.pickerProps}
            style={{ backgroundColor: 'white' }}
            selectedValue={this.state.value}
            onValueChange={this.handleValueChange.bind(this)}
            mode='dropdown'
        >
            {Object.keys(this.props.options).map((value) => (
                <PickerItem
                    key={value}
                    value={value}
                    label={this.props.options[value]}
                />
            ), this)}

        </Picker>;
        const pickerWrapper = React.cloneElement(this.props.pickerWrapper, {
            onHidePicker: () => {
                this.setState({ isPickerVisible: false });
            },
        }, picker);
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
        return (<View><Field
            {...this.props}
            ref='inputBox'
            onPress={this.togglePicker.bind(this)}>
            <View style={[
                this.props.containerStyle,
            ]}
                onLayout={this.handleLayoutChange.bind(this)}>
                {(iconLeft)
                    ? iconLeft
                    : null
                }
                <Text style={this.props.labelStyle}>{this.props.label}</Text>
                <View style={this.props.valueContainerStyle}>
                    <Text style={this.props.valueStyle}>
                        {(this.state.value) ? this.props.options[this.state.value] : ''}
                    </Text>

                </View>
                {(this.props.iconRight)
                    ? this.props.iconRight
                    : null
                }

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
        // e.nativeEvent.layout: {x, y, width, height}}}.
    }

    protected handleValueChange(value: string) {

        this.setState({ value: (value && value !== '') ? value : this.props.label });

        if (this.props.onChange) { this.props.onChange(value); }
        if (this.props.onValueChange) { this.props.onValueChange(value); }
        if (this.props.autoclose) { this.togglePicker({}); }
    }

    protected scrollToInput(event: any) {
        // if (this.props.onFocus) {
        //     const handle = ReactNative.findNodeHandle(this.refs.inputBox as any);
        //     this.props.onFocus(event, handle);
        // }
        //      this.refs.picker.measure(this.getPickerLayout.bind(this));
    }

    protected togglePicker(event: any) {
        this.setState({ isPickerVisible: !this.state.isPickerVisible });
        this.props.onPress && this.props.onPress();
        if (this.state.isPickerVisible && this.props.onSubmitEditing) {
            this.props.onSubmitEditing(event);
        }
    }
}
