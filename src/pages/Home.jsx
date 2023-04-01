import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import {toast} from 'react-toastify'

export default function Home({setActive ,user}) {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  console.log({user});
  

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false)
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsub();
    };
  },[]);

  if(loading){
    return (
      <div className="container">
        <Spinner />

      </div>
    )
  }

  const handleDelete = async (id) => {
    if(window.confirm("Do you want to delete this blog?")){
      try {
        setLoading(true)
        await deleteDoc(doc(db,"Blogs",id));
        toast.success('Blog is deleted successfully')
      } catch (err) {
        console.log(err);
      }
      setLoading(false)

    }
  }

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <h2>Blogs</h2>
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete}/>
        </div>
      
    </div>
  );
}
