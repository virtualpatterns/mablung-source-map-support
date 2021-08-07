# export SHELL := /bin/zsh

ifndef mablung-makefile-path
export mablung-makefile-path := $(shell npx mablung-makefile get-path)
endif

include $(mablung-makefile-path)

do::
	@$(MAKE) do-0
	@$(MAKE) do-1 --jobs=4

do-0::
	@echo do-0

do-1::
	npx babel source/header/index.js --out-file release/header/index.js --source-maps true
