export const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
