// Rate of $0.15 / click

const MainContentAd = () => (
  <div
    style={{ marginTop: 30 }}
    dangerouslySetInnerHTML={{
      __html: `
        <img
          referrerpolicy="no-referrer-when-downgrade"
          src="https://balazsimre.matomo.cloud/matomo.php?idsite=4&amp;rec=1"
          style="border: 0; width: 1px; height: 1px;"
          alt=""
        />
        <a
          href="https://balazsimre.com/free-video-500-per-day"
          title="CLICK HERE TO WATCH VIDEO: How To Make $500+/Day With 30 Minutes A Day!"
          onClick="_paq.push(['trackEvent', 'Click', 'B0101', 'CWS']);"
          target="_blank"
          name="b0101"
          style="max-width: 99%;"
        >
          <img
            src="https://cdn4.balazsimre.com/trading/ban/Ban01-02.jpg"
            style="max-width: 99%;"
            alt="WATCH VIDEO: How To Make $500+/Day With 30 Minutes Per Day!"
          />
        </a>
      `,
    }}
  />
);

// Client has requested to use html string instead...
//
// function trackClick() {
//   if (process.env.NODE_ENV !== "production" && process.browser) {
//     !window._paq && (window._paq = []);
//     window._paq.push(["trackEvent", "Click", "B0101", "CWS"]);
//   }
// }
//
// const MainContentAd = () => (
//   <div className="advertisement" style={{ marginTop: 30 }}>
//     <img
//       referrerPolicy="no-referrer-when-downgrade"
//       src="https://balazsimre.matomo.cloud/matomo.php?idsite=4&rec=1"
//       style={{ border: 0, width: 1, height: 1 }}
//     />
//     <a
//       href="https://balazsimre.com/free-video-500-per-day"
//       title="CLICK HERE TO WATCH VIDEO: How To Make $500+/Day With 30 Minutes A Day!"
//       name="b0101"
//       target="_blank"
//       style={{ maxWidth: "99%" }}
//       // onClick={trackClick}
//       onClick="_paq.push(['trackEvent', 'Click', 'B0101', 'CWS']);"
//     >
//       <img
//         src="https://cdn4.balazsimre.com/trading/ban/Ban01-02.jpg"
//         alt="WATCH VIDEO: How To Make $500+/Day With 30 Minutes Per Day!"
//         style={{ maxWidth: "99%" }}
//       />
//     </a>
//   </div>
// );

export default MainContentAd;
