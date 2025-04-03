import { FormEditElement } from "@/components/Shared/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ElementPage({
  params,
}: {
  params: Promise<{ elementId: string }>;
}) {
  // In Next.js 15, params is now a promise that needs to be awaited
  // Change this line:
  // const { elementId } = params;
  // To this:
  const { elementId } = await params;
  // Or alternatively: const { elementId } = await params;

  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const element = await db.element.findUnique({
    where: {
      id: elementId,
    },
  });

  // Para depurar
  console.log("Elemento cargado:", element);

  if (!element) {
    redirect("/");
  }

  return (
    <div>
      <h1>Edit your credentials</h1>
      <div>
        <FormEditElement dataElement={element} />
      </div>
    </div>
  );
}
