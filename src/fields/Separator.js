'use strict';

import React from 'react';
let { View, StyleSheet, Text, ViewPropTypes} = require('react-native');
import PropTypes from 'prop-types';

export class Separator extends React.Component{
  render(){
     return(<View style={[formStyles.separatorContainer, this.props.containerStyle]}>
       {
         (this.props.label)?
         <Text style={[formStyles.separator,this.props.labelStyle]}>{this.props.label.toUpperCase()}</Text>
       : null
     }
       </View>
    )
  }
}

Separator.propTypes = {
  labelStyle: PropTypes.any,
  containerStyle: ViewPropTypes.style
}


let formStyles = StyleSheet.create({
  form:{

  },
  alignRight:{
    marginTop: 7, position:'absolute', right: 10
  },
  separatorContainer:{
    paddingTop: 35,
  },
  separator:{
    paddingLeft: 10,
    paddingRight: 10,
    color: '#6D6D72',
    paddingBottom: 7
  },
  fieldContainer:{
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45
  },
});
