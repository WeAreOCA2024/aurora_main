interface handleAddServerModalProps {
  setServerCreateModal: (value: boolean) => void;
}

export const ServerCreateModal = ({setServerCreateModal}: handleAddServerModalProps) => {
  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setServerCreateModal(false);
    }
  };
  return(
    <div onClick={handleCloseModal} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-96 h-48 bg-white rounded-3xl p-4">
        <p className="text-center">serverを作成</p>
        <p className="flex justify-center"><input type="text" className="border-2 border-black"/></p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setServerCreateModal(false)}
            className=""
          >
            Cancel
          </button>
          <button
            onClick={() => { setServerCreateModal(false) }}
            className=""
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}