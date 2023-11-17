import Channel from "@/components/channel/Channel";
import NoSession from "@/components/shared/NoSession";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <Head>
        <title>Discord</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      {session ? <Channel /> : <NoSession />}
    </main>
  );
}
