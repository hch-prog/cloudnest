'use client';

import { Check, ChevronRight } from 'lucide-react';

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

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
  <div className="relative group">
    {/* Card Background */}
    <div 
      className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transition-all duration-300 
        ${plan.popular 
          ? 'border-blue-500/20 bg-gradient-to-br from-blue-600/20 via-blue-500/20 to-blue-400/20 group-hover:from-blue-600/30 group-hover:via-blue-500/30 group-hover:to-blue-400/30' 
          : 'border-white/10 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-800/50 group-hover:from-slate-800/70 group-hover:via-slate-800/50 group-hover:to-slate-800/70'
        }`}
    />

    {/* Popular Badge */}
    {plan.popular && (
      <div className="-top-4 left-1/2 absolute bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-1.5 rounded-full -translate-x-1/2">
        <span className="relative font-semibold text-sm text-white">Most Popular</span>
      </div>
    )}

    {/* Card Content */}
    <div className="relative p-8 rounded-2xl transition-all hover:translate-y-[-4px] duration-300">
      {/* Header */}
      <div className="mb-8">
        <h3 className="mb-2 font-bold text-2xl text-white">{plan.name}</h3>
        <div className="flex items-baseline">
          <span className="font-bold text-4xl text-white">{plan.price}</span>
          <span className="ml-2 text-gray-400 text-lg">/month</span>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-300 group/item">
            <div className="group-hover/item:bg-blue-500/20 bg-blue-500/10 mr-3 p-1 rounded-full transition-colors">
              <Check className="w-4 h-4 text-blue-400" />
            </div>
            <span className="group-hover/item:text-white transition-colors">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button 
        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group/button
          ${plan.popular 
            ? 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40' 
            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          }`}
      >
        {plan.buttonText}
        <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/button:translate-x-1 duration-300" />
      </button>
    </div>
  </div>
);

export function Pricing() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="bg-[radial-gradient(ellipse_at_top_right,#1d4ed880_5%,transparent_60%)] absolute inset-0" />
        <div className="bg-[radial-gradient(ellipse_at_top_left,#3b82f680_5%,transparent_60%)] absolute inset-0" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Choose the perfect plan for your needs. Start with our free tier and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;