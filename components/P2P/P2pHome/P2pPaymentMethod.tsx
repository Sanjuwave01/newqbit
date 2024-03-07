import useTranslation from "next-translate/useTranslation";

export const P2pPaymentMethod = ({ data }: any) => {
  const { t } = useTranslation("common");

  return (
    <div className="container-4xl px-0 my-5">
      <div className="row align-items-center payment_box section-padding-custom mx-2 mx-sm-0 glass-color-bg-custom">
        <div className="col-md-4">
          <h2>{t(`Top Payment Methods`)}</h2>
        </div>
        <div className="col-md-8 pb-4">
          <div className="row">
            {data.payment_method_landing.map((data: any, index: any) => (
              <div className="col-sm-6 col-lg-4 pt-4" key={index}>
                <a className="paymentBox d-flex align-items-center p-3" href="">
                  <div></div>
                  {data?.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
