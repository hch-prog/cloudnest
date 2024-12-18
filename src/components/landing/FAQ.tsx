import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How secure is CloudNest?",
    answer: "CloudNest uses bank-level encryption and security measures to ensure your files are always protected. We implement end-to-end encryption, regular security audits, and comply with industry standards."
  },
  {
    question: "Can I access my files offline?",
    answer: "Yes! CloudNest offers desktop and mobile apps that allow you to sync your files for offline access. Changes will automatically sync when you're back online."
  },
  {
    question: "What file types are supported?",
    answer: "CloudNest supports all common file types including documents, images, videos, and audio files. Our AI can also analyze and organize these files automatically."
  },
  {
    question: "How does the AI organization work?",
    answer: "Our AI analyzes your files' content, metadata, and usage patterns to automatically categorize and tag them. It learns from your organization preferences to provide personalized suggestions."
  },
  {
    question: "Is there a file size limit?",
    answer: "Free accounts can upload files up to 100MB each. Pro and Enterprise accounts can upload files up to 5GB and unlimited sizes respectively."
  },
  {
    question: "Can I share files with external users?",
    answer: "Yes! You can share files and folders via secure links, with optional password protection and expiry dates. You can also set different permission levels for different users."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about CloudNest</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10" />
              <div 
                className="relative p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-y-[-2px]"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-semibold pr-8">{item.question}</h4>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div 
                  className={`mt-2 text-gray-400 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
