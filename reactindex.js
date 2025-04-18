const { useState } = React;

function App() {
  const [activeApp, setActiveApp] = useState("szampar");

  return (
    <div className="container text-center mt-4">
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setActiveApp("szampar")}>
          Számpárosító
        </button>
        <button className="btn btn-success" onClick={() => setActiveApp("kockaszin")}>
          Kockaszín választó
        </button>
      </div>
      <div className="mt-4">
        {activeApp === "szampar" ? <SzamparApp /> : <KockaszinApp />}
      </div>
    </div>
  );
}

// Ez fontos: globálisan exportáljuk, hogy a react.html alján hivatkozhassunk rá
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
