import { useState } from 'react';
import { uploadVideo } from '../api';
import useRequest from '../hooks/useRequest';
import FormData from 'form-data';
import EditForm from './EditForm';

function SubmitModal() {
  const [showUploadForm, setshowUploadForm] = useState(false);
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
    <>
      <button
        onClick={() => setshowUploadForm(true)}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Upload video
      </button>
      {showUploadForm && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Add your video</div>

            {progress === 0 && (
              <form onSubmit={handleUpload}>
                <input
                  onChange={(e) => setVideo(e.target.files[0])}
                  type="file"
                  name="video"
                  accept=".mp4"
                />
                <button type="submit">Upload</button>
              </form>
            )}

            {progress > 0 && (
              <p>
                {progress === 100
                  ? 'Video uploaded'
                  : `Loading progress: ${progress}%`}
              </p>
            )}
            {showEditForm && (
              <EditForm
                videoId={videoId}
                setShowEditForm={setShowEditForm}
                setShowUploadForm={setshowUploadForm}
                setProgress={setProgress}
              />
            )}

            {errors}
          </div>
        </div>
      )}
    </>
  );
}

export default SubmitModal;
