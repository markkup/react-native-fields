import React from 'react';
import { FieldGroup } from "./fields/Fields"
let { View, TextInput,
  StyleSheet,
  ScrollView,
  Text,
  SliderIOS,
  TouchableWithoutFeedback
} = require('react-native');

// import {Separator} from './fields/Separator';

export class Form extends React.Component{
  constructor(props){
    super();

    this.values = {};

  }

  handleFieldFocused(event, inputHandle){
    this.props.onFocus && this.props.onFocus(event, inputHandle);
  }
  handleFieldChange(field_ref, value){
    this.values[field_ref] = value;
    this.props.onChange && this.props.onChange(this.values);
  }
  getValues(){
    return this.values;
  }

  underscoreToSpaced(str){
    var words = str.split('_');
    var res=[];
    words.map(function(word, i){
      res.push(word.charAt(0).toUpperCase() + word.slice(1));
    })

    return res.join(' ');
  }

  render(){
    let wrappedChildren = [];

    React.Children.map(this.props.children, (child, i)=> {
      if (!child) {
        return;
      }
        var isGroup = child.type.name == "FieldGroup";
        wrappedChildren.push(React.cloneElement(child, {
          key: child.ref || child.type+i,
          fieldRef : child.ref,
          ref: child.ref,
          onFocus:this.handleFieldFocused.bind(this),
          onChange:isGroup ? this.handleFieldChange.bind(this) : this.handleFieldChange.bind(this, child.ref)
        }
      ));
    }, this);

    return (
      <View style={this.props.style}>
          {wrappedChildren}
      </View>
    );
  }
}
