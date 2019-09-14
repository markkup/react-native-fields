import {
    DatePickerField,
    FieldGroup,
    Form,
    InputField,
    PickerField,
    SelectField,
    SwitchField,
    TimePickerField,
    TouchableField,
} from '@markkup/react-native-fields';
import moment from 'moment';
import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default class Fields extends Component {

    protected types: any;

    constructor(props: any) {
        super(props);

        this.types = {
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

                    <FieldGroup ref='fields' title='General Inputs'>

                        <InputField
                            ref='text'
                            placeholder='enter text'
                            label='Field (Input)'
                            returnKeyType='next'
                            onSubmitEditing={() => this.onSubmitEditing('picker')} />

                        <InputField
                            ref='description'
                            multiline={true}
                            style={{ minHeight: 80 }}
                            placeholder='enter description' />

                        <SwitchField
                            ref='switch'
                            label='Field (Switch)' />

                        <SelectField
                            value='123'
                            label='Field (Select)'
                            onPress={() => Alert.alert('select from another screen')} />

                    </FieldGroup>

                    <FieldGroup ref='fields2' title='Picker Fields'>

                        <PickerField
                            ref='picker'
                            label='Field (Picker)'
                            value='Spring'
                            pickerWrapper={<View />}
                            autoclose={true}
                            returnKeyType='next'
                            onSubmitEditing={() => this.onSubmitEditing('description')}
                            options={this.types} />

                        <DatePickerField
                            label='Field (DateTime)'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            mode={'datetime'} />

                        <DatePickerField
                            label='Field (Date)'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            mode={'date'} />

                        <TimePickerField
                            label='Field (Time)'
                            value={new Date()}
                            dateTimeFormat={(value: any, mode: any) => this.formatPicker(value, mode)}
                            mode={'time'} />

                    </FieldGroup>

                    <FieldGroup>

                        <TouchableField
                            onPress={() => this.onSubmit()}
                            text='Submit Form'
                            accessory={false} />

                    </FieldGroup>

                </Form>
            </ScrollView>
        );
    }

    public handleFormChange(data: any) {
        this.setState(data);
    }

    public onSubmitEditing(key: string) {
        // this.refs.form.refs.fields.refs[key].focus();
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
        paddingTop: 20,
    },
});
