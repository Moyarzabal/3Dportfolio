import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SmoothScroll from "./lib/SmoothScroll";
import { AppReadyProvider, useAppReady } from "./lib/AppReady";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import CursorFX from "./components/fx/CursorFX";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Research from "./components/Research";
import Experience from "./components/Experience";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/** Keeps ScrollTrigger measurements fresh as fonts/images load and layout settles. */
const ScrollTriggerRefresher = () => {
  const { ready } = useAppReady();
  useEffect(() => {
    let t;
    const refresh = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ro.disconnect();
    };
  }, []);
  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);
  return null;
};

const App = () => (
  <AppReadyProvider>
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <CursorFX />
      <ScrollProgress />
      <ScrollTriggerRefresher />
      <div aria-hidden className="noise" />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Research />
        <Experience />
        <Works />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  </AppReadyProvider>
);

export default App;
