import React, {Fragment} from "react";
import axios from "axios";
import { Container, Message, Label, Icon } from "semantic-ui-react";
import _ from "lodash";
import { List, Card, Spin, Alert, message, Modal, Button } from "antd";
import Cart from "./Cart";
import StripeCheckout from 'react-stripe-checkout';

class ProductList extends React.Component {
  constructor() {
    super();
      this.state = {
        visible: false,
        loading: false,
        error: null,
        data: [],
        cart: JSON.parse(localStorage.getItem('cart')) || []
      };

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleItemIncrement = this.handleItemIncrement.bind(this);
    this.handleItemDecrement = this.handleItemDecrement.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTruncateText = this.handleTruncateText.bind(this);
    this.handleUpdateStorage = this.handleUpdateStorage.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => {
        this.setState({ data: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: err, loading: false });
      });
  }

  handleUpdateStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  handleAddToCart = (productId) => {
    const {data, cart} = this.state;
    const product = data.find(el => el.id === productId);
    const item = {
      id: cart.length + 1,
      title: product.title,
      price: product.price,
      quantity: 1,
      product,
      total: product.price
    };
    if (this.handleCheck(productId) === false) {
      const {cart} = this.state;
      const array = cart.concat(item);
      this.setState({
        cart: array
      });
      this.handleUpdateStorage(array);
      message.success("Item successfully added to cart!");
    }
    else{
      for (let item of cart) {
        if (item.product.id === productId) {
          item.quantity += 1;
          item.total = item.quantity * item.price;
        }
      }
      this.handleUpdateStorage(cart);
      message.success("Item quantity increased!");
    }
  }

  handleItemIncrement = (itemId) => {
    const { cart} = this.state;
    const item = cart.find(el => el.id === itemId);
    if (item.quantity > 0) {
        item.quantity += 1;
        item.total = item.quantity * item.price;
    }
    this.setState({ cart });
    this.handleUpdateStorage(cart);
    message.success("Item quantity increased!");

  }

  handleItemDecrement = (itemId) => {
    const { cart} = this.state;
    const array = [...this.state.cart];
    const item = cart.find(el => el.id === itemId);
    const index = array.indexOf(item);
    if (item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.quantity * item.price;
        this.setState({ cart });
        this.handleUpdateStorage(cart);
        message.success("Item quantity decreased!");
    }
    else {
      array.splice(index, 1);
      this.setState({ cart: array });
      this.handleUpdateStorage(array);
      message.success("Item successfully removed!");
    }
  }

  handleRemoveItem = (itemId) => {
    const { cart} = this.state;
    const array = [...this.state.cart];
    const item = cart.find(el => el.id === itemId);
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({
        cart: array
    });
    this.handleUpdateStorage(array);
    message.success("Item successfully removed!");
    }
  }

  handleClearCart = () => {
    this.setState({
      cart: []
    });  
    localStorage.clear();
    message.success("Cart successfully cleared!");
  }

  handleCheck = (productId) => {
    return this.state.cart.some(item => productId === item.product.id);
  }

  handleTruncateText = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  }

  openCartModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeCartModal = () => {
    this.setState({ visible: false });
  };

  onToken = (token, addresses) => {
    if (token !== null) {
      this.setState({
        cart: []
      });  
      localStorage.clear();
      message.success("Transaction completed!");
    }
    else{
      message.error("Transaction failed!");
    }
  };

  render() {
    const { data, error, loading, cart, visible } = this.state;
    const { Meta } = Card;

    let totalPrice = 0;
    for ( let item of cart) {
      totalPrice += item.total;
    }

    const cartModal = (
      <Modal
        visible={visible}
        title="Cart Items"
        onCancel={this.closeCartModal}
        footer={[
          <Button
            disabled={ cart.length > 0 ? false : true }
            key="clear"
            type="danger"
            shape="round"
            icon={<Icon name="trash alternate" />}
            onClick={this.handleClearCart}
          >
            Clear cart
          </Button>,   
          <Button
            key="back"
            onClick={this.closeCartModal}
            shape="round"
            size="middle"
          >
            Go Back
          </Button>,
        ]}
      >
        <Fragment>
          <div style={{ marginLeft: 60, marginBottom: 5}}>
            Total Amount: <Label size="large">#{totalPrice}</Label>
            
            {cart.length > 0 && 
              <StripeCheckout
                amount={totalPrice * 100}
                billingAddress
                locale="auto"
                stripeKey="pk_test_51GunXnB9GEXVUU97tJYpFoKuErZZd3iDvY2zsY5bUNzEZHghZ3Dk52o3lLJJWpl34jXTjjFHs6VgU6soNtdrGZVo00h16scNWT"
                token={this.onToken}
              />
            }
          </div>
        {cart.map((item) => {
          return (
            <Cart 
              handleItemDecrement={this.handleItemDecrement}
              handleItemIncrement={this.handleItemIncrement}
              handleRemoveItem={this.handleRemoveItem}
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              total={item.total}
              description={item.product.description}
              category={item.product.category}
              image={item.product.image}
            />
          )
        })}
        </Fragment>
      </Modal>
    );


    return (
      <Container>
        <Button
            shape="round"
            onClick={this.openCartModal}
            style={{ marginBottom: 20}}
          >
            <Icon name="cart" />
            <Label color="yellow" floating>{cart.length > 0 ? cart.length : 0 }</Label>
        </Button>
        {cartModal}
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <div className="example">
            <Spin size="large" tip="Loading...">
              <Alert
                message="Products Loading!"
                description="Wait for few moments. It's coming up!"
                type="info"
              />
            </Spin>
          </div>
        )}
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
          dataSource={data}
          pagination={{ pageSize: 6 }}
          renderItem={(product) => (
            <List.Item key={product.id}>
              <Card
                style={{ height: 500, width: 350 }}
                title={_.upperCase(product.category)}
                hoverable
                cover={<img src={product.image} style={{ height: 250 }} alt="" />}
              >
                <Meta
                  title={product.title}
                  description={<span style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                    {this.handleTruncateText(product.description)}
                  </span>}
                />
                <div style={{ marginTop: 5 }}>
                  <Label tag size="large">
                    #{product.price}
                  </Label>
                </div>
                <div style={{ float: "right", marginTop: 5 }}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<Icon name="cart plus" />}
                  onClick={() => this.handleAddToCart(product.id)}
                >
                  Add To Cart
                </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Container>
    );
  }
}

export default ProductList;
