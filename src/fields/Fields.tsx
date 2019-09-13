// tslint:disable: max-classes-per-file
import React, { Component, ReactNode } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Styles, { Color, Dims } from '../styles';
import ReadMore from './ReadMore';
import { RegularText, SmallText, TinyText } from './StyledText';

export interface IFieldGroupProps {
    title?: string;
    gutter?: boolean;
    link?: string;
    borderColor?: string;
    linkColor?: string;
    onPressLink?: () => void;
    onFocus?: (event: any, inputHandle: any) => void;
    onChange?: (fieldRef: string, value: any) => void;
    style?: ViewStyle;
    children?: ReactNode;
}

export class FieldGroup extends Component<IFieldGroupProps> {

    protected fieldGroup: boolean;

    constructor(props: IFieldGroupProps) {
        super(props);
        this.fieldGroup = true;
    }

    public render() {
        const {
            title = null,
            gutter = true,
            link = '',
            linkColor = null,
            borderColor = null,
            onPressLink = () => 0,
            style = {},
        } = this.props;

        // if link was passed, create a touchable link
        // on the right side
        let component = null;
        const componentColor = linkColor || Color.tint;
        if (link) {
            component = <TouchableOpacity
                style={styles.fieldGroupHeaderLink}
                onPress={onPressLink}>
                <TinyText
                    style={[styles.fieldGroupHeaderLinkText, { color: componentColor, fontSize: 16 }]}>
                    {link}
                </TinyText>
            </TouchableOpacity>;
        }

        // if a title was passed, create a text header
        // otherwise show a gutter if not explicitly disabled
        let header = null;
        if (title || component) {
            header = (<View style={styles.fieldGroupHeader}>
                <TinyText style={[styles.fieldGroupHeaderText, { color: Color.heading }]}>
                    {!!title && title.toUpperCase()}
                </TinyText>
                {component}
            </View>);
        } else if (gutter) {
            header = (<FieldGutter />);
        } else {
            header = null;
        }

        // propogate our form's handlers to our children fields
        const wrappedChildren: any[] = [];
        React.Children.map(this.props.children, (child: any, i) => {
            if (!child) {
                return;
            }
            wrappedChildren.push(React.cloneElement(child, {
                key: child.ref || child.type + i,
                fieldRef: child.ref,
                ref: child.ref,
                onFocus: this._handleFieldFocused.bind(this),
                onChange: this._handleFieldChange.bind(this, child.ref),
            }));
        });

        const backgroundColor = borderColor || Color.border;

        return (
            <View>
                {header}
                <View style={[styles.fieldGroup, style]}>
                    {wrappedChildren}
                </View>
                <View style={{ height: Dims.borderWidth, backgroundColor }} />
            </View>
        );
    }

    public _handleFieldFocused(event: any, inputHandle: any) {
        this.props.onFocus && this.props.onFocus(event, inputHandle);
    }

    public _handleFieldChange(fieldRef: string, value: any) {
        this.props.onChange && this.props.onChange(fieldRef, value);
    }
}

export interface IFieldProps {
    text?: string;
    value?: string;
    borderColor?: string;
    color?: string;
    colorValue?: string;
    style?: ViewStyle;
}

export class Field extends Component<IFieldProps> {

    public setNativeProps(props: IFieldProps) {
        (this.refs.field as any).setNativeProps(props);
    }

    public render() {
        const {
            text = '',
            value = '',
            borderColor,
            color = '#000',
            colorValue = '#999',
            style = {},
            children,
        } = this.props;

        let contents = null;
        if (children) {
            contents = children;
        } else {
            contents = (
                <View style={{ flexDirection: 'row' }}>
                    <RegularText style={{ color: Color.text, flex: 1 }}>{text}</RegularText>
                    <RegularText style={{ color: colorValue }}>{value}</RegularText>
                </View>
            );
        }
        const backgroundColor = borderColor || Color.border;
        const border = <View style={{ height: Dims.borderWidth, backgroundColor }} />;
        return (
            <View ref={'field'}>
                {border}
                <View style={[styles.field, { backgroundColor: Color.cellBackground }]}>
                    <View style={[styles.fieldBody, style]}>
                        {contents}
                    </View>
                </View>
            </View>
        );
    }
}

export interface IFieldGutterProps {
    height?: number;
}

export class FieldGutter extends Component<IFieldGutterProps> {
    public render() {
        const { height = 15 } = this.props;
        return (
            <View style={{ height }}>
            </View>
        );
    }
}

export interface ISelectFieldProps extends IFieldProps {
    onPress?: () => void;
    text: string;
    value?: string;
    icon?: string;
    iconTint?: string;
    numberOfLines?: number;
}

export class SelectField extends Component<ISelectFieldProps> {

