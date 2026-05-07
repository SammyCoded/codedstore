export const getApiBase = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://codedstore.onrender.com';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};
