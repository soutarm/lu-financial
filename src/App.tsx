import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Philosophy } from './components/Philosophy';
import { Protocol } from './components/Protocol';

function App() {
  return (
    <div className="bg-cream min-h-screen selection:bg-moss selection:text-cream">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
      </main>
    </div>
  );
}

export default App;
