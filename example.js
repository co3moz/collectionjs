var Collection = require(__dirname + "/js/Collection.js");
var SettingCollection = new Collection({
	Setting: 	undefined,
	Value: 		undefined
});

console.log(SettingCollection.add({
	Setting: 	"url",
	Value:		"http://www.github.com"
}));
// true

console.log(SettingCollection.add({
	Setting: 	"isok",
	Value:		true
}));
// true

console.log(SettingCollection.add({
	Setting: 	"will be denied",
}));
// false

var SettingList = [
	{
		Setting: 	"test",
		Value:		1
	}, // added
	{
		Setting: 	"test2",
		Value:		2
	}, // added
	{
		Setting: 	"test3",
		Value:		3
	}, // added
	{
		Setting: 	"test4",
	} // denied
];

console.log(SettingCollection.add(SettingList));
// 3

console.log(SettingCollection.this);
/*
	[ 
		{ Setting: 'url', Value: 'http://www.github.com' },
		{ Setting: 'isok', Value: true },
		{ Setting: 'test', Value: 1 },
		{ Setting: 'test2', Value: 2 },
		{ Setting: 'test3', Value: 3 }
	]
*/