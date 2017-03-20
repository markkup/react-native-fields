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
    tiny: 14,
    small: 16,
    normal: Platform.OS === "ios" ? 18 : 16,
    large: 18
}

export { Color, Dims, TextSize }