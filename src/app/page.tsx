import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col bg-neo-bg">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Navigation */}
      <nav className="relative z-20 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center border-b-3 border-neo-border bg-neo-bg sticky top-0">
        <div className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tight uppercase">
          <div className="w-8 h-8 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ♻
          </div>
          <span className="hidden sm:inline">Eco-Sync</span>
        </div>
        
        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex gap-8 font-bold uppercase text-sm tracking-widest">
          <Link href="#features" className="hover:text-neo-primary transition-colors">Features</Link>
          <Link href="#impact" className="hover:text-neo-primary transition-colors">Our Impact</Link>
          <Link href="#mission" className="hover:text-neo-primary transition-colors">Mission</Link>
          <Link href="#testimonials" className="hover:text-neo-primary transition-colors">Reviews</Link>
        </div>

        <div className="flex gap-2 md:gap-4">
          <Link href="/login" className="neo-btn-secondary py-2 px-4 md:px-6">Log In</Link>
          <Link href="/signup" className="neo-btn py-2 px-4 md:px-6">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-block px-4 py-1 border-3 border-neo-border bg-white font-bold rounded-pill shadow-neo mb-6 md:mb-8 rotate-[-2deg]">
            🌿 Waste Management for Modern Cities
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
            Don't Let Your City Go To <span className="text-neo-primary inline-block rotate-[1deg]">Waste.</span>
          </h1>
          
          <p className="text-lg md:text-2xl font-semibold max-w-2xl mb-8 md:mb-12 border-3 border-neo-border p-4 md:p-6 bg-[#FFD166] shadow-neo rounded-neo rotate-[1deg]">
            The only smart bin subscription you'll ever need. Automate your waste pickups and keep your neighborhood pristine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto">
            <Link href="/signup" className="neo-btn text-lg md:text-xl px-8 py-4 w-full md:w-auto text-center">
              Get Your Smart Bin Today →
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-xl relative">
          <div className="absolute inset-0 bg-neo-accent rounded-neo border-3 border-neo-border shadow-neo translate-x-4 translate-y-4"></div>
          <img 
            src="/bin.png" 
            alt="Eco-Sync Smart Bin" 
            className="w-full h-auto relative z-10 border-3 border-neo-border rounded-neo shadow-neo bg-white object-cover"
          />
        </div>
      </section>

      {/* Mission & Impact Statistics */}
      <section id="impact" className="relative z-10 bg-white border-y-3 border-neo-border py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x-3 divide-y-3 md:divide-y-0 divide-neo-border">
            <div className="p-4">
              <div className="text-5xl md:text-7xl font-black text-neo-primary mb-2">40%</div>
              <div className="font-bold uppercase text-neo-text/70">Reduction in CO2</div>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <div className="text-5xl md:text-7xl font-black text-neo-secondary mb-2">10k+</div>
              <div className="font-bold uppercase text-neo-text/70">Active Smart Bins</div>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <div className="text-5xl md:text-7xl font-black text-neo-accent mb-2">24/7</div>
              <div className="font-bold uppercase text-neo-text/70">Fleet Monitoring</div>
            </div>
            <div className="p-4 pt-8 md:pt-4">
              <div className="text-5xl md:text-7xl font-black text-[#FFD166] mb-2">99%</div>
              <div className="font-bold uppercase text-neo-text/70">On-Time Pickups</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Features Section */}
      <section id="features" className="relative z-10 bg-neo-primary border-b-3 border-neo-border py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase inline-block bg-white border-3 border-neo-border px-8 py-4 shadow-neo -rotate-1">
              How Eco-Sync Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="neo-card hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#FFD166] border-3 border-neo-border rounded-full flex items-center justify-center text-3xl shadow-neo mb-6">
                1️⃣
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase">Get Your Bin</h3>
              <p className="font-medium text-lg">Sign up online and we'll deliver a QR-enabled smart bin right to your doorstep within 48 hours.</p>
            </div>
            
            <div className="neo-card hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-white border-3 border-neo-border rounded-full flex items-center justify-center text-3xl shadow-neo mb-6">
                2️⃣
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase">One-Tap Alert</h3>
              <p className="font-medium text-lg">When your bin is full, just tap a single button in our app to alert our dispatchers instantly.</p>
            </div>
            
            <div className="neo-card hover:-translate-y-2 transition-transform duration-300 bg-neo-text text-white">
              <div className="w-16 h-16 bg-neo-accent border-3 border-white rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-6 text-white">
                3️⃣
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase">Guaranteed Pickup</h3>
              <p className="font-medium text-lg">Our fleet arrives, scans your QR code as proof of service, and you get an instant push notification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Mission Section */}
      <section id="mission" className="relative z-10 py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">
              Our Mission is <span className="text-neo-primary">Zero Waste.</span>
            </h2>
            <p className="text-xl font-medium mb-6 leading-relaxed">
              For decades, city waste management has relied on static, inefficient routes. Trucks drive down streets regardless of whether bins are actually full, burning excess fuel and missing overflowing areas.
            </p>
            <p className="text-xl font-medium leading-relaxed">
              Eco-Sync fixes this by equipping every household with a smart bin and treating our fleet as an on-demand dynamic network. We only dispatch where needed, drastically reducing municipal carbon footprints.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-white border-3 border-neo-border p-6 shadow-neo rotate-2">
              <h4 className="font-black text-2xl uppercase mb-2">Dynamic Routing</h4>
              <p className="font-medium">Algorithmically optimized paths for our ground ops team.</p>
            </div>
            <div className="bg-neo-secondary text-white border-3 border-neo-border p-6 shadow-neo -rotate-2">
              <h4 className="font-black text-2xl uppercase mb-2">Proof of Service</h4>
              <p className="font-medium text-white/90">QR-verified scans ensure no bin is ever left behind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 bg-[#FFD166] border-y-3 border-neo-border py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase">What Neighborhoods Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-3 border-neo-border p-8 shadow-neo relative">
              <div className="text-6xl absolute top-4 right-6 opacity-20">"</div>
              <p className="text-xl font-bold mb-6 relative z-10">
                "Since switching to Eco-Sync, our neighborhood streets have never been cleaner. The one-tap pickup feature is absolutely brilliant."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-primary border-3 border-neo-border rounded-full flex items-center justify-center font-black">S</div>
                <div>
                  <h4 className="font-black uppercase">Sarah Jenkins</h4>
                  <p className="text-sm font-bold text-neo-text/70">HOA President, Downtown Area</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-3 border-neo-border p-8 shadow-neo relative">
              <div className="text-6xl absolute top-4 right-6 opacity-20">"</div>
              <p className="text-xl font-bold mb-6 relative z-10">
                "I love getting the push notification the second they scan my bin. It proves they actually did the job. Top-tier service."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neo-accent text-white border-3 border-neo-border rounded-full flex items-center justify-center font-black">M</div>
                <div>
                  <h4 className="font-black uppercase">Marcus Thorne</h4>
                  <p className="text-sm font-bold text-neo-text/70">Local Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-4 sm:px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 max-w-4xl mx-auto">
          Ready to Clean Up Your Act?
        </h2>
        <Link href="/signup" className="neo-btn text-2xl px-12 py-6">
          Join the Fleet Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-neo-bg pt-16 pb-8 px-4 sm:px-6 border-t-3 border-neo-border mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-3xl font-black tracking-tight uppercase mb-4">
              <div className="w-10 h-10 bg-neo-primary border-3 border-neo-border flex items-center justify-center shadow-neo">
                ♻
              </div>
              Eco-Sync
            </div>
            <p className="font-semibold max-w-sm mb-6 text-neo-text/80">
              Revolutionizing waste management with data-driven routing and smart hardware.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase text-xl mb-4">Platform</h4>
            <ul className="space-y-2 font-bold text-neo-text/70">
              <li><Link href="/signup" className="hover:text-neo-secondary transition-colors">Get Started</Link></li>
              <li><Link href="/login" className="hover:text-neo-secondary transition-colors">Customer Login</Link></li>
              <li><a href="#" className="hover:text-neo-secondary transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black uppercase text-xl mb-4">Company</h4>
            <ul className="space-y-2 font-bold text-neo-text/70">
              <li><a href="#mission" className="hover:text-neo-secondary transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-neo-secondary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neo-secondary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-neo-secondary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto border-t-3 border-neo-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold text-sm">© {new Date().getFullYear()} Eco-Sync Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 border-3 border-neo-border rounded-full flex items-center justify-center bg-white shadow-neo font-bold hover:-translate-y-1 cursor-pointer transition-transform">𝕏</div>
            <div className="w-10 h-10 border-3 border-neo-border rounded-full flex items-center justify-center bg-white shadow-neo font-bold hover:-translate-y-1 cursor-pointer transition-transform">In</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
