import React from 'react';
import { Platform, Text, TextInput, TextInputProps, View } from 'react-native';

import { Field } from './Field.js';

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) { return true; }
    return 'Invalid email';
}

export interface IInputComponentProps extends TextInputProps {
    value?: string;
    height?: number;
    validationFunction?: any;
    onValueChange?: (value: string, isValid: boolean) => void;
    multiline?: boolean;
    iconLeft?: any;
    iconRight?: any;
    underlineColorAndroid?: string;
    placeholderTextColor?: string;
    placeholder?: string;
    inputStyle?: any;
    containerStyle?: any;
    keyboardType?: any;
    onValidation?: (valid: boolean, errors: any) => void;
    label?: string;
    labelStyle?: any;
}

export interface IState {
    value: string;
    labelWidth: number;
    minFieldHeight: number;
    inputHeight: number;
    isValid: boolean;
    width: number;
}

export class InputComponent extends React.Component<IInputComponentProps, IState> {

    protected validationErrors: any[];
    protected valid: boolean = false;

    constructor(props: IInputComponentProps) {
        super(props);

        this.triggerValidation = this.triggerValidation.bind(this);
        this.validate(props.value);
        this.validationErrors = [];
        this.state = {
            labelWidth: 0,
            value: props.value || '',
            minFieldHeight: props.height || 44,
            inputHeight: Math.max(props.height || 44),
            isValid: false,
            width: 1000,
        };
        this.setValue = this.setValue.bind(this);
        this.focus = this.focus.bind(this);
        this.triggerValidation = this.triggerValidation.bind(this);
        this.validate = this.validate.bind(this);
        this.handleLayoutChange = this.handleLayoutChange.bind(this);
        this.handleLabelLayoutChange = this.handleLabelLayoutChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFieldPress = this.handleFieldPress.bind(this);
        this.scrollToInput = this.scrollToInput.bind(this);
    }

    public componentWillMount() {
        if (this.props.value) {
            this._updateValue(this.props.value);
        }
    }

    public setValue(value: string) {
        this._updateValue(value);
    }

    public focus() {
        (this.refs.inputBox as any).focus();
    }

    public render() {
        return (<Field {...this.props}>
            <View
                onLayout={this.handleLayoutChange}
                style={[
                    this.props.containerStyle,

                ]}>
                {(this.props.iconLeft)
                    ? this.props.iconLeft
                    : null
                }
                {(this.props.label)
                    ?
                    <Text style={this.props.labelStyle}
                        onLayout={this.handleLabelLayoutChange}
                        onPress={this.handleFieldPress}
                        suppressHighlighting={true}
                    >{this.props.label}</Text>
                    : null
                }
                <TextInput
                    {...this.props}
                    ref='inputBox'
                    keyboardType={this.props.keyboardType}
                    style={[
                        this.props.inputStyle,
                        { height: this.state.inputHeight },
                    ]}

                    onChange={this.handleChange}
                    onFocus={this.scrollToInput}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor || '#BBB'}
                    underlineColorAndroid={this.props.underlineColorAndroid || 'transparent'}
                    value={this.state.value}
                // width={this.state.width - this.state.labelWidth - (Dims.horzPadding * 2)
                //     - ((this.props.iconRight) ? this.props.iconRight.props.size : 0)
                //     - ((this.props.iconLeft) ? this.props.iconLeft.props.size : 0)
                // }

                />
                {(this.props.iconRight)
                    ? this.props.iconRight
                    : null
                }
            </View>
        </Field>
        );
    }

    protected triggerValidation() {
        this.setState({ isValid: this.validate(this.state.value) });
    }

    protected validate(value: string | undefined) {
        let validationResult: any;
        this.validationErrors = [];

        if (!!this.props.validationFunction) {
            if (this.props.validationFunction.constructor === Array) {
                /*
                validationFunction has to return an object in case of error,
                  true in case of successful validation
                 */
                this.props.validationFunction.map((valFn: any, i: number) => {

                    validationResult = valFn(value, this);
                    if (validationResult === true) {
                        this.valid = (this.valid !== false) ? validationResult : this.valid;
                    } else {
                        this.validationErrors.push(validationResult);
                        this.valid = false;
                    }

                });
            } else {
                validationResult = this.props.validationFunction(value, this);
                if (validationResult === true) {
                    this.valid = true;
                } else {
                    this.validationErrors.push(validationResult);
                    this.valid = false;
                }
            }

        } else
            if (this.props.keyboardType) {
                switch (this.props.keyboardType) {
                    case 'email-address':
                        validationResult = validateEmail(value || '');
                        break;
                }
                if (validationResult === true) {
                    this.valid = true;
                } else {
                    this.validationErrors.push(validationResult);
                    this.valid = false;
                }
            }
        this.props.onValidation && this.props.onValidation(this.valid, this.validationErrors);
        return this.valid;
    }

    protected handleLayoutChange(e: any) {
        if (Platform.OS === 'ios') {
            this.setState(e.nativeEvent.layout);
        }
        // //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    protected handleLabelLayoutChange(e: any) {
        if (Platform.OS === 'ios') {
            const { width } = { ...e.nativeEvent.layout } as any;
            this.setState({ labelWidth: width });
        }
        // //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    protected handleChange(event: any) {
        const value = event.nativeEvent.text;
        const height = event.nativeEvent.contentSize ? event.nativeEvent.contentSize.height : 0;
        this._updateValue(value, height);
    }

    protected _updateValue(value: string, height = 0) {
        this.validate(value);

        this.setState({
            value,
            inputHeight: Math.max(this.state.minFieldHeight, (height && this.props.multiline) ? height : 0),
        });

        if (this.props.onChange) {
            this.props.onChange({ text: value } as any);
        }

        if (this.props.onValueChange) {
            this.props.onValueChange(value, this.valid);
        }
    }

    protected scrollToInput(event: any) {
        // debugger;
        if (this.props.onFocus) {
            // const handle = ReactNative.findNodeHandle(this.refs.inputBox as any);
            this.props.onFocus(
                event,
            );
        }
    }

    protected handleFieldPress(event: any) {
        (this.refs.inputBox as any).focus();
    }
}
