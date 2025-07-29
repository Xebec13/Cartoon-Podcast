import LandingPage from "./LandingPage";
import Spacer from "./Spacer"
import Nav from "./Nav"
import HeroSection from "./HeroSection"
import MinorHeroSection from "./MinorHeroSection"
import Episodes from "./Episodes"


function App() {
  return (
    <>
      <LandingPage />
      {/* <Spacer/> */}
      <Nav/>
      <HeroSection />
     <MinorHeroSection/>
     <Episodes/>
    </>
  );
}

export default App;
