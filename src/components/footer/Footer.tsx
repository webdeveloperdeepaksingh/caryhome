"use client";
import { MdFacebook } from "react-icons/md";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-indigo-800 text-white mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                  <h3 className="uppercase text-xl font-bold">About us</h3>
                  <p className="justify-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime error eius id neque voluptate inventore vel cumque illum suscipit voluptatum at dolores quod.?
                  </p>
                </FooterList>
                <FooterList>
                  <h3 className="uppercase text-xl font-bold">Shop Categories</h3>
                  <Link href="/#">Mobiles</Link>
                  <Link href="/#">Laptops</Link>
                  <Link href="/#">Desktops</Link>
                  <Link href="/#">Tablets</Link>
                  <Link href="/#">Refregerators</Link>
                </FooterList>
                <FooterList>
                  <h3 className="uppercase text-xl font-bold">Customer Service</h3>
                  <Link href="/#">Contact Us</Link>
                  <Link href="/#">Shipping Policy</Link>
                  <Link href="/#">Exchange & Return</Link>
                  <Link href="/#">Privacy Policy</Link>
                  <Link href="/#">FAQs</Link>
                </FooterList>
                <FooterList>
                  <h3 className="uppercase text-xl font-bold">Follow Us</h3>
                  <div className="flex gap-2">
                    <Link href="/#"><MdFacebook size={24}/></Link>
                    <Link href="/#"><AiFillTwitterCircle size={24}/></Link>
                    <Link href="/#"><AiFillInstagram size={24}/></Link>
                    <Link href="/#"><AiFillYoutube size={24}/></Link>
                  </div>
                </FooterList>
            </div>
        </Container>  
        <div className="h-[20] bg-white p-2 text-center text-xs font-bold text-indigo-800">
            <p>&copy; {new Date().getFullYear()} CarryHome , All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
