import React from "react"
import { View, StyleSheet, TextInput, Text, DatePickerAndroid } from "react-native"
import {Field} from "./Field"
import Styles, { Color, Dims } from "../styles"

export class DatePickerComponent extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      date: props.value ? new Date(props.value) : "",
      isPickerVisible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      this.setState({date: nextProps.value});
    }
  }

  setDate(value){
    this.setState({date:value});
    this.props.onChange && this.props.onChange((this.props.prettyPrint) ? this.props.dateTimeFormat(value, this.props.mode) : value);
    this.props.onValueChange && this.props.onValueChange(value);
  }

  handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};
    this.setState(e.nativeEvent.layout);
  }

  handleValueChange(value){
    this.setState({date:value});
    this.props.onChange && this.props.onChange((this.props.prettyPrint) ? this.props.dateTimeFormat(value, this.props.mode) : value);
    this.props.onValueChange && this.props.onValueChange(value);
  }

  async _togglePicker(event){
    try {

      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.props.date || new Date(),
  minDate:this.props.minimumDate,

        maxDate:this.props.maximumDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.handleValueChange(new Date(year,month,day));
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
    }
    this.props.onPress && this.props.onPress(event);
  }
  
  render(){

    let valueString = this.props.dateTimeFormat(this.state.date, this.props.mode);

    let datePicker= <DatePickerAndroid
      {...this.props}
      date={this.state.date || new Date()}
      onDateChange={this.handleValueChange.bind(this)}
    />

    let pickerWrapper = React.cloneElement(this.props.pickerWrapper,{onHidePicker:()=>{this.setState({isPickerVisible:false})}},datePicker);

    let iconLeft = this.props.iconLeft,
        iconRight = this.props.iconRight;

    if(iconLeft && iconLeft.constructor === Array){
      iconLeft = (!this.state.isPickerVisible)
                  ? iconLeft[0]
                  : iconLeft[1]
    }

    if(iconRight && iconRight.constructor === Array){
      iconRight = (!this.state.isPickerVisible)
                  ? iconRight[0]
                  : iconRight[1]
    }

    let labelComponent = (this.props.labelComponent)
                      ? this.props.labelComponent
                      : <Text style={[formStyles.fieldText, this.props.labelStyle]}>{this.props.label}</Text>
    return (
      <View>
        <Field {...this.props}
          ref='inputBox'
          onPress={this._togglePicker.bind(this)}>
          <View style={[formStyles.fieldContainer,
            formStyles.horizontalContainer,
            this.props.containerStyle]}
            onLayout={this.handleLayoutChange.bind(this)}>
            {(iconLeft)
              ? iconLeft
              : null
            }
            {labelComponent}
            <View style={[formStyles.alignRight, formStyles.horizontalContainer, this.props.valueContainerStyle]}>
              <Text style={[formStyles.fieldValue,this.props.valueStyle]}>{ valueString }</Text>

              {(iconRight)
                ? iconRight
                : null
              }
            </View>

          </View>
        </Field>
        {(this.state.isPickerVisible)?
          pickerWrapper : null
        }
      </View>
    )
  }

}

DatePickerComponent.propTypes = {
  dateTimeFormat: React.PropTypes.func,
  pickerWrapper: React.PropTypes.element,
  prettyPrint: React.PropTypes.bool,
  value: React.PropTypes.instanceOf(Date)
}

DatePickerComponent.defaultProps = {
  pickerWrapper: <View/>,
  dateTimeFormat: (value, mode)=>{
    if(!value) return "";
    let result='';
    switch(mode){
      case 'datetime':
       result = value.toLocaleDateString()
              + ' '
              + value.toLocaleTimeString()
      break;
      case 'time':
        result = value.toLocaleTimeString()
      break;
      default:
        result = value.toLocaleDateString()
    }
    return result;
  }
};

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
  separatorContainer:{
    // borderTopColor: '#C8C7CC',
    // borderTopWidth: 1,
    paddingTop: 35,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,

  },
  separator:{

    paddingLeft: 10,
    paddingRight: 10,
    color: '#6D6D72',
    paddingBottom: 7

  },
  fieldsWrapper:{
    // borderTopColor: '#afafaf',
    // borderTopWidth: 1,
  },
  horizontalContainer:{
    flexDirection: 'row',

    justifyContent: 'flex-start'
  },
  fieldContainer:{
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

    color: '#C7C7CC'
  },
  fieldText:{
    fontSize: 34/2,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    lineHeight: 32
  },
  input:{
    paddingLeft: 10,
    paddingRight: 10,

  },
  helpTextContainer:{
    marginTop:9,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,

  },
  helpText:{
    color: '#7a7a7a'
  }
});
