import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


import "./details/details.css"
import "../components/header/header.css"
import img from "../assets/images/b5.jpg"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"

import { blog } from "../assets/data/data"

export default function Listing() {

  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data()); 
        setLoading(false);
        const date = docSnap.data().timestamp?.toDate()


    setDate((new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date)))
      const q = doc(db, "users", docSnap.data().userRef);
      const docSnap1 = await getDoc(q);
      if (docSnap1.exists())
      setUser(docSnap1.data().name)

      }

    }

    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <section className='singlePage'>

          <div className='container'>
    
            <div className='left'>
                  <img
          className="h-[20px] object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
        />
            </div>
            <div className='right'>
              <div className='buttons'>
        
              </div>
              <h1>     - {listing.name}</h1>
          
              <p> {listing.description}</p>
              <p>Author:  {user} on {date}</p>
            </div>
          </div>
        </section>
  );
}
