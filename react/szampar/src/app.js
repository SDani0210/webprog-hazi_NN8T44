const { useState, useEffect } = React;

function SzamparApp() {
  const generateCards = () => {
    const values = [...Array(10).keys()].flatMap(i => [i + 1, i + 1]); // 10 pár
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values.map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
  };

  const [cards, setCards] = useState(generateCards);
  const [flipped, setFlipped] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);

  const handleClick = (index) => {
    if (disabled || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    const newFlipped = [...flipped, index];
    setCards(newCards);
    setFlipped(newFlipped);
    setClickCount(prev => prev + 1);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [i, j] = flipped;
      const first = cards[i];
      const second = cards[j];

      if (first.value === second.value) {
        const newCards = [...cards];
        newCards[i].matched = true;
        newCards[j].matched = true;
        setTimeout(() => {
          setCards(newCards);
          setFlipped([]);
          setDisabled(false);
        }, 600);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[i].flipped = false;
          newCards[j].flipped = false;
          setCards(newCards);
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setEndTime(Date.now());
    }
  }, [cards]);

  const resetGame = () => {
    setCards(generateCards());
    setFlipped([]);
    setDisabled(false);
    setClickCount(0);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const cardElements = cards.map((card, index) =>
    React.createElement(
      "div",
      {
        key: card.id,
        className: `card m-1 p-3 border ${card.flipped || card.matched ? 'bg-info text-white' : 'bg-light'}`,
        style: {
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "20px"
        },
        onClick: () => handleClick(index)
      },
      card.flipped || card.matched ? card.value : "?"
    )
  );

  return React.createElement("div", null,
    React.createElement("h3", null, "Számpárosító játék"),
    React.createElement("button", {
      className: "btn btn-danger mb-3",
      onClick: resetGame
    }, "Újraindítás"),
    React.createElement("div", {
      className: "d-flex justify-content-center align-items-start"
    },
      React.createElement("div", {
        className: "d-flex flex-wrap",
        style: { width: "300px" }
      }, cardElements),
      React.createElement("div", {
        className: "ms-4 p-3 border rounded",
        style: { backgroundColor: "#f0f0f0", minWidth: "160px" }
      },
        React.createElement("p", null, `Kattintások: ${clickCount}`),
        endTime && React.createElement("p", null, `Idő: ${Math.floor((endTime - startTime) / 1000)} mp`)
      )
    )
  );
}

window.SzamparApp = SzamparApp;
