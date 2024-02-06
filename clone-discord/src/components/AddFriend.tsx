import { trpc } from "@/app/_trpc/client"
import { cn } from "@/lib/utils"
import {
  FriendValidator,
  TFriendValidator,
} from "@/lib/validator/friend-validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "./ui/input"

const AddFriend = (who: User) => {
  const { mutate: addFriend } = trpc.addFriend.useMutation({
    onSuccess: () =>
      toast.success(
        <div className="flex items-center">
          <Check />
          &nbsp;Votre demandé a bien été envoyé
        </div>,
        { duration: 3000 }
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFriendValidator>({
    resolver: zodResolver(FriendValidator),
  })

  const onSubmit = ({ pseudo }: TFriendValidator) => {
    const input = { pseudo: pseudo, id: who.id }
    addFriend(input)
  }

  return (
    <div className="pl-6 pt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={cn("text-black, w-4/5", {
            "text-red-500": errors.pseudo,
          })}
          placeholder="Tu peux ajouter des amis grâce à leurs noms d'utilisateurs Discord."
          {...register("pseudo")}
        />
        {errors.pseudo && (
          <p
            className="col-span-4 text-red-500"
            role="alert">
            {errors.pseudo.message}{" "}
          </p>
        )}
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddFriend
