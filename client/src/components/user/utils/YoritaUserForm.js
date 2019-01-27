import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class YoritaUserForm extends Component {
  renderField = ({ key, name, label, placeholder }) => {
    const { fieldClass } = this.props;

    return (
      <div className="field" key={key}>
        <label>{label}</label>
        <div className="ui input">
          <input
            autoComplete="off"
            className={fieldClass}
            name={name}
            placeholder={placeholder}
            type="text"
          />
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
        {submitButton}
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
