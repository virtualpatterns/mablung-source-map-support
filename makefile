
ifeq ($(origin mablung-makefile-path),undefined)
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

test::
	@npx mkdir -p ../Shared/mablung-source-map-support
	@npx shx rm -Rf ../Shared/mablung-source-map-support/coverage
	@npx shx cp -R coverage ../Shared/mablung-source-map-support
