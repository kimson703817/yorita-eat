import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class YoritaUserForm extends Component {
  renderField = ({ key, onChange, name, label, placeholder }) => {
    const { fieldClass } = this.props;

    return (
      <Form.Input
        className={fieldClass}
        key={key}
        name={name}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
      />
    );
  };

  renderForm = () => {
    const { onSubmit, onChange, fields } = this.props.options;

    return (
      <Form size="massive" onSubmit={onSubmit}>
        {fields.map(this.renderField)}
        <Form.Button content="Submit" />
      </Form>
    );
  };

  render() {
    return this.renderForm();
  }
}

export default YoritaUserForm;
