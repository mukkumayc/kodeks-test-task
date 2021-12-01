import React, { FormEventHandler, useState } from "react";
import TextAndCount, { CountedString } from "./TextAndCount";
import TextForm from "./TextForm";
import { useFormFields } from "./useFormFields";
import "./App.css";

const addString = (
  strings: CountedString[],
  setter: React.Dispatch<React.SetStateAction<CountedString[]>>,
  stringToAdd: string
) => {
  const currentString = strings.find((v) => v.text === stringToAdd);
  if (currentString) {
    setter([
      ...strings.filter((v) => v.text !== stringToAdd),
      {
        text: stringToAdd,
        count: currentString.count + 1,
      },
    ]);
  } else {
    setter([
      ...strings,
      {
        text: stringToAdd,
        count: 1,
      },
    ]);
  }
};

const App = () => {
  const [lettersOnlyStrings, setLettersOnlyStrings] = useState<CountedString[]>(
    []
  );
  const [digitsOnlyStrings, setDigitsOnlyStrings] = useState<CountedString[]>(
    []
  );
  const [lettersAndDigitsStrings, setLettersAndDigitsStrings] = useState<
    CountedString[]
  >([]);

  const [fields, setFields] = useFormFields({ value: "" });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const regexLetters = /^[A-Za-zА-Яа-я]+$/;
    const regexDigits = /^\d+$/;
    const regexBoth = /^[A-Za-zА-Яа-я\d]+$/;

    if (regexLetters.test(fields.value)) {
      addString(lettersOnlyStrings, setLettersOnlyStrings, fields.value);
    }

    if (regexDigits.test(fields.value)) {
      addString(digitsOnlyStrings, setDigitsOnlyStrings, fields.value);
    }

    if (
      !regexLetters.test(fields.value) &&
      !regexDigits.test(fields.value) &&
      regexBoth.test(fields.value)
    ) {
      addString(
        lettersAndDigitsStrings,
        setLettersAndDigitsStrings,
        fields.value
      );
    }
  };

  return (
    <div className="App container">
      <TextForm
        className="main-form"
        value={fields.value}
        handleChange={setFields}
        {...{ handleSubmit }}
      />
      <TextAndCount
        className="letters-only"
        countedStrings={lettersOnlyStrings}
      />
      <TextAndCount
        className="digits-only"
        countedStrings={digitsOnlyStrings}
      />
      <TextAndCount
        className="letters-and-digits"
        countedStrings={lettersAndDigitsStrings}
      />
    </div>
  );
};

export default App;
