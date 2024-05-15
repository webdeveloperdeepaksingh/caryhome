import { NextResponse, NextRequest } from "next/server";
import Categories from "../../../../../models/Categories";
import { CatType } from "@/components/categories/CategoryItems";
import dbConnect from "../../../../../dbConnect";

interface ICatParams{
    CatId?: string;
}

export async function GET(req:NextRequest, {params}:{params:ICatParams}){

    try {
  
      await dbConnect();
      const catById = await Categories.findById(params.CatId);

      if(!catById){
        return NextResponse.json({ message: "No category found with the given id." }, { status: 404 });
      }
      return NextResponse.json({ catById, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching catData: " + error, {status:500});
    }
  }

export async function PUT(req: NextRequest, {params}:{params:ICatParams}) {

  try 
  {
    await dbConnect();
    
    const { catName, catImage }: CatType = await req.json();
    const catById = await Categories.findByIdAndUpdate(params.CatId, {catName, catImage}, {runValidators:true});

    if(!catById){
      return NextResponse.json({ message: "No category found with the given id." }, { status: 404 });
    }
  
    return NextResponse.json({ catById, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}

export async function DELETE(req: NextRequest, {params}:{params:ICatParams}):Promise<NextResponse> {

  try 
  {
    await dbConnect();
    const catToDelete = await Categories.findByIdAndDelete(params.CatId);

    if(!catToDelete){
      return NextResponse.json({ message: "No category found with the given id." }, { status: 404 });
    }

    return NextResponse.json({ catToDelete, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}