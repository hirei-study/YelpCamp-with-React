import React from "react";

import Footer from "@/components/Footer/Footer";
import Topbar from "@/components/Topbar/Topbar";

interface LayerProps {
  children: React.ReactNode;
}

const Layer: React.FC<LayerProps> = (props) => {
  const { children } = props;
  return (
    <main className="d-flex flex-column vh-100 ">
      <Topbar />
      <div className="container mt-5">{children}</div>
      <Footer />
    </main>
  );
};

export default Layer;
