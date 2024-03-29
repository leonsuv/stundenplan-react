/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { useWindowSize } from "@uidotdev/usehooks";

export const WavyBackground = ({
	children,
	className,
	canvasClassName,
	containerClassName,
	colors,
	waveWidth,
	backgroundFill,
	blur = 10,
	speed = "fast",
	waveOpacity = 0.5,
	...props
}: {
	children?: any;
	className?: string;
	containerClassName?: string;
	colors?: string[];
	waveWidth?: number;
	backgroundFill?: string;
	blur?: number;
	speed?: "slow" | "fast";
	waveOpacity?: number;
	[key: string]: any;
}) => {
	const windowSize = useWindowSize();
	const noise = createNoise3D();
	let w: number,
		h: number,
		nt: number,
		i: number,
		x: number,
		ctx: any,
		canvas: any;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const getSpeed = () => {
		switch (speed) {
			case "slow":
				return 0.001;
			case "fast":
				return 0.002;
			default:
				return 0.002;
		}
	};

	const init = () => {
		canvas = canvasRef.current;
		ctx = canvas.getContext("2d");
		w = ctx.canvas.width = window.innerWidth;
		h = ctx.canvas.height = window.innerHeight;
		ctx.filter = `blur(${blur}px)`;
		nt = 0;
		window.onresize = function () {
			w = ctx.canvas.width = window.innerWidth;
			h = ctx.canvas.height = window.innerHeight;
			ctx.filter = `blur(${blur}px)`;
		};
		render();
	};

	const waveColors = colors ?? [
		"#38bdf8",
		"#818cf8",
		"#c084fc",
		"#e879f9",
		"#22d3ee",
	];
	const drawWave = (n: number) => {
		nt += getSpeed();
		for (i = 0; i < n; i++) {
			ctx.beginPath();
			ctx.lineWidth = waveWidth || 60;
			ctx.strokeStyle = waveColors[i % waveColors.length];
			for (x = -10; x < w + 10; x += 3) {
				const y = noise(x / 800, 0.2 * i*2, nt) * 120;
				ctx.lineTo(x, y + h * 0.4 + i * 15); // adjust for height, currently at 50% of the container
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	let animationId: number;
	const render = () => {
		ctx.fillStyle = backgroundFill || 'rgb(2,8,23)';
		ctx.globalAlpha = waveOpacity || 0.5;
		ctx.fillRect(0, 0, w, h);
		drawWave(5);
		animationId = requestAnimationFrame(render);
	};

	useEffect(() => {
		init();
		return () => {
			cancelAnimationFrame(animationId);
		};
	}, []);

	useEffect(() => {
		x = windowSize.width || window.innerWidth;
		h = windowSize.height || window.innerHeight;
	}, [windowSize])

	return (
		<div
			className={cn(
				"h-screen flex flex-col items-center justify-center",
				containerClassName
			)}
		>
			<canvas
				className={cn("inset-0 z-0 h-fit", canvasClassName)}
				ref={canvasRef}
				id="canvas"
			></canvas>
			<div className={cn("relative z-10", className)} {...props}>
				{children}
			</div>
		</div>
	);
};
