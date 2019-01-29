import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class YoritaUserForm extends Component {
  renderField = fieldProps => {
    const { key, label, inputProps } = fieldProps;

    return (
      <div key={key} className="field">
        {label && <label>{label}</label>}
        <div className="ui input">
          <input {...inputProps} />
        </div>
      </div>
    );
  };

  renderForm = () => {
    const { onSubmit, fields, submitButton } = this.props.options;
    const { formClass } = this.props;

    return (
      <Form size="massive" className={formClass} onSubmit={onSubmit}>
        {fields.map(this.renderField)}
        {submitButton && submitButton}
      </Form>
    );
  };

  render() {
    return this.renderForm();
  }
}

// <Form.Input
//         label={label}
//         key={key}
//         className={fieldClass}
//         name={name}
//         onChange={onChange}
//   placeholder={placeholder}
// />

export default YoritaUserForm;
