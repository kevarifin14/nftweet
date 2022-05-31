import { Spin } from "../../Spin";

export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spin size="lg" />
    </div>
  );
}
