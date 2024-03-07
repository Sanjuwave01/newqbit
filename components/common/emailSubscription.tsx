import React, { useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import request from "lib/request";

const EmailSubscription = () => {
  
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false);
  
  const handleSubscription = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await request.post("subscribe", { email });
      toast.success(data.message);
    } catch (error: any) {
      if (error.response.status === 422)
        toast.info(error.response.data.errors["email"][0]);
      if (error.response.status === 500)
        toast.error("Somthing went wrong please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="email-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-12">
              <h2>
                Republic Exchange <span>Newsletter!</span>
              </h2>
              <p>
                The standard Lorem Ipsum passage, used since the 1500sLorem
                ipsum dolor sit ame
              </p>
            </div>
            <div className="col-lg-5 col-md-6 col-12">
              <form onSubmit={handleSubscription}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control no-outline"
                    placeholder="Enter your email"
                    aria-label="Recipient's email"
                    aria-describedby="button-addon2"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="right-arrow"
                    type="submit" // Change the type to submit
                    id="button-addon2"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                  {loading && <span>Loading...</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmailSubscription;
