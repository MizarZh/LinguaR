export type freeDictArray = noWordObject | Array<freeDictObject>

export type freeDictObject = {
  word: string
  phonetic: string
  phonetics: Array<phoneticsObject>
  origin: string
  meanings: Array<meaningsObject>
}

type phoneticsObject = {
  text: string
  audio?: string
}

type meaningsObject = {
  partOfSpeech: string
  definitions: Array<definitionsObject>
}

type definitionsObject = {
  definition: string
  example: string
  synonyms: Array<string>
  antonyms: Array<string>
}

type noWordObject = {
  title: string
  meassage: string
  resolution: string
}

export async function freeDictionary(word: string) {
  if (word === '') {
    return <></>
  }
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

  const res = await fetch(url)
  const json = await res.json()
  try {
    const wordExplanation = json as freeDictArray
    console.log(wordExplanation)

    if (!('title' in wordExplanation)) {
      const word_diff = wordExplanation.map((val, idx) => {
        const word_ex = val.meanings.map((val, idx) => {
          const ex = val.definitions.map((val, idx) => {
            return (
              <details key={idx}>
                <summary>{idx}</summary>
                <div>{val.definition}</div>
              </details>
            )
          })
          return (
            <div key={idx}>
              <div>definition {idx}</div>
              <div>{ex}</div>
            </div>
          )
        })
        return (
          <div key={idx}>
            <div>{val.word}</div>
            <div>{word_ex}</div>
          </div>
        )
      })
      return <div>{word_diff}</div>
    } else {
      return <div>No explanation</div>
    }
  } catch (e) {
    console.log(e)
    return <></>
  }
}
