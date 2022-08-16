import { Button, Stack, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { updateVideo } from '../api';
import { useVideoContext } from '../context/videos';
import { Video } from '../types';

function EditVideoForm({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = useVideoContext();

  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  });

  type input = Parameters<typeof updateVideo>;

  const { mutate } = useMutation<Video, AxiosError, input[0]>(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      refetch();
    },
  });

  return (
    <form onSubmit={onSubmit((values) => mutate({ videoId, ...values }))}>
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="My video"
          {...getInputProps('title')}
        />
        <TextInput
          label="Description"
          required
          {...getInputProps('description')}
        />
        <Switch label="Published" {...getInputProps('published')} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

export default EditVideoForm;
