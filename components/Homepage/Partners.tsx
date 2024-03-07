import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Partners = ({
  landing,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
  announcementListdata
}: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  console.log(asset_coin_pairs);

  return (
    <React.Fragment>
      {parseInt(landing.landing_third_section_status) === 1 && (
        <section className="bg-light partnersWrap">
          <div className="container">
            <div className="section-title">
              <h2 className="heading1my">
              That is why you should choose <span className="heading1mySub"> Qbitdex</span>. We provide <span className="heading1mySub">simple and efficient</span> software as well as <span className="heading1mySub">unbeatable and secure</span> hardware
              </h2>
              <p className="subheading3">
              YOUR CHOICE IS THE SAME AS THEIRS
              </p>
              <img className="m-auto" draggable="false" alt="arrow" src="data:image/png;base64,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" />
            </div>
            <div className="partnersList">
              <div className="row align-items-center justify-content-center">
                {announcementListdata?.map(
                (item: any, index: number) => (
                  <div className="col-3 partnerSingle" key={index}>
                    <img
                      className="icon mr-3"
                      src={item.image}
                      alt={item.slug}
                      height={"25px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => window.open(item.description, '_blank')}
                    />
                  </div>
                ))};
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Partners;
