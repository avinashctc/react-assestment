import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Post from './Post';

configure({ adapter: new Adapter() });

describe('<Post />', () => {
    it('display valid author for <Post/>', () => {
        const wrapper = shallow(<Post />);
        expect(wrapper.find())
    });
});