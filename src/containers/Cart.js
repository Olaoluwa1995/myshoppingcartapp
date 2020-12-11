import React from "react";
import { Container, Icon, Label } from "semantic-ui-react";
import { Card } from "antd";

class Cart extends React.Component {
	render() {
		return (
			<Container>
				<Card
					style={{ height: 280 }}
					hoverable
					cover={
						<img
							src={this.props.image}
							alt="Item"
							style={{ width: 100, height: 100, marginTop: 5, marginLeft: 50 }}
						/>
					}
				>
					<p>{this.props.title}</p>

					<div style={{ marginBottom: 5 }}>
						<Label>
							Item price: <Label.Detail>#{this.props.price}</Label.Detail>
						</Label>
					</div>
					<div style={{ marginBottom: 5 }}>
						<Label>
							Total price: <Label.Detail>#{this.props.total}</Label.Detail>
						</Label>
					</div>
					<div style={{ marginBottom: 10 }}>
						<Icon
							name="minus"
							color="blue"
							style={{ cursor: "pointer", marginRight: 20 }}
							onClick={this.props.handleItemDecrement}
						/>
						Qty: {this.props.quantity}
						<Icon
							name="plus"
							color="yellow"
							style={{ cursor: "pointer", marginLeft: 20 }}
							onClick={this.props.handleItemIncrement}
						/>
						<Icon
							name="trash"
							color="red"
							style={{ cursor: "pointer", marginLeft: 20 }}
							onClick={this.props.handleRemoveItem}
						/>
					</div>
				</Card>
			</Container>
		);
	}
}

export default Cart;
