import React, { ReactNode } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

import { Field, IFieldProps } from './Field';
import { FieldIcon } from './FieldIcon';

export interface IFieldComponentProps extends IFieldProps {
    label?: string;
    value?: string;
    left?: ReactNode;
    right?: ReactNode;
    labelStyle?: TextStyle;
    valueStyle?: TextStyle;
    leftStyle?: ViewStyle;
    rightStyle?: ViewStyle;
    height?: number;
    containerStyle?: any;
}

export class FieldComponent extends React.Component<IFieldComponentProps> {

    constructor(props: IFieldComponentProps) {
        super(props);
    }

    public render() {
        const {
            leftStyle = {},
            rightStyle = {},
            label,
            labelStyle,
            value,
            valueStyle,
        } = this.props;

        const left = this.props.left
            ? <View style={[{ flex: 1 }, leftStyle]}>{this.props.left}</View>
            : label ? <Text style={[{ flex: 1 }, labelStyle]}>{label}</Text>
                : null;
        const right = this.props.right
            ? <View style={[{ flex: 1 }, rightStyle]}>{this.props.right}</View>
            : value ? <Text style={[{ flex: 1 }, valueStyle]}>{value}</Text>
                : null;

        return (<Field {...this.props}>
            <View style={[this.props.containerStyle]}>
                {(this.props.iconLeft)
                    ? <FieldIcon align='left' icon={this.props.iconLeft} />
                    : null
                }
                {left}
                {right}
                {(this.props.iconRight)
                    ? <FieldIcon align='right' icon={this.props.iconRight} />
                    : null
                }
            </View>
        </Field >
        );
    }
}
