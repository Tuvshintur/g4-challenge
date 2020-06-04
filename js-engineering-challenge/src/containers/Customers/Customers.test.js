import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Customers } from "./Customers";
import Button from "../../component/Button/Button";

configure({ adapter: new Adapter() });

describe("<Customers/>", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Customers />);
    });

    it("should render <Button/> when renders", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
