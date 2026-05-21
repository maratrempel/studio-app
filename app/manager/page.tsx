import BackBar from "@/components/BackBar";
import ManagerDashboard from "@/components/ManagerDashboard";

export default function ManagerPage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="border-b border-ink-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-3">
          <BackBar />
        </div>
      </div>
      <ManagerDashboard />
    </div>
  );
}
