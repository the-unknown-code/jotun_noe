<template>
	<div v-show="active" ref="containerRef" />
</template>

<script setup lang="ts">
import { Pane } from 'tweakpane';
import useAppStore from '~/store/useAppStore';

const containerRef = ref<HTMLElement | null>(null);
let pane: Pane | null = null;

// Device Info
const { width, height } = useWindowSize();
const $store = useAppStore();
const active = ref<boolean>(false);
const breakpoints = useRuntimeConfig().public.breakpoints;
const scope = effectScope();

const currentBreakpoint = computed(() => {
	if (width.value < breakpoints.mobile) {
		return 'Mobile';
	} else if (
		width.value >= breakpoints.mobile &&
		width.value < breakpoints.wide
	) {
		return 'Desktop';
	} else {
		return 'Wide';
	}
});

const viewportSize = computed(() => `${width.value} × ${height.value}`);

// Browser and OS detection
const userAgent = ref('');
const browserInfo = ref({ name: 'Unknown', version: 'Unknown' } as {
	name: string;
	version: string;
});
const osInfo = ref('Unknown');

/*
const detectBrowser = () => {
	if (typeof window === 'undefined') return;

	userAgent.value = navigator.userAgent;
	const ua = navigator.userAgent;

	// Browser detection
	if (ua.includes('Edg/')) {
		const match = ua.match(/Edg\/(\d+)/);
		browserInfo.value = {
			name: 'Microsoft Edge',
			version: match ? match[1] || 'Unknown' : 'Unknown',
		};
	} else if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
		const match = ua.match(/Chrome\/(\d+)/);
		browserInfo.value = {
			name: 'Chrome',
			version: match ? match[1] || 'Unknown' : 'Unknown',
		};
	} else if (ua.includes('Firefox/')) {
		const match = ua.match(/Firefox\/(\d+)/);
		browserInfo.value = {
			name: 'Firefox',
			version: match ? match[1] || 'Unknown' : 'Unknown',
		};
	} else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
		const match = ua.match(/Version\/(\d+)/);
		browserInfo.value = {
			name: 'Safari',
			version: match ? match[1] || 'Unknown' : 'Unknown',
		};
	}

	// OS detection
	if (ua.includes('Windows')) {
		osInfo.value = 'Windows';
	} else if (ua.includes('Mac OS X') || ua.includes('Macintosh')) {
		osInfo.value = 'macOS';
	} else if (ua.includes('Linux')) {
		osInfo.value = 'Linux';
	} else if (ua.includes('Android')) {
		osInfo.value = 'Android';
	} else if (
		ua.includes('iOS') ||
		ua.includes('iPhone') ||
		ua.includes('iPad')
	) {
		osInfo.value = 'iOS';
	}
};
*/

