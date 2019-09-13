import React, { ReactNode } from 'react';
import { View } from 'react-native';

export interface IFormProps {
    style?: any;
    onFocus?: (event: any, inputHandle: any) => void;
    onChange?: (values: any) => void;
    children?: ReactNode;
}

export class Form extends React.Component<IFormProps> {

    protected values: any;

    constructor(props: IFormProps) {
        super(props);
        this.values = {};
    }

    public getValues() {
        return this.values;
    }

    public render() {
        const wrappedChildren: any[] = [];

        React.Children.map(this.props.children, (child: any, i: number) => {
            if (!child) {
                return;
            }
            const isGroup = this._isFieldGroup(child);
            wrappedChildren.push(React.cloneElement(child, {
                key: child.ref || child.type + i,
                fieldRef: child.ref,
                ref: child.ref,
                onFocus: this._handleFieldFocused.bind(this),
                onChange: isGroup ? this._handleFieldChange.bind(this) : this._handleFieldChange.bind(this, child.ref),
            }));
        });

        return (
            <View style={this.props.style}>
                {wrappedChildren}
            </View>
        );
    }

    // HACK: until i can figure out a better way to do this
    public _isFieldGroup(child: any) {
        try {
            child.fieldGroup;
            return true;
        } catch (e) {
            return false;
        }
    }

    public _handleFieldFocused(event: any, inputHandle: any) {
        this.props.onFocus && this.props.onFocus(event, inputHandle);
    }

    public _handleFieldChange(fieldRef: string, value: any) {
        this.values[fieldRef] = value;
        this.props.onChange && this.props.onChange(this.values);
    }
}
