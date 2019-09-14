import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface IReadMoreProps {
    numberOfLines?: number;
    renderTruncatedFooter?: (arg: () => void) => void;
    renderRevealedFooter?: (arg: () => void) => void;
}

export interface IState {
    measured: boolean;
    shouldShowReadMore: boolean;
    showAllText: boolean;
}

export default class ReadMore extends Component<IReadMoreProps, IState> {

    protected text: Text | null = null;

    constructor(props: IReadMoreProps) {
        super(props);

        this.state = {
            measured: false,
            shouldShowReadMore: false,
            showAllText: false,
        };
    }

    public async componentDidMount() {
        await nextFrameAsync();

        // Get the height of the text with no restriction on number of lines
        const fullHeight = await measureHeightAsync(this.text);
        this.setState({ measured: true });
        await nextFrameAsync();

        // Get the height of the text now that number of lines has been set
        const limitedHeight = await measureHeightAsync(this.text);

        if (fullHeight > limitedHeight) {
            this.setState({ shouldShowReadMore: true });
        }
    }

    public render() {
        const {
            measured,
            showAllText,
        } = this.state;

        const {
            numberOfLines = 3,
        } = this.props;

        return (
            <View>
                <Text
                    numberOfLines={measured && !showAllText ? numberOfLines : 0}
                    ref={text => { this.text = text; }}>
                    {this.props.children}
                </Text>

                {this.maybeRenderReadMore()}
            </View>
        );
    }

    protected handlePressReadMore = () => {
        this.setState({ showAllText: true });
    }

    protected handlePressReadLess = () => {
        this.setState({ showAllText: false });
    }

    protected maybeRenderReadMore() {
        const {
            shouldShowReadMore,
            showAllText,
        } = this.state;

        if (shouldShowReadMore && !showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this.handlePressReadMore);
            }

            return (
                <Text style={styles.button} onPress={this.handlePressReadMore}>
                    Read more
        </Text>
            );
        } else if (shouldShowReadMore && showAllText) {
            if (this.props.renderRevealedFooter) {
                return this.props.renderRevealedFooter(this.handlePressReadLess);
            }

            return (
                <Text style={styles.button} onPress={this.handlePressReadLess}>
                    Hide
        </Text>
            );
        }
    }
}

function measureHeightAsync(component: Text | null): Promise<number> {
    return new Promise((resolve, reject) => {
        if (component) {
            component.measure((x, y, w, h) => {
                resolve(h);
            });
        }
        reject(0);
    });
}

function nextFrameAsync() {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

const styles = StyleSheet.create({
    button: {
        color: '#888',
        marginTop: 5,
    },
});
