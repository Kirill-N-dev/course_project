const Qualities = (props) => {
  //
  return props.qualities.map((qual) => (
    <span className={'badge bg-' + qual.color + ' m-1'} key={qual._id}>
      {qual.name}
    </span>
  ));
};

export default Qualities;
