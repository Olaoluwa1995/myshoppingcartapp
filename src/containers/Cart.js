import React from "react";
import {
  Container,
  Icon,
  Label,
} from "semantic-ui-react";
import { Button, Card} from "antd";


class Cart extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: false,
        error: null,
        id: this.props.id,
      };

    this.itemIncrement = this.itemIncrement.bind(this);
    this.itemDecrement = this.itemDecrement.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }


  removeItem = () => {
    this.props.handleRemoveItem(this.state.id);
  }

  itemDecrement = () => {
    this.props.handleItemDecrement(this.state.id);
  }

  itemIncrement = () => {
    this.props.handleItemIncrement(this.state.id);
  }

  render() {

    return (
      <Container>
        <Card
        style={{ width: 300, margin: 10, marginLeft: 60, height: 250}}
        hoverable
        cover={<img src={this.props.image} alt="Item" style={{ width: 100, height: 80, marginTop: 5, marginLeft: 20 }} />}
        >
          <p>{this.props.title}</p>
          <div style={{paddingTop: 0}}>
          <Icon
            name="minus"
            color="red"
            style={{ cursor: "pointer", marginRight: 20 }}
            onClick={this.itemDecrement}
          />
          Qty: {this.props.quantity}
          <Icon
            name="plus"
            color="yellow"
            style={{ cursor: "pointer", marginLeft: 20 }}
            onClick={this.itemIncrement}
          />  
          </div>  
          <Label>Item price: <Label.Detail>#{this.props.price}</Label.Detail></Label>
          <Label>Total price: <Label.Detail>#{this.props.total}</Label.Detail></Label> 
          <Button
              type="danger"
              shape="round"
              onClick={this.removeItem}
              style={{float: "right"}}
            >
              Delete
          </Button>       
        </Card>
      </Container>
    );
  }
}

export default Cart;
