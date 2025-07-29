import LandingPage from "./LandingPage";
import Spacer from "./Spacer"
import Nav from "./Nav"
import HeroSection from "./HeroSection"
import MinorHeroSection from "./MinorHeroSection"


function App() {
  return (
    <>
      <LandingPage />
      {/* <Spacer/> */}
      <Nav/>
      <HeroSection />
     <MinorHeroSection/>
    </>
  );
}

export default App;
