import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseTotal } from '../../src/components/ExpenseTotal';

test('should render expense total for several items correctly', () => {
    const wrapper = shallow(<ExpenseTotal expensesCount={5} expensesTotalAmount={123123} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense total for 1 item correctly', () => {
    const wrapper = shallow(<ExpenseTotal expensesCount={1} expensesTotalAmount={100} />);
    expect(wrapper).toMatchSnapshot();
});