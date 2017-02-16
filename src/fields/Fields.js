import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Image } from "react-native"
import { RegularText, BoldText, SmallText } from "./StyledText"
import ReadMore from "./ReadMore"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Styles, { Color, Dims } from "../styles"

export class FieldGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    gutter: PropTypes.bool
  }

  static defaultProps = {
    title: null,
    gutter: true
  }

  render() {
    let header = null;
    if (this.props.title) {
        header = (<View style={styles.fieldLabel}>
          <SmallText style={styles.fieldLabelText}>
            {this.props.title.toUpperCase()}
          </SmallText>
        </View>)
    }
    else if (this.props.gutter) {
      header = (<FieldGutter />)
    }
    else {
      header = null;
    }
    return (
      <View>
        {header}
        <View style={[styles.fieldGroup, this.props.style]}>
          {this.props.children}
        </View>
        <View style={styles.fieldBorder} />
      </View>
    );
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
    onPress: PropTypes.func,
    tint: PropTypes.string,
    accessory: PropTypes.bool,
    icon: PropTypes.string,
    iconTint: PropTypes.string
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
    let accessory = (<SimpleLineIcons name="arrow-right" size={12} color="#999" />);
    if (!this.props.accessory)
      accessory = null;
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
  fieldLabel: {
    marginTop: 20,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 5,
  },
  fieldLabelText: {
    color: '#6D6D72',
    fontSize: 8
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
