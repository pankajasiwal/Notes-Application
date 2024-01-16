import React, { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

function Card({ id, title, note, deleteNote, fetchNotes }) {
  const [showFullText, setShowFullText] = React.useState(false);
  const [notes, setNotes] = useState({
    title: title,
    note: note,
  });
  const [isEdit, setIsEdit] = useState(false);

  let editableTitle = <h2 className='text-white font-mono font-bold capitalize whitespace-nowrap'>{title}</h2>;
  let editableNote = (
    <p
      className={`text-justify my-1 cursor-pointer capitalize  ${showFullText ? 'line-clamp-none' : 'line-clamp-1'}`}
      onClick={() => setShowFullText((prev) => !prev)}
    >
      {note}
    </p>
  );

  if (isEdit) {
    editableTitle = (
      <input
        type='text'
        defaultValue={notes.title}
        className='bg-inherit  outline-none'
        onChange={(event) =>
          setNotes((prev) => {
            return { ...prev, title: event.target.value };
          })
        }
      />
    );
    editableNote = (
      <input
        type='text'
        defaultValue={notes.note}
        className='bg-inherit outline-none'
        onChange={(event) =>
          setNotes((prev) => {
            return { ...prev, note: event.target.value };
          })
        }
      />
    );
  }

  async function editHandler(id) {
    const response = await fetch(`https://notes-keeper-react-default-rtdb.firebaseio.com/notes/${id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: notes.note, title: notes.title }),
    });
    console.log(response);
    fetchNotes();
    setIsEdit(false);
  }

  return (
    <div key={id} className='px-3 py-2 mb-5 basis-2/5 grow bg-stone-800 rounded-2xl h-fit shadow-2xl'>
      <div className=' border-b border-solid border-stone-600 '>
        <div className='flex items-center justify-between mb-1'>
          {editableTitle}
          <span className='flex gap-4'>
            {isEdit ? (
              <IoMdCheckmark
                className='text-[20px] cursor-pointer hover:text-stone-100'
                onClick={() => editHandler(id)}
              />
            ) : (
              <MdEdit
                className='text-[20px] cursor-pointer hover:text-stone-100'
                onClick={() => setIsEdit((prev) => !prev)}
              />
            )}
            <MdDeleteForever
              className='text-[20px] cursor-pointer hover:text-stone-100'
              onClick={() => deleteNote(id)}
            />
          </span>
        </div>
      </div>
      {editableNote}
    </div>
  );
}

export default Card;
