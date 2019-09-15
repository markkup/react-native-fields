import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Fields from './Fields';

// Theme.setColor('text', 'green');
// Theme.setColor('background', 'pink');
// Theme.setColor('border', 'black');
// Theme.setColor('heading', 'red');
// Theme.setColor('tint', 'purple');
// Theme.setColor('help', 'yellow');

const App = () => {
    return (
        <Fragment>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                <StatusBar barStyle='dark-content' />
                <Fields />
            </SafeAreaView>
        </Fragment>
    );
};

export default App;
