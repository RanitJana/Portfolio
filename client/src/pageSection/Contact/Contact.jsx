import { useContext, useEffect, useRef, useState } from "react";
import "./Contact.css";
import Message from "../../components/Message/Message.jsx";
import Mail from "../../components/Mail/Mail.jsx";
import Phone from "../../components/Phone/Phone.jsx";

import { globalContext } from "../../App.jsx";

function Contact() {
  const { sectionRef } = useContext(globalContext);

  const [contact, setContact] = useState(1);
  const containerRef = useRef(null);

  const firstRef = useRef(null),
    secondRef = useRef(null),
    thirdRef = useRef(null);

  useEffect(() => {
    firstRef.current.style.backgroundColor =
      secondRef.current.style.backgroundColor =
      thirdRef.current.style.backgroundColor =
        "rgba(71, 0, 71, 0.603)";
    containerRef.current.style.height = `120px`;

    if (contact == 1) {
      firstRef.current.style.backgroundColor = "purple";
      containerRef.current.style.height = `260px`;
    } else if (contact == 2) {
      secondRef.current.style.backgroundColor = "purple";
    } else {
      thirdRef.current.style.backgroundColor = "purple";
    }
  }, [contact]);

  return (
    <div className="contact" ref={(el) => (sectionRef.current.contactRef = el)}>
      <h1>Contact me</h1>
      <ul>
        <li onClick={() => setContact(1)} ref={firstRef}>
          <img src="/Images/icons8-message-50.png" alt="" />
          <span>Message</span>
        </li>
        <li onClick={() => setContact(2)} ref={secondRef}>
          <img src="/Images/icons8-email-50.png" alt="" />
          <span>Email</span>
        </li>
        <li onClick={() => setContact(3)} ref={thirdRef}>
          <img src="/Images/icons8-phone-30.png" alt="" />
          <span>Phone</span>
        </li>
      </ul>
      <div className="listContainer" ref={containerRef}>
        {contact == 1 ? <Message /> : contact == 2 ? <Mail /> : <Phone />}
      </div>
    </div>
  );
}

export default Contact;
