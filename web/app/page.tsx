import Link from "next/link";
import { Check, Shield, Search, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-900">Fairward</div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
              <a href="#success-stories" className="text-gray-600 hover:text-gray-900">Success Stories</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </div>
            <Link 
              href="/audit"
              className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Start Audit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium text-sm">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New: Instant AI Audit for MRI & ER Bills
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight max-w-5xl mx-auto">
            Stop Overpaying for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">American Healthcare.</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your medical bill. Our AI instantly finds errors, overcharges, and price gouging—then writes the dispute letter for you.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link 
              href="/audit"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Audit My Bill Free <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 bg-gray-100 text-gray-700 text-lg font-bold rounded-xl hover:bg-gray-200 transition-all">
              View Sample Report
            </button>
          </div>

          <div className="pt-12 flex justify-center items-center gap-8 text-gray-400 grayscale opacity-60">
             {/* Simple text logos for demo speed */}
             <span className="text-xl font-bold">Forbes</span>
             <span className="text-xl font-bold">TechCrunch</span>
             <span className="text-xl font-bold">WSJ</span>
             <span className="text-xl font-bold">NPR</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Fairward Fights Back</h2>
            <p className="mt-4 text-gray-600">We use the same data hospitals use to negotiate prices.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Instant Analysis</h3>
              <p className="text-gray-600">
                Our AI reads your bill, extracts CPT codes, and identifies upcoding errors instantly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Price Truth</h3>
              <p className="text-gray-600">
                We compare your charges against 14,000+ negotiated rates in your specific zip code.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Auto-Dispute</h3>
              <p className="text-gray-600">
                Generate a legally-sound dispute letter referencing federal price transparency laws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Recovered for Patients</h2>
                    <div className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-8">
                        $4.2M+
                    </div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        From MRI overcharges to surprise ER bills, we help Americans keep their hard-earned money.
                    </p>
                    <Link 
                        href="/audit"
                        className="inline-block px-8 py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Join the Movement
                    </Link>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-gray-900">Fairward</div>
            <div className="text-gray-500 text-sm">
                © 2026 Fairward Health. All rights reserved.
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-gray-900">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-gray-900">Terms</a>
                <a href="#" className="text-gray-400 hover:text-gray-900">Twitter</a>
            </div>
        </div>
      </footer>
    </div>
  );
}
