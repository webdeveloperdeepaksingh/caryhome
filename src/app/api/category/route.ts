import Categories from "../../../../models/Categories"; 
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../dbConnect";
 
type CatType = {
  _id?: string;
  catName:string;
  catImage: string | null;
}

export async function GET(req:NextRequest){

  try {

    await dbConnect();
    const catList:CatType[] = await Categories.find();
    return NextResponse.json({ catList, success: true }, {status:200});

  } catch (error) {
    return new NextResponse("Error while fetching catData: " + error, {status:500});
  }
}

export async function POST(req: NextRequest) {

  try {

    await dbConnect();
    const { catName, catImage }: CatType = await req.json();

    const newCategory = new Categories({ catName, catImage });
    const savedCategory = await newCategory.save();

    return NextResponse.json({ savedCategory, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}