const detectBrowser = () => {
	if (typeof window === 'undefined') return;

	const ua = navigator.userAgent;
	userAgent.value = ua;

	const getVersion = (regex: RegExp) => ua.match(regex)?.[1] ?? 'Unknown';

	const browsers = [
		{ test: /Edg\//, name: 'Microsoft Edge', version: /Edg\/(\d+)/ },
		{
			test: /Chrome\//,
			name: 'Chrome',
			version: /Chrome\/(\d+)/,
			exclude: /Edg\//,
		},
		{ test: /Firefox\//, name: 'Firefox', version: /Firefox\/(\d+)/ },
		{
			test: /Safari\//,
			name: 'Safari',
			version: /Version\/(\d+)/,
			exclude: /Chrome\//,
		},
	];

	const foundBrowser = browsers.find(
		b => b.test.test(ua) && (!b.exclude || !b.exclude.test(ua))
	);

	browserInfo.value = foundBrowser
		? { name: foundBrowser.name, version: getVersion(foundBrowser.version) }
		: { name: 'Unknown', version: 'Unknown' };

	const osList = [
		{ test: /Windows/, name: 'Windows' },
		{ test: /(Mac OS X|Macintosh)/, name: 'macOS' },
		{ test: /Android/, name: 'Android' },
		{ test: /(iPhone|iPad|iOS)/, name: 'iOS' },
		{ test: /Linux/, name: 'Linux' },
	];

	const foundOs = osList.find(o => o.test.test(ua));
	osInfo.value = foundOs ? foundOs.name : 'Unknown';
};

// Build Info
const gitBranch = ref('Unknown');
const gitCommit = ref('Unknown');
const projectVersion = ref('Unknown');

const getGitInfo = async () => {
	try {
		// Get git branch
		const branchResponse = await fetch('/api/git/branch').catch(() => null);
		if (branchResponse?.ok) {
			gitBranch.value = await branchResponse.text();
		}

		// Get git commit
		const commitResponse = await fetch('/api/git/commit').catch(() => null);
		if (commitResponse?.ok) {
			gitCommit.value = await commitResponse.text();
		}
	} catch (error) {
		console.warn('Could not fetch git info:', error);
	}
};

// Get project version from package.json
const getProjectVersion = async () => {
	try {
		const response = await fetch('/api/version').catch(() => null);
		if (response?.ok) {
			projectVersion.value = await response.text();
		}
	} catch (error) {
		console.warn('Could not fetch version:', error);
	}
};

const deviceData = reactive({
	breakpoint: '',
	viewport: '',
	os: '',
	browser: '',
});

const buildData = reactive({
	branch: '',
	version: '',
	commit: '',
});

const initialize = async () => {
	if (!containerRef.value) return;

	detectBrowser();
	await getGitInfo();
	await getProjectVersion();

	// Initialize reactive data
	deviceData.breakpoint = currentBreakpoint.value;
	deviceData.viewport = viewportSize.value;
	deviceData.os = osInfo.value;
	deviceData.browser = `${browserInfo.value.name} ${browserInfo.value.version}`;
	buildData.branch = gitBranch.value;
	buildData.version = projectVersion.value;
	buildData.commit = gitCommit.value;

	// Initialize Tweakpane
	pane = new Pane({
		container: containerRef.value,
		title: 'Debug Info',
	});

	// Device Info Section
	//@ts-expect-error - Pane is not typed
	const deviceFolder = pane.addFolder({
		title: 'Device Info',
		expanded: true,
	});

	['breakpoint', 'viewport', 'os', 'browser'].forEach(key => {
		deviceFolder.addBinding(deviceData, key, { readonly: true });
	});

	// Build Info Section
	//@ts-expect-error - Pane is not typed
	const buildFolder = pane.addFolder({
		title: 'Build Info',
		expanded: true,
	});

	['branch', 'version', 'commit'].forEach(key => {
		buildFolder.addBinding(buildData, key, { readonly: true });
	});
};

scope.run(async () => {
	watch(
		[
			currentBreakpoint,
			viewportSize,
			osInfo,
			() => `${browserInfo.value.name} ${browserInfo.value.version}`,
			gitBranch,
			gitCommit,
			projectVersion,
		],
		([breakpoint, viewport, os, browser, branch, commit, version]) => {
			deviceData.breakpoint = breakpoint;
			deviceData.viewport = viewport;
			deviceData.os = os;
			deviceData.browser = browser;

			buildData.branch = branch;
			buildData.commit = commit;
			buildData.version = version;
		}
	);
});

const handleKeyDown = (event: KeyboardEvent) => {
	if (event.key === 'd' && pane) {
		active.value = !active.value;
		$store.setDebug('buildPanel', active.value);
	}
};

tryOnMounted(async () => {
	initialize();
	window.addEventListener('keydown', handleKeyDown);
	return () => window.removeEventListener('keydown', handleKeyDown);
});

tryOnBeforeUnmount(() => {
	scope.stop();
	pane?.dispose();
	window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style lang="scss" scoped>
div {
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 999999;
}
</style>
