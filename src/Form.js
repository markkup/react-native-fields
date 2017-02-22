import React from "react"
import { FieldGroup } from "./fields/Fields"
import { View } from "react-native"

export class Form extends React.Component {

  constructor(props){
    super();
    this.values = {};
  }

  getValues(){
    return this.values;
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
          onFocus:this._handleFieldFocused.bind(this),
          onChange:isGroup ? this._handleFieldChange.bind(this) : this._handleFieldChange.bind(this, child.ref)
        }
      ));
    }, this);

    return (
      <View style={this.props.style}>
          {wrappedChildren}
      </View>
    );
  }

  _handleFieldFocused(event, inputHandle){
    this.props.onFocus && this.props.onFocus(event, inputHandle);
  }

  _handleFieldChange(field_ref, value){
    this.values[field_ref] = value;
    this.props.onChange && this.props.onChange(this.values);
  }
}
