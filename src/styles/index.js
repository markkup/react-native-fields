import { StyleSheet } from "react-native"
import { Color, Dims, TextSize } from "./theme"
import BaseStyles from "./base"
import OverrideStyles from "./overrides"

const styles = Object.assign({}, BaseStyles, OverrideStyles)
 
export default StyleSheet.create(styles)
export { Color, Dims, TextSize }

let Theme = {
  setColor: (key, value) => {
    Color[key] = value;
  },
  setDims: (key, value) => {
    Dims[key] = value;
  },
  setTextSize: (key, value) => {
    TextSize[key] = value;
  }
}

export { Theme }
