export const getApiBase = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'https://codedstore.onrender.com';
  const normalizedUrl = url.replace(/\/+$/, '');
  return normalizedUrl.endsWith('/api') ? normalizedUrl.slice(0, -4) : normalizedUrl;
};
