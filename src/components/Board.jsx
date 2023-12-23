import { useEffect, useState } from "react";
import { blank, red, green, yellow, purple, blue } from "../images/images";

function Board() {
  const candy = [blank, red, green, yellow, purple, blue];
  const width = 8;
  const [candyArrangement, setCandyArrangement] = useState([]);
  const [candyBeingDragged, setCandyBeingDragged] = useState([]);
  const [candyBeingReplaced, setCandyBeingReplaced] = useState([]);

  const gameBoard = () => {
    let candyArray = [];
    for (let i = 0; i < width * width; i++) {
      let randomColor = Math.floor(Math.random() * candy.length);
      candyArray.push(candy[randomColor]);
    }
    setCandyArrangement(candyArray);
  };

  const checkFiveMatchesInRow = () => {
    for (let i = 0; i < 64; i++) {
      let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];

      const invalid = [
        5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 37, 38, 39,
        40, 45, 46, 47, 48, 53, 54, 55, 56, 61, 62, 63, 64, 65,
      ];

      if (invalid.includes(i)) {
        continue;
      }

      if (
        rowOfFive.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        rowOfFive.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkFourMatchesInRow = () => {
    for (let i = 0; i < 64; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];

      const invalid = [
        6, 7, 8, 14, 15, 16, 22, 23, 24, 30, 31, 32, 39, 40, 46, 47, 48, 54, 55,
        56, 63, 64, 65,
      ];

      if (invalid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        rowOfFour.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkThreeMatchesInRow = () => {
    for (let i = 0; i < 64; i++) {
      let rowOfThree = [i, i + 1, i + 2];

      const invalid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];

      if (invalid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        rowOfThree.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkFiveMatchesInColumn = () => {
    for (let i = 0; i < 38; i++) {
      let columnOfFive = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 3,
      ];
      if (
        columnOfFive.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        columnOfFive.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkFourMatchesInColumn = () => {
    for (let i = 0; i < 38; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      if (
        columnOfFour.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        columnOfFour.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const checkThreeMatchesInColumn = () => {
    for (let i = 0; i < 46; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      if (
        columnOfThree.every(
          (candy) => candyArrangement[candy] === candyArrangement[i]
        )
      ) {
        columnOfThree.forEach((candy) => (candyArrangement[candy] = blank));
        return true;
      }
    }
  };

  const candyBelow = () => {
    for (let i = 0; i < 56; i++) {
      let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      let isFirstRow = firstRow.includes(i);

      if (isFirstRow && candyArrangement[i] === blank) {
        let randomColorCandy = candy[Math.floor(Math.random() * candy.length)];
        candyArrangement[i] = randomColorCandy;
      }

      if (candyArrangement[i + width] === blank) {
        candyArrangement[i + width] = candyArrangement[i];
        candyArrangement[i] = blank;
      }
    }
  };

  const handleDragStart = (e) => {
    setCandyBeingDragged(e.target);
    console.log("drag start");
  };

  const handleDragDrop = (e) => {
    setCandyBeingReplaced(e.target);
    console.log("drag end");
  };

  const handleDragEnd = (e) => {
    const candyBeingDraggedId = parseInt(
      candyBeingDragged.getAttribute("data-id")
    );
    const candyBeingReplacedId = parseInt(
      candyBeingReplaced.getAttribute("data-id")
    );

    candyArrangement[candyBeingReplacedId] =
      candyBeingDragged.getAttribute("src");
    candyArrangement[candyBeingDraggedId] =
      candyBeingReplaced.getAttribute("src");

    const validMoves = [
      candyBeingDraggedId - 1,
      candyBeingDraggedId + 1,
      candyBeingDraggedId - width,
      candyBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(candyBeingReplacedId);

    const isAColumnOfFive = checkFiveMatchesInColumn();
    const isAColumnOfFour = checkFourMatchesInColumn();
    const isAColumnOfThree = checkThreeMatchesInColumn();
    const isARowOfFive = checkFiveMatchesInRow();
    const isARowOfFour = checkFourMatchesInRow();
    const isARowOfThree = checkThreeMatchesInRow();

    if (
      candyBeingReplacedId &&
      validMove &&
      (isARowOfThree ||
        isARowOfFour ||
        isARowOfFive ||
        isAColumnOfFour ||
        isAColumnOfThree ||
        isAColumnOfFive)
    ) {
      setCandyBeingDragged(null);
      setCandyBeingReplaced(null);
    } else {
      candyArrangement[candyBeingReplacedId] =
        candyBeingReplaced.getAttribute("src");

      candyArrangement[candyBeingDraggedId] =
        candyBeingDragged.getAttribute("src");

      setCandyArrangement([...candyArrangement]);
    }
  };

  useEffect(() => {
    gameBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkFiveMatchesInColumn();
      checkFourMatchesInColumn();
      checkThreeMatchesInColumn();
      checkFiveMatchesInRow();
      checkFourMatchesInRow();
      checkThreeMatchesInRow();
      candyBelow();
      setCandyArrangement([...candyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkFourMatchesInColumn,
    checkThreeMatchesInColumn,
    checkFourMatchesInRow,
    checkThreeMatchesInRow,
    candyArrangement,
  ]);

  // useEffect(() => {
  //   console.log(candyArrangement);
  // }, [candyArrangement]);

  return (
    <div className="container">
      <div className="gameBoard">
        {candyArrangement.map((box, index) => (
          <img
            key={index}
            src={box}
            alt={blank}
            draggable={true}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDragDrop}
            data-id={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
