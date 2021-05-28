import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Pagination from "./Pagination";
import Posts from "./Posts";

const Home = () => {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);

  const indexOfLastPost = currentPage * postPerPage; //1 * 5 = 50
  const indexOfFirstPost = indexOfLastPost - postPerPage; // 50 - 10 = 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );

    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <header className="jumbotron">
        Welcome
      </header>
      <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
      <table className="table-bordered table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <Posts loading={loading} posts={currentPosts} />
        </tbody>
      </table>

    </div>
  );
};

export default Home;
