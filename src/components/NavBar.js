const NavBar = ({ filterSearch, setFilterSearch }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center pt-5 sm:justify-between sm:flex-row mb-10'>
      <h1 className='text-cream font-mono font-bold text-xl sm:mb-0 mb-3'>Notes Keeper</h1>
      <input
        type='text'
        placeholder='Search using Title'
        className='sm:px-6 px-4 py-2 text-black outline-none rounded-md'
        onChange={(event) => {
          setFilterSearch(() => event.target.value);
        }}
        value={filterSearch}
      />
    </div>
  );
};

export default NavBar;
