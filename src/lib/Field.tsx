import React, { Fragment } from 'react';
import { TouchableHighlight, View } from 'react-native';

import { HelpText } from './HelpText';

export interface IFieldProps {
    helpTextComponent?: any;
    helpText?: string;
    onPress?: () => void;
    iconLeft?: any;
    iconRight?: any;
}

export class Field extends React.Component<IFieldProps> {
    public render() {
        const fieldHelpText =
            this.props.helpTextComponent
            || ((this.props.helpText)
                ? <HelpText text={this.props.helpText} />
                : null);

        if (this.props.onPress) {
            return (
                <Fragment>
                    <TouchableHighlight onPress={this.props.onPress}>{this.props.children}</TouchableHighlight>
                    {fieldHelpText}
                </Fragment>
            );
        }
        return (<View>
            {this.props.children}
            {fieldHelpText}
        </View>);
    }
}
