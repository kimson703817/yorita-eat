import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class YoritaUserForm extends Component {
  renderField = ({ key, onChange, name, label, placeholder }) => (
    <Form.Input
      key={key}
      name={name}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
    />
  );

  renderForm = ({ onSubmit, onChange, fields }) => (
    <Form onSubmit={onSubmit}>
      {fields.map(this.renderField)}
      <Form.Button content="Submit" />
    </Form>
  );

  render() {
    return this.renderForm(this.props.options);
  }
}

export default YoritaUserForm;
