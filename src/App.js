import { useEffect, useState, useMemo } from 'react';
import NavBar from './components/NavBar';
import NotesCard from './components/NotesCard';
import NotesForm from './components/NotesForm';
import ReducerStore from './store/Reducer';

function App() {
  const { state, dispatch } = ReducerStore();
  const [notes, setNotes] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');

  const fetchNotes = async () => {
    const response = await fetch('https://notes-keeper-react-default-rtdb.firebaseio.com/notes.json');
    console.log('in fetch note');
    if (!response.ok) {
      dispatch({ type: 'error', value: 'error in fetching' });
      return;
    }

    const data = await response.json();

    if (data) {
      const notesArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setNotes(notesArray);
    } else {
      dispatch({ type: 'error', value: 'No Notes! Try adding new notes' });
    }
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
  {
    console.log(state);
  }
  return (
    <div className='w-full text-white'>
      <div className='px-6 md:px-16 w-full'>
        <NavBar filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
        <NotesForm fetchNotes={fetchNotes} />
        {state.error ? (
          <p className='mt-8 capitalize text-center text-2xl'>{state.error}</p>
        ) : (
          <NotesCard notes={filteredNotes} deleteNote={deleteNote} fetchNotes={fetchNotes} />
        )}
      </div>
    </div>
  );
}

export default App;
