"use client";
import DashSearch from "@/components/DashSearch/DashSearch";
import "./page.css";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formattedDate } from "@/lib/utils";

const page = () => {
  const [orderState, setOrderState] = useState(1);
  const [orders, setOrders] = useState([
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Accepted",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Cancelled",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Accepted",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Cancelled",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Accepted",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Cancelled",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Accepted",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Cancelled",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Accepted",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Cancelled",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
    {
      id: "5a0de12b-33ba-413c-98cf-35e82a4255f9",
      state: "Waiting to get Accepted...",
      created_At: "2024-12-30T21:42:35.210Z",
      first_name: "jawhar",
      last_name: "hmidis",
      phone: "+21650974080",
      email: "jawharhmidi01@gmail.com",
      city: "mannouba",
      address: "medneine, Lessifr",
      deliveryPrice: 0,
      type: "delivery",
      order_Products: [
        {
          id: "b3e78bf8-d013-4a96-9ee2-67836919aff6",
          quantity: 2,
          price: 80,
          product: {
            id: "77733c30-be54-48c7-8963-71d3c4621c70",
            name: "زيت الأرغان للعناية بالشعر",
            description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
            img: [
              "/images/product2.jpg",
              "/images/product1.jpg",
              "/images/product2.jpg",
              "/images/product3.jpg",
              "/images/product4.jpg",
              "/images/product5.jpg",
              "/images/product6.jpg",
            ],
            onSold: false,
            soldPercentage: 0,
            normalSinglePrice: 80,
            soldSinglePrice: 80,
            normalMultiPrice: 200,
            soldMultiPrice: 200,
            in_Stock: true,
            created_At: "2024-12-27T23:17:08.320Z",
          },
        },
      ],
    },
  ]);
  const [sortDate, setSortDate] = useState(false);

  const parseButton = (state) => {
    if (state === "Waiting to get Accepted...")
      return (
        <button className="w-[100px] rounded-md bg-blue-500/25 py-1.5 font-medium text-blue-500">
          قيد الانتظار
        </button>
      );
    if (state === "Accepted")
      return (
        <button className="w-[100px] rounded-md bg-green-500/25 py-1.5 font-medium text-green-500">
          تم القبول
        </button>
      );
    if (state === "Cancelled")
      return (
        <button className="w-[100px] rounded-md bg-red-500/25 py-1.5 font-medium text-red-500">
          تم الالغاء
        </button>
      );
  };
  return (
    <div className="table-scroll flex w-full flex-col gap-10 overflow-x-auto px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="بحث عن طلب " />

      <div className="flex w-full max-w-[500px] items-center justify-between gap-4 overflow-x-auto rounded-lg bg-[var(--dash-theme2)] px-1 py-2 sm:gap-1">
        <div
          onClick={() => setOrderState(1)}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === 1 && "bg-gray-500/50",
          )}
        >
          كل الطلبات
        </div>
        <div
          onClick={() => setOrderState(2)}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === 2 && "bg-gray-500/50",
          )}
        >
          تم القبول
        </div>
        <div
          onClick={() => setOrderState(3)}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === 3 && "bg-gray-500/50",
          )}
        >
          قيد الانتظار
        </div>
        <div
          onClick={() => setOrderState(4)}
          className={cn(
            "w-full text-nowrap rounded-xl bg-transparent px-2 py-2 text-center text-lg font-medium text-white transition-all duration-200 hover:cursor-pointer",
            orderState === 4 && "bg-gray-500/50",
          )}
        >
          تم الالغاء
        </div>
      </div>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="border-[#2c2d33] hover:bg-muted/10">
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              معرف
            </TableHead>
            <TableHead className="flex flex-row items-center justify-start gap-2 text-lg text-[var(--dash-theme5)]">
              <span>تاريخ الطلب</span>
              <i
                className={cn(
                  "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                )}
              ></i>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              الاسم
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              اللقب
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              رقم الهاتف
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              البريد الالكتروني
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              الولاية
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              العنوان
            </TableHead>
            <TableHead className="flex flex-row items-center justify-start gap-2 text-lg text-[var(--dash-theme5)]">
              <span>المنتجات</span>
              <i
                className={cn(
                  "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                )}
              ></i>
            </TableHead>

            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              الحالة
            </TableHead>
            <TableHead className="flex flex-row items-center justify-start gap-2 text-lg text-[var(--dash-theme5)]">
              <span>المبلغ</span>
              <i
                className={cn(
                  "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                )}
              ></i>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              onClick={() => window.open(`/admin/dashboard/orders/${order.id}`)}
              key={index}
              className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
            >
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell className="font-medium">
                {formattedDate(order.created_At)}
              </TableCell>
              <TableCell className="font-medium">{order.first_name}</TableCell>
              <TableCell className="font-medium">{order.last_name}</TableCell>
              <TableCell className="font-medium">{order.phone}</TableCell>
              <TableCell className="font-medium">{order.email}</TableCell>
              <TableCell className="font-medium">{order.city}</TableCell>
              <TableCell className="font-medium">{order.address}</TableCell>
              <TableCell className="font-medium">
                {order.order_Products.length}
              </TableCell>
              <TableCell className="font-medium">
                {parseButton(order.state)}
              </TableCell>
              <TableCell className="text-end text-lg font-bold text-neutral-200">
                {order.order_Products.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0,
                ) +
                  order.deliveryPrice +
                  "DT"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
