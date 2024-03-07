import type { GetServerSideProps, NextPage } from "next";
import { BiShapeCircle } from "react-icons/bi";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import { FaPeopleArrows } from "react-icons/fa";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import moment from "moment";
import WalletOverviewSidebar from "layout/WalletOverviewSidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWalletOverviewDataApi } from "service/wallet-overview";
import SectionLoading from "components/common/SectionLoading";
import WalletOverviewHeader from "components/wallet-overview/WalletOverviewHeader";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import PlaceBottomRight from "components/gradient/placeBottomRight";
import PlaceTopLeft from "components/gradient/placeTopLeft";
const WalletOverview: NextPage = () => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  const [coinType, setCoinType] = useState("");

  const [walletOverviewData, setWalletOverviewData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWalletOverviewData();
  }, [coinType]);

  const getWalletOverviewData = async () => {
    setLoading(true);
    const response = await getWalletOverviewDataApi(coinType);
    if (!response.success) {
      setLoading(false);
      return;
    }

    setWalletOverviewData(response.data);
    setLoading(false);
  };

  return (
    <>
      <div className="page-wrap">
        <PlaceBottomRight />
        <div className="page-main-content pt-0">
          <div>
            <WalletOverviewHeader
              title={`Wallet Overview`}
              imageUrl={walletOverviewData?.banner}
            />
            {/* <WalletOverviewSidebar /> */}
            <PlaceTopLeft />
            <PlaceBottomRight />
            <div className="container-4xl">
              {" "}
              {loading ? (
                <SectionLoading />
              ) : (
                Object.keys(walletOverviewData).length > 0 && (
                  <>
                    <div
                      className="px-1"
                      style={{
                        marginTop: "-60px",
                        marginBottom: "30px",
                      }}
                    >
                      <div className="row" style={{ rowGap: "20px" }}>
                        <div className=" col-md-6">
                          <div className="shadow-sm section-padding-custom wallet-card-info-container">
                            <div
                              // style={{
                              //   display: "flex",
                              //   justifyContent: "space-between",
                              //   alignItems: "center",
                              // }}
                              className="card-head"
                            >
                              <h6>{t(`Estimated Balance`)}</h6>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "6px",
                                  alignItems: "center",
                                  height: "36px",
                                }}
                              >
                                <span>
                                  {walletOverviewData?.selected_coin ?? "NA"}
                                </span>
                                {walletOverviewData?.coins?.length > 0 && (
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle wallet-overview-dropdown-tab-menu-btn"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    ></button>
                                    <div
                                      className="dropdown-menu shadow bg-main-clr"
                                      style={{ minWidth: "4rem" }}
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      {walletOverviewData?.coins.map(
                                        (item: any, index: any) => (
                                          <div
                                            className="dropdown-item px-1 cursor-pointer text-primary wallet-dropdown-item"
                                            key={index}
                                            onClick={() => setCoinType(item)}
                                          >
                                            {item}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="pt-3 d-flex align-items-center gap-10">
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                              >
                                <h3>
                                  {`${
                                    walletOverviewData?.total ?? "0.00000000"
                                  } ${
                                    walletOverviewData?.selected_coin ?? "NA"
                                  }`}
                                </h3>
                              </div>
                            </div>
                            <p>
                              {/* {settings?.currency_symbol} */}$
                              {`${
                                walletOverviewData?.total_usd
                                  ? parseFloat(
                                      walletOverviewData?.total_usd
                                    ).toFixed(2)
                                  : "0.00"
                              }`}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="shadow-sm section-padding-custom wallet-card-info-container">
                            <div className="card-head">
                              <Link href="/user/my-wallet">
                                <div className="d-flex align-items-center gap-10 cursor-pointer">
                                  <h6>{t("Spot")}</h6>
                                </div>
                              </Link>
                              <div
                                style={{
                                  padding: "6px",
                                  borderRadius: "10px",
                                  background: "var(--main-background-color)",
                                }}
                              >
                                <BiShapeCircle
                                  size={24}
                                  color="var(--primary-color)"
                                />
                              </div>
                            </div>
                            <div className="pt-3 d-flex align-items-center gap-10">
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                              >
                                <h3>
                                  {`${
                                    walletOverviewData?.spot_wallet
                                      ? parseFloat(
                                          walletOverviewData?.spot_wallet
                                        ).toFixed(8)
                                      : "0.0000000"
                                  } `}{" "}
                                  {`${
                                    walletOverviewData?.selected_coin ?? "NA"
                                  }`}
                                </h3>
                              </div>
                            </div>
                            <p>
                              {/* {settings?.currency_symbol} */}$
                              {`${
                                walletOverviewData?.spot_wallet_usd
                                  ? parseFloat(
                                      walletOverviewData?.spot_wallet_usd
                                    ).toFixed(2)
                                  : "0.00"
                              }`}
                            </p>
                          </div>
                        </div>
                        {Number(settings?.enable_future_trade) === 1 && (
                          <div className="col-md-6">
                            <div className="shadow-sm section-padding-custom wallet-card-info-container">
                              <div className="card-head">
                                <Link href="/futures/wallet-list">
                                  <div className="d-flex align-items-center gap-10 cursor-pointer">
                                    <h6>{t("Futures")}</h6>
                                  </div>
                                </Link>
                                <div
                                  style={{
                                    padding: "6px",
                                    borderRadius: "10px",
                                    background: "var(--main-background-color)",
                                  }}
                                >
                                  <BiShapeCircle
                                    size={24}
                                    color="var(--primary-color)"
                                  />
                                </div>
                              </div>
                              <div className="pt-3 d-flex align-items-center gap-10">
                                <div
                                  style={{
                                    display: "inline-block",
                                  }}
                                >
                                  <h3>
                                    {`${
                                      walletOverviewData?.future_wallet
                                        ? parseFloat(
                                            walletOverviewData?.spot_wallet
                                          ).toFixed(8)
                                        : "0.0000000"
                                    } `}{" "}
                                    {`${
                                      walletOverviewData?.selected_coin ?? "NA"
                                    }`}
                                  </h3>
                                </div>
                              </div>
                              <p>
                                {/* {settings?.currency_symbol} */}$
                                {`${
                                  walletOverviewData?.future_wallet_usd
                                    ? parseFloat(
                                        walletOverviewData?.future_wallet_usd
                                      ).toFixed(2)
                                    : "0.00"
                                }`}
                              </p>
                            </div>
                          </div>
                        )}
                        {parseInt(settings?.p2p_module) === 1 && (
                          <div className="col-md-6">
                            <div className="shadow-sm section-padding-custom wallet-card-info-container">
                              <div className="card-head">
                                <Link href="/p2p/p2p-wallet">
                                  <div className="d-flex align-items-center gap-10 cursor-pointer">
                                    <h6>{t("P2P")}</h6>
                                  </div>
                                </Link>
                                <div
                                  style={{
                                    padding: "6px",
                                    borderRadius: "10px",
                                    background: "var(--main-background-color)",
                                  }}
                                >
                                  <BiShapeCircle
                                    size={24}
                                    color="var(--primary-color)"
                                  />
                                </div>
                              </div>
                              <div className="pt-3 d-flex align-items-center gap-10">
                                <div
                                  style={{
                                    display: "inline-block",
                                  }}
                                >
                                  <h3>
                                    {`${
                                      walletOverviewData?.p2p_wallet
                                        ? parseFloat(
                                            walletOverviewData?.p2p_wallet
                                          ).toFixed(8)
                                        : "0.0000000"
                                    } `}{" "}
                                    {`${
                                      walletOverviewData?.selected_coin ?? "NA"
                                    }`}
                                  </h3>
                                </div>
                              </div>
                              <p>
                                {/* {settings?.currency_symbol} */}$
                                {`${
                                  walletOverviewData?.p2p_wallet_usd
                                    ? parseFloat(
                                        walletOverviewData?.p2p_wallet_usd
                                      ).toFixed(2)
                                    : "0.00"
                                }`}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="shadow-sm section-padding-custom wallet-card-info-container"
                      style={{
                        marginBottom: "60px",
                      }}
                    >
                      <div>
                        <div className="mb-3 px-2 d-flex justify-content-between align-items-center gap-10 card-head">
                          <h6>{t(`Recent Transactions`)}</h6>
                          <Link href="/user/transaction-history">
                            <div className="text-12 bg-main-clr py-1 px-3 rounded cursor-pointer">
                              <span>{t("View All")}</span>
                            </div>
                          </Link>
                        </div>
                        <div>
                          <table className="table">
                            <thead></thead>
                            <tbody>
                              {/* for withdraw */}
                              {walletOverviewData?.withdraw?.length > 0 &&
                                walletOverviewData?.withdraw.map(
                                  (item: any, index: any) => (
                                    <tr key={index}>
                                      <td className="p-2 align-middle">
                                        <div className="d-flex gap-10 align-items-center">
                                          <div
                                            className="d-flex justify-content-center align-items-center bg-main-clr rounded"
                                            style={{
                                              width: "36px",
                                              height: "36px",
                                            }}
                                          >
                                            <AiOutlineUpload size={16} />
                                          </div>
                                          <div>
                                            <span className="d-block">
                                              {t(`Withdraw`)}
                                            </span>
                                            <small>
                                              {moment(item.created_at).format(
                                                "YYYY-MM-DD  hh:mm:ss"
                                              )}
                                            </small>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-right align-middle">
                                        <div>
                                          <span className="d-block">
                                            -
                                            {parseFloat(item?.amount).toFixed(
                                              8
                                            )}{" "}
                                            {item?.coin_type}
                                          </span>
                                          <small>
                                            <span
                                              style={{
                                                display: "inline-block",
                                                width: "5px",
                                                height: "5px",
                                                background: "green",
                                                borderRadius: "50%",
                                                marginBottom: "1px",
                                              }}
                                            ></span>{" "}
                                            {t(`Completed`)}
                                          </small>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                              {/* for deposit */}
                              {walletOverviewData?.deposit?.length > 0 &&
                                walletOverviewData?.deposit.map(
                                  (item: any, index: any) => (
                                    <tr key={index}>
                                      <td className="p-2 align-middle">
                                        <div className="d-flex gap-10 align-items-center">
                                          <div
                                            className="d-flex justify-content-center align-items-center bg-main-clr rounded"
                                            style={{
                                              width: "36px",
                                              height: "36px",
                                            }}
                                          >
                                            <AiOutlineDownload size={16} />
                                          </div>
                                          <div>
                                            <span className="d-block">
                                              {t(`Deposit`)}
                                            </span>
                                            <small>
                                              {moment(item.created_at).format(
                                                "YYYY-MM-DD  hh:mm:ss"
                                              )}
                                            </small>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 text-right align-middle">
                                        <div>
                                          <span className="d-block">
                                            +
                                            {parseFloat(item?.amount).toFixed(
                                              8
                                            )}{" "}
                                            {item?.coin_type}
                                          </span>
                                          <small>
                                            <span
                                              style={{
                                                display: "inline-block",
                                                width: "5px",
                                                height: "5px",
                                                background: "green",
                                                borderRadius: "50%",
                                                marginBottom: "1px",
                                              }}
                                            ></span>{" "}
                                            {t(`Completed`)}
                                          </small>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/wallet-overview");

  return {
    props: {},
  };
};

export default WalletOverview;
