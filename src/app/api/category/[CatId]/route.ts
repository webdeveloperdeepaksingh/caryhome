import { NextResponse, NextRequest } from "next/server";
import Categories from "../../../../../models/Categories";
import dbConnect from "../../../../../dbConnect";

type reqData = {
    catName:string,
    catImage:string | null
}

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
    
    const { catName, catImage }: reqData = await req.json();
    const catById = await Categories.findByIdAndUpdate(params.CatId, {catName, catImage}, {runValidators:true});

    if(!catById){
      return NextResponse.json({ message: "No category found with the given id." }, { status: 404 });
    }
  
    return NextResponse.json({ catById, success: true }, {status:200});

  } catch (error) {
    if (error instanceof Error) {
      // TypeScript now knows 'error' is an Error instance
      return NextResponse.json({ success: false, message: error.message }, {status:400});
    } else {
      return new NextResponse("Error while updating catData: " + error);
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

  } catch (error) {
    if (error instanceof Error) {
      // TypeScript now knows 'error' is an Error instance
      return NextResponse.json({ success: false, message: error.message }, {status:400});
    } else {
      return new NextResponse("Error while deleting catData: " + error);
    }
  }
}