import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";
import { copyTextById, formateZert } from "common";
import { GetWalletAddressAction } from "state/actions/wallet";
import Qr from "components/common/qr";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import QRCode from "react-qr-code";
import { getEvmNetworkAddressApi } from "service/wallet";
import { toast } from "react-toastify";

export const DipositComponent = ({
  responseData,
  router,
  setDependecy,
  fullPage,
}: any) => {
  const { t } = useTranslation("common");
  const [selectedNetwork, setSelectedNetwork] = useState<any>({});
  const [initialHit, setInitialHit] = useState(false);
  const [evmAddress, setEvmAddress] = useState<any>();
  const selectAddressCopy: any = React.useRef(null);
  useEffect(() => {
    if (
      parseInt(responseData?.data?.base_type) === 1 &&
      responseData?.wallet.coin_type == "USDT" &&
      initialHit === false
    ) {
      setSelectedNetwork(responseData?.data?.coin_payment_networks[0]);
      setInitialHit(true);
    }
  }, [responseData?.wallet.coin_type]);
  const checkNetworkFunc = (networkId: any) => {
    if (networkId == 4) {
      return `(ERC20 Token)`;
    }
    if (networkId == 5) {
      return `(BEP20 Token)`;
    }
    if (networkId == 6) {
      return `(TRC20 Token)`;
    }
    return "";
  };

  const evmNetworkHandle = async (networkId: any) => {
    const findObje = responseData?.network?.find(
      (x: any) => x.id === parseInt(networkId)
    );
    setDependecy(Math.random() * 100);
    setSelectedNetwork(findObje);

    if (!networkId) {
      setEvmAddress("");
      return;
    }

    const isAddressExist = responseData?.addressLists.find(
      (item: any) => item.network_id == networkId
    );

    if (isAddressExist?.network_id) {
      setEvmAddress(isAddressExist.address);
      return;
    }

    const response = await getEvmNetworkAddressApi({
      coin_type: responseData?.deposit?.coin_type,
      network: Number(networkId),
    });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    setEvmAddress(response.data);
  };
  return (
    <>
      <div className="my-wallet-new px-0">
        <h5>{t("Total Balance")}</h5>
        <div className="coin-list-item mt-3">
          <div className="coint-flex">
            <img
              className="icon"
              src={responseData?.deposit?.coin_icon || "/bitcoin.png"}
              alt="coin"
              width="25px"
              height="25px"
            />
            <h6>{responseData?.deposit?.coin_type}</h6>
          </div>

          <p className="coin-price">
            {responseData?.deposit?.balance
              ? formateZert(responseData?.deposit?.balance) +
                " " +
                responseData?.deposit?.coin_type
              : "Loading.."}
          </p>
        </div>
        {/* wallet dropdown for network base type 8 */}
        <div className="wallet-addres">
          {(parseInt(responseData?.data?.base_type) === 8 ||
            parseInt(responseData?.data?.base_type) === 6) && (
            <div className="total-balance">
              <h5>{t("Select Network")}</h5>
              <div className="cp-select-area">
                <select
                  name="currency"
                  className="form-control coin-list-item  mt-3"
                  style={{ height: "44px" }}
                  onChange={(e) => {
                    evmNetworkHandle(e.target.value);
                  }}
                >
                  {responseData?.network?.map((item: any, index: number) => (
                    <option value={item.id} key={index}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        {/* wallet dropdown for base type 1 And Coin type usdt */}
        {responseData?.memo && (
          <>
            <h5 className="mt-3">{t("Memo")}</h5>
            <div className="coin-list-item mt-3">
              <p className="coin-price">{responseData?.memo}</p>
            </div>
          </>
        )}

        <div className="wallet-addres">
          {responseData?.wallet.coin_type == "USDT" &&
            parseInt(responseData?.data?.base_type) === 1 && (
              <div className="total-balance">
                <h5>{t("Select Network")}</h5>
                <div className="cp-select-area">
                  <select
                    name="currency"
                    className="form-control coin-list-item  mt-3"
                    style={{ height: "44px" }}
                    onChange={(e) => {
                      const findObje =
                        responseData?.data?.coin_payment_networks.find(
                          (x: any) => x.id === parseInt(e.target.value)
                        );
                      setDependecy(Math.random() * 100);
                      setSelectedNetwork(findObje);
                    }}
                  >
                    {responseData?.data?.coin_payment_networks.map(
                      (item: any, index: number) => (
                        <option value={item.id} key={index}>
                          {item?.network_name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}
        </div>
        {/* wallet dropdown for base type 1 And Coin type usdt end*/}

        {/* base coin type 8  */}

        {(parseInt(responseData?.data?.base_type) === 8 ||
          parseInt(responseData?.data?.base_type) === 6) &&
          selectedNetwork?.id && (
            <>
              <div className="wallet-addres">
                <h5>{t("Address")}</h5>
              </div>

              <div className="wallet-addres-generate">
                <div className="coin-list-item">
                  <div className="wallet-bar-code">
                    {evmAddress && (
                      <>
                        <div className="qr-background">
                          <QRCode
                            className="qrCodeBg rounded"
                            value={evmAddress}
                            size={150}
                          />
                        </div>
                        <div className="copy-box">
                          <div className="input-url input-copy mt-4">
                            <input
                              onClick={() => {
                                copyTextById(evmAddress);
                                selectAddressCopy?.current.select();
                              }}
                              ref={selectAddressCopy}
                              className="address-box address-copy-box border-0 pl-3"
                              type="text"
                              value={evmAddress}
                            />

                            <span
                              className="btn copy-url-btn bg-transparent"
                              onClick={() => {
                                copyTextById(evmAddress);
                                selectAddressCopy?.current?.select();
                              }}
                            >
                              <i className="fa fa-clone"></i>
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

        {/* base coin type not 8  */}

        {parseInt(responseData?.data?.base_type) !== 8 &&
          parseInt(responseData?.data?.base_type) !== 6 && (
            <>
              <div className="wallet-addres">
                <h5>{t("Address")}</h5>
                <div className="coin-list-item  mt-3">
                  <p className="waring-wallet-text">
                    {t(
                      `Only send ${
                        responseData?.deposit?.coin_type ?? ""
                      } ${checkNetworkFunc(
                        responseData?.deposit?.network
                      )} to this address. Sending any others asset to this adress may result in the loss of your deposit!`
                    )}
                  </p>
                </div>
              </div>

              <div className="wallet-addres-generate">
                <div className="coin-list-item">
                  <div className="wallet-bar-code">
                    {/* {responseData?.address && (
                      <div className="qr-background">
                        <QRCode
                          className="qrCodeBg rounded"
                          value={responseData?.address}
                          size={150}
                        />
                      </div>
                    )} */}
                    {selectedNetwork?.address &&
                    responseData?.wallet.coin_type === "USDT" ? (
                      <div className="qr-background">
                        <QRCode
                          className="qrCodeBg rounded"
                          value={selectedNetwork?.address}
                          size={150}
                        />
                      </div>
                    ) : (
                      responseData?.data?.address?.length !== 0 &&
                      responseData?.data?.address[0]?.address && (
                        <div className="qr-background">
                          <QRCode
                            className="qrCodeBg rounded"
                            value={responseData?.data?.address[0]?.address}
                            size={150}
                          />
                        </div>
                      )
                    )}

                    <div className="copy-box">
                      <div className="input-url input-copy mt-4">
                        {selectedNetwork?.address &&
                        responseData?.wallet.coin_type == "USDT" ? (
                          <>
                            <input
                              onClick={() => {
                                copyTextById(selectedNetwork?.address);
                                selectAddressCopy?.current.select();
                              }}
                              ref={selectAddressCopy}
                              className="address-box address-copy-box border-0 pl-3"
                              type="text"
                              value={selectedNetwork?.address}
                            />

                            <span
                              className="btn copy-url-btn"
                              onClick={() => {
                                copyTextById(selectedNetwork?.address);
                                selectAddressCopy?.current?.select();
                              }}
                            >
                              <i className="fa fa-clone"></i>
                            </span>
                          </>
                        ) : responseData?.data?.address?.length !== 0 &&
                          responseData?.data?.address[0]?.address ? (
                          <>
                            <input
                              onClick={() => {
                                copyTextById(
                                  responseData?.data?.address[0]?.address
                                );
                                selectAddressCopy?.current.select();
                              }}
                              ref={selectAddressCopy}
                              className="border-0 address-copy-box ml-3"
                              type="text"
                              value={responseData?.data?.address[0]?.address}
                            />

                            <span
                              className="copy-url-btn cp-button"
                              onClick={() => {
                                copyTextById(
                                  responseData?.data?.address[0]?.address
                                );
                                selectAddressCopy?.current?.select();
                              }}
                            >
                              <i className="fa fa-clone"></i>
                            </span>
                          </>
                        ) : (
                          <p
                            ref={selectAddressCopy}
                            id="url-copy"
                            className="address-box"
                          >
                            {t("No address found!")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!selectedNetwork?.address &&
                  responseData?.wallet?.coin_type == "USDT" &&
                  parseInt(responseData?.data?.base_type) === 1 && (
                    <button
                      className=" primary-btn-outline btn-withdraw text-white w-100 mt-4"
                      onClick={() => {
                        GetWalletAddressAction(
                          {
                            wallet_id: router.query.coin_id,
                            network_type: selectedNetwork?.network_type ?? "",
                          },
                          setSelectedNetwork,
                          setDependecy
                        );
                      }}
                    >
                      {t("Get address")}
                    </button>
                  )}
              </div>
            </>
          )}
      </div>
    </>
  );
};
