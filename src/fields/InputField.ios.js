import React from 'react';
import ReactNative from 'react-native';
import {InputComponent} from '../lib/InputComponent';
import Styles, { Color, Dims } from "../styles"

const {StyleSheet} = ReactNative;

export class InputField extends React.Component{

  handleValidation(isValid, validationErrors){
    this.valid = isValid;
    this.validationErrors = validationErrors;
  }

  setValue(value){
    this.refs.fieldComponent.setValue(value)
  }

  focus(){
    this.refs.fieldComponent.focus()
  }

  render(){
    return(<InputComponent
      {...this.props}

      ref='fieldComponent'
      onValidation={this.handleValidation.bind(this)}
      labelStyle={[formStyles.fieldText, this.props.labelStyle]}

      inputStyle={[formStyles.input,
          (this.props.multiline)?formStyles.multiline:{},
          (this.props.label)?formStyles.textRight:{},
          this.props.style
        ]}
      containerStyle={[formStyles.fieldContainer,
            formStyles.horizontalContainer,
            this.props.containerStyle,
          ]}
      />
    )
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
  form:{

  },
  alignRight:{
    marginTop: 7, position:'absolute', right: 10
  },
  textRight:{
    textAlign: 'right'
  },
  multiline:{
    lineHeight: 32,
    fontSize: 34/2,
    paddingBottom:10
  },
  separatorContainer:{
    paddingTop: 35,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  fieldsWrapper:{
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
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 0,
    paddingRight: 10,
    marginTop: 5,
    lineHeight: 32
  },
  input:{
    paddingLeft: 0,
    paddingRight: 0,

  }
});


{/*<View
  onLayout={this.handleLayoutChange.bind(this)}>
  {(this.props.iconLeft)
    ? this.props.iconLeft
    : null
  }
  {(this.props.label)
    ?
    <Text style={formStyles.fieldText}
      onLayout={this.handleLabelLayoutChange.bind(this)}
      onPress={this.handleFieldPress.bind(this)}
      >{this.props.label}</Text>
    : null
  }
  <TextInput
    {...this.props}
    ref='inputBox'
    keyboardType = {this.props.keyboardType}
    style={[formStyles.input,
        (this.props.multiline)?formStyles.multiline:{},
        (this.props.label)?formStyles.textRight:{},
        this.props.style,
        {height: this.state.inputHeight}
      ]}

    onChange={this.handleChange.bind(this)}
    onFocus={this._scrollToInput.bind(this)}
    placeholder={this.props.placeholder}
    value={this.state.value}
    width={this.state.width-this.state.labelWidth
        -((this.props.iconRight)?this.props.iconRight.props.size:0)
        -((this.props.iconLeft)?this.props.iconLeft.props.size:0)
      }

    />
  {(this.props.iconRight)
      ? this.props.iconRight
      : null
    }
</View>*/}
