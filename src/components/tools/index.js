import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import CategoryItem from './categoryItem';


const arrayBigClass = [
	{
		name: '选人',
		mainIcon: 'xuanren.png',
		dirIndex: '0'
	},
	{
		name: '服装',
		mainIcon: 'yifu.png',
		dirName: 'yifu',
		sex: {
			male: 6,
			famale: 7
		}
	},
	{
		name: '角度',
		mainIcon: 'jiaodu.png',
		dirIndex: '1'
	},
	{
		name: '发型',
		mainIcon: 'faxing.png',
		dirName: 'faxing',
		sex: {
			male: 10,
			famale: 8
		}
	},
	{
		name: '表情',
		mainIcon: 'biaoqing.png',
		dirName: 'biaoqing',
		sex: {
			male: 6,
			famale: 6
		}
	},
	{
		name: '特效',
		mainIcon: 'texiao.png',
		dirName: 'texiao',
		totalIcons: 3
	},
	{
		name: '场景',
		mainIcon: 'changjing.png',
		dirIndex: '1'
	},
	{
		name: '其他',
		mainIcon: 'qita.png',
		dirName: 'daoju',
		totalIcons: 35
	}
];
class App extends Component {
	constructor() {
		super();
		this.state = {
			showSubOptions: true,
			categoryIndex: 3,
			sex: 'male'
		};
	}

	toggleSubOptionHandler = () => {
		this.setState({
			showSubOptions: !this.state.showSubOptions
		});
		console.log(this.state.showSubOptions);
	};

	clickBigClassIndex = index => {
		this.categoryContainer.scrollLeft = index > 3 ? 100 : 0;
		this.setState({
			categoryIndex: index
		});
	};
	render() {
		const category = arrayBigClass[this.state.categoryIndex];
		const isClassBySex = !!category.sex;
		const optionsDataTotal = isClassBySex ? category.sex[this.state.sex] : category.totalIcons;
		const subOptionIconsDirName = isClassBySex ? `${category.dirName}/${this.state.sex}` : `${category.dirName}`;
		console.log(`${category.dirName}/${this.state.sex}`);
		return (
			<div className={styles.App + ' ' + (this.state.showSubOptions ? styles.showSubOptions : '')}>
				<div styleName="subOptions">
					{
						new Array(optionsDataTotal).fill(0).map((item, index) => {
							return <div key={index}>
								<img src={require(`../../images/icons/${subOptionIconsDirName}/${index}.png`)} alt='' />
							</div>
						})
					}
				</div>
				<div
					styleName="classBtns"
					ref={node => {
						this.categoryContainer = node;
					}}
				>
					{
						arrayBigClass.map((item, index) => {
							return <CategoryItem
								key={item.name + item.dirIndex}
								onClick={this.clickBigClassIndex}
								index={index}
								{...item}
								currentIndex={this.state.categoryIndex}
							/>;
						})
					}
				</div>
				<div styleName="arrow" onClick={this.toggleSubOptionHandler}>
					<img src={require('../../images/icons/arrowUp.png')} alt='' />
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);