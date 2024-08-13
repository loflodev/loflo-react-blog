import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Button from "../Button";

interface HeaderUserPanelProps {
  handleSignInClick: () => void;
}

const HeaderUserPanel = ({ handleSignInClick }: HeaderUserPanelProps) => {
  const { isLogged, auth } = useContext(AuthContext);

  return isLogged ? (
    <div className="px-5 py-2 rounded-2xl bg-logo-seconday text-white text-xl font-semibold">
      {`Hello, ${auth.username}`}
    </div>
  ) : (
    <Button onClick={handleSignInClick}>Sign in</Button>
  );
};

export default HeaderUserPanel;
