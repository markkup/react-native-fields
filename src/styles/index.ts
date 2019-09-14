import { StyleSheet } from 'react-native';

import BaseStyles from './base';
import OverrideStyles from './overrides';
import { Color, Dims, TextSize } from './theme';

const styles = Object.assign({}, BaseStyles, OverrideStyles);

export default StyleSheet.create(styles);
export { Color, Dims, TextSize };

const Theme = {
    setColor: (key: string, value: string) => {
        (Color as any)[key] = value;
    },
    setDims: (key: string, value: number) => {
        (Dims as any)[key] = value;
    },
    setTextSize: (key: string, value: number) => {
        (TextSize as any)[key] = value;
    },
};

export { Theme };
