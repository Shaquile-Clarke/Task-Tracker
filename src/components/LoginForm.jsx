import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (session) {
    router.push("/todos");
  }

  const emailRef = useRef();
  const passwordRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const options = {
      redirect: false,
      email: emailRef.current.value.toLowerCase(),
      password: passwordRef.current.value,
    };

    const response = await signIn("credentials", options);

    if (!response.ok) {
      setErrorMessage(response.error);
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2 p-8">
      <div className="text-xl text-center text-white">{errorMessage}</div>
      <div className="flex h-10 items-center">
        <label
          htmlFor="email"
          className="w-fit h-full p-2 rounded-bl rounded-tl text-lg right-0 bg-gray-300  "
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          maxLength="30"
          className="w-full ring-2 rounded-tr rounded-br h-10 pl-2 "
        />
      </div>

      <div className="flex w-full relative h-10 items-center">
        <label
          htmlFor="password"
          className="w-fit h-full p-2 rounded-bl rounded-tl text-lg right-0 bg-gray-300 "
        >
          Password
        </label>
        <input
          type={!showPassword ? "password" : "text"}
          name="password"
          id="password"
          maxLength={15}
          min={7}
          autoComplete="true"
          ref={passwordRef}
          className="w-full ring-2 rounded-tr rounded-br h-10 pl-2 "
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 rounded-tr rounded-br h-full p-3  "
        >
          {!showPassword && <EyeOffIcon className="h-5" />}
          {showPassword && <EyeIcon className="h-5" />}
        </button>
      </div>

      <button className="bg-blue-500/80 rounded h-10 text-white text-lg font-semibold shadow-lg">
        Login
      </button>
      <Link href={"/register"}>
        <button
          type="button"
          className="text-lg font-semibold bg-green-500/80 rounded h-10 text-white shadow-lg"
        >
          Create new account
        </button>
      </Link>
    </form>
  );
}
