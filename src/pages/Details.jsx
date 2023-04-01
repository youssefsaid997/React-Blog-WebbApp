import { doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function Details({ setActive }) {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  console.log(id);
  const docRef = doc(db, "Blogs", id);
  console.log({ docRef });

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const blogDetail = await getDoc(docRef);
    console.log(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };
  console.log(blog);
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>
            {blog?.timestap.toDate().toDateString}
            <h2>{blog?.title}</h2>
          </span>
        </div>
      </div>

      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p>
              </span>
              <p className="text-start">{blog?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
