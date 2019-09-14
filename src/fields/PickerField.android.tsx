import React from 'react';
import { StyleSheet } from 'react-native';

import { PickerComponent } from '../lib/PickerComponent';
import { TextSize } from '../styles';

export interface IPickerFieldProps {
    containerStyle?: any;
    pickerStyle?: any;
}

export class PickerField extends React.Component<IPickerFieldProps> {
    public setValue(value: any) {
        (this.refs.fieldComponent as any).setValue(value);
    }
    public render() {
        return (<PickerComponent
            {...this.props}
            ref='fieldComponent'
            pickerProps={{
                style:
                    [
                        formStyles.fieldContainer,
                        this.props.containerStyle,
                        this.props.pickerStyle,
                    ],
            }}
        />);
    }
}

const formStyles = StyleSheet.create({
    fieldContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#C8C7CC',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 45,
    },
    form: {

    },
    alignRight: {
        marginTop: 7, position: 'absolute', right: 10,
    },
    noBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    separatorContainer: {
        paddingTop: 35,
        borderBottomColor: '#C8C7CC',
        borderBottomWidth: 1,
    },
    separator: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#6D6D72',
        paddingBottom: 7,
    },
    fieldsWrapper: {
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    fieldValue: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        paddingTop: 4,
        justifyContent: 'center',
        color: '#C7C7CC',
    },
    fieldText: {
        fontSize: TextSize.normal,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        lineHeight: 32,
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    helpTextContainer: {
        marginTop: 9,
        marginBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
    },
    helpText: {
        color: '#7a7a7a',
    },
});
