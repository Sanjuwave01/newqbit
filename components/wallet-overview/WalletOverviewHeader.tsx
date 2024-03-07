import WalletOverViewMenuTab from "layout/WalletOverViewMenuTab";
import Link from "next/link";
import React from "react";

export default function WalletOverviewHeader({ title, imageUrl }: any) {
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
        <WalletOverViewMenuTab />
        {/* <div className="wallet-overview-btn-all">
        <Link href={`/user/wallet-history?type=deposit`}>
          <a className="wallet-overview-btn text-primary">Deposit History</a>
        </Link>
        <Link href={`/user/wallet-history?type=withdrawal`}>
          <a className="wallet-overview-btn text-primary">Withdrawal History</a>
        </Link>
        <Link href={`/user/transaction-history`}>
          <a className="wallet-overview-btn text-primary">Transaction History</a>
        </Link>
      </div> */}
      </div>
    </div>
  );
}
