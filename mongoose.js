/*
* Author : Anuj Jamwal
* Date : May 11, 2012
* file : mongoose.js
*
*/
 var migrations = new Array();

function isJsFile(file) {
	return ((!file.isDirectory) && (file.name.lastIndexOf(".js") == (file.name.length-3)));
}

function notAlreadyExecuted(migration) {
	return (db.Mongoose.find({"_id":migration}).count() <= 0);
};

print("Reading Migrations ...");
listFiles("migrations").forEach(function(file) { 
	if(isJsFile(file)) { 
		migrations[parseInt(file.name.match(/[1-9][0-9]*/)[0])] = file.name;
	}
});
print((migrations.length-1)+ " Migration scripts found ...");

print("Executing Migrations ...");
migrations.forEach(function(file) {
		if(notAlreadyExecuted(file)) {
			try {
				load(file);
			} catch (error) {
				print("error occured executing..." + file);
				print("Aborting Mongoose....");
				quit();
			}
			print(file+" : Successfully executed ..." );
			db.Mongoose.save({"_id":file, "runTime":new Date()});
			print("Marked Executed.....");
		} else {
			print(file+" is Already Executed. Skipping ... ");
		}
});

