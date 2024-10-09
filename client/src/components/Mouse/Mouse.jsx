import { useEffect, useRef } from "react";
import "./Mouse.css";

function Mouse() {
  const mouseRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mouse = mouseRef.current;

    const updateMousePosition = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      const { x, y } = mousePos.current;

      mouse.style.transform = `translate(-50%, -50%)`;
      mouse.style.left = `${x}px`;
      mouse.style.top = `${y}px`;

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("touchmove", updateMousePosition);
    document.addEventListener("mouseleave", () => {
      mouse.style.opacity = 0;
    });
    document.addEventListener("mouseenter", () => {
      mouse.style.opacity = 1;
    });

    requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.addEventListener("touchmove", updateMousePosition);
      document.removeEventListener(
        "mouseleave",
        () => (mouse.style.opacity = 0)
      );
      document.removeEventListener(
        "mouseenter",
        () => (mouse.style.opacity = 1)
      );
    };
  }, []);

  return <div className="mouse" ref={mouseRef}></div>;
}

export default Mouse;
