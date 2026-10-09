import React, { useState } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'dashboard' | 'withdraw'>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  
  // Dashboard states
  const [balance, setBalance] = useState(2500);
  const [referralsCount, setReferralsCount] = useState(5);
  const userRefCode = "CASHIZI509";

  // Withdraw states
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawPhone, setWithdrawPhone] = useState('');
  const [provider, setProvider] = useState('MonCash');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lè itilizatè a konekte, voye l sou Dashboard la
    setCurrentScreen('dashboard');
  };

  const handleShare = () => {
    const text = `Vini jwenn mwen sou Cash Izi! Fè lajan vit chak jou an Ayiti. Sèvi ak kòd referans mwen an: ${userRefCode}`;
    if (navigator.share) {
      navigator.share({ title: 'Cash Izi', text: text, url: window.location.href });
    } else {
      alert("Kòd referans ou a kopye: " + userRefCode);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 max-w-md mx-auto">
      
      {/* --- EKRAN 1: AUTHENTICATION (LOGIN / SIGNUP) --- */}
      {currentScreen === 'auth' && (
        <div className="my-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/30 mb-3">
              <span className="text-2xl font-black text-slate-950">CI</span>
            </div>
            <h1 className="text-3xl font-bold tracking-wider text-emerald-400">Cash Izi</h1>
            <p className="text-sm text-slate-400 mt-1">Bous an liy ki pi rapid an Ayiti</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex mb-6 bg-slate-950 p-1 rounded-xl">
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                onClick={() => setIsLogin(true)}
              >
                Konekte
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                onClick={() => setIsLogin(false)}
              >
                Kreye Kont
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nimewo Telefòn (MonCash / NatCash)</label>
                <input
                  type="tel"
                  placeholder="+509 XXXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Kòd Sekirite (PIN)</label>
                <input
                  type="password"
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                {isLogin ? 'Konekte kounye a' : 'Kreye Kont mwen'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- EKRAN 2: DASHBOARD --- */}
      {currentScreen === 'dashboard' && (
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <header className="flex justify-between items-center mb-6 pt-4">
              <div>
                <h2 className="text-xs text-slate-400">Byenveni,</h2>
                <p className="text-lg font-bold text-emerald-400">{phone || "+509 31XX XXXX"}</p>
              </div>
              <button 
                onClick={() => setCurrentScreen('auth')}
                className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                Dekonekte
              </button>
            </header>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 shadow-xl mb-6">
              <p className="text-xs text-emerald-100 uppercase tracking-wider font-medium">Balans Kòb ou</p>
              <h1 className="text-3xl font-black mt-1 mb-4">{balance} Goud</h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentScreen('withdraw')}
                  className="flex-1 bg-slate-950 text-emerald-400 text-sm font-bold py-2.5 rounded-xl shadow-md hover:bg-slate-900 transition-all"
                >
                  Fè Retrè
                </button>
                <button onClick={handleShare} className="flex-1 bg-white text-slate-950 text-sm font-bold py-2.5 rounded-xl shadow-md hover:bg-emerald-50 transition-all">
                  Pataje Link
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
              <p className="text-xs text-slate-400 mb-2">Kòd Referans ou (Envite zanmi w)</p>
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
                <span className="font-mono font-bold text-emerald-400 tracking-wider">{userRefCode}</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg font-medium">
                  {referralsCount} Moun Envite
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- EKRAN 3: WITHDRAW --- */}
      {currentScreen === 'withdraw' && (
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <header className="flex items-center justify-between mb-6 pt-4">
              <h1 className="text-xl font-bold text-emerald-400">Demande Retrè Lajan</h1>
              <button 
                onClick={() => { setCurrentScreen('dashboard'); setSuccess(false); }}
                className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400"
              >
                Retounen
              </button>
            </header>

            {success ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center my-8">
                <div className="w-16 h-16 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h2 className="text-lg font-bold text-emerald-400 mb-2">Demann ou an voye ak siksè!</h2>
                <p className="text-xs text-slate-300 mb-6">
                  Lajan an pral antre sou nimewo {withdrawPhone} ({provider}) la nan mwens pase 24èdtan.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl"
                >
                  Fè yon lòt retrè
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">Chwazi Rezo a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setProvider('MonCash')}
                      className={`py-3 rounded-xl font-bold text-sm border transition-all ${provider === 'MonCash' ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      MonCash
                    </button>
                    <button
                      type="button"
                      onClick={() => setProvider('NatCash')}
                      className={`py-3 rounded-xl font-bold text-sm border transition-all ${provider === 'NatCash' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      NatCash
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Montan pou Retire (Goud)</label>
                  <input
                    type="number"
                    placeholder="Egz: 500"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Nimewo Telefòn Resevwa a</label>
                  <input
                    type="tel"
                    placeholder="+509 XXXX XXXX"
                    value={withdrawPhone}
                    onChange={(e) => setWithdrawPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 mt-4"
                >
                  {loading ? 'Ap voye demann lan...' : 'Konfime Retrè a'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer anba tout paj yo */}
      <footer className="text-center pt-4 border-t border-slate-900 mt-4">
        <p className="text-xs text-slate-500">Cash Izi © 2026 - Tout Dwa Rezève</p>
      </footer>
    </div>
  );
}
