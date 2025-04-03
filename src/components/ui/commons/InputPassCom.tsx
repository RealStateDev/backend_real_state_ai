import React, { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputPassComProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  id: string;
}

const InputPassCom = forwardRef<HTMLInputElement, InputPassComProps>(
  ({ labelText, id, ...rest }, ref) => 
  {
     const [showPassword, setShowPassword] = useState(false);
     
    return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {labelText}
      </label>

      <div className="relative">
        <input
         ref={ref}
         {...rest}
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-blue-500"
         
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  )
  }
      
);

export default InputPassCom;

//  {...register("email", { required: "Este campo es obligatorio" })}
