import { Platform } from 'react-native';

const Color = {
    text: '#424242',
    tint: 'rgb(0, 122, 255)',
    border: '#DDDDDD',
    background: '#fff',
    heading: '#6D6D72',
    help: '#7a7a7a',
};

const Dims = {
    horzPadding: 16,
    borderWidth: 1,
};

const TextSize = {
    tiny: Platform.OS === 'ios' ? 14 : 12,
    small: Platform.OS === 'ios' ? 16 : 14,
    normal: Platform.OS === 'ios' ? 34 / 2 : 16,
    large: Platform.OS === 'ios' ? 22 : 20,
};

export { Color, Dims, TextSize };
