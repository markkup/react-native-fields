import {
    DatePickerField,
    Field,
    FieldGroup,
    FieldGutter,
    Form,
    InputField,
    PickerField,
    SwitchField,
    TimePickerField,
} from '@markkup/react-native-fields';
import moment from 'moment';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps { }

interface IState {
    data: {
        text: string,
        description: string;
        switch: boolean;
        picker: string;
    };
}

export default class Fields extends Component<IProps, IState> {

    protected types: any;

    constructor(props: any) {
        super(props);

        this.state = {
            data: {
                text: '',
                description: '',
                switch: false,
                picker: '',
            },
        };

        this.types = {
            ['']: 'None',
            spring: 'Spring',
            summer: 'Summer',
            fall: 'Fall',
            winter: 'Winter',
        };
    }

    public render() {
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>

                <Form ref='form' onChange={(data: any) => this.handleFormChange(data)}>

                    <FieldGroup>
                        <Field
                            onPress={() => Alert.alert('edit profile clicked')}
                            containerStyle={{ padding: 12 }}
                            left={<Image
                                style={{ width: 50, height: 50, marginRight: 10 }}
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxQ-jVQWX2nnN0YgSaL0Es3j_UOYBreelEEHgILB7VzS3puZ5MA' }}
                            />}
                            leftStyle={{ flex: 0 }}
                            right={<View style={{ marginTop: 6 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600' }}>Sarah McKinney</Text>
                                <Text>Senior Market Analyst for Engicorp</Text>
                            </View>}
                            iconRight={<Icon name='ios-arrow-forward' size={20} color='gray' />} />
                    </FieldGroup>

                    <FieldGroup ref='fields' title='General Inputs'>

                        <InputField
                            ref='text'
                            autoFocus={true}
                            placeholder='required'
                            label='Folder Name'
                            returnKeyType='next'
                            iconLeft={<Icon name='ios-folder-open' color='orange' size={32} />}
                            iconRight={
                                this.state.data.text === ''
                                    ? <Icon name='ios-information-circle' color='red' size={22} />
                                    : null}
                            onSubmitEditing={() => this.onSubmitEditing('fields', 'text')} />

                        <Field
                            label='Field'
                            value='Dave Weaver'
                            helpText='A <Field /> component can simply take a label and value. Icons can be specified as well.'
                            iconLeft={<Icon name='ios-color-palette' color='green' size={32} />} />

                        <Field
                            helpText='This is our help text'
                            left={<Text>Custom Field for displaying lots of stuff that should wrap hopefully</Text>}
                            right={<Image
                                style={{ width: 50, height: 50 }}
                                source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
                            />}
                            leftStyle={{ padding: 10 }}
                            rightStyle={{ flex: 0, padding: 10 }}
                            iconLeft={<Icon name='ios-folder-open' color='orange' size={32} />}
                            iconRight={<Icon name='ios-bookmark' color='purple' size={32} />} />

                        <Field
                            left={<Image
                                style={{ width: Dimensions.get('screen').width, height: 120 }}
                                source={{ uri: 'https://cdn.webcorp.com/img/faq/credit-card-cvv.png' }}
                            />}
                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }} />

                        <Field
                            ref='cvc'
                            label='CVC'
                            value='123'
                            valueStyle={{ color: 'rgb(0, 122, 255)' }}
                            onPress={() => Alert.alert('goto another screen to choose CVC')}
                            iconRight={<Icon name='ios-arrow-forward' size={20} color='gray' />}
                            helpText='Look at the back of your credit card for the CVC number.' />

                        <InputField
                            ref='description'
                            iconLeft={<Icon name='ios-create' color='darkgray' size={32} />}
                            multiline={true}
                            style={{ minHeight: 80 }}
                            placeholder='enter description'
                            onSubmitEditing={() => this.onSubmitEditing('fields2', 'picker')} />

                        <SwitchField
                            ref='switch'
                            label='I Like This'
                            iconLeft={
                                this.state.data.switch
                                    ? <Icon name='ios-thumbs-up' color='green' size={32} />
                                    : <Icon name='ios-thumbs-down' color='gray' size={32} />} />

                    </FieldGroup>

                    <FieldGroup ref='fields2' title='Picker Fields'>

                        <PickerField
                            ref='picker'
                            label='Field (Picker)'
                            pickerWrapper={<View />}
                            iconLeft={<Icon name='ios-folder-open' color='orange' size={32} />}
                            iconRight={
                                this.state.data.picker === ''
                                    ? <Icon name='ios-information-circle' color='red' size={22} />
                                    : null}
                            autoclose={true}
                            returnKeyType='next'
                            onSubmitEditing={() => this.onSubmitEditing('fields', 'description')}
                            options={this.types} />

                        <FieldGutter />

                        <DatePickerField
                            ref='datetime'
                            label='DateTime'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            iconLeft={<Icon name='ios-calendar' color='darkgray' size={32} />}
                            mode={'datetime'} />

                        <DatePickerField
                            ref='date'
                            label='Date'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            iconLeft={<Icon name='ios-calendar' color='darkgray' size={32} />}
                            helpText='The <DatePickerField /> can be configured to get Date or DateTime with a formatter to change how the value is formatted.'
                            mode={'date'} />

                        <TimePickerField
                            ref='time'
                            label='Time'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            iconLeft={<Icon name='ios-clock' color='darkgray' size={32} />}
                            mode={'time'} />

                    </FieldGroup>

                    <FieldGroup>

                        <Field
                            label='Submit Form'
                            active
                            onPress={() => this.onSubmit()} />

                    </FieldGroup>

                </Form>
            </ScrollView>
        );
    }

    public handleFormChange(data: any) {
        this.setState({ data });
    }

    public onSubmitEditing(group: string, key: string) {
        const form = this.refs.form as Component<any>;
        if (form) {
            const fields = form.refs[group] as Component<any>;
            if (fields) {
                const field = fields.refs[key] as any;
                if (field) {
                    field.focus();
                }
            }
        }
    }

    public onSubmit() {
        Alert.alert('data', JSON.stringify(this.state));
    }

    public formatPicker(value: any, mode: any) {
        // start date we just make look pretty
        if (mode === 'datetime') {
            return moment(value).format('lll');
        } else if (mode === 'date') {
            return moment(value).format('ll');
        } else if (mode === 'time') {
            return moment(value).format('LT');
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        marginTop: 20,
    },
});
