export const extractDomain = (url) => {
    const match = url.match(/^(https?:\/\/)?(www\.)?([^\/]+)/);
    const domain = match ? match[3] : url;
    return domain.length > 8 ? `${domain.slice(0, 8)}...` : domain;
  };