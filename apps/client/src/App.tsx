import NotFound from './pages/NotFound';

import { Route, Routes } from 'react-router-dom';

import Problem from '@/pages/Problem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Problem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
