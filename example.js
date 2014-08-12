var Collection = require(__dirname + "/js/Collection.js");
var SettingCollection = new Collection({
	Setting: 	undefined,
	Value: 		undefined
});

console.log(SettingCollection.add({
	Setting: 	"url",
	Value:		"http://www.github.com"
}));

console.log(SettingCollection.add({
	Setting: 	"isok",
	Value:		true
}));

console.log(SettingCollection.add({
	Setting: 	"will be denied",
}));

var SettingList = [
	{
		Setting: 	"test",
		Value:		1
	},
	{
		Setting: 	"test2",
		Value:		2
	},
	{
		Setting: 	"test3",
		Value:		3
	},
	{
		Setting: 	"test4",
	}
];

console.log(SettingCollection.add(SettingList));

console.log(SettingCollection.this);