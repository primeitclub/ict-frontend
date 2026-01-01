//type definations for testing library

import React from "react";

type SingleProp = {
  isMulti?: false;
  onChange: (e: string) => void;
};

type MultiType = {
  isMulti: true;
  onChange: (e: string[]) => void;
};

type TestPropDiscriminated = (SingleProp | MultiType) & { name: string };

export function Test2({
  name,
  isMulti,
  onChange,
}: Readonly<TestPropDiscriminated>) {
  console.log(name, isMulti, onChange);

  return <div>test</div>;
}

export const SampleFunction = (): React.ReactNode => {
  return (
    <Test2
      name="name2"
      onChange={(e) => {
        console.log(e);
      }}
      isMulti={false}
    />
  );
};
