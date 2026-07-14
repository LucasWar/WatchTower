import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ItemsMenu from "../_components/items-menu";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token");
  if (!token) {
    redirect("/login");
  }
  return (
        <div className="min-h-full flex flex-col">
          <div className="flex">
            <div className="flex flex-col bg-primary-color min-h-screen w-75 items-center justify-center border-r border-white/10">
              <div className="flex justify-center items-center gap-5 mb-8 mt-5">
                <Avatar className="w-11 h-11">
                  <AvatarImage
                    alt="@shadcn"
                  />
                  <AvatarFallback>WT</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-medium text-2xl text-white">Wtach Tower</h1>
                  <h1 className="font-medium text-sm text-gray-500/70">Observability platfomr</h1>
                </div>
              </div>
              <ItemsMenu />
            </div>
           <div className="min-h-full w-full bg-secondary-color">{children}</div>
          </div>
        </div>
  );
}
