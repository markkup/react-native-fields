import React from 'react';
import { Text, View } from 'react-native';

import { Field } from './Field';

export interface ILinkComponentProps {
    containerStyle?: any;
    iconLeft?: any;
    iconRight?: any;
    label?: string;
    labelStyle?: any;
}

export class LinkComponent extends React.Component<ILinkComponentProps> {

    constructor(props: ILinkComponentProps) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (<Field {...this.props}>
            <View style={this.props.containerStyle}
                onLayout={this._handleLayoutChange.bind(this)}>

                {(this.props.iconLeft)
                    ? this.props.iconLeft
                    : null
                }
                <Text style={this.props.labelStyle}>
                    {this.props.label}
                </Text>

                {(this.props.iconRight)
                    ? this.props.iconRight
                    : null
                }
            </View>

        </Field>);
    }

    public _handleLayoutChange(e: any) {
        this.setState(e.nativeEvent.layout);
        // e.nativeEvent.layout: {x, y, width, height}}}.
    }
}
