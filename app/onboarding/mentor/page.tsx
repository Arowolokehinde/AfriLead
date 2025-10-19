import { MentorForm } from "@/components/onboarding/mentor-form";

export default function MentorOnboardingPage() {
  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Thank You for Mentoring!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your experience will help shape Africa's future leaders
          </p>
        </div>
        <MentorForm />
      </div>
    </div>
  );
}
