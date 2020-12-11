import React, { Fragment } from "react";
import axios from "axios";
import { Container, Message, Label, Icon } from "semantic-ui-react";
import _ from "lodash";
import { Row, Col, List, Spin, Alert, message, Modal, Button } from "antd";
import Cart from "./Cart";
import Product from "./Product";
import StripeCheckout from "react-stripe-checkout";

class ProductList extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			loading: false,
			error: null,
			data: [],
			cart: JSON.parse(localStorage.getItem("cart")) || [],
		};
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
		localStorage.setItem("cart", JSON.stringify(cart));
	};

	handleAddToCart = (productId) => {
		const { data, cart } = this.state;
		const product = data.find((el) => el.id === productId);
		const item = {
			id: cart.length + 1,
			title: product.title,
			price: product.price,
			quantity: 1,
			product,
			total: product.price,
		};
		if (this.handleCheck(productId) === false) {
			const { cart } = this.state;
			const array = cart.concat(item);
			this.setState({
				cart: array,
			});
			this.handleUpdateStorage(array);
			message.success("Item successfully added to cart!");
		} else {
			for (let item of cart) {
				if (item.product.id === productId) {
					item.quantity += 1;
					item.total = item.quantity * item.price;
				}
			}
			this.handleUpdateStorage(cart);
			message.success("Item quantity increased!");
		}
	};

	handleItemIncrement = (itemId) => {
		const { cart } = this.state;
		const item = cart.find((el) => el.id === itemId);
		if (item.quantity > 0) {
			item.quantity += 1;
			item.total = item.quantity * item.price;
		}
		this.setState({ cart });
		this.handleUpdateStorage(cart);
		message.success("Item quantity increased!");
	};

	handleItemDecrement = (itemId) => {
		const { cart } = this.state;
		const array = [...this.state.cart];
		const item = cart.find((el) => el.id === itemId);
		const index = array.indexOf(item);
		if (item.quantity > 1) {
			item.quantity -= 1;
			item.total = item.quantity * item.price;
			this.setState({ cart });
			this.handleUpdateStorage(cart);
			message.success("Item quantity decreased!");
		} else {
			array.splice(index, 1);
			this.setState({ cart: array });
			this.handleUpdateStorage(array);
			message.success("Item successfully removed!");
		}
	};

	handleRemoveItem = (itemId) => {
		const { cart } = this.state;
		const array = [...this.state.cart];
		const item = cart.find((el) => el.id === itemId);
		const index = array.indexOf(item);
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({
				cart: array,
			});
			this.handleUpdateStorage(array);
			message.success("Item successfully removed!");
		}
	};

	handleClearCart = () => {
		this.setState({
			cart: [],
		});
		localStorage.clear();
		message.success("Cart successfully cleared!");
	};

	handleCheck = (productId) => {
		return this.state.cart.some((item) => productId === item.product.id);
	};

	handleTruncateText = (str) => {
		return str.length > 100 ? str.substring(0, 100) + "..." : str;
	};

	handleTruncateTitle = (str) => {
		return str.length > 20 ? str.substring(0, 20) + "..." : str;
	};

	openCartModal = () => {
		this.setState({
			visible: true,
		});
	};

	closeCartModal = () => {
		this.setState({ visible: false });
	};

	onToken = (token) => {
		if (token !== null) {
			this.setState({
				cart: [],
			});
			localStorage.clear();
			message.success("Transaction completed!");
		} else {
			message.error("Transaction failed!");
		}
	};

	render() {
		const { data, error, loading, cart, visible } = this.state;

		let totalPrice = 0;
		for (let item of cart) {
			totalPrice += item.total;
		}

		const cartModal = (
			<Modal
				visible={visible}
				title="Cart Items"
				onCancel={this.closeCartModal}
				footer={[
					<Button
						disabled={cart.length > 0 ? false : true}
						key="clear"
						type="danger"
						shape="round"
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
					<div style={{ textAlign: "right", marginBottom: 5 }}>
						{cart.length > 0 && (
							<StripeCheckout
								amount={totalPrice * 100}
								billingAddress
								locale="auto"
								stripeKey="pk_test_51GunXnB9GEXVUU97tJYpFoKuErZZd3iDvY2zsY5bUNzEZHghZ3Dk52o3lLJJWpl34jXTjjFHs6VgU6soNtdrGZVo00h16scNWT"
								token={this.onToken}
							/>
						)}
					</div>
					<div style={{ marginLeft: 10, marginBottom: 10 }}>
						<Label color="brown" size="large">
							Total Amount: <Label.Detail>#{totalPrice}</Label.Detail>
						</Label>
					</div>
					<Row gutter={16}>
						{cart.map((item) => {
							return (
								<Col
									key={item.id}
									xs={24}
									sm={12}
									md={12}
									lg={12}
									xl={12}
									style={{ marginBottom: 10 }}
								>
									<Cart
										handleItemDecrement={() =>
											this.handleItemDecrement(item.id)
										}
										handleItemIncrement={() =>
											this.handleItemIncrement(item.id)
										}
										handleRemoveItem={() => this.handleRemoveItem(item.id)}
										key={item.id}
										id={item.id}
										title={
											<span
												style={{ overflow: "hidden", textOverflow: "ellipsis" }}
											>
												{this.handleTruncateTitle(item.title)}
											</span>
										}
										price={item.price}
										quantity={item.quantity}
										total={item.total}
										description={item.product.description}
										category={item.product.category}
										image={item.product.image}
									/>
								</Col>
							);
						})}
					</Row>
				</Fragment>
			</Modal>
		);

		return (
			<Container>
				<div style={{ marginBottom: 20, textAlign: "right" }}>
					<Button shape="round" onClick={this.openCartModal}>
						<Icon name="cart" />
						<Label color="yellow" floating>
							{cart.length > 0 ? cart.length : 0}
						</Label>
					</Button>
				</div>
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
					grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }}
					dataSource={data}
					pagination={{ pageSize: 6 }}
					renderItem={(product) => (
						<List.Item key={product.id}>
							<Product
								title={_.upperCase(product.category)}
								cover={
									<img src={product.image} style={{ height: 250 }} alt="" />
								}
								meta_title={product.title}
								description={
									<span
										style={{ overflow: "hidden", textOverflow: "ellipsis" }}
									>
										{this.handleTruncateText(product.description)}
									</span>
								}
								price={product.price}
								icon={<Icon name="cart plus" />}
								handleAddToCart={() => this.handleAddToCart(product.id)}
							/>
						</List.Item>
					)}
				/>
			</Container>
		);
	}
}

export default ProductList;
