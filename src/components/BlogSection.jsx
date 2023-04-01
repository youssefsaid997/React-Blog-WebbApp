import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FontAwesome from "react-fontawesome";

export default function Blogsection({ blogs, user, handleDelete }) {
  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  const userId = user?.uid;
  console.log(userId);
  console.log({ user });
  console.log(blogs);
  return (
    <>
      {blogs.map((blog) => (
        <div className="row pb-5 box-shadow" key={blog.id}>
          <div className="col-md-4">
            <div className="hover-blogs-img">
              <div className="blogs-img">
                <img src={blog.imgUrl} alt={blog.title} />
                <div></div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="text-start">
              <h4 className="title py-2">{blog.title}</h4>
              <span className="meta-info">
                <p className="author">{blog.author} </p>
                <p>{blog.timestap.toDate().toDateString()}</p>
              </span>
            </div>
            <div className="short-description ">
              {truncate(blog.description, 90)}
            </div>
            <Link to={`/details/${blog.id}`}>
              <button className="btn btn-read">Read more</button>
            </Link>

            {user && blog.userID === user?.uid && (
              <div style={{ float: "right" }}>
                <FontAwesome
                  name="trash"
                  style={{ margin: "0.9rem", cursor: "pointer" }}
                  size="2x"
                  onClick={() => handleDelete(blog.id)}
                />
                <Link to={`/update/${blog.id}`}>
                  <FontAwesome
                    name="edit"
                    style={{ margin: "0.9rem", cursor: "pointer" }}
                    size="2x"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* {blogs.map((blog) => (
        <div className="container mb-3">
            <div className="w-75">
              <Card className="mb=3">
                <Card.Img
                  variant="top"
                  src={blog.imgUrl}
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{truncate(blog.description, 100)}</Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
          </div>
        </div>
      ))} */}
    </>
  );
}
