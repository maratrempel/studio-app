import BackBar from "@/components/BackBar";
import WorkerDashboard from "@/components/WorkerDashboard";

export default function WorkerPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="mx-auto max-w-5xl px-5 pt-4">
        <BackBar />
      </div>
      <WorkerDashboard />
    </div>
  );
}
