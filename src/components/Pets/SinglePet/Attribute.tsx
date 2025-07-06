import React from "react";

export default (props: { label: string; value: string | number | boolean }): React.ReactElement => {
  const { label, value } = props;

  return (
    <>
      {value && value !== "EMPTY_STRING" && (
        <li className="list-group-item">
          <strong>{label}</strong>: {value}
        </li>
      )}
    </>
  );
};
