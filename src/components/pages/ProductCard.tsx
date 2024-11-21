"use client"
import Image from "next/image";
import React from "react";

interface ProductCardProps {
 
  image: string;
  name: string;
  price:number,
  description: string;
  onClick?:()=>any
}
export function ProductCard({ image, name, description, price , onClick}: ProductCardProps) {
  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden group border-2 border-primary-800">
      <a className="block" href="#">
        <Image
          alt="Product 1"
          loading="lazy"
          width="300"
          height="300"
          decoding="async"
          data-nimg="1"
          className="w-full h-72 object-cover group-hover:opacity-80 transition-opacity"
          style={{
            color: "transparent",
            aspectRatio: 300 / 300,
            objectFit: "cover",
          }}
          src={image}
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          <a
            className="hover:text-primary"
            href="#"
          >
            {name}
          </a>
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{description} </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Ksh. {Math.round(price)}</span>
          <button onClick={onClick} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
