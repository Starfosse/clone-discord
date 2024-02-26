import { Button } from "@/components/ui/button"
import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div className="text-white items-center justify-center flex gap-4">
      <SignUp />
      <div className=" flex flex-col">
        Invité
        <div>Choisissez un pseudo</div>
        <Button>Valider</Button>
      </div>
      test
    </div>
  )
}

export default SignUpPage
