import { createContext as createReactContext, useContext } from "react";

export const createContext = <A extends Record<string, unknown> | null>() => {
  const customContext = createReactContext<A | null>(null);

  const useCustomContext = () => {
    const context = useContext(customContext);
    if (context === null) {
      throw new Error("useCustomContext must be used within a customContext.Provider");
    }
    return context;
  };

  return [customContext.Provider, useCustomContext] as const;
};
