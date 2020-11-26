import React from "react";
import { Layout, Menu } from "antd";

const { Content, Header } = Layout;
class CustomLayout extends React.Component {

	render() {
		return (
			<Layout>
				<Header
					className="header"
					style={{ position: "fixed", zIndex: 1, width: "100%" }}
				>
					<Menu theme="dark" mode="horizontal" style={{ float: "left" }}>
						<Menu.Item key="1">MyShoppingCart</Menu.Item>
					</Menu>
				</Header>
				<Layout>
					<Content style={{ marginTop: 80 }}>
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
