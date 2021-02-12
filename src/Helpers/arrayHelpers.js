export const groupBy = (arr, property) => {
	return arr.reduce(function (memo, x) {
		if (!memo[x[property]]) {
			memo[x[property]] = [];
		}
		memo[x[property]].push(x);
		return memo;
	}, {});
};

export const splitAt = (predicate, arr) => {
	const index = arr.findIndex(predicate);
	return [arr.slice(0, index), arr[index], arr.slice(index + 1)];
};
