import { useRef } from "react";

function MyComponent() {
  const inputRef = useRef(null); // Create a ref

  return (
    <input
      ref={(el) => {
        el?.focus();
      }}
      type="text"
    />
  );
}
