export const detectPlatform = (url: string): 'youtube' | 'github' | 'unknown' => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }
  if (url.includes('github.com')) {
    return 'github';
  }
  return 'unknown';
};
