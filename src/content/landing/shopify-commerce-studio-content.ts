import type { ShopifyReferenceArtwork } from "@/interfaces/shopify-reference-artwork-interface";
const crop = (x:number,y:number,w:number,h:number) => `/store-studio/showcase/atelier-commerce-studio.webp#art=${x},${y},${w},${h}`;
export const commerceStudioArtwork: ShopifyReferenceArtwork = {
  palette:{accent:"#064ce0",ink:"#15171a",surface:"#ffffff",soft:"#f3f6fb"},
  hero:crop(47,19.5,53,14.5),
  products:[
    {name:"Tailored Blazer",price:179,collection:"Blazers",src:crop(20,45.5,12.7,6.5),description:"Bold blue tailoring with a modern silhouette."},
    {name:"Silk Slip Dress",price:119,collection:"Dresses",src:crop(34.8,45.5,12.7,6.5),description:"A considered evening silhouette in classic black."},
    {name:"Cashmere Knit Jumper",price:149,collection:"Knitwear",src:crop(49.7,45.5,12.7,6.5),description:"A soft neutral knit for everyday layering."},
    {name:"Wool Overcoat",price:249,collection:"Outerwear",src:crop(64,45.5,12.7,6.5),description:"Clean lines and a longer shape for cooler days."},
    {name:"Leather Sneakers",price:79,collection:"Shoes",src:crop(20,58.2,12.7,6.5),description:"Minimal white sneakers to finish your everyday look."},
    {name:"Leather Tote Bag",price:199,collection:"Bags",src:crop(34.8,58.2,12.7,6.5),description:"An understated black tote for your daily essentials."},
    {name:"Straight Leg Jeans",price:89,collection:"Jeans",src:crop(49.7,58.2,12.7,6.5),description:"Classic blue denim with an easy straight-leg shape."},
    {name:"Aviator Sunglasses",price:79,collection:"Accessories",src:crop(64,58.2,12.7,6.5),description:"A timeless finishing touch with a clean metal frame."},
  ],
};
export const commerceStudioCopy = {
 brand:"ATELIER", announcement:"Free shipping on orders over $100 · 30-day returns · Shop now, pay later with Klarna.",
 nav:["Women","Men","New In","Collections","Sale","About"], search:"Search for styles, brands, or categories…", account:"Account", wishlist:"Wishlist", bag:"Bag", menu:"Browse departments", close:"Close", all:"All", shopClothing:"Shop Clothing",
 departments:["New In","Clothing","Dresses","Tops & Blouses","Knitwear","Outerwear","Jeans","Trousers","Skirts","Shoes","Bags","Accessories","Jewellery","Beauty"],
 megaImages:[crop(22.5,5.6,14.3,4.2),crop(38.2,5.6,14.3,4.2),crop(53.9,5.6,14.3,4.2),crop(22.5,12.2,14.3,4.2),crop(38.2,12.2,14.3,4.2),crop(53.9,12.2,14.3,4.2)],
 megaItems:["Blazers","Dresses","Knitwear","Jeans","Tops & Blouses","Outerwear"], megaPrices:[129,89,69,79,59,149],
 promotionImage:crop(86,4.7,10,13.5),promotionTitle:"Timeless pieces. Modern lives.",promotionBody:"Discover our curated edit of wardrobe essentials.",shopCollection:"Shop the collection",from:"From",
 eyebrow:"THE NEW SEASON",headline:"New season.\nNew rules.",intro:"Elevated tailoring. Modern silhouettes. Bold colour. Discover the collection that redefines your wardrobe.",shopWomen:"Shop Women",shopMen:"Shop Men",categories:"Shop by Category",viewAll:"View all",categoryNames:["Women","Men","Dresses","Tops","Jeans","Shoes","Bags","Accessories"],categoryProducts:[0,3,1,2,6,4,5,7],
 filters:"Filter & Sort",clear:"Clear all",size:"Size",colour:"Colour",price:"Price",products:"products",sort:"Sort by",sortOptions:[{value:"featured",label:"Featured"},{value:"low",label:"Price: Low to high"},{value:"high",label:"Price: High to low"}],sizes:["XS","S","M","L","XL"],colourNames:["Blue","Black","Cream","White"],colourValues:["#064ce0","#111111","#e8dfd1","#ffffff"],
 // Variants are illustrative but deterministic: filters and quick-shop use the same values.
 productSizes:[["S","M","L"],["XS","S","M"],["S","M","L","XL"],["M","L","XL"],["S","M","L"],["M"],["XS","S","M","L"],["M"]],productColours:["Blue","Black","Cream","Black","White","Black","Blue","Black"],
 new:"New",sale:"−20%",quick:"Quick shop",save:"Save",saved:"Saved",empty:"No pieces match your filters.",add:"Add to bag",added:"Added to your bag",viewBag:"View bag",quantity:"Quantity",chooseSize:"Choose a size",productDetails:"Product details",sample:"Interactive design sample",sampleReviews:"Example customer reviews",
 rewardsTitle:"ATELIER+",rewardsSubtitle:"Member Rewards",rewardsBody:"Earn points. Unlock exclusive perks.",available:"Example points balance",points:"2,480",tier:"520 points to Silver tier",rewards:"View rewards",rewardsDetails:"This is a sample rewards dashboard. Your store’s loyalty programme is configured around your business.",rewardsBenefits:[{title:"Birthday gift",body:"100 points"},{title:"Exclusive access",body:"VIP events & drops"},{title:"Early access",body:"New collections"},{title:"Free shipping",body:"Member benefits"}],
 reviewsTitle:"What our members say",reviews:[{name:"Sophie L.",text:"The quality is incredible and the fit is perfect. I’ve already ordered again!"},{name:"James T.",text:"Beautiful packaging and a great selection. An easy shopping experience."},{name:"Amelia R.",text:"Elegant, timeless pieces. A new favourite for everyday style."}],
 recent:"Recently viewed",recentEmpty:"Explore the collection",appTitle:"Get the ATELIER app",appBody:"Shop faster, get exclusive offers, manage your orders and earn rewards — all in one place.",appImage:crop(5.3,87.9,8.4,5),appButton:"Explore app benefits",appBenefits:["Exclusive app offers","Track orders","Faster checkout","Member rewards"],appNote:"App integration is an example. Availability is confirmed within your project scope.",
 newsletter:"Join our newsletter",newsletterBody:"Be the first to know about new arrivals, exclusive offers and more.",email:"Your email address",subscribe:"Subscribe",subscribed:"You’re on the sample list. No email has been sent.",footerIntro:"A complete commerce studio.",footerGroups:[{title:"Shop",links:["Women","Men","New In","Sale","Collections"]},{title:"Customer Care",links:["Help & FAQs","Shipping","Returns","Size Guide","Contact Us"]},{title:"About",links:["Our Story","Sustainability","Careers","Press","Stores"]}],footerNote:"Example store information. We customise these details for your business.",copyright:"© 2025 ATELIER. All rights reserved.",legal:["Privacy Policy","Terms & Conditions","Cookies"],
};
