export const getPosts = async () => {
	const response = fetch("http://localhost:5000/posts", {
		method: "GET",
		credentials: "include",
	});
	console.log(response);
	const data = await (await response).json();
	console.log(data);
	return data;
};

