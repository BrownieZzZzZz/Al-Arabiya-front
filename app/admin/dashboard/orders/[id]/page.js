"use client";
import { useParams } from "next/navigation";


const page = () => {
  const param = useParams();
  const id = param.id;
  const [order, setOrder] = useState({
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
  });
  return <div>page</div>;
};

export default page;
