import { notFound } from "next/navigation";
import { DRILLS, getDrill } from "@/data/drills";
import { DrillRunner } from "./DrillRunner";

export function generateStaticParams() {
  return DRILLS.map((d) => ({ id: d.id }));
}

export default async function DrillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getDrill(id)) notFound();
  return <DrillRunner id={id} />;
}
