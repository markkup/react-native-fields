import React from "react"
import { View, StyleSheet, TextInput, Text, PickerIOS } from "react-native"
import Styles, { Color, Dims } from "../styles"
import { DatePickerComponent } from "../lib/DatePickerComponent"

export class DatePickerField extends React.Component{
  
  setDate(date){
    this.refs.datePickerComponent.setDate(date);
  }
  
  render() {
    return(
      <DatePickerComponent
        ref='datePickerComponent'
        {...this.props}
        labelStyle={[formStyles.fieldText, this.props.labelStyle]}
        valueStyle = {[formStyles.fieldValue, {color:Color.tint}, this.props.valueStyle]}
        valueContainerStyle = {[formStyles.alignRight,
            this.props.valueContainerStyle]}
        containerStyle={[
          {borderTopColor: Color.border},
          formStyles.fieldContainer,
          formStyles.horizontalContainer,
          this.props.containerStyle,
        ]}
      />
    )
  }
}

let formStyles = StyleSheet.create({
  alignRight:{
    marginTop: 7, 
    position: "absolute", 
    right: 0
  },
  horizontalContainer:{
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
  },
  fieldContainer:{
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: 5,
    justifyContent: "center",
    lineHeight: 32
  },
  fieldValue:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight:10,
    paddingTop: 4,
    justifyContent: 'center'
  }
});
