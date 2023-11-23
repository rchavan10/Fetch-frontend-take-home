import React from "react";
import { ScrollToTop } from "./ScrollToTop";
import { NavBar } from "./NavBar";

export const Layout = (props) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <main>
        <NavBar />
        {props.children}
        <ScrollToTop />
      </main>
    </div>
  );
};
