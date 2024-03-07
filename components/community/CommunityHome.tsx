import { formateDateMunite } from "common";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBlogHomePageDataApi } from "service/landing-page";
import { RootState } from "state/store";
import Slider from "react-slick";

// Add a function to determine the color based on the index
const getColorByIndex = (index : any) => {
  const colors = ['#26b885', '#00A66C', '#525CDD', '#70C1F9', '#F79B3A', '#49D968', 'yellow'];
  return colors[index % colors.length];
};

export default function CommunityHome() {
  const { settings } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation();

  const [blogList, setBlogList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const Slidersettings = {
    dots: false,
    infinite: true,
    speed: 500,
    className: "center",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const {
    blog_section_heading,
    blog_section_description,
    blog_section_banner_description,
    blog_section_banner_image,
  } = settings;

  useEffect(() => {
    getBlogHomePageData();
  }, []);

  const getBlogHomePageData = async () => {
    setLoading(true);
    const response = await getBlogHomePageDataApi();
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    setBlogList(response.data);
    setLoading(false);
  };

  if (loading) return <SectionLoading />;

  return (
    <section className="bg-card-primary-clr pt-60 pb-60 community-home">
      
      <div className="container">
        <div className="community-home-header">
          <div className="section-title">
            <h2 className="heading1my" style={{ textAlign: "left" }}>
              Benefits of <span className="heading1mySub">Qbitdex </span>
              Trades
            </h2>
          </div>
          {/* <div className="community-home-title-section">
            <h3 className="community-home-title">
              {blog_section_heading ?? "Trending on Republic Exchange Feed"}
            </h3>
            <Link href={`/blog`}>
              <span className="community-home-btn">
                <span>{t(`View More`)}</span>
                <span>
                  <BsChevronRight size={12} />
                </span>
              </span>
            </Link>
          </div> */}

          {/* <h4 className="community-home-subtitle">
            {blog_section_description ??
              "Discover the latest crypto news and feed from news media and influencers."}
          </h4> */}
        </div>
        <div className="community-home-body row">
          <div className="col-lg-12">
            {blogList.length > 0 ? (
              <Slider {...Slidersettings}>
                {blogList.map((item: any, index: any) => (
                  <div className="community-item" key={index}>
                    <div className="myCardDiv">
                      <div className="myCardDivSub" /*style={{ background: getColorByIndex(index) }}*/>
                        <img src={`./blog${index}.png`} data-src={index} className={`text-white ${index}`} />
                      </div>
                      <div className="communityDescription">
                        <h5>{item?.category}</h5>
                        <Link href={`blog/${item?.slug}`}>
                          <div className="community-item-des cursor-pointer">
                            <p className="m-0">
                              {item?.body?.substring(0, 80)}...
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    {/* <div>
                      <div className="d-flex gap-10 align-items-center">
                        <img
                          className="community-user-img"
                          src={"/blog.svg"}
                          alt=""
                        />
                        <span>{item?.category}</span>
                      </div>
                      <Link href={`blog/${item?.slug}`}>
                        <div className="community-item-des cursor-pointer">
                          <p>{item?.body?.substring(0, 80)}...</p>
                        </div>
                      </Link>
                      <p className="community-item-time">
                        {formateDateMunite(item?.publish_at)}
                      </p>
                    </div> */}
                  </div>
                ))}
              </Slider>
            ) : (
              <NoItemFound />
            )}
          </div>
          {/* <div className="col-lg-4">
            <div className="community-home-card">
              <div className="text-center">
                <img
                  className="community-card-img"
                  src={blog_section_banner_image ?? "/community-card.png"}
                  alt=""
                />
              </div>
              <div className="community-card-title-section">
                <h3 className="community-card-title">
                  {blog_section_banner_description ??
                    "World's largest crypto community"}
                </h3>
                <Link href={`/blog`}>
                  <button className="community-card-btn">
                    {t(`Explore now`)}
                  </button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
