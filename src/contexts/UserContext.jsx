import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return {
        ...parsedUser,
        maxPrompts: Number(parsedUser.maxPrompts),
        prompts: Number(parsedUser.prompts),
      };
    }
    return {
      username: "",
      password: "",
      email: "",
      subscriptionType: "Free",
      prompts: 0,
      time: 0,
    };
  });

  useEffect(() => {
    console.log('User state updated:', user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
