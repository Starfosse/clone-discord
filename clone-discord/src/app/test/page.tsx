import { User } from "@prisma/client"
import { useState } from "react"
import { trpc } from "../_trpc/client"
import { z } from "zod"

const [currentWho, setCurrentWho] = useState<
  User | undefined
>()

const whoData = trpc.getUser.useQuery()
if (whoData.data) setCurrentWho(whoData.data)

const user = z.object({ id: z.string() })

// {...currentWho}
//who: User

// 1/useState puis trpc.utils puis  déclaration form

// 2/query

// 3/useEffect

// 4/mutation

// 5/fonction

// 6/ onSubmit

// 7/
