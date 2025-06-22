import AuthProvider from "@/components/AuthProvider";

export default function Home() {
  return (
    <div>
      <AuthProvider>
        Hello World
      </AuthProvider>
    </div>
  );
}
