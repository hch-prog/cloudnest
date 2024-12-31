'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "/testimonials/testimonial1.jpg",
    quote: "CloudNest has transformed how our team manages files. The AI-powered organization is a game-changer for our workflow."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupX",
    image: "/testimonials/testimonial2.jpg",
    quote: "The security features and ease of use make CloudNest the perfect solution for our growing team's needs."
  },
  {
    name: "Oliver Brown",
    role: "Creative Director",
    company: "DesignHub",
    image: "/testimonials/testimonial3.png",
    quote: "We've tried many file management solutions, but CloudNest's intelligent features and clean interface stand out."
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
  <div
    className="relative group"
    style={{
      animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
    }}
  >
   
    <div className="group-hover:from-blue-600/20 group-hover:via-blue-500/20 group-hover:to-blue-400/20 absolute inset-0 border-white/10 bg-gradient-to-br from-blue-600/10 via-blue-500/10 to-blue-400/10 backdrop-blur-xl border rounded-2xl transition-colors duration-300" />

   
    <div className="relative p-8 rounded-2xl transition-all hover:translate-y-[-4px] duration-300">
 
      <div className="top-4 right-4 absolute font-serif text-6xl text-blue-500/10">&quot;</div>

      
      <div className="flex items-center mb-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse-slow" />
          <div className="absolute inset-[1px] bg-black rounded-full overflow-hidden">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="group-hover:scale-110 transition-transform duration-300 object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="ml-4">
          <h4 className="group-hover:text-blue-400 font-semibold text-white transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm">
            {testimonial.role} at <span className="text-blue-400">{testimonial.company}</span>
          </p>
        </div>
      </div>

    
      <p className="relative z-10 text-gray-300 leading-relaxed">
        {testimonial.quote}
      </p>

    
      <div className="flex items-center gap-1 mt-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-blue-500 fill-blue-500"
          />
        ))}
      </div>
    </div>
  </div>
);

export function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
   
      <div className="absolute inset-0">
        <div className="bg-[radial-gradient(ellipse_at_top_right,#1d4ed880_5%,transparent_60%)] absolute inset-0" />
        <div className="bg-[radial-gradient(ellipse_at_top_left,#3b82f680_5%,transparent_60%)] absolute inset-0" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-white">
            Loved by Teams Worldwide
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            See what others are saying about CloudNest
          </p>
        </div>

        
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;