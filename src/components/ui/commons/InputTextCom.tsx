import React, { forwardRef } from "react";

interface InputTextComProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  id: string;
}

const InputTextComProps = forwardRef<HTMLInputElement, InputTextComProps>(
  ({ labelText, id, ...rest }, ref) => (
    <div className="mb-4">
      
        <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
          {labelText}
        </label>
     
      <input
        id={id}
        ref={ref}
        {...rest}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  )
);

export default InputTextComProps;

//  {...register("email", { required: "Este campo es obligatorio" })}
