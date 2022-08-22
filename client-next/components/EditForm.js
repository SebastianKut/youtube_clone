import { useState } from 'react';
import { updateVideo } from '../api';
import useRequest from '../hooks/useRequest';
import { useRouter } from 'next/router';

function EditForm({
  videoId,
  setShowEditForm,
  setShowUploadForm,
  setProgress,
}) {
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
      setShowUploadForm(false);
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
          placeholder="title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="Description"
        >
          Description
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="Description"
          type="text"
          placeholder="******************"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="published"
        >
          Publish video
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
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Dont have an account? - Register
        </a>
      </div>
      {errors}
    </form>
  );
}

export default EditForm;
