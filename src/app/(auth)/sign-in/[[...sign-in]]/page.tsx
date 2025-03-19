import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="grid h-screen w-full place-items-center">
      <SignIn
        fallbackRedirectUrl={"/dashboard"}
        signUpFallbackRedirectUrl={"/dashboard"}
      />
    </div>
  );
}
