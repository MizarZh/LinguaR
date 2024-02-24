import React, { useState, useContext } from 'react'

function Home() {
  const series = ['test1', 'test2']
  const lists = [
    ['article 1', 'article 2', 'article 3'],
    ['article 4', 'article 5', 'article 6', 'article 4', 'article 5', 'article 6', 'article 4', 'article 5', 'article 6', 'article 4', 'article 5', 'article 6'],
  ]
  const output = series.map((val, idx) => {
    const inner = lists[idx].map((val, idx) => {
      return (
        <div key={idx} className="m-10 basis-20 shrink-0">
          {val}
        </div>
      )
    })
    return (
      <div key={idx}>
        <div className="flex flex-col">Title: {val}</div>
        <div className="flex flex-row w-screen overflow-scroll">{inner}</div>
      </div>
    )
  })
  return <div>{output}</div>
}

export default Home
