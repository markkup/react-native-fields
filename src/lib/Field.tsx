import React from 'react';
import { TouchableHighlight, View } from 'react-native';

import { HelpText } from './HelpText';

export interface IFieldProps {
    helpTextComponent?: any;
    helpText?: string;
    onPress?: (event: any) => void;
}

export class Field extends React.Component<IFieldProps> {
    public render() {
        const fieldHelpText =
            this.props.helpTextComponent
            || ((this.props.helpText)
                ? <HelpText text={this.props.helpText} />
                : null);

        if (this.props.onPress) {
            return <TouchableHighlight onPress={this.props.onPress}>
                <View>
                    {this.props.children}
                    {fieldHelpText}
                </View>
            </TouchableHighlight>;
        }
        return (<View>
            {this.props.children}
            {fieldHelpText}
        </View>);
    }
}
