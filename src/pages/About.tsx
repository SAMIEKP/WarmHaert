import { motion } from 'motion/react';
import { Target, Users, Globe } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Malawi Destinations', value: '20+' },
    { label: 'Happy Travelers', value: '8K+' },
    { label: 'Local Expert Guides', value: '85' },
    { label: 'Years of Service', value: '12' }
  ];

  return (
    <div className="pt-32 bg-white">
      {/* Hero Section */}
      <section className="px-6 pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-3 block">Rooted in Malawi</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">Our Story at <br />WarmHeart</h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Founded in 2014, WarmHeart was created to showcase Malawi through trusted local expertise, thoughtful planning, and genuine hospitality.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <h4 className="text-3xl font-display font-bold text-gold">{s.value}</h4>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
              <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Flickr%20-%20ggallice%20-%20Lilongwe_market.jpg" alt="About" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 aspect-square rounded-[2rem] overflow-hidden -rotate-6 border-8 border-white shadow-2xl hidden md:block">
              <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Lilongwe%20%28Malawi%29%20-%20crafts_market.JPG" alt="About" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-soft-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: 'Our Purpose', text: 'To help travelers experience the best of Malawi with confidence, comfort, and authentic local connection.' },
              { icon: Users, title: 'People First', text: 'We work with local communities, guides, and hosts to deliver warm, dependable service at every step.' },
              { icon: Globe, title: 'Responsible Impact', text: 'We support sustainable tourism that protects Malawi’s landscapes, wildlife, and cultural heritage.' }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mb-8">
                  <v.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Meet the WarmHeart Team</h2>
            <p className="text-gray-400">The local experts behind your most memorable Malawi journeys.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Chifundo Phiri', role: 'Founder & Director', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lilongwe_market_closeup.JPG' },
              { name: 'Ruth Zimba', role: 'Head of Experiences', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flickr%20-%20ggallice%20-%20Lilongwe_market.jpg' },
              { name: 'Tamanda Jere', role: 'Safari Operations', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lilongwe%20market.JPG' },
              { name: 'Yamikani Banda', role: 'Guest Concierge', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lilongwe%20%28Malawi%29%20-%20crafts_market.JPG' }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="text-xl font-display font-bold">{member.name}</h4>
                <p className="text-gold text-xs uppercase font-bold tracking-[0.2em]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
