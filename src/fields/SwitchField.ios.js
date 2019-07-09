import React from "react"
import { View, StyleSheet, Text, Switch} from "react-native"
import { SwitchComponent } from "../lib/SwitchComponent"
import Styles, { Color, Dims } from "../styles"

export class SwitchField extends React.Component{
  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }
  render(){

    return(<SwitchComponent
      {...this.props}
      ref='fieldComponent'
      containerStyle={[
        {borderTopColor: Color.border, backgroundColor: Color.cellBackground, borderTopWidth: Dims.borderWidth},
        formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle
      ]}
      labelStyle = {[
        {color: Color.text},
        formStyles.fieldText,
        this.props.labelStyle
      ]}
      switchStyle={[
        {marginTop: 7, position:'absolute', right: 15},
        this.props.switchStyle
      ]}
      />
    )
  }
}

let formStyles = StyleSheet.create({
  fieldContainer:{
    justifyContent: "center"
  },
  horizontalContainer:{
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding,
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    paddingVertical: 12,
    flex:1
  }
})
