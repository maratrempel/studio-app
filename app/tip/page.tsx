import BackBar from "@/components/BackBar";
import ConsumerTip from "@/components/ConsumerTip";

export default function TipPage() {
  return (
    <div className="min-h-screen bg-ink-100">
      {/* Desktop frame — on small screens this just disappears */}
      <div className="mx-auto flex max-w-md flex-col sm:max-w-3xl sm:py-10">
        <div className="hidden px-6 pb-4 sm:flex sm:items-center sm:justify-between">
          <BackBar />
          <span className="text-xs font-medium text-ink-500">
            תצוגת PWA מובייל · גלגלו והתנסו 📱
          </span>
        </div>
        <div className="overflow-hidden bg-white sm:mx-auto sm:w-full sm:max-w-md sm:rounded-[2.5rem] sm:border-[10px] sm:border-ink-900 sm:shadow-pop">
          <ConsumerTip />
        </div>
      </div>
    </div>
  );
}
