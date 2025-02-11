type ProductType = {
  title: string;
  urlImage: string;
  price: number;
};

function ProductItem(props: ProductType) {
  return (
    <>
      <h1>{props.title}</h1>
      <img width={200} src={props.urlImage} alt="" />
      <h4>$ {props.price}</h4>
      <button>Add to cart</button>
    </>
  );
}

function MyComponent() {
  const productList: ProductType[] = [
    {
      title: "Sản phẩm 1",
      urlImage:
        "https://atinproduction.com/wp-content/uploads/2021/07/AWP01220-scaled-1280x1920.jpg",
      price: 1000,
    },
    {
      title: "Sản phẩm 2",
      urlImage:
        "https://studiovietnam.com/wp-content/uploads/2022/08/background-chup-anh-san-pham-02.jpg",
      price: 2000,
    },
    {
      title: "Sản phẩm 3",
      urlImage:
        "https://lavenderstudio.com.vn/wp-content/uploads/2019/09/chup-hinh-san-pham-my-pham-spa-15-839x1024.jpg",
      price: 3000,
    },
  ];
  return (
    <>
      <h1>Element</h1>
      {productList.map((product: ProductType, index: number) => {
        return (
          <ProductItem
            key={index}
            title={product.title}
            urlImage={product.urlImage}
            price={product.price}
          />
        );
      })}
    </>
  );
}

export default MyComponent;
