import { githubSignin, googleSignin } from "@/actions/auth";
import { Button } from "@/components/atoms/button";

export const UserAuthForm = () => (
  <>
    <form
      action={googleSignin}
      className="w-full"
    >
      <Button className="w-full">Continue with Google</Button>
    </form>
    <form
      action={githubSignin}
      className="w-full"
    >
      <Button className="w-full">Continue with GitHub</Button>
    </form>
  </>
)