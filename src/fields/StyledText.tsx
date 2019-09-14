// tslint:disable: max-classes-per-file
import React, { Component } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import Styles, { TextSize } from '../styles';

export class TinyText extends Component<TextProps> {
    public render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.tiny]} />
        );
    }
}

export class SmallText extends Component<TextProps> {
    public render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.small]} />
        );
    }
}

export class RegularText extends Component<TextProps> {
    public render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.regular]} />
        );
    }
}

export class LightText extends Component<TextProps> {
    public render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.light]} />
        );
    }
}

export class BoldText extends Component<TextProps> {
    public render() {
        return (
            <Text {...this.props} style={[this.props.style, styles.bold]} />
        );
    }
}

const styles = StyleSheet.create({
    regular: {
        fontSize: TextSize.normal,
    },
    small: {
        fontSize: TextSize.small,
    },
    tiny: {
        fontSize: TextSize.tiny,
    },
    light: {
        fontWeight: '100',
        fontSize: TextSize.normal,
    },
    bold: {
        fontWeight: '500',
        fontSize: TextSize.normal,
    },
});
