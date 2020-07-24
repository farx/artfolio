
export const linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'post') return "/post/" + doc.uid;
	if (doc.type === 'mainpage') return "/";
	return "/" + doc.uid;

}
