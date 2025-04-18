function KockaszinApp() {
    const szinek = {
      2: "red",
      3: "blue",
      4: "green",
      5: "orange",
      6: "purple",
      7: "yellow",
      8: "pink",
      9: "turquoise",
      10: "brown",
      11: "gray",
      12: "black"
    };
  
    const [dobasok, setDobasok] = React.useState([]);
    const [ossz, setOssz] = React.useState(null);
    const [szin, setSzin] = React.useState(null);
  
    const dob = (db) => {
      const eredmenyek = Array.from({ length: db }, () => Math.ceil(Math.random() * 6));
      const osszeg = eredmenyek.reduce((a, b) => a + b, 0);
      setDobasok(eredmenyek);
      setOssz(osszeg);
      setSzin(szinek[osszeg] || null);
    };
    //SVG dobókocka rajzolása és színezése.
    const renderSVG = (color, index) =>
      React.createElement(
        "svg",
        {
          key: index,
          viewBox: "0 0 512 512",
          width: "100px",
          height: "100px",
          xmlns: "http://www.w3.org/2000/svg",
          style: { margin: "10px" }
        },
        React.createElement("g", null,
          React.createElement("path", {
            fill: color,
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "32",
            d: "M448,341.37V170.61A32,32,0,0,0,432.11,143l-152-88.46a47.94,47.94,0,0,0-48.24,0L79.89,143A32,32,0,0,0,64,170.61V341.37A32,32,0,0,0,79.89,369l152,88.46a48,48,0,0,0,48.24,0l152-88.46A32,32,0,0,0,448,341.37Z"
          }),
          React.createElement("polyline", {
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "32",
            points: "69 153.99 256 263.99 443 153.99"
          }),
          React.createElement("line", {
            fill: "none",
            stroke: "#000000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "32",
            x1: "256",
            y1: "463.99",
            x2: "256",
            y2: "263.99"
          }),
          ...[
            [256, 152],
            [208, 296],
            [112, 328],
            [304, 296],
            [400, 240],
            [304, 384],
            [400, 328]
          ].map(([cx, cy], i) =>
            React.createElement("ellipse", {
              key: i,
              cx,
              cy,
              rx: 16,
              ry: 24,
              fill: "#000000"
            })
          )
        )
      );
  
    return React.createElement("div", { className: "text-center" },
      React.createElement("h3", null, "Kockaszín választó"),
      React.createElement("div", { className: "my-3" },
        React.createElement("button", {
          className: "btn btn-primary me-2",
          onClick: () => dob(1)
        }, "1 kocka"),
        React.createElement("button", {
          className: "btn btn-success",
          onClick: () => dob(2)
        }, "2 kocka")
      ),
      React.createElement("p", null,
        dobasok.length ? `Dobott értékek: ${dobasok.join(", ")} (Összeg: ${ossz})` : "Még nem történt dobás."
      ),
      szin && React.createElement("p", { className: "fw-bold" }, `A dobás színe: ${szin}`),
      React.createElement("div", {
        className: "d-flex justify-content-center flex-wrap mt-3"
      }, dobasok.map((_, i) => renderSVG(szin, i)))
    );
  }
  
  window.KockaszinApp = KockaszinApp;
  