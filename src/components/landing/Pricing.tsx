interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    features: [
      "5GB Storage",
      "Basic file organization",
      "Email support",
      "2 team members",
      "Basic security"
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$10",
    features: [
      "50GB Storage",
      "AI-powered organization",
      "Priority support",
      "10 team members",
      "Advanced security",
      "Version history"
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$29",
    features: [
      "Unlimited Storage",
      "Advanced AI features",
      "24/7 phone support",
      "Unlimited team members",
      "Enterprise security",
      "Advanced analytics",
      "Custom integration"
    ],
    buttonText: "Contact Sales",
  },
];

export function Pricing() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400">Choose the perfect plan for your needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name}
              className="relative group p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl border border-white/10 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                  : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
              }`} />
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold text-white mb-6">
                  {plan.price}<span className="text-lg font-normal text-gray-400">/mo</span>
                </p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-xl transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
