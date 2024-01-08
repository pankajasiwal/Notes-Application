import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function Card({ id, title, note, deleteNote }) {
  const [showFullText, setShowFullText] = React.useState(false);

  return (
    <div key={id} className='px-3 py-2 mb-5 basis-2/5 grow bg-stone-800 rounded-2xl h-fit shadow-2xl'>
      <div className='flex justify-between items-center border-b border-solid border-stone-600 '>
        <div className='flex items-center gap-4 mb-1'>
          <h2 className='text-white font-mono font-bold capitalize whitespace-nowrap'>{title}</h2>
          <MdDeleteForever className='text-[20px] cursor-pointer hover:text-stone-100' onClick={() => deleteNote(id)} />
        </div>
      </div>
      <p
        className={`text-justify my-1 cursor-pointer  ${showFullText ? 'line-clamp-none' : 'line-clamp-1'}`}
        onClick={() => setShowFullText((prev) => !prev)}
      >
        {note}
      </p>
    </div>
  );
}

export default Card;
