"use client";
import React from "react";
import Mapsvg from "./Mapsvg";
import { useEffect, useState } from "react";
import Game from "./Game";
import { useLocalStorage } from "usehooks-ts";
import initialGameState from "./init-localstorage.json";

export default function Map() {
  const [gameState, setGameState] = useLocalStorage("gameState", initialGameState);
  const [select, setselect] = useState(0);
  const [mylevel, setmylevel] = useState(1);
  const Levels = Array();
  const levelCount = 40;

  const closeModal = () => {
    setselect(0);
  };

  useEffect(() => {
    if (Levels.length == 0) {
      const map = document.getElementById("svgMap");
      if (map)
        for (let i = 1; i <= levelCount; i++) {
          const level = document.getElementById("step " + i);
          if (level) {
            Levels.push({
              level,
              setColor: (color: string) => {
                level.children[1]!.setAttribute("fill", color);
              },
            });
          }
        }
    }
    Levels.forEach((element, index) => {
      if (gameState.levels[index].state == "completed") {
        element.setColor("#08A00A");
      } else if (gameState.levels[index].state == "current") {
        element.setColor("#ffAF00");
      } else if (gameState.levels[index].state == "locked") {
        //element.setColor("#808080");
      }
      element.level.addEventListener("click", () => {
        setmylevel(parseInt(element.level.id.split(" ")[1]));
        setselect(1);
      });
    });
  }, [gameState]);

  return (
    <>
      <div>
        <Mapsvg></Mapsvg>
      </div>
      {select == 1 && (
        <>
          <Game gameState={gameState} setGameState={setGameState} level={mylevel} onClose={closeModal} />
        </>
      )}
    </>
  );
}

