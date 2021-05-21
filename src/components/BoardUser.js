import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);
  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");

  useEffect(() => {
    if (isAdmin) {
      UserService.getUserBoard().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    }
  }, [isAdmin]);

  if (!currentUser) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {
          isAdmin
            ? <h3>{content}</h3>
            : "You are not Allowed"
        }
      </header>
    </div>
  );
};

export default BoardUser;
