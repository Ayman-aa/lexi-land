"use client";
import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import generateWord from "../helpers/generateWord";

interface GameProps {
  gameState: any;
  level: number;
  setGameState: (newGameState: any) => void;
  onClose: () => void;
}

const Game: React.FC<GameProps> = ({ gameState, setGameState, level, onClose }: GameProps) => {
  const correctObj = useMemo(() => generateWord(gameState, level), [gameState, level])
  const correct = correctObj.value;
  const hint = correctObj.hint;
  const [finishTime, setFinishTime] = useState<number>(0);
  const [word, setWord] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [newword, setnewword] = useState("");
  useEffect(() => {
      setWord(correct?.split("").sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFinishTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleLetterClick = (clickedLetter: string, myword: string[]) => {
    myword.splice(myword.indexOf(clickedLetter), 1);
    setSelectedLetters((prevLetters) => [...prevLetters, clickedLetter]);
    const container = document.querySelector(".word");
    const letterBox = document.createElement("p");
    letterBox.innerText = clickedLetter;
    container!.appendChild(letterBox);
    letterBox.addEventListener("click", () => {
      letterBox.remove();
      let word: string = "";
      for (let i = 0; i != container?.children.length; i++) {
        word += container!.children[i]!.innerHTML;
      }
      setnewword(word);
      setWord((prevLetters) => [...prevLetters, clickedLetter]);
    });
    let words: string = "";
    for (let i = 0; i != container?.children.length; i++) {
      words += container!.children[i]!.innerHTML;
    }
    setnewword(words);
    setWord(myword);
    if (word.length == 0) {
      if (words == correct) {
        toast.success("congratulations!");
        const newGameState = { ...gameState };
        newGameState.levels[level - 1].finishtime = finishTime;
        newGameState.levels[level - 1].word = correct;
        newGameState.levels[level - 1].state = "completed";
        newGameState.levels[level].state = "current";
        setGameState(newGameState);
      } else toast.error("Incorrect word!");
    }
  };

  return (
    <>
      <div className="pirate">
        <img src="cartoon-pirate-boy-holding-a-sword-vector.png"></img>
      </div>
      <div className="Game">
        <div className="game-level">
          <span>{level}</span>
        </div>
        <div className="close-level" onClick={onClose}>
          <span>X</span>
        </div>
        <div className="text-blue-500" id="myhint">{hint}</div>
        <div className="word"></div>
        <div className="letter">
          {word?.map((letter, index) => (
            <div
              key={index}
              className="div-letter"
              onClick={() => handleLetterClick(letter, word)}
            >
              <p>{letter}</p>
            </div>
          ))}
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Game;
