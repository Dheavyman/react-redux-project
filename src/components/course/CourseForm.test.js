import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

import CourseForm from './CourseForm';

const setup = (saving) => {
  const props = {
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
};

describe('Test course form', () => {
  it('should render form and h2', () => {
    const wrapper = setup(false);

    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual('Manage Course');
  });

  it('should have save button labelled "Save" when not saving', () => {
    const wrapper = setup(false);

    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('should have save button labelled "Saving..." when saving', () => {
    const wrapper = setup(true);

    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
