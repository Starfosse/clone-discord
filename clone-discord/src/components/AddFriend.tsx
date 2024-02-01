import {
  FriendValidator,
  TFriendValidator,
} from "@/lib/validator/friend-validator"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/app/_trpc/client"

const AddFriend = () => {
  const { mutate: addFriend } = trpc.addFriend.useMutation(
    {}
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFriendValidator>({
    resolver: zodResolver(FriendValidator),
  })

  const onSubmit = ({ pseudo }: TFriendValidator) => {
    addFriend({ pseudo })
  }

  return (
    <div className="pl-6 pt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="w-4/5 text-black"
          placeholder="Tu peux ajouter des amis grâce à leurs noms d'utilisateurs Discord."
          {...register("pseudo")}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddFriend
