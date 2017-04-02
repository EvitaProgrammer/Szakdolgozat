

#all inserts in one file
cat szakdoga.csv | awk 'BEGIN { FS=";" } { print "INSERT INTO content(name, date, event, url, place, lat, lng) VALUES(\x27" $2 "\x27, \x27" $3 "\x27, \x27" $4 "\x27, \x27" $5 "\x27, \x27" $6 "\x27, \x27" $7 "\x27, \x27" $8 "\x27);" }' > all.sql

#files by tables
cat szakdoga.csv | awk 'BEGIN { FS=";" } { print "INSERT INTO helyszinek(varos, latitude, longitude) VALUES(\x27" $6 "\x27, " $7 ", " $8 ");" }' > places.sql
cat szakdoga.csv | awk 'BEGIN { FS=";" } { print "INSERT INTO esemenyek(datum, esemeny, url) VALUES(\x27" $3 "\x27, \x27" $4 "\x27, \x27" $5 "\x27);" }' > events.sql
cat szakdoga.csv | awk 'BEGIN { FS=";" } { print "INSERT INTO szemelyek(nev, datum, url, helyszin) VALUES(\x27" $2 "\x27, \x27" $3 "\x27, \x27" $5 "\x27, \x27" $6 "\x27);" }' > persons.sql