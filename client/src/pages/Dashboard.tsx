import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EntryTable from './EntryTable';
import { searchEntries } from '../api/entries';

export default function Dashboard() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [tableKey, setTableKey] = useState(Date.now());

  function logout() { setAuth(null, null); navigate('/login'); }

  const doSearch = async () => {
    if (!q && !type) { setSearchResults(null); return; }
    const res = await searchEntries(q, type);
    setSearchResults(res.data);
  };

    useEffect(() => {
    if (!q && !type) {
      if (searchResults) setTableKey(Date.now()); // only refresh if coming from a search
      setSearchResults(null);
    }
  }, [q, type, searchResults]);

    return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MyFavs</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/add')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Entry</button>
            <button onClick={logout} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">Logout</button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="flex items-end gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input id="search" placeholder="Search by title, director, etc..." value={q} onChange={e => setQ(e.target.value)} className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select id="type" value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border rounded-md">
                <option value="">All</option>
                <option value="MOVIE">Movie</option>
                <option value="TV_SHOW">TV Show</option>
              </select>
            </div>
            <div>
                                          <button onClick={doSearch} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">Search</button>
            </div>
          </div>
        </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
          {searchResults ? (
            <EntryTable initialItems={searchResults} staticList />
          ) : (
            <EntryTable key={tableKey} />
          )}
        </div>
      </main>
    </div>
  );
}
