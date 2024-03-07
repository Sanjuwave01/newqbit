import ImageComponent from "components/common/ImageComponent";
import React from "react";

const GetInTouch = ({ landing, featureListdata }: any) => {
  return (
    <div>
      <section className="get-touch-area">
        
        <div className="container">
          <div className="section-title mb-3">
            <h2 className="title">
              {landing?.landing_feature_title} 
              <img draggable="false" alt="arrow" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MyA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ljc0NDAyZS0wNiAwTDI4LjA1MDkgMS42Njg5M2UtMDVDMzMuMDIxNCAxLjk1NTAzZS0wNSAzNy4wNTA5IDQuMDI5NDUgMzcuMDUwOSA5LjAwMDAxVjM0LjMxMTFMNDcuMTY1IDI0LjE0OTVMNTIuODM1IDI5Ljc5MzFMMzMuMDUwOSA0OS42NzAxTDEzLjI2NjcgMjkuNzkzMUwxOC45MzY3IDI0LjE0OTVMMjkuMDUwOSAzNC4zMTExVjkuMDAwMDFDMjkuMDUwOSA4LjQ0NzczIDI4LjYwMzEgOC4wMDAwMiAyOC4wNTA5IDguMDAwMDJMMCA4TDQuNzQ0MDJlLTA2IDBaIiBmaWxsPSIjMTAxMTExIi8+Cjwvc3ZnPgo=" className="css-1uyp34x" />
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mt-4">
              <div className="contactCard">
                <img src="./career.svg" />
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <h3 className="card-title">Careers</h3>
                  <p className="card-content">
                    Help build the future of technology. Start your new career
                    at Republic Exchange
                  </p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 ">
              <div className="contactCard">
                <img src="./team.svg" />
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <h3 className="card-title">Community</h3>
                  <p className="card-content">
                  Become part of the our vibrant community, unlocking a wealth of valuable experiences.
                  </p>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4">
              <div className="contactCard">
                <img src="./24-hours.svg" />
                <a href={"#"} target={"_blank"} rel="noreferrer">
                  <h3 className="card-title">24 / 7 Support</h3>
                  <p className="card-content">
                  The answer to 90% of your questions can be found with our 24x7 support.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInTouch;
