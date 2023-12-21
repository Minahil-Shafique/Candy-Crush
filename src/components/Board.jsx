import { useEffect, useState } from "react";
import { blank, red, green, yellow, purple, blue } from "../images/images";

function Board() {
  const candy = [blank, red, green, yellow, purple, blue];
  const width = 8;
  const [colorArrangement, setColorArrangement] = useState([]);

  const gameBoard = () => {
    let candyArray = [];
    for (let i = 1; i <= width * width; i++) {
      let randomColor = Math.floor(Math.random() * candy.length);
      candyArray.push(candy[randomColor]);
    }
    setColorArrangement(candyArray);
  };


  useEffect(() => {
    gameBoard();
  }, []);
 
  return (
    <div className="container">
      <div className="gameBoard">
        {colorArrangement.map((box, index) => (
          <img key={index} src={box} alt={blank} />
        ))}
      </div>
    </div>
  );
}

export default Board;


