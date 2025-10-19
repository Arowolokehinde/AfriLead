import { MentorForm } from "@/components/onboarding/mentor-form";

export default function MentorOnboardingPage() {
  return (
    <div className="min-h-screen px-4 py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Thank You for Mentoring!</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Your experience will help shape Africa's future leaders
          </p>
        </div>
        <MentorForm />
      </div>
    </div>
  );
}
