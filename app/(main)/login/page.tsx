import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Sign in · CLB 9 Coach" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
