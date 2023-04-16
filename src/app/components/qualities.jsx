const Qualities = (props) => {
  const na = props.color.map((i) => i);
  /*  console.log(na); */
  return na.map((i, ind) => (
    <span className={'badge ' + 'bg-' + i + ' m-1'} key={i.length}>
      {props.name[ind]}
    </span>
  ));
  {
    /* КЛЮЧ ПОДОБРАН МЕТОДОМ ТЫКА */
  }
};

export default Qualities;
