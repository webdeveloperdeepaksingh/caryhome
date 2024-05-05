export const formatPrice = (amt:number) => {
    return new  Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
    }).format(amt);
};

 
 