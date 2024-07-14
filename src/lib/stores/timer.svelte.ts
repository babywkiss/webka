export const createTimer = () => {
	let msPassed = $state(0);
	let paused = false;
	let interval: number;

	return {
		start() {
			const start = Date.now();
			interval = setInterval(() => {
				if (!paused) msPassed = Date.now() - start;
			}, 100);
		},
		pause() {
			paused = true;
		},
		resume() {
			paused = false;
		},
		stop() {
			msPassed = 0;
			clearInterval(interval);
		},
		get msPassed() {
			return msPassed;
		},
	};
};
