cordova-build:
	@echo "Building Cordova project"
	@yarn run build:cordova

cordova-build-android:
	@echo "Building Android project"
	@cd cordova && cordova build android

cordova-start:
	@echo "Starting Cordova project"
	@cd cordova && cordova serve

cordova-dev:
	@echo "Starting Cordova project in dev mode"
	@yarn run watch:cordova && cd cordova && cordova serve
