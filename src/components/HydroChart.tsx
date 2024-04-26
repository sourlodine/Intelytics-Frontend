import React, { useEffect, useRef, memo, useState } from "react";

function HydroChart() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const container: any = useRef();

  const createTVWindow = () => {};
  createTVWindow();

  useEffect(() => {
    if (container.current && !scriptLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
              {
                "width": "100%",
                "height": "100%",
                "symbol": "DEFILLAMA:HYDRA_TVL",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "3",
                "locale": "in",
                "enable_publishing": false,
                "allow_symbol_change": false,
                "save_image": false,
                "calendar": false,
                "hide_top_toolbar": true,
                "hide_legend": true,
                "studies": [
                  "Volume@tv-basicstudies"
                ],
                "support_host": "https://www.tradingview.com"
              }`;
      script.onload = () => {
        setScriptLoaded(true);
      };
      if (!container.current.querySelector("script")) {
        container.current.appendChild(script);
      }
    }
  }, [container, scriptLoaded]);

  return (
    <div className="w-[50vw] h-[50vh] p-5">
      <div className="tradingview-widget-container" ref={container as any}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(HydroChart);
