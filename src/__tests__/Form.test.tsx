import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Form } from '..';

describe('HomeScreen', () => {

    it('should match basic snapshot', async () => {

        const component = renderer.create(
            <Form />,
        );

        expect(component.toJSON()).toMatchSnapshot();
    });
});
