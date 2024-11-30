import { createContext, useState } from "react";

type UserRoleContextProps = {
  children: React.ReactNode;
};

type UserRoleContextType = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

const userRoleContext = createContext<UserRoleContextType>({
  role: "admin",
  setRole: () => {},
});

const UserRoleProvider = ({ children }: UserRoleContextProps) => {
  const [role, setRole] = useState("admin");
  return (
    <userRoleContext.Provider value={{ role, setRole }}>
      {children}
    </userRoleContext.Provider>
  );
};

export { userRoleContext, UserRoleProvider };

export default UserRoleProvider;
