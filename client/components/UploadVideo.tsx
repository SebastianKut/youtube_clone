import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/hooks';
import { AxiosError } from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { ArrowBigUpLine } from 'tabler-icons-react';
import { updateVideo, uploadVideo } from '../api';
import { useVideoContext } from '../context/videos';
import { Video } from '../types';
import EditVideoForm from './EditVideoForm';

function UploadVideo() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutate, data } = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  const upload = (files: File[]) => {
    const formData = new FormData();
    formData.append('video', files[0]);
    mutate({ formData, config });
  };

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => {
              upload(files);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {(status) => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  direction="column"
                  style={{
                    minHeight: '50vh',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to find</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}

        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}

        {data && <EditVideoForm videoId={data.videoId} setOpened={setOpened} />}
      </Modal>

      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
