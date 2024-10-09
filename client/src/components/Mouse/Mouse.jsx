import { useEffect, useRef } from "react";
import "./Mouse.css";

function Mouse() {
  const mouseRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mouse = mouseRef.current;

    const updateMousePosition = (e) => {
      if (e.type === "mousemove") {
        mousePos.current = { x: e.clientX, y: e.clientY };
      } else if (e.type === "touchmove") {
        const touch = e.touches[0];
        mousePos.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const animateCursor = () => {
      const { x, y } = mousePos.current;

      mouse.style.transform = `translate(-50%, -50%)`;
      mouse.style.left = `${x}px`;
      mouse.style.top = `${y}px`;

      requestAnimationFrame(animateCursor);
    };

    const hideCursor = () => {
      mouse.style.opacity = 0;
    };

    const showCursor = () => {
      mouse.style.opacity = 1;
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("touchmove", updateMousePosition);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("touchstart", showCursor);
    document.addEventListener("touchend", hideCursor);

    requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("touchmove", updateMousePosition);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("touchstart", showCursor);
      document.removeEventListener("touchend", hideCursor);
    };
  }, []);

  return <div className="mouse" ref={mouseRef}></div>;
}

export default Mouse;
