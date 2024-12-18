import { Feature, FeatureIcon } from "@/types/dashboard";

export const features: Feature[] = [
  {
    title: "Faster Sync",
    description: "Lightning-fast file transfers",
    gradient: {
      from: "#60A5FA",
      to: "#3B82F6",
    },
    icon: ({ className }: FeatureIcon) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:animate-pulse"
        />
      </svg>
    ),
  },
  {
    title: "Bank-Grade Security",
    description: "End-to-end encryption",
    gradient: {
      from: "#818CF8",
      to: "#6366F1",
    },
    icon: ({ className }: FeatureIcon) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:animate-pulse"
        />
      </svg>
    ),
  },
  {
    title: "Unlimited Sharing",
    description: "Collaborate seamlessly",
    gradient: {
      from: "#F472B6",
      to: "#EC4899",
    },
    icon: ({ className }: FeatureIcon) => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3c0 .31.048.607.135.886L8.667 9.143a3.001 3.001 0 110 5.714l6.468 3.257c-.087.279-.135.576-.135.886 0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:animate-pulse"
        />
      </svg>
    ),
  },
];

export const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="relative flex items-center gap-4 border-white/10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-sm px-6 py-4 border hover:border-blue-500/20 rounded-2xl transition-all duration-300 group">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
      <feature.icon className="relative z-10 w-10 h-10" />
    </div>
    <div>
      <h3 className="mb-1 font-medium text-white">{feature.title}</h3>
      <p className="text-gray-400 text-sm">{feature.description}</p>
    </div>
  </div>
);
