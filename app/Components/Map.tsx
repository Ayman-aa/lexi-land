'use client'
import React from "react";
import Mapsvg from "./Mapsvg";
import { useEffect, useState } from 'react'
import Game from "./Game";

export default function Map()
{
    const [select, setselect] = useState(0);
    const Levels = Array()
  const levelCount = 40
  useEffect(() => {
    if (Levels.length == 0)
    {
      const map = document.getElementById('svgMap')
      if (map)
        for (let i = 1; i <= levelCount; i++)
        {
          const level = document.getElementById("step "+i)
          if (level)
          {
            Levels.push({
              level,
              setColor: (color:string)=>{
                level.children[1]!.setAttribute("fill", color)
              }
            })
          }
        }
        Levels.forEach((element) => {
            element.level.addEventListener('click', () => {
                element.setColor('#0000');
                setselect(1);
            })
        })
    }
  }, []);
   
    return (
        <>
            <div>
            <Mapsvg></Mapsvg>
            </div>
            {select == 1 && (
              <>
              <Game />
              </>
            )}
        </>
    )
}