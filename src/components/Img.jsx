/**
 * Responsywny obrazek: przeglądarka sama wybiera najmniejszy plik WebP,
 * który wystarczy dla danego ekranu (srcset + sizes).
 */
export default function Img({
  img,
  alt,
  sizes = "100vw",
  className = "",
  loading = "lazy",
  fetchPriority,
  ...rest
}) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={loading}
      decoding={loading === "eager" ? undefined : "async"}
      fetchPriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
}
