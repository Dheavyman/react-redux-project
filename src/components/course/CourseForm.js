import React, { PropTypes } from 'react';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = props => {
  const {
    course,
    allAuthors,
    onSave,
    onChange,
    saving,
    errors
  } = props;

  return (
    <form>
      <h2>{course.id ? 'Edit Course' : 'Add Course'}</h2>
      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />
      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange}
        error={errors.authorId}
      />
      <TextInput
        name="category"
        label="Category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />
      <TextInput
        name="duration"
        label="Duration"
        value={course.duration}
        onChange={onChange}
        error={errors.duration}
      />
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default CourseForm;
