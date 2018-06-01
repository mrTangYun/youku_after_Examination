import React, { Component } from 'react';
import Page0 from './page-0';
import PageShare from './page-share';
import PageHomePage from './page-homepage';
import Music from './components/music';
class App extends Component {
	state = {
		showHomepage: true,
		showSharePage: false,
		currentChangjingIndex: 0
	};
	clickStartHandler = () => {
		window.HollywoodLog && window.HollywoodLog.click('homePageStart.click', '首页.开始', '');
		this.setState({
			showHomepage: false
		});
	};

	clickGenerateHandler = (currentChangjingIndex) => {
		if (window.Avatar) {
			// TODO: 生成图片
			const img64 = window.Avatar.exec('generate');
			try {
				if (this.isFetching) return false;
				this.isFetching = true;
				this.setState({
					isFetching: true
				});
				window.uploadImg && window.uploadImg(img64, (imgUrl) => {
					this.setState({
						showSharePage: true,
						currentChangjingIndex,
						imgUrl,
						isFetching: false
					});
					this.isFetching = false;
				}, (error) => {
					console.log(error);
					this.isFetching = false;
					this.setState({
						isFetching: false
					});
				});
			} catch(e) {
				console.log('hello');
			}
		}
		window.HollywoodLog && window.HollywoodLog.click('canvasGenerate.click', '画布页.生成', '');
	};

	componentDidMount() {
		const LOADING_NODE = document.getElementById('loading');
		LOADING_NODE && LOADING_NODE.parentNode.removeChild(LOADING_NODE);
	}
	render() {
		let currentComponent;
		if (this.state.showHomepage) {
			currentComponent =  <PageHomePage onClick={this.clickStartHandler} key={'homepage'} />;
		} else if (this.state.showSharePage) {
			currentComponent =  <PageShare imgUrl={this.state.imgUrl} changjingIndex={this.state.currentChangjingIndex} key={'sharepage'} />;
		} else {
			currentComponent =  <Page0 onClickGenerateHandler={this.clickGenerateHandler} key={'gamepage'} />
		};
		return [currentComponent, <Music key={'music'} />]
	}
}

export default App;