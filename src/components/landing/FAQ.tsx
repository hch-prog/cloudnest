'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

const FAQCard = ({
  item,
  isOpen,
  onClick
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="relative group">
    {/* Background with animated gradient */}
    <div className="group-hover:from-blue-600/20 group-hover:via-blue-500/20 group-hover:to-blue-400/20 absolute inset-0 border-white/10 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-400/10 backdrop-blur-xl border rounded-2xl transition-colors duration-300" />

    {/* Content */}
    <div
      className="relative p-6 rounded-2xl transition-all hover:translate-y-[-2px] duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
          e.preventDefault();
        }
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h4 className="font-semibold text-white">{item.question}</h4>
        <ChevronDown
          className={`w-5 h-5 text-blue-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''
            }`}
        />
      </div>
      <div
        className={`mt-2 text-gray-400 text-sm leading-relaxed transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        {item.answer}
      </div>
    </div>
  </div>
);

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 overflow-hidden">
  
      <div className="absolute inset-0">
        <div className="bg-[radial-gradient(ellipse_at_top_right,#1d4ed880_5%,transparent_60%)] absolute inset-0" />
        <div className="bg-[radial-gradient(ellipse_at_top_left,#3b82f680_5%,transparent_60%)] absolute inset-0" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
     
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about CloudNest
          </p>
        </div>

      
        <div className="gap-8 grid md:grid-cols-2 mx-auto max-w-4xl">
          {faqItems.map((item, index) => (
            <FAQCard
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;