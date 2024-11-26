import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Scan from './pages/Scan';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/about" element={<About />} />
			<Route path="/scan/:scan_uuid" element={<Scan />} />
		</Routes>
	);
}

export default App
