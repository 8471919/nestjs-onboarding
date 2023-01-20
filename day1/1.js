const arr = [1, 2, 3, 4, 5];

let sum = 0;
for (const el of arr) {
	if (el % 2 === 1) {
		const newElement = el * 2;
		sum += newElement;
	}
}

console.log(sum);

const sum2 = arr
	.filter((el) => el % 2)
	.map((el) => el * 2)
	.reduce((acc, cur) => (acc += cur));

console.log(sum2);

const map = (func, iter) => {
	const result = [];
	for (const el of iter) {
		result.push(func(el));
	}

	return result;
};

console.log(map((el) => el * 2, arr));

const filter = (func, iter) => {
	const result = [];
	for (const el of iter) {
		if (func(el)) {
			result.push(el);
		}
	}

	return result;
};

console.log(filter((el) => el % 2, arr));

const reduce = (func, acc, iter) => {
	if (iter === undefined) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const el of iter) {
		acc = func(acc, el);
	}

	return acc;
};

console.log(reduce((acc, cur) => (acc += cur), 0, arr));
console.log(reduce((acc, cur) => (acc += cur), arr));

/**
 * iterable protocol: 약속
 * 순회 가능한 자료형은 해당 프로토콜을 따라야 한다.
 * for...of 문으로 순회 가능한 객체를 의미함.
 * iterable protocol은 아래의 조건이 구현되어 있어야 한다.
 * 1. [Symbol.iterator]() => iterator
 *  여기서 Symbol은 변하지 않는 상징이다.
 * 2. iterator.next()
 *  1번에서 리턴된 iterator라는 객체가 next함수를 가져야한다.
 */

const iterator = arr[Symbol.iterator]();
