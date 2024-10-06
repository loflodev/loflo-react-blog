import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Admin = () => {
  const { auth } = useContext(AuthContext);

  console.log(auth);
  return <>Hello world</>;
};

export default Admin;
