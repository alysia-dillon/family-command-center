import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@deps/styles/globals.css";

import { DEFAULT_PAGE_TITLE } from "@deps/constants/page-title";
import { useStore } from "@deps/store/store"; // Assuming a store setup
import { Person } from "@deps/models/types";

const AppHead = () => (
  <Head>
    <title>{DEFAULT_PAGE_TITLE}</title>
    <meta name="description" content="Next.js App" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
  </Head>
);

const AppBody = ({ Component, pageProps }: AppProps) => {
  const { asPath } = useRouter();
  const isActive = (path: string) => (asPath === path ? "text-sky-600" : "");
  const { people } = useStore();

  useEffect(() => {
    // This can be used to fetch data or set up initial app state if necessary
    console.log("App initialized with people:", people);
  }, [people]);

  return (
    <>
      <header>
        <nav className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-lg">
            Family Command Center
          </Link>
          <ul className="flex gap-4 font-semibold">
            {people.map((person: Person, index: number) => (
              <li key={person.id}>
                <Link
                  href={`/person/${person.id}`}
                  className={`group transition duration-300 ${isActive(
                    `/person/${person.id}`
                  )}`}
                >
                  {person.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-sky-600"></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/settings"
                className={`group transition duration-300 ${isActive(
                  "/settings"
                )}`}
              >
                Settings
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-sky-600"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </>
  );
};

const App = (props: AppProps) => {
  const { people } = useStore();

  useEffect(() => {
    console.log("App initialized with people:", people);
    // Additional side-effects or initializations can be done here
  }, [people]);

  return (
    <main className="h-screen text-[#121212] overflow-x-hidden">
      <AppHead />
      <AppBody {...props} />
    </main>
  );
};

export default App;
