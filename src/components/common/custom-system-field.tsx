import React from "react";

import { CustomSystemFieldInterface } from "@/interfaces/common-interfaces";

const CustomSystemField: React.FC<CustomSystemFieldInterface> = ({
  value,
  onChange,
  name,
}) => {
  return (
    <div style={{ display: "none" }}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        placeholder="..."
      />
    </div>
  );
};

export default CustomSystemField;
