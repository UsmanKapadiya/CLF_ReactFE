import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Gallery from './pages/Gallery/Gallery'
import News from './pages/News/News'


function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery/" element={<Gallery />} />
            <Route path="/gallery/photos/" element={<Gallery />} />
            <Route path="/gallery/videos/" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:year/:month/:day/:slug" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
