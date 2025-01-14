import '@/components/skeleton_image_loader/index.scss';

function SkeletonImageLoader({ width = '100%', height = '100%' }) {
  return (
    <div
      className="skeleton-image-loader"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export default SkeletonImageLoader;
