import React, { Component, ReactNode } from 'react';
import { TextInputProps, View } from 'react-native';

export interface IFieldIconProps extends TextInputProps {
    align: 'left' | 'right';
    icon: ReactNode;
    top?: boolean;
}

export class FieldIcon extends Component<IFieldIconProps> {

    public render() {
        const { icon, align, top = false } = this.props;
        const alignHorzStyle: any =
            align === 'right' ? { marginLeft: 8 } : { marginRight: 8 };
        const alignVertStyle: any =
            top ? { marginTop: 5 } : { marginTop: 1, flexDirection: 'column', justifyContent: 'center' };
        return (
            <View style={[alignHorzStyle, alignVertStyle]}>
                {icon}
            </View>
        );
    }
}
