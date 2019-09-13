import React from 'react';
import { Switch, Text, View } from 'react-native';

import { Field } from './Field';

export interface ISwitchComponentProps {
    value?: boolean;
    labelStyle?: any;
    containerStyle?: any;
    switchStyle?: any;
    onChange?: (value: boolean) => void;
    onValueChange?: (value: boolean) => void;
    label?: string;
}

interface IState {
    value?: boolean;
}

export class SwitchComponent extends React.Component<ISwitchComponentProps, IState> {
    constructor(props: ISwitchComponentProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public componentDidUpdate() {
        if (this.props.value && this.props.value !== this.state.value) {
            this.setValue(this.props.value);
        }
    }

    public setValue(value: boolean) {
        this.setState({ value });
        if (this.props.onChange) { this.props.onChange(value); }
        if (this.props.onValueChange) { this.props.onValueChange(value); }
    }

    public handleValueChange(value: boolean) {
        this.setState({ value });
        if (this.props.onChange) { this.props.onChange(value); }
        if (this.props.onValueChange) { this.props.onValueChange(value); }
    }

    public render() {
        return (<Field {...this.props}>
            <View style={[this.props.containerStyle]}
                onLayout={this.handleLayoutChange.bind(this)}>

                <Text style={this.props.labelStyle}>{this.props.label}</Text>
                <Switch
                    onValueChange={this.handleValueChange.bind(this)}
                    style={this.props.switchStyle}
                    value={this.state.value} />
            </View>

        </Field>
        );
    }

    protected handleLayoutChange(e: any) {
        this.setState(e.nativeEvent.layout);
    }
}
