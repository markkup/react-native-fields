import { Platform } from "react-native"

let Color = {
    text: "#000",
    background: "white",
    tint: "rgb(0, 122, 255)",
    border: "#DDDDDD"
}

let Dims = {
    horzPadding: 16
}

let TextSize = {
    tiny: Platform.OS === "ios" ? 14 : 12,
    small: Platform.OS === "ios" ? 16 : 14,
    normal: Platform.OS === "ios" ? 18 : 16,
    large: Platform.OS === "ios" ? 22 : 20,
}

export { Color, Dims, TextSize }