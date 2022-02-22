import React, { useMemo, useState } from "react";

const UsuarioContext = React.createContext();

export function UsuarioProvider(props) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);

  return <UsuarioContext.Provider value={value} {...props} />;
}
export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (!context) {
    throw new Error("No hay UseUsuario");
  }
  return context;
}
