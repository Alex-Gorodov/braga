import { Beer } from "../types/beer";

const imgUrl = process.env.PUBLIC_URL;

console.log(imgUrl);


export const beers: Beer[] = [
  {
    name: "Juicy bomb NEIPA",
    style: "neipa",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, soluta!",
    categories: ["Fruity", "Hoppy", "Bitter"],
    price: 14,
    img: imgUrl + '/img/bottles/neipa.png',
  },
  {
    name: "Hey mango IPA",
    style: "ipa",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    categories: ["Fruity", "Hoppy", "Bitter"],
    price: 13,
    img: imgUrl + '/img/bottles/ipa.png',
  },
  {
    name: "Therapist’s breakfast",
    style: "stout",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laudantium corrupti, rerum iusto doloribus quas voluptate?",
    categories: ["Coffee", "Chocolate", "Bread"],
    price: 11,
    img: imgUrl + '/img/bottles/stout.png',
  },
  {
    name: "Witbier",
    style: "Wheat beer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore laudantium corrupti.",
    categories: ["Wheat", "Citrusy", "Herbal", "Spicy"],
    price: 12,
    img: imgUrl + '/img/bottles/wheat.png',
  },
  {
    name: "Desert vagabond",
    style: "Light lager",
    description: "Lorem ipsum, fishing deepsum",
    categories: ["Malty", "Hoppy"],
    price: 11,
    img: imgUrl + '/img/bottles/lager.png',
  },
  {
    name: "Bounty injection",
    style: "Porter",
    description: "Coconut sweet porter",
    categories: ["Coconut", "Chocolate", "Vanilla"],
    price: 14,
    img: imgUrl + '/img/bottles/porter.png',
  }
]
