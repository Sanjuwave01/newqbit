import React from "react";
import LaunchpadMenuTab from "./LaunchpadMenuTab";

export default function LaunchpadHeader({ title, imageUrl }: any) {
  return (
    <div>
      <div
        className="my-0 wallet-overview-header-main bg_cover_dashboard"
        // style={{
        //   // backgroundImage: `url(${imageUrl})`,
        //   backgroundImage: `url(https://images.unsplash.com/photo-1620207418302-439b387441b0?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        // }}
      >
        <div className="profle-are-top container-4xl">
          <h2 className="wallet-overview-header-title">{title}</h2>
        </div>
        <LaunchpadMenuTab />
      </div>
    </div>
  );
}
