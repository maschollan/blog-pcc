import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = (url, titleHeader) => {
  document.title = titleHeader;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    // setTimeout(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(url);
        const posts = response.data;
        setPosts(posts);
      } catch (err) {
        err.message = "gagal mengambil data dari API";
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    // }, 300);
  }, [url]);

  return { posts, isLoading, isError, titleHeader };
};

export default useAxios;
