

function App() {
  const [activeApp, setActiveApp] = useState("szampar");

  return React.createElement("div", { className: "container text-center mt-4" },
    React.createElement("div", { className: "mb-4" },
      React.createElement("button", {
        className: "btn btn-primary me-2",
        onClick: () => setActiveApp("szampar")
      }, "Számpárosító"),
      React.createElement("button", {
        className: "btn btn-success",
        onClick: () => setActiveApp("kockaszin")
      }, "Kockaszín választó")
    ),
    React.createElement("div", { className: "mt-4" },
      activeApp === "szampar"
        ? React.createElement(window.SzamparApp)
        : React.createElement(window.KockaszinApp)
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
