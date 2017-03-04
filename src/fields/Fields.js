import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Image } from "react-native"
import { RegularText, BoldText, SmallText } from "./StyledText"
import ReadMore from "./ReadMore"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Octicons from "react-native-vector-icons/Octicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Styles, { Color, Dims } from "../styles"

export class FieldGroup extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    gutter: React.PropTypes.bool,
    link: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    linkColor: React.PropTypes.string,
    onPressLink: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func
  }

  static defaultProps = {
    title: null,
    gutter: true,
    link: "",
    linkColor: Color.tint,
    onPressLink: () => {},
    onFocus: () => {},
    onChange: () => {}
  }

  constructor() {
    super();
    this.fieldGroup = true;
  }

  render() {
    // if link was passed, create a touchable link
    // on the right side
    let link = null;
    if (this.props.link) {
      link = <TouchableOpacity 
          style={styles.fieldGroupHeaderLink}
          onPress={() => {}}>
          <Text
            style={[styles.fieldGroupHeaderLinkText, {color:this.props.linkColor}]}>
            {this.props.link}
          </Text>
        </TouchableOpacity>
    }

    // if a title was passed, create a text header
    // otherwise show a gutter if not explicitly disabled
    let header = null;
    if (this.props.title || this.props.link) {
        header = (<View style={styles.fieldGroupHeader}>
          <SmallText style={styles.fieldGroupHeaderText}>
            {this.props.title.toUpperCase()}
          </SmallText>
          {link}
        </View>)
    }
    else if (this.props.gutter) {
      header = (<FieldGutter />)
    }
    else {
      header = null;
    }

    // propogate our form's handlers to our children fields
    let wrappedChildren = [];
    React.Children.map(this.props.children, (child, i)=> {
      if (!child) {
        return;
      }
      wrappedChildren.push(React.cloneElement(child, {
        key: child.ref || child.type+i,
        fieldRef : child.ref,
        ref: child.ref,
        onFocus:this._handleFieldFocused.bind(this),
        onChange:this._handleFieldChange.bind(this, child.ref)
      }))
    }, this)

    return (
      <View>
        {header}
        <View style={[styles.fieldGroup, this.props.style]}>
          {wrappedChildren}
        </View>
        <View style={styles.fieldBorder} />
      </View>
    );
  }

  _handleFieldFocused(event, inputHandle){
    this.props.onFocus && this.props.onFocus(event, inputHandle);
  }

  _handleFieldChange(field_ref, value){
    this.props.onChange && this.props.onChange(field_ref, value);
  }
}

export class Field extends Component {

  static propTypes = {
  }

  static defaultProps = {
    style: {}
  }

  setNativeProps(props) {
    this.refs["field"].setNativeProps(props);
  }

  render() {
    let contents = (<RegularText style={{color: this.props.tint}}>{this.props.text}</RegularText>);
    if (this.props.children)
      contents = this.props.children;
    let border = <View style={styles.fieldBorder} />;
    return (
      <View ref={"field"}>
        {border}
        <View style={[styles.field, this.props.style]}>
          <View style={styles.fieldBody}>
            {contents}
          </View>
        </View>
      </View>
    );
  }
}

export class FieldGutter extends Component {

  static propTypes = {
    height: PropTypes.number
  }

  static defaultProps = {
    height: 15
  }

  render() {
    return (
      <View style={{height:this.props.height}}>
      </View>
    );
  }
}

export class TouchableField extends Component {

  static propTypes = {
    ...Field.propTypes,
    onPress: React.PropTypes.func,
    tint: React.PropTypes.string,
    accessory: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    icon: React.PropTypes.string,
    iconTint: React.PropTypes.string
  }

  static defaultProps = {
    ...Field.defaultProps,
    onPress: () => {},
    tint: Color.tint,
    accessory: false,
    icon: "",
    iconTint: null
  }

