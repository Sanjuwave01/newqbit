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

const Advertisement = ({
  bannerListdata,
  landing,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
}: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  console.log(asset_coin_pairs);

  return (
    <React.Fragment>
      {parseInt(landing.landing_third_section_status) === 1 && (
        <section>
          <div className="container">
            {/* <div className="section-title">
              <h2 className="title">
                {t("Advertisement Coins")}
              </h2>
            </div> */}
            <div className="exchange-tab-menu advertisements">
              <Swiper
                className="mySwiper"
                slidesPerView={3}
                spaceBetween={15}
                navigation={true}
                modules={[Navigation]}
              >

                {bannerListdata?.length > 0 && parseInt(landing?.landing_second_section_status) === 1 && (
                  <Swiper>
                    {bannerListdata.map((item: any, index: number) => (
                      <SwiperSlide key={index} className="advertisementSlide">
                        <img className="advertisementImg" src={item?.image} alt={`ad${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
            </Swiper>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Advertisement;
