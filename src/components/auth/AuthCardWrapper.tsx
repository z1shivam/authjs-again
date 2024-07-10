"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface AuthCardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
}

interface HeaderProps {
  label: string;
}

interface BackButtonProps {
  href: string;
  label: string;
}

export const AuthHeader = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-y-2">
      <Link href={"/"}>
        <h1 className={cn("text-3xl font-semibold")}>FastAuth 🔐</h1>
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant={"link"} className="w-full font-normal" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export const SocialLoginButtons = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export const AuthCardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: AuthCardWrapperProps) => {
  return (
    <Card className="max-w-md min-w-[420px]">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{showSocial && <SocialLoginButtons />}</CardContent>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
