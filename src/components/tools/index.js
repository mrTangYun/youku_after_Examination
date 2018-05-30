import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import CategoryItem from './categoryItem';
import OptionItem from './optionItem';


const arrayBigClass = [
	{
		name: '选人',
		mainIcon: 'xuanren.png',
		dirName: 'sex',
		totalIcons: 2
	},
	{
		name: '服装',
		mainIcon: 'yifu.png',
		dirName: 'yifu',
		sex: {
			male: 6,
			famale: 6
		}
	},
	{
		name: '角度',
		mainIcon: 'jiaodu.png',
		dirName: 'rotate',
		sex: {
			male: 3,
			famale: 3
		}
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
		dirName: 'changjing',
		totalIcons: 5
	},
	{
		name: '其他',
		mainIcon: 'qita.png',
		dirName: 'daoju',
		totalIcons: 41
	}
];
class App extends Component {
	constructor() {
		super();
		this.state = {
			showSubOptions: true,
			categoryIndex: 0,
			sex: '',
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
		const offsetLeft = element.offsetWidth / 2 + element.offsetLeft - this.WIDTH / 2;
		// this.node.style.transform = `translateX(-${element.offsetWidth / 2 + element.offsetLeft - this.WIDTH / 2}px)`;
		this.node.scrollLeft = offsetLeft;
		this.setState({
			currentSubOptionIndex: index
		});

		if (arrayBigClass[this.state.categoryIndex].dirName && arrayBigClass[this.state.categoryIndex].dirName === 'sex') {
			this.setState({
				sex: index ? 'famale' : 'male'
			});
		}
		
	};

	generateHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.onClickGenerateHandler && this.props.onClickGenerateHandler();
	};

	componentDidMount() {
		this.WIDTH = this.node.offsetWidth;
	}
	render() {
		const category = arrayBigClass[this.state.categoryIndex];
		const isClassBySex = !!category.sex;
		let isCanRenderOption = false;
		if (isClassBySex) {
			isCanRenderOption = !!this.state.sex;
		} else {
			isCanRenderOption = true;
		}

		let optionsDataTotal = 0;
		if (isCanRenderOption) {
			optionsDataTotal = isClassBySex ? category.sex[this.state.sex] : category.totalIcons;
		}
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