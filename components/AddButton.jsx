const AddButton = ({ setClose }) => {
  return (
    <div className="bg-secondary">
      <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-7xl  mx-auto">
        <button
          onClick={() => setClose(false)}
          className="font-semibold rounded-md capitalize bg-black text-secondary px-4 py-2 opacity-90 my-3"
        >
          Add New Pizza
        </button>
      </div>
    </div>
  );
};

export default AddButton;
