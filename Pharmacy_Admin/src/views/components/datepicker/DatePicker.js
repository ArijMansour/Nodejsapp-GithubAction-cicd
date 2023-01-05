import React, { useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Container, Form } from "semantic-ui-react";

export const DatePicker = () => {
  const [currentDate, setNewDate] = useState(null);
  const onChange = (event, data) => setNewDate(data.value);

  return (
    <Form>
      <Form.Field>
        <SemanticDatepicker
          label="expire date"
          required
          locale="pt-BR"
          clasSName="p-16"
          onChange={onChange}
        />
      </Form.Field>
    </Form>
  );
};
