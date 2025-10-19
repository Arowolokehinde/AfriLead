import { MenteeForm } from "@/components/onboarding/mentee-form";

export default function MenteeOnboardingPage() {
  return (
    <div className="min-h-screen px-4 py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Welcome, Future Leader!</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Let's find you the perfect mentor to guide your journey
          </p>
        </div>
        <MenteeForm />
      </div>
    </div>
  );
}
