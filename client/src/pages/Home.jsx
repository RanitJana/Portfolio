import SkillSection from "../pageSection/Skill/SkillSection.jsx";
import Description from "../pageSection/Description/Description.jsx";
import Timeline from "../pageSection/Timeline/Timeline.jsx";
import About from "../pageSection/About/About.jsx";
import Project from "../pageSection/Project/Project.jsx";
import Contact from "../pageSection/Contact/Contact.jsx";
import Nav from "../components/nav/Nav.jsx";

function Home() {
  return (
    <div className="home" style={{ marginTop: "6rem" }}>
      <Nav />
      <Description />
      <Timeline />
      <About />
      <SkillSection />
      <Project />
      <Contact />
    </div>
  );
}

export default Home;
