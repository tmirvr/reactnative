import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function ListingItem({ listing, id, onEdit, onDelete }) {

console.log(listing.address)
  
    const {  title, category, img, published, description ,author } = 'asdas';
const date = listing.timestamp?.toDate()
const string = (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(date));
    return (
     <Link className="contents" to={`/category/${listing.type}/${id}`}>
           <div className="">
            <div className="image">
                <a>  <img
          className="h-[350px] w-[500px] p-10 "
          loading="lazy"
        src={listing.imgUrls[0]}
        /></a>
            </div>


            <div className="info flex justify-center flex-col py-4">
        
                <div className="title">
                   <a className="text-xl font-bold text-gray-800 hover:text-gray-600">{title || "Title"}</a>
                </div>
                <p className="text-gray-500 py-3">
{listing.description.substring(0,400) || "description"}
                </p>
                
            </div>
        </div>
           </Link>
    )
}
