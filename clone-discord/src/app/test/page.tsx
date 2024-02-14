"use client"

import express from "express"
import { createServer } from "node:http"
import { useEffect, useState } from "react"
import io from "socket.io-client"

const PageTest = () => {
  //   const app = express()
  //   const server = createServer(app)

  //   app.get("/test", (req, res) => {
  //     res.send("<h1>Hello world</h1>")
  //   })

  //   server.listen(3000, () => {
  //     console.log("server running at http://localhost:3000")
  //   })
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = io("http://localhost:3000")

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data])
    })

    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    const socket = io("http://localhost:3000")

    socket.on("message", (data) => {
      console.log("Message from server:", data)
    })

    socket.emit("chatMessage", "Hello Server!")

    return () => socket.disconnect()
  }, [])

  return (
    <div className="text-white flex items-center justify-center h-full">
      test
    </div>
  )
}

export default PageTest
