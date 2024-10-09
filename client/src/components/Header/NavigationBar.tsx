import Header from ".";
import { HeaderProvider } from "../../context/HeaderProvider";

const NavigationBar = () => {
  return (
    <HeaderProvider>
      <div className="relative">
        <Header />
      </div>
    </HeaderProvider>
  );
};

export default NavigationBar;
