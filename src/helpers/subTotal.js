class Fee {
  
}

class SubTotal {
  getOrder() {
    fetch("http://localhost:4000/orders/get/007")
      .then((res) => res.json())
      .then((res) => console.log(res.products))
      .catch((err) => console.error(err));
  }
}

const total = new SubTotal();
total.getOrder();
