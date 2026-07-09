import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Leaf, ArrowRight, LayoutDashboard, Route, ShieldCheck, BarChart3, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#1a1a1b] transition-colors duration-200 flex flex-col">
      {/* Top Navigation */}
      <nav className="border-b border-slate-200 dark:border-[#3c4043] bg-white/80 dark:bg-[#202124]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-brand-600 flex items-center justify-center text-white shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium tracking-tight text-slate-900 dark:text-white">Eco-Sync</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">How it Works</Link>
            <Link href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#impact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Impact</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Company</Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/board" className="btn-text hidden sm:inline-flex text-sm">Admin Console</Link>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1"></div>
            <Link href="/login" className="btn-text hidden sm:inline-flex text-sm">Log in</Link>
            <Link href="/signup" className="btn-primary text-sm shadow-sm">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-8 border border-brand-100 dark:border-brand-900/50">
          <Zap className="w-4 h-4" />
          <span>The new standard for campus sustainability</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 dark:text-white max-w-5xl mb-8 leading-[1.1]">
          Waste management, engineered for scale.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12 leading-relaxed">
          A centralized platform empowering users to track eco-points, and administrators to orchestrate campus-wide fleet dispatching with mathematical precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/signup" className="btn-primary px-8 py-3 text-base group">
            Get Started for Free
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="btn-secondary px-8 py-3 text-base">
            Log in to Dashboard
          </Link>
        </div>
      </section>

      {/* Product Interface Preview */}
      <section className="px-6 pb-32 max-w-6xl mx-auto w-full">
        <div className="rounded-2xl border border-slate-200 dark:border-[#3c4043] bg-white/50 dark:bg-[#202124]/50 p-2 md:p-4 shadow-2xl dark:shadow-none">
          <div className="rounded-xl border border-slate-200 dark:border-[#3c4043] bg-slate-50 dark:bg-[#1a1a1b] overflow-hidden flex flex-col relative select-none">
             
             {/* Fake Browser Header */}
             <div className="h-12 border-b border-slate-200 dark:border-[#3c4043] bg-white dark:bg-[#202124] flex items-center px-4 gap-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#3c4043]"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#3c4043]"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-[#3c4043]"></div>
               </div>
               <div className="h-6 flex-1 max-w-md mx-auto bg-slate-100 dark:bg-[#1a1a1b] rounded-md border border-slate-200 dark:border-[#3c4043] flex items-center px-3">
                 <span className="text-[10px] text-slate-400 font-mono">ecosync.app/user</span>
               </div>
             </div>

             {/* Fake App Body (User Dashboard Replica) */}
             <div className="flex overflow-hidden h-[450px]">
                {/* Sidebar Replica */}
                <div className="w-48 border-r border-slate-200 dark:border-[#3c4043] bg-white dark:bg-[#202124] py-4 hidden md:flex flex-col">
                   <div className="px-4 mb-4 flex items-center gap-2">
                     <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center text-white">
                        <Leaf className="w-3 h-3" />
                     </div>
                     <span className="text-sm font-semibold text-slate-900 dark:text-white">Eco-Sync</span>
                   </div>
                   <div className="space-y-1 pr-4">
                     <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-r-full text-xs font-medium">
                       <LayoutDashboard className="w-4 h-4" /> Dashboard
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                       <Leaf className="w-4 h-4" /> Log Waste
                     </div>
                     <div className="flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                       <ShieldCheck className="w-4 h-4" /> Report Issue
                     </div>
                   </div>
                </div>

                {/* Main Content Replica */}
                <div className="flex-1 p-6 md:p-8 flex flex-col bg-slate-50 dark:bg-[#1a1a1b] overflow-hidden">
                   <div className="mb-6">
                     <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Welcome back, Dahunsi</h2>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Here's your Eco-Sync summary for today.</p>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-4 mb-6">
                     <div className="bg-white dark:bg-[#202124] p-4 rounded-lg border border-slate-200 dark:border-[#3c4043] shadow-sm">
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Eco Points</div>
                        <div className="text-2xl font-semibold text-brand-600 dark:text-brand-400 mb-1">1,250</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">+50 this week</div>
                     </div>
                     <div className="bg-white dark:bg-[#202124] p-4 rounded-lg border border-slate-200 dark:border-[#3c4043] shadow-sm">
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Waste Logged</div>
                        <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-1">12kg</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Top 15% of campus</div>
                     </div>
                     <div className="bg-white dark:bg-[#202124] p-4 rounded-lg border border-slate-200 dark:border-[#3c4043] shadow-sm">
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Next Pickup</div>
                        <div className="text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-1">Tomorrow</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">08:00 AM - 10:00 AM</div>
                     </div>
                   </div>

                   <div className="flex-1 bg-white dark:bg-[#202124] rounded-lg border border-slate-200 dark:border-[#3c4043] shadow-sm">
                     <div className="px-4 py-3 border-b border-slate-200 dark:border-[#3c4043]">
                       <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
                     </div>
                     <div className="p-4 space-y-3">
                       {[1, 2].map((i) => (
                         <div key={i} className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#303134] flex items-center justify-center text-slate-500">
                             <Leaf className="w-3.5 h-3.5" />
                           </div>
                           <div>
                             <p className="text-xs font-medium text-slate-900 dark:text-white">Logged 2kg of Plastic</p>
                             <p className="text-[10px] text-slate-500 dark:text-slate-400">2 days ago</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
             </div>

             {/* Overlay Gradient for polish */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-[#1a1a1b] pointer-events-none opacity-40"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-[#202124] border-t border-slate-200 dark:border-[#3c4043]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">How Eco-Sync Works</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">A simple, rewarding process for a cleaner campus.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 dark:bg-[#3c4043] z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#202124] border-4 border-slate-50 dark:border-[#1a1a1b] shadow-sm flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Find a Bin</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Locate the nearest designated Eco-Sync waste bin on campus.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#202124] border-4 border-slate-50 dark:border-[#1a1a1b] shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Drop Waste</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sort and dispose of your recyclables in the correct category.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#202124] border-4 border-slate-50 dark:border-[#1a1a1b] shadow-sm flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Log on Platform</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Open the user app and log the estimated weight and type.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#202124] border-4 border-slate-50 dark:border-[#1a1a1b] shadow-sm flex items-center justify-center text-yellow-500 mb-6">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Score Points</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Earn Eco-Points instantly and climb the campus leaderboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50 dark:bg-[#1a1a1b] border-t border-slate-200 dark:border-[#3c4043]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">Enterprise-grade capabilities</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Robust tools designed for scale, efficiency, and flawless campus integration.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover p-10 flex flex-col items-start">
              <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 border border-brand-100 dark:border-brand-900/50">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Structured Logging</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Categorize and record waste deposits with precise metadata, ensuring perfectly tracked eco-points across the user base.</p>
            </div>
            
            <div className="card card-hover p-10 flex flex-col items-start">
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-900/50">
                <Route className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Intelligent Dispatch</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Automatically aggregate facility reports and instantly dispatch maintenance fleets to critical campus sectors.</p>
            </div>
            
            <div className="card card-hover p-10 flex flex-col items-start">
              <div className="w-12 h-12 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6 border border-orange-100 dark:border-orange-900/50">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Incident Management</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Centralized ticketing system for reported damages and missed pickups, complete with real-time status tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-24 bg-slate-50 dark:bg-[#1a1a1b] border-t border-slate-200 dark:border-[#3c4043]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-200 dark:divide-[#3c4043]">
            <div className="flex flex-col items-center p-4">
              <BarChart3 className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-4" />
              <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">45%</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Carbon Reduction</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <Users className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-4" />
              <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">12k</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Users</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <Leaf className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-4" />
              <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">850t</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Waste Recycled</div>
            </div>
            <div className="flex flex-col items-center p-4">
              <Zap className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-4" />
              <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2 tracking-tight">99%</div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">SLA Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#202124] border-t border-slate-200 dark:border-[#3c4043] py-20 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center text-white">
                  <Leaf className="w-3.5 h-3.5" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Eco-Sync</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pr-4">
                Standardizing campus operations and driving sustainable practices through precise data telemetry.
              </p>
            </div>
            
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-6 text-sm tracking-tight">Products</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="/user" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">User Portal</Link></li>
                <li><Link href="/board" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Admin Console</Link></li>
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-6 text-sm tracking-tight">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-6 text-sm tracking-tight">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-[#3c4043] flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} Eco-Sync Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
