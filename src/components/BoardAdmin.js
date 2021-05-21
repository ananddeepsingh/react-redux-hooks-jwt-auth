import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';


import UserService from "../services/user.service";

const BoardAdmin = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");
  useEffect(() => {
    if (isAdmin) {
      UserService.getAdminBoard().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (
              error?.response?.data?.message) ||
            error.message ||
            error.toString();

          setContent(_content);
        }
      );
    }
  }, [isAdmin]);


  // if (!currentUser) {
  //   return <Redirect to="/profile" />;
  // }
  const renderRecords = () => {
    if (content?.data) {
      console.log(content.data)
      const records = content.data.map((item, i) => (
        <tr key={i}>
          <td><img src={item.avatar} alt="" /></td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          {/* <td><a href=mailto:${item.email}>{item.email}</a></td> */}
          <td>{item.email}</td>
        </tr>
      ));
      return (
        <table>
          <tbody>
            {
              records
            }
          </tbody>
        </table>
      )
    }
  }

  return (
    <div className="container">
      <header className="jumbotron">
        {isAdmin
          ? renderRecords()
          : <h1>Required Admin rights</h1>
        }
      </header>
    </div>
  );
};

export default BoardAdmin;
