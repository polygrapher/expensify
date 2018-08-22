import Enzyme from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new ReactAdapter()
});