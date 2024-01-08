import reducerStore from '../store/Reducer';

const NotesForm = ({ fetchNotes }) => {
  const { state, dispatch } = reducerStore();

  const titleChangeHandler = (event) => {
    dispatch({ type: 'title', value: event.target.value });
  };
  const noteChangeHandler = (event) => {
    dispatch({ type: 'note', value: event.target.value });
  };

  const submitHandler = async () => {
    // console.log(state);
    const response = await fetch('https://notes-keeper-react-default-rtdb.firebaseio.com/notes.json', {
      method: 'POST',
      body: JSON.stringify({ title: state.title, note: state.note }),
    });

    if (!response.ok) {
      dispatch({ type: 'error', value: 'something went wrong' });
      return;
    } else {
      // console.log(response);
      fetchNotes();
      dispatch({ type: 'reset' });
    }
  };

  return (
    <div className='flex flex-col font-mono'>
      <div className='flex mb-3'>
        <h2 className='sm:mr-3 mr-2 font-semibold'>Title</h2>
        <input
          type='text'
          className='rounded-sm outline-none text-black px-2'
          onChange={titleChangeHandler}
          value={state.title}
        />
      </div>
      <div className='sm:flex'>
        <h2 className='sm:mr-5 sm:mb-0 mb-1 font-semibold'>Note</h2>
        <textarea
          name='note'
          id='note'
          cols='30'
          rows='5'
          className='w-full rounded-sm outline-none sm:w-full text-black px-2'
          value={state.note}
          onChange={noteChangeHandler}
        />
      </div>
      <div className='mt-4'>
        <button className='border px-5 py-1 rounded-lg hover:bg-stone-900' onClick={submitHandler}>
          Submit
        </button>
      </div>
      {state.error ? <p>{state.error}</p> : ''}
    </div>
  );
};

export default NotesForm;
