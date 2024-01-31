"use server"

import { put } from "@vercel/blob"

export const uploadFile = async (formData: FormData) => {
  const file = formData.get("file") as File
  const fileName = file.name
  const blob = await put(fileName, file, {
    access: "public",
    token:
      "vercel_blob_rw_JBFJ2HCV3mw8Pv33_cjFwg0YwgvYsQvCXj4YMn6bae5M6Yd",
  })
  return blob.url
}
