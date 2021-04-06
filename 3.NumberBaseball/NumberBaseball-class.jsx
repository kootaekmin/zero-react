import React, { Component } from 'react';
import Try from './Try';

function getNumbers() {
	// 4 numbers unique
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const array = [];
	for (let i = 0; i < 4; i++) {
		const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		array.push(chosen);
	}
	return array;
}

class NumberBaseball extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(),
		tries: [],
	};

	onSubmitForm = (e) => {
		e.preventDefault();
		if (this.state.value === this.state.answer.join('')) {
			this.setState({
				result: 'homerun',
				tries: [
					...this.state.tries,
					{ try: this.state.value, result: 'homerun!' },
				],
			});
			alert('regame');
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
		} else {
			// wrong answer
			const answerArray = this.state.value.split('').map((v) => parseInt(v));
			let strike = 0;
			let ball = 0;
			if (this.state.tries.length >= 9) {
				this.setState({
					result: `game over you failed... answer is ${answer.join(',')}`,
				});
				alert('regame');
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
			} else {
				for (let i = 0; i < 4; i += 1) {
					if (answerArray[i] === this.state.answer[i]) {
						strike++;
					} else if (this.state.answer.includes(answerArray[i])) {
						ball++;
					}
				}
				this.setState({
					tries: [
						...this.state.tries,
						{ try: this.state.value, result: `${strike}strike, ${ball}ball` },
					],
					value: '',
				});
			}
		}
	};

	onChangeInput = (e) => {
		console.log(this.state.answer);
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		return (
			<>
				<h1>{this.state.result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input
						maxLength={4}
						value={this.state.value}
						onChange={this.onChangeInput}
					/>
				</form>
				<div>tries:{this.state.tries.length}</div>
				<ul>
					{this.state.tries.map((v, i) => {
						return <Try key={`${i + 1}try: `} tryInfo={v} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseball;
