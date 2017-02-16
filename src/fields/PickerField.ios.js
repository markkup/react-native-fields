'use strict';

import React from 'react';
import ReactNative from 'react-native';
let { View, StyleSheet, TextInput, Text, PickerIOS} = ReactNative;
import Styles, { Color, Dims } from "../styles"

import {PickerComponent} from '../lib/PickerComponent';

export class PickerField extends React.Component {

  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }

  focus(){
    this.refs.fieldComponent.focus()
  }

  render(){
    return(<PickerComponent
      {...this.props}
      ref="fieldComponent"
      labelStyle={[formStyles.fieldText, this.props.labelStyle]}
      valueStyle = {[formStyles.fieldValue,this.props.valueStyle]}
      valueContainerStyle = {[formStyles.alignRight,
          formStyles.horizontalContainer, this.props.valueContainerStyle]}
      containerStyle={[
        formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle,
      ]}
      onSubmitEditing={this.props.onSubmitEditing}
      />)
    }

  }



let formStyles = StyleSheet.create({
  form:{

  },
  alignRight:{
      marginTop: 7, position:'absolute', right: 10
  },
  noBorder:{
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  fieldsWrapper:{
    // borderTopColor: '#afafaf',
    // borderTopWidth: 1,
  },
  horizontalContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
  },
  fieldContainer:{
    borderTopColor: "#DDDDDD",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
  fieldValue:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight:10,
    paddingTop: 4,
    justifyContent: 'center',

    color: Color.tint
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: 5,
    justifyContent: 'center',
    lineHeight: 32
  }
})
