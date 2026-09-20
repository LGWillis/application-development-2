// Const and LetVariables
const businessName = "Luke's Cookies";
const cookiePrice = 3.00;
const isMonthlyFlavor = true;

let exampleCookiesSold = 0;
exampleCookiesSold = exampleCookiesSold + 10;
console.log(`Business Name: ${businessName}`);
console.log(`Example of total cookies sold: ${exampleCookiesSold}`);

// Data type conversion and type of
const cookieQuantityInput = "10";
const cookieQuantity = Number(cookieQuantityInput);
console.log(`Cookie quantity: ${cookieQuantity}`);
console.log(`Type of cookie quantity: ${typeof cookieQuantity}`);

// Conditionals
if (cookiePrice === 3.00) {
    console.log("This cookie is the standard price.");
} else {
    console.log("This cookie has a special price.");
}

if (isMonthlyFlavor === true) {
    console.log("This cookie is our monthly special flavor!");
} else {
    console.log("This is one of our regular cookies.");
}

// Function and uses
function orderTotal(price, quantity) {
    return price * quantity;
}

const exampleOrderOne = orderTotal(3, 10);
const exampleOrderTwo = orderTotal(4, 5);

console.log(`Example order one total: $${exampleOrderOne}`);
console.log(`Example order two total: $${exampleOrderTwo}`);

// Array
const cookieFlavors = [
    "Brown Butter Chocolate Chip",
    "Oatmeal Chocolate Chip",
    "Biscoff White Chocolate Chip",
    "White Chocolate Raspberry",
    "Peanut Butter Cup Cookie"
];

console.log(`One of our cookie flavors - ${cookieFlavors[1]}`);

// Loop through array
for (const flavor of cookieFlavors) {
    console.log(`Cookie Flavor - ${flavor}`);
}

// Object
const mainCookieFlavor = {
    name: "Brown Butter Chocolate Chip",
    price: 3.00,
    isMonthlyFlavor: false
};

console.log(`Main Cookie Flavor and Price - ${mainCookieFlavor.name}: $${mainCookieFlavor.price}`);
