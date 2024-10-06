import Header from ".";
import { HeaderProvider } from "../../context/HeaderProvider";

const NavigationBar = () => {
  return (
    <HeaderProvider>
      <Header />
    </HeaderProvider>
  );
};

export default NavigationBar;
