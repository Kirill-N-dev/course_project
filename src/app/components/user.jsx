import Bookmark from './bookmark';
import Qualities from './qualities';

const User = (props) => {
  return (
    <tr key={props._id}>
      <td>{props.name}</td>
      <td>
        <Qualities
          color={props.qualities.map((i) => i.color)}
          name={props.qualities.map((i) => i.name)}
          id={props._id}
          key={props._id}
        />
      </td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate} /5</td>

      <td>
        <Bookmark
          bookmarkSelected={props.bookmark}
          id={props._id}
          onClick={() => props.handleColorizer(props._id)}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.handleDelete(props._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
