"use client";
import { NextPage } from "next";
import Container from "@/components/Container";
import ShoppingCart from "./ShoppingCart";


const Cart : NextPage = () => {

    return ( 
      <div className="pt-8">
        <Container>
              < ShoppingCart />
        </Container>
      </div> 
  );
}
 
export default Cart;