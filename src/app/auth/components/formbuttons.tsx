interface AuthFormButtonsComponentProps {
  handlePrev: () => void;
}

export const AuthFormButtonsComponent = ({handlePrev}:AuthFormButtonsComponentProps) => {
  return (
    <div className="flex justify-center gap-20 mt-5">
      <button type="button" onClick={handlePrev} className="text-xl px-3 py-2 bg-neutral-400 rounded-md hover:bg-neutral-500 transition-colors">戻る</button>
      <button type="submit" className="text-xl px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-colors">次へ</button>
    </div>
  )
}