SET PROJECT_DIR=C:\dev\github-repositories\mieuxtrieranantes_ionic_montpellier_temp

convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 72x72 %PROJECT_DIR%\resources\android\icon\drawable-hdpi-icon.png
convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 36x36 %PROJECT_DIR%\resources\android\icon\drawable-ldpi-icon.png
convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 48x48 %PROJECT_DIR%\resources\android\icon\drawable-mdpi-icon.png
convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 96x96 %PROJECT_DIR%\resources\android\icon\drawable-xhdpi-icon.png
convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 144x144 %PROJECT_DIR%\resources\android\icon\drawable-xxhdpi-icon.png
convert %PROJECT_DIR%\www\resources\images\montpellier\logo_montpellier.png -size 192x192 %PROJECT_DIR%\resources\android\icon\drawable-xxxhdpi-icon.png

convert %PROJECT_DIR%\resources\android\splash.png -resize 800x480! %PROJECT_DIR%\resources\android\splash\drawable-land-hdpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 320x240! %PROJECT_DIR%\resources\android\splash\drawable-land-ldpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 480x320! %PROJECT_DIR%\resources\android\splash\drawable-land-mdpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 1280x720! %PROJECT_DIR%\resources\android\splash\drawable-land-xhdpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 480x800! %PROJECT_DIR%\resources\android\splash\drawable-port-hdpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 240x320! %PROJECT_DIR%\resources\android\splash\drawable-port-ldpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 320x480! %PROJECT_DIR%\resources\android\splash\drawable-port-mdpi-screen.png
convert %PROJECT_DIR%\resources\android\splash.png -resize 720x1280! %PROJECT_DIR%\resources\android\splash\drawable-port-xhdpi-screen.png
