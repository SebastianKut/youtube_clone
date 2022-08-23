import { useState } from 'react';
import { updateVideo } from '../api';
import useRequest from '../hooks/useRequest';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context/Context';

function EditForm({ videoId, setShowEditForm, setProgress }) {
  const { dispatch } = useGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published: false,
  });

  const { sendRequest, errors } = useRequest({
    requestFunction: updateVideo,
    data: { videoId, ...formData },
    onSuccess: () => {
      setShowEditForm(false);
      setProgress(0);
      dispatch({
        type: 'SHOW_UPLOAD_FORM',
        payload: false,
      });
      router.push(`/watch/${videoId}`);
    },
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Description"
        >
          Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Description"
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="published"
        >
          Publish?
        </label>
        <input
          className="shadow  border border-red-500 rounded p-3"
          id="published"
          type="checkbox"
          value={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: !formData.published })
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Post video
        </button>
      </div>
      {errors}
    </form>
  );
}

export default EditForm;
