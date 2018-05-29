import React, { Component } from 'react';
import Page0 from './page-0';
import PageShare from './page-share';
import PageHomePage from './page-homepage';
class App extends Component {
	state = {
		showHomepage: true,
		showSharePage: false,
	};
	clickStartHandler = () => {
		this.setState({
			showHomepage: false
		});
	};

	clickGenerateHandler = () => {
		this.setState({
			showSharePage: true
		});
	};
	render() {
		if (this.state.showHomepage) {
			return <PageHomePage onClick={this.clickStartHandler} />;
		}
		if (this.state.showSharePage) {
			return <PageShare />;
		}
		return (
			<Page0 onClickGenerateHandler={this.clickGenerateHandler} />
		);
	}
}

export default App;