import Tag from './Tag';
import { tags } from '../data';

function TagBar() {
  return (
    <ul className="py-2 px-6 border-y border-gray-300 md:flex items-center justify-between flex-wrap hidden ">
      {tags.map((tag, index) => {
        return <Tag key={index} tag={tag} />;
      })}
    </ul>
  );
}

export default TagBar;
