/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./Description.css";
import { useContext, useEffect, useRef, useState } from "react";

import { globalContext } from "../../App.jsx";

function Description() {
  const { user, isUserLoading } = useContext(globalContext);
  const textElementRef = useRef(null);

  const [roles, setRoles] = useState(null);

  useEffect(() => {
    if (user?.roles) setRoles(user.roles);
  }, [user]);

  useEffect(() => {
    let rolesIndex = 0;
    const textElement = textElementRef.current;

    async function typeWriter(text) {
      let i = 0;
      const typingSpeed = 100;

      return new Promise((resolve) => {
        function type() {
          if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
          } else {
            resolve(); // Resolve when typing is done
          }
        }
        type();
      });
    }

    async function eraseWriter() {
      const erasingSpeed = 100;

      return new Promise((resolve) => {
        function erase() {
          if (textElement.innerHTML.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
            setTimeout(erase, erasingSpeed);
          } else {
            resolve();
          }
        }
        erase();
      });
    }

    // Main function to handle the cycle of typing and erasing
    async function typeSentence() {
      if (!roles) return;
      while (true) {
        const text = roles ? roles[rolesIndex] : ""; // Get the current role
        rolesIndex = (rolesIndex + 1) % roles.length; // Update to next role index

        await typeWriter(text); // Type the sentence
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Pause after typing (1.5 seconds)
        await eraseWriter(); // Erase the sentence
        await new Promise((resolve) => setTimeout(resolve, 500)); // Pause after erasing before typing the next sentence
      }
    }

    typeSentence();

    return () => {
      if (textElement) {
        textElement.innerHTML = "";
      }
    };
  }, [roles]);

  return (
    <div className="description">
      <h1 className="name">Hey, I&apos;m {user ? user.fullName : "Unknown"}</h1>
      <h2 ref={textElementRef}></h2>
      <div className="socialMedia">
        <Link to={user?.youtube} target="_blank">
          <img
            src="/Images/youtube.png"
            alt="Youtube"
            style={{ filter: !user?.youtube ? "grayScale(100%)" : "" }}
          />
        </Link>
        <Link to={user?.instagram} target="_blank">
          <img
            src="/Images/instagram.png"
            alt="Instagram"
            style={{ filter: !user?.instagram ? "grayScale(100%)" : "" }}
          />
        </Link>
        <Link to={user?.facebook} target="_blank">
          <img
            src="/Images/facebook.png"
            alt="Facebook"
            style={{ filter: !user?.facebook ? "grayScale(100%)" : "" }}
          />
        </Link>
        <Link to={user?.linkedin} target="_blank">
          <img
            src="/Images/linkedin.png"
            alt="LinkedIn"
            style={{ filter: !user?.linkedin ? "grayScale(100%)" : "" }}
          />
        </Link>
        <Link
          to={user?.twitter}
          target="_blank"
          style={{ filter: !user?.twitter ? "grayScale(100%)" : "" }}
        >
          <img src="/Images/twitter.png" alt="Twitter" />
        </Link>
      </div>
      <div className="workMedia">
        <Link to={user?.github} target="_blank">
          <img src="/Images/github.png" alt="GitHub" />
          <span>Github</span>
        </Link>
        <Link to="/resume" target="_blank">
          <img src="/Images/external-link.png" alt="Link" />
          <span>Resume</span>
        </Link>
      </div>
      <div className="info">{user?.headline}</div>
    </div>
  );
}

export default Description;
