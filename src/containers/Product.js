import React from "react";
import { Container, Label } from "semantic-ui-react";
import { Card, Button } from "antd";

class Product extends React.Component {
	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.id === nextProps.id) {
			return false;
		} else {
			return true;
		}
	};
	render() {
		const { Meta } = Card;
		return (
			<Container>
				<Card
					style={{ height: 520 }}
					title={this.props.title}
					hoverable
					cover={this.props.cover}
				>
					<Meta
						title={this.props.meta_title}
						description={this.props.description}
					/>
					<div style={{ marginTop: 5 }}>
						<Label tag size="large">
							#{this.props.price}
						</Label>
					</div>
					<div style={{ float: "right", marginTop: 5 }}>
						<Button
							type="primary"
							shape="round"
							icon={this.props.icon}
							onClick={this.props.handleAddToCart}
						>
							Add To Cart
						</Button>
					</div>
				</Card>
			</Container>
		);
	}
}

export default Product;
