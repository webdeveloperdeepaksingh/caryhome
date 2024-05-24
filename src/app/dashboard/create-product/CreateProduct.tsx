"use client";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import toast from "react-hot-toast";
import { BASE_API_URL } from "../../../../utils/constant";
     
interface CreateProductProps {
    categoryList: CatType[];
}

type CatType = {
    _id:string,
    catName:string,
}

interface IProductType  {
    _id?:string;
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


const CreateProduct:React.FC<CreateProductProps> =  ({categoryList}) => {

    const [color, setColor] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inStock, setInStock] = useState<boolean>(false);
    const [image, setImage] = useState<File[] | null>(null);
    const [imgUrl, setImgUrl] = useState<string[]> ([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [data, setData] = useState<IProductType>(
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

    const handleImageUpload = async (e:any) => {
        e.preventDefault();
      
        if (image === null || image.length === 0) {
            alert('No image selected.');
            return;
        }

        let imageUrl:string[]=[];
        try
        {
            image?.forEach(async (element) => {
                if (typeof element.type === 'string' && !element.type.startsWith('image/')) {
                        alert('Only image files (JPEG, JPG, PNG ) are allowed.');
                    } else if (element.size > 100000) { //in bytes
                        alert('Image size exceeds 100KB max limit.');
                    }
                
                    const formData = new FormData();
                    formData.append('file', element);
                    formData.append('upload_preset', 'carryhome_images');
                    formData.append('cloud_name', 'dlnjktcii');

                        const response = await fetch('https://api.cloudinary.com/v1_1/dlnjktcii/image/upload', {
                            method: 'POST',
                            body: formData
                        });
                        const formDataResult = await response.json();
                        imageUrl.push(formDataResult.secure_url); 
                });  
                
                setImgUrl(imageUrl);
                data.prodImage=imageUrl;
                toast.success('Image uploaded successfully!');
        }
        catch (error) {
            console.error("Error uploading image: ", error);
            toast.error('Image uploading failed!');
        }
    }

    // components/FileUpload.tsx
    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
            return; // User canceled file selection
        }

        const files = event.target.files;
        setImage(Array.from(files));
    }

    const handleSubmit = async (e:any):Promise<void> => {
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
            const response = await fetch(`${BASE_API_URL}/api/product`, {
                method: 'POST',
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
                toast.success('Product created successfully!');
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
        } catch (error) {
            toast.error('Product creation failed.');
        } finally {
            setIsLoading(false);
          }
        };  
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
                        <label className="font-semibold">Color:</label>
                        <div className="grid grid-cols-4 inputBox">
                            <div className="flex items-center gap-2">
                                <Checkbox onClick={()=>handleSetColor('bg-red-600')}/>
                                <div className="h-[20px] w-full bg-red-600 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox onClick={()=>handleSetColor('bg-indigo-800')}/>
                                <div className="h-[20px] w-full bg-indigo-800 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox onClick={()=>handleSetColor('bg-gray-300')}/>
                                <div className="h-[20px] w-full bg-gray-300 rounded-sm"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox onClick={()=>handleSetColor('bg-black')}/>
                                <div className="h-[20px] w-full bg-black rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 my-3">
                        {
                            imgUrl.map((item:any, index:any)=>{
                                return (
                                    <div key={index} className="p-4 border-[1.5px] border-gray-500 rounded-md">
                                        <Image alt="prodImage" src={item} width={250} height={250}/>
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
                        <Checkbox name="inStock" onClick={handleInStock}/>
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
 
export default CreateProduct;