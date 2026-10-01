import React from 'react';
import { Link } from 'react-router-dom';

function LanguageTest({words, thisLingo, nextLabel, nextPath}: {words: string[], thisLingo: string, nextLabel: string, nextPath: string}) {

	const [correctGuesses, setCorrectGuesses] = React.useState(0);
	const [totalGuesses, setTotalGuesses] = React.useState(0);
	const [availableWords, setAvailableWords] = React.useState(words);

	const guessTextBoxRef = React.useRef<HTMLInputElement>(null);

	let englishWord: string | undefined
	let translatedWord: string
	let index: number;

	if (availableWords.length !== 0) {
		index = Math.floor(Math.random() * availableWords.length);
		[englishWord, translatedWord] = availableWords[index].split(':');
	}

	function onSubmit() {
		const guessElem = guessTextBoxRef.current!;

		if (guessElem.value.trim().toLowerCase() === translatedWord) {
			setCorrectGuesses(correctGuesses + 1);
			availableWords.splice(index, 1)
			setAvailableWords(availableWords)
		}

		guessElem.value = '';
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
						ref={guessTextBoxRef}
						placeholder={`What's it in ${thisLingo}?`}
						autoFocus
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