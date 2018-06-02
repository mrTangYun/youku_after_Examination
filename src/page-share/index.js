import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import ReactLoading from 'react-loading';

const shareArray = [
	{
		title: 'KTV',
		contents: [
			'唱最high的歌，熬最彻夜的夜',
			'今天的歌可以唱个三天三夜',
			'人生中最后一次不看脸的竞争结束了',
			'熬夜伤身，咱们直接通宵吧',
			'这一刻的我们，不羁的就是个野马',
			'高三，可能是你最博学的时期',
			'高考只能决定你在哪个城市打王者荣耀',
			'这是我的世界，我在这里狂欢'
		]
	},{
		title: '太空',
		contents: [
			'这里和我脑洞的特点一样——空',
			'这里没有时间感，当然也没有对象',
			'人生中最后一次不看脸的竞争结束了',
			'这是我的世界，我在这里狂欢',
			'考完还用回班吗？',
			'人生中最后一次不看脸的竞争结束了',
			'别撕书，可能会复读',
			'教室里还会坐满人，可惜不是我们了'
		]
	},{
		title: '卧室',
		contents: [
			'一花一世界，一窝一个样',
			'这是我的世界，我在这里狂欢',
			'人生中最后一次不看脸的竞争结束了',
			'别撕书，可能会复读',
			'高考只能决定你在哪个城市打王者荣耀',
			'高考完就结束了，你只是离开了新手村',
			'人生中最后一次不看脸的竞争结束了',
			'熬夜伤身，咱们直接通宵吧'
		]
	},
	{
		title: '教室',
		contents: [
			'从前黑板的沙沙声，是你美好的记忆之一',
			'高考结束，给自己个狂欢的理由',
			'别撕书，可能会复读',
			'人生中最后一次不看脸的竞争结束了',
			'熬夜伤身，咱们直接通宵吧',
			'考完还用回班吗？',
			'教室里还会坐满人，可惜不是我们了',
			'高三，可能是你最博学的时期'
		]
	},{
		title: '篮球场',
		contents: [
			'这一刻的我们，不羁的就是个野马',
			'这里有过表白，虽然被拒绝了',
			'这里见过别人表白，浪漫却没成功',
			'考完还用回班吗？',
			'高考只能决定你在哪个城市打王者荣耀',
			'这是我的世界，我在这里狂欢',
			'人生中最后一次不看脸的竞争结束了',
			'熬夜伤身，咱们直接通宵吧'
		]
	}
];
function rd(n,m){
	var c = m - n + 1;	
	return Math.floor(Math.random() * c + n);
}
class App extends Component {
	state = {
		isFetching: false
	};

	componentDidMount() {
		const datas = shareArray[this.props.changjingIndex].contents;
		const text = datas[rd(0, datas.length - 1)];
		this.setState({
			text
		});
		this.upload();
		window.HollywoodLog && window.HollywoodLog.expose('sharePage.loaded', '分享页.加载完毕', '');
	}

	upload = () => {
		try {
			if (this.isFetching) return false;
			this.isFetching = true;
			this.setState({
				isFetching: true
			});
			window.uploadImg && window.uploadImg(this.props.imgUrl, (imgUrl) => {
				this.setState({
					imgUrl,
					isFetching: false,
					isUploaded: true
				});
				this.isFetching = false;
			}, (error) => {
				console.log(error);
				this.isFetching = false;
				this.setState({
					isFetching: false,
					isUploaded: false
				});
			});
		} catch(e) {
			console.log(e);
			this.isFetching = false;
			this.setState({
				isFetching: false,
				isUploaded: false
			});
		}
	};
	shareHandler = () => {
		if (this.isFetching) return false;
		if (this.state.isUploaded) {
			window.HollywoodLog && window.HollywoodLog.click('sharePage.click', '分享页.立刻分享', '');
			window.share && window.share(rd(0, 3), require('../images/pshare/share.jpg'));
			return false;
		}
		// this.upload();
	};
	render() {
		const btnStr = '分享图片';
		return (
			<div styleName="App">
				<div styleName="composeImg">
					<img src={this.props.imgUrl} alt='' />
				</div>
				<div styleName="footer">
					<div styleName="leftText">
						<div styleName="t1">高考后的那一夜...</div>
						<div styleName="t2">{this.state.text}</div>
						<div styleName="logoAndT3">
							<div styleName="logo">
								<img src={require('../images/pshare/logo.png')} alt='' />
							</div>
							<div styleName="t3">上优酷下拉首页有惊喜</div>
						</div>
					</div>
					<div styleName={this.state.isFetching ? "btnShareFetching" : "btnShare"} onClick={this.shareHandler}>{btnStr}</div>
				</div>
				{
					this.state.isFetching && <div styleName="loadingContainer">
					<ReactLoading/>
				</div>
				}
			</div>
		);
	}
}

export default CSSModules(App, styles);