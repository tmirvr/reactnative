import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import React from "react"
import { useState } from "react";
import "./blog.css"
import { blog } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useEffect } from "react";
export const Card = ({ listing, id, onEdit, onDelete }) => {

  const [list, setList] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('')

  const params = useParams();
  useEffect(() => {
    if(listing.description.length>180)
  setSummary(listing.description.slice(0, 180) + '...')
  else
    setSummary(listing.description)
    async function fetchListing() {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setList(docSnap.data()); 
        setLoading(false);
      const q = doc(db, "users", docSnap.data().userRef);
      const docSnap1 = await getDoc(q);
      if (docSnap1.exists())
      setUser(docSnap1.data().name)

      }

    }

    fetchListing();
  }, [params.listingId]);
  return (
    <>
 
            <div className='box boxItems' key={id}>
              <div className='img'>
             <Link to={`/category/blogs/${id}`} className='link'>
                <img src={listing.imgUrls[0]} alt='' />
                    </Link>
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#Medicine</a>
                </div>
                <Link to={`/category/blogs/${id}`} className='link'>
                  <h3>{listing.name}</h3>
                </Link>
                <p>{summary}</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{user}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''></label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
              </div>
            </div>
     
    </>
  )
}

