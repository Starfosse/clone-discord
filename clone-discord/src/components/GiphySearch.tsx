import React, { useState, ChangeEvent } from "react"
import axios from "axios"

interface Gif {
  id: string
  title: string
  images: {
    fixed_height: {
      url: string
    }
  }
}

interface GiphySearchProps {
  onGifSelect: (url: string) => void
}

const GiphySearch: React.FC<GiphySearchProps> = ({
  onGifSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [gifs, setGifs] = useState<Gif[]>([])

  const handleSearch = async () => {
    try {
      const apiKey = "MxtyAa8HjqsZu9PmRD0xOULVWLPbejKe"
      const response = await axios.get<{ data: Gif[] }>(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=20&lang=fr&rating=g&bundle=messaging_non_clips`
      )
      setGifs(response.data.data)
    } catch (error) {
      console.error("Error fetching Giphy data:", error)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            onClick={() =>
              onGifSelect(gif.images.fixed_height.url)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default GiphySearch
