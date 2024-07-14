<script lang="ts">
	import { createTimer } from '$lib/stores/timer.svelte';
	import {
		IconDownload,
		IconReload,
		IconCircleFilled,
		IconSquareFilled,
		IconPlayerPlayFilled,
		IconPlayerPauseFilled
	} from '@tabler/icons-svelte';

	const formatTime = (ms: number) => {
		let remaining = ms;
		const hours = Math.floor(remaining / 3600000);
		remaining -= hours * 3600000;
		const minutes = Math.floor(remaining / 60000);
		remaining -= minutes * 60000;
		const seconds = Math.floor(remaining / 1000);
		remaining -= seconds * 1000;
		const millies = remaining;
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millies).padStart(2, '0')}`;
	};

	let stream = $state<MediaStream>();
	let cameraPreview = $state<HTMLVideoElement>();
	let recordedVideo = $state<HTMLVideoElement>();
	let recordedBlob = $state<Blob>();
	let recorder: MediaRecorder;
	let timer = createTimer();
	let paused = $state(false);

	let recording = $state(false);

	$effect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true
			})
			.then((s) => {
				stream = s;
				recorder = new MediaRecorder(s);
				recorder.addEventListener('dataavailable', (e) => (recordedBlob = e.data));
			});
	});

	$effect(() => {
		if (stream && cameraPreview) cameraPreview.srcObject = stream;
	});

	$effect(() => {
		if (recordedVideo && recordedBlob) recordedVideo.src = URL.createObjectURL(recordedBlob);
	});

	const startRecording = () => {
		paused = false;
		recorder.start();
		timer.start();
		recording = true;
	};

	const stopRecording = () => {
		paused = false;
		recorder.stop();
		timer.stop();
		recording = false;
	};

	const download = () => {
		if (!recordedBlob) return;
		const a = document.createElement('a');
		document.body.appendChild(a);
		a.style.display = 'none';
		const url = URL.createObjectURL(recordedBlob);
		a.href = url;
		a.download = 'video.mov';
		a.click();
		URL.revokeObjectURL(url);
	};

	const pause = () => {
		paused = true;
		recorder.pause();
		timer.pause();
	};

	const resume = () => {
		paused = false;
		recorder.resume();
		timer.resume();
	};

	const clear = () => {
		recordedBlob = undefined;
	};
</script>

<div class="flex flex-col flex-1 gap-3 justify-center items-center">
	{#if recording || !recordedBlob}
		<video
			class="rounded-lg outline-error/70"
			class:animate-pulsing={recording}
			autoplay
			muted
			playsinline
			bind:this={cameraPreview}
		>
		</video>
	{:else}
		<video class="rounded-lg" controls playsinline bind:this={recordedVideo}></video>
	{/if}

	<div class="flex p-3 w-full rounded-lg bg-base-content/10">
		{#if recordedBlob}
			<div class="flex gap-3 items-center">
				<button class="btn btn-neutral" onclick={clear}>
					<IconReload />
				</button>
				<button class="btn btn-neutral" onclick={download}>
					<IconDownload />
				</button>
			</div>
		{:else if !recording}
			<button class="btn btn-error btn-circle" onclick={startRecording}>
				<IconCircleFilled />
			</button>
		{:else}
			<div class="flex gap-3 items-center">
				<button onclick={stopRecording} class="btn-error btn btn-circle">
					<IconSquareFilled />
				</button>
				<button onclick={paused ? resume : pause} class="btn btn-circle btn-neutral">
					{#if paused}
						<IconPlayerPlayFilled />
					{:else}
						<IconPlayerPauseFilled />
					{/if}
				</button>
				<span>{formatTime(timer.msPassed)}</span>
			</div>
		{/if}
	</div>
</div>
