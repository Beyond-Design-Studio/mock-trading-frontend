import React from "react";
import loadingstyle from "@styles/loading.module.scss";

const Loading = (): JSX.Element => {
  return (
    <div className={loadingstyle.bouncingLoader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Loading;
