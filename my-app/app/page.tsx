'use client';
import { useEffect, useState } from "react";

const url = "https://devsapihub.com/api-ecommerce"

async function getProducts() {
    try {
        const response = await fetch(
            url,{
                method: 'GET',
            }
        )

        return await response.json()

    } catch (error) {
        console.log(error);
        
    }
}

type sizeList = | 'X' | 'L' | 'Xl' | 'XXL'

interface currency {
  id: string;
  format: string;
}

interface product {
  id: number;
  title: string;
  description:  string;
  style: string;
  img: string;
  sizeList: sizeList[];
  price: number
  currency: currency
  installments: number
  isFreeShipping: boolean;
}

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, CircleDollarSign, ListSortAscending, ListSortDescending } from 'lucide-react';

import './globals.css'

type sorting = | 'descending' | 'ascending'

export default function Home() {

  const [products, setProducts] = useState<product [] | null>(null)
  const [sorting, setSorting] = useState<sorting>('descending');

  const sortProducts = () => {
    if(sorting === 'descending'){
      setSorting('ascending')
      return;
    }

    setSorting('descending');
  }

  useEffect(() => {

    if(!products) return;

    const array = [...products!]
    if(sorting === 'descending'){
      const sorted = array.sort((a,b) => a.price - b.price);
      setProducts(sorted)
      return;
    }
    const sorted = array.sort((a,b) => b.price - a.price);
    setProducts(sorted)
  }, [sorting])

  useEffect( () => {

    if(products) return;

    (async () => {
      const response = await getProducts();
      
      setProducts(response);
      
    })();
  }, []);

  return (
    <div className="py-18 px-12">
      <div className="flex justify-end">
        <Button 
          onClick={sortProducts}
        >
          {
            sorting == 'descending' ?
            <ListSortDescending />
            :
            <ListSortAscending />
          }
          Ordenar de forma {sorting == 'descending' ? 'ascendente' : 'descendente'} 
        </Button>
      </div>


      <div className="grid grid-cols-4 gap-4 p-12">
        { 
          products && products.length > 0 &&
          products?.map(product => (
            <Card key={product.id} className="bg-stone-200">
              <CardHeader className="bg-stone-50">
                <img src={product.img} alt={product.title} className="mx-auto"/>
              </CardHeader>
              <CardTitle className="flex items-center justify-between px-4 bg-stone-200">
                <p className="text-xl font-bold">{product.title}</p>
                <p className="bg-white p-2 rounded-full">{product.currency.format}{product.price}</p>
              </CardTitle>
              <CardContent className="">
                <p className="text-lg">{product.style}</p>
                <p className="text-lg">{product.description}</p>
                <p className="font-semibold">Tallas disponibles</p>
                {
                  product.sizeList.map(size => (<span key={product.id + size} className="mx-2">{size}</span>))
                }
              </CardContent>
              <CardFooter className="bg-stone-200 flex justify-end gap-2">
                <Button variant={"secondary"}>
                  <ShoppingCart />
                  Agregar a carrito
                </Button>
                <Button>
                  <CircleDollarSign />
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  
  );
}
