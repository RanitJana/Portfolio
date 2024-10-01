import { useEffect, useRef } from "react";
import "./TopScrollBar.css";

function TopScrollBar() {
  const barRef = useRef(null);

  const updateScrollProgress = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = Math.ceil((totalScroll / windowHeight) * 100);

    if (barRef.current) {
      barRef.current.style.width = `${scroll}%`;
    }
  };

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          },
          limit - (Date.now() - lastRan)
        );
      }
    };
  };

  useEffect(() => {
    const throttledUpdateScroll = throttle(updateScrollProgress, 210);
    window.addEventListener("scroll", throttledUpdateScroll);

    return () => window.removeEventListener("scroll", throttledUpdateScroll);
  }, []);

  return <div ref={barRef} className="topScrollBar"></div>;
}

export default TopScrollBar;
