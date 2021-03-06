import axios from 'axios';

export async function newQuote() {
  const instance = axios.create({
    baseURL: 'https://api.quotable.io/',
  });
  let quote;
  try {
    quote = await instance.get('random');
   
  }
  catch (e) {
    console.log(`Something went wrong when fetching new quote: ${e}`);
    quote = {
      _id:"9rSuCtK9CCZk",
      tags:["famous-quotes"],
      content:"Formula for success: under promise and over deliver.",
      author:"Tom Peters",
      authorSlug:"tom-peters",
      length:52,
      fetched: false, // tells that this is the default quote
    }
  }
  finally {
  console.log(quote);
    return quote;
  }
}

export function randomColor() {
  let red, green, blue;
  red = Math.floor(Math.random() * (190 - 100 + 1)) + 10;
  green = Math.floor(Math.random() * (195 - 100 + 1)) + 100;
  blue = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  return `rgba(${red}, ${green}, ${blue}, ${Math.random() * (1 - 0.45) + 0.45})`;
}
