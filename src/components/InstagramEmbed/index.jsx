import { useEffect } from "react";

const InstagramEmbed = ({ postUrl }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [postUrl]);

  return (
    <blockquote 
      className="instagram-media" 
      data-instgrm-permalink={postUrl} 
      data-instgrm-version="14"
    >
    </blockquote>
  );
};

export default InstagramEmbed;
