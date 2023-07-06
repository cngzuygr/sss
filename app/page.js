"use client";
import { useState } from "react";
import useSound from "use-sound";
import { VictoryBar } from "victory";

export default function Home() {
	const stateArray = Array.from({ length: 50 }, () => ({
		value: Math.floor(Math.random() * 10) + 1,
	}));

	const [numbers, setNumbers] = useState(stateArray);
	const [alg, setAlg] = useState("");
	const [arrayLength, setArrayLength] = useState("");
	let componentToRender;

	const [play] = useSound("/sounds/glug-a.mp3");

	const Chart = ({ chartNumbers }) => {
		return (
			<div className="flex justify-center items-center h-full">
				<VictoryBar data={chartNumbers} y="value" />
			</div>
		);
	};

	const generateRandomNumbers = () => {
		const randomNumbers = [{ value: 1 }];
		if (arrayLength == "") {
			return randomNumbers;
		} else {
			for (let i = 0; i < arrayLength; i++) {
				const randomNumber = Math.floor(Math.random() * 1000) + 1;
				randomNumbers.push({ value: randomNumber });
			}
		}

		return randomNumbers;
	};

	const bubbleSort = (arr) => {
		let swapped = true;
		const len = arr.length;

		const sortStep = () => {
			swapped = false;
			for (let i = 0; i < len - 1; i++) {
				if (arr[i].value > arr[i + 1].value) {
					play(); // sound
					const temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
					swapped = true;
					break;
				}
			}
			setNumbers([...arr]);
		};

		const sortingInterval = setInterval(() => {
			if (!swapped) {
				clearInterval(sortingInterval);
				console.log("Sorting complete");
			} else {
				sortStep();
			}
		}, 0);
	};

	const handleBubblePress = () => {
		const randomNumbers = generateRandomNumbers();
		setNumbers(randomNumbers);
		bubbleSort(randomNumbers);
	};

	switch (alg) {
		case "":
			componentToRender = (
				<div className="flex flex-col space-y-2 justify-center">
					<button
						onClick={() => setAlg("bubble")}
						className="bg-red-400 text-white p-4 rounded"
					>
						Bubble Sort
					</button>
					<button
						onClick={() => setAlg("insertion")}
						className="bg-green-400 text-white p-4 rounded"
					>
						Insertion
					</button>
					<button
						onClick={() => setAlg("selection")}
						className="bg-yellow-400 text-white p-4 rounded"
					>
						Selection
					</button>
					<button
						onClick={() => setAlg("merge")}
						className="bg-purple-400 text-white p-4 rounded"
					>
						Merge
					</button>
					<button
						onClick={() => setAlg("quick")}
						className="bg-blue-400 text-white p-4 rounded"
					>
						Quick Sort
					</button>
				</div>
			);
			break;
		case "bubble":
			componentToRender = (
				<div>
					<div className="place-items-center flex space-x-20 bg-red-200 w-screen justify-around py-2">
						<h1>Bubble Sort</h1>
						<div className="flex space-x-5">
							<input
								placeholder="Array Length"
								className="rounded p-2"
								value={arrayLength}
								onChange={(e) => setArrayLength(e.target.value)}
							></input>
							<button
								onClick={handleBubblePress}
								className="bg-green-700 text-white text-sm p-2 rounded"
							>
								Start
							</button>
						</div>
						<button
							onClick={() => setAlg("")}
							className="bg-red-400 text-white p-3 rounded"
						>
							Back
						</button>
					</div>
					<Chart chartNumbers={numbers} />
				</div>
			);
			break;
		case "insertion":
			componentToRender = (
				<div>
					<h1>Insertion</h1>
					<button
						onClick={() => setAlg("")}
						className="bg-red-400 text-white p-4 rounded"
					>
						Back
					</button>
				</div>
			);
			break;
		case "selection":
			componentToRender = (
				<div>
					<h1>Selection</h1>
					<button
						onClick={() => setAlg("")}
						className="bg-red-400 text-white p-4 rounded"
					>
						Back
					</button>
				</div>
			);
			break;
		case "merge":
			componentToRender = (
				<div>
					<h1>Merge</h1>
					<button
						onClick={() => setAlg("")}
						className="bg-red-400 text-white p-4 rounded"
					>
						Back
					</button>
				</div>
			);
			break;
		case "quick":
			componentToRender = (
				<div>
					<h1>Quick Sort</h1>
					<button
						onClick={() => setAlg("")}
						className="bg-red-400 text-white p-4 rounded"
					>
						Back
					</button>
				</div>
			);
			break;
		default:
			componentToRender = null;
	}

	return (
		<main className="flex justify-center  bg-red-50 min-h-screen">
			{componentToRender}
		</main>
	);
}
