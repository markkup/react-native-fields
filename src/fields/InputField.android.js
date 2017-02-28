import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { InputComponent } from "../lib/InputComponent"
import Styles, { Color, Dims } from "../styles"

export class InputField extends Component {

  setValue(value) {
    this.refs.fieldComponent.setValue(value)
  }

  focus() {
    this.refs.fieldComponent.focus()
  }

  render() {
    return(<InputComponent
      {...this.props}

      ref="fieldComponent"
      onValidation={this._handleValidation.bind(this)}
      labelStyle={[formStyles.fieldText, 
        this.props.labelStyle]}
      inputStyle={[formStyles.input,
        (this.props.multiline)?formStyles.multiline:{},
        (this.props.label)?formStyles.textRight:{},
        this.props.style
      ]}
      containerStyle={[formStyles.fieldContainer,
        formStyles.horizontalContainer,
        this.props.containerStyle,
      ]}
      />)
  }

  _handleValidation(isValid, validationErrors) {
    this.valid = isValid;
    this.validationErrors = validationErrors;
  }
}

InputField.propTypes = {
  multiline: React.PropTypes.bool,
  placeholder:React.PropTypes.string,
}

let fieldStyles =StyleSheet.create({
  input:{
    paddingLeft: 10,
    paddingRight: 10,
  },
});

let formStyles = StyleSheet.create({
  textRight: {
    textAlign: "right"
  },
  multiline: {
    lineHeight: 32,
    fontSize: 34/2,
    paddingBottom: 10
  },
  separatorContainer: {
    paddingTop: 35,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  horizontalContainer: {
    paddingLeft: Dims.horzPadding,
    paddingRight: Dims.horzPadding
  },
  fieldContainer: {
    borderTopColor: "#DDDDDD",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "row"
  },
  fieldText: {
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: 5,
    lineHeight: 32
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 34/2
  }
});

