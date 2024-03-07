import type { GetServerSideProps, NextPage } from "next";
import { CommonLandingCustomSettings } from "service/landing-page";
import useTranslation from "next-translate/useTranslation";
import Navbar from "components/common/Navbar";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import Footer from "components/common/footer";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { SEO } from "components/SEO";
import UnAuthNav from "components/common/unAuthNav";
import Cover from "components/Homepage/Cover";
import SliderSection from "components/Homepage/SliderSection";
import MarketTrends from "components/Homepage/MarketTrends";
import DistributionSection from "components/Homepage/DistributionSection";
import BottomDetails from "components/Homepage/BottomDetails";
import GetInTouch from "components/Homepage/GetInTouch";
import StartTradingNow from "components/Homepage/StartTradingNow";
import CommunityHome from "components/community/CommunityHome";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import MarketTrends2 from "components/Homepage/MarketTrends2";
import Advertisement from "components/Homepage/Advertisement";
import Partners from "components/Homepage/Partners";
import SliderSection2 from "components/Homepage/SliderSection2";
import EmailSubscription from "components/common/emailSubscription";


const Home: NextPage = ({
  landing,
  bannerListdata,
  announcementListdata,
  featureListdata,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
  loggedin,
  landing_banner_image,
  customSettings,
}: any) => {
  const { settings: common } = useSelector((state: RootState) => state.common);
  useEffect(() => {
    //@ts-ignore
    window.$crisp = [];
    //@ts-ignore
    // window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_ID;
    window.CRISP_WEBSITE_ID = common.live_chat_key;
    // live_chat_key
    (function () {
      //@ts-ignore
      if (common.live_chat_status == "1") {
        var d = document;
        var s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        //@ts-ignore
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      }
    })();
  }, [common.live_chat_status]);
  return (
    <SEO seoData={customSettings}>
      <div>
        <div>
          {loggedin ? (
            <Navbar settings={customSettings} isLoggedIn={loggedin} />
          ) : (
            <UnAuthNav />
          )}
          <>
            <section className="hero-banner-area"><div className="container">
              <div className="row flex-md-row-reverse align-items-center">
                <div className="col-md-6 main_banner_img">
                  <img src="/uploaded_file/uploads/658acaaf6be291703594671.jpg" /></div>
                <div className="col-md-6 conver-col1"><h1 className="banner-title">
                  <div><div>Buy &amp; Sell Instantly &amp; Hold <span style={{ color: "#26b885" }}>Cryptocurrency</span> With Crypto</div></div></h1>
                  <p className="banner-content">Qbitdex is such a marketplace where people can trade directly with each other.</p>
                  <a href="/signup" className="btn btn-primary banner-btn">Let’s Get Started
                    <img src="/Group.png" alt="" /></a></div></div></div></section>
            <MarketTrends2
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
            />
            
                <section>
                  <div className="container exchange-tab-menu advertisements">
                      <div className="row">
                          <div className="col-lg-4">
                            <img className="advertisementImg" src="/uploaded_file/uploads/qbit - 1.png" alt="ad1" />   
                          </div>
                          <div className="col-lg-4">
                             <img className="advertisementImg" src="/uploaded_file/uploads/qbit - 3.png" alt="ad3" />   
                          </div>
                          <div className="col-lg-4">
                          <img className="advertisementImg" src="/uploaded_file/uploads/qbit - 2.png" alt="ad2" />  
                          </div>
                          
                      </div>
                  </div>
                </section>

            <MarketTrends
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
            />
            <section className="main-sub-sec">
              <div className="inner-sub-mob-sec">
                <div className="container">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-12"><div className="mobile-images">
                      <img className="iphone" src="/uploaded_file/uploads/658be19b0af661703666075.jpg" alt="ad1" /></div>
                    </div><div className="col-lg-6 col-xl-5 col-12">
                      <div className="content-sec-mobile"><h2>Build Your  <span style={{ color: "#26b885" }}>Career In Trading</span></h2>
                        <p className="mb-4">Our trading app has a variety of features that make it the best place to start trading</p>
                        <div className="iconDetailsWrap"><div className="detailIcon">
                          <img src="/uploaded_file/uploads/online-resume.svg" alt="" /></div>
                          <div className="detailDescription"><h4>Manage your portfolio</h4>
                            <p>Buy and sell popular digital currencies, keep track of them at once place.</p>
                          </div></div><div className="iconDetailsWrap"><div className="detailIcon"><img src="/uploaded_file/uploads/cycle.svg" alt="" /></div>
                          <div className="detailDescription">
                            <h4>Recurrign Buys</h4><p>Invest in Cryptocurrency slowly over time by scheduling buys daily, weekly or monthly.</p></div>
                        </div><div className="iconDetailsWrap"><div className="detailIcon"><img src="/uploaded_file/uploads/devices.svg" alt="" /></div>
                          <div className="detailDescription">
                            <h4>Available everywhere</h4><p>Stay on top of market with our platform Available on every device.</p></div>
                        </div></div></div></div></div></div></section>
            <section className="customizationWrap"><div className="container">
              <div className="row justify-content-between align-items-center flex-md-row-reverse">
                <div className="col-lg-5 col-md-6 col-12">
                  <img className="icon" src="/uploaded_file/uploads/658be1ab8902f1703666091.jpg" alt="ad1" /></div>
                <div className="col-lg-5 col-md-6 col-12"><div className="heading1my"><div>
                  <div>Easy <span style={{ color: "#26b885" }}>Customization</span>  <div className="subheading1" style={{ padding: "5px 0" }}>   Secure Trend System </div>  <p className="subheading2" style={{ padding: "5px 0" }}> Secure Trend System<br />
                    Qbitdex is a complete crypto coins exchange platform                 developed with Laravel. It works via coin payment. There is no
                    need for any personal node, it will connect with a coin payment                 merchant account. Our system is 100% secure and dynamic. It
                    supports all crypto currency wallets including Coin Payment,                 Deposit, Withdrawal, Referral system, and whatever you need.
                  </p></div></div></div><div><button className="btn btn-primary">Know More</button></div></div></div></div></section>

            {common?.blog_news_module == "1" && <CommunityHome />}
            <GetInTouch landing={landing} featureListdata={featureListdata} />

            {/* <Cover
              landing={landing}
              loggedin={loggedin}
              landing_banner_image={landing_banner_image}
            />
            <MarketTrends2
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
            />
            <Advertisement
              bannerListdata={bannerListdata}
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
            />
            <MarketTrends
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
            />
            <SliderSection
              bannerListdata={bannerListdata}
              landing={landing}
              announcementListdata={announcementListdata}
            /> */}
            {/* <BottomDetails
            bannerListdata={bannerListdata}
            landing={landing}
            announcementListdata={announcementListdata}
            />
            <Partners
              landing={landing}
              asset_coin_pairs={asset_coin_pairs}
              hourly_coin_pairs={hourly_coin_pairs}
              latest_coin_pairs={latest_coin_pairs}
              announcementListdata={announcementListdata}
            />
            
            <SliderSection2
              bannerListdata={bannerListdata}
              landing={landing}
              announcementListdata={announcementListdata}
            />
             community section start*/}
            {/* {common?.blog_news_module == "1" && <CommunityHome />} */}

            {/* community section end*/}
            {/* <DistributionSection landing={landing} /> */}

            {/* <BottomDetails landing={landing} /> */}

            {/* Trade. Anywhere. area end here  */}
            {/* Get in touch. area start here  */}
            {/* <GetInTouch landing={landing} featureListdata={featureListdata} /> */}

            {/* Get in touch. area end here  */}
            {/* Start trading area start here  */}
            {/* <StartTradingNow landing={landing} loggedin={loggedin} /> */}
          </>

          {/* Start trading area end here  */}
          {/* footer area start here */}
          {/* <EmailSubscription /> */}

          <Footer />
          <a
            id="scrollUp"
            href="#top"
            style={{ position: "fixed", zIndex: 2147483647, display: "none" }}
          >
            <i className="fa fa-angle-up" />
          </a>
          <div id="vanillatoasts-container" />
        </div>
      </div>
    </SEO>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data: CommonLanding } = await CommonLandingCustomSettings(ctx.locale);
  const cookies = parseCookies(ctx);
  return {
    props: {
      customPageData: CommonLanding?.custom_page_settings
        ? CommonLanding?.custom_page_settings
        : null,
      socialData: CommonLanding?.landing_settings?.media_list
        ? CommonLanding?.landing_settings?.media_list
        : null,
      copyright_text: CommonLanding?.landing_settings?.copyright_text
        ? CommonLanding?.landing_settings?.copyright_text
        : null,
      landing: CommonLanding?.landing_settings,
      bannerListdata: CommonLanding?.landing_settings?.banner_list
        ? CommonLanding?.landing_settings.banner_list
        : null,
      announcementListdata: CommonLanding?.landing_settings?.announcement_list
        ? CommonLanding?.landing_settings?.announcement_list
        : null,
      featureListdata: CommonLanding?.landing_settings?.feature_list
        ? CommonLanding?.landing_settings?.feature_list
        : null,
      asset_coin_pairs: CommonLanding?.landing_settings?.asset_coin_pairs
        ? CommonLanding?.landing_settings?.asset_coin_pairs
        : null,
      hourly_coin_pairs: CommonLanding?.landing_settings?.hourly_coin_pairs
        ? CommonLanding?.landing_settings?.hourly_coin_pairs
        : null,
      latest_coin_pairs: CommonLanding?.landing_settings?.latest_coin_pairs
        ? CommonLanding?.landing_settings?.latest_coin_pairs
        : null,
      loggedin: cookies?.token ? true : false,
      landing_banner_image: CommonLanding?.landing_settings
        ?.landing_banner_image
        ? CommonLanding?.landing_settings?.landing_banner_image
        : null,
      customSettings: CommonLanding?.common_settings,
    },
  };
};
export default Home;
