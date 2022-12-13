import React, { useEffect, useState } from 'react'
import Search from '../Components/Search'
import Pictures from '../Components/Pictures'

export default function Homepage() {
  let [data, setData] = useState(null)
  const [input, setInput] = useState('')

  const auth = '563492ad6f9170000100000168f1fdf86c1844deadad76d5a6ea9039'
  const initalUrl = 'https://api.pexels.com/v1/curated?per_page=15'
  const searchUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`

  // fetch data
  const search = async (url) => {
    const dataFetch = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      },
    })
    let parseData = await dataFetch.json()
    console.log(parseData.photos)
    setData(parseData.photos)
  }

  useEffect(() => {
    search(initalUrl)
  }, [])

  return (
    <div style={{ minHeight: '93.3vh' }}>
      <Search
        search={() => {
          search(searchUrl)
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data && data.map((data) => <Pictures data={data} />)}
      </div>
    </div>
  )
}
