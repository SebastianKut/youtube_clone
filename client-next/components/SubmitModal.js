import { useState } from 'react';
import { uploadVideo } from '../api';
import useRequest from '../hooks/useRequest';
import FormData from 'form-data';
import EditForm from './EditForm';
import { CloudUploadIcon } from '@heroicons/react/outline';

function SubmitModal() {
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [videoId, setVideoId] = useState('');

  const config = {
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  // this is SSR so FormData has to be imported from npm, on the client its available globaly
  const formData = new FormData();

  const { sendRequest, errors } = useRequest({
    requestFunction: uploadVideo,
    data: { formData, config },
    onSuccess: (data) => {
      setShowEditForm(true);
      setVideoId(data.videoId);
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    formData.append('video', video);
    sendRequest();
  };

  return (
    <div className="absolute top-100 right-36 z-50 bg-white">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="p-6">
          <div className=" text-xl mb-2 border-b pb-2 w-96">
            Upload your video
          </div>

          {progress === 0 && (
            <form
              onSubmit={handleUpload}
              className="flex flex-col items-center justify-between h-80 pt-2"
            >
              <input
                onChange={(e) => setVideo(e.target.files[0])}
                type="file"
                name="video"
                accept=".mp4"
              />
              <div className="flex justify-center items-center border border-blue-600 bg-blue-600 hover:bg-blue-500  hover:border-none w-full p-2">
                <button
                  type="submit"
                  className="flex justify-center items-center h-full w-full text-sm text-white"
                >
                  <CloudUploadIcon className="h-6 mr-2" />
                  <p className="uppercase">Upload</p>
                </button>
              </div>
            </form>
          )}

          {progress > 0 && (
            <div className="h-10 bg-slate-300 ">
              <div
                className="bg-blue-600 h-full whitespace-nowrap flex items-center"
                style={{ width: progress + '%' }}
              >
                <p className="text-white ml-4">
                  {progress === 100
                    ? 'Video uploaded'
                    : `Loading progress: ${progress}%`}
                </p>
              </div>
            </div>
          )}

          {showEditForm && (
            <EditForm
              videoId={videoId}
              setShowEditForm={setShowEditForm}
              setProgress={setProgress}
            />
          )}
          {errors}
        </div>
      </div>
    </div>
  );
}
export default SubmitModal;
