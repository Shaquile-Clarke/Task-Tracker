import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/todos");
  }

  return (
    <div>
      <Head>
        <title>{`Todo List`}</title>
        <meta
          name="description"
          content="Keep your daily task on hand with this todo list."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-2 text-white ">
        <h1 className="text-center text-4xl font-bold font-mono ">Todo-List</h1>

        <Link href={"/login"}>
          <button className="bg-blue-500/80 rounded h-10 text-white text-lg font-semibold shadow-xl">
            Login
          </button>
        </Link>
        <Link href={"/register"}>
          <button className="text-lg font-semibold bg-green-500/80 rounded h-10 text-white shadow-xl">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
