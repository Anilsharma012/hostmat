import React from 'react';

/**
 * Reusable component for embedding iframes with proper security and error handling
 * Ensures all iframes have consistent sandbox, allow, and other required attributes
 */
const IframeEmbed = ({
  src,
  title,
  width = '100%',
  height = '400px',
  allowFullScreen = true,
  className = '',
  style = {},
  frameBorder = '0',
  allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  sandbox = 'allow-same-origin allow-scripts allow-popups allow-forms allow-presentation',
  referrerPolicy = 'no-referrer-when-downgrade',
  loading = 'lazy',
  onError = null,
  onLoad = null,
}) => {
  const handleError = (e) => {
    console.error(`Iframe load error for ${title}:`, e);
    if (onError) onError(e);
  };

  const handleLoad = (e) => {
    console.log(`Iframe loaded successfully: ${title}`);
    if (onLoad) onLoad(e);
  };

  return (
    <iframe
      src={src}
      title={title || 'Embedded content'}
      width={width}
      height={height}
      frameBorder={frameBorder}
      allow={allow}
      allowFullScreen={allowFullScreen}
      sandbox={sandbox}
      referrerPolicy={referrerPolicy}
      loading={loading}
      className={className}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

export default IframeEmbed;
