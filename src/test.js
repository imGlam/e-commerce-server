const productIdList = [1, 3];
const quantityList = [5, 10];

const items = [];
for (let i = 0; i < quantityList.length; i++) {
  items.push({
    productId: productIdList[i],
    quantity: quantityList[i],
  });
}

console.log(items);
