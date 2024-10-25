import { getServerSession } from "@/auth/auth";
import LogoutButton from "@/components/ui/custom/LogoutButton";
import Image from "next/image";
import { redirect } from "next/navigation";

// import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/dashboard");
  const { name, image, email } = session?.user;
  return (
    <div>
      {image && (
        <div>
          <Image src={image} alt={name!} width={100} height={100} />
        </div>
      )}

      <h2>Welcome {name}</h2>
      <h2>Email {email}</h2>
      <LogoutButton />
    </div>
  );
}
