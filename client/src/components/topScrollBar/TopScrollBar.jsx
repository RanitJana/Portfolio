import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./TopScrollBar.css";

function TopScrollBar() {
  const barRef = useRef(null);
  const location = useLocation();

  const updateScrollProgress = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll =
      windowHeight > 0 ? Math.ceil((totalScroll / windowHeight) * 100) : 0;

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

  useEffect(() => {
    updateScrollProgress();
  }, [location.pathname]);

  return <div ref={barRef} className="topScrollBar"></div>;
}

export default TopScrollBar;
