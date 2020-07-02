
export const linkResolver = function(doc) {
	// Pretty URLs for known types
	if (doc.type === 'project') return "/post/" + doc.uid;
	if (doc.type === 'mainpage') return "/";
	return "/" + doc.id;

}
