import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import ScrollTipsComponent from '../scrollTips';

class App extends Component {
	render() {
		return (
			<div styleName="App">
				<div styleName="bg" />
				<div>
					<div styleName="left-cloud" className="animated infinite"/>
					<div styleName="right-cloud" className="animated" />
					<div styleName="right-cloud2" className="animated infinite" />
				</div>
				<div>
					<div styleName="left-leaves" className="animated infinite" style={{animationDuration: '2s'}} />
					<div styleName="right-leaves" className="animated infinite" style={{animationDuration: '3.5s'}} />
					<div styleName="bamboo" />
				</div>
				<div styleName="grass" />
				<div styleName="slogan" className="animated fadeIn" style={{
					animationDelay: '1821.1453744493394ms'
				}}>
					<div styleName="nianfen"  className="animated fadeIn" style={{animationDelay: '3.5s'}} />
					<div styleName="yazm" className="animated fadeIn" style={{animationDelay: '2s'}} />
					<div styleName="znzd" className="animated fadeIn" style={{animationDelay: '3s'}} />
				</div>
				<div styleName="jixiangmu">
					<div styleName="six" className="animated bounceInDown" style={{animationDelay: '1s'}}></div>
					<div styleName="text" className="animated fadeIn" style={{animationDuration: '1627.84140969163ms',
						animationDelay: '1518.6784140969166ms'}}></div>
					<div styleName="dingding" className="animated bounceInLeft" style={{animationDelay: '1.2s'}}></div>
				</div>
				<ScrollTipsComponent />
			</div>
		);
	}
}

export default CSSModules(App, styles);