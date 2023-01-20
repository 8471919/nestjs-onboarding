const curry =
	(func) =>
	(a, ...args) =>
		args.length > 0 ? func(a, ...args) : (...args) => func(a, ...args);

const map = curry((func, iter) => {
	const result = [];
	for (const el of iter) {
		result.push(func(el));
	}

	return result;
});

const filter = curry((func, iter) => {
	const result = [];
	for (const el of iter) {
		if (func(el)) {
			result.push(el);
		}
	}

	return result;
});

const reduce = curry((func, acc, iter) => {
	if (iter === undefined) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const el of iter) {
		acc = func(acc, el);
	}

	return acc;
});

const pipe = (iter, ...functions) => {
	return reduce((acc, func) => func(acc), iter, functions);
};

/**
 * generator
 * ex) range
 */

const range = function* (limit) {
	let i = -1;
	while (++i < limit) {
		yield i;
	}
};
for (const el of range(5)) {
	console.log(el);
}

/**
 * 지연평가
 * Lazy map
 */

const Lmap = curry(function* (func, iter) {
	for (const el of iter) {
		console.log(`Lazy map ${el}`);
		yield func(el);
	}
});

/**
 * 지연평가
 * Lazy filter
 */

const Lfilter = curry(function* (func, iter) {
	for (const el of iter) {
		if (func(el)) {
			console.log(`Lazy filter ${el}`);
			yield el;
		}
	}
});

const arr = [1, 2, 3, 4, 5];

pipe(
	arr,
	filter((el) => el % 2),
	map((el) => el * 2),
	reduce((acc, cur) => (acc += cur)),
	console.log
);

// 평가의 방법이 횡단에서 종단으로 바뀐다.
// 즉, 하나의 원소마다 filter, map, reduce를 거친다.
pipe(
	arr,
	Lfilter((el) => el % 2),
	Lmap((el) => el * 2),
	reduce((acc, cur) => (acc += cur)),
	console.log
);
