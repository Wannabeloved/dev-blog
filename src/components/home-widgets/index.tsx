"use client";

import { useEffect, useRef } from "react";
import "./style.css";

import { createSwapy } from "swapy";
import WeatherWidget from "./weather-widget/index";

export type SwapStartEvent = {
	slotItemMap: SlotItemMap;
	draggingItem: string;
	fromSlot: string;
};
export type SwapStartEventHandler = (event: SwapStartEvent) => void;
export type SwapEvent = {
	oldSlotItemMap: SlotItemMap;
	newSlotItemMap: SlotItemMap;
	fromSlot: string;
	toSlot: string;
	draggingItem: string;
	swappedWithItem: string;
};
export type SwapEventHandler = (event: SwapEvent) => void;
export type SwapEndEvent = {
	slotItemMap: SlotItemMap;
	hasChanged: boolean;
};
export type SwapEndEventHandler = (event: SwapEndEvent) => void;
type BeforeSwapEvent = {
	fromSlot: string;
	toSlot: string;
	draggingItem: string;
	swapWithItem: string;
};
type BeforeSwapHandler = (event: BeforeSwapEvent) => boolean;
export type SlotItemMapObject = Record<string, string>;
export type SlotItemMapMap = Map<string, string>;
export type SlotItemMapArray = Array<{ slot: string; item: string }>;
type SlotItemMap = {
	asObject: SlotItemMapObject;
	asMap: SlotItemMapMap;
	asArray: SlotItemMapArray;
};
interface Swapy {
	enable(enabled: boolean): void;
	onSwapStart(handler: SwapStartEventHandler): void;
	onSwap(handler: SwapEventHandler): void;
	onSwapEnd(handler: SwapEndEventHandler): void;
	onBeforeSwap(handler: BeforeSwapHandler): void;
	slotItemMap(): SlotItemMap;
	update(): void;
	destroy(): void;
}

const HomeWidgets = () => {
	const swapyRef = useRef<Swapy | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			swapyRef.current = createSwapy(containerRef.current, {
				// animation: 'dynamic'
				// swapMode: 'drop',
				// autoScrollOnDrag: true,
				// enabled: true,
				// dragAxis: 'x',
				// dragOnHold: true
			});

			// swapyRef.current.enable(false)
			// swapyRef.current.destroy()
			// console.log(swapyRef.current.slotItemMap())

			swapyRef.current?.onBeforeSwap((event) => {
				console.log("beforeSwap", event);
				// This is for dynamically enabling and disabling swapping.
				// Return true to allow swapping, and return false to prevent swapping.
				return true;
			});

			swapyRef.current?.onSwapStart((event) => {
				console.log("start", event);
			});
			swapyRef.current?.onSwap((event) => {
				console.log("swap", event);
			});
			swapyRef.current?.onSwapEnd((event) => {
				console.log("end", event);
			});
		}
		return () => {
			swapyRef.current?.destroy();
		};
	}, []);
	return (
		<div
			className="grid grid-cols-2 grid-rows-[repeat(2,_250px)] gap-4 p-4 max-w-4xl mx-auto"
			ref={containerRef}
		>
			<div className="slot " data-swapy-slot="a">
				<div className="item" data-swapy-item="a">
					<WeatherWidget />
				</div>
			</div>

			<div className="slot row-span-2" data-swapy-slot="b">
				<div className="item item-b" data-swapy-item="b">
					<div className="handle" data-swapy-handle></div>
					<div>B</div>
				</div>
			</div>

			<div className="w-full h-full text-center">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi sequi,
					in quas, reprehenderit quis hic, eligendi vel velit delectus
					aspernatur corrupti eaque omnis maiores similique culpa officiis
					deserunt. Magni, deserunt libero? Minus inventore debitis temporibus
					labore facilis nemo!
				</p>
			</div>
		</div>
	);
};

export default HomeWidgets;
