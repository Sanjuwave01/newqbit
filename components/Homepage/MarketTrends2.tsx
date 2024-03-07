import ImageComponent from "components/common/ImageComponent";
import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { CUstomSelect } from "components/common/CUstomSelect";
import MarketsCards from "components/markets/MarketsCards";
import TradesTable from "components/markets/TradesTable";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrenyApi, getMarketCardDatasApi } from "service/markets";

// Import Swiper styles
import "swiper/css";
async function listenMessages(setMarketsCardData: any) {
  //@ts-ignore
  window.Pusher = Pusher;
  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "test",
    wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
    wsPort: process.env.NEXT_PUBLIC_WSS_PORT
      ? process.env.NEXT_PUBLIC_WSS_PORT
      : 6006,
    wssPort: 443,
    forceTLS: false,
    cluster: "mt1",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
  //@ts-ignore
  window.Echo.channel(`market-overview-coin-statistic-list-data`).listen(
    ".market-overview-coin-statistic-list",
    (e: any) => {
      setMarketsCardData(e);
    }
  );
}
const MarketTrends2 = ({
  landing,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
}: any) => {

  const { t } = useTranslation("common");
  const [marketsCardData, setMarketsCardData] = useState<any>();
  const [allCurrency, setAllCurrency] = useState([
    {
      label: "USD",
      value: "USD",
    },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState({
    label: "USD",
    value: "USD",
  });

  useEffect(() => {
    getCurreny();
  }, []);

  useEffect(() => {
    getMarketCardDatas(selectedCurrency.value);
  }, [selectedCurrency]);

  useEffect(() => {
    listenMessages(setMarketsCardData);
  }, []);

  const getCurreny = async () => {
    const data = await getCurrenyApi();
    if (!data.success) {
      toast.error(data.message);
    }
    setAllCurrency(data.data);
  };
  const getMarketCardDatas = async (currency_type: any) => {
    const data = await getMarketCardDatasApi(currency_type);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setMarketsCardData(data.data);
  };

  const handleCoinType = (data: any) => {
    setSelectedCurrency(data);
  };

  // console.log('marketsCardData',marketsCardData)

  const router = useRouter();


  return (
    <div>
      {parseInt(landing.landing_third_section_status) === 1 && (
        <section className="hero-banner-bottom">
          <div className="container">
            {/* <div className="section-title">
              <h2 className="title">
                {landing?.market_trend_title || t("Market Trend")}
              </h2>
            </div> */}
            <div className="exchange-tab-menu">
              <Swiper
                className="mySwiper item-list"
                slidesPerView={6}
                spaceBetween={30}
                loop={true}
                modules={[Navigation]}
                breakpoints={{
                  390: {
                    slidesPerView: 2,
                  },
                  639: {
                    slidesPerView: 3,
                  },
                  865:{
                    slidesPerView:4
                  },
                  1000:{
                    slidesPerView:5
                  },
                  1500:{
                    slidesPerView:6
                  }
                }}
              >
                {marketsCardData?.highlight_coin.map(
                  (item: any, index: number) => (
                    <SwiperSlide key={index}>
                      {/* Your slide content based on the highlight_coin data */}
                      <div className="d-flex single-item">
                        {/* Display coin details using item properties */}
                        <img
                          className="icon"
                          src={item.coin_icon}
                          alt={item.coin_type}
                        />
                        <div className="marketSymbols">
                          <span
                            className="quoteSymbol my18font"
                          >
                            <b>{item.coin_type}</b>
                          </span>
                        </div>
                        <span className="symbolPrice">{item?.currency_symbol}{parseFloat(item?.usdt_price).toFixed(2)}</span>
                        <span
                          className={`percent ${
                            parseFloat(item?.change) >= 0 ? "incrase" : "decrase"
                          } `}
                        >
                          {item?.change >= 0
                            ? "+" + parseFloat(item?.change).toFixed(2)
                            : parseFloat(item?.change).toFixed(2)}%
                        </span>
                      </div>
                    </SwiperSlide>
                  )
                )}
                                {marketsCardData?.top_gainer_coin.map(
                  (item: any, index: number) => (
                    <SwiperSlide key={index}>
                      {/* Your slide content based on the highlight_coin data */}
                      <div className="d-flex single-item">
                        {/* Display coin details using item properties */}
                        <img
                          className="icon"
                          src={item.coin_icon}
                          alt={item.coin_type}
                        />
                        <div className="marketSymbols">
                          <span
                            className="quoteSymbol my18font"
                          >
                            <b>{item.coin_type}</b>
                          </span>
                        </div>
                        <span className="symbolPrice">{item?.currency_symbol}{parseFloat(item?.usdt_price).toFixed(2)}</span>
                        <span
                          className={`percent ${
                            parseFloat(item?.change) >= 0 ? "incrase" : "decrase"
                          } `}
                        >
                          {item?.change >= 0
                            ? "+" + parseFloat(item?.change).toFixed(2)
                            : parseFloat(item?.change).toFixed(2)}%
                        </span>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketTrends2;
