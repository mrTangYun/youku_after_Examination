import React, { Component } from 'react';
import Page0 from './page-0';
import PageHomePage from './page-homepage';
class App extends Component {
	state = {
		hideHomepage: false
	};
	clickStartHandler = () => {
		this.setState({
			hideHomepage: true
		});
	};
	render() {
		if (this.state.hideHomepage) {
			return <Page0 />;
		}
		return (
			<PageHomePage onClick={this.clickStartHandler} />
		);
	}
}

export default App;