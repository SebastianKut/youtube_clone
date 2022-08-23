import Tag from './Tag';
import { tags } from '../data';

function TagBar() {
  return (
    <ul className="h-12 px-6 border-y border-gray-300 flex items-center justify-between">
      {tags.map((tag, index) => {
        return <Tag key={index} tag={tag} />;
      })}
    </ul>
  );
}

export default TagBar;
