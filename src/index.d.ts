declare module 'interval-promise' {
	interface IIntervalPromiseOptions {
	  iterations?: number;
	  stopOnError?: boolean;
	}
  
	type stop = () => void;
	type func = (iterationNumber: number, stop: stop) => Promise<void>;
	type intervalLengthFn = (iterationNumber: number) => void;
	type intervalLength = number | intervalLengthFn;
	export default function interval(
	  func: func,
	  intervalLength: intervalLength,
	  options?: IIntervalPromiseOptions
	): Promise<void>;
  }
  