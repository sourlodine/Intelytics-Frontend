import React, { InputHTMLAttributes, forwardRef } from "react";

import { SwitchProps } from "./types";

const Switch = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & SwitchProps
>((props, ref) => {
  const { label, ...otherProps } = props;

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only peer"
        {...otherProps}
      />
      <div className="w-7 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      {label && (
        <span className="ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
});

Switch.displayName = "Switch";

export default Switch;
