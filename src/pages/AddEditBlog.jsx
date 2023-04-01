import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../firebase";
import {toast} from 'react-toastify'

const initialState = {
  title: "",
  description: "",
};

export default function AddEditBlog({ user, setActive }) {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { title, description } = form || {};
  const { id } = useParams();
  const navigate = useNavigate();

  let imgUrl = "";
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress} %`);
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setForm((perv) => ({ ...perv, imgUrl: url }));
            console.log(url);
            imgUrl = url;
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "Blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log({ form });
  console.log({ imgUrl });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && file) {
      if (!id) {
        try {
          await addDoc(collection(db, "Blogs"), {
            ...form,
            timestap: serverTimestamp(),
            author: user?.displayName,
            userID: user?.uid,
          });
          toast.success('Blog created')
        } catch (error) {
          console.log(error);
        }
      }else{
        try {
          await updateDoc(doc(db,"Blogs",id), {
            ...form,
            timestap: serverTimestamp(),
            author: user?.displayName,
            userID: user?.uid,
          });
          toast.success('Blog updated')

        } catch (error) {
          console.log(error);
        }

      }
    }else{
      toast.error('please fill all fields')
    }
    navigate("/");
    console.log({ form });
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center py-2 heading">
            {id ? "Update Blog" : "Create Blog"}
          </div>
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="blog-form row" onSubmit={handleSubmit}>
                <div className="col-12 py-3">
                  <input
                    type="text"
                    className="form-control input-text-box"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <textarea
                    name="description"
                    className="form-control description-box"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    disabled={
                      progress !== null &&
                      progress < 100 &&
                      title &&
                      description
                    }
                  />
                </div>

                <div className="col-12 py-3 text-center">
                  <button className="btn btn-add" type="submit">
                    {id ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
