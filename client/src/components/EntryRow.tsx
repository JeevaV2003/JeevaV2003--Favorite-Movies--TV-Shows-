import { useNavigate } from 'react-router-dom';
import { deleteEntry } from '../api/entries';
import { useAuth } from '../context/AuthContext';

export default function EntryRow({ entry }: any) {
  const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(entry.id);
        window.location.reload(); // A more elegant solution would be to update the state
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setAuth(null, null);
          navigate('/login');
        }
      }
    }
  };

  return (
      <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.type}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.director}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.budget}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.location}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.duration}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.year}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.posterUrl && <img src={`${import.meta.env.VITE_API_BASE.replace('/api', '')}${entry.posterUrl}`} alt="Poster" className="h-16 w-auto rounded-md" />}
      </td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button onClick={() => navigate(`/edit/${entry.id}`)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">Edit</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors ml-2">Delete</button>
      </td>
    </tr>
  );
}
