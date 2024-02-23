import React, { useState } from 'react'
import { Word } from '../states'
import { useRecoilState } from 'recoil'

function Dictionary() {
  const [explanation, setExplanation] = useState('')
  const [word, setWord] = useRecoilState(Word)
  return (
    <div className="min-w-52 max-w-64 border border-black border-solid dict-height m-10">
      <h1>{word}</h1>
      <div>E</div>
    </div>
  )
}

export default Dictionary
