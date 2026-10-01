import React from 'react';
import { Link } from 'react-router-dom';

function LanguageTest({words, thisLingo, nextLabel, nextPath}: {words: string[], thisLingo: string, nextLabel: string, nextPath: string}) {

	const [correctGuesses, setCorrectGuesses] = React.useState(0);
	const [totalGuesses, setTotalGuesses] = React.useState(0);
	const [availableWords, setAvailableWords] = React.useState(words);

	const [index, setIndex] = React.useState(Math.floor(Math.random() * availableWords.length));
	const [guess, setGuess] = React.useState('');

	let englishWord: string | undefined
	let translatedWord: string

	if (availableWords.length !== 0) {
		[englishWord, translatedWord] = availableWords[index].split(':');
	}

	function onSubmit() {
		if (guess.trim().toLowerCase() === translatedWord) {
			setCorrectGuesses(correctGuesses + 1);
			setAvailableWords(availableWords.toSpliced(index, 1)); // use toSpliced to create a new array instead of mutating the existing one
		}

		setIndex(Math.floor(Math.random() * availableWords.length)); // always generate a new index for the next word
		setGuess('');
		setTotalGuesses(totalGuesses + 1);
	}

	return (
		<>
			<h1>{thisLingo} test</h1>

			<div hidden={englishWord === undefined}>

				<div className="wordPanel">
					<b>{englishWord}</b>
				</div>

				<div className="guessPanel">
					<input
						type="text"
						value={guess}
						placeholder={`What's it in ${thisLingo}?`}
						autoFocus
						onChange={e => setGuess(e.target.value)}
						onKeyUp={e => {
							if (e.key === 'Enter')
								onSubmit();
						}}
					/>
					<button onClick={onSubmit}>Submit</button>
				</div>
			</div>

			<div className="resultPanel">
				Correct guesses: {correctGuesses} out of {totalGuesses}
			</div>

			<Link to={nextPath}>{nextLabel}</Link>
		</>
    )
}

export default LanguageTest;