import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createEntry, updateEntry, getEntry } from '../api/entries';

export default function AddEditEntry() {
  const { id } = useParams<{ id?: string }>(); // ✅ Typed & optional
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // ✅ Only fetch when id exists
      (async () => {
        setLoading(true);
        try {
          const res = await getEntry(Number(id));
          const e = res;

          // ✅ Safely map keys that exist
          const keys = [
            'title', 'type', 'director', 'budget',
            'location', 'duration', 'year', 'notes'
          ];

          keys.forEach((key) => setValue(key as any, e[key]));
        } catch (error) {
          console.error('Error fetching entry:', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, setValue]);

    const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'poster') {
        if (data.poster[0]) formData.append('poster', data.poster[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      if (id) {
        await updateEntry(Number(id), formData);
      } else {
        await createEntry(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold">{id ? 'Edit' : 'Add'} Entry</h1>
      <div className="flex flex-col">
        <label>Title</label>
        <input {...register('title')} placeholder="Title" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Type</label>
        <select {...register('type')} className="p-2 border rounded">
          <option value="MOVIE">Movie</option>
          <option value="TV_SHOW">TV Show</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label>Director</label>
        <input {...register('director')} placeholder="Director" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Budget</label>
        <input {...register('budget')} placeholder="Budget" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Location</label>
        <input {...register('location')} placeholder="Location" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Duration</label>
        <input {...register('duration')} placeholder="Duration" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Year</label>
        <input {...register('year')} placeholder="Year" className="p-2 border rounded" />
      </div>
      <div className="flex flex-col">
        <label>Poster</label>
        <input type="file" {...register('poster')} />
      </div>
      <div className="flex flex-col">
        <label>Notes</label>
        <textarea {...register('notes')} placeholder="Notes" className="p-2 border rounded" />
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
