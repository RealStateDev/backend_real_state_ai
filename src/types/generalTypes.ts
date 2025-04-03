
import React from "react";
export type Inputs = {
  name: string;
  email: string;
  password: string;
};

export interface InputTextCom extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  id: string;
};


