import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../dbConnect";
import Accounts from "../../../../models/Accounts";

export async function GET (req: NextRequest) {
try 
    {
      await dbConnect(); 
      const allRegistrations = await Accounts.find();
      const currentMonth = new Date().getMonth();
      const monthlyRegistrations = allRegistrations.filter((account) => {
        const registrationMonth = new Date(account.createdAt).getMonth();
        return registrationMonth === currentMonth;
      });
       return NextResponse.json({ count: monthlyRegistrations.length, success:true }, {status:200});
    } catch (error:any) {
        return new NextResponse("Error while fetching signupData: " + error, { status: 500 });
    }
  }
  