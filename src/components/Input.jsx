import React, { forwardRef } from "react";
import { useId } from "react";

const Input = forwardRef(({
    label,
    type="text",
    className,
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && 
            <label 
            htmlFor={label}
            className="inline-block mb-1 pl-1"
            id={id}
            >
            {label}
            </label>
            }
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            {...props}
            id={id}
            ref={ref}
            ></input>
        </div>
    );
});

export default Input;