  render() {
    let contents = (<RegularText style={{color: this.props.tint}}>{this.props.text}</RegularText>);
    if (this.props.children)
      contents = this.props.children;
    let accessory = null;
    if (typeof this.props.accessory === "boolean" && this.props.accessory === true) {
      accessory = (<SimpleLineIcons name="arrow-right" size={12} color="#999" />);
    }
    else if (typeof this.props.accessory === "string") {
      switch (this.props.accessory) {
        case "check": {
          accessory = (<MaterialIcons name="check" size={18} color="#999" />);
          break;
        }
        case "arrow": {
          accessory = (<Ionicons name="ios-arrow-forward" size={20} color="#999" style={{paddingRight:4}} />);
          break;
        }
        case "bullet": {
          accessory = (<Octicons name="primitive-dot" size={12} color="#999" style={{paddingRight:0}} />);
          break;
        }
      }
    }
    else if (typeof this.props.accessory === "object") {
      accessory = this.props.accessory;
    }
    let iconColor = this.props.iconTint;
    if (!iconColor)
      iconColor = this.props.tint;
    let icon = null;
    if (this.props.icon != "")
      icon = (<View><SimpleLineIcons name={this.props.icon} size={20} color={iconColor} style={{marginRight:10}} /></View>)
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Field {...this.props}>
          <View style={styles.touchableContainer}>
            {icon}
            <View style={{flex:1}}>
              {contents}
            </View>
            <View style={{justifyContent:"center"}}>
              {accessory}
            </View>
          </View>
        </Field>
      </TouchableHighlight>
    );
  }
}

export class DescriptionField extends Component {
  render() {
    let { text } = this.props;
    return (
      <Field {...this.props}>
        <ReadMore
            numberOfLines={6}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}>
            <SmallText style={styles.fieldText}>
            {text}
            </SmallText>
        </ReadMore>
      </Field>
    );
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <SmallText style={{color: Color.tint, marginTop: 7}} onPress={handlePress}>
        Read more
      </SmallText>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <SmallText style={{color: Color.tint, marginTop: 7}} onPress={handlePress}>
        Show less
      </SmallText>
    );
  }
}

export class InstagramPhotosField extends React.Component {
  state = {
    images: null,
  }

  async componentDidMount() {
    this._isMounted = true;
    let { profile } = this.props;

    if (profile) {
      let response = await fetch(`https://www.instagram.com/${profile}/media/`);
      let data = await response.json();
      if (this._isMounted) {
        let images = data.items.map(item => ({
          imageUrl: item.images.standard_resolution.url,
          width: item.images.standard_resolution.width,
          height: item.images.standard_resolution.height,
          description: item.caption && item.caption.text,
        }));
        this.setState({images: images.slice(0, 6)});
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this._renderInstagramPhotos()
  }

  _renderInstagramPhotos() {
    let { images } = this.state;

    if (!images) {
      return (
        <Field {...this.props} style={styles.imageLoadingContainer}>
          <ActivityIndicator />
        </Field>
      );
    }

    return (
      <Field {...this.props} style={styles.instagramContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { images.map((image, i) => <InstagramPhoto key={i} item={image} list={images} />) }
        </ScrollView>
      </Field>
    );
  }
}

class InstagramPhoto extends React.Component {

  render() {
    let { item } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View>
            <Image
                ref={view => { this._view = view; }}
                source={{uri: item.imageUrl}}
                resizeMode="cover"
                style={styles.instagramImage}
            />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _handlePress = () => {
    let { item, list } = this.props;

    this._view.measure((rx, ry, w, h, x, y) => {
      openImageGallery({
        animationMeasurements: {w, h, x, y},
        list,
        item,
      });
    });
  }
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: '#fff',
  },
  fieldBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDDDDD',
  },
  fieldBody: {
    paddingVertical: 12,
    paddingHorizontal: Dims.horzPadding,
  },
  fieldGroupHeader: {
    flexDirection: "row",
    marginTop: 20,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 5,
    height: 20
  },
  fieldGroupHeaderText: {
    flex: 1,
    color: "#6D6D72",
    fontSize: 8
  },
  fieldGroupHeaderLink: {
    paddingHorizontal: Dims.horzPadding,
  },
  fieldGroupHeaderLinkText: {

  },
  fieldAction: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldActionLabel: {
    flex: 1,
    paddingHorizontal: 12,
  },
  fieldText: {
    fontSize: 14,
    color: '#424242',
  },
  fieldActionText: {
    fontSize: 13,
    color: '#424242',
  },
  fieldActionSubtitleText: {
    fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
  },
  touchableContainer: {
    flexDirection: "row",
    paddingTop: 3
  },
  imageLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 125,
    marginVertical: 10,
  },
  instagramContainer: {
    minHeight: 125,
    marginRight: -20
  },
  instagramImage: {
    width: 125,
    height: 125,
    marginVertical: 0,
    marginHorizontal: 0,
    marginRight: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  }
})
