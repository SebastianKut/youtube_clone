function Tag({ tag }) {
  return (
    <li className="bg-gray-100 border border-gray-300 rounded-2xl p-2">
      <p className="text-xs font-semibold">{tag}</p>
    </li>
  );
}

export default Tag;
