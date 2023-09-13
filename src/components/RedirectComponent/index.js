import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../helpers/requests";

const RedirectComponent = () => {
  const { shortParam } = useParams();

  useEffect(() => {
    get(`api/redirect/${shortParam}`)
      .then(({ data }) => (window.location.href = data.url))
      .catch((e) => console.error("Error fetching full URL:", e));
    get(`api/redirect/${shortParam}`);
  }, [shortParam]);

  return <div>Redirecting...</div>;
};

export default RedirectComponent;
