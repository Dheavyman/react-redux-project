import React, { PropTypes } from 'react';

import TextInput from '../common/TextInput';

const AuthorForm = props => {
  const {
    author,
    onSave,
    onChange,
    saving,
    errors
  } = props;

  return (
    <form>
      <h2>{author.id ? 'Edit Author' : 'Add Author'}</h2>
      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.firstName}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.lastName}
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

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default AuthorForm;
