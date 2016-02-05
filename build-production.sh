#!/bin/sh

echo "---- BUILD PRODUCTION ----"

echo "COPIE DES FICHIERS"

if [ ! -d tmp_build ]
then

    mkdir tmp_build

fi

cp -R hooks     tmp_build
cp -R plugins   tmp_build
cp -R scss      tmp_build
cp -R www       tmp_build
cp -R platforms tmp_build

if [ -d resources ]
then

    cp -R resources tmp_build

fi

cp *.*  tmp_build

echo "SUPPRESSION DES FICHIERS INUTILES"

cd tmp_build

rm -rf www/resources/images/images_non_libres_temp
rm -rf www/resources/images/quiz
rm -rf www/resources/src

rm -rf www/lib/angular-leaflet-directive/examples
rm -rf www/lib/leaflet-markercluster/example
rm -rf www/lib/transliteration/POD9452.jpg
rm -rf www/lib/transliteration/data
rm -rf www/lib/transliteration/transliteration.js

echo "BUILD .APK DEBUG"

ionic build android


