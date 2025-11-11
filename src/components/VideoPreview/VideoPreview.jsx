import React from "react";
import "./VideoPreview.css";

function extractYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "");
    }
    // youtube.com/embed/<id>
    if (u.pathname.startsWith("/embed/")) {
      return u.pathname.split("/")[2];
    }
    // youtube.com/watch?v=<id>
    const vid = u.searchParams.get("v");
    if (vid) return vid;
  } catch {}
  // fallback: attempt regex
  const m = url.match(/[\/?&](?:v=|embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

const VideoPreview = ({
  embedUrl,
  title = "Video",
  className = "",
  openInNewTab = true,
}) => {
  const id = extractYouTubeId(embedUrl);
  const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
  const watchUrl = id ? `https://www.youtube.com/watch?v=${id}` : embedUrl;

  const handleActivate = () => {
    if (openInNewTab) {
      window.open(watchUrl, "_blank", "noopener,noreferrer");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      className={`vp-preview ${className}`}
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={onKeyDown}
      aria-label={`Play ${title}`}
      title={title}
    >
      <img src={thumb} alt={title} className="vp-thumb" loading="lazy" />
      <div className="vp-overlay">
        <span className="vp-play-icon">▶</span>
      </div>
    </div>
  );
};

export default VideoPreview;
