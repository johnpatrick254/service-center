"use client";

import { LoginType, loginSchema } from "@/lib/validators/login-form";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const LoginForm: FC<{ baseURL: string }> = ({ baseURL }) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 rounded-lg sm:w-[400px] sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-6 p-6 sm:p-8">
        <Tabs defaultValue="student" className="w-full sm:w-[400px]">
          <TabsList className="grid h-14 w-full grid-cols-2">
            <TabsTrigger value="agent">AGENT</TabsTrigger>
            <TabsTrigger value="customer">CUSTOMER</TabsTrigger>
          </TabsList>
          <TabsContent value="agent">
            <CustomForm entityType="agent" baseURL={baseURL} />
          </TabsContent>
          <TabsContent value="customer">
            <CustomForm entityType="customer" baseURL={baseURL} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CustomForm = ({
  entityType,
  baseURL,
}: {
  entityType: "agent" | "customer";
  baseURL: string;
}) => {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
    },
  });

const onSubmit=()=>{
  const payload =form.getValues()
  toast({
    title: "Welcome",
    description: "Login Successfully",
  });
  router.push(`${baseURL}/chat/${entityType}?user=${payload.name}`);
}
  return (
    <div className="h-full space-y-8 rounded-md border border-border bg-background p-5 pb-8">
      <div className="space-y-3 text-center">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
          Sign in
        </h1>
        <p className="text-sm">
          Enter your <span className="uppercase">{entityType}</span> credentials
          below to login
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => onSubmit())}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder={`name`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 
          <Button
            type="submit"
            className="w-full"
            size="lg"
          >
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
