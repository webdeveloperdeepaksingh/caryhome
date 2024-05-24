"use client";
import moment from "moment";
import Cookies from "js-cookie";
import { Rating } from "@mui/material";
import Avatar from "@/components/Avatar";
import Heading from "@/components/Heading";

interface ListRatingProps{
    prodById: any;
 }

const ListRating : React.FC<ListRatingProps> = ({prodById}) => {

    const loggedInUser = {
        result:
        {
            _id:Cookies.get("loggedInUserId"),
            usrRole:Cookies.get("loggedInUserRole"),
        }
    }; 

    if(prodById.prodReviews.length === 0 || loggedInUser.result._id) return null;
    
    return (
        <div>
            <Heading title="Product Review"/>
            <div className="text-sm mt-2 p-6">
                {
                    prodById.prodReviews && prodById.prodReviews.map((review:any) =>{
                        return (
                            <div key={review.userId} className="max-w-[300px]">
                                <div className="flex gap-2 items-center pt-2">
                                    <div><Avatar/></div>
                                    <div className="font-semibold">{review.usrName}</div>
                                    <div>{moment(review.createdAt).fromNow()}</div>
                                </div>
                                <div className="pt-2">
                                    <Rating value={review.rating} readOnly/>
                                </div>
                                <div className="border-b-2 py-2">
                                    {review.comment}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ListRating;