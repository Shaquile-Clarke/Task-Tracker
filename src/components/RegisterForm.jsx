import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { initialSignUpState, signupReducer } from "../handler/registerhandler";

export default function RegisterForm() {
  const [state, dispatch] = useReducer(signupReducer, initialSignUpState);
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/todos");
  }

  function onChange(e) {
    const action = {
      type: e.target.name,
      value: e.target.value,
    };

    dispatch(action);
  }

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reply = await response.json();

    if (reply.created) {
      const options = {
        redirect: false,
        email: state.email,
        password: state.password,
      };
      await signIn("credentials", options);
      router.push("/todos");
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2 p-8">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-white text-xl">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={onChange}
          className="ring-2 rounded h-10 my-1 pl-2 shadow-lg  "
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-white text-xl">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={onChange}
          className="ring-2 rounded h-10 my-1 pl-2 shadow-lg "
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-white text-xl">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={onChange}
          className="ring-2 rounded h-10 my-1 pl-2 shadow-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-white text-xl">
          Password
        </label>
        <div className="relative flex">
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            id="password"
            onChange={onChange}
            className="w-full ring-2 rounded h-10 my-1 pl-2 shadow-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 rounded-tr rounded-br h-full p-3 "
          >
            {!showPassword && <EyeOffIcon className="h-5" />}
            {showPassword && <EyeIcon className="h-5" />}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-white text-xl">
          Confirm Password
        </label>
        <div className="relative flex">
          <input
            type={!showPassword ? "password" : "text"}
            name="passwordRepeat"
            id="passwordRepeat"
            onChange={onChange}
            className="w-full ring-2 rounded h-10 my-1 pl-2 "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 rounded-tr rounded-br  h-full p-3"
          >
            {!showPassword && <EyeOffIcon className="h-5" />}
            {showPassword && <EyeIcon className="h-5" />}
          </button>
        </div>
      </div>

      <button className="bg-blue-500/80 rounded h-10 text-white text-lg font-semibold shadow-xl">
        Register
      </button>
      <Link href={"/login"}>
        <button
          type="button"
          className="text-lg font-semibold bg-green-500/80 rounded h-10 text-white shadow-xl"
        >
          Already an existing user
        </button>
      </Link>
    </form>
  );
}
