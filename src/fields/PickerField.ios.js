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
      labelStyle={[
        {color: Color.text},
        formStyles.fieldText,
        this.props.labelStyle]}
      valueStyle = {[
        {color: Color.tint},
        formStyles.fieldValue,
        this.props.valueStyle
      ]}
      valueContainerStyle = {[
        formStyles.alignRight,
        this.props.valueContainerStyle
      ]}
      containerStyle={[
        {borderTopColor: Color.border, backgroundColor: Color.cellBackground, borderTopWidth: Dims.borderWidth},
        formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle,
      ]}
      onSubmitEditing={this.props.onSubmitEditing}
      />)
    }

  }

let formStyles = StyleSheet.create({
  alignRight:{
    marginTop: 7
  },
  horizontalContainer:{
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
  },
  fieldContainer:{
    justifyContent: "flex-end"
  },
  fieldValue:{
    fontSize: 34/2,
    justifyContent: 'flex-end',
    paddingTop: 4
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 12,
    flex:1
  }
})
