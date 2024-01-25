"use server"

import { put } from "@vercel/blob"
import { v4 as uuidv4 } from "uuid"

export const uploadFile = async (imageUrl: File) => {
  const blob = await put(uuidv4(), imageUrl, {
    access: "public",
    token:
      "vercel_blob_rw_JBFJ2HCV3mw8Pv33_cjFwg0YwgvYsQvCXj4YMn6bae5M6Yd",
  })
  return blob.url
}
//todo => récuperer le name du fichier pour remplacer uuidv4
