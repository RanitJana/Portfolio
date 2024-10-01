const handleShare = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
      console.log("Page shared successfully!");
    } catch (error) {
      console.error("Error sharing the page:", error);
    }
  } else {
    navigator.clipboard.writeText(url);
  }
};

export { handleShare };
