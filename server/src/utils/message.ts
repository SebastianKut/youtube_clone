type ServerMessage = {
  type: string;
  errors: {
    issues: [
      {
        message: string;
      }
    ];
  };
};

export const message = (message: string): ServerMessage[] => {
  return [
    {
      type: 'Server',
      errors: { issues: [{ message: message }] },
    },
  ];
};
