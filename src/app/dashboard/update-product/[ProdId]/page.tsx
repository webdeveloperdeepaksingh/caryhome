"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "../../../../../utils/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Checkbox } from "@mui/material";
import Loading from "./Loading";
import { NextPage } from "next";

interface CatType  {
    _id?: string,
    catName: string,
    catImage?: string | null, 
}

interface IProdParams {
    params : {
        ProdId?: string;
    };
}

interface ProductType  {
    prodName: string;
    prodSlug?: string;
    prodTags?: any;
    prodCat: string;
    prodDesc?: any;
    prodPrice: number;
    prodColor: string[];
    prodImage:string[];
    prodBrand: string;
    prodReviews?: string[] | null;
 }

const UpdateProduct : NextPage <IProdParams> = ({params}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cat, setCat] = useState<CatType[] | null>([]);
    const [color, setColor] = useState<string[]>([]);
    const [inStock, setInStock] = useState<boolean>(false);
    const [image, setImage] = useState<File[] | null>(null);
    const [imgUrl, setImgUrl] = useState<string[]> ([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState<ProductType>(
        {
            prodName:'', 
            prodSlug:'',
            prodTags:'',
            prodCat:'',
            prodBrand:'',
            prodColor:[],
            prodPrice:0,
            prodDesc:'',
            prodImage:[],
            prodReviews:[]
          }
    );

    useEffect(()=>{
    async function fetchCatData(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/category`, {cache: "no-store"});

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            
            const catData = await res.json();
            setCat(catData.catList);
            console.log(cat);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchCatData();
    },[])

    useEffect(()=>{
    async function fetchProdData(){
    try 
        {
            const res = await fetch(`${BASE_API_URL}/api/product/${params.ProdId}`, {cache: "no-store"});

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            
            const prodData = await res.json();
            setData(prodData.productById);
            setImgUrl(prodData.productById.prodImage);
            setColor(prodData.productById.prodColor);
            setInStock(prodData.productById.inStock);
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally{
            setIsLoading(false);
        }
    }
    fetchProdData();
    },[])

    const handleInStock = () => {
        setInStock(!inStock);
    }

    const handleChange = (e: any): void => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };

    const handleSetColor = (data:string) => {
        if(color.includes(data)){
            setColor(color.filter((clr:any)=> clr != data));
        }
        else{
            setColor([...color, data]);
        }        
    }

    const handleImageUpload = async (e: any) => {
        e.preventDefault();
    
        if (!image || image.length === 0) {
            alert('No image selected.');
            return;
        }
    
        try {
            const imageUrlPromises = image.map(async (element) => {
                if (typeof element.type === 'string' && !element.type.startsWith('image/')) {
                    alert('Only image files (JPEG, JPG, PNG) are allowed.');
                    return null;
                } else if (element.size > 100000) { // in bytes
                    alert('Image size exceeds 100KB max limit.');
                    return null;
                }
    
                const formData = new FormData();
                formData.append('file', element);
                formData.append('upload_preset', 'carryhome_images');
                formData.append('cloud_name', 'dlnjktcii');
    
                const response = await fetch('https://api.cloudinary.com/v1_1/dlnjktcii/image/upload', {
                    method: 'PUT',
                    body: formData
                });
    
                const formDataResult = await response.json();
                return formDataResult.secure_url;
            });
    
            const uploadedImageUrls = await Promise.all(imageUrlPromises);
            const updatedUrls = [...imgUrl, ...uploadedImageUrls].filter((url) => url !== null);   
            setImgUrl(updatedUrls);
            toast.success('Image uploaded successfully!');
            
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Image uploading failed!');
        }
    };    

     async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
            return; // User canceled file selection
        }

        const files = event.target.files;
        setImage(Array.from(files));
    }

    const handleSubmit = async (e:any):Promise<void> => {
        e.preventDefault();
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
            return;
        }
        
        try 
        {
            const response = await fetch(`${BASE_API_URL}/api/product/${params.ProdId}`, {
                method: 'PUT',
                body: JSON.stringify(
                    { 
                        prodName:data.prodName, 
                        prodSlug:data.prodSlug,
                        prodTags:data.prodTags,
                        prodCat:data.prodCat,
                        prodBrand:data.prodBrand, 
                        inStock:inStock,
                        prodPrice:data.prodPrice,
                        prodColor:color,
                        prodDesc:data.prodDesc,
                        prodImage:imgUrl
                    }
                ),
            });
        
            const post = await response.json();
            console.log(post);
        
            if (post.success === false) {
                toast.error('Product updation failed!');
            } else {
                toast.success('Product updated successfully!');
                setData(
                    { 
                        ...data, 
                        prodName:'', 
                        prodSlug:'',
                        prodTags:'',
                        prodCat:'',
                        prodBrand:'', 
                        prodPrice:0,
                        prodDesc:'',
                        prodImage:[] 
                    }
                ); //clear the prev input data.
             }
             router.refresh();
        } catch (error) {
            toast.error('Product updation failed.');
        } 
    }

    const handleRemoveImage = async (imageUrl: string) => {
        if (imageUrl) {
            try {
                const parts = imageUrl.split('/'); // Split the URL by slashes ('/')
                const filename = parts.pop(); // Get the last part (filename)
                const public_id = filename?.split('.')[0]; // Split the filename by periods ('.') and get the first part
    
                if (!public_id) {
                    console.error('Invalid image URL:', imageUrl);
                    return;
                }
    
                const response = await fetch(`${BASE_API_URL}/api/removeimagefiles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ public_id }), // Send the file name to delete
                });
    
                const result = await response.json();
    
                if (result.success === false) {
                    toast.error(`${result.msg}`);
                } else {
                    setImgUrl((prevUrls) => prevUrls.filter((url) => url !== imageUrl));
                    toast.success(`${result.msg}`);
                }
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };
    

    if(isLoading){
        return<div>
            <Loading/>
        </div>
    }

    return ( 
        <div>
            <div className="flex flex-col w-full border-[1.5px] border-indigo-800 shadow-lg rounded-md p-9">
                <div className="text-center text-3xl bg-gray-200 mb-5 p-3 rounded-sm">
                    <h1 className="font-semibold">CREATE PRODUCT</h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Product Name:</label>
                        <input type="text" name="prodName" value={data.prodName} onChange={handleChange} className="inputBox" placeholder="Samsung - A32"></input>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Slug:</label>
                            <input type="text" name="prodSlug" value={data.prodSlug} onChange={handleChange} className="inputBox" placeholder="Samsung - A32"></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Tags:</label>
                            <input type="text" name="prodTags" value={data.prodTags} onChange={handleChange} className="inputBox" placeholder="Samsung - A32"></input>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">Category:</label>
                            <select name="prodCat" value={data.prodCat} onChange={handleChange} className="inputBox">
                                <option value="">--- Select ---</option>
                                {
                                    cat?.map((item:any)=>{
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
                        <label className="font-semibold">Color:</label>
                        <div className="grid grid-cols-4 inputBox">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={color?.includes('bg-red-600') || false}
                                    onChange = {()=>handleSetColor('bg-red-600')}
                                />
                                <div className="h-[20px] w-full bg-red-600 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={color?.includes('bg-indigo-800') || false}
                                    onChange={()=>handleSetColor('bg-indigo-800')}
                                />
                                <div className="h-[20px] w-full bg-indigo-800 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={color?.includes('bg-gray-300') || false}
                                    onChange={()=>handleSetColor('bg-gray-300')}
                                />
                                <div className="h-[20px] w-full bg-gray-300 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    checked={color?.includes('bg-black') || false}
                                    onChange={()=>handleSetColor('bg-black')}/>
                                <div className="h-[20px] w-full bg-black rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        {
                            imgUrl.map((item:any, index:any)=>{
                                return (    
                                    <div key={index} className="relative p-4 border-[1.5px] border-gray-500 rounded-md">
                                        <Image alt="prodImage" src={item} width={250} height={250}/>
                                        {item && (
                                            <button 
                                                type="button" 
                                                className="absolute btnRemove" 
                                                onClick={()=>handleRemoveImage(item)}
                                            >
                                                Remove
                                            </button>)
                                        }
                                    </div>
                                )
                            })
                        }                       
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Image: [Size:350*350]</label>
                        <div className="flex gap-1">
                            <input type="file"  className="inputBox w-full" accept='image/*' multiple={true}  onChange={handleFileUpload}></input>
                            <button type="button" className="btnRight" onClick={handleImageUpload}>Upload</button>
                        </div>
                    </div>
                    <div className="flex items-center inputBox p-4 max-w-[140px]">  
                        <Checkbox 
                            name="inStock" 
                            checked={inStock}
                            onChange={handleInStock}
                        />
                        <label className="font-semibold">inStock?</label>
                    </div>
                    {errorMessage && <p className='text-red-600 italic '>{errorMessage}</p>}
                    <div className="mt-2">
                        <button type="submit" className="btnLeft">SAVE</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
export default UpdateProduct;