    public render() {
        const {
            iconTint,
            icon,
            onPress = () => 0,
            text,
            numberOfLines = 1,
            value = '',
        } = this.props;

        const tint = Color.tint;
        const accessory = <SimpleLineIcons name='arrow-right' size={12} color={tint} />;
        let iconColor = iconTint;
        if (!iconColor) {
            iconColor = tint;
        }
        let iconComponent = null;
        if (icon) {
            iconComponent = (
                <View>
                    <SimpleLineIcons name={icon} size={20} color={iconColor} style={{ marginRight: 10 }} />
                </View>
            );
        }
        return (
            <TouchableHighlight onPress={onPress}>
                <Field {...this.props}>
                    <View style={styles.touchableContainer}>
                        {iconComponent}
                        <RegularText style={{ color: '#000' }}>{text}</RegularText>
                        <RegularText
                            numberOfLines={numberOfLines}
                            style={{ flex: 1, color: '#999', paddingRight: 10, textAlign: 'right' }}>
                            {value}
                        </RegularText>
                        <View style={{ justifyContent: 'center' }}>
                            {accessory}
                        </View>
                    </View>
                </Field>
            </TouchableHighlight>
        );
    }
}

export interface ITouchableFieldProps extends IFieldProps {
    onPress: () => void;
    tint?: string;
    accessory?: boolean | string | ReactNode;
    icon?: string;
    iconTint?: string;
    value?: string;
    valueTint?: string;
}

export class TouchableField extends Component<ITouchableFieldProps> {

    public render() {
        const {
            tint = Color.tint,
            text = '',
            children,
            accessory,
            icon = '',
            iconTint,
            onPress,
            value = '',
            valueTint = '#999',
        } = this.props;

        let contents: any = (<RegularText style={{ color: tint }}>{text}</RegularText>);
        if (children) {
            contents = children;
        }
        let accessoryComponent = null;
        if (typeof accessory === 'boolean' && accessory === true) {
            accessoryComponent = (<SimpleLineIcons name='arrow-right' size={12} color={tint} />);
        } else if (typeof accessory === 'string') {
            switch (accessory) {
                case 'check': {
                    accessoryComponent = (<MaterialIcons name='check' size={18} color={tint} />);
                    break;
                }
                case 'arrow': {
                    accessoryComponent = (
                        <Ionicons name='ios-arrow-forward' size={20} color='#BBB' style={{ paddingRight: 4 }} />
                    );
                    break;
                }
                case 'bullet': {
                    accessoryComponent = (
                        <Octicons name='primitive-dot' size={12} color={tint} style={{ paddingRight: 0 }} />
                    );
                    break;
                }
            }
        } else if (typeof accessory === 'object') {
            accessoryComponent = accessory;
        }
        let iconColor = iconTint;
        if (!iconColor) {
            iconColor = tint;
        }
        let iconComponent = null;
        if (icon !== '') {
            iconComponent = (
                <View>
                    <SimpleLineIcons name={icon} size={20} color={iconColor} style={{ marginRight: 10 }} />
                </View>
            );
        }
        return (
            <TouchableHighlight onPress={onPress}>
                <Field {...this.props}>
                    <View style={styles.touchableContainer}>
                        {iconComponent}
                        <View style={{ flex: 1 }}>
                            {contents}
                        </View>
                        <View>
                            <RegularText style={{ color: valueTint }}>{value}</RegularText>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            {accessoryComponent}
                        </View>
                    </View>
                </Field>
            </TouchableHighlight>
        );
    }
}

export interface IDescriptionFieldProps extends IFieldProps {
    numberOfLines?: number;
    color?: string;
}

export class DescriptionField extends Component<IDescriptionFieldProps> {
    public render() {
        const { text, numberOfLines = 3, color = Color.text } = this.props;

        return (
            <Field {...this.props}>
                <ReadMore
                    numberOfLines={numberOfLines}
                    renderTruncatedFooter={this.renderTruncatedFooter}
                    renderRevealedFooter={this.renderRevealedFooter}>
                    <SmallText style={[{ color }, styles.fieldText]}>
                        {text}
                    </SmallText>
                </ReadMore>
            </Field>
        );
    }

    protected renderTruncatedFooter = (handlePress: any) => {
        return (
            <TinyText style={{ color: Color.tint, marginTop: 7 }} onPress={handlePress}>
                Read more
      </TinyText>
        );
    }

    protected renderRevealedFooter = (handlePress: any) => {
        return (
            <TinyText style={{ color: Color.tint, marginTop: 7 }} onPress={handlePress}>
                Show less
      </TinyText>
        );
    }
}

const styles = StyleSheet.create({
    field: {
        backgroundColor: '#fff',
    },
    fieldGroup: {

    },
    fieldBody: {
        paddingVertical: 12,
        paddingHorizontal: Dims.horzPadding,
    },
    fieldGroupHeader: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: Dims.horzPadding,
        paddingBottom: 5,
        height: 20,
    },
    fieldGroupHeaderText: {
        flex: 1,
        fontSize: 8,
    },
    fieldGroupHeaderLink: {
        paddingHorizontal: Dims.horzPadding,
    },
    fieldGroupHeaderLinkText: {
    },
    fieldAction: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fieldActionLabel: {
        flex: 1,
        paddingHorizontal: 12,
    },
    fieldText: {
        fontSize: 14,
    },
    fieldActionSubtitleText: {
        fontSize: 12,
        marginTop: -1,
        color: '#9E9E9E',
    },
    touchableContainer: {
        flexDirection: 'row',
        paddingTop: 0,
    },
    imageLoadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 125,
        marginVertical: 10,
    },
    instagramContainer: {
        minHeight: 125,
        marginRight: -20,
    },
    instagramImage: {
        width: 125,
        height: 125,
        marginVertical: 0,
        marginHorizontal: 0,
        marginRight: 10,
        borderRadius: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#eee',
    },
});
