import Image from 'next/image';

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
    name: "Emma Davis",
    role: "Creative Director",
    company: "DesignHub",
    image: "/testimonials/testimonial3.jpg",
    quote: "We've tried many file management solutions, but CloudNest's intelligent features and clean interface stand out."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Loved by Teams Worldwide</h2>
          <p className="text-gray-400">See what others are saying about CloudNest</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="relative group p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10" />
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[1px]">
                    <div className="w-full h-full rounded-full bg-black overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{testimonial.quote}</p>
                <div className="mt-6 flex items-center text-blue-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
