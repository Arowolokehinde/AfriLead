import { MenteeForm } from "@/components/onboarding/mentee-form";

export default function MenteeOnboardingPage() {
  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, Future Leader!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's find you the perfect mentor to guide your journey
          </p>
        </div>
        <MenteeForm />
      </div>
    </div>
  );
}
