import { useEffect, useState, useMemo } from 'react';
import NavBar from './components/NavBar';
import NotesCard from './components/NotesCard';
import NotesForm from './components/NotesForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');

  console.log(notes);
  const fetchNotes = async () => {
    const response = await fetch('https://notes-keeper-react-default-rtdb.firebaseio.com/notes.json');

    if (!response.ok) {
      console.log('error in fetching');
    }

    const data = await response.json();

    const notesArray = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));

    setNotes(notesArray);
  };

  const deleteNote = async (id) => {
    const response = await fetch(`https://notes-keeper-react-default-rtdb.firebaseio.com/notes/${id}.json`, {
      method: 'DELETE',
    });
    console.log(response);
    setNotes(notes.filter((note) => note.id !== id));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = useMemo(
    () =>
      filterSearch === ''
        ? notes // don't filter if empty
        : notes.filter((note) => note.title.toLowerCase().includes(filterSearch)),
    [notes, filterSearch],
  );

  return (
    <div className='w-full text-white'>
      <div className='px-6 md:px-16 w-full'>
        <NavBar filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
        <NotesForm fetchNotes={fetchNotes} />
        <NotesCard notes={filteredNotes} deleteNote={deleteNote} />
      </div>
    </div>
  );
}

export default App;
