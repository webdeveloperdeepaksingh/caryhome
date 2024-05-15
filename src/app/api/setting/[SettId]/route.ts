import { NextRequest, NextResponse } from "next/server";
import Settings from "../../../../../models/Settings";
import dbConnect from "../../../../../dbConnect";

type SettingType = {
    _id?:string;
    webTitle?: string;
    webTags?: string[];
    metaData?: string;
}

interface ISettingParams{
  SettId?: string;
}

export async function GET(req:NextRequest, {params} : {params:ISettingParams}){

    try {
  
      await dbConnect();
      const settingData = await Settings.findById(params.SettId);
      return NextResponse.json({ settingData, success: true }, {status:200});
  
    } catch (error) {
      return new NextResponse("Error while fetching prodData: " + error, {status:500});
    }
  }
  
export async function PUT(req: NextRequest, {params}:{params:ISettingParams}) {
  
try 
  {

    await dbConnect();

    const { webTitle, webTags, metaData }: SettingType = await req.json();
    const updateSetting = await Settings.findByIdAndUpdate(params.SettId, { webTitle, webTags, metaData })
    return NextResponse.json({ updateSetting, success: true }, {status:200});

  } catch (error:any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val:any) => val.message);
      return NextResponse.json({ success: false, msg: messages }, {status:400});
    }else{
      return new NextResponse ("Error while saving data: " + error, {status: 400});
    }
  }
}