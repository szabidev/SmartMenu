import React, { FC, Ref } from "react";

import "./Input.css";

interface InputProps {
  label: string;
  input: {
    id: string;
    type: string;
    min: string;
    max: string;
    step: string;
    defaultValue: string;
  };
  ref: Ref<HTMLInputElement>;
}

const Input: FC<InputProps> = React.forwardRef(
  ({ input, label }, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="input">
        <label htmlFor={input.id}>{label}</label>
        <input {...input} ref={ref} />
      </div>
    );
  }
);

export default Input;
