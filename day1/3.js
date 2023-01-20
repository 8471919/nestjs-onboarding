/**
 * 함수의 평가시점을 미루기, curry
 */

const arr = [1, 2, 3, 4, 5];

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

const add = curry((a, b) => a + b);

console.log(add(1, 3));
console.log(add(1)); // NaN
console.log(add(1)(3)); // add(1)을 머금고 (3)이 들어왔을 때 실행되는 것을 원한다.

/**
 * 로직을 더 간단하게 나타내기
 */

// 1. 홀수만 걸러주세요
// 2. 걸러진 원소에 곱하기 2를 해주세요
// 3. 모두 다 더해주세요
pipe(
	arr,
	filter((el) => el % 2),
	map((el) => el * 2),
	reduce((acc, cur) => (acc += cur)),
	console.log
);

const people = [
	{
		name: "jenny",
		age: 30,
		city: "seoul",
	},
	{
		name: "jenifer",
		age: 20,
		city: "seoul",
	},
	{
		name: "chris",
		age: 15,
		city: "tokyo",
	},
	{
		name: "dave",
		age: 40,
		city: "london",
	},
];

pipe(
	people,
	filter((person) => person.city === "seoul"),
	map((person) => person.name),
	console.log
);

pipe(
	people,
	filter((person) => person.city === "seoul"),
	map((person) => person.age),
	reduce(add),
	console.log
);

pipe(
	people,
	filter((person) => person.name.startsWith("j")), // j로 시작하는 이름을 가진 사람들중
	filter((person) => person.age <= 20), // 나이가 20살 이하인 사람
	console.log
);
