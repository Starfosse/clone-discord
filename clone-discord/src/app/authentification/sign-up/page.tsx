"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignUp } from "@clerk/nextjs"
import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import { useEffect } from "react"

type State = {
  pseudo: string
  uuid: string
}

type Action = {
  updatePseudo: (pseudo: State["pseudo"]) => void
  updateUuid: (uuid: State["uuid"]) => void
}

const useStore = create<State & Action>((set) => ({
  pseudo: "",
  uuid: "",
  updatePseudo: (pseudo) => set(() => ({ pseudo: pseudo })),
  updateUuid: (uuid) => set(() => ({ uuid: uuid })),
}))

const SignUpPage = () => {
  const pseudo = useStore((state) => state.pseudo)
  const uuid = useStore((state) => state.uuid)

  const updatePseudo = useStore(
    (state) => state.updatePseudo
  )

  const updateUuid = useStore((state) => state.updateUuid)
  const newUuidv4 = uuidv4()
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    console.log(pseudo)
    console.log(uuid)
  }
  return (
    <div className="items-center justify-center flex gap-4 h-full">
      <SignUp />
      <div className=" flex flex-col bg-white gap-2 text-black m-3 p-9 rounded-md">
        <p className="font-bold text-xl mb-4">
          Compte invité
        </p>
        <div className="mr-auto text-sm">Pseudo</div>

        <form onSubmit={handleSubmit}>
          <Input
            type="text "
            onChange={(e) => {
              updatePseudo(e.currentTarget.value)
              updateUuid(newUuidv4)
            }}
            value={pseudo}
            className="ml-auto"
          />
          <div className="mt-2">
            <Button
              type="submit"
              className="w-full mx-auto bg-blue-600">
              Valider
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
