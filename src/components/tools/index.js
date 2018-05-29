import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import CategoryItem from './categoryItem';
import OptionItem from './optionItem';


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
			sex: 'male',
			currentSubOptionIndex: null
		};
	}

	toggleSubOptionHandler = () => {
		this.setState({
			showSubOptions: !this.state.showSubOptions
		});
	};

	clickBigClassIndex = index => {
		this.categoryContainer.scrollLeft = index > 3 ? 100 : 0;
		this.setState({
			showSubOptions: true,
			categoryIndex: index,
			currentSubOptionIndex: null
		});
	};

	clickSubOptionItemHandler = (index, element) => {
		// transform: translateX(-left);/
		// console.log(this.node.style.transform);
		const offsetLeft = element.offsetWidth / 2 + element.offsetLeft - this.WIDTH / 2;
		// this.node.style.transform = `translateX(-${element.offsetWidth / 2 + element.offsetLeft - this.WIDTH / 2}px)`;
		this.node.scrollLeft = offsetLeft;
		this.setState({
			currentSubOptionIndex: index
		});
	};

	generateHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};

	componentDidMount() {
		this.WIDTH = this.node.offsetWidth;
		console.log(this.WIDTH);
	}
	render() {
		const category = arrayBigClass[this.state.categoryIndex];
		const isClassBySex = !!category.sex;
		const optionsDataTotal = isClassBySex ? category.sex[this.state.sex] : category.totalIcons;
		const hasDirName = !!category.dirName;
		const subOptionIconsDirName = isClassBySex ? `${category.dirName}/${this.state.sex}` : `${category.dirName}`;
		return (
			<div className={styles.App + ' ' + (this.state.showSubOptions ? styles.showSubOptions : '')}>
				<div
					styleName="subOptions"
					ref={
						node => {
							this.node = node;
						}
					}
				>
					{
						hasDirName ? new Array(optionsDataTotal).fill(0).map((item, index) => {
							return <OptionItem
								key={index}
								index={index}
								imgUrl={`${subOptionIconsDirName}/${index}.png`}
								onClick={this.clickSubOptionItemHandler}
								isActive={this.state.currentSubOptionIndex === index}
							/>
						}) : null
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
					<div styleName="generate" onClick={this.generateHandler}>
						<img src={require('../../images/others/photo.png')} alt='' />
					</div>
				</div>
			</div>
		);
	}
}

export default CSSModules(App, styles);