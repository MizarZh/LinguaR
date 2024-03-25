import React, { useState, useContext, MouseEvent } from 'react'
import { basePath } from '@linguar/server/src/config'
import { articleTableInsert } from '@linguar/server/src/types'

function Home() {
  const series = ['test1', 'test2']
  const lists = [
    ['article 1', 'article 2', 'article 3'],
    [
      'article 4',
      'article 5',
      'article 6',
      'article 4',
      'article 5',
      'article 6',
      'article 4',
      'article 5',
      'article 6',
      'article 4',
      'article 5',
      'article 6',
    ],
  ]

  const [file, setFile] = useState<File | null>(null)

  const contents = series.map((val, idx) => {
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      // console.log(e.target.files[0], basePath)
      console.log('Uploading file...')
      const formData = new FormData()
      if (file) {
        formData.append('file', file)

        try {
          // You can write the URL of your server or any other endpoint used for file upload
          const result = await fetch(basePath + '/api/en/article', {
            method: 'POST',
            body: formData,
          })

          const data = await result.json()

          console.log(data)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }

  return (
    <div>
      <nav className="sticky top-0 left-0 right-0 w-full flex flex-row h-16 justify-start items-center">
        <div className="m-10">test</div>
        <div className="m-10">test2</div>
        <input
          className="m-10"
          type="file"
          id="file"
          name="file"
          accept="text/plain"
          onChange={handleFileChange}
        />
      </nav>
      {contents}
    </div>
  )
}

export default Home
