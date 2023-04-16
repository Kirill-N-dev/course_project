const SearchStatus = (props) => {
  //
  const number = props.number;
  let lastCount = +String(number)[String(number).length - 1];
  let penCount = +String(number)[String(number).length - 2];
  let tusa;
  if (lastCount === 1 && penCount !== 1) tusa = ' тусанёт';
  else tusa = ' тусанут';
  let man;
  if ((lastCount === 2 || lastCount === 3 || lastCount === 4) && penCount !== 1)
    man = ' человека';
  else man = ' человек';

  return number !== 0 ? (
    <>
      <div className="p-2 m-1 fs-6 badge bg-primary">
        {number} {man} {tusa} с тобой сегодня
      </div>
    </>
  ) : (
    <>
      <div className="p-2 m-1 fs-6 badge bg-danger">
        Никто с тобой не тусанёт
      </div>
    </>
  );
};

export default SearchStatus;
