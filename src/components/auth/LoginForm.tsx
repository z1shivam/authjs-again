import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsernameLogin from "./UsernameLogin";
import EmailLogin from "./EmailLogin";

export default function LoginForm() {
  return (
    <Tabs defaultValue="username" className="">
      <TabsList>
        <TabsTrigger value="username" className="">
          Username Login
        </TabsTrigger>
        <TabsTrigger value="email" className="">
          Email Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="username">
        <UsernameLogin />
      </TabsContent>
      <TabsContent value="email">
        <EmailLogin />
      </TabsContent>
    </Tabs>
  );
}
