"use client";
import { FormEvent, useState } from "react";
import { Checkbox } from "@mui/material";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../../../../utils/constant";
import { useRouter } from "next/navigation";
 
interface UpdateProductProps {
    categoryList: CatType[];
    prodById:ProdType;
}

type CatType = {
    _id:string,
    catName:string,
}

export type ProdType = {
    _id?:string;
    prodName: string;
    prodSlug?: string;
    prodTags?: any;
    prodCat: string;
    prodDesc?: any;
    prodPrice: number;
    prodBrand: string;
    prodReviews: string[] | null;
    inStock:boolean;
    prodImage?: string[] | null;
}

const UpdateProduct:React.FC<UpdateProductProps> =  ({categoryList, prodById}) => {

    console.log(prodById);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState(
        {
            prodName: prodById.prodName, 
            prodSlug: prodById.prodSlug,
            prodTags: prodById.prodTags,
            prodCat: prodById.prodCat,
            prodBrand: prodById.prodBrand,
            inStock: prodById.inStock,
            prodPrice: prodById.prodPrice,
            prodDesc: prodById.prodDesc,
            prodImage: prodById.prodImage
        }
    );

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };


    const handleSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(''); // Clear the previous error
        let errMsg: string[] = [];
        
        if (!data.prodName.trim()) {
            errMsg.push('Product name is required.');
        }
        if (!data.prodPrice) {
            errMsg.push('Price is required.');
        }
        if (!data.prodCat.trim()) {
            errMsg.push('Category is required.');
        }
        if (!data.prodBrand.trim()) {
            errMsg.push('Brand is required.');
        }
        
        if (errMsg.length > 0) {
            setErrorMessage(errMsg.join(' || '));
            setIsLoading(false); // Set isLoading to false here
            return;
        }
        
        try 
        {
            const response = await fetch(`${BASE_API_URL}/api/product/${prodById._id}`, {
            method: 'PUT',
            body: JSON.stringify(
                { 
                    prodName:data.prodName, 
                    prodSlug:data.prodSlug,
                    prodTags:data.prodTags,
                    prodCat:data.prodCat,
                    prodBrand:data.prodBrand, 
                    inStock:data.inStock,
                    prodPrice:data.prodPrice,
                    prodDesc:data.prodDesc,
                    prodImage:data.prodImage 
                }
            ),
            });
        
            const post = await response.json();
            console.log(post);
        
            if (post.success === false) {
                if (Array.isArray(post.message)) {
                    setErrorMessage(post.message.join(' || '));
                } else {
                    setErrorMessage(post.message);
                }
            } else {
                toast.success('Product updated successfully!');
                router.push('/dashboard/products');
            }
        } catch (error) {
            toast.error('Product updation failed.');
        } finally {
            setIsLoading(false);
          }
        };  
    return ( 
        <div>
            <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-bold">UPDATE PRODUCT</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Product Name:</label>
                        <input type="text" name="prodName" value={data.prodName} onChange={handleChange} className="inputBox"></input>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Slug:</label>
                            <input type="text" name="prodSlug" value={data.prodSlug} onChange={handleChange} className="inputBox" ></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Tags:</label>
                            <input type="text" name="prodTags" value={data.prodTags} onChange={handleChange} className="inputBox" ></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Category:</label>
                            <select name="prodCat" value={data.prodCat} onChange={handleChange} className="inputBox">
                                <option value="">--- Select ---</option>
                                {
                                    categoryList.map((item:any)=>{
                                        return (
                                            <option value={item.catName} key={item._id}>
                                                {item.catName}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Brand:</label>
                            <input type="text" name="prodBrand" value={data.prodBrand} onChange={handleChange} className="inputBox" placeholder="Samsung"></input>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Price:</label>
                        <input type="number" name="prodPrice" value={data.prodPrice} onChange={handleChange} className="inputBox" placeholder="Numaric value"></input>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Description:</label>
                        <textarea  name="prodDesc" value={data.prodDesc} onChange={handleChange} className="inputBox" placeholder="Product description"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Image:</label>
                        <input type="file" className="inputBox" ></input>
                    </div>
                    <div className="flex items-center mb-2">  
                        <Checkbox name="inStock" value={data.inStock} onChange={handleChange}/>
                        <label className="font-semibold">inStock?</label>
                    </div>
                    {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                    <div className="mt-2">
                        <button type="submit" className="btnLeft">UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default UpdateProduct;