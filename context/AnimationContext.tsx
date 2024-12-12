import React, { createContext, useState, useContext } from "react";

type AnimationContextType = {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const toggleAnimation = () => {
    setIsAnimationEnabled((prev) => !prev);
  };

  return (
    <AnimationContext.Provider value={{ isAnimationEnabled, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};