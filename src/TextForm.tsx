import React, { ChangeEvent, FormEventHandler } from "react";

interface TextFormProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  handleChange(event: ChangeEvent): void;
  handleSubmit: FormEventHandler;
}

const TextForm = ({
  value,
  handleChange,
  handleSubmit,
  className,
}: TextFormProps) => (
  <div className={`TextForm ${className}`}>
    <form onSubmit={handleSubmit}>
      <label>Enter text:</label>
      <input type="text" name="value" {...{ value }} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default TextForm;
