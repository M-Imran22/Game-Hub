import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the auth context
export interface AuthContextType {
  auth: Record<string, any>;
  setAuth: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

interface Props {
  children: ReactNode;
}

// Create a context with a default value
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<Record<string, any>>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
