import { getPublicEntries } from "@/actions/getEntries";
import { PublicDisplay } from "@/components/PublicEntryDisplay";

export default async function Page() {
  const entries = await getPublicEntries();
  return <PublicDisplay entries={entries} />;
}
