<script>
	import '@fontsource-variable/shantell-sans/full.css';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex overflow-auto flex-col flex-1 p-5">
	{@render children()}
</div>
