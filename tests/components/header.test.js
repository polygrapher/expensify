import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../src/components/Header';

test('Header renders correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot('Expensify');
});
