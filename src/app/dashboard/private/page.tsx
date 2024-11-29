import { getPrivateEntries } from "@/actions/getEntries";
import { PrivateDisplay } from "@/components/PrivateEntryDisplay";

export default async function Page() {
  const entries = (await getPrivateEntries()) || [];
  return <PrivateDisplay entries={entries} />;
}
