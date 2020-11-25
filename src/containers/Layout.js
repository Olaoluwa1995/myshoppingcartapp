import React from "react";
import { Layout, Menu } from "antd";

const { Content, Header } = Layout;
class CustomLayout extends React.Component {
  state = {
    collapsed: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <Header
          className="header"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <Menu theme="dark" mode="horizontal" style={{ float: "left" }}>
            <Menu.Item key="1">
              MyShoppingCart
            </Menu.Item>
          </Menu>

            <React.Fragment>
              <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
                <Menu.Item>
                  {/* <Dropdown
                    icon="cart"
                    loading={loading}
                    text={`${cart !== null ? cart.order_items.length : 0}`}
                    pointing
                    className="link item"
                  >
                    <Dropdown.Menu>
                      {cart !== null ? (
                        <React.Fragment>
                          {cart.order_items.map((order_item) => {
                            return (
                              <Dropdown.Item key={order_item.id}>
                                {order_item.quantity} x {order_item.item.title}
                              </Dropdown.Item>
                            );
                          })}
                          {cart.order_items.length < 1 ? (
                            <Dropdown.Item>No items in your cart</Dropdown.Item>
                          ) : null}
                          <Dropdown.Divider />

                          <Dropdown.Item
                            icon="arrow right"
                            text="Checkout"
                            onClick={() =>
                              this.props.history.push("/order-summary")
                            }
                          />
                        </React.Fragment>
                      ) : (
                        <Dropdown.Item>No items in your cart</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown> */}
                </Menu.Item>
              </Menu>
            </React.Fragment>
        </Header>
          <Layout>
            <Content style={{ margin: "24px 16px 0", marginTop: 80 }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                {this.props.children}
              </div>
            </Content>
          </Layout>
      </Layout>
    );
  }
}


export default CustomLayout;
