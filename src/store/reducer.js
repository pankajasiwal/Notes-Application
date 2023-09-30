import { useReducer } from 'react';

// reducer function
const reducer = (state, action) => {
  if (action.type === 'title') {
    return {
      title: action.value,
      note: state.note,
      error: state.error,
    };
  } else if (action.type === 'note') {
    return {
      title: state.title,
      note: action.value,
      error: state.error,
    };
  } else if (action.type === 'reset') {
    return {
      title: '',
      note: '',
      error: null,
    };
  } else if (action.type === 'error') {
    setTimeout(() => {
      return { title: '', note: '', error: action.value };
    }, 5000);
    return initialState;
  } else {
    return initialState;
  }
};

// define intital state
const initialState = { title: '', note: '', error: null };

const reducerStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default reducerStore;
