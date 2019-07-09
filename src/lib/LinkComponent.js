'use strict';

import React from 'react';
let { View, StyleSheet, Text, ViewPropTypes } = require('react-native');
import {Field} from './Field';
import PropTypes from 'prop-types';


export class LinkComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return(<Field {...this.props}>
        <View style={this.props.containerStyle}
          onLayout={this._handleLayoutChange.bind(this)}>

          {(this.props.iconLeft)
            ? this.props.iconLeft
            : null
          }
          <Text style={this.props.labelStyle}>
            {this.props.label}
          </Text>

            {(this.props.iconRight)
              ? this.props.iconRight
              : null
            }
        </View>

      </Field>)
  }

  _handleLayoutChange(e){
    let {x, y, width, height} = {... e.nativeEvent.layout};
    this.setState(e.nativeEvent.layout);
    //e.nativeEvent.layout: {x, y, width, height}}}.
  }
}

LinkComponent.propTypes = {
  labelStyle: PropTypes.any,
  containerStyle: ViewPropTypes.style
}
