import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Text, View, ViewPropTypes } from 'react-native';

import { Field } from './Field';

export class SwitchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
  }

  handleLayoutChange(e) {
    let { x, y, width, height } = { ...e.nativeEvent.layout };
    this.setState(e.nativeEvent.layout);
  }

  componentDidUpdate() {
    if (this.props.value && this.props.value !== this.state.value) {
      this.setValue(this.props.value);
    }
  }

  setValue(value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onValueChange) this.props.onValueChange(value);
  }

  handleValueChange(value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(value);
    if (this.props.onValueChange) this.props.onValueChange(value);
  }

  render() {
    return (<Field {...this.props}>
      <View style={[this.props.containerStyle]}
        onLayout={this.handleLayoutChange.bind(this)}>

        <Text style={this.props.labelStyle}>{this.props.label}</Text>
        <Switch
          onValueChange={this.handleValueChange.bind(this)}
          style={this.props.switchStyle}
          value={this.state.value} />
      </View>

    </Field>
    )
  }
}

SwitchComponent.propTypes = {
  labelStyle: PropTypes.any,
  containerStyle: ViewPropTypes.style,
  switchStyle: PropTypes.any
}
