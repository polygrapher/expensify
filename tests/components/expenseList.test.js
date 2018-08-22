import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../src/components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render expense list with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render no expense found message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});