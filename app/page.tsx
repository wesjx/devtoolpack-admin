import LoginComponent from "@/components/login";

export default function Home() {
  return (
    <div className="min-h-[400px] h-[calc(100vh-80px)] flex items-center justify-center bg-white">
      <LoginComponent />
    </div>
  );
}
