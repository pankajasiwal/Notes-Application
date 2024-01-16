import Card from './Card';

const NotesCard = ({ notes, deleteNote, fetchNotes }) => {
  return (
    <div className='mt-5 flex flex-wrap gap-5 text-cream'>
      {notes.map((note) => (
        <Card
          id={note.id}
          title={note.title}
          note={note.note}
          deleteNote={deleteNote}
          key={note.id}
          fetchNotes={fetchNotes}
        />
      ))}
    </div>
  );
};

export default NotesCard;
