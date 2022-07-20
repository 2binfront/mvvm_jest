import BaiduLink from "../baiduLink";

import renderer from 'react-test-renderer';
import React from "react";

test('baidu render correctly',() => {
    const tree = renderer.create(<BaiduLink></BaiduLink>);
    expect(tree).toMatchSnapshot();
})