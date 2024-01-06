'use client'
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface GameProps {}

const Game: React.FC<GameProps> = () => {
    const correct = "ANIMAL"
  const [word, setWord] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [newword, setnewword] = useState("");
  useEffect(() => {
    setWord(["N", "L", "A", "M", "A", "I"]);
  }, []);

  const handleLetterClick = (clickedLetter: string, myword : string[]) => {
    myword.splice(myword.indexOf(clickedLetter),1)
    setSelectedLetters((prevLetters) => [...prevLetters, clickedLetter]);
    const container = document.querySelector(".word");
    const letterBox = document.createElement("p");
    letterBox.innerText = clickedLetter
    container!.appendChild(letterBox)
    letterBox.addEventListener("click", ()=>{
        letterBox.remove();
        let word : string = "";
        for (let i = 0; i != container?.children.length; i++)
        {
            word += container!.children[i]!.innerHTML;
        }
        setnewword(word);
        setWord((prevLetters) => [...prevLetters, clickedLetter]);
    });
    let words : string = "";
    for (let i = 0; i != container?.children.length; i++)
    {
        words += container!.children[i]!.innerHTML;
    }
    setnewword(words);
    setWord(myword)
    if (word.length == 0)
    {
        if (words == correct)
        {
            toast.success('congratulations!');
        }
        else 
            toast.error("Incorrect world");
    }
};

  return (
    <>
      <div className="Game">
        <div className="word">
        </div>
        <div className="letter">
          {word.map((letter, index) => (
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
