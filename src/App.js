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

	clickBackHandler = () => {
		this.setState({
			showSharePage: false,
		});
	}

	clickGenerateHandler = (currentChangjingIndex) => {
		if (window.Avatar) {
			// TODO: 生成图片
			const img64 = window.Avatar.exec('generate');
			this.setState({
				showSharePage: true,
				currentChangjingIndex,
				imgUrl: img64,
				isFetching: false
			});
		}
		window.HollywoodLog && window.HollywoodLog.click('canvasGenerate.click', '画布页.生成', '');
	};

	componentDidMount() {
		const LOADING_NODE = document.getElementById('loading');
		LOADING_NODE && LOADING_NODE.parentNode.removeChild(LOADING_NODE);
		
		const scaleValue = window.outerWidth / 1080;
		const metaTag=document.createElement('meta');
		metaTag.name = "viewport"
		metaTag.content = `width=1080, initial-scale=${scaleValue}, maximum-scale=${scaleValue}, user-scalable=0`;
		document.getElementsByTagName('head')[0].appendChild(metaTag);
	}
	render() {
		let currentComponent;
		if (this.state.showHomepage) {
		currentComponent =  [<PageHomePage onClick={this.clickStartHandler} key={'homepage'} />];
		} else {
			currentComponent =  [
				<Page0 onClickGenerateHandler={this.clickGenerateHandler} key={'gamepage'} />,
				...(this.state.showSharePage ? [
				<PageShare
					imgUrl={this.state.imgUrl}
					changjingIndex={this.state.currentChangjingIndex}
					key={'sharepage'}
					clickBackHandler={this.clickBackHandler}
				/>
			] : [])
			]
		};
		return [...currentComponent, <Music key={'music'} />]
	}
}

export default App;