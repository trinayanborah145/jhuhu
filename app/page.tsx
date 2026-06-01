import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  const companyName = process.env.COMPANY_NAME || 'Sukrit Infras';
  const companyPhone = process.env.COMPANY_PHONE || '+44 20 7946 0958';
  const ownerName = process.env.OWNER_FIRST_NAME || 'Marcus';
  const serviceArea = process.env.COMPANY_SERVICE_AREA || 'London and surrounding home counties';

  return (
    <>
      <main className="min-h-screen bg-[#0d0d15] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-slate-950 flex flex-col justify-between p-6 sm:p-24 relative overflow-hidden font-sans select-none">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Decorative top-right blur highlight */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-800/20 blur-[120px] pointer-events-none" />

        {/* Header / Logo */}
        <header className="z-10 w-full max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl font-extrabold text-white tracking-wider flex items-center">
              🏗️ <span className="ml-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">{companyName.toUpperCase()}</span>
            </span>
          </div>
          <div className="hidden sm:flex space-x-6 text-sm text-slate-400">
            <span className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">Services</span>
            <span className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">Projects</span>
            <span className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">About Us</span>
            <span className="hover:text-amber-400 transition-colors duration-200 cursor-pointer">Contact</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="z-10 flex-1 flex flex-col justify-center items-center text-center max-w-4xl mx-auto my-12 sm:my-20">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Now Booking for Q3/Q4</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Building Your Vision <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              With Precision
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
            From custom architectural builds to premium home extensions, we deliver master craftsmanship and luxury finishes across {serviceArea}.
          </p>

          {/* Client-side dispatch button using window custom events */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              // Dispatch custom window event that the client component listens to
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-amber-900/20 hover:scale-105 active:scale-95"
              data-trigger-chat
            >
              Start Your Project
            </button>
            <a
              href={`tel:${companyPhone}`}
              className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 font-medium px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-center"
            >
              Call {companyPhone}
            </a>
          </div>

          {/* Script to trigger custom event from static markup without converting home to client component */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', () => {
                  const btn = document.querySelector('[data-trigger-chat]');
                  if (btn) {
                    btn.addEventListener('click', () => {
                      window.dispatchEvent(new CustomEvent('open-chat-widget'));
                    });
                  }
                });
              `,
            }}
          />
        </section>

        {/* Footer */}
        <footer className="z-10 w-full max-w-5xl mx-auto border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <p className="bg-gradient-to-r from-amber-500/5 to-amber-500/10 text-amber-400/90 font-medium px-3.5 py-1.5 rounded-full border border-amber-500/10">
            ⚡ Powered by AI Assistant Rahul
          </p>
        </footer>
      </main>

      {/* Floating Chat Widget - moved outside main to avoid overflow-hidden clipping */}
      <ChatWidget
        companyName={companyName}
        companyPhone={companyPhone}
        ownerName={ownerName}
      />
    </>
  );
}
