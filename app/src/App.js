import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verses from './pages/Verses';
import List from './pages/List';
import Appendices from './pages/Appendices';
import Apps from './pages/Apps';
import Introduction from './pages/Introduction/Introduction';

function App() {
  const [verses, setVerses] = useState(null);
  const [titles, setTitles] = useState(null);
  const [notes, setNotes] = useState(null);
  const [verses_eng, setVerses_eng] = useState(null);
  const [titles_eng, setTitles_eng] = useState(null);
  const [notes_eng, setNotes_eng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVersesData = async () => {
      try {
        const resV = await import('./assets/verses.json');
        setVerses(resV.default);

        const resT = await import('./assets/titles.json');
        setTitles(resT.default);

        const resN = await import('./assets/notes.json');
        setNotes(resN.default);

        const resV_eng = await import('./assets/verses_eng.json');
        setVerses_eng(resV_eng.default);

        const resT_eng = await import('./assets/titles_eng.json');
        setTitles_eng(resT_eng.default);

        const resN_eng = await import('./assets/notes_eng.json');
        setNotes_eng(resN_eng.default);
      } catch (error) {
        console.error('Failed to load one of the source json files: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVersesData();
  }, []);

  if (isLoading) {
    return (<div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex text-neutral-900 select-none`}>
      <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-900`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className={`opacity-25`} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className={`opacity-75`} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {`Yükleniyor ...`}
    </div>)
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:no" element={<Verses verses={verses} titles={titles} notes={notes} verses_eng={verses_eng} titles_eng={titles_eng} notes_eng={notes_eng} />} />
        <Route path="/ekler" element={<Appendices />} />
        <Route path="/ek" element={<Appendices />} />
        <Route path="/ek/giris" element={<Introduction/>} />
        <Route path="/ek/:appId" element={<Apps />} />
      </Routes>
    </Router>
  );
}

export default App;
