'use client'
import React from "react";
import Mapsvg from "./Mapsvg";
import { useEffect, useState } from 'react'

export default function Map()
{
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
            level.children[1]!.setAttribute("fill", "#FFFFFF")
          }
        }
    }
  })
    return (
        <>
            <Mapsvg></Mapsvg>
        </>
    )
}