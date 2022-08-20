import { useState } from 'react';

function useRequest({ requestFunction, onSuccess, data }) {
  const [errors, setErrors] = useState(null);

  const sendRequest = async () => {
    try {
      setErrors(null);
      const response = await requestFunction(data);
      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (err) {
      console.log(err.response.data);
      setErrors(
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">Warning!</p>
          {err.response.data[0].errors.issues.map((issue, index) => (
            <p className="text-sm" key={index}>
              {issue.message}
            </p>
          ))}
        </div>
      );
    }
  };

  return { sendRequest, errors };
}

export default useRequest;
