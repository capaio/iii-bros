cordova-build:
	@echo "Building Cordova project"
	@yarn run build:cordova

cordova-build-android:
	@echo "Building Android project"
	@cd cordova && cordova build android

cordova-build-android-release:
	@echo "Building Android project"
	@cd cordova && cordova build android --release -- --packageType=apk

cordova-start:
	@echo "Starting Cordova project"
	@cd cordova && cordova serve

cordova-run-android:
	@echo "Starting Cordova project in dev mode"
	@cd cordova && cordova run android
