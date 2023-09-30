import { useState } from 'react';
import { MdKeyboardArrowUp, MdDeleteForever } from 'react-icons/md';
const NotesCard = ({ notes, deleteNote }) => {
  const [activeDiv, setActiveDiv] = useState(null);

  const activeDivHandler = (id) => {
    setActiveDiv(activeDiv === id ? null : id);
  };
  return (
    <div className='my-5 text-cream'>
      {notes.map((note) => (
        <div key={note.id} className='mb-5 bg-slate-800'>
          <div className='flex justify-between items-center bg-cyan-900 p-2' onClick={() => activeDivHandler(note.id)}>
            <div className='flex items-center'>
              <h2 className='text-white font-mono font-bold mr-4'>{note.title}</h2>
              <MdDeleteForever className='text-[20px]' onClick={() => deleteNote(note.id)} />
            </div>
            <MdKeyboardArrowUp className={`text-[30px] ${activeDiv === note.id ? 'rotate-180' : ''}`} />
          </div>
          <p className={`p-2 ${activeDiv === note.id ? 'block' : 'hidden'}`}>{note.note}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesCard;
