import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const POST = async (req:NextRequest, res:NextResponse) => {
try 
{
    const { public_id } = await req.json();
 
    if (!public_id) {
        return NextResponse.json({ msg: 'No image found', success: false });
    }

    const result = await cloudinary.uploader.destroy(public_id, {
        invalidate: true,
        resource_type: "image"
    });
    
    return NextResponse.json({ msg: 'Image removed successfully', success: true }, { status: 200 });

} catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while removing data: " + error, {status: 500});
    }
  }
};