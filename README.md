Mongoose
========

A mongo db migration tool written in native javascipt.

Mongoose Working
================

Mongoose works by executing the mongo scripts from the folder migrations. The scripts named as :
            <execute-order>_<migration-name>.js
    say:
            0001_my_first_migration.js

The migrations are executed sorted in the order using the execution order. Once a script is executed, mongoose keeps a tack and dowsnot execute it in case Mongoose is run again. In order to do so, it keeps track of the migration file name.

Executing Mongoose
==================

1. cd into the mongoose directory.
2. run the mongoose.js on mongo console as:
      
        mongo <dbname> -u <username> -p <password> --host <host name> --port <port number> mongoose.js