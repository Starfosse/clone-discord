import React, { useState, ChangeEvent } from "react"
import axios from "axios"
import { Input } from "./ui/input"

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

  const handleSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return
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
    <div className="h-full">
      <div className="h-full">
        <Input
          className="relative top-1 text-white w-11/12 mx-auto bg-tertiaryColor border-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          type="text"
          value={searchTerm}
          placeholder="Rechercher un GIF"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={handleSearch}
        />
        <div className="h-full mt-4 flex flex-col gap-3 border-0 bg-transparent overflow-scroll overflow-x-hidden">
          {gifs.map((gif) => (
            <img
              className="border-0 bg-transparent"
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
    </div>
  )
}

export default GiphySearch
