import { Button, Stack, Switch, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { updateVideo } from '../api';
import { Video } from '../types';

function EditVideoForm({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  });

  const router = useRouter();
  type input = Parameters<typeof updateVideo>;

  const { mutate } = useMutation<Video, AxiosError, input[0]>(updateVideo, {
    onSuccess: () => {
      setOpened(false);
      router.replace('/');
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
