import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-green-800">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">🏔️ Bergkabuff</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#bucketlist" className="text-white/90 hover:text-white">Bucket List</a>
              <a href="#about" className="text-white/90 hover:text-white">About</a>
              <a href="#progress" className="text-white/90 hover:text-white">Progress</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-6">
            Making Dreams Reality
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Welcome to my public bucket list journey. 50+ life goals, tracked openly, 
            achieved systematically, and shared with the world.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">2025 Goals</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span>Website erstellen</span>
                <span className="bg-yellow-500 px-2 py-1 rounded text-black text-sm">In Arbeit</span>
              </div>
              <div className="flex justify-between text-white">
                <span>YouTube Kanal</span>
                <span className="bg-yellow-500 px-2 py-1 rounded text-black text-sm">In Arbeit</span>
              </div>
              <div className="flex justify-between text-white">
                <span>App entwickeln</span>
                <span className="bg-gray-500 px-2 py-1 rounded text-white text-sm">Geplant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/60">
            🚀 Currently in development • Coming soon: Interactive bucket list
          </p>
        </div>
      </main>
    </div>
  )
}

export default App