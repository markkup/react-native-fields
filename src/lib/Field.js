import PropTypes from 'prop-types';
import React from "react"
import { HelpText } from "./HelpText"
import { View, StyleSheet, Text, TouchableHighlight} from "react-native"

export class Field extends React.Component{
  render(){
    let fieldHelpText =
      this.props.helpTextComponent
      || ((this.props.helpText)
          ? <HelpText text={this.props.helpText} />
          : null);

    if(this.props.onPress){
      return <TouchableHighlight onPress={this.props.onPress}>
        <View>
          {this.props.children}
          {fieldHelpText}
        </View>
      </TouchableHighlight>
    }
    return (<View>
      {this.props.children}
      {fieldHelpText}
    </View>)
  }
}

Field.propTypes = {
  helpTextComponent: PropTypes.element,
  helpText: PropTypes.string
}
