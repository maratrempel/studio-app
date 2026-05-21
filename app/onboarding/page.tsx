import BackBar from "@/components/BackBar";
import Onboarding from "@/components/Onboarding";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50 via-white to-ink-50">
      <div className="border-b border-ink-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-5 py-3">
          <BackBar />
        </div>
      </div>
      <Onboarding />
    </div>
  );
}
