import p1_img from "./Assets/p1.png";
import p2_img from "./Assets/p2.png";
import p3_img from "./Assets/p3.png";
import p4_img from "./Assets/p4.png";
import p5_img from "./Assets/p5.png";
import p6_img from "./Assets/p6.png";
import p7_img from "./Assets/p7.png";
import p8_img from "./Assets/p8.png";
import p9_img from "./Assets/p9.png";
import p10_img from "./Assets/p10.png";
import p11_img from "./Assets/p11.png";
import p12_img from "./Assets/p12.png";

let all_Product = [
    {
      "id": 1,
      "name": "Running Shoes",
      "category": "Shoes",
      "price": 4999,
      "available": "46",
      "image": p1_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 10 },
        { "color": "Red", "size": "Medium", "stock": 15 },
        { "color": "White", "size": "Small", "stock": 12 },
        { "color": "White", "size": "Medium", "stock": 8 }
      ]
    },
    {
      "id": 2,
      "name": "Sports Shoes",
      "category": "Shoes",
      "price": 3999,
      "available": "50",
      "image": p2_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 20 },
        { "color": "Red", "size": "Medium", "stock": 30 },
        { "color": "White", "size": "Small", "stock": 25 },
        { "color": "White", "size": "Medium", "stock": 15 }
      ]
    },
    {
      "id": 3,
      "name": "Casual Shoes",
      "category": "Shoes",
      "price": 2999,
      "available": "100",
      "image": p3_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 40 },
        { "color": "Red", "size": "Medium", "stock": 60 },
        { "color": "White", "size": "Small", "stock": 30 },
        { "color": "White", "size": "Medium", "stock": 50 }
      ]
    },
    {
      "id": 4,
      "name": "Sport Sneakers",
      "category": "Shoes",
      "price": 3999,
      "available": "80",
      "image": p4_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 25 },
        { "color": "Red", "size": "Medium", "stock": 35 },
        { "color": "White", "size": "Small", "stock": 20 },
        { "color": "White", "size": "Medium", "stock": 30 }
      ]
    },
    {
      "id": 5,
      "name": "Training Shoes",
      "category": "Shoes",
      "price": 5999,
      "available": "55",
      "image": p5_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 15 },
        { "color": "Red", "size": "Medium", "stock": 25 },
        { "color": "White", "size": "Small", "stock": 18 },
        { "color": "White", "size": "Medium", "stock": 22 }
      ]
    },
    {
      "id": 6,
      "name": "Outdoor Shoes",
      "category": "Shoes",
      "price": 7999,
      "available": "70",
      "image": p6_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 20 },
        { "color": "Red", "size": "Medium", "stock": 30 },
        { "color": "White", "size": "Small", "stock": 15 },
        { "color": "White", "size": "Medium", "stock": 25 }
      ]
    },
    {
      "id": 7,
      "name": "Sneakers",
      "category": "Shoes",
      "price": 3499,
      "available": "120",
      "image": p7_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 45 },
        { "color": "Red", "size": "Medium", "stock": 50 },
        { "color": "White", "size": "Small", "stock": 35 },
        { "color": "White", "size": "Medium", "stock": 55 }
      ]
    },
    {
      "id": 8,
      "name": "Running Sneakers",
      "category": "Shoes",
      "price": 3999,
      "available": "90",
      "image": p8_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 30 },
        { "color": "Red", "size": "Medium", "stock": 40 },
        { "color": "White", "size": "Small", "stock": 25 },
        { "color": "White", "size": "Medium", "stock": 45 }
      ]
    },
    {
      "id": 9,
      "name": "Sport Running Shoes",
      "category": "Shoes",
      "price": 5999,
      "available": "80",
      "image": p9_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 25 },
        { "color": "Red", "size": "Medium", "stock": 35 },
        { "color": "White", "size": "Small", "stock": 30 },
        { "color": "White", "size": "Medium", "stock": 40 }
      ]
    },
    {
      "id": 10,
      "name": "Athletic Shoes",
      "category": "Shoes",
      "price": 4999,
      "available": "75",
      "image": p10_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 20 },
        { "color": "Red", "size": "Medium", "stock": 30 },
        { "color": "White", "size": "Small", "stock": 15 },
        { "color": "White", "size": "Medium", "stock": 30 }
      ]
    },
    {
      "id": 11,
      "name": "Travel Shoes",
      "category": "Shoes",
      "price": 6999,
      "available": "50",
      "image": p11_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 18 },
        { "color": "Red", "size": "Medium", "stock": 22 },
        { "color": "White", "size": "Small", "stock": 14 },
        { "color": "White", "size": "Medium", "stock": 16 }
      ]
    },
    {
      "id": 12,
      "name": "Trekking Shoes",
      "category": "Shoes",
      "price": 7999,
      "available": "60",
      "image": p12_img,
      "variants": [
        { "color": "Red", "size": "Small", "stock": 20 },
        { "color": "Red", "size": "Medium", "stock": 30 },
        { "color": "White", "size": "Small", "stock": 25 },
        { "color": "White", "size": "Medium", "stock": 35 }
      ]
    }
  ];
  
export default all_Product
