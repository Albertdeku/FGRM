import HelpPage from "../components/HelpPage";
import Slides from "../components/Slides";
import Slogan from "../components/Slogan";
import Support from "../components/Support";

const Home = () => {
  return (
    <div className="page">
      <Slides />
      <Support />
      <HelpPage />
      <Slogan />
    </div>
  );
};

export default Home;
