import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import NavBar from "../components/nav/NavBar";
import NavDrawer from "../components/nav/NavDrawer";
import NavItem from "../components/nav/NavItem";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <>
      <Head>
        <title>HS System</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar navbarActive={navbarActive} setNavbarActive={setNavbarActive} />
      <NavDrawer navbarActive={navbarActive} setNavbarActive={setNavbarActive}>
        <NavItem />
      </NavDrawer>
      <main className="flex min-h-screen flex-col items-center justify-start bg-slate-50">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-24">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-red-500">HS</span> System
          </h1>
          <AuthShowcase />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-slate-700/10 p-4  hover:bg-slate-700/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="t flex max-w-xs flex-col gap-4 rounded-xl bg-slate-700/10 p-4 hover:bg-slate-700/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const { data: incidentData } = api.example.getIncidents.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      {incidentData ? (
        <table className="w-full [&>*:nth-child(even)]:bg-slate-200">
          <tr className="border text-left">
            <th>Reference</th>
            <th>Forename</th>
            <th>Surname</th>
            <th>Incident Date</th>
          </tr>
          {incidentData?.map((incident) => (
            <tr className="border text-left">
              <td>{incident.ref}</td>
              <td>{incident.forename}</td>
              <td>{incident.surname}</td>
              <td>{incident.date.toISOString()}</td>
            </tr>
          ))}
        </table>
      ) : null}
      <button
        className="rounded-full bg-slate-900/25 px-10 py-3 font-semibold no-underline transition hover:bg-slate-900/50"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
