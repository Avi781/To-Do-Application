import { useState } from 'react';

export default function TodoForm({ onCreate }: { onCreate: (title: string, description?: string) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = (e: any) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Work Title"
          className="flex-1 p-2 border rounded"
        />
      </div>
      <div className="mt-2">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Work Description"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
        >
          Add
        </button>
      </div>
    </form>

  )
}
