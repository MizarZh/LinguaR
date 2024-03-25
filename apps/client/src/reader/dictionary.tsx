import React, { useState, useEffect } from 'react'
import { Word } from '../states'
import { useRecoilState } from 'recoil'
import { freeDictionary } from './freedictionary'

function Dictionary() {
  const [explanation, setExplanation] = useState(<></>)
  const [word] = useRecoilState(Word)

  useEffect(() => {
    freeDictionary(word).then((result) => {
      setExplanation(result)
    })
  }, [word])

  return (
    <div className="w-72 dict-height fixed right-0 top-0 m-3 border border-black border-solid bg-white overflow-y-auto p-5">
      <h1>{word}</h1>
      <div>{explanation}</div>
    </div>
  )
}

export default Dictionary
