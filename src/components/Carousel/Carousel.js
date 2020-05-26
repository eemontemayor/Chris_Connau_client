'use strict;'
import React from 'react';
import './Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// var x;



const classNames = (...args) => {
	var classes = [];

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (!arg) continue;

		var argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg) && arg.length) {
			var inner = classNames.apply(null, arg);
			if (inner) {
				classes.push(inner);
			}
		} else if (argType === 'object') {
			for (var key in arg) {
				if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}
export default class Carousel extends React.Component{
    constructor() {
		super();
		
		this.state = {
			currentIndex: 0,
			isTransitioning: false,
			goingLeft: false,
			url:''
		};
	}
	
	componentDidMount() {
		window.addEventListener('keyup', this.onKeyUp);
		this.rotateImg(true)
		
	

	}
	
	componentWillUnmount() {
		this.rotateImg(false)
		window.removeEventListener('keyup', this.onKeyUp);

	}
	
	onKeyUp = (e) => {
		if (e.keyCode) {
			if (e.keyCode === 39) {
				this.showNextSet();
			} else if (e.keyCode === 37) {
				this.showPrevSet();
			}
		}
	}


	showPrevSet = () => {
		const currentIndex = (this.state.currentIndex - 1 + this.props.images.length) % this.props.images.length;
		this.setState({ currentIndex });
	}
	
	showNextSet = () => {
		const currentIndex = (this.state.currentIndex + 1) % this.props.images.length;
		this.setState({ currentIndex });
	}


	rotateImg(bool){

		const timer = setInterval(this.showNextSet,15000)

		if(bool){

			return timer
		} 
		else{
			clearInterval(timer)
		}
	}


	render() {
		const { images } = this.props;
		// console.log('images', images)
		const { currentIndex, isTransitioning, goingLeft } = this.state;
		
		return (
			
			<div className="carousel__wrapper">
					<button className="carousel__button left" onClick={this.showPrevSet}> <FontAwesomeIcon className='red' icon='arrow-circle-left' /></button>
				<div className="carousel__container">
					{images.map((img, index) => {
						let className = 'carousel__image'
						if (index === currentIndex) className += ' active';
						if(index === currentIndex -1) className += ' prev';
						if(index === currentIndex +1) className += ' next';
						return <img src={img} className={className} key={`img-${index}`} alt = 'carousel img alt -ph' />;
					})}
				</div>
				{/* <div className="carousel__controls"> */}
					<button className="carousel__button right" onClick={this.showNextSet}> <FontAwesomeIcon className='green' icon='arrow-circle-right' /></button>
				{/* </div> */}
			
			</div>
		

		);
	}
	

}